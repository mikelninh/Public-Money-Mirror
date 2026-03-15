// Demokratie-Profil: Gamification Layer
// Tracks actions, awards achievements, creates progression

export const achievements = [
    // Erste Schritte
    { id: 'first-visit', name: 'Neugierig', desc: 'Zum ersten Mal auf PMM', icon: '👀', points: 5, category: 'start' },
    { id: 'life-situation', name: 'Es wird persönlich', desc: 'Lebenssituation gewählt', icon: '🎯', points: 10, category: 'start' },
    { id: 'first-theme', name: 'Themen-Entdecker:in', desc: 'Erstes Thema nachgeschlagen', icon: '🔍', points: 10, category: 'start' },

    // Wissen
    { id: 'quiz-done', name: 'Kompass-Finder:in', desc: 'Wahlkompass abgeschlossen', icon: '🧭', points: 20, category: 'wissen' },
    { id: 'five-themes', name: 'Wissensdurst', desc: '5 verschiedene Themen angesehen', icon: '📚', points: 25, category: 'wissen' },
    { id: 'zeugnis-seen', name: 'Notengeberin', desc: 'Politik-Zeugnis angesehen', icon: '📝', points: 15, category: 'wissen' },
    { id: 'all-tabs', name: 'Tiefentaucher:in', desc: 'Alle Tabs in einer Sektion besucht', icon: '🤿', points: 20, category: 'wissen' },
    { id: 'mdb-scored', name: 'Demokratie-Detektiv:in', desc: 'Einen MdB live gescored', icon: '🔎', points: 25, category: 'wissen' },
    { id: 'korruption-seen', name: 'Durchblicker:in', desc: 'Korrelationen angesehen', icon: '👁️', points: 15, category: 'wissen' },

    // Handeln
    { id: 'first-vote', name: 'Stimme erhoben', desc: 'Erstes Bürgervotum abgegeben', icon: '✋', points: 15, category: 'handeln' },
    { id: 'brief-copied', name: 'Brief-Schreiber:in', desc: 'Ersten MdB-Brief kopiert', icon: '✉️', points: 30, category: 'handeln' },
    { id: 'kampagne-joined', name: 'Mitstreiter:in', desc: 'Eine Kampagne unterstützt', icon: '✊', points: 25, category: 'handeln' },
    { id: 'simulator-shared', name: 'Budget-Architekt:in', desc: 'Eigenen Haushaltsentwurf geteilt', icon: '📊', points: 20, category: 'handeln' },
    { id: 'buergernote', name: 'Bürgerjury', desc: 'Eigene Note im Zeugnis vergeben', icon: '⚖️', points: 15, category: 'handeln' },
    { id: 'vorschlag-made', name: 'Ideengeber:in', desc: 'Eigenen Vorschlag eingereicht', icon: '💡', points: 30, category: 'handeln' },

    // Teilen
    { id: 'first-share', name: 'Botschafter:in', desc: 'Zum ersten Mal etwas geteilt', icon: '📢', points: 20, category: 'teilen' },
    { id: 'zeugnis-shared', name: 'Zeugnis-Verteiler:in', desc: 'Zeugnis als Bild geteilt', icon: '🎓', points: 25, category: 'teilen' },
    { id: 'three-shares', name: 'Multiplikator:in', desc: '3 verschiedene Dinge geteilt', icon: '🌊', points: 30, category: 'teilen' },

    // Meilensteine
    { id: 'score-50', name: 'Halbzeit', desc: '50 Punkte erreicht', icon: '⭐', points: 0, category: 'meilenstein' },
    { id: 'score-100', name: 'Hundert', desc: '100 Punkte erreicht', icon: '💯', points: 0, category: 'meilenstein' },
    { id: 'score-200', name: 'Demokratie-Held:in', desc: '200 Punkte erreicht', icon: '🏆', points: 0, category: 'meilenstein' },
    { id: 'all-actions', name: 'Vollblut-Demokrat:in', desc: 'Alle Handlungs-Achievements', icon: '🎖️', points: 50, category: 'meilenstein' },
];

export const levels = [
    { name: 'Beobachter:in', minPoints: 0, color: 'var(--color-text-3)' },
    { name: 'Interessiert', minPoints: 25, color: 'var(--color-blue)' },
    { name: 'Informiert', minPoints: 75, color: 'var(--color-purple)' },
    { name: 'Engagiert', minPoints: 150, color: 'var(--color-green)' },
    { name: 'Aktiv', minPoints: 250, color: 'var(--color-amber)' },
    { name: 'Demokratie-Held:in', minPoints: 400, color: 'var(--color-red)' },
];

