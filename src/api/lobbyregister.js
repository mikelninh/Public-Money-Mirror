// Lobbyregister API — lobbyregister.bundestag.de
// Official lobbying register of the German Bundestag
// Docs: https://www.lobbyregister.bundestag.de/informationen-und-hilfe/open-data-1049716

const BASE = 'https://www.lobbyregister.bundestag.de';

/**
 * Fetch lobby register entries.
 * Returns parsed entries or null on failure.
 */
export async function fetchLobbyEntries({ pageSize = 50, sort = 'REGISTRATION_DESC' } = {}) {
    try {
        const res = await fetch(
            `${BASE}/sucheJson?sort=${sort}&pageSize=${pageSize}`,
            { signal: AbortSignal.timeout(12000) }
        );
        if (!res.ok) return null;

        const data = await res.json();

        const entries = data.results.map(r => ({
            registerNumber: r.registerNumber,
            name: r.lobbyistIdentity?.name || 'Unbekannt',
            type: r.lobbyistIdentity?.identity,
            activityType: r.activitiesAndInterests?.activity?.de || '',
            interests: (r.activitiesAndInterests?.fieldsOfInterest || []).map(f => f.de),
            interestCodes: (r.activitiesAndInterests?.fieldsOfInterest || []).map(f => f.code),
            employeeFTE: r.employeesInvolvedInLobbying?.employeeFTE || 0,
            financialFrom: r.financialExpenses?.financialExpensesEuro?.from || 0,
            financialTo: r.financialExpenses?.financialExpensesEuro?.to || 0,
            projectCount: r.regulatoryProjects?.regulatoryProjectsCount || 0,
            url: r.registerEntryDetails?.detailsPageUrl || '',
            hasCodexViolations: r.accountDetails?.accountHasCodexViolations || false,
        }));

        return {
            totalCount: data.resultCount,
            entries,
            source: 'live',
        };
    } catch {
        return null;
    }
}

/**
 * Extract top spenders from entries (sort client-side since API sort may not work reliably)
 */
export function getTopSpenders(entries, limit = 12) {
    return [...entries]
        .sort((a, b) => b.financialTo - a.financialTo)
        .filter(e => e.financialTo > 0)
        .slice(0, limit);
}

/**
 * Aggregate lobby data by interest field
 */
