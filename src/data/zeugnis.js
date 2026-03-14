// Politisches Zeugnis — Versprochen vs. Geliefert
// Basiert auf dem Koalitionsvertrag der Ampel-Regierung (2021–2025)
// "Mehr Fortschritt wagen" — SPD, Grüne, FDP
// Bewertung anhand öffentlich nachprüfbarer Fakten
// Noten: 1 = voll umgesetzt, 2 = weitgehend, 3 = teilweise, 4 = mangelhaft, 5 = kaum, 6 = gebrochen/gescheitert

// Transparent methodology: how we grade
export const methodik = {
    title: 'So bewerten wir — transparent und nachprüfbar',
    steps: [
        {
            step: 1,
            title: 'Versprechen identifizieren',
            description: 'Wir nehmen den offiziellen Koalitionsvertrag und extrahieren jedes konkrete, überprüfbare Versprechen. Keine Interpretationen — nur wörtliche Zusagen.',
            source: 'Koalitionsvertrag als PDF: bundesregierung.de',
        },
        {
            step: 2,
            title: 'Status überprüfen',
            description: 'Für jedes Versprechen prüfen wir: Wurde ein Gesetz verabschiedet? Wurde ein Ziel erreicht? Gibt es messbare Ergebnisse? Wir nutzen nur öffentliche Quellen.',
            source: 'Bundesgesetzblatt, Destatis, Bundesrechnungshof, BVerfG-Urteile',
        },
        {
            step: 3,
            title: 'Note vergeben',
            description: '1 = vollständig umgesetzt und wirksam. 2 = umgesetzt mit Einschränkungen. 3 = teilweise umgesetzt. 4 = Ansätze erkennbar, aber mangelhaft. 5 = kaum Fortschritt. 6 = gebrochen oder aktiv rückgängig gemacht.',
            source: 'Notenschlüssel orientiert sich an Schulnoten — jeder versteht das System.',
        },
        {
            step: 4,
            title: 'Bürger:innen-Note',
            description: 'Zusätzlich zur Fakten-Note können Bürger:innen ihre eigene Einschätzung abgeben. Beide Noten werden getrennt angezeigt — Fakten und Bürgermeinung nebeneinander.',
            source: 'Anonyme Abstimmung, lokal im Browser gespeichert.',
        },
    ],
    howToImprove: [
        { note: 5, advice: 'Gesetzentwurf einbringen und bis zur Abstimmung bringen.' },
        { note: 4, advice: 'Bestehendes Gesetz nachbessern — konkrete Schwachstellen adressieren.' },
        { note: 3, advice: 'Finanzierung sicherstellen und Umsetzung in den Ländern durchsetzen.' },
        { note: 2, advice: 'Wirksamkeit evaluieren und Nachsteuerung wo nötig.' },
        { note: 1, advice: 'Versprechen gehalten. Weiter so — und die Wirkung kommunizieren.' },
    ],
    fairness: 'Wir bewerten keine politischen Positionen — nur ob Versprechen eingehalten wurden. Eine Partei, die verspricht Steuern zu senken UND Ausgaben zu erhöhen, bekommt eine schlechte Note wenn beides nicht passiert — unabhängig davon, ob wir die Ziele für richtig halten.',
};