export const dailyFacts = [
    'Der Bund gibt pro Sekunde €15.497 aus — €5.680 davon für Rente.',
    'Die Agrarlobby gibt 25x mehr für Lobbyarbeit aus als der Tierschutzbund.',
    'Estland hat seine gesamte Verwaltung für €50 Mio digitalisiert. Deutschland hat €3 Mrd ausgegeben und 27% geschafft.',
    'Schweden bekommt jährlich einen "Orange Envelope" mit der voraussichtlichen Rente. In Deutschland wissen 62% nicht, was sie bekommen.',
    '763 Millionen Tiere werden in Deutschland pro Jahr geschlachtet — 24 pro Sekunde.',
    'Die Zinslast des Bundes stieg von €4 Mrd (2021) auf €35 Mrd (2023). Eine Verneunfachung in 2 Jahren.',
    'Gerhard Schröder wechselte 3 Monate nach seiner Kanzlerschaft zu Gazprom.',
    'Die Maskenaffäre ist straffrei — der BGH entschied, das Gesetz hat eine Lücke.',
    'Wien: 60% der Einwohner leben in Sozialwohnungen für €5,80/m². Berlin: Durchschnitt €12,50/m².',
    'Finnland hat Obdachlosigkeit um 35% reduziert — durch Housing First: erst Wohnung, dann Hilfe.',
    'Die BER-Kostenexplosion: geplant €2,83 Mrd, am Ende €6,6 Mrd. Niemand wurde zur Verantwortung gezogen.',
    'Nur 11% aller Studierenden bekommen BAföG — die Sätze steigen langsamer als die Mieten.',
    'Costa Rica erzeugt 99,5% seines Stroms aus Erneuerbaren — als Entwicklungsland.',
    'In der Schweiz haben Tiere einen eigenen Anwalt. In Deutschland haben sie §1 TierSchG mit "vernünftigem Grund".',
    'Die Kindergrundsicherung — das zentrale Versprechen der Ampel — ist komplett gescheitert.',
    'Deutschland hat ~3.000 Steuerfahnder. Jeder zusätzliche bringt im Schnitt €1,2 Mio/Jahr ein.',
    'Eine Windrad-Genehmigung dauert 4-7 Jahre. Ein LNG-Terminal wurde in 4 Monaten genehmigt.',
    'Neuseeland: bis zu 5 Jahre Haft für Tierquälerei. Deutschland: meist Geldstrafe, selten Verurteilung.',
    'Dänemark: 97% der Bevölkerung nutzen die digitale Identität. Deutschland: unter 10% nutzen eID.',
    'Der Wahlkompass auf PMM zeigt dir in 6 Fragen, welche Partei am besten zu dir passt.',
    '82% der Deutschen wollen strengeren Tierschutz — aber die Lobby verhindert jede Reform.',
    'Frankreich: Kinderarmutsquote 11,4%. Deutschland: 21,6%. Der Unterschied: Krippen ab 3 Monaten.',
    'Japan hat 30.000 Pflegeroboter im Einsatz — und die höchste Lebenserwartung der Welt (84,7 Jahre).',
    'Die Slowakei veröffentlicht alle Staatsverträge online — Verträge ohne Veröffentlichung sind unwirksam.',
    'Auf abgeordnetenwatch.de kannst du deinem MdB eine öffentliche Frage stellen. Die (Nicht-)Antwort wird dokumentiert.',
    'Der Budget-Simulator auf PMM zeigt dir: €5 Mrd mehr für Bildung = 333 neue Schulen.',
    'Australien: Arbeitgeber zahlen verpflichtend 11,5% ins Rentensystem. In Deutschland: freiwillig.',
    'Die Pharma-Lobby gibt €11,8 Mio/Jahr aus. Ergebnis: dritthöchste Medikamentenpreise der OECD.',
    'Norwegen: 82% aller Neuwagen sind elektrisch. Wie? Keine Kaufsteuer auf E-Autos.',
    'Du kannst die Demokratie verändern — fang mit einer Bürgerfrage an: abgeordnetenwatch.de',
];

// Get today's fact (rotates daily)
export function getDailyFact() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return dailyFacts[dayOfYear % dailyFacts.length];
}

// Profile management (localStorage)
const PROFILE_KEY = 'pmm-demokratie-profil';

export function getProfile() {
    try {
        const stored = localStorage.getItem(PROFILE_KEY);
        return stored ? JSON.parse(stored) : { points: 0, achievements: [], streak: 0, lastVisit: null, actionsLog: [] };
    } catch { return { points: 0, achievements: [], streak: 0, lastVisit: null, actionsLog: [] }; }
}

export function saveProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function trackAction(actionId) {
    const profile = getProfile();

    // Check streak
    const today = new Date().toDateString();
    if (profile.lastVisit !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        profile.streak = profile.lastVisit === yesterday ? profile.streak + 1 : 1;
        profile.lastVisit = today;
    }

    // Award achievement if not already earned
    if (!profile.achievements.includes(actionId)) {
        const achievement = achievements.find(a => a.id === actionId);
        if (achievement) {
            profile.achievements.push(actionId);
            profile.points += achievement.points;

            // Check milestone achievements
            if (profile.points >= 50 && !profile.achievements.includes('score-50')) {
                profile.achievements.push('score-50');
            }
            if (profile.points >= 100 && !profile.achievements.includes('score-100')) {
                profile.achievements.push('score-100');
            }
            if (profile.points >= 200 && !profile.achievements.includes('score-200')) {
                profile.achievements.push('score-200');
            }
        }
    }

    profile.actionsLog.push({ action: actionId, time: Date.now() });
    saveProfile(profile);
    return profile;
}

export function getLevel(points) {
    let current = levels[0];
    let next = levels[1];
    for (let i = 0; i < levels.length; i++) {
        if (points >= levels[i].minPoints) {
            current = levels[i];
            next = levels[i + 1] || null;
        }
    }
    return { current, next, progress: next ? (points - current.minPoints) / (next.minPoints - current.minPoints) : 1 };
}
