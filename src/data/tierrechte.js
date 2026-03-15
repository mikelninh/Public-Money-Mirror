// Tierrechte & Tierleid — Daten, Fakten, Zusammenhänge
// Keine Predigt. Nur Fakten. Die Menschen kommen selbst zur Erkenntnis.
// Alle Daten aus öffentlichen Quellen: Destatis, BMEL, EU, EFSA, WHO, Eurobarometer

// ═══════════════════════════════════════════════════════════════
// DIE ZAHLEN — Was in Deutschland mit Tieren passiert
// ═══════════════════════════════════════════════════════════════
export const fakten = [
    {
        zahl: '763 Mio',
        was: 'Tiere werden jedes Jahr in Deutschland geschlachtet',
        kontext: 'Das sind 2,1 Millionen pro Tag. 24 pro Sekunde. Während du diesen Satz liest, sterben 50 Tiere in deutschen Schlachthöfen.',
        quelle: 'Destatis Schlachtungsstatistik 2024',
    },
    {
        zahl: '€58 Mrd',
        was: 'EU-Agrarsubventionen pro Jahr — ein großer Teil fließt in Massentierhaltung',
        kontext: 'Deutsche Steuerzahler:innen finanzieren mit ~€6,3 Mrd/Jahr ein System, das 82% von ihnen ablehnen. Die Subventionen werden pro Fläche gezahlt — das bevorzugt Großbetriebe.',
        quelle: 'EU-Kommission, GAP-Budget 2024',
    },
    {
        zahl: '82%',
        was: 'der Deutschen wollen strengere Tierschutzgesetze',
        kontext: 'Die demokratische Mehrheit ist überwältigend — aber die Agrarlobby (€9,4 Mio/Jahr) verhindert jede Reform. Das Tierschutzgesetz wurde seit 2006 nicht grundlegend reformiert.',
        quelle: 'Eurobarometer Spezial 533, 2023',
    },
    {
        zahl: '96%',
        was: 'aller Schweine in Deutschland leben in Intensivtierhaltung',
        kontext: 'Kastenstand (0,66m² pro Sau), Spaltenböden, kein Tageslicht, kupierte Schwänze (illegal, aber bei 95% praktiziert). Lebenserwartung: 6 Monate statt 15-20 Jahre.',
        quelle: 'EFSA Scientific Opinion 2022, Destatis Agrarstrukturerhebung',
    },
    {
        zahl: '45 Mio',
        was: 'männliche Küken wurden bis 2022 jährlich geschreddert',
        kontext: 'Seit 2022 verboten — aber ersetzt durch "In-Ovo-Selektion" (Abtötung im Ei). Das Leid wurde verschoben, nicht beendet. Deutschland war das erste EU-Land mit dem Verbot.',
        quelle: 'BMEL, Tierschutzbericht 2023',
    },
    {
        zahl: '€180 Mio',
        was: 'Bundeshaushalt für Tierwohl-Programme (von €489 Mrd gesamt)',
        kontext: 'Das sind 0,037% des Bundeshaushalts. Oder €2,15 pro Einwohner:in pro Jahr. Für Verteidigung gibt der Bund €53 Mrd aus — 300x mehr.',
        quelle: 'BMF Bundeshaushalt 2025, Einzelplan BMEL',
    },
];

