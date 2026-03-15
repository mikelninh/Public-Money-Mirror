// Live-Suche für alle Politiker:innen über abgeordnetenwatch.de API
// CC0 Lizenz — frei nutzbar

const BASE = 'https://www.abgeordnetenwatch.de/api/v2';

/**
 * Search politicians by name
 */
export async function searchPolitiker(query) {
    if (!query || query.length < 2) return [];

    try {
        // Split query into first/last name for better matching
        const parts = query.trim().split(/\s+/);
        let url;
        if (parts.length >= 2) {
            url = `${BASE}/politicians?first_name=${encodeURIComponent(parts[0])}&last_name=${encodeURIComponent(parts.slice(1).join(' '))}&pager_limit=20`;
        } else {
            url = `${BASE}/politicians?label=${encodeURIComponent(query)}&pager_limit=20`;
        }

        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) return [];
        const data = await res.json();

        return (data.data || []).map(p => ({
            id: p.id,
            name: p.label,
            partei: p.party?.label || '',
            beruf: p.occupation || '',
            geburtsjahr: p.year_of_birth,
            geschlecht: p.sex,
            bildung: p.education || '',
            fragenGesamt: p.statistic_questions || 0,
            fragenBeantwortet: p.statistic_questions_answered || 0,
            url: p.abgeordnetenwatch_url,
            apiUrl: p.api_url,
        }));
    } catch {
        return [];
    }
}

/**
 * Get full profile with sidejobs and questions for scoring
 */
export async function getPolitikerDetail(id) {
    try {
        const [profileRes, sidejobsRes, mandatesRes] = await Promise.all([
            fetch(`${BASE}/politicians/${id}`, { signal: AbortSignal.timeout(8000) }),
            fetch(`${BASE}/politicians/${id}/sidejobs?pager_limit=100`, { signal: AbortSignal.timeout(8000) }),
            fetch(`${BASE}/candidacies-mandates?politician=${id}&pager_limit=10`, { signal: AbortSignal.timeout(8000) }),
        ]);
        const mandates = mandatesRes.ok ? await mandatesRes.json() : null;

        const profile = profileRes.ok ? await profileRes.json() : null;
        const sidejobs = sidejobsRes.ok ? await sidejobsRes.json() : null;

        if (!profile?.data) return null;

        const p = profile.data;

        // Check for active mandates
        const mandateList = (mandates?.data || []);
        const hasMandate = mandateList.length > 0;
        const latestMandate = mandateList[0];
        const mandateInfo = latestMandate ? {
            parliament: latestMandate.parliament?.label || '',
            period: latestMandate.parliament_period?.label || '',
            type: latestMandate.mandate_type || latestMandate.type || '',
        } : null;

        // Calculate sidejob income
        let sideJobIncome = 0;
        let sideJobCount = sidejobs?.meta?.result?.total || 0;
        const sideJobList = (sidejobs?.data || []).map(sj => {
            const incomeMap = { 1: 5000, 2: 15000, 3: 30000, 4: 50000, 5: 75000, 6: 100000, 7: 150000, 8: 250000 };
            const income = incomeMap[sj.income_level] || 0;
            sideJobIncome += income;
            return {
                label: sj.label || sj.organization || 'Unbekannt',
                category: sj.category || '',
                incomeLevel: sj.income_level,
                income,
            };
        });

        // Calculate answer rate
        const fragenGesamt = p.statistic_questions || 0;
        const fragenBeantwortet = p.statistic_questions_answered || 0;
        const antwortRate = fragenGesamt > 0 ? fragenBeantwortet / fragenGesamt : null;

        // Calculate scores
        // Erreichbarkeit (0-20) — from answer rate
        let erreichbarkeit = 0;
        let erreichbarkeitConf = 'low';
        if (antwortRate !== null && fragenGesamt >= 2) {
            erreichbarkeit = Math.round(antwortRate * 20);
            erreichbarkeitConf = 'high';
        } else {
            erreichbarkeit = 10; // no data → neutral estimate
        }

        // Nebeneinkünfte (0-20) — inverse of income
        // IMPORTANT: "no sidejobs" is only meaningful if the person has a mandate
        // (only mandate holders must disclose). No mandate = no disclosure duty = unknown.
        let nebeneinkuenfte = 10; // default: unknown
        let nebeneinkuenfteConf = 'none';
        if (hasMandate && sideJobCount === 0 && sideJobIncome === 0) {
            // Has mandate + reported zero sidejobs = genuinely clean
            nebeneinkuenfte = 20;
            nebeneinkuenfteConf = 'high';
        } else if (sideJobCount > 0) {
            // Has reported sidejobs — score based on income
            nebeneinkuenfteConf = 'high';
            if (sideJobIncome > 250000) nebeneinkuenfte = 0;
            else if (sideJobIncome > 100000) nebeneinkuenfte = 5;
            else if (sideJobIncome > 25000) nebeneinkuenfte = 10;
            else if (sideJobIncome > 0) nebeneinkuenfte = 15;
            else nebeneinkuenfte = 18;
        } else if (!hasMandate) {
            // No mandate = no disclosure duty = we genuinely don't know
            nebeneinkuenfte = 10;
            nebeneinkuenfteConf = 'none';
        }

        // If no mandate: don't score — not enough data
        if (!hasMandate) {
            return {
                id: p.id,
                name: p.label,
                partei: p.party?.label || '',
                beruf: p.occupation || '',
                geburtsjahr: p.year_of_birth,
                bildung: p.education || '',
                url: p.abgeordnetenwatch_url,
                hasMandate: false,
                mandateInfo: null,
                fragenGesamt,
                fragenBeantwortet,
                antwortRate,
                sideJobCount,
                sideJobIncome,
                sideJobList,
                scores: null,
                total: null,
                notScoreable: true,
                reason: 'Kein aktives Mandat gefunden. Der Transparenz-Index bewertet nur Mandatsträger:innen, da nur sie Offenlegungspflichten haben.',
                liveFactors: [],
                factorConfidence: {},
            };
        }

        // Estimated factors (need Bundestag XML data for accuracy)
        const anwesenheit = 13;
        const aktivitaet = 13;
        const transparenz = 10;

        const scores = {
            anwesenheit,
            erreichbarkeit,
            nebeneinkuenfte,
            aktivitaet,
            transparenz,
        };
        const total = Object.values(scores).reduce((a, b) => a + b, 0);

        return {
            id: p.id,
            name: p.label,
            partei: p.party?.label || '',
            beruf: p.occupation || '',
            geburtsjahr: p.year_of_birth,
            bildung: p.education || '',
            url: p.abgeordnetenwatch_url,
            hasMandate,
            mandateInfo,
            fragenGesamt,
            fragenBeantwortet,
            antwortRate,
            sideJobCount,
            sideJobIncome,
            sideJobList,
            scores,
            total,
            factorConfidence: {
                anwesenheit: 'low',
                erreichbarkeit: erreichbarkeitConf,
                nebeneinkuenfte: nebeneinkuenfteConf,
                aktivitaet: 'low',
                transparenz: 'low',
            },
            liveFactors: [
                ...(erreichbarkeitConf === 'high' ? ['erreichbarkeit'] : []),
                ...(nebeneinkuenfteConf === 'high' ? ['nebeneinkuenfte'] : []),
            ],
        };
    } catch {
        return null;
    }
}
