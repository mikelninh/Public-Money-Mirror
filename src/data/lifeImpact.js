// Personal impact data: maps life situations to concrete budget effects
// All numbers based on real 2025 federal budget data and published statistics

export const lifeSituations = [
    { id: 'eltern', label: 'Elternteil', icon: 'Heart', emoji: '👨‍👩‍👧' },
    { id: 'student', label: 'Student:in', icon: 'GraduationCap', emoji: '🎓' },
    { id: 'rentner', label: 'Rentner:in', icon: 'Clock', emoji: '🏡' },
    { id: 'angestellt', label: 'Angestellt', icon: 'Briefcase', emoji: '💼' },
    { id: 'selbststaendig', label: 'Selbstständig', icon: 'Zap', emoji: '⚡' },
    { id: 'arbeitsuchend', label: 'Arbeitsuchend', icon: 'Search', emoji: '🔍' },
];

// For each situation: what budget areas matter most, concrete impacts, what's changing
export const personalImpacts = {
    eltern: {
        headline: 'Als Elternteil profitierst du von €27,6 Mrd jährlich',
        relevantAreas: [
            {
                budget: 'Familie & Jugend',
                amount: '€13,8 Mrd',
                personal: 'Kindergeld: €250/Monat pro Kind (€3.000/Jahr). Elterngeld: bis zu €1.800/Monat für 14 Monate.',
                icon: 'Heart',
            },
            {
                budget: 'Bildung & Forschung',
                amount: '€22,3 Mrd',
                personal: 'Digitalpakt Schule: €6,5 Mrd für Tablets und WLAN. Startchancen-Programm: 4.000 Schulen in benachteiligten Gebieten.',
                icon: 'GraduationCap',
            },
            {
                budget: 'Gesundheit',
                amount: '€18,5 Mrd',
                personal: 'Kindervorsorge (U1-U9) kostenlos. Bundeszuschuss hält deinen Krankenkassenbeitrag bei 14,6%.',
                icon: 'Heart',
            },
        ],
        changes: [
            { text: 'Kindergeld seit 2023 auf €250 erhöht — aber nicht inflationsangepasst. Real verliert es an Wert.', direction: 'negative' },
            { text: 'Rechtsanspruch auf Ganztagsbetreuung ab 2026 — Bund investiert €3,5 Mrd in den Ausbau.', direction: 'positive' },
            { text: 'Elterngeld-Einkommensgrenze von €300.000 auf €200.000 gesenkt — betrifft 6.000 Familien.', direction: 'negative' },
        ],
        taxExample: {
            income: 45000,
            tax: 7200,
            breakdown: [
                { label: 'Dein Anteil an der Rente anderer', amount: 2650, icon: 'Users' },
                { label: 'Kindergeld deiner eigenen Kinder', amount: 216, icon: 'Heart' },
                { label: 'Schulen & Forschung', amount: 324, icon: 'GraduationCap' },
                { label: 'Zinsen auf Staatsschulden', amount: 511, icon: 'Wallet' },
                { label: 'Bundeswehr', amount: 785, icon: 'Shield' },
                { label: 'Straßen & Schiene', amount: 655, icon: 'Train' },
            ],
        },
    },
    student: {
        headline: 'Als Student:in betreffen dich direkt €24,6 Mrd',
        relevantAreas: [
            {
                budget: 'Bildung & Forschung',
                amount: '€22,3 Mrd',
                personal: 'BAföG: bis €934/Monat (ab 2024). Nur 11% der Studierenden erhalten es — die Bedarfssätze steigen langsamer als die Mieten.',
                icon: 'GraduationCap',
            },
            {
                budget: 'Verkehr & Digitales',
                amount: '€44,5 Mrd',
                personal: 'Deutschlandticket €49/Monat, als Semesterticket teilweise noch günstiger. Kosten für den Bund: €3,2 Mrd/Jahr.',
                icon: 'Train',
            },
            {
                budget: 'Arbeit & Soziales',
                amount: '€179,1 Mrd',
                personal: 'Wohngeld-Reform: Mehr Studierende anspruchsberechtigt. Aber: Bürgergeld steht unter politischem Druck.',
                icon: 'Users',
            },
        ],
        changes: [
            { text: 'BAföG-Satz 2024 auf €934 erhöht, aber Wohnpauschale (€360) deckt in keiner Unistadt die reale Miete.', direction: 'negative' },
            { text: 'Deutschlandticket gibt es als Semesterticket — aber die Finanzierung steht jedes Jahr neu zur Debatte.', direction: 'neutral' },
            { text: 'Bildungsausgaben des Bundes stagnieren real seit 2019 — inflationsbereinigt ein Rückgang um 8%.', direction: 'negative' },
        ],
        taxExample: {
            income: 12000,
            tax: 0,
            breakdown: [
                { label: 'Du zahlst keine Einkommensteuer', amount: 0, icon: 'Check' },
                { label: 'Aber: 19% MwSt auf fast alles', amount: 1520, icon: 'Wallet' },
                { label: 'Davon finanziert: dein BAföG', amount: 0, icon: 'GraduationCap' },
                { label: 'Davon finanziert: dein Semesterticket', amount: 0, icon: 'Train' },
            ],
        },
    },
    rentner: {
        headline: 'Der Bundeshaushalt gibt €124 Mrd für deine Rente aus',
        relevantAreas: [
            {
                budget: 'Arbeit & Soziales',
                amount: '€179,1 Mrd',
                personal: 'Bundeszuschuss Rente: €124 Mrd — ein Viertel des gesamten Haushalts. Durchschnittsrente: €1.550/Monat (West), €1.470 (Ost).',
                icon: 'Users',
            },
            {
                budget: 'Gesundheit',
                amount: '€18,5 Mrd',
                personal: 'Bundeszuschuss hält Krankenkassenbeiträge stabil. Pflegeversicherung: ab Pflegegrad 2 gibt es Sachleistungen.',
                icon: 'Heart',
            },
            {
                budget: 'Bundesschuld (Zinsen)',
                amount: '€34,8 Mrd',
                personal: 'Jeder Euro Zinsausgaben ist ein Euro weniger für Rente, Pflege und Infrastruktur. Die Zinslast steigt.',
                icon: 'Wallet',
            },
        ],
        changes: [
            { text: 'Rentenanpassung 2025: +3,5% — aber Inflation frisst einen Teil davon. Real: +1,2%.', direction: 'neutral' },
            { text: 'Renteneintrittsalter steigt schrittweise auf 67. Diskussion über 68 oder 70 läuft.', direction: 'negative' },
            { text: 'Grundrente erreicht 1,1 Mio Menschen — aber viele wissen nicht, dass sie Anspruch haben.', direction: 'positive' },
        ],
        taxExample: {
            income: 18600,
            tax: 950,
            breakdown: [
                { label: 'Dein Steuerbeitrag (gering)', amount: 950, icon: 'Wallet' },
                { label: 'Bundeszuschuss zu DEINER Rente', amount: 7440, icon: 'Users' },
                { label: 'Dein Netto-Vorteil aus dem System', amount: -6490, icon: 'Check' },
            ],
        },
    },
    angestellt: {
        headline: 'Du finanzierst den Haushalt — und bekommst das zurück',
        relevantAreas: [
            {
                budget: 'Arbeit & Soziales',
                amount: '€179,1 Mrd',
                personal: 'Ca. 37% deiner Steuern gehen hierhin. Davon: €124 Mrd Rentenzuschuss, €24 Mrd Bürgergeld. Du finanzierst die Rente der heutigen Rentner:innen.',
                icon: 'Users',
            },
            {
                budget: 'Verkehr & Digitales',
                amount: '€44,5 Mrd',
                personal: 'Dein Arbeitsweg: Pendlerpauschale kostet den Bund €6 Mrd/Jahr. Deutschlandticket: €3,2 Mrd. Straßeninstandhaltung: €12 Mrd.',
                icon: 'Train',
            },
            {
                budget: 'Bundesschuld (Zinsen)',
                amount: '€34,8 Mrd',
                personal: '7,1% deiner Steuern zahlen nur Zinsen — kein Krankenhaus, keine Straße, keine Rente. Nur Zinsen auf alte Schulden.',
                icon: 'Wallet',
            },
        ],
        changes: [
            { text: 'Kalte Progression: Der Grundfreibetrag steigt auf €12.084 — du zahlst etwas weniger Steuern.', direction: 'positive' },
            { text: 'Sozialabgaben steigen: Pflegebeitrag +0,35%, Krankenkasse Zusatzbeitrag steigt im Schnitt.', direction: 'negative' },
            { text: 'Zinslast verdreifacht seit 2021: €4 Mrd → €35 Mrd. Das ist Geld, das anderswo fehlt.', direction: 'negative' },
        ],
        taxExample: {
            income: 52000,
            tax: 8940,
            breakdown: [
                { label: 'Rente (für heutige Rentner:innen)', amount: 3270, icon: 'Users' },
                { label: 'Bundeswehr & Verteidigung', amount: 974, icon: 'Shield' },
                { label: 'Straßen, Schiene, Digital', amount: 814, icon: 'Train' },
                { label: 'Zinsen auf Staatsschulden', amount: 635, icon: 'Wallet' },
                { label: 'Bildung & Forschung', amount: 402, icon: 'GraduationCap' },
                { label: 'Gesundheitsfonds', amount: 340, icon: 'Heart' },
            ],
        },
    },
    selbststaendig: {
        headline: 'Als Selbstständige:r zahlst du mehr — und bekommst weniger zurück',
        relevantAreas: [
            {
                budget: 'Wirtschaft & Klima',
                amount: '€10,2 Mrd',
                personal: 'KfW-Kredite, Mittelstandsförderung, Gründungszuschuss. Aber: Die meisten Programme sind für größere Unternehmen.',
                icon: 'Leaf',
            },
            {
                budget: 'Arbeit & Soziales',
                amount: '€179,1 Mrd',
                personal: 'Du zahlst in die Rente anderer, hast aber selbst keinen Pflichtanspruch. Keine Arbeitslosenversicherung ohne Antrag.',
                icon: 'Users',
            },
            {
                budget: 'Verkehr & Digitales',
                amount: '€44,5 Mrd',
                personal: 'Breitbandausbau: €3 Mrd/Jahr — aber ländliche Selbstständige warten oft noch auf schnelles Internet.',
                icon: 'Train',
            },
        ],
        changes: [
            { text: 'Rentenversicherungspflicht für Selbstständige wird seit Jahren diskutiert — noch nicht beschlossen.', direction: 'neutral' },
            { text: 'Bürokratieabbau versprochen, aber Berichtspflichten steigen. Lieferkettengesetz betrifft auch KMU.', direction: 'negative' },
            { text: 'Energiekostenhilfen 2022/23 sind ausgelaufen — keine Nachfolge für Soloselbstständige.', direction: 'negative' },
        ],
        taxExample: {
            income: 65000,
            tax: 14200,
            breakdown: [
                { label: 'Rente (du bist nicht pflichtversichert)', amount: 5210, icon: 'Users' },
                { label: 'Verteidigung', amount: 1547, icon: 'Shield' },
                { label: 'Verkehr & Infrastruktur', amount: 1293, icon: 'Train' },
                { label: 'Zinsen auf Staatsschulden', amount: 1008, icon: 'Wallet' },
                { label: 'Wirtschaft & Klima', amount: 298, icon: 'Leaf' },
                { label: 'Davon Mittelstandsförderung', amount: 42, icon: 'Zap' },
            ],
        },
    },
    arbeitsuchend: {
        headline: 'Das Sozialsystem gibt €24 Mrd für Arbeitsuchende aus',
        relevantAreas: [
            {
                budget: 'Arbeit & Soziales',
                amount: '€179,1 Mrd',
                personal: 'Bürgergeld: €563/Monat (Alleinstehend) + Miete + Heizung. Eingliederungshilfe: Weiterbildung, Bewerbungskosten, Maßnahmen.',
                icon: 'Users',
            },
            {
                budget: 'Bildung & Forschung',
                amount: '€22,3 Mrd',
                personal: 'Bildungsgutscheine der Agentur für Arbeit. Umschulungen werden gefördert — aber Wartezeiten sind lang.',
                icon: 'GraduationCap',
            },
            {
                budget: 'Gesundheit',
                amount: '€18,5 Mrd',
                personal: 'Krankenversicherung wird vom Jobcenter übernommen. Psychische Gesundheitsversorgung: 3-6 Monate Wartezeit.',
                icon: 'Heart',
            },
        ],
        changes: [
            { text: 'Bürgergeld-Debatte: Sanktionen verschärft, Schonvermögen gesenkt. Politischer Druck auf Kürzungen.', direction: 'negative' },
            { text: 'Weiterbildungsgeld (€150/Monat extra) bei Umschulungen — neues Instrument seit 2023.', direction: 'positive' },
            { text: 'Job-Turbo für Geflüchtete priorisiert schnelle Vermittlung — aber Integration braucht Zeit.', direction: 'neutral' },
        ],
        taxExample: {
            income: 6756,
            tax: 0,
            breakdown: [
                { label: 'Bürgergeld-Regelsatz/Jahr', amount: 6756, icon: 'Users' },
                { label: '+ Miete/Heizung (durchschn.)', amount: 6000, icon: 'Building' },
                { label: '+ Krankenversicherung', amount: 2400, icon: 'Heart' },
                { label: 'Gesamtleistung vom Staat', amount: 15156, icon: 'Check' },
            ],
        },
    },
};