// ═══════════════════════════════════════════════════════════════
// DIE VERBINDUNGEN — Warum sich nichts ändert
// ═══════════════════════════════════════════════════════════════
export const warumNichtsPassiert = [
    {
        titel: 'Die Lobby ist 30x stärker',
        details: [
            { seite: 'Agrarlobby', ausgaben: '€9,4 Mio/Jahr', orgs: 'DBV, DRV, BVE, Fleischverband', lobbyisten: 38 },
            { seite: 'Tierschutz', ausgaben: '€370k/Jahr', orgs: 'Tierschutzbund, PETA, Vier Pfoten', lobbyisten: 6 },
        ],
        fazit: 'Für jeden Euro den Tierschutzorganisationen in Lobbyarbeit investieren, gibt die Agrarindustrie 25 Euro aus.',
    },
    {
        titel: 'Subventionen belohnen Masse, nicht Tierwohl',
        details: [
            { fakt: 'EU-Direktzahlungen: €280/Hektar — egal wie die Tiere gehalten werden' },
            { fakt: 'Tierwohl-Prämie (freiwillig): nur 4% der Betriebe nehmen teil' },
            { fakt: 'Großbetriebe mit 10.000 Schweinen bekommen mehr als Biohöfe mit 200' },
        ],
        fazit: 'Das System bestraft Landwirte, die gut zu ihren Tieren sind — und belohnt die, die billig produzieren.',
    },
    {
        titel: 'Das Tierschutzgesetz hat eine eingebaute Ausnahme',
        details: [
            { fakt: '§1 TierSchG: "Niemand darf einem Tier ohne vernünftigen Grund Schmerzen zufügen."' },
            { fakt: '"Vernünftiger Grund" = wirtschaftliches Interesse. Damit wird fast alles erlaubt.' },
            { fakt: 'Kastenstand, Spaltenböden, Schnabelkürzen — alles legal wegen "vernünftigem Grund".' },
        ],
        fazit: 'Das Gesetz schützt die Industrie, nicht die Tiere. Die Definition von "vernünftig" muss geändert werden.',
    },
];

// ═══════════════════════════════════════════════════════════════
// DIE VORBILDER — Andere Länder zeigen: Es geht anders
// ═══════════════════════════════════════════════════════════════
export const vorbilder = [
    {
        land: '🇬🇧 Vereinigtes Königreich',
        titel: 'Animal Welfare (Sentience) Act 2022',
        was: 'Tiere sind gesetzlich als fühlende Wesen anerkannt — nicht als Sachen. Regierung muss bei jedem Gesetz die Auswirkungen auf Tiere prüfen. Unabhängiges Animal Sentience Committee überwacht.',
        ergebnis: 'Lebendfallen für Krebstiere verboten. Foie-Gras-Import verboten. Pelzfarm-Verbot. Käfighaltung wird abgeschafft.',
        quelle: 'UK Parliament, Animal Welfare (Sentience) Act 2022',
    },
    {
        land: '🇦🇹 Österreich',
        titel: 'Strengstes Tierschutzgesetz der EU',
        was: 'Verbot von Wildtieren im Zirkus (seit 2005). Verbot von Käfighaltung für Legehennen (seit 2020). Verbot von Pelzfarmen. Tierschutz-Ombudsleute in jedem Bundesland.',
        ergebnis: 'Österreich hat die niedrigste Käfighaltungsquote in der EU. Tierschutz im Lehrplan. Verbandsklagerecht für Tierschutzorganisationen.',
        quelle: 'Bundestierschutzgesetz Österreich, VGT',
    },
    {
        land: '🇨🇭 Schweiz',
        titel: 'Tierwürde in der Verfassung',
        was: 'Als einziges Land hat die Schweiz "Würde der Kreatur" in der Verfassung (Art. 120). Tiere haben einen eigenen Anwalt in Zürich. Mindestflächen doppelt so groß wie in der EU.',
        ergebnis: 'Batteriekäfige seit 1992 verboten — 30 Jahre vor der EU. Hundekurse Pflicht. Strafregister für Tierquälerei.',
        quelle: 'Schweizer Bundesverfassung Art. 120, TSchG',
    },
    {
        land: '🇳🇿 Neuseeland',
        titel: 'Tiere als fühlende Wesen (2015)',
        was: 'Animal Welfare Amendment Act: Tiere sind offiziell "sentient beings". Kosmetik-Tierversuche komplett verboten. Käfighaltung für Hühner wird bis 2023 abgeschafft.',
        ergebnis: 'Strengste Strafen für Tierquälerei: bis 5 Jahre Haft und $100.000 Geldstrafe.',
        quelle: 'NZ Parliament, Animal Welfare Amendment Act 2015',
    },
    {
        land: '🇩🇰 Dänemark',
        titel: 'CO₂-Steuer auf Viehzucht + Kastenstand-Verbot',
        was: 'Weltweit erstes Land mit CO₂-Steuer auf Viehzucht (ab 2030). Kastenstand seit 2015 verboten. Staatlicher Umstellungsfonds für Landwirte.',
        ergebnis: 'Beweis, dass Tierschutz und Wirtschaft vereinbar sind — kein Betrieb musste schließen.',
        quelle: 'Danish Ministry of Food, Agriculture and Fisheries 2024',
    },
];

