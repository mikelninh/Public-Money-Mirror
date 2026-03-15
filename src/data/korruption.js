// Korrelations-Datenbank: Lobby × Nebeneinkünfte × Abstimmungen × Drehtür
// Nur dokumentierte, öffentlich belegte Fälle. Keine Spekulation.
// Quellen: Bundestag, abgeordnetenwatch, LobbyControl, Bundesrechnungshof, Medienberichte

// ═══════════════════════════════════════════════════════════════
// 1. DOKUMENTIERTE SKANDALE — mit Quellen und Konsequenzen
// ═══════════════════════════════════════════════════════════════
export const skandale = [
    {
        id: 'masken',
        titel: 'Maskenaffäre',
        jahr: '2021',
        kategorie: 'Selbstbereicherung',
        schwere: 'hoch',
        personen: [
            { name: 'Georg Nüßlein', partei: 'CSU', rolle: 'MdB', konsequenz: 'Immunität aufgehoben, Partei verlassen, kein Mandat mehr' },
            { name: 'Alfred Sauter', partei: 'CSU', rolle: 'MdL Bayern', konsequenz: 'Aus Fraktion ausgeschlossen, Verfahren eingestellt (Immunitätsschutz)' },
            { name: 'Nikolas Löbel', partei: 'CDU', rolle: 'MdB', konsequenz: 'Mandat niedergelegt, aus CDU ausgetreten' },
        ],
        betrag: '€1,2 Mio+ Provisionen',
        beschreibung: 'Mehrere MdBs kassierten Provisionen für die Vermittlung von Masken-Deals zwischen Herstellern und Behörden — mitten in der Pandemie.',
        wasPassierte: 'MdBs nutzten ihre politischen Kontakte, um Masken-Kaufverträge zu vermitteln und dafür sechsstellige Provisionen zu kassieren. Die Masken wurden teilweise überteuert eingekauft.',
        konsequenzen: 'BGH entschied: Keine Strafbarkeit — das Bestechungsgesetz deckt Provisionen für Mandatsträger nicht ab. Die Gesetzeslücke besteht bis heute. CDU/CSU führte Verhaltensregeln ein. Das Lobbyregister wurde 2022 als Reaktion eingeführt.',
        quelle: 'Süddeutsche Zeitung, Spiegel, Staatsanwaltschaft München',
        quelleUrl: 'https://www.sueddeutsche.de/thema/Maskenaffaere',
    },
    {
        id: 'aserbaidschan',
        titel: 'Aserbaidschan-Affäre (Kaviar-Diplomatie)',
        jahr: '2020-2021',
        kategorie: 'Bestechung',
        schwere: 'hoch',
        personen: [
            { name: 'Karin Strenz', partei: 'CDU', rolle: 'MdB', konsequenz: 'Gestorben 2021, posthum verurteilt' },
            { name: 'Axel Fischer', partei: 'CDU', rolle: 'MdB', konsequenz: 'Mandat verloren, Partei verlassen' },
            { name: 'Eduard Lintner', partei: 'CSU', rolle: 'Ex-MdB', konsequenz: 'Verurteilt wegen Bestechlichkeit' },
        ],
        betrag: '€600.000+ an deutsche Politiker',
        beschreibung: 'Aserbaidschan bezahlte systematisch europäische Parlamentarier, um pro-aserbaidschanische Berichte und Abstimmungen im Europarat zu erwirken.',
        wasPassierte: 'Über eine Briefkastenfirma in London zahlte die aserbaidschanische Regierung Hunderttausende Euro an Abgeordnete. Im Gegenzug stimmten diese gegen Menschenrechtsresolutionen zu Aserbaidschan.',
        konsequenzen: 'Lintner verurteilt zu 1 Jahr 8 Monate auf Bewährung + €120.000 Geldstrafe. Europarat-Reform der Transparenzregeln.',
        quelle: 'Spiegel, ESI (European Stability Initiative), Europarat-Untersuchung',
        quelleUrl: 'https://www.esiweb.org/publications/caviar-diplomacy',
    },
    {
        id: 'cumex',
        titel: 'Cum-Ex — Größter Steuerraub Europas',
        jahr: '2006-2020',
        kategorie: 'Steuerbetrug + politische Verflechtung',
        schwere: 'kritisch',
        personen: [
            { name: 'Olaf Scholz', partei: 'SPD', rolle: 'Bundeskanzler (damals Hamburger Bürgermeister)', konsequenz: 'Erinnerungslücken im Untersuchungsausschuss, keine Anklage' },
            { name: 'Peter Tschentscher', partei: 'SPD', rolle: 'Hamburger Bürgermeister (damals Finanzsenator)', konsequenz: 'Keine Konsequenzen' },
        ],
        betrag: '€10+ Mrd Steuerschaden (gesamt), €47 Mio Warburg-Fall Hamburg',
        beschreibung: 'Banken ließen sich Steuern erstatten, die nie gezahlt wurden. Die Hamburger Finanzverwaltung verzichtete auf Rückforderungen gegen Warburg Bank — nach Treffen mit dem damaligen Bürgermeister Scholz.',
        wasPassierte: 'Banken und Investoren nutzten ein Schlupfloch: Sie ließen sich Kapitalertragsteuer erstatten, die nie gezahlt wurde. Das Hamburger Finanzamt verzichtete 2016 auf €47 Mio Rückforderung gegen die Warburg Bank — kurz nach Treffen zwischen Warburg-Chef Olearius und Bürgermeister Scholz.',
        konsequenzen: 'Scholz sagte vor Untersuchungsausschüssen aus — konnte sich an Treffen nicht erinnern (Tagebücher existieren). Warburg-Banker verurteilt. Steuerliche Rückforderungen laufen. Systemisches Problem erst 2021 gesetzlich geschlossen.',
        quelle: 'CORRECTIV, ARD Panorama, Untersuchungsausschüsse Hamburg + Bundestag',
        quelleUrl: 'https://correctiv.org/top-stories/2021/10/21/cumex-files/',
    },
    {
        id: 'berater',
        titel: 'Berateraffäre Bundeswehr',
        jahr: '2014-2019',
        kategorie: 'Verschwendung + Vetternwirtschaft',
        schwere: 'hoch',
        personen: [
            { name: 'Ursula von der Leyen', partei: 'CDU', rolle: 'Verteidigungsministerin', konsequenz: 'Keine — wurde EU-Kommissionspräsidentin. Handy-Daten gelöscht.' },
        ],
        betrag: '€155+ Mio für externe Berater',
        beschreibung: 'Das BMVg vergab Beraterverträge ohne ordnungsgemäße Vergabe. McKinsey, Accenture und andere erhielten Direktaufträge. Handydaten wurden gelöscht.',
        wasPassierte: 'Externe Berater erhielten Aufträge im dreistelligen Millionenbereich ohne korrekte Ausschreibung. Eine enge persönliche Beziehung zwischen einer BMVg-Staatssekretärin und einer McKinsey-Beraterin wurde aufgedeckt. Handydaten von der Leyens wurden wegen "Sicherheitsbedenken" gelöscht.',
        konsequenzen: 'Untersuchungsausschuss konnte die volle Verantwortung nicht klären — zentrale Beweise (Handydaten) vernichtet. Von der Leyen wurde EU-Kommissionspräsidentin.',
        quelle: 'Untersuchungsausschuss 19. Bundestag, Spiegel, Zeit',
        quelleUrl: 'https://www.bundestag.de/ausschuesse/untersuchungsausschuesse',
    },
    {
        id: 'amthor',
        titel: 'Amthor-Affäre (Augustus Intelligence)',
        jahr: '2020',
        kategorie: 'Lobbyismus + Interessenkonflikt',
        schwere: 'mittel',
        personen: [
            { name: 'Philipp Amthor', partei: 'CDU', rolle: 'MdB', konsequenz: 'Lobbyregister-Eintrag nachgeholt, keine weiteren Konsequenzen' },
        ],
        betrag: 'Aktienoptionen (Wert unbekannt)',
        beschreibung: 'MdB Amthor warb bei der Bundesregierung für das US-Unternehmen Augustus Intelligence — und besaß gleichzeitig Aktienoptionen und einen Direktorenposten.',
        wasPassierte: 'Amthor schrieb Briefe an das Wirtschaftsministerium zugunsten von Augustus Intelligence und traf sich mit Regierungsvertretern. Gleichzeitig hatte er Aktienoptionen der Firma und saß im Board of Directors.',
        konsequenzen: 'Amthor gab Aktienoptionen zurück und trat aus dem Board aus. Keine strafrechtlichen Konsequenzen. Führte zu Diskussionen über strengere Lobbyregeln.',
        quelle: 'Spiegel, abgeordnetenwatch.de',
        quelleUrl: 'https://www.spiegel.de/politik/deutschland/philipp-amthor-und-augustus-intelligence-a-c4579a55-faa8-4440-8131-9b2e43391737',
    },
];