// Impact chains: Lobby → Party → Budget → Your Life
export const impactChains = [
    {
        id: 'auto',
        title: 'Warum dein Zug Verspätung hat',
        lobby: { name: 'VDA (Autolobby)', spending: '€12,4 Mio/Jahr', employees: 46 },
        partyLink: 'CDU und FDP fordern Straßenausbau, Grüne und SPD priorisieren Schiene',
        budgetEffect: 'Verkehrshaushalt: €44,5 Mrd — davon ca. 70% Straße, 30% Schiene',
        yourLife: 'DB-Netz chronisch unterfinanziert: 4.000 marode Brücken, Verspätungsquote 35%. Dein Pendlerweg wird teurer, nicht besser.',
        color: 'var(--color-blue)',
    },
    {
        id: 'pharma',
        title: 'Warum dein Krankenkassenbeitrag steigt',
        lobby: { name: 'BPI + vfa (Pharma)', spending: '€8,2 Mio/Jahr', employees: 35 },
        partyLink: 'Alle Parteien unterstützen Pharmastandort — Preisregulierung bleibt schwach',
        budgetEffect: 'Gesundheitsfonds-Zuschuss: €16,5 Mrd — reicht nicht, Kassen erhöhen Zusatzbeitrag',
        yourLife: 'Zusatzbeitrag 2025: durchschnittlich 2,5% (+0,8%). Bei €4.000 brutto = €32/Monat mehr.',
        color: 'var(--color-green)',
    },
    {
        id: 'rente',
        title: 'Warum für Bildung kein Geld da ist',
        lobby: { name: 'VdK + Sozialverbände', spending: '€3,1 Mio/Jahr', employees: 18 },
        partyLink: 'Alle Parteien garantieren stabiles Rentenniveau — Rentenpaket II beschlossen',
        budgetEffect: 'Rentenzuschuss: €124 Mrd (25% des Haushalts) — Bildung: €22 Mrd (4,5%)',
        yourLife: 'Für jeden €1, den der Bund in Schulen investiert, gehen €5,60 in die Rente. Bildungsausgaben stagnieren seit 5 Jahren real.',
        color: 'var(--color-orange)',
    },
    {
        id: 'zinsen',
        title: 'Warum du für Schulden von gestern zahlst',
        lobby: { name: 'Keine Lobby — politische Altlast', spending: '—', employees: 0 },
        partyLink: 'Corona + Energiekrise: €400 Mrd Neuverschuldung in 3 Jahren. Schuldenbremse verhindert Investitionen.',
        budgetEffect: 'Zinsen: €35 Mrd/Jahr — mehr als Bildung + Gesundheit zusammen',
        yourLife: '€35 Mrd Zinsen = €430 pro Einwohner:in pro Jahr, die in keinen Kindergarten, kein Krankenhaus, keine Straße fließen.',
        color: '#64748b',
    },
];

