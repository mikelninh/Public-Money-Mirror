export const parties = [
    { id: 'cdu', name: 'CDU/CSU', shortName: 'CDU', color: '#1a1a1a' },
    { id: 'spd', name: 'SPD', shortName: 'SPD', color: '#e3000f' },
    { id: 'gruene', name: 'Grüne', shortName: 'GRÜ', color: '#1aa037' },
    { id: 'fdp', name: 'FDP', shortName: 'FDP', color: '#ffed00' },
    { id: 'afd', name: 'AfD', shortName: 'AfD', color: '#009ee0' },
    { id: 'linke', name: 'Linke', shortName: 'LIN', color: '#be3075' },
];

export const categories = [
    { id: 'soziales', label: 'Soziales', icon: 'Heart', description: 'Rente, Sozialhilfe, Kindergeld' },
    { id: 'verteidigung', label: 'Verteidigung', icon: 'Shield', description: 'Bundeswehr, NATO, Rüstung' },
    { id: 'bildung', label: 'Bildung', icon: 'GraduationCap', description: 'Schulen, Unis, Forschung' },
    { id: 'klima', label: 'Klima', icon: 'Leaf', description: 'Energiewende, Umweltschutz' },
    { id: 'digitales', label: 'Digitales', icon: 'Wifi', description: 'Breitband, E-Government, KI' },
    { id: 'gesundheit', label: 'Gesundheit', icon: 'Activity', description: 'Krankenhäuser, Pflege, Prävention' },
];

// value: -2 = deutlich weniger, -1 = weniger, 0 = Status quo, +1 = mehr, +2 = deutlich mehr
export const stances = {
    cdu: {
        soziales: { value: 0, reason: 'Stabilität im Sozialsystem, keine großen Änderungen geplant.' },
        verteidigung: { value: 2, reason: 'NATO 2%-Ziel übertreffen, Bundeswehr massiv aufrüsten.' },
        bildung: { value: 1, reason: 'Mehr Investitionen in Berufsbildung und MINT-Fächer.' },
        klima: { value: -1, reason: 'Technologieoffenheit statt Verbote, weniger Subventionen.' },
        digitales: { value: 1, reason: 'Digitalpakt ausbauen, E-Government modernisieren.' },
        gesundheit: { value: 0, reason: 'Krankenhausreform ja, aber kostenneutral.' },
    },
    spd: {
        soziales: { value: 2, reason: 'Bürgergeld stärken, Mindestlohn erhöhen, Kindergrundsicherung.' },
        verteidigung: { value: 1, reason: 'NATO-Verpflichtungen erfüllen, aber maßvoll.' },
        bildung: { value: 1, reason: 'Ganztagsbetreuung ausbauen, BAföG reformieren.' },
        klima: { value: 1, reason: 'Erneuerbare fördern, sozialverträglicher Klimaschutz.' },
        digitales: { value: 1, reason: 'Digitale Teilhabe für alle, Open-Data-Strategie.' },
        gesundheit: { value: 1, reason: 'Bürgerversicherung einführen, Pflege besser bezahlen.' },
    },
    gruene: {
        soziales: { value: 1, reason: 'Kindergrundsicherung, höherer Mindestlohn.' },
        verteidigung: { value: -1, reason: 'Rüstungsexporte einschränken, Diplomatie priorisieren.' },
        bildung: { value: 2, reason: 'Bildungsföderalismus reformieren, Chancengleichheit.' },
        klima: { value: 2, reason: 'Klimaneutralität bis 2035, massiver Ausbau Erneuerbarer.' },
        digitales: { value: 1, reason: 'Datenschutz stärken, Open Source in Verwaltung.' },
        gesundheit: { value: 1, reason: 'Präventionsgesetz, mehr Geld für öffentlichen Gesundheitsdienst.' },
    },
    fdp: {
        soziales: { value: -1, reason: 'Eigenverantwortung stärken, Transferleistungen straffen.' },
        verteidigung: { value: 1, reason: 'Bundeswehr modernisieren, NATO-Ziel erreichen.' },
        bildung: { value: 1, reason: 'Bildungsgutscheine, mehr Wettbewerb im Hochschulsystem.' },
        klima: { value: 0, reason: 'Emissionshandel statt Ordnungsrecht, technologieoffen.' },
        digitales: { value: 2, reason: 'Deutschland zum KI-Standort machen, Bürokratie digitalisieren.' },
        gesundheit: { value: 0, reason: 'Wettbewerb zwischen Kassen, keine Bürgerversicherung.' },
    },
    afd: {
        soziales: { value: 0, reason: 'Leistungen für Deutsche priorisieren, kein Bürgergeld-Ausbau.' },
        verteidigung: { value: 2, reason: 'Bundeswehr massiv stärken, Wehrpflicht wieder einführen.' },
        bildung: { value: 0, reason: 'Leistungsprinzip in Schulen, gegen Gender-Studien.' },
        klima: { value: -2, reason: 'Klimaschutzgesetz abschaffen, fossile Energie beibehalten.' },
        digitales: { value: 0, reason: 'Kein prioritäres Thema, gegen staatliche Überwachung.' },
        gesundheit: { value: 0, reason: 'Bestehendes System beibehalten, keine grundlegenden Änderungen.' },
    },
    linke: {
        soziales: { value: 2, reason: 'Reichensteuer, Vermögensabgabe, Mindestrente 1.200€.' },
        verteidigung: { value: -2, reason: 'Rüstungsausgaben halbieren, NATO-Austritt prüfen.' },
        bildung: { value: 2, reason: 'Gebührenfreie Bildung von Kita bis Master, mehr Lehrende.' },
        klima: { value: 1, reason: 'Sozial-ökologische Transformation, ÖPNV kostenlos.' },
        digitales: { value: 0, reason: 'Digitale Grundrechte, aber Vorsicht vor Tech-Konzernen.' },
        gesundheit: { value: 2, reason: 'Krankenhaus-Privatisierung stoppen, Pflege-Offensive.' },
    },
};