// ═══════════════════════════════════════════════════════════════
// 2. DREHTÜR — Politiker → Wirtschaft (mit Karenzzeit-Bewertung)
// ═══════════════════════════════════════════════════════════════
export const drehtuer = [
    {
        name: 'Gerhard Schröder',
        partei: 'SPD',
        politischesAmt: 'Bundeskanzler (1998-2005)',
        neuerJob: 'Aufsichtsratschef Nord Stream AG, Board Rosneft',
        wechselNachMonaten: 3,
        branche: 'Energie (Russland)',
        problematisch: 'kritisch',
        grund: 'Als Kanzler genehmigte er Nord Stream 1, wurde 3 Monate später von Gazprom/Rosneft eingestellt. Trotz Russlands Ukraine-Invasion blieb er jahrelang in den Positionen.',
        quelle: 'LobbyControl, Spiegel',
    },
    {
        name: 'Eckart von Klaeden',
        partei: 'CDU',
        politischesAmt: 'Staatsminister im Bundeskanzleramt (2009-2013)',
        neuerJob: 'Cheflobbyist Daimler AG',
        wechselNachMonaten: 1,
        branche: 'Automobil',
        problematisch: 'hoch',
        grund: 'Nur 1 Monat nach Ausscheiden aus dem Kanzleramt wurde er Cheflobbyist bei Daimler. Hatte zuvor als Staatsminister Zugang zu allen Regierungsinformationen.',
        quelle: 'LobbyControl Drehtür-Report',
    },
    {
        name: 'Sigmar Gabriel',
        partei: 'SPD',
        politischesAmt: 'Vizekanzler, Außenminister, Wirtschaftsminister',
        neuerJob: 'Berater Deutsche Bank, Aufsichtsrat Siemens Energy',
        wechselNachMonaten: 12,
        branche: 'Finanzen / Energie',
        problematisch: 'hoch',
        grund: 'Als Wirtschaftsminister zuständig für Bankenregulierung — dann Berater bei der Deutschen Bank.',
        quelle: 'LobbyControl, Handelsblatt',
    },
    {
        name: 'Ronald Pofalla',
        partei: 'CDU',
        politischesAmt: 'Kanzleramtsminister, Geheimdienstkoordinator',
        neuerJob: 'Vorstand Deutsche Bahn',
        wechselNachMonaten: 6,
        branche: 'Verkehr',
        problematisch: 'hoch',
        grund: 'Als Kanzleramtsminister für Infrastrukturpolitik mitverantwortlich — wechselte dann in den Vorstand der DB, die er als Minister beaufsichtigte.',
        quelle: 'LobbyControl, FAZ',
    },
    {
        name: 'Dirk Niebel',
        partei: 'FDP',
        politischesAmt: 'Entwicklungsminister (2009-2013)',
        neuerJob: 'Cheflobbyist Rheinmetall (Rüstung)',
        wechselNachMonaten: 8,
        branche: 'Rüstung',
        problematisch: 'hoch',
        grund: 'Als Entwicklungsminister mitverantwortlich für Rüstungsexportpolitik — dann Cheflobbyist bei Deutschlands größtem Rüstungskonzern.',
        quelle: 'LobbyControl, Spiegel',
    },
    {
        name: 'Thomas de Maizière',
        partei: 'CDU',
        politischesAmt: 'Innenminister, Verteidigungsminister',
        neuerJob: 'Aufsichtsräte: Deutsche Telekom, Commerzbank',
        wechselNachMonaten: 18,
        branche: 'Telekom / Finanzen',
        problematisch: 'mittel',
        grund: 'Hielt sich an die (freiwillige) Karenzzeit. Aber: Als Innenminister war er für IT-Sicherheitspolitik zuständig — Telekom ist direkt betroffen.',
        quelle: 'LobbyControl',
    },
    {
        name: 'Karl-Theodor zu Guttenberg',
        partei: 'CSU',
        politischesAmt: 'Verteidigungsminister (2009-2011)',
        neuerJob: 'Berater für Augustus Intelligence, Wirecard-Lobbyist',
        wechselNachMonaten: 12,
        branche: 'Tech / Finanz-Betrug',
        problematisch: 'kritisch',
        grund: 'Lobbyierte bei Angela Merkel persönlich für Wirecard — einen Konzern, der sich als Milliarden-Betrug herausstellte.',
        quelle: 'Wirecard-Untersuchungsausschuss, Financial Times',
    },
];