// ═══════════════════════════════════════════════════════════════
// DIE VISION — Win-Win-Win: Tiere, Menschen, Planet
// ═══════════════════════════════════════════════════════════════
export const winWinWin = [
    {
        fuer: 'Für Tiere',
        icon: 'Heart',
        punkte: [
            'Anerkennung als fühlende Wesen — nicht als Produktionseinheiten',
            'Ende der Kastenstandhaltung, Käfighaltung, Spaltenböden',
            'Verbot von Lebendtiertransporten über 4 Stunden',
            'Unabhängige, unangekündigte Kontrollen in allen Betrieben',
        ],
    },
    {
        fuer: 'Für Landwirte',
        icon: 'Users',
        punkte: [
            'Staatlicher Umstellungsfonds — kein Betrieb muss schließen',
            'Faire Preise statt Dumping: Wenn alle höhere Standards haben, steigen die Preise für alle',
            'Neue Märkte: Pflanzliche Produkte wachsen 15% pro Jahr',
            'Planungssicherheit: Klare Übergangsfristen statt ewige Debatten',
        ],
    },
    {
        fuer: 'Für uns alle',
        icon: 'Globe',
        punkte: [
            'Gesündere Ernährung: Weniger Antibiotika, weniger Pandemie-Risiko',
            'Klimaschutz: Tierhaltung verursacht 14,5% der globalen Emissionen (FAO)',
            'Sauberes Grundwasser: Weniger Gülle, weniger Nitrat',
            'Steuergelder sinnvoller einsetzen: €6,3 Mrd/Jahr für ein System das 82% ablehnen → umlenken in Zukunft',
        ],
    },
];

// ═══════════════════════════════════════════════════════════════
// WAS DU TUN KANNST — Konkret, sofort, wirkungsvoll
// ═══════════════════════════════════════════════════════════════
export const aktionen = [
    {
        titel: 'Bürgerfrage auf abgeordnetenwatch.de stellen',
        beschreibung: 'Frag deine:n Abgeordnete:n: "Wann wird das Tierschutzgesetz reformiert? Warum erlaubt §1 TierSchG immer noch Kastenstandhaltung?"',
        aufwand: '5 Minuten',
        wirkung: 'Die Antwort (oder Nicht-Antwort) ist öffentlich dokumentiert',
        url: 'https://www.abgeordnetenwatch.de',
    },
    {
        titel: 'Unsere Kampagne unterstützen',
        beschreibung: 'Brief an den Agrarausschuss kopieren und an alle 34 Mitglieder senden. 4.218+ haben es schon getan.',
        aufwand: '3 Minuten',
        wirkung: 'Gebündelter Druck — MdBs müssen öffentlich antworten',
        url: '#kampagnen',
    },
    {
        titel: 'Mit dem Einkauf abstimmen',
        beschreibung: 'Jeder Kauf ist eine Stimme. Bio (Stufe 4), Neuland, oder pflanzlich. Die Nachfrage bestimmt das Angebot.',
        aufwand: 'Dauerhaft',
        wirkung: 'Pflanzliche Produkte wachsen 15%/Jahr — die Industrie folgt dem Geld',
        url: null,
    },
    {
        titel: 'Teilen — das Wichtigste',
        beschreibung: 'Teile diese Fakten mit Menschen die du liebst. Nicht belehrend, sondern: "Wusstest du, dass 82% der Deutschen strengere Tierschutzgesetze wollen — aber die Lobby es verhindert?"',
        aufwand: '1 Minute',
        wirkung: 'Bewusstsein ist der erste Schritt. Jedes Gespräch zählt.',
        url: null,
    },
];