// MdB letter templates
export const letterTemplates = [
    {
        id: 'transparenz',
        title: 'Öffentliches Vertragsregister fordern',
        context: 'Der Bundesrechnungshof fordert seit 2019 ein öffentliches Register aller Bundesaufträge über €25.000. Die Slowakei hat das seit 2011.',
        subject: 'Forderung: Öffentliches Vertragsregister für Bundesaufträge',
        body: `Sehr geehrte/r [NAME MdB],

als Bürger:in Ihres Wahlkreises schreibe ich Ihnen, weil mir Transparenz bei der Verwendung von Steuergeld wichtig ist.

Der Bundesrechnungshof empfiehlt seit Jahren ein öffentliches Register aller Bundesaufträge über 25.000 Euro. Die Slowakei praktiziert dies erfolgreich seit 2011 — Verträge ohne Veröffentlichung sind dort unwirksam.

Ich bitte Sie:
1. Setzen Sie sich in Ihrer Fraktion für ein Transparenzregister für Bundesaufträge ein.
2. Unterstützen Sie eine entsprechende Gesetzesinitiative.
3. Informieren Sie mich über Ihre Position zu diesem Thema.

Transparenz schafft Vertrauen. Davon profitieren alle — Politik, Verwaltung und Bürger:innen.

Mit freundlichen Grüßen`,
        source: 'Bundesrechnungshof Bemerkungen 2023, §14',
        count: 2847,
    },
    {
        id: 'bildung',
        title: 'Mehr Geld für Bildung statt Zinsen',
        context: 'Der Bund gibt €35 Mrd für Zinsen aus, aber nur €22 Mrd für Bildung. Pro Schüler:in investiert Deutschland weniger als der OECD-Schnitt.',
        subject: 'Bildungsinvestitionen stärken — Zukunft sichern',
        body: `Sehr geehrte/r [NAME MdB],

der Bundeshaushalt 2025 zeigt ein Ungleichgewicht, das mich als Bürger:in besorgt:

- Zinsen auf Staatsschulden: €35 Mrd (7,1% des Haushalts)
- Bildung und Forschung: €22 Mrd (4,5% des Haushalts)

Für jeden Euro, den der Bund in Bildung investiert, gibt er €1,60 nur für Zinsen aus. Deutschland liegt bei den Bildungsausgaben unter dem OECD-Durchschnitt.

Ich bitte Sie:
1. Setzen Sie sich für eine reale Erhöhung der Bildungsausgaben ein — mindestens inflationsbereinigt.
2. Unterstützen Sie den Digitalpakt 2.0 mit verbindlicher Finanzierung.
3. Prüfen Sie, ob die Schuldenbremse Zukunftsinvestitionen verhindert.

Bildung ist die beste Investition in unsere Zukunft.

Mit freundlichen Grüßen`,
        source: 'OECD Education at a Glance 2024',
        count: 1523,
    },
    {
        id: 'verschwendung',
        title: 'Konsequenzen bei Kostenexplosionen fordern',
        context: 'BER (€6,6 Mrd statt €2,8 Mrd), Gorch Fock (€135 Mio statt €10 Mio), Masken-Beschaffung (€6+ Mrd Schaden). Niemand wurde zur Verantwortung gezogen.',
        subject: 'Persönliche Konsequenzen bei Großprojekt-Kostenexplosionen',
        body: `Sehr geehrte/r [NAME MdB],

dokumentierte Fälle von Steuergeldverschwendung — BER, Gorch Fock, PKW-Maut, Corona-Masken — haben Schäden von über €25 Milliarden verursacht. In keinem Fall wurde politische Verantwortung übernommen.

Ich bitte Sie:
1. Unterstützen Sie gesetzliche Konsequenzen bei Kostenüberschreitungen über 20% in Bundesgroßprojekten.
2. Fordern Sie automatische Prüfungen durch den Bundesrechnungshof bei überschrittenen Projektbudgets.
3. Setzen Sie sich für ein Bonus-Malus-System bei öffentlichen Aufträgen ein.

Steuergeld verdient denselben Respekt wie privates Geld.

Mit freundlichen Grüßen`,
        source: 'Bund der Steuerzahler, Schwarzbuch 2024',
        count: 4102,
    },
];