// ═══════════════════════════════════════════════════════════════
// 3. VERDÄCHTIGE KORRELATIONEN — Lobby × Spenden × Abstimmung
// Keine Anschuldigungen, nur öffentliche Daten nebeneinandergelegt
// ═══════════════════════════════════════════════════════════════
export const korrelationen = [
    {
        id: 'auto-klima',
        titel: 'Autolobby × Klimapolitik',
        lobby: { name: 'VDA + ADAC', ausgaben: '€14,3 Mio/Jahr', lobbyisten: 54 },
        spenden: 'Automobilindustrie spendete 2017-2021: €4,8 Mio an CDU/CSU, €1,2 Mio an FDP, €340k an SPD',
        abstimmung: 'CDU/CSU und FDP stimmten 2023 gegen das Verbrenner-Aus auf EU-Ebene. FDP erwirkte "E-Fuels-Ausnahme".',
        ergebnis: 'Deutschland blockierte das EU-Verbrenner-Aus monatelang — auf Druck der FDP, dem größten Empfänger von Auto-Lobby-Spenden pro Kopf.',
        frage: 'Wie unabhängig stimmen Parteien ab, die Millionen von der Autolobby erhalten?',
        quelle: 'Rechenschaftsberichte der Parteien (bundestag.de), LobbyControl, EU-Ratsprotokoll',
    },
    {
        id: 'pharma-gesundheit',
        titel: 'Pharma-Lobby × Gesundheitspolitik',
        lobby: { name: 'BPI + vfa + BAH', ausgaben: '€11,8 Mio/Jahr', lobbyisten: 53 },
        spenden: 'Pharma-Unternehmen spendeten 2017-2021: €2,1 Mio an CDU/CSU, €890k an FDP',
        abstimmung: 'Medikamenten-Preisregulierung wurde 2022/23 mehrfach verwässert. AMNOG-Reform blieb zahnlos.',
        ergebnis: 'Deutschland hat die dritthöchsten Medikamentenpreise der OECD. Krankenkassenbeiträge steigen. Pharmaindustrie macht Rekordgewinne.',
        frage: 'Wer profitiert davon, dass Medikamentenpreise nicht reguliert werden — Patienten oder Aktionäre?',
        quelle: 'Rechenschaftsberichte, BMG, OECD Health Data',
    },
    {
        id: 'immobilien-wohnen',
        titel: 'Immobilien-Lobby × Wohnungspolitik',
        lobby: { name: 'ZIA + GdW + Haus&Grund', ausgaben: '€4,2 Mio/Jahr', lobbyisten: 22 },
        spenden: 'Immobilienwirtschaft spendete 2017-2021: €3,4 Mio an CDU/CSU, €1,8 Mio an FDP',
        abstimmung: 'Mietendeckel Berlin vom BVerfG gekippt (auf Initiative von CDU/FDP). Bundesweiter Mietendeckel nie ernsthaft diskutiert.',
        ergebnis: '400.000 Wohnungen/Jahr versprochen, ~270.000 geliefert. Mieten in Großstädten seit 2015 um 30-50% gestiegen. Sozialer Wohnungsbau bei 25.000/Jahr (Bedarf: 100.000).',
        frage: 'Warum baut Deutschland zu wenig Sozialwohnungen, obwohl alle Parteien es versprechen?',
        quelle: 'Rechenschaftsberichte, Destatis Baustatistik, Pestel-Institut',
    },
    {
        id: 'agrar-tierschutz',
        titel: 'Agrarlobby × Tierschutz',
        lobby: { name: 'DBV + DRV + BVE', ausgaben: '€9,4 Mio/Jahr', lobbyisten: 38 },
        spenden: 'Agrar- und Ernährungsindustrie spendete 2017-2021: €1,9 Mio an CDU/CSU',
        abstimmung: 'Tierschutzgesetz-Reform gescheitert. Kastenstand-Verbot auf 2036 verschoben. Tiertransportzeiten nicht verkürzt.',
        ergebnis: 'Deutschland hat das schwächste Tierschutzgesetz unter den westeuropäischen Ländern. Die Agrarlobby gibt 30x mehr aus als Tierschutzorganisationen.',
        frage: 'Wenn alle Bürger:innen besseren Tierschutz wollen — warum passiert nichts?',
        quelle: 'Rechenschaftsberichte, BMEL, Eurobarometer (82% für strengeren Tierschutz)',
    },
    {
        id: 'energie-fossil',
        titel: 'Fossile Lobby × Energiewende',
        lobby: { name: 'BDEW + MWV + BVEG', ausgaben: '€12,1 Mio/Jahr', lobbyisten: 62 },
        spenden: 'Energiekonzerne spendeten 2017-2021: €2,7 Mio an CDU/CSU, €1,1 Mio an FDP, €580k an SPD',
        abstimmung: 'Kohleausstieg 2038 (statt 2030 wie versprochen). LNG-Terminals genehmigt in Rekordzeit — Windkraft braucht 4-7 Jahre.',
        ergebnis: 'Eine LNG-Terminal-Genehmigung: 4 Monate. Eine Windrad-Genehmigung: 4-7 Jahre. Gleicher Staat, gleiche Gesetze, unterschiedliche Prioritäten.',
        frage: 'Warum wird fossile Infrastruktur 10x schneller genehmigt als erneuerbare?',
        quelle: 'Bundesnetzagentur, BMWK, LobbyControl Factsheet Energiepolitik',
    },
];