export function aggregateByInterest(entries) {
    const map = {};
    entries.forEach(e => {
        e.interests.forEach(interest => {
            if (!map[interest]) {
                map[interest] = { name: interest, count: 0, totalFinancial: 0, totalEmployees: 0 };
            }
            map[interest].count++;
            map[interest].totalFinancial += (e.financialFrom + e.financialTo) / 2;
            map[interest].totalEmployees += e.employeeFTE;
        });
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
}

/**
 * Format financial range as human-readable string
 */
export function formatFinancial(from, to) {
    if (to === 0 && from === 0) return '€0';
    if (to <= 10000) return '< €10.000';
    const fmt = (n) => {
        if (n >= 1000000) return `€${(n / 1000000).toFixed(1)} Mio`;
        return `€${(n / 1000).toFixed(0)}.000`;
    };
    return `${fmt(from)}–${fmt(to)}`;
}

// Fallback data: top German lobby spenders (from lobbyregister.bundestag.de, March 2025)
// Used when API is blocked by CORS or network issues
export const fallbackTopSpenders = [
    { name: 'Gesamtverband der Deutschen Versicherungswirtschaft (GDV)', activityType: 'Wirtschaftsverband', financialFrom: 23810001, financialTo: 23820000, employeeFTE: 49, interests: ['Versicherungswesen', 'Verkehrsinfrastruktur', 'Digitalisierung'], projectCount: 118, url: 'https://www.lobbyregister.bundestag.de/suche/R002457/73671' },
    { name: 'Bundesverband der Deutschen Industrie (BDI)', activityType: 'Wirtschaftsverband', financialFrom: 15710001, financialTo: 15720000, employeeFTE: 72, interests: ['Industriepolitik', 'Klimaschutz', 'Außenwirtschaft'], projectCount: 145, url: 'https://www.lobbyregister.bundestag.de/suche/R001286/73662' },
    { name: 'Verband der Automobilindustrie (VDA)', activityType: 'Wirtschaftsverband', financialFrom: 12400001, financialTo: 12410000, employeeFTE: 46, interests: ['Straßenverkehr', 'Klimaschutz', 'Industriepolitik'], projectCount: 87, url: 'https://www.lobbyregister.bundestag.de/suche/R000575/73494' },
    { name: 'Deutscher Gewerkschaftsbund (DGB)', activityType: 'Arbeitnehmerverband', financialFrom: 10060001, financialTo: 10070000, employeeFTE: 36, interests: ['Arbeitsrecht', 'Arbeitsmarkt', 'Grundsicherung'], projectCount: 130, url: 'https://www.lobbyregister.bundestag.de/suche/R001461/73600' },
    { name: 'BDEW Bundesverband der Energie- und Wasserwirtschaft', activityType: 'Wirtschaftsverband', financialFrom: 9640001, financialTo: 9650000, employeeFTE: 56, interests: ['Allgemeine Energiepolitik', 'Erneuerbare Energien', 'Energienetze'], projectCount: 105, url: 'https://www.lobbyregister.bundestag.de/suche/R000209/73458' },
    { name: 'Verband kommunaler Unternehmen (VKU)', activityType: 'Wirtschaftsverband', financialFrom: 8220001, financialTo: 8230000, employeeFTE: 46.5, interests: ['Energienetze', 'Klimaschutz', 'Digitalisierung'], projectCount: 93, url: 'https://www.lobbyregister.bundestag.de/suche/R000098/70627' },
    { name: 'Bundesverband der Energie- und Klimaschutzagenturen (eaD)', activityType: 'Privatrechtliche Organisation', financialFrom: 7210001, financialTo: 7220000, employeeFTE: 3, interests: ['Klimaschutz', 'Erneuerbare Energien', 'Nachhaltigkeit'], projectCount: 8, url: 'https://www.lobbyregister.bundestag.de/suche/R003244/71894' },
    { name: 'Deutsche Krankenhausgesellschaft (DKG)', activityType: 'Wirtschaftsverband', financialFrom: 6890001, financialTo: 6900000, employeeFTE: 28, interests: ['Gesundheitsversorgung', 'Krankenversicherung', 'Pflegeversicherung'], projectCount: 72, url: 'https://www.lobbyregister.bundestag.de/suche/R000424/73389' },
    { name: 'Verband der Chemischen Industrie (VCI)', activityType: 'Wirtschaftsverband', financialFrom: 6750001, financialTo: 6760000, employeeFTE: 40, interests: ['Industriepolitik', 'Klimaschutz', 'Außenwirtschaft'], projectCount: 98, url: 'https://www.lobbyregister.bundestag.de/suche/R000382/73297' },
    { name: 'Deutscher Bauernverband (DBV)', activityType: 'Wirtschaftsverband', financialFrom: 5680001, financialTo: 5690000, employeeFTE: 22, interests: ['Land- und Forstwirtschaft', 'Klimaschutz', 'Außenwirtschaft'], projectCount: 76, url: 'https://www.lobbyregister.bundestag.de/suche/R001109/73140' },
    { name: 'Bundesverband der Pharmazeutischen Industrie (BPI)', activityType: 'Wirtschaftsverband', financialFrom: 4970001, financialTo: 4980000, employeeFTE: 18, interests: ['Arzneimittel', 'Gesundheitsversorgung', 'Industriepolitik'], projectCount: 55, url: 'https://www.lobbyregister.bundestag.de/suche/R000613/73018' },
    { name: 'DIHK Deutsche Industrie- und Handelskammer', activityType: 'Sonstige juristische Person', financialFrom: 4510001, financialTo: 4520000, employeeFTE: 38, interests: ['Außenwirtschaft', 'Berufliche Bildung', 'Arbeitsmarkt'], projectCount: 112, url: 'https://www.lobbyregister.bundestag.de/suche/R001703/73560' },
];
