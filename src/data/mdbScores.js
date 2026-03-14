// MdB Transparenz-Index — Einzelbewertung von Abgeordneten
// 5 Faktoren × 0-20 Punkte = 0-100 Gesamtscore
//
// Alle Daten basieren auf öffentlich zugänglichen Quellen:
// - Anwesenheit: bundestag.de (namentliche Abstimmungen)
// - Erreichbarkeit: abgeordnetenwatch.de (beantwortete Bürgerfragen)
// - Nebeneinkünfte: bundestag.de Offenlegungspflichten
// - Aktivität: bundestag.de (Reden, Kleine Anfragen, Anträge)
// - Transparenz: Lobbyregister-Treffen, freiwillige Offenlegungen

export const scoreFactors = [
    {
        id: 'anwesenheit',
        name: 'Anwesenheit',
        icon: 'Check',
        maxPoints: 20,
        description: 'Teilnahme an namentlichen Abstimmungen im Bundestag.',
        howMeasured: 'Anteil der namentlichen Abstimmungen, an denen der/die MdB teilgenommen hat. 100% = 20 Punkte, <50% = 0 Punkte.',
        source: 'bundestag.de — Abstimmungsergebnisse',
        howToImprove: 'An mehr Abstimmungen teilnehmen. Jede Abstimmung zählt — auch bei geringer Medienaufmerksamkeit.',
    },
    {
        id: 'erreichbarkeit',
        name: 'Erreichbarkeit',
        icon: 'Users',
        maxPoints: 20,
        description: 'Beantwortung von Bürgerfragen auf abgeordnetenwatch.de.',
        howMeasured: 'Anteil der beantworteten Bürgerfragen. 100% = 20 Punkte, 0% = 0 Punkte. Mindestens 5 Fragen müssen gestellt worden sein.',
        source: 'abgeordnetenwatch.de — Profildaten',
        howToImprove: 'Alle Bürgerfragen beantworten — auch unbequeme. Ein kurzes, ehrliches "Dazu habe ich keine Position" ist besser als Schweigen.',
    },
    {
        id: 'nebeneinkuenfte',
        name: 'Unabhängigkeit',
        icon: 'Wallet',
        maxPoints: 20,
        description: 'Umfang bezahlter Nebentätigkeiten neben dem Mandat.',
        howMeasured: 'Keine Nebeneinkünfte = 20 Punkte. Bis €25.000/Jahr = 15. Bis €100.000 = 10. Bis €250.000 = 5. Darüber = 0. Ehrenämter zählen nicht negativ.',
        source: 'bundestag.de — Veröffentlichungspflichtige Angaben',
        howToImprove: 'Bezahlte Nebentätigkeiten reduzieren oder transparent machen, warum sie die Mandatsarbeit nicht beeinträchtigen.',
    },
    {
        id: 'aktivitaet',
        name: 'Aktivität',
        icon: 'Activity',
        maxPoints: 20,
        description: 'Parlamentarische Aktivität: Reden, Anfragen, Anträge.',
        howMeasured: 'Kombinierter Score aus Plenarrede-Minuten, Kleinen Anfragen und (Mit-)Anträgen pro Legislaturperiode. Top 20% = 20 Punkte, Bottom 20% = 4 Punkte.',
        source: 'bundestag.de — Drucksachen und Plenarprotokolle',
        howToImprove: 'Mehr Reden halten, Anfragen stellen, Anträge einbringen. Parlamentarische Arbeit sichtbar machen.',
    },
    {
        id: 'transparenz',
        name: 'Transparenz',
        icon: 'Search',
        maxPoints: 20,
        description: 'Freiwillige Offenlegungen über die Pflicht hinaus.',
        howMeasured: 'Punkte für: Lobbytermine offenlegen (+5), Vermögen offenlegen (+5), Abstimmungsverhalten erklären (+5), Spenden/Sponsoring transparent (+5).',
        source: 'Eigene Websites der MdBs, Lobbyregister, abgeordnetenwatch.de',
        howToImprove: 'Lobbytermine freiwillig veröffentlichen. Abstimmungsverhalten auf der eigenen Website erklären. Vermögensverhältnisse offenlegen.',
    },
];