// ═══════════════════════════════════════════════════════════════
// 4. KARENZZEIT-TRACKER — Wie lange warten Politiker?
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// 3b. PARTEISPENDEN — Wer bezahlt die Parteien?
// Quelle: Rechenschaftsberichte (bundestag.de), DonationWatch
// ═══════════════════════════════════════════════════════════════
export const parteispenden = {
    zeitraum: '2022-2025',
    quelle: 'Bundestag Rechenschaftsberichte, donation.watch',
    gesamtRanking: [
        { partei: 'CDU/CSU', betrag: 13060000, topSpender: ['Quandt/Klatten (BMW): €690k', 'Evonik: €385k', 'Südwestmetall: €340k'] },
        { partei: 'BSW', betrag: 8550000, topSpender: ['Einzelspende €1,5 Mio (Jan 2025)', 'Herkunft teils unklar'] },
        { partei: 'FDP', betrag: 6400000, topSpender: ['Quandt/Klatten: €300k', 'Deutsche Vermögensberatung: €210k'] },
        { partei: 'AfD', betrag: 5310000, topSpender: ['Großspende €1,5 Mio (Jan 2025)', 'Mittelstandsvereinigung'] },
        { partei: 'SPD', betrag: 3200000, topSpender: ['Metall-Arbeitgeber: €250k', 'Deutsche Bank: €180k'] },
        { partei: 'Grüne', betrag: 1800000, topSpender: ['Kleinspenden dominieren', 'Windkraft-Branche: €120k'] },
        { partei: 'Linke', betrag: 620000, topSpender: ['Fast ausschließlich Kleinspenden'] },
    ],
    probleme: [
        'Spenden unter €10.000/Jahr werden nicht veröffentlicht — die Mehrzahl bleibt im Dunkeln.',
        'Großspenden-Schwelle lag bis 2024 bei €50.000 — darunter: keine sofortige Offenlegung.',
        'Splitting: Ein Unternehmer spendete €120.000 an die CSU — aufgeteilt auf 5 Firmen, um unter der Grenze zu bleiben.',
        'Rechenschaftsberichte erscheinen mit 1,5 Jahren Verzögerung — dann ist die Legislatur fast vorbei.',
    ],
};

