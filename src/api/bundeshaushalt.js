// Bundeshaushalt API — bundeshaushalt.de
// Official federal budget data from BMF
// Docs: https://github.com/bundesAPI/bundeshaushalt-api

const BASE = 'https://bundeshaushalt.de/internalapi/budgetData';
const CACHE_KEY = 'pmm-budget-cache';
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Simple localStorage cache with TTL
 */
function getCached(year) {
    try {
        const raw = localStorage.getItem(`${CACHE_KEY}-${year}`);
        if (!raw) return null;
        const cached = JSON.parse(raw);
        if (Date.now() - cached.timestamp > CACHE_MAX_AGE) return null;
        return cached.data;
    } catch { return null; }
}

function setCache(year, data) {
    try {
        localStorage.setItem(`${CACHE_KEY}-${year}`, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    } catch { /* quota exceeded — ignore */ }
}

/**
 * Get cache freshness info
 */
export function getCacheFreshness(year) {
    try {
        const raw = localStorage.getItem(`${CACHE_KEY}-${year}`);
        if (!raw) return { cached: false, age: null, fresh: false };
        const cached = JSON.parse(raw);
        const age = Date.now() - cached.timestamp;
        return {
            cached: true,
            age,
            fresh: age < CACHE_MAX_AGE,
            lastUpdated: new Date(cached.timestamp).toLocaleString('de-DE'),
        };
    } catch { return { cached: false, age: null, fresh: false }; }
}

const iconMap = {
    'Arbeit und Soziales': 'Users',
    'Verteidigung': 'Shield',
    'Verkehr und digitale Infrastruktur': 'Train',
    'Digitales und Verkehr': 'Train',
    'Bundesschuld': 'Wallet',
    'Bildung und Forschung': 'GraduationCap',
    'Gesundheit': 'Heart',
    'Familie': 'Heart',
    'Inneres': 'Shield',
    'Wirtschaft': 'Leaf',
    'Klimaschutz': 'Leaf',
    'Umwelt': 'Leaf',
    'Finanzen': 'Building',
    'Auswärtiges': 'Map',
    'Entwicklung': 'Map',
};

const colorMap = {
    'Arbeit und Soziales': 'var(--color-orange)',
    'Verteidigung': '#ef4444',
    'Verkehr': 'var(--color-blue)',
    'Digitales': 'var(--color-blue)',
    'Bundesschuld': '#64748b',
    'Bildung': 'var(--color-purple)',
    'Forschung': 'var(--color-purple)',
    'Gesundheit': 'var(--color-green)',
    'Familie': 'var(--color-cyan)',
    'Inneres': '#6366f1',
    'Wirtschaft': 'var(--color-amber)',
    'Klima': 'var(--color-amber)',
    'Umwelt': 'var(--color-green)',
    'Finanzen': '#94a3b8',
    'Auswärtiges': '#0ea5e9',
    'Entwicklung': '#0ea5e9',
};

function matchKey(label, map) {
    for (const [key, value] of Object.entries(map)) {
        if (label.includes(key)) return value;
    }
    return null;
}

function formatAmount(value) {
    const mrd = value / 1e9;
    if (mrd >= 1) return `€${mrd.toFixed(1)} Mrd`;
    const mio = value / 1e6;
    return `€${mio.toFixed(0)} Mio`;
}

/**
 * Fetch real budget data from bundeshaushalt.de
 * Returns data in our app's format, or null if API fails (CORS, network, etc.)
 */
export async function fetchBundeshaushalt(year = 2025) {
    // Check cache first
    const cached = getCached(year);
    if (cached) return cached;

    try {
        const res = await fetch(
            `${BASE}?year=${year}&account=expenses&quota=target&unit=single`,
            { signal: AbortSignal.timeout(8000) }
        );
        if (!res.ok) return null;

        const data = await res.json();
        const total = data.detail.value;
        const totalMrd = total / 1e9;

        // Filter out tiny entries and negative values, take top items
        const significant = data.children
            .filter(c => c.value > 0 && c.relativeToParentValue >= 0.5)
            .sort((a, b) => b.value - a.value);

        // Group small entries into "Sonstige"
        const top = significant.filter(c => c.relativeToParentValue >= 2.0);
        const rest = significant.filter(c => c.relativeToParentValue < 2.0);
        const restSum = rest.reduce((s, c) => s + c.value, 0);
        const restPct = rest.reduce((s, c) => s + c.relativeToParentValue, 0);

        const categories = top.map(c => {
            const shortLabel = c.label.replace(/^Bundesministerium (für |des |der )?/, '').replace(/^Allgemeine /, '');
            return {
                id: c.id,
                name: shortLabel,
                percentage: Math.round(c.relativeToParentValue * 10) / 10,
                amount: formatAmount(c.value),
                amountNum: Math.round(c.value / 1e8) / 10,
                description: `Einzelplan ${c.id} — ${(c.relativeToParentValue).toFixed(1)}% des Bundeshaushalts ${year}.`,
                examples: [],
                color: matchKey(c.label, colorMap) || '#94a3b8',
                icon: matchKey(c.label, iconMap) || 'Building',
            };
        });

        if (restSum > 0) {
            categories.push({
                id: 'sonstige',
                name: 'Sonstige Einzelpläne',
                percentage: Math.round(restPct * 10) / 10,
                amount: formatAmount(restSum),
                amountNum: Math.round(restSum / 1e8) / 10,
                description: `${rest.length} weitere Einzelpläne mit je unter 2% Anteil.`,
                examples: rest.slice(0, 3).map(c => c.label.replace(/^Bundesministerium (für |des |der )?/, '')),
                color: '#94a3b8',
                icon: 'Building',
            });
        }

        const result = {
            total: Math.round(totalMrd * 10) / 10,
            categories,
            source: 'live',
            lastUpdated: data.meta?.modifyDate || new Date().toLocaleDateString('de-DE'),
            fetchedAt: new Date().toLocaleString('de-DE'),
        };
        setCache(year, result);
        return result;
    } catch {
        return null;
    }
}

/**
 * Fetch drill-down data for a specific Einzelplan
 */
export async function fetchEinzelplanDetail(year, einzelplanId) {
    try {
        const res = await fetch(
            `${BASE}?year=${year}&account=expenses&quota=target&unit=single&id=${einzelplanId}`,
            { signal: AbortSignal.timeout(8000) }
        );
        if (!res.ok) return null;

        const data = await res.json();
        return {
            parent: {
                id: data.parent?.id || einzelplanId,
                label: data.parent?.label || data.detail?.label,
                value: data.parent?.value || data.detail?.value,
            },
            children: (data.children || [])
                .filter(c => c.value > 0)
                .sort((a, b) => b.value - a.value)
                .map(c => ({
                    id: c.id,
                    label: c.label,
                    amount: formatAmount(c.value),
                    percentage: c.relativeToParentValue,
                })),
        };
    } catch {
        return null;
    }
}