export const quizQuestions = [
    {
        categoryId: 'soziales',
        question: 'Sollen Sozialausgaben (Rente, Bürgergeld, Kindergeld) erhöht werden?',
        options: [
            { label: 'Deutlich mehr', value: 2 },
            { label: 'Etwas mehr', value: 1 },
            { label: 'So lassen', value: 0 },
            { label: 'Etwas weniger', value: -1 },
            { label: 'Deutlich weniger', value: -2 },
        ],
    },
    {
        categoryId: 'verteidigung',
        question: 'Soll Deutschland mehr in Verteidigung und Bundeswehr investieren?',
        options: [
            { label: 'Deutlich mehr', value: 2 },
            { label: 'Etwas mehr', value: 1 },
            { label: 'So lassen', value: 0 },
            { label: 'Etwas weniger', value: -1 },
            { label: 'Deutlich weniger', value: -2 },
        ],
    },
    {
        categoryId: 'bildung',
        question: 'Soll der Bund deutlich mehr in Bildung und Forschung investieren?',
        options: [
            { label: 'Deutlich mehr', value: 2 },
            { label: 'Etwas mehr', value: 1 },
            { label: 'So lassen', value: 0 },
            { label: 'Etwas weniger', value: -1 },
            { label: 'Deutlich weniger', value: -2 },
        ],
    },
    {
        categoryId: 'klima',
        question: 'Soll Deutschland mehr Geld für Klimaschutz und Energiewende ausgeben?',
        options: [
            { label: 'Deutlich mehr', value: 2 },
            { label: 'Etwas mehr', value: 1 },
            { label: 'So lassen', value: 0 },
            { label: 'Etwas weniger', value: -1 },
            { label: 'Deutlich weniger', value: -2 },
        ],
    },
    {
        categoryId: 'digitales',
        question: 'Soll die Digitalisierung der Verwaltung und Infrastruktur stärker gefördert werden?',
        options: [
            { label: 'Deutlich mehr', value: 2 },
            { label: 'Etwas mehr', value: 1 },
            { label: 'So lassen', value: 0 },
            { label: 'Etwas weniger', value: -1 },
            { label: 'Deutlich weniger', value: -2 },
        ],
    },
    {
        categoryId: 'gesundheit',
        question: 'Sollen Gesundheit und Pflege deutlich mehr Mittel erhalten?',
        options: [
            { label: 'Deutlich mehr', value: 2 },
            { label: 'Etwas mehr', value: 1 },
            { label: 'So lassen', value: 0 },
            { label: 'Etwas weniger', value: -1 },
            { label: 'Deutlich weniger', value: -2 },
        ],
    },
];

export const budgetFacts = [
    { fact: 'Jede:r Einkommensteuer-Pflichtige zahlt im Schnitt €8.940 pro Jahr — davon gehen €3.270 direkt in die Rente.', icon: 'Wallet', source: 'Destatis Fachserie 14, 2024' },
    { fact: 'Der Bundeszuschuss zur Rentenversicherung beträgt €124 Mrd — ein Viertel des gesamten Bundeshaushalts, Tendenz steigend.', icon: 'TrendingUp', source: 'Deutsche Rentenversicherung 2025' },
    { fact: 'Die Zinsausgaben des Bundes stiegen von €4 Mrd (2021) auf €37 Mrd (2023) — eine Verneunfachung in zwei Jahren.', icon: 'AlertTriangle', source: 'BMF Monatsbericht 12/2023' },
    { fact: 'Nur 12,4% des Bundeshaushalts sind Investitionen (€60,7 Mrd) — der Rest sind konsumtive Ausgaben und Transfers.', icon: 'PieChart', source: 'BMF Haushaltsbericht 2025' },
    { fact: 'Der Bund gibt pro Jahr €9,5 Mrd für Beamtenpensionen aus — mehr als für alle zivile Forschungsförderung zusammen.', icon: 'Building', source: 'Versorgungsbericht der Bundesregierung 2023' },
    { fact: 'Das Deutschlandticket kostet den Bund €3,2 Mrd/Jahr — weniger als ein Zehntel der Ausgaben für Bundesstraßen und Autobahnen.', icon: 'Train', source: 'BMDV Haushalt 2025' },
];