export const karenzregeln = {
    aktuell: 'Bundesminister und parlamentarische Staatssekretäre unterliegen einer Karenzzeit von 12-18 Monaten. MdBs: keine Karenzzeit.',
    probleme: [
        'Karenzzeit gilt nur für Minister — nicht für MdBs oder deren Mitarbeiter.',
        'Ehemaliges Kanzleramt-Personal kann sofort in die Lobby wechseln.',
        'Kein unabhängiges Kontrollgremium — das Kabinett entscheidet über sich selbst.',
        'Karenzzeit kann auf 0 Monate verkürzt werden — und wurde es oft.',
    ],
    forderungen: [
        { text: '3 Jahre Karenzzeit für alle Regierungsmitglieder', vorbild: 'Kanada: 5 Jahre für Senior Officials' },
        { text: 'Unabhängige Ethik-Kommission statt Selbstkontrolle', vorbild: 'Frankreich: HATVP (Haute Autorité pour la transparence)' },
        { text: 'Lobbyverbot in eigenen ehemaligen Zuständigkeitsbereichen', vorbild: 'USA: Lifetime ban für bestimmte Bereiche' },
        { text: 'Karenzzeit auch für MdBs und deren Mitarbeiter', vorbild: 'EU: 2 Jahre für EU-Kommissare' },
    ],
};