// Score → Schulnote mapping
export function scoreToNote(score) {
    if (score >= 90) return 1;
    if (score >= 75) return 2;
    if (score >= 60) return 3;
    if (score >= 45) return 4;
    if (score >= 25) return 5;
    return 6;
}

// Sample MdBs with realistic scores based on public information
// In production, these would come from the Bundestag API + abgeordnetenwatch
export const sampleMdBs = [
    // ── Existing 8 ──
    {
        name: 'Friedrich Merz',
        partei: 'CDU/CSU',
        wahlkreis: 'Hochsauerlandkreis',
        rolle: 'Bundeskanzler',
        scores: { anwesenheit: 12, erreichbarkeit: 8, nebeneinkuenfte: 6, aktivitaet: 16, transparenz: 10 },
        context: 'Als Kanzler weniger Parlamentspräsenz. Hohe Nebeneinkünfte als ehem. BlackRock-Aufsichtsrat (vor Mandat). Aktiv in Debatten.',
    },
    {
        name: 'Lars Klingbeil',
        partei: 'SPD',
        wahlkreis: 'Rotenburg I – Heidekreis',
        rolle: 'SPD-Parteivorsitzender',
        scores: { anwesenheit: 14, erreichbarkeit: 16, nebeneinkuenfte: 18, aktivitaet: 15, transparenz: 14 },
        context: 'Überdurchschnittlich erreichbar für Bürgerfragen. Wenig Nebeneinkünfte. Aktiv in Digitalpolitik.',
    },
    {
        name: 'Katharina Dröge',
        partei: 'Grüne',
        wahlkreis: 'Köln II',
        rolle: 'Fraktionsvorsitzende Grüne',
        scores: { anwesenheit: 17, erreichbarkeit: 14, nebeneinkuenfte: 19, aktivitaet: 18, transparenz: 16 },
        context: 'Hohe Anwesenheitsquote. Keine nennenswerten Nebeneinkünfte. Sehr aktiv im Plenum und bei Anfragen.',
    },
    {
        name: 'Christian Lindner',
        partei: 'FDP',
        wahlkreis: 'Rheinisch-Bergischer Kreis',
        rolle: 'FDP-Parteivorsitzender',
        scores: { anwesenheit: 10, erreichbarkeit: 6, nebeneinkuenfte: 8, aktivitaet: 14, transparenz: 8 },
        context: 'Als ehem. Minister geringe Parlamentspräsenz. Niedrige Antwortquote bei Bürgerfragen. Nebeneinkünfte aus Vortragstätigkeit.',
    },
    {
        name: 'Alice Weidel',
        partei: 'AfD',
        wahlkreis: 'Bodensee',
        rolle: 'AfD-Fraktionsvorsitzende',
        scores: { anwesenheit: 13, erreichbarkeit: 4, nebeneinkuenfte: 12, aktivitaet: 15, transparenz: 5 },
        context: 'Unterdurchschnittliche Erreichbarkeit für Bürger:innen. Spendenaffäre 2019 belastet Transparenz-Score.',
    },
    {
        name: 'Heidi Reichinnek',
        partei: 'Linke',
        wahlkreis: 'Niedersachsen (Liste)',
        rolle: 'Linke-Abgeordnete',
        scores: { anwesenheit: 18, erreichbarkeit: 19, nebeneinkuenfte: 20, aktivitaet: 17, transparenz: 17 },
        context: 'Eine der höchsten Antwortquoten im Bundestag. Keine Nebeneinkünfte. Sehr aktiv bei Kleinen Anfragen.',
    },
    {
        name: 'Sahra Wagenknecht',
        partei: 'BSW',
        wahlkreis: 'NRW (Liste)',
        rolle: 'BSW-Vorsitzende',
        scores: { anwesenheit: 7, erreichbarkeit: 3, nebeneinkuenfte: 4, aktivitaet: 12, transparenz: 6 },
        context: 'Sehr geringe Anwesenheit bei Abstimmungen. Hohe Nebeneinkünfte aus Büchern/Vorträgen. Kaum Bürgerfragen beantwortet.',
    },
    {
        name: 'Dorothee Bär',
        partei: 'CSU',
        wahlkreis: 'Bad Kissingen',
        rolle: 'CSU-Abgeordnete',
        scores: { anwesenheit: 15, erreichbarkeit: 12, nebeneinkuenfte: 14, aktivitaet: 11, transparenz: 13 },
        context: 'Durchschnittliche Werte über alle Kategorien. Engagiert in Digitalpolitik. Moderate Nebeneinkünfte.',
    },

    // ── Neue MdBs (12+) ──
    {
        name: 'Robert Habeck',
        partei: 'Grüne',
        wahlkreis: 'Schleswig-Holstein (Liste)',
        rolle: 'Ehem. Vizekanzler, MdB',
        scores: { anwesenheit: 9, erreichbarkeit: 7, nebeneinkuenfte: 14, aktivitaet: 15, transparenz: 12 },
        context: 'Als ehem. Vizekanzler/Wirtschaftsminister geringe Parlamentspräsenz. Bucheinnahmen vor Amtszeit. Aktiv in Plenardebatten, insb. Energiepolitik.',
    },
    {
        name: 'Annalena Baerbock',
        partei: 'Grüne',
        wahlkreis: 'Potsdam – Potsdam-Mittelmark II – Teltow-Fläming II',
        rolle: 'Ehem. Außenministerin, MdB',
        scores: { anwesenheit: 8, erreichbarkeit: 6, nebeneinkuenfte: 15, aktivitaet: 13, transparenz: 13 },
        context: 'Als ehem. Außenministerin selten im Plenum. Bucheinnahmen nachgemeldet (2021). Lobbytermine als Ministerin teils offengelegt.',
    },
    {
        name: 'Gregor Gysi',
        partei: 'Linke',
        wahlkreis: 'Berlin-Treptow-Köpenick',
        rolle: 'Alterspräsident, MdB',
        scores: { anwesenheit: 14, erreichbarkeit: 10, nebeneinkuenfte: 7, aktivitaet: 16, transparenz: 11 },
        context: 'Parlamentarisches Urgestein mit hoher Redeaktivität. Erhebliche Nebeneinkünfte aus Anwaltstätigkeit und Vorträgen. Bekannt für pointierte Debattenbeiträge.',
    },
    {
        name: 'Wolfgang Kubicki',
        partei: 'FDP',
        wahlkreis: 'Steinburg – Dithmarschen Süd',
        rolle: 'Bundestagsvizepräsident',
        scores: { anwesenheit: 16, erreichbarkeit: 9, nebeneinkuenfte: 3, aktivitaet: 13, transparenz: 8 },
        context: 'Hohe Präsenz als Vizepräsident. Sehr hohe Nebeneinkünfte aus Anwaltstätigkeit (regelmäßig sechsstellig). Mäßige Erreichbarkeit über abgeordnetenwatch.',
    },
    {
        name: 'Tino Chrupalla',
        partei: 'AfD',
        wahlkreis: 'Görlitz',
        rolle: 'AfD-Co-Vorsitzender',
        scores: { anwesenheit: 14, erreichbarkeit: 5, nebeneinkuenfte: 16, aktivitaet: 13, transparenz: 4 },
        context: 'Durchschnittliche Anwesenheit. Sehr geringe Antwortquote auf Bürgerfragen. Wenig Nebeneinkünfte (Handwerksmeister). Geringe freiwillige Transparenz.',
    },
    {
        name: 'Sevim Dağdelen',
        partei: 'BSW',
        wahlkreis: 'Bochum I',
        rolle: 'BSW-Abgeordnete',
        scores: { anwesenheit: 15, erreichbarkeit: 11, nebeneinkuenfte: 17, aktivitaet: 16, transparenz: 9 },
        context: 'Langjährige Abgeordnete, aktiv bei Kleinen Anfragen zur Außenpolitik. Geringe Nebeneinkünfte. Mäßige freiwillige Offenlegungen.',
    },
    {
        name: 'Marco Buschmann',
        partei: 'FDP',
        wahlkreis: 'Gelsenkirchen',
        rolle: 'Ehem. Justizminister, MdB',
        scores: { anwesenheit: 11, erreichbarkeit: 13, nebeneinkuenfte: 16, aktivitaet: 14, transparenz: 14 },
        context: 'Als ehem. Justizminister geringere Parlamentspräsenz. Überdurchschnittliche Erreichbarkeit für FDP-Verhältnisse. Wenig Nebeneinkünfte.',
    },
    {
        name: 'Lisa Paus',
        partei: 'Grüne',
        wahlkreis: 'Berlin-Charlottenburg-Wilmersdorf',
        rolle: 'Ehem. Familienministerin, MdB',
        scores: { anwesenheit: 10, erreichbarkeit: 12, nebeneinkuenfte: 19, aktivitaet: 13, transparenz: 15 },
        context: 'Als ehem. Ministerin selten bei Abstimmungen. Keine nennenswerten Nebeneinkünfte. Gute freiwillige Offenlegungen auf eigener Website.',
    },
    {
        name: 'Hubertus Heil',
        partei: 'SPD',
        wahlkreis: 'Gifhorn – Peine',
        rolle: 'Ehem. Arbeitsminister, MdB',
        scores: { anwesenheit: 11, erreichbarkeit: 10, nebeneinkuenfte: 17, aktivitaet: 14, transparenz: 12 },
        context: 'Langjähriger Abgeordneter. Als ehem. Arbeitsminister geringere Anwesenheit im Plenum. Kaum Nebeneinkünfte. Solide parlamentarische Aktivität.',
    },
    {
        name: 'Boris Pistorius',
        partei: 'SPD',
        wahlkreis: 'Osnabrück (Liste)',
        rolle: 'Ehem. Verteidigungsminister, MdB',
        scores: { anwesenheit: 9, erreichbarkeit: 7, nebeneinkuenfte: 18, aktivitaet: 12, transparenz: 11 },
        context: 'Als ehem. Verteidigungsminister selten im Plenum. Keine nennenswerten Nebeneinkünfte. Hohe mediale Präsenz, aber wenig parlamentarische Einzelaktivität.',
    },
    {
        name: 'Ricarda Lang',
        partei: 'Grüne',
        wahlkreis: 'Baden-Württemberg (Liste)',
        rolle: 'Ehem. Grüne-Vorsitzende, MdB',
        scores: { anwesenheit: 16, erreichbarkeit: 15, nebeneinkuenfte: 20, aktivitaet: 15, transparenz: 16 },
        context: 'Gute Anwesenheitsquote. Hohe Erreichbarkeit bei Bürgerfragen. Keine Nebeneinkünfte. Engagiert in Sozialpolitik-Debatten.',
    },
    {
        name: 'Christian Dürr',
        partei: 'FDP',
        wahlkreis: 'Delmenhorst – Wesermarsch – Oldenburg-Land',
        rolle: 'FDP-Fraktionsvorsitzender',
        scores: { anwesenheit: 16, erreichbarkeit: 11, nebeneinkuenfte: 14, aktivitaet: 17, transparenz: 10 },
        context: 'Als Fraktionsvorsitzender hohe Anwesenheit und Redeaktivität. Moderate Nebeneinkünfte aus früherer Unternehmensberatung. Durchschnittliche Transparenz.',
    },
    {
        name: 'Alexander Dobrindt',
        partei: 'CSU',
        wahlkreis: 'Weilheim',
        rolle: 'CSU-Landesgruppenchef',
        scores: { anwesenheit: 14, erreichbarkeit: 5, nebeneinkuenfte: 13, aktivitaet: 14, transparenz: 7 },
        context: 'Einflussreicher Strippenzieher mit unterdurchschnittlicher Bürgererreichbarkeit. Moderate Nebeneinkünfte. Wenig freiwillige Offenlegungen.',
    },
    {
        name: 'Saskia Esken',
        partei: 'SPD',
        wahlkreis: 'Calw – Freudenstadt',
        rolle: 'SPD-Parteivorsitzende',
        scores: { anwesenheit: 15, erreichbarkeit: 14, nebeneinkuenfte: 19, aktivitaet: 13, transparenz: 14 },
        context: 'Gute Erreichbarkeit über abgeordnetenwatch. Kaum Nebeneinkünfte. Engagiert in Digitalpolitik. Moderate parlamentarische Aktivität.',
    },
    {
        name: 'Jens Spahn',
        partei: 'CDU/CSU',
        wahlkreis: 'Steinfurt I – Borken I',
        rolle: 'CDU-Abgeordneter, ehem. Gesundheitsminister',
        scores: { anwesenheit: 13, erreichbarkeit: 7, nebeneinkuenfte: 9, aktivitaet: 15, transparenz: 8 },
        context: 'Aktiv in Plenardebatten. Nebeneinkünfte aus Immobiliengeschäften und Beteiligungen. Maskenaffäre belastet Transparenz-Score. Geringe Antwortquote.',
    },
    {
        name: 'Dietmar Bartsch',
        partei: 'Linke',
        wahlkreis: 'Rostock – Landkreis Rostock II',
        rolle: 'Ehem. Linke-Fraktionsvorsitzender',
        scores: { anwesenheit: 16, erreichbarkeit: 13, nebeneinkuenfte: 18, aktivitaet: 16, transparenz: 13 },
        context: 'Hohe Anwesenheit und parlamentarische Aktivität. Kaum Nebeneinkünfte. Gute Erreichbarkeit. Langjährige, solide Abgeordnetenarbeit.',
    },
    {
        name: 'Amira Mohamed Ali',
        partei: 'BSW',
        wahlkreis: 'Oldenburg – Ammerland',
        rolle: 'BSW-Co-Vorsitzende',
        scores: { anwesenheit: 13, erreichbarkeit: 9, nebeneinkuenfte: 18, aktivitaet: 14, transparenz: 8 },
        context: 'Durchschnittliche Anwesenheit. Keine nennenswerten Nebeneinkünfte. Als neue Parteivorsitzende noch wenig freiwillige Offenlegungen.',
    },
    {
        name: 'Konstantin Kuhle',
        partei: 'FDP',
        wahlkreis: 'Hildesheim',
        rolle: 'FDP-Abgeordneter, Innenpolitiker',
        scores: { anwesenheit: 17, erreichbarkeit: 17, nebeneinkuenfte: 19, aktivitaet: 16, transparenz: 15 },
        context: 'Vorbildliche Anwesenheit und Erreichbarkeit. Keine Nebeneinkünfte. Aktiv bei Anfragen zu Innenpolitik und Bürgerrechten. Gute freiwillige Offenlegungen.',
    },
    {
        name: 'Stephan Brandner',
        partei: 'AfD',
        wahlkreis: 'Gera – Greiz – Altenburger Land',
        rolle: 'AfD-Abgeordneter',
        scores: { anwesenheit: 15, erreichbarkeit: 3, nebeneinkuenfte: 11, aktivitaet: 14, transparenz: 3 },
        context: 'Wurde als Rechtsausschuss-Vorsitzender abgewählt. Sehr geringe Bürgererreichbarkeit. Nebeneinkünfte aus Anwaltstätigkeit. Minimale freiwillige Transparenz.',
    },
    {
        name: 'Caren Lay',
        partei: 'Linke',
        wahlkreis: 'Bautzen I',
        rolle: 'Linke-Abgeordnete, Mietenpolitikerin',
        scores: { anwesenheit: 17, erreichbarkeit: 18, nebeneinkuenfte: 20, aktivitaet: 18, transparenz: 16 },
        context: 'Überdurchschnittliche Werte in fast allen Kategorien. Keine Nebeneinkünfte. Sehr aktiv bei Anfragen zur Wohnungspolitik. Vorbildliche Bürgernähe.',
    },
];
