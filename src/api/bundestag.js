// Bundestag API — bundestag.de + abgeordnetenwatch.de
// Fetches real MdB data and calculates transparency scores automatically
//
// Data sources:
// - bundestag.de XML API: MdB list, biographies, committees
// - abgeordnetenwatch.de API: questions answered, voting records
//
// Note: These APIs may have CORS restrictions in the browser.
// Falls back to static data when blocked.

const BUNDESTAG_BASE = 'https://www.bundestag.de/xml/v2';
const ABGEORDNETENWATCH_BASE = 'https://www.abgeordnetenwatch.de/api/v2';

/**
 * Fetch MdB list from abgeordnetenwatch (better structured than Bundestag XML)
 * Returns array of MdBs with basic info
 */
export async function fetchMdBList() {
    try {
        // abgeordnetenwatch API: current parliament (legislature 20 = 2021-2025)
        const res = await fetch(
            `${ABGEORDNETENWATCH_BASE}/candidacies-mandates?parliament_period=132&page=0&pager_limit=100`,
            { signal: AbortSignal.timeout(10000) }
        );
        if (!res.ok) return null;
        const data = await res.json();

        return {
            total: data.meta?.result?.total || 0,
            members: (data.data || []).map(m => ({
                id: m.id,
                name: m.politician?.label || '',
                party: m.fraction_membership?.[0]?.fraction?.label || m.politician?.party?.label || '',
                profileUrl: m.politician?.abgeordnetenwatch_url || '',
                apiUrl: m.api_url || '',
                politicianId: m.politician?.id,
            })),
            source: 'live',
        };
    } catch {
        return null;
    }
}

/**
 * Fetch detailed profile for a single politician from abgeordnetenwatch
 * Includes: questions answered, total questions, votes, side jobs
 */
export async function fetchMdBProfile(politicianId) {
    try {
        const [profileRes, questionsRes, sideJobsRes] = await Promise.all([
            fetch(`${ABGEORDNETENWATCH_BASE}/politicians/${politicianId}`, { signal: AbortSignal.timeout(8000) }),
            fetch(`${ABGEORDNETENWATCH_BASE}/politicians/${politicianId}/questions?pager_limit=1`, { signal: AbortSignal.timeout(8000) }),
            fetch(`${ABGEORDNETENWATCH_BASE}/politicians/${politicianId}/sidejobs?pager_limit=100`, { signal: AbortSignal.timeout(8000) }),
        ]);

        const profile = profileRes.ok ? await profileRes.json() : null;
        const questions = questionsRes.ok ? await questionsRes.json() : null;
        const sideJobs = sideJobsRes.ok ? await sideJobsRes.json() : null;

        if (!profile?.data) return null;

        const p = profile.data;
        const totalQuestions = questions?.meta?.result?.total || 0;
        // Answered questions have a non-null answer
        const answeredQuestions = p.question_count_answered || 0;
        const totalSideJobs = sideJobs?.meta?.result?.total || 0;

        // Calculate side job income (approximate from categories)
        let sideJobIncome = 0;
        (sideJobs?.data || []).forEach(job => {
            // abgeordnetenwatch uses income ranges
            const incomeMap = {
                1: 5000, 2: 15000, 3: 30000, 4: 50000,
                5: 75000, 6: 100000, 7: 150000, 8: 250000,
            };
            sideJobIncome += incomeMap[job.income_level] || 0;
        });

        return {
            id: p.id,
            name: p.label,
            firstName: p.first_name,
            lastName: p.last_name,
            party: p.party?.label || '',
            occupation: p.occupation || '',
            profileUrl: p.abgeordnetenwatch_url,
            totalQuestions,
            answeredQuestions,
            answerRate: totalQuestions > 0 ? answeredQuestions / totalQuestions : 0,
            totalSideJobs,
            sideJobIncome,
            source: 'live',
        };
    } catch {
        return null;
    }
}

/**
 * Calculate transparency score from profile data
 * 5 factors x 0-20 = 0-100
 *
 * Each factor includes a `confidence` level:
 *   - "high"   — computed from live API data
 *   - "low"    — estimated / placeholder (requires data not yet available via API)
 */
export function calculateScore(profile) {
    // Erreichbarkeit (0-20): based on answer rate — LIVE
    const erreichbarkeit = Math.round(profile.answerRate * 20);

    // Nebeneinkünfte (0-20): inverse of side job income — LIVE
    let nebeneinkuenfte = 20;
    if (profile.sideJobIncome > 250000) nebeneinkuenfte = 0;
    else if (profile.sideJobIncome > 100000) nebeneinkuenfte = 5;
    else if (profile.sideJobIncome > 25000) nebeneinkuenfte = 10;
    else if (profile.sideJobIncome > 0) nebeneinkuenfte = 15;

    // For anwesenheit, aktivitaet, transparenz we need Bundestag data
    // which requires XML parsing — use reasonable defaults for now
    // These would be calculated from voting records + speech data
    const anwesenheit = 13; // placeholder — average for MdBs
    const aktivitaet = 13; // placeholder
    const transparenz = 10; // placeholder

    return {
        anwesenheit,
        erreichbarkeit,
        nebeneinkuenfte,
        aktivitaet,
        transparenz,
        total: anwesenheit + erreichbarkeit + nebeneinkuenfte + aktivitaet + transparenz,
        liveFactors: ['erreichbarkeit', 'nebeneinkuenfte'], // which factors are from live data
        estimatedFactors: ['anwesenheit', 'aktivitaet', 'transparenz'], // which are estimated
        factorConfidence: {
            anwesenheit: 'low',
            erreichbarkeit: 'high',
            nebeneinkuenfte: 'high',
            aktivitaet: 'low',
            transparenz: 'low',
        },
    };
}

/**
 * Fetch and score a batch of MdBs
 * Returns enriched MdB data with scores, confidence levels, and a lastUpdated timestamp
 */
export async function fetchAndScoreMdBs(limit = 20) {
    const list = await fetchMdBList();
    if (!list) return null;

    // Take first N members and fetch their profiles
    const members = list.members.slice(0, limit);
    const profiles = await Promise.allSettled(
        members.map(m => m.politicianId ? fetchMdBProfile(m.politicianId) : Promise.resolve(null))
    );

    const scored = members.map((m, i) => {
        const profile = profiles[i]?.status === 'fulfilled' ? profiles[i].value : null;
        if (!profile) return null;

        const scores = calculateScore(profile);
        return {
            name: profile.name,
            partei: profile.party,
            wahlkreis: profile.occupation || '',
            rolle: 'MdB',
            scores: {
                anwesenheit: scores.anwesenheit,
                erreichbarkeit: scores.erreichbarkeit,
                nebeneinkuenfte: scores.nebeneinkuenfte,
                aktivitaet: scores.aktivitaet,
                transparenz: scores.transparenz,
            },
            total: scores.total,
            context: `Antwortquote: ${Math.round(profile.answerRate * 100)}% (${profile.answeredQuestions}/${profile.totalQuestions} Fragen). ${profile.totalSideJobs} Nebentätigkeiten.`,
            profileUrl: profile.profileUrl,
            liveFactors: scores.liveFactors,
            factorConfidence: scores.factorConfidence,
        };
    }).filter(Boolean);

    return {
        members: scored,
        totalAvailable: list.total,
        source: 'live',
        lastUpdated: new Date().toISOString(),
    };
}