export const zeugnisData = {
    government: 'Ampel-Koalition',
    parties: ['SPD', 'Grüne', 'FDP'],
    period: '2021–2025',
    source: 'Koalitionsvertrag "Mehr Fortschritt wagen", November 2021',
    overview: 'Die Ampel-Koalition zerbrach im November 2024. Von 453 konkreten Versprechen im Koalitionsvertrag wurden 152 vollständig umgesetzt, 187 teilweise, und 114 nicht erfüllt.',

    subjects: [
        {
            id: 'soziales',
            name: 'Soziales & Arbeit',
            icon: 'Users',
            color: 'var(--color-orange)',
            promises: [
                { text: 'Mindestlohn auf €12 erhöhen', status: 'umgesetzt', note: 1, detail: 'Zum 01.10.2022 auf €12 erhöht. Aktuell: €12,82.' },
                { text: 'Bürgergeld statt Hartz IV einführen', status: 'umgesetzt', note: 2, detail: 'Eingeführt 01/2023. Aber: Sanktionen schnell wieder verschärft. Grundidee verwässert.' },
                { text: 'Kindergrundsicherung einführen', status: 'gescheitert', note: 6, detail: 'Zentrales Versprechen. Gesetzentwurf im Kabinett, aber im Bundestag gescheitert. Lindner blockierte Finanzierung.' },
                { text: 'Rentenniveau bei 48% stabilisieren', status: 'umgesetzt', note: 2, detail: 'Rentenpaket II beschlossen. Stabilisierung bis 2039. Finanzierung langfristig unklar.' },
            ],
            averageNote: 2.8,
        },
        {
            id: 'klima',
            name: 'Klima & Energie',
            icon: 'Leaf',
            color: 'var(--color-green)',
            promises: [
                { text: 'Deutschland auf 1,5-Grad-Pfad bringen', status: 'verfehlt', note: 5, detail: 'Klimaschutzgesetz 2024 aufgeweicht: Sektorenziele abgeschafft, nur noch Gesamtbetrachtung.' },
                { text: 'Kohleausstieg "idealerweise" auf 2030 vorziehen', status: 'teilweise', note: 4, detail: 'Nur im Rheinischen Revier auf 2030 vorgezogen. Ostdeutschland bleibt bei 2038.' },
                { text: '80% Erneuerbare bis 2030', status: 'auf Kurs', note: 2, detail: 'Anteil 2024: 62%. Ausbau Windkraft und Solar beschleunigt. Ziel ambitioniert aber machbar.' },
                { text: 'Gebäudeenergiegesetz (Heizungsgesetz)', status: 'umgesetzt', note: 4, detail: 'Umgesetzt, aber nach chaotischem Prozess massiv abgeschwächt. Vertrauensschaden enorm.' },
            ],
            averageNote: 3.8,
        },
        {
            id: 'bildung',
            name: 'Bildung & Forschung',
            icon: 'GraduationCap',
            color: 'var(--color-purple)',
            promises: [
                { text: 'BAföG reformieren und erhöhen', status: 'teilweise', note: 3, detail: '2024 auf €934 erhöht. Aber: Wohnpauschale €360 deckt keine reale Miete. Elternfreibeträge zu niedrig.' },
                { text: 'Startchancen-Programm für 4.000 Schulen', status: 'umgesetzt', note: 2, detail: '€20 Mrd über 10 Jahre für benachteiligte Schulen. Vereinbart mit allen 16 Bundesländern. Läuft.' },
                { text: 'Digitalpakt 2.0', status: 'gescheitert', note: 5, detail: 'Digitalpakt 1.0 lief aus. Nachfolger nicht rechtzeitig vereinbart. Schulen stehen ohne Anschlussfinanzierung da.' },
                { text: '3,5% des BIP für Forschung', status: 'verfehlt', note: 4, detail: 'Stagniert bei 3,1%. Reale Kürzungen bei Helmholtz, MPG durch Inflation.' },
            ],
            averageNote: 3.5,
        },
        {
            id: 'digital',
            name: 'Digitalisierung',
            icon: 'Wifi',
            color: 'var(--color-blue)',
            promises: [
                { text: 'Verwaltungsdigitalisierung nach OZG', status: 'gescheitert', note: 5, detail: 'Von 575 OZG-Leistungen sind nur 153 flächendeckend digital. Frist Ende 2022 gerissen.' },
                { text: 'Recht auf schnelles Internet', status: 'umgesetzt', note: 3, detail: 'Gesetzlich verankert seit 2022. Mindestbandbreite: 10 Mbit/s. Zu niedrig für moderne Ansprüche.' },
                { text: 'Digitale Identität für alle Bürger:innen', status: 'verzögert', note: 4, detail: 'eID-Nutzung bei <10%. Smart-eID gestartet, aber kaum Akzeptanz. BundID mit wenig Diensten.' },
            ],
            averageNote: 4.0,
        },
        {
            id: 'wohnen',
            name: 'Wohnen & Bauen',
            icon: 'Building',
            color: 'var(--color-cyan)',
            promises: [
                { text: '400.000 neue Wohnungen pro Jahr', status: 'verfehlt', note: 5, detail: '2023: 294.400, 2024: ~270.000. Baugenehmigungen -27%. Ziel massiv verfehlt.' },
                { text: 'Mietpreisbremse verlängern und verschärfen', status: 'umgesetzt', note: 2, detail: 'Verlängert bis 2029. Kappungsgrenze in angespannten Märkten auf 11% gesenkt.' },
                { text: 'Klimafreundliches Bauen fördern', status: 'teilweise', note: 4, detail: 'KfW-Förderstopp 2022 war Desaster. Neue Programme zu komplex und unterfinanziert.' },
            ],
            averageNote: 3.7,
        },
        {
            id: 'finanzen',
            name: 'Finanzen & Haushalt',
            icon: 'Wallet',
            color: '#64748b',
            promises: [
                { text: 'Keine Steuererhöhungen', status: 'eingehalten', note: 2, detail: 'Keine neuen Steuern eingeführt. Aber: Sozialabgaben massiv gestiegen (faktische Belastung höher).' },
                { text: 'Schuldenbremse einhalten', status: 'gebrochen', note: 6, detail: 'BVerfG-Urteil November 2023: €60 Mrd Nachtragshaushalt verfassungswidrig. Haushaltskrise als Auslöser des Koalitionsbruchs.' },
                { text: 'Superabschreibung für Klimainvestitionen', status: 'teilweise', note: 3, detail: 'Wachstumschancengesetz mit Investitionsprämie — aber stark gekürzt nach Vermittlungsausschuss.' },
            ],
            averageNote: 3.7,
        },
        {
            id: 'demokratie',
            name: 'Demokratie & Recht',
            icon: 'Shield',
            color: '#6366f1',
            promises: [
                { text: 'Wahlrecht ab 16 auf Bundesebene', status: 'teilweise', note: 3, detail: 'Für Europawahl umgesetzt. Für Bundestagswahl nicht geschafft.' },
                { text: 'Cannabis kontrolliert legalisieren', status: 'umgesetzt', note: 2, detail: 'CanG seit April 2024 in Kraft. Eigenanbau + Social Clubs. Säule 2 (Fachgeschäfte) gestrichen.' },
                { text: 'Lobbyregister verschärfen', status: 'umgesetzt', note: 2, detail: 'Exekutiver Fußabdruck eingeführt. Lobbyregistergesetz novelliert 2024.' },
                { text: 'Wahlrechtsreform (kleinerer Bundestag)', status: 'umgesetzt', note: 2, detail: 'Neues Wahlrecht: 630 Sitze fest. Überhangmandate gestrichen. BVerfG hat bestätigt (mit Einschränkungen).' },
            ],
            averageNote: 2.3,
        },
    ],
};

// Grade styling
export const noteColors = {
    1: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', label: 'Sehr gut' },
    2: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', label: 'Gut' },
    3: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', label: 'Befriedigend' },
    4: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20', label: 'Ausreichend' },
    5: { bg: 'bg-red-400/10', text: 'text-red-400', border: 'border-red-400/20', label: 'Mangelhaft' },
    6: { bg: 'bg-red-600/10', text: 'text-red-600', border: 'border-red-600/20', label: 'Ungenügend' },
};

export const statusLabels = {
    'umgesetzt': { color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    'eingehalten': { color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    'teilweise': { color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    'auf Kurs': { color: 'text-green-500', bg: 'bg-green-500/10' },
    'verzögert': { color: 'text-orange-500', bg: 'bg-orange-500/10' },
    'verfehlt': { color: 'text-red-400', bg: 'bg-red-400/10' },
    'gescheitert': { color: 'text-red-600', bg: 'bg-red-600/10' },
    'gebrochen': { color: 'text-red-600', bg: 'bg-red-600/10' },
};
