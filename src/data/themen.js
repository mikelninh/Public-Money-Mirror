// Themen-Datenbank: Jedes Thema mit Zuständigkeit, Budget, Versprechen, Lobby, Vergleich, Lösungen
// Quellen: BMF, Koalitionsverträge, OECD, EU-Vergleichsdaten, Lobbyregister

export const themen = [
    {
        id: 'tierschutz',
        keywords: ['tierschutz', 'tierrechte', 'tierwohl', 'massentierhaltung', 'tierversuche', 'tiere'],
        name: 'Tierschutz & Tierwohl',
        icon: 'Heart',
        color: 'var(--color-green)',
        zustaendig: {
            ministerium: 'Bundesministerium für Ernährung und Landwirtschaft (BMEL)',
            minister: 'Cem Özdemir (Grüne) → Nachfolger in neuer Regierung',
            ausschuss: 'Ausschuss für Ernährung und Landwirtschaft',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a10',
        },
        budget: {
            ressort: '€7,5 Mrd (Landwirtschaft gesamt)',
            anteil: '~€180 Mio direkt für Tierwohl-Programme',
            vergleich: 'Das sind €2,15 pro Einwohner:in für Tierschutz — Dänemark gibt €8,40 aus.',
        },
        versprechen: {
            text: 'Tierschutzgesetz grundlegend überarbeiten, Kastenstandhaltung beenden, Tiertransportzeiten begrenzen',
            status: 'Entwurf vorgelegt, nicht verabschiedet',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'Deutscher Tierschutzbund', ausgaben: '€280.000/Jahr', lobbyisten: 4 },
                { name: 'PETA Deutschland', ausgaben: '€90.000/Jahr', lobbyisten: 2 },
            ],
            dagegen: [
                { name: 'Deutscher Bauernverband (DBV)', ausgaben: '€5,7 Mio/Jahr', lobbyisten: 22 },
                { name: 'Verband der Fleischwirtschaft', ausgaben: '€520.000/Jahr', lobbyisten: 5 },
            ],
            fazit: 'Die Agrar-Lobby gibt 20x mehr aus als Tierschutzorganisationen. Das erklärt, warum Reformen langsam vorankommen.',
        },
        international: {
            vorbild: 'Dänemark',
            flagge: '🇩🇰',
            wasBeimVorbild: 'Dänemark hat 2024 als erstes Land eine CO₂-Steuer auf Viehzucht eingeführt (€100/Tonne ab 2030). Kastenstand für Sauen seit 2015 verboten. Unabhängige Tierschutz-Inspektionen ohne Vorankündigung.',
            wasWirLernen: 'Wirtschaftliche Anreize (CO₂-Steuer) statt nur Verbote. Unangekündigte Kontrollen statt Selbstberichterstattung. Übergangsfristen mit Entschädigung für Landwirte.',
            quelle: 'Danish Ministry of Food, Agriculture and Fisheries 2024',
        },
    },
    {
        id: 'ernaehrung',
        keywords: ['ernährung', 'essen', 'lebensmittel', 'nahrung', 'bio', 'landwirtschaft', 'vegan', 'vegetarisch'],
        name: 'Ernährung & Lebensmittel',
        icon: 'Heart',
        color: 'var(--color-orange)',
        zustaendig: {
            ministerium: 'Bundesministerium für Ernährung und Landwirtschaft (BMEL)',
            minister: 'BMEL-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Ernährung und Landwirtschaft',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a10',
        },
        budget: {
            ressort: '€7,5 Mrd (Landwirtschaft gesamt)',
            anteil: '~€95 Mio für Ernährungsaufklärung und -forschung',
            vergleich: 'Deutschland subventioniert Fleischproduktion mit 7% MwSt (ermäßigt), Hafermilch mit 19% (voll).',
        },
        versprechen: {
            text: 'Ernährungsstrategie entwickeln, Kindernährung in Schulen verbessern, Lebensmittelverschwendung halbieren bis 2030',
            status: 'Ernährungsstrategie 2023 beschlossen, aber kaum umgesetzt',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Verbraucherzentrale Bundesverband', ausgaben: '€1,2 Mio/Jahr', lobbyisten: 8 },
                { name: 'foodwatch', ausgaben: '€310.000/Jahr', lobbyisten: 3 },
            ],
            dagegen: [
                { name: 'Bundesvereinigung der Deutschen Ernährungsindustrie (BVE)', ausgaben: '€2,8 Mio/Jahr', lobbyisten: 12 },
                { name: 'Lebensmittelverband Deutschland', ausgaben: '€1,9 Mio/Jahr', lobbyisten: 9 },
            ],
            fazit: 'Die Ernährungsindustrie-Lobby ist stärker als Verbraucherschutz-Organisationen. Ein Ampel-Nährwertlabel (Nutri-Score) wurde nur freiwillig eingeführt.',
        },
        international: {
            vorbild: 'Finnland',
            flagge: '🇫🇮',
            wasBeimVorbild: 'Finnland hat die beste Schulverpflegung Europas: Kostenlos, bio, regional, täglich eine warme Mahlzeit für alle Schüler:innen — seit 1948. Verpflichtendes Nährwertlabel. Zuckersteuer seit 2011.',
            wasWirLernen: 'Kostenloses Schulessen rechnet sich: bessere Konzentration, weniger Fehlzeiten, gesündere Bevölkerung langfristig. Kostet ~€800/Schüler:in/Jahr. Für Deutschland: ~€8,5 Mrd/Jahr.',
            quelle: 'Finnish National Agency for Education, OECD PISA 2022',
        },
    },
    {
        id: 'bildung',
        keywords: ['bildung', 'schule', 'universität', 'uni', 'studium', 'lehrer', 'kita', 'bafög', 'ausbildung', 'forschung'],
        name: 'Bildung & Forschung',
        icon: 'GraduationCap',
        color: 'var(--color-purple)',
        zustaendig: {
            ministerium: 'Bundesministerium für Bildung und Forschung (BMBF)',
            minister: 'BMBF-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Bildung, Forschung und Technikfolgenabschätzung',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a18',
        },
        budget: {
            ressort: '€22,3 Mrd',
            anteil: '4,5% des Bundeshaushalts — deutlich unter dem OECD-Schnitt',
            vergleich: 'Deutschland gibt 4,7% des BIP für Bildung aus. OECD-Schnitt: 5,1%. Skandinavien: 6-7%.',
        },
        versprechen: {
            text: 'Digitalpakt 2.0, BAföG-Reform, Startchancen-Programm, 3,5% BIP für Forschung',
            status: 'Startchancen umgesetzt, Digitalpakt 2.0 gescheitert, BAföG zu niedrig',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'GEW (Bildungsgewerkschaft)', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 12 },
                { name: 'Stifterverband', ausgaben: '€580.000/Jahr', lobbyisten: 4 },
            ],
            dagegen: [
                { name: 'Arbeitgeberverbände (BDA)', ausgaben: '€4,2 Mio/Jahr', lobbyisten: 18 },
            ],
            fazit: 'Bildungslobby ist vergleichsweise schwach organisiert. Lehrerverbände vs. Arbeitgeber: ungleiches Spiel.',
        },
        international: {
            vorbild: 'Estland',
            flagge: '🇪🇪',
            wasBeimVorbild: 'Estland liegt bei PISA konstant auf Platz 1 in Europa — trotz niedrigerem BIP als Deutschland. Geheimnis: Volldigitalisierte Schulen seit 2000, autonome Schulleiter:innen, kostenlose Schulmahlzeiten, kleine Klassen, hohe Lehrergehälter relativ zum Durchschnittseinkommen.',
            wasWirLernen: 'Digitalisierung konsequent durchziehen (nicht als Förderprogramm, sondern als Infrastruktur). Schulen mehr Autonomie geben. Lehrerberuf aufwerten.',
            quelle: 'OECD PISA 2022, Estonian Ministry of Education',
        },
    },
    {
        id: 'klima',
        keywords: ['klima', 'klimaschutz', 'co2', 'emission', 'erneuerbar', 'solar', 'wind', 'energie', 'energiewende', 'kohle'],
        name: 'Klimaschutz & Energie',
        icon: 'Leaf',
        color: 'var(--color-green)',
        zustaendig: {
            ministerium: 'Bundesministerium für Wirtschaft und Klimaschutz (BMWK)',
            minister: 'BMWK-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Klimaschutz und Energie',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a25',
        },
        budget: {
            ressort: '€10,2 Mrd (BMWK) + Klima- und Transformationsfonds',
            anteil: 'KTF: €9,4 Mrd — nach BVerfG-Urteil massiv gekürzt',
            vergleich: 'EU-Vergleich: Deutschland gibt pro Kopf weniger für erneuerbare Energien aus als Dänemark, Schweden oder Österreich.',
        },
        versprechen: {
            text: '80% Erneuerbare bis 2030, Kohleausstieg 2030, Klimaneutralität 2045',
            status: 'Ausbau beschleunigt, aber Klimaschutzgesetz aufgeweicht',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Bundesverband Erneuerbare Energie (BEE)', ausgaben: '€1,1 Mio/Jahr', lobbyisten: 8 },
                { name: 'Germanwatch', ausgaben: '€420.000/Jahr', lobbyisten: 4 },
            ],
            dagegen: [
                { name: 'BDEW (Energiewirtschaft)', ausgaben: '€9,6 Mio/Jahr', lobbyisten: 56 },
                { name: 'VDA (Automobilindustrie)', ausgaben: '€12,4 Mio/Jahr', lobbyisten: 46 },
            ],
            fazit: 'Fossile Industrie-Lobby gibt ~10x mehr aus als Klimaschutz-Organisationen.',
        },
        international: {
            vorbild: 'Dänemark',
            flagge: '🇩🇰',
            wasBeimVorbild: 'Dänemark erzeugt 84% seines Stroms aus Erneuerbaren (2023). CO₂-Steuer von €100/Tonne (Deutschland: €45). Verbindliches Klimagesetz mit jährlicher Überprüfung. Offshorwind-Exporteur. Grüne Arbeitsplätze: 4,5% aller Jobs.',
            wasWirLernen: 'Höherer CO₂-Preis mit Sozialausgleich. Jährliche verbindliche Überprüfung statt Sektorziele abschaffen. Industriepolitik MIT Klimaschutz statt dagegen.',
            quelle: 'Danish Energy Agency 2024, IEA Country Report Denmark',
        },
    },
    {
        id: 'wohnen',
        keywords: ['wohnen', 'miete', 'wohnung', 'haus', 'immobilien', 'bauen', 'mietpreisbremse', 'obdachlos'],
        name: 'Wohnen & Mieten',
        icon: 'Building',
        color: 'var(--color-cyan)',
        zustaendig: {
            ministerium: 'Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen (BMWSB)',
            minister: 'BMWSB-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Wohnen, Stadtentwicklung, Bauwesen und Kommunen',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a24',
        },
        budget: {
            ressort: '€4,8 Mrd (Wohnungsbau + Städtebauförderung)',
            anteil: 'Unter 1% des Bundeshaushalts für das drängendste Alltagsproblem vieler Bürger:innen',
            vergleich: 'Österreich gibt pro Kopf 3x mehr für sozialen Wohnungsbau aus als Deutschland.',
        },
        versprechen: {
            text: '400.000 neue Wohnungen pro Jahr, davon 100.000 Sozialwohnungen',
            status: '2024: ~270.000 Wohnungen. Ziel massiv verfehlt.',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'Deutscher Mieterbund', ausgaben: '€480.000/Jahr', lobbyisten: 4 },
            ],
            dagegen: [
                { name: 'GdW (Wohnungswirtschaft)', ausgaben: '€930.000/Jahr', lobbyisten: 2 },
                { name: 'ZIA (Immobilienwirtschaft)', ausgaben: '€2,1 Mio/Jahr', lobbyisten: 14 },
            ],
            fazit: 'Immobilien-Lobby gibt 6x mehr aus als der Mieterbund.',
        },
        international: {
            vorbild: 'Österreich (Wien)',
            flagge: '🇦🇹',
            wasBeimVorbild: 'Wien: 60% aller Einwohner:innen leben in geförderten Wohnungen. Durchschnittsmiete Gemeindebau: €5,80/m². Kein Verkauf öffentlicher Wohnungen seit 2004. "Wiener Modell": Stadt baut selbst statt Investorenförderung.',
            wasWirLernen: 'Öffentlichen Wohnungsbau nicht privatisieren. Kommunale Wohnungsgesellschaften stärken statt Investoren subventionieren. Sozialbindung unbefristet statt 15-30 Jahre.',
            quelle: 'Wiener Wohnen, OECD Affordable Housing Database 2024',
        },
    },
    {
        id: 'gesundheit',
        keywords: ['gesundheit', 'krankenhaus', 'arzt', 'pflege', 'krankenkasse', 'krankenversicherung', 'medizin', 'psychisch'],
        name: 'Gesundheit & Pflege',
        icon: 'Heart',
        color: 'var(--color-green)',
        zustaendig: {
            ministerium: 'Bundesministerium für Gesundheit (BMG)',
            minister: 'BMG-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Gesundheit',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a14',
        },
        budget: {
            ressort: '€18,5 Mrd (Bundeszuschuss Gesundheitsfonds + Pflege)',
            anteil: 'Davon €16,5 Mrd Gesundheitsfonds — reicht nicht, Zusatzbeitrag steigt',
            vergleich: 'Deutschland hat die zweithöchsten Gesundheitsausgaben der OECD — aber nur mittelmäßige Ergebnisse.',
        },
        versprechen: {
            text: 'Krankenhausreform, Pflegekräfte besser bezahlen, Wartezeiten verkürzen',
            status: 'Krankenhausreform beschlossen aber umstritten, Pflegelöhne leicht gestiegen',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'Verdi (Pflegekräfte)', ausgaben: '€3,4 Mio/Jahr', lobbyisten: 18 },
                { name: 'Sozialverband VdK', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 8 },
            ],
            dagegen: [
                { name: 'Deutsche Krankenhausgesellschaft', ausgaben: '€6,9 Mio/Jahr', lobbyisten: 28 },
                { name: 'BPI (Pharma)', ausgaben: '€5,0 Mio/Jahr', lobbyisten: 18 },
            ],
            fazit: 'Pharma und Krankenhausträger haben mehr Einfluss als Pflegekräfte und Patient:innen.',
        },
        international: {
            vorbild: 'Niederlande',
            flagge: '🇳🇱',
            wasBeimVorbild: 'Niederlande: Wartezeit Facharzt im Schnitt 4 Wochen (Deutschland: 3+ Monate). Grund: Keine Unterscheidung privat/gesetzlich, ein System für alle. Hausärzt:innen als starke Gatekeeper. Digitale Patientenakte seit 2012.',
            wasWirLernen: 'Ein einheitliches Versicherungssystem statt Zwei-Klassen-Medizin. Digitale Patientenakte konsequent einführen. Hausärzt:innen stärken statt Fachärzte überlasten.',
            quelle: 'OECD Health at a Glance 2024, CBS Netherlands',
        },
    },
    {
        id: 'digitalisierung',
        keywords: ['digital', 'digitalisierung', 'internet', 'breitband', 'verwaltung', 'behörde', 'amt', 'bürokratie', 'ki', 'app'],
        name: 'Digitalisierung & Bürokratie',
        icon: 'Wifi',
        color: 'var(--color-blue)',
        zustaendig: {
            ministerium: 'Bundesministerium für Digitales und Verkehr (BMDV) + BMI (Verwaltung)',
            minister: 'BMDV/BMI-Minister:innen (neue Regierung)',
            ausschuss: 'Ausschuss für Digitales',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a23',
        },
        budget: {
            ressort: '€44,5 Mrd (BMDV gesamt, inkl. Verkehr)',
            anteil: '~€3 Mrd für reine Digitalisierung (OZG, Breitband)',
            vergleich: 'Estland digitalisierte seine gesamte Verwaltung für €50 Mio. Deutschland hat bisher €3 Mrd ausgegeben und 27% geschafft.',
        },
        versprechen: {
            text: 'Alle Verwaltungsleistungen digital bis Ende 2022 (OZG), Recht auf schnelles Internet',
            status: 'Frist gerissen. 153 von 575 Leistungen digital. eID bei <10% Nutzung.',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'Bitkom', ausgaben: '€3,8 Mio/Jahr', lobbyisten: 22 },
                { name: 'D21 (Digitale Gesellschaft)', ausgaben: '€180.000/Jahr', lobbyisten: 2 },
            ],
            dagegen: [
                { name: 'Beamtenbund (dbb)', ausgaben: '€2,1 Mio/Jahr', lobbyisten: 10 },
            ],
            fazit: 'Tech-Lobby will Digitalisierung, Beamtenbund bremst bei Verwaltungsreformen. Föderalismus ist das größte Hindernis.',
        },
        international: {
            vorbild: 'Estland',
            flagge: '🇪🇪',
            wasBeimVorbild: 'Estland: 99% aller Behördengänge online möglich. Digitale Identität für alle Bürger:innen. Firmengründung in 15 Minuten. Steuererklärung in 3 Minuten. X-Road: ein System verbindet alle Behörden.',
            wasWirLernen: 'Ein zentrales System statt 16 Länder-Lösungen + Bundes-Lösung. Once-Only-Prinzip: Daten nur einmal angeben. Digitale Identität als Grundrecht, nicht als Opt-in.',
            quelle: 'e-Estonia.com, OECD Digital Government Index 2023',
        },
    },
    {
        id: 'sicherheit',
        keywords: ['sicherheit', 'polizei', 'bundeswehr', 'verteidigung', 'militär', 'nato', 'kriminalität', 'terror'],
        name: 'Sicherheit & Verteidigung',
        icon: 'Shield',
        color: '#ef4444',
        zustaendig: {
            ministerium: 'BMVg (Verteidigung) + BMI (Innere Sicherheit)',
            minister: 'BMVg/BMI-Minister:innen (neue Regierung)',
            ausschuss: 'Verteidigungsausschuss + Innenausschuss',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a12',
        },
        budget: {
            ressort: '€53,3 Mrd (Verteidigung) + €15,1 Mrd (Inneres)',
            anteil: 'NATO 2%-Ziel wird mit Sondervermögen (noch ~€21 Mrd übrig) erreicht',
            vergleich: 'Deutschlands Beschaffungswesen ist 2-3x teurer als vergleichbare NATO-Länder.',
        },
        versprechen: {
            text: 'Zeitenwende: Bundeswehr voll ausrüsten, Sondervermögen €100 Mrd, NATO-fähig bis 2029',
            status: 'Sondervermögen fast aufgebraucht, Beschaffung weiterhin zu langsam',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Bundesverband der Deutschen Sicherheits- und Verteidigungsindustrie (BDSV)', ausgaben: '€1,5 Mio/Jahr', lobbyisten: 8 },
            ],
            dagegen: [
                { name: 'IPPNW (Ärzte gegen Atomkrieg)', ausgaben: '€90.000/Jahr', lobbyisten: 1 },
            ],
            fazit: 'Rüstungsindustrie hat direkten Zugang zum BMVg. Friedensorganisationen deutlich unterrepräsentiert.',
        },
        international: {
            vorbild: 'Schweden',
            flagge: '🇸🇪',
            wasBeimVorbild: 'Schweden: Effizientere Beschaffung, eigene Rüstungsindustrie (Saab, Bofors), Total Defence Concept (Zivilschutz + Militär integriert). Wehrpflicht 2017 wieder eingeführt — geschlechtsneutral.',
            wasWirLernen: 'Beschaffung straffen statt nur Budget erhöhen. Zivilschutz nicht vergessen (THW unterfinanziert). Rüstungsprojekte mit klaren Deadlines und Vertragsstrafen.',
            quelle: 'Swedish Armed Forces, IISS Military Balance 2024',
        },
    },
    {
        id: 'rente',
        keywords: ['rente', 'pension', 'altersvorsorge', 'rentner', 'ruhestand', 'rentenversicherung', 'generationenvertrag', 'demografisch'],
        name: 'Rente & Altersvorsorge',
        icon: 'Clock',
        color: 'var(--color-orange)',
        zustaendig: {
            ministerium: 'Bundesministerium für Arbeit und Soziales (BMAS)',
            minister: 'BMAS-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Arbeit und Soziales',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a11',
        },
        budget: {
            ressort: '€179,1 Mrd (BMAS gesamt)',
            anteil: '€124 Mrd allein für den Rentenzuschuss — ein Viertel des gesamten Bundeshaushalts',
            vergleich: 'Der Rentenzuschuss steigt jedes Jahr um ~€4 Mrd. 2030: voraussichtlich €150+ Mrd. Die Rechnung geht nicht auf.',
        },
        versprechen: {
            text: 'Rentenniveau bei 48% stabilisieren, Rentenpaket II, Generationenkapital (Aktienrente)',
            status: 'Rentenpaket II beschlossen. Generationenkapital startet mit €12 Mrd Kredit — frühestens ab 2036 Erträge.',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'VdK (Sozialverband)', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 8 },
                { name: 'SoVD (Sozialverband)', ausgaben: '€620.000/Jahr', lobbyisten: 4 },
            ],
            dagegen: [
                { name: 'BDA (Arbeitgeber)', ausgaben: '€4,2 Mio/Jahr', lobbyisten: 18 },
                { name: 'GDV (Versicherer — wollen private Vorsorge)', ausgaben: '€23,8 Mio/Jahr', lobbyisten: 49 },
            ],
            fazit: 'Versicherungslobby will kapitalgedeckte Privatvorsorge. Sozialverbände wollen höhere gesetzliche Rente. Beide ignorieren das Grundproblem: zu wenige Beitragszahler für zu viele Rentner:innen.',
        },
        international: {
            vorbild: 'Schweden',
            flagge: '🇸🇪',
            wasBeimVorbild: 'Schweden hat 1999 das Rentensystem komplett umgebaut:\n• Automatischer Stabilisator: Sinkt das Verhältnis Beitragszahler/Rentner, sinken automatisch die Rentenanpassungen — kein politischer Streit nötig.\n• Obligatorische Kapitaldeckung: 2,5% des Einkommens fließen in einen selbstgewählten Aktienfonds (Prämienpension). Default-Fonds AP7: 10,4% Rendite/Jahr seit 2000.\n• Orange Envelope: Jede:r bekommt jährlich eine klare Übersicht: "So viel Rente bekommst du." Totale Transparenz.\n• Flexibles Rentenalter: Rente ab 62 (mit Abzügen) oder später (mit Zuschlägen). Kein fixes Rentenalter.',
            wasWirLernen: 'Deutschland braucht:\n1. Automatischen Stabilisator statt alle 4 Jahre Rentenstreit.\n2. Echte kapitalgedeckte Säule (nicht Riester, der gescheitert ist) — das Generationenkapital geht in die richtige Richtung, ist aber zu klein und zu spät.\n3. Transparenz: Jede:r sollte wissen, was sie/er bekommt — ein "Orange Envelope" für Deutschland.\n4. Flexibles Rentenalter statt starrer Grenze mit Frühverrentungsanreizen.',
            quelle: 'Swedish Pensions Agency, OECD Pensions at a Glance 2023, AP7 Annual Report',
        },
    },
    // ── NEW TOPICS ──────────────────────────────────────────────────────
    {
        id: 'migration',
        keywords: ['migration', 'integration', 'flüchtlinge', 'asyl', 'einwanderung', 'zuwanderung', 'bamf', 'integrationskurs', 'fachkräfte', 'abschiebung'],
        name: 'Migration & Integration',
        icon: 'Users',
        color: 'var(--color-cyan)',
        zustaendig: {
            ministerium: 'Bundesministerium des Innern und für Heimat (BMI) + Bundesamt für Migration und Flüchtlinge (BAMF)',
            minister: 'BMI-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Inneres und Heimat',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a04',
        },
        budget: {
            ressort: '€15,1 Mrd (BMI gesamt)',
            anteil: '~€3,6 Mrd für Flucht, Migration und Integration (BAMF + Integrationskurse + Erstaufnahme)',
            vergleich: 'Deutschland gibt pro Asylbewerber:in ~€12.000/Jahr für Unterbringung und Verfahren aus, aber nur ~€1.500 für Integrationskurse. Kanada investiert ~€3.800 pro Person in Sprachkurse und Arbeitsmarktintegration.',
        },
        versprechen: {
            text: 'Fachkräfteeinwanderungsgesetz modernisieren, BAMF-Verfahren beschleunigen, Integrationskurse ausbauen, Chancen-Aufenthaltsrecht für Geduldete',
            status: 'Fachkräfteeinwanderungsgesetz 2023 beschlossen, BAMF-Verfahren weiterhin >6 Monate, Chancen-Aufenthaltsrecht umgesetzt aber wenig genutzt',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'Pro Asyl', ausgaben: '€350.000/Jahr', lobbyisten: 3 },
                { name: 'Paritätischer Wohlfahrtsverband', ausgaben: '€1,2 Mio/Jahr', lobbyisten: 6 },
            ],
            dagegen: [
                { name: 'BDA (Arbeitgeber — selektiv pro Fachkräfte)', ausgaben: '€4,2 Mio/Jahr', lobbyisten: 18 },
                { name: 'Bundespolizeigewerkschaft (DPolG)', ausgaben: '€380.000/Jahr', lobbyisten: 3 },
            ],
            fazit: 'Migrationspolitik wird stärker von Medienzyklen und Wahlkampf getrieben als von Lobbyarbeit. Hilfsorganisationen sind finanziell schwach gegenüber sicherheitspolitischen Akteuren.',
        },
        international: {
            vorbild: 'Kanada',
            flagge: '🇨🇦',
            wasBeimVorbild: 'Kanada steuert Einwanderung über ein Punktesystem (Express Entry): Alter, Sprachkenntnisse, Berufserfahrung, Jobangebot werden bewertet. ~450.000 Zuwanderer/Jahr, davon 60% über wirtschaftliche Programme. Verpflichtende Settlement Services: kostenlose Sprachkurse (bis C1), Berufsanerkennung, Mentoring. Bearbeitungszeit Express Entry: ~6 Monate. Einbürgerung nach 3 Jahren möglich.',
            wasWirLernen: 'Klare Trennung zwischen humanitärer Aufnahme und Fachkräfteeinwanderung. Berufsanerkennung dramatisch beschleunigen (in Deutschland dauert sie oft 12-18 Monate). Integrationskurse auf höheres Sprachniveau ausbauen (B1 reicht nicht für den Arbeitsmarkt). Einbürgerung als Integrationsziel, nicht als Belohnung nach 8 Jahren.',
            quelle: 'Immigration, Refugees and Citizenship Canada (IRCC) 2024, OECD International Migration Outlook 2024',
        },
    },
    {
        id: 'verkehr',
        keywords: ['verkehr', 'mobilität', 'bahn', 'zug', 'db', 'deutschlandticket', 'autobahn', 'straße', 'öpnv', 'radweg', 'fahrrad', 'ice'],
        name: 'Verkehr & Mobilität',
        icon: 'Train',
        color: 'var(--color-blue)',
        zustaendig: {
            ministerium: 'Bundesministerium für Digitales und Verkehr (BMDV)',
            minister: 'BMDV-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Verkehr',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a15',
        },
        budget: {
            ressort: '€44,5 Mrd (BMDV gesamt)',
            anteil: '~€19 Mrd für Schiene (inkl. DB-Infrastruktur), ~€13 Mrd für Straße — Verhältnis 60:40 zugunsten der Straße, wenn man Gesamtausgaben inkl. Kommunen rechnet',
            vergleich: 'Die Schweiz investiert pro Kopf ~€410/Jahr in Schieneninfrastruktur. Deutschland: ~€114/Jahr. Ergebnis: Schweizer Züge sind zu 92% pünktlich, deutsche zu 64%.',
        },
        versprechen: {
            text: 'Deutschlandticket einführen, DB-Infrastruktur sanieren (Generalsanierung), mehr Güter auf die Schiene, Radverkehr stärken',
            status: 'Deutschlandticket eingeführt (€49→€58), Generalsanierung gestartet aber massiv verspätet, Güterverkehr auf Schiene stagniert bei 19%',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'Allianz pro Schiene', ausgaben: '€420.000/Jahr', lobbyisten: 4 },
                { name: 'VCD (Verkehrsclub)', ausgaben: '€280.000/Jahr', lobbyisten: 3 },
                { name: 'ADFC (Fahrradclub)', ausgaben: '€310.000/Jahr', lobbyisten: 3 },
            ],
            dagegen: [
                { name: 'VDA (Automobilindustrie)', ausgaben: '€12,4 Mio/Jahr', lobbyisten: 46 },
                { name: 'ADAC', ausgaben: '€1,9 Mio/Jahr', lobbyisten: 8 },
                { name: 'Pro Mobilität (Straßenbaulobby)', ausgaben: '€520.000/Jahr', lobbyisten: 4 },
            ],
            fazit: 'Die Autolobby gibt 30x mehr für Lobbyarbeit aus als alle Schienen- und Radverkehrsverbände zusammen. Ergebnis: Deutschland baut weiter Autobahnen, während Bahnstrecken verfallen.',
        },
        international: {
            vorbild: 'Schweiz',
            flagge: '🇨🇭',
            wasBeimVorbild: 'Schweiz: SBB-Pünktlichkeit bei 92,5% (DB: 64%). Taktfahrplan: Jede Stunde, jede Strecke, jeder Anschluss. Volksabstimmungen sichern Investitionen: Bevölkerung stimmte für Bahnfonds (FABI) mit €19,5 Mrd über 15 Jahre. 57% aller Pendler:innen nutzen ÖV. Güterverkehr auf Schiene: 37% (Deutschland: 19%). Kein Streckenneubau nötig — konsequente Pflege der bestehenden Infrastruktur.',
            wasWirLernen: 'Infrastruktur laufend pflegen statt kaputtsparen und dann teuer sanieren. Integralen Taktfahrplan einführen (geplant für 2030 — seit 20 Jahren verschoben). DB-Infrastruktur vom Konzern trennen und als Staatsaufgabe behandeln. Langfristige Finanzierung per Schieneninfrastrukturfonds statt jährlicher Haushaltsverhandlung.',
            quelle: 'SBB Geschäftsbericht 2024, Bundesamt für Verkehr (Schweiz), Allianz pro Schiene 2024',
        },
    },
    {
        id: 'steuern',
        keywords: ['steuern', 'steuergerechtigkeit', 'steuer', 'erbschaftsteuer', 'vermögensteuer', 'steuervermeidung', 'steuerhinterziehung', 'finanzen', 'haushalt', 'schuldenbremse'],
        name: 'Steuern & Gerechtigkeit',
        icon: 'Wallet',
        color: 'var(--color-orange)',
        zustaendig: {
            ministerium: 'Bundesministerium der Finanzen (BMF)',
            minister: 'BMF-Minister:in (neue Regierung)',
            ausschuss: 'Finanzausschuss',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a07',
        },
        budget: {
            ressort: '€9,1 Mrd (BMF-Verwaltung)',
            anteil: 'Steuereinnahmen Bund 2024: ~€374 Mrd — aber geschätzte €50-125 Mrd entgehen dem Staat jährlich durch Steuervermeidung und -hinterziehung',
            vergleich: 'Deutschland hat ~3.000 Steuerfahnder:innen. In den USA prüft der IRS 10x mehr Fälle pro Kopf. Die Betriebsprüfungsquote bei Großunternehmen ist von 19% (2009) auf 13% (2023) gesunken.',
        },
        versprechen: {
            text: 'Mindestbesteuerung für Konzerne umsetzen, Steuervermeidung bekämpfen, Steuergerechtigkeit stärken, kalte Progression abbauen',
            status: 'Globale Mindeststeuer (15%) umgesetzt, aber mit zahlreichen Ausnahmen. Cum-Ex-Aufarbeitung läuft. Vermögensteuer und Erbschaftsteuer-Reform: nicht angefasst.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Netzwerk Steuergerechtigkeit', ausgaben: '€120.000/Jahr', lobbyisten: 2 },
                { name: 'Oxfam Deutschland', ausgaben: '€380.000/Jahr', lobbyisten: 3 },
            ],
            dagegen: [
                { name: 'BDI (Bundesverband der Deutschen Industrie)', ausgaben: '€8,9 Mio/Jahr', lobbyisten: 42 },
                { name: 'BDA (Arbeitgeberverband)', ausgaben: '€4,2 Mio/Jahr', lobbyisten: 18 },
                { name: 'Familienunternehmer e.V.', ausgaben: '€1,4 Mio/Jahr', lobbyisten: 6 },
            ],
            fazit: 'Industrie- und Unternehmenslobby gibt 50x mehr aus als Organisationen für Steuergerechtigkeit. Die Erbschaftsteuer hat so viele Ausnahmen, dass Milliardenvermögen faktisch steuerfrei vererbt werden können.',
        },
        international: {
            vorbild: 'Skandinavien (Schweden/Dänemark)',
            flagge: '🇸🇪',
            wasBeimVorbild: 'Schweden/Dänemark: Steuerquote ~44% des BIP (Deutschland: ~38%). Trotzdem hohe Wettbewerbsfähigkeit (Schweden: 10 DAX-äquivalente Weltkonzerne bei 10 Mio Einwohnern). Grund: Steuern finanzieren exzellente Infrastruktur, Bildung und Gesundheit — das senkt Unternehmenskosten. Transparenz: In Schweden sind Steuererklärungen öffentlich einsehbar. Dänemark: 90% der Steuererklärungen sind vorausgefüllt und werden ohne Änderung akzeptiert — Compliance-Quote über 98%.',
            wasWirLernen: 'Höhere Steuern sind möglich, wenn die Gegenleistung stimmt (Infrastruktur, Bildung, Sicherheit). Steuerverwaltung digitalisieren und Personal aufstocken — jeder zusätzliche Steuerfahnder bringt im Schnitt €1,2 Mio/Jahr ein. Erbschaftsteuer ohne Schlupflöcher: Dänemark besteuert Erbschaften über €38.000 mit 15% — ohne Betriebsvermögensausnahme.',
            quelle: 'OECD Revenue Statistics 2024, Eurostat, Swedish Tax Agency (Skatteverket)',
        },
    },
    {
        id: 'kinderarmut',
        keywords: ['kinderarmut', 'kinder', 'kindergrundsicherung', 'kindergeld', 'kinderzuschlag', 'familien', 'armut', 'chancengleichheit', 'hartz', 'bürgergeld'],
        name: 'Kinderarmut & Familien',
        icon: 'Users',
        color: 'var(--color-purple)',
        zustaendig: {
            ministerium: 'Bundesministerium für Familie, Senioren, Frauen und Jugend (BMFSFJ) + BMAS',
            minister: 'BMFSFJ-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Familie, Senioren, Frauen und Jugend',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a13',
        },
        budget: {
            ressort: '€13,2 Mrd (BMFSFJ gesamt)',
            anteil: '~€4,2 Mrd Kindergeld-Verwaltung + €2,1 Mrd Kinderzuschlag + Elterngeld — aber 150+ verschiedene Familienleistungen über 14 Behörden verteilt',
            vergleich: '2,8 Mio Kinder in Deutschland gelten als armutsgefährdet (21,6%). Frankreich: 11,4%. Der Unterschied: Frankreich investiert 3,6% des BIP in Familienleistungen, Deutschland 3,1% — aber das deutsche System ist ineffizienter.',
        },
        versprechen: {
            text: 'Kindergrundsicherung einführen — alle Familienleistungen in einer Leistung bündeln, kein Kind soll in Armut aufwachsen',
            status: 'Kindergrundsicherung im Koalitionsstreit gescheitert. Statt der geplanten €12 Mrd wurden nur €2,4 Mrd bewilligt — ein Verwaltungsumbau ohne echte Leistungsverbesserung.',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'Deutsches Kinderhilfswerk', ausgaben: '€190.000/Jahr', lobbyisten: 2 },
                { name: 'Kinderschutzbund (DKSB)', ausgaben: '€280.000/Jahr', lobbyisten: 3 },
                { name: 'AWO (Arbeiterwohlfahrt)', ausgaben: '€1,1 Mio/Jahr', lobbyisten: 6 },
            ],
            dagegen: [
                { name: 'BDA (gegen höhere Sozialabgaben)', ausgaben: '€4,2 Mio/Jahr', lobbyisten: 18 },
                { name: 'Bund der Steuerzahler', ausgaben: '€1,6 Mio/Jahr', lobbyisten: 7 },
            ],
            fazit: 'Kinder haben keine Lobby. Kinderrechtsorganisationen sind finanziell schwach. Gleichzeitig haben die stärksten Profiteure des Ehegattensplittings (Alleinverdiener-Ehen mit hohem Einkommen und ohne Kinder) keinerlei Interesse an einer Umschichtung.',
        },
        international: {
            vorbild: 'Frankreich',
            flagge: '🇫🇷',
            wasBeimVorbild: 'Frankreich: Kinderarmutsquote 11,4% (Deutschland: 21,6%). Schlüssel: Flächendeckendes Krippensystem (Crèche) ab 3 Monaten — 56% der unter 3-Jährigen in Betreuung (Deutschland: 36%). Kostenlose Ganztagsschule ab 3 Jahren inkl. Mittagessen. Allocations familiales: universelles Kindergeld plus einkommensabhängige Zuschläge — alles aus einer Hand über die CAF (Familienkasse). Rentenbonus für Eltern: 10% Rentenzuschlag ab 3 Kindern.',
            wasWirLernen: 'Betreuungsinfrastruktur ist wichtiger als Geldtransfers: Wenn Eltern (besonders Mütter) arbeiten können, sinkt Kinderarmut am stärksten. Leistungen bündeln statt über 150 verschiedene Töpfe verteilen. Krippenplätze massiv ausbauen — der Rechtsanspruch existiert seit 2013, wird aber mangels Plätzen nicht eingelöst (fehlen ~300.000 Plätze).',
            quelle: 'Eurostat EU-SILC 2024, CAF (Caisse d\'Allocations Familiales), OECD Family Database',
        },
    },
    {
        id: 'pflege',
        keywords: ['pflege', 'pflegenotstand', 'pflegekräfte', 'altenpflege', 'pflegeversicherung', 'pflegeheim', 'häusliche pflege', 'pflegebedürftig', 'demenz'],
        name: 'Pflege & Pflegenotstand',
        icon: 'Activity',
        color: '#ef4444',
        zustaendig: {
            ministerium: 'Bundesministerium für Gesundheit (BMG)',
            minister: 'BMG-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Gesundheit',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a14',
        },
        budget: {
            ressort: '€59,3 Mrd (Soziale Pflegeversicherung gesamt)',
            anteil: '€5,5 Mrd Bundeszuschuss — reicht nicht. Pflegeversicherung schreibt seit 2022 rote Zahlen. Eigenanteil im Pflegeheim: durchschnittlich €2.871/Monat.',
            vergleich: 'Deutschland hat ~1,7 Mio Pflegebedürftige in professioneller Versorgung bei ~1,2 Mio Pflegekräften. Japan versorgt 6,9 Mio Pflegebedürftige mit deutlich niedrigeren Eigenanteilen — dank Prävention und Technologie.',
        },
        versprechen: {
            text: 'Pflegekräfte besser bezahlen, Personaluntergrenzen einführen, pflegende Angehörige entlasten, Eigenanteile deckeln',
            status: 'Mindestlöhne leicht gestiegen (€18,25/Std. 2024), Eigenanteile steigen weiter, Personaluntergrenzen in Krankenhäusern eingeführt aber in Pflegeheimen unzureichend. Es fehlen bis 2030 ca. 500.000 Pflegekräfte.',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'Verdi (Pflegekräfte)', ausgaben: '€3,4 Mio/Jahr', lobbyisten: 18 },
                { name: 'Sozialverband VdK', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 8 },
                { name: 'Deutscher Pflegerat', ausgaben: '€180.000/Jahr', lobbyisten: 2 },
            ],
            dagegen: [
                { name: 'Arbeitgeberverband Pflege (AGVP)', ausgaben: '€640.000/Jahr', lobbyisten: 4 },
                { name: 'bpa (Bundesverband privater Anbieter)', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 10 },
            ],
            fazit: 'Private Pflegeheim-Betreiber lobbyieren gegen strenge Personalvorgaben, die ihre Margen senken würden. Pflegekräfte selbst sind zu erschöpft, um sich politisch zu engagieren — ein strukturelles Problem.',
        },
        international: {
            vorbild: 'Japan',
            flagge: '🇯🇵',
            wasBeimVorbild: 'Japan hat die älteste Bevölkerung der Welt (29% über 65) und seit 2000 eine universelle Pflegeversicherung (Kaigo Hoken). Schlüsselinnovationen:\n• Prävention: Flächendeckendes "Ikigai"-Programm — Bewegung, Gemeinschaft, Ernährung — hat nachweislich Pflegebedürftigkeit um 20% reduziert.\n• Robotik: ~30.000 Pflegeroboter im Einsatz (Heben, Überwachung, Kommunikation). Staatlich gefördert: bis zu 50% Zuschuss.\n• Niedrige Eigenanteile: Patient:innen zahlen nur 10-30% der Kosten (einkommensabhängig). Deutschland: oft 50-70%.\n• Community-based care: Statt großer Pflegeheime kleine Wohngruppen (Grouphome) mit max. 9 Personen.',
            wasWirLernen: 'Prävention massiv stärken: Jeder Euro für Sturzprävention, Bewegungsprogramme und soziale Teilhabe spart €4-6 in der Pflege. Technologie als Ergänzung (nicht Ersatz) für Pflegekräfte: Robotik für schwere körperliche Arbeit, damit Pfleger:innen sich auf menschliche Zuwendung konzentrieren können. Pflegeversicherung zur Vollversicherung ausbauen statt Teilkasko.',
            quelle: 'Japan Ministry of Health, Labour and Welfare 2024, OECD Long-Term Care Report, Robotics for Ageing Society (EU 2023)',
        },
    },
    {
        id: 'buerokratie',
        keywords: ['bürokratie', 'bürokratieabbau', 'verwaltung', 'formulare', 'genehmigung', 'planungsverfahren', 'entbürokratisierung', 'regelung', 'vorschriften', 'amtsschimmel'],
        name: 'Bürokratie & Verwaltungsreform',
        icon: 'Search',
        color: 'var(--color-orange)',
        zustaendig: {
            ministerium: 'Bundesministerium des Innern und für Heimat (BMI) + Bundesministerium der Justiz (BMJ)',
            minister: 'BMI/BMJ-Minister:innen (neue Regierung)',
            ausschuss: 'Ausschuss für Inneres und Heimat + Normenkontrollrat',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a04',
        },
        budget: {
            ressort: '€15,1 Mrd (BMI gesamt)',
            anteil: '~€520 Mio für Verwaltungsmodernisierung (OZG, Register) — Bürokratiekosten für Unternehmen: geschätzte €65 Mrd/Jahr',
            vergleich: 'Genehmigung einer Windkraftanlage: Deutschland 4-7 Jahre, Dänemark 6-12 Monate. Baugenehmigung Wohnhaus: Deutschland 4-8 Monate, Dänemark 2-4 Wochen. Firmengründung: Deutschland 8 Tage, Dänemark 24 Stunden.',
        },
        versprechen: {
            text: 'Planungsbeschleunigung, Genehmigungsverfahren halbieren, Bürokratieentlastungsgesetz, Once-Only-Prinzip (Daten nur einmal angeben)',
            status: 'Bürokratieentlastungsgesetz IV beschlossen (geschätzte Entlastung: €944 Mio/Jahr — bei €65 Mrd Gesamtkosten). Planungsbeschleunigung bei LNG-Terminals gezeigt, dass es geht — aber nicht auf andere Bereiche übertragen.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Bitkom', ausgaben: '€3,8 Mio/Jahr', lobbyisten: 22 },
                { name: 'DIHK (Industrie- und Handelskammern)', ausgaben: '€4,5 Mio/Jahr', lobbyisten: 20 },
                { name: 'ZDH (Zentralverband des Handwerks)', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 8 },
            ],
            dagegen: [
                { name: 'Beamtenbund (dbb)', ausgaben: '€2,1 Mio/Jahr', lobbyisten: 10 },
                { name: 'Datenschutzbeauftragte (institutionell)', ausgaben: '—', lobbyisten: 0 },
            ],
            fazit: 'Paradoxerweise wollen fast alle Akteure Bürokratieabbau — aber jede einzelne Vorschrift hat Befürworter. Föderalismus mit 16 Landesverwaltungen + Bund + Kommunen ist das strukturelle Hauptproblem.',
        },
        international: {
            vorbild: 'Dänemark',
            flagge: '🇩🇰',
            wasBeimVorbild: 'Dänemark hat die effizienteste Verwaltung Europas (OECD-Ranking, EU eGovernment Benchmark):\n• NemID/MitID: Einheitliche digitale Identität — 97% der Bevölkerung nutzen sie aktiv. Alle Behördengänge über borger.dk.\n• Digital Post: Seit 2014 erhalten alle Bürger:innen Behördenpost digital — kein Papier mehr. Spart €200 Mio/Jahr.\n• Once-Only: Daten werden einmal erfasst und von allen Behörden geteilt (Grundbuch, Melderegister, Steuer — alles vernetzt).\n• Planungsverfahren: Baugenehmigung digital in 2-4 Wochen. Automatisierte Prüfung gegen Bebauungsplan.\n• Normenkontrolle: Jedes neue Gesetz muss eine "Bürokratiekosten-Folgeabschätzung" haben — wird es zu teuer, wird es gestoppt.',
            wasWirLernen: 'Digitale Verwaltung braucht eine einheitliche ID (eID funktioniert nicht, weil sie niemand nutzt — Dänemark hat es verpflichtend gemacht). Registermodernisierung: Behörden müssen Daten teilen statt Bürger:innen sie immer wieder abtippen. Mut zur Pflicht: Dänemark hat digitale Kommunikation zur Pflicht gemacht (mit Ausnahmen für Ältere) — Deutschland versucht es freiwillig und scheitert.',
            quelle: 'EU eGovernment Benchmark 2024, OECD Digital Government Index 2023, Danish Agency for Digital Government',
        },
    },
    // ── ADDITIONAL TOPICS ─────────────────────────────────────────────
    {
        id: 'drogen',
        keywords: ['drogen', 'sucht', 'cannabis', 'legalisierung', 'suchtpolitik', 'suchtprävention', 'entkriminalisierung', 'alkohol', 'rausch', 'abhängigkeit'],
        name: 'Drogen & Suchtpolitik',
        icon: 'Heart',
        color: 'var(--color-purple)',
        zustaendig: {
            ministerium: 'Bundesministerium für Gesundheit (BMG)',
            minister: 'BMG-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Gesundheit',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a14',
        },
        budget: {
            ressort: '€18,5 Mrd (BMG gesamt)',
            anteil: '~€190 Mio für Suchtprävention und Drogenpolitik (Bundeszentrale für gesundheitliche Aufklärung + Programme)',
            vergleich: 'Deutschland gibt ~€2,30 pro Einwohner:in für Suchtprävention aus. Portugal investiert €14 pro Kopf — und hat damit die Drogentoten um 80% gesenkt.',
        },
        versprechen: {
            text: 'Cannabis kontrolliert legalisieren, Suchtprävention stärken, Drug-Checking-Angebote ausbauen, Substitutionstherapie erleichtern',
            status: 'Cannabis-Gesetz (CanG) April 2024 in Kraft — aber stark verwässert: kein regulierter Verkauf, nur Eigenanbau und Cannabis-Clubs. Drug-Checking nur in wenigen Städten.',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'Deutscher Hanfverband', ausgaben: '€140.000/Jahr', lobbyisten: 2 },
                { name: 'Deutsche AIDS-Hilfe', ausgaben: '€280.000/Jahr', lobbyisten: 3 },
                { name: 'Akzept e.V. (Suchthilfe)', ausgaben: '€60.000/Jahr', lobbyisten: 1 },
            ],
            dagegen: [
                { name: 'Deutsche Polizeigewerkschaft (DPolG)', ausgaben: '€380.000/Jahr', lobbyisten: 3 },
                { name: 'Drogenbeauftragte der Länder (institutionell)', ausgaben: '—', lobbyisten: 0 },
            ],
            fazit: 'Suchtpolitik wird stärker durch Moralpolitik und Wahlkampf bestimmt als durch evidenzbasierte Lobbyarbeit. Polizeigewerkschaften haben überproportionalen Einfluss.',
        },
        international: {
            vorbild: 'Portugal',
            flagge: '🇵🇹',
            wasBeimVorbild: 'Portugal hat 2001 den Besitz aller Drogen entkriminalisiert (nicht legalisiert). Konsum wird als Gesundheitsproblem behandelt, nicht als Straftat. Ergebnis: Drogentote von 80 (2001) auf 16 (2017) gesunken, HIV-Neuinfektionen unter Drogennutzern um 95% reduziert. Statt Polizei entscheiden "Dissuasion Commissions" (Sozialarbeiter, Psychologen, Juristen) über Therapieangebote.',
            wasWirLernen: 'Entkriminalisierung senkt Drogentote und HIV-Raten — Bestrafung tut das nicht. Deutschland hat ~2.200 Drogentote/Jahr (Rekord). Statt Kriminalisierung: Ausbau von Substitution, Drug-Checking, Konsumräumen und niedrigschwelligen Therapieangeboten.',
            quelle: 'EMCDDA European Drug Report 2024, SICAD (Portugiesische Drogenbeobachtungsstelle)',
        },
    },
    {
        id: 'bundeswehr-beschaffung',
        keywords: ['beschaffung', 'rüstung', 'sondervermögen', 'wehrtechnik', 'rüstungsprojekte', 'baainbw', 'puma', 'eurofighter', 'drohne', 'verteidigungsindustrie'],
        name: 'Bundeswehr-Beschaffung',
        icon: 'Shield',
        color: '#ef4444',
        zustaendig: {
            ministerium: 'Bundesministerium der Verteidigung (BMVg) + BAAINBw (Beschaffungsamt)',
            minister: 'BMVg-Minister:in (neue Regierung)',
            ausschuss: 'Verteidigungsausschuss',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a12',
        },
        budget: {
            ressort: '€53,3 Mrd (Verteidigung 2025) + Sondervermögen',
            anteil: '~€25 Mrd für Rüstungsinvestitionen und Beschaffung — Sondervermögen (€100 Mrd, 2022) zu ~80% verplant',
            vergleich: 'Das BAAINBw hat 11.000 Mitarbeiter:innen für Beschaffung. Schweden (FMV) schafft vergleichbare Ergebnisse mit 1.800 Mitarbeiter:innen. Puma-Schützenpanzer: geplant €3,1 Mrd, tatsächlich €5,9 Mrd.',
        },
        versprechen: {
            text: 'Sondervermögen €100 Mrd für Bundeswehr-Modernisierung, Beschaffung beschleunigen, NATO-Fähigkeitsziele erreichen bis 2029',
            status: 'Sondervermögen zu 80% gebunden, aber viele Projekte mit massiven Verzögerungen. Beschaffungsreform angekündigt, kaum umgesetzt. F-35-Kauf: Lieferung erst ab 2027.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'BDSV (Sicherheits- und Verteidigungsindustrie)', ausgaben: '€1,5 Mio/Jahr', lobbyisten: 8 },
                { name: 'Rheinmetall', ausgaben: '€980.000/Jahr', lobbyisten: 6 },
                { name: 'Airbus Defence', ausgaben: '€1,2 Mio/Jahr', lobbyisten: 7 },
            ],
            dagegen: [
                { name: 'IPPNW (Ärzte gegen Atomkrieg)', ausgaben: '€90.000/Jahr', lobbyisten: 1 },
                { name: 'DFG-VK (Friedensgesellschaft)', ausgaben: '€40.000/Jahr', lobbyisten: 1 },
            ],
            fazit: 'Die Rüstungsindustrie hat direkten Zugang zu BMVg und Beschaffungsamt. Drehtür-Effekt: Generäle wechseln regelmäßig in die Rüstungsindustrie. Friedensorganisationen sind finanziell marginal.',
        },
        international: {
            vorbild: 'Schweden',
            flagge: '🇸🇪',
            wasBeimVorbild: 'Schwedens FMV (Försvarets materielverk) beschafft effizient mit dem "Saab-Modell": Enge Zusammenarbeit zwischen Staat und nationaler Industrie, aber mit strikten Vertragsstrafen bei Verzögerungen. Gripen-Kampfjet: Entwicklung und Beschaffung in 7 Jahren (Eurofighter: 25+ Jahre). Betriebskosten Gripen: ~€4.700/Flugstunde (Eurofighter: ~€14.000). Schlüssel: Klare Anforderungen, keine nachträglichen Änderungen, iterative Entwicklung.',
            wasWirLernen: 'Beschaffungsamt (BAAINBw) radikal reformieren: Weniger Bürokratie, mehr technische Kompetenz. Vertragsstrafen durchsetzen statt Kostenexplosionen akzeptieren. Anforderungen einfrieren — das ständige Ändern von Spezifikationen ist Haupttreiber für Verzögerungen und Kostensteigerungen.',
            quelle: 'Swedish FMV Annual Report 2024, IISS Military Balance 2024, Bundesrechnungshof Sonderbericht Rüstungsprojekte 2023',
        },
    },
    {
        id: 'datenschutz',
        keywords: ['datenschutz', 'privatsphäre', 'dsgvo', 'überwachung', 'vorratsdatenspeicherung', 'tracking', 'cookies', 'bfdi', 'datensicherheit', 'staatstrojaner'],
        name: 'Datenschutz & Privatsphäre',
        icon: 'Shield',
        color: 'var(--color-blue)',
        zustaendig: {
            ministerium: 'Bundesministerium des Innern (BMI) + Bundesbeauftragte:r für Datenschutz (BfDI)',
            minister: 'BMI-Minister:in + BfDI (neue Regierung)',
            ausschuss: 'Ausschuss für Inneres und Heimat + Ausschuss für Digitales',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a04',
        },
        budget: {
            ressort: '€15,1 Mrd (BMI gesamt)',
            anteil: '~€38 Mio für den BfDI (Bundesbeauftragte:r für Datenschutz) — mit nur 330 Stellen für die Aufsicht über 83 Mio Bürger:innen und tausende Unternehmen',
            vergleich: 'Irische Datenschutzbehörde (DPC): €26 Mio Budget bei 5 Mio Einwohnern. Deutsche BfDI: €38 Mio bei 83 Mio Einwohnern. Pro Kopf gibt Irland 5x mehr aus — und ist trotzdem zu schwach für Big-Tech-Aufsicht.',
        },
        versprechen: {
            text: 'DSGVO konsequent durchsetzen, Vorratsdatenspeicherung durch Quick-Freeze ersetzen, Chatkontrolle verhindern, KI-Verordnung umsetzen',
            status: 'Quick-Freeze beschlossen (2024), Chatkontrolle auf EU-Ebene blockiert. DSGVO-Durchsetzung weiterhin schwach: BfDI hat 2023 nur €1,4 Mio Bußgelder verhängt. KI-Verordnung in nationaler Umsetzung.',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'Chaos Computer Club (CCC)', ausgaben: '€60.000/Jahr', lobbyisten: 2 },
                { name: 'Digitalcourage', ausgaben: '€120.000/Jahr', lobbyisten: 2 },
                { name: 'Gesellschaft für Freiheitsrechte (GFF)', ausgaben: '€350.000/Jahr', lobbyisten: 3 },
            ],
            dagegen: [
                { name: 'Bitkom (will DSGVO-Lockerungen)', ausgaben: '€3,8 Mio/Jahr', lobbyisten: 22 },
                { name: 'BDI (gegen "Überregulierung")', ausgaben: '€8,9 Mio/Jahr', lobbyisten: 42 },
                { name: 'Sicherheitsbehörden (institutionell, für Überwachung)', ausgaben: '—', lobbyisten: 0 },
            ],
            fazit: 'Datenschutz-NGOs sind finanziell minimal aufgestellt. Industrie will weniger Regulierung, Sicherheitsbehörden wollen mehr Überwachung — Bürgerrechte geraten von zwei Seiten unter Druck.',
        },
        international: {
            vorbild: 'Estland',
            flagge: '🇪🇪',
            wasBeimVorbild: 'Estland zeigt, dass Digitalisierung und Datenschutz kein Widerspruch sein müssen. X-Road: Jeder Datenzugriff durch Behörden wird protokolliert und ist für Bürger:innen einsehbar. "Data Tracker" zeigt in Echtzeit, welche Behörde welche Daten abgerufen hat. Unrechtmäßiger Zugriff wird automatisch gemeldet und ist strafbar. Prinzip: Der Staat muss sich vor den Bürger:innen rechtfertigen — nicht umgekehrt.',
            wasWirLernen: 'Transparenzpflicht für Behördenzugriffe: Bürger:innen müssen sehen können, wer ihre Daten abruft. DSGVO-Durchsetzung stärken: BfDI braucht mehr Personal und höhere Bußgelder. Datensparsamkeit als Designprinzip für alle staatlichen IT-Systeme.',
            quelle: 'e-Estonia.com, Estonian Data Protection Inspectorate, EU Fundamental Rights Agency 2024',
        },
    },
    {
        id: 'landwirtschaft',
        keywords: ['landwirtschaft', 'bauern', 'agrar', 'agrarsubventionen', 'höfesterben', 'gap', 'eu-agrar', 'pestizide', 'glyphosat', 'subventionen'],
        name: 'Landwirtschaft & Agrarwende',
        icon: 'Leaf',
        color: 'var(--color-green)',
        zustaendig: {
            ministerium: 'Bundesministerium für Ernährung und Landwirtschaft (BMEL)',
            minister: 'BMEL-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Ernährung und Landwirtschaft',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a10',
        },
        budget: {
            ressort: '€7,5 Mrd (BMEL gesamt)',
            anteil: '€6,3 Mrd EU-Agrarsubventionen (GAP) für Deutschland + nationale Kofinanzierung. 80% der Direktzahlungen gehen an 20% der Betriebe — die größten.',
            vergleich: 'Ein durchschnittlicher deutscher Hof erhält ~€30.000/Jahr EU-Subventionen. Davon fließen ~€270/Hektar als Flächenprämie — unabhängig davon, was oder wie produziert wird.',
        },
        versprechen: {
            text: '30% Bio-Landwirtschaft bis 2030, Pflanzenschutzmittel reduzieren, Höfesterben stoppen, Tierhaltungskennzeichnung einführen',
            status: 'Bio-Anteil 2024: 11,2% (Ziel 30%). Tierhaltungskennzeichnung beschlossen aber nur für Schwein und nur für frisches Fleisch. Bauernproteste 2024 nach Agrardiesel-Streichung. Höfesterben geht weiter: -3% Betriebe/Jahr.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'BÖLW (Bio-Branche)', ausgaben: '€280.000/Jahr', lobbyisten: 3 },
                { name: 'AbL (Arbeitsgemeinschaft bäuerliche Landwirtschaft)', ausgaben: '€180.000/Jahr', lobbyisten: 2 },
            ],
            dagegen: [
                { name: 'Deutscher Bauernverband (DBV)', ausgaben: '€5,7 Mio/Jahr', lobbyisten: 22 },
                { name: 'Industrieverband Agrar (Pflanzenschutz)', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 8 },
                { name: 'DRV (Raiffeisenverband)', ausgaben: '€1,3 Mio/Jahr', lobbyisten: 6 },
            ],
            fazit: 'Der Deutsche Bauernverband vertritt v.a. große Betriebe und Agrarindustrie, nicht Kleinbauern. Bio-Verbände haben einen Bruchteil des Budgets. EU-Subventionen belohnen Fläche statt Nachhaltigkeit.',
        },
        international: {
            vorbild: 'Niederlande',
            flagge: '🇳🇱',
            wasBeimVorbild: 'Die Niederlande sind nach den USA der zweitgrößte Agrarexporteur der Welt — auf einem Bruchteil der Fläche. Schlüssel: Wageningen University als Innovationshub, Gewächshaus-Technologie (90% weniger Wasser, 95% weniger Pestizide als Freilandanbau), Precision Farming mit Drohnen und Sensoren. Aber: Auch die Niederlande kämpfen mit Stickstoff-Krise und Bauernprotesten.',
            wasWirLernen: 'Forschung und Praxis enger verzahnen (Deutschland hat 50+ Agrar-Forschungsinstitute, aber die Innovation kommt nicht auf dem Feld an). Subventionen an Nachhaltigkeit koppeln statt an Fläche. Technologie nutzen, um mit weniger Fläche mehr zu produzieren — und den Rest der Natur zurückgeben.',
            quelle: 'Wageningen University & Research, CBS Netherlands, OECD Agricultural Policy Monitoring 2024',
        },
    },
    {
        id: 'gleichstellung',
        keywords: ['gleichstellung', 'gleichberechtigung', 'gender', 'pay gap', 'lohnlücke', 'frauenquote', 'elternzeit', 'feminismus', 'diskriminierung', 'gendergerechtigkeit'],
        name: 'Gleichstellung & Gender',
        icon: 'Users',
        color: 'var(--color-purple)',
        zustaendig: {
            ministerium: 'Bundesministerium für Familie, Senioren, Frauen und Jugend (BMFSFJ)',
            minister: 'BMFSFJ-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Familie, Senioren, Frauen und Jugend',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a13',
        },
        budget: {
            ressort: '€13,2 Mrd (BMFSFJ gesamt)',
            anteil: '~€240 Mio für Gleichstellungspolitik, Frauenhäuser und Gewaltschutz — €8,4 Mrd für Elterngeld',
            vergleich: 'Deutschland: Gender Pay Gap 18% (unbereinigt). EU-Schnitt: 13%. Island: 10,2%. Schweden: 11,2%. Beim bereinigten GPG (gleicher Job, gleiche Qualifikation) liegt Deutschland bei 6%.',
        },
        versprechen: {
            text: 'Entgelttransparenz stärken, Frauenquote in Vorständen ausbauen, Gewaltschutz verbessern, Ehegattensplitting reformieren',
            status: 'Frauenquote für Vorstände (börsennotiert, >2.000 Mitarbeiter) umgesetzt. Entgelttransparenzgesetz wirkungslos — kaum Auskunftsansprüche. Ehegattensplitting: nicht angetastet. Frauenhäuser unterfinanziert (fehlen ~14.000 Plätze laut Istanbul-Konvention).',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Deutscher Frauenrat', ausgaben: '€180.000/Jahr', lobbyisten: 2 },
                { name: 'UN Women Deutschland', ausgaben: '€90.000/Jahr', lobbyisten: 1 },
            ],
            dagegen: [
                { name: 'BDA (gegen Lohntransparenz-Pflichten)', ausgaben: '€4,2 Mio/Jahr', lobbyisten: 18 },
                { name: 'Familienunternehmer e.V. (gegen Quotenregelungen)', ausgaben: '€1,4 Mio/Jahr', lobbyisten: 6 },
            ],
            fazit: 'Gleichstellungs-Lobby ist extrem schwach finanziert. Das Ehegattensplitting kostet den Staat €22 Mrd/Jahr und begünstigt Alleinverdiener-Ehen — kein politischer Akteur traut sich an die Reform.',
        },
        international: {
            vorbild: 'Island',
            flagge: '🇮🇸',
            wasBeimVorbild: 'Island ist seit 15 Jahren Platz 1 im Global Gender Gap Index. Schlüsselmaßnahmen: Equal Pay Certification seit 2018 — Unternehmen mit 25+ Mitarbeitern MÜSSEN nachweisen, dass sie gleich bezahlen, sonst drohen Bußgelder. Elternzeit: 12 Monate, davon 6 Monate für jeden Elternteil (nicht übertragbar). Frauenquote im Parlament: 48% (ohne gesetzliche Quote — durch Parteilisten). Seit 1975 Streiktag der Frauen ("kvennafrí") als kulturelles Erbe.',
            wasWirLernen: 'Lohntransparenz muss verpflichtend und mit Sanktionen versehen sein — das deutsche Entgelttransparenzgesetz hat keine Zähne. Elternzeit-Monate nicht übertragbar machen: In Island nutzen 90% der Väter Elternzeit, in Deutschland 26%. Ehegattensplitting abschaffen und durch Individualbesteuerung mit Kinderbonus ersetzen.',
            quelle: 'World Economic Forum Global Gender Gap Report 2024, Statistics Iceland, OECD Gender Data Portal',
        },
    },
    {
        id: 'sport',
        keywords: ['sport', 'sportförderung', 'bewegung', 'olympia', 'breitensport', 'sportvereine', 'spitzensport', 'bewegungsmangel', 'dosb', 'fitness'],
        name: 'Sport & Bewegung',
        icon: 'Activity',
        color: 'var(--color-cyan)',
        zustaendig: {
            ministerium: 'Bundesministerium des Innern und für Heimat (BMI) — Abteilung Sport',
            minister: 'BMI-Minister:in (neue Regierung)',
            ausschuss: 'Sportausschuss',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a05',
        },
        budget: {
            ressort: '€15,1 Mrd (BMI gesamt)',
            anteil: '~€335 Mio für Sportförderung (Spitzensport + DOSB-Förderung) + €400 Mio Sportstättensanierung (Investitionspakt)',
            vergleich: 'Deutschland gibt ~€4 pro Einwohner:in für Sportförderung aus. Großbritannien: €12 (UK Sport + Sport England). Resultat: UK hat bei Olympia 2024 mehr Medaillen pro Kopf geholt.',
        },
        versprechen: {
            text: 'Sportfördergesetz verabschieden, Sportstätten sanieren (Sanierungsstau €31 Mrd), Bewegungsförderung in Schulen, Olympia-Bewerbung prüfen',
            status: 'Sportfördergesetz gescheitert (Streit um Unabhängigkeit des Sports). Investitionspakt Sportstätten: nur €400 Mio bei €31 Mrd Sanierungsstau. 80% der Kinder erreichen nicht die WHO-Empfehlung von 60 Min. Bewegung/Tag.',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'DOSB (Deutscher Olympischer Sportbund)', ausgaben: '€890.000/Jahr', lobbyisten: 6 },
                { name: 'DFB (Deutscher Fußball-Bund)', ausgaben: '€520.000/Jahr', lobbyisten: 4 },
            ],
            dagegen: [
                { name: 'Kommunale Spitzenverbände (keine Mittel für Sportstätten)', ausgaben: '€2,1 Mio/Jahr', lobbyisten: 10 },
            ],
            fazit: 'Sport hat keine starke politische Lobby, weil er als "Freizeitthema" gilt. Der Sanierungsstau bei Sportstätten (€31 Mrd) zeigt jahrzehntelanges Versagen. Bewegungsmangel kostet das Gesundheitssystem ~€5 Mrd/Jahr.',
        },
        international: {
            vorbild: 'Finnland',
            flagge: '🇫🇮',
            wasBeimVorbild: 'Finnlands Programm "Schools on the Move" (Liikkuva koulu) seit 2010: Jede Schulstunde enthält Bewegungspausen, aktive Pausengestaltung, Schulwege zu Fuß/Rad. 90% aller Schulen machen mit. Ergebnis: Finnische Kinder bewegen sich durchschnittlich 68 Min/Tag (deutsche: 41 Min). Finnland gibt €52 pro Einwohner:in für Breitensport aus (ehrenamtliche Strukturen, kommunale Sportstätten kostenlos nutzbar).',
            wasWirLernen: 'Bewegung in den Schulalltag integrieren statt nur auf den Vereinssport zu setzen. Sportstätten kommunal finanzieren und kostenlos zugänglich machen. Prävention rechnet sich: €1 für Bewegungsförderung spart €3-5 im Gesundheitssystem.',
            quelle: 'Finnish Schools on the Move Programme, WHO Physical Activity Report 2024, OECD Health Statistics',
        },
    },
    {
        id: 'kultur',
        keywords: ['kultur', 'medien', 'öffentlich-rechtlich', 'rundfunk', 'kulturförderung', 'theater', 'museum', 'musik', 'film', 'kreativwirtschaft'],
        name: 'Kultur & Medien',
        icon: 'Map',
        color: 'var(--color-orange)',
        zustaendig: {
            ministerium: 'Beauftragter der Bundesregierung für Kultur und Medien (BKM)',
            minister: 'BKM-Staatsminister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Kultur und Medien',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a22',
        },
        budget: {
            ressort: '€2,2 Mrd (BKM gesamt)',
            anteil: '~€2,2 Mrd für Kulturförderung, Filmförderung, Gedenkstätten, Provenienzforschung. ÖRR separat: ~€8,6 Mrd Rundfunkbeitrag (€18,36/Monat)',
            vergleich: 'Deutschland gibt ~€160 pro Einwohner:in für öffentliche Kulturförderung aus (alle Ebenen). Frankreich: €240. Aber Deutschland hat die dichteste Theaterlandschaft der Welt: 140 Staats- und Stadttheater.',
        },
        versprechen: {
            text: 'ÖRR reformieren, Kulturförderung stärken, Kreativwirtschaft als Wirtschaftsfaktor anerkennen, soziale Absicherung von Soloselbständigen in Kulturberufen verbessern',
            status: 'ÖRR-Reform nach Schlesinger-Skandal gestartet, aber langsam. Kulturpass für 18-Jährige (€200) eingeführt, geringe Nutzung. Soloselbständige in Kultur: weiterhin prekär, KSK unterfinanziert.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Deutscher Kulturrat', ausgaben: '€320.000/Jahr', lobbyisten: 3 },
                { name: 'Deutscher Bühnenverein', ausgaben: '€180.000/Jahr', lobbyisten: 2 },
            ],
            dagegen: [
                { name: 'Verlegerverbände (BDZV, VDZ)', ausgaben: '€1,9 Mio/Jahr', lobbyisten: 10 },
                { name: 'VAUNET (private Medien — gegen ÖRR-Expansion)', ausgaben: '€640.000/Jahr', lobbyisten: 4 },
            ],
            fazit: 'Kultur hat wenig politisches Gewicht — Kulturschaffende sind schlecht organisiert und oft prekär beschäftigt. Die ÖRR-Debatte wird von Medienmacht und Länderpolitik dominiert.',
        },
        international: {
            vorbild: 'Südkorea',
            flagge: '🇰🇷',
            wasBeimVorbild: 'Südkorea hat Kultur systematisch zur Exportindustrie gemacht ("K-Culture"): Staatliche Förderung über KOCCA (Korea Creative Content Agency) mit €800 Mio/Jahr Budget. Ergebnis: K-Pop, K-Drama, K-Film (Parasite: Oscar), K-Games generieren €12 Mrd Exportumsatz/Jahr. Kulturexporte stieg seit 2000 um 2.000%. Aber auch: massive Kulturförderung im Inland — 43% der Koreaner:innen besuchen mindestens 1x/Monat eine Kulturveranstaltung.',
            wasWirLernen: 'Kultur als Wirtschaftsfaktor ernst nehmen (deutsche Kreativwirtschaft: €175 Mrd Bruttowertschöpfung — größer als Chemie oder Maschinenbau). Kulturexportförderung ausbauen: Goethe-Institut hat nur €437 Mio Budget für globale Kulturarbeit. Kreativwirtschaft und klassische Kultur nicht gegeneinander ausspielen.',
            quelle: 'KOCCA Korea Creative Content Agency, UNESCO Cultural Statistics 2024, BKM Kulturwirtschaftsbericht',
        },
    },
    {
        id: 'justiz',
        keywords: ['justiz', 'rechtsstaat', 'gerichte', 'verfahrensdauer', 'richter', 'staatsanwalt', 'rechtsprechung', 'justizdigitalisierung', 'rechtsschutz', 'prozesse'],
        name: 'Justiz & Rechtsstaat',
        icon: 'Shield',
        color: 'var(--color-blue)',
        zustaendig: {
            ministerium: 'Bundesministerium der Justiz (BMJ)',
            minister: 'BMJ-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Recht',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a06',
        },
        budget: {
            ressort: '€1,1 Mrd (BMJ Bund)',
            anteil: '~€14,5 Mrd Gesamtausgaben für Justiz (Bund + Länder). Davon ~€800 Mio für IT-Modernisierung geplant bis 2026 — tatsächlich umgesetzt: Bruchteil.',
            vergleich: 'Durchschnittliche Verfahrensdauer Zivilprozess: Deutschland 8,1 Monate. Dänemark: 4,3 Monate. Estland: 4,9 Monate (digital). Ein Verwaltungsgerichtsverfahren dauert in Deutschland im Schnitt 18,4 Monate.',
        },
        versprechen: {
            text: 'Justiz digitalisieren (e-Akte, Videoverhandlungen), Verfahren beschleunigen, Paktus für den Rechtsstaat fortführen, mehr Richter:innen und Staatsanwält:innen einstellen',
            status: 'Elektronische Akte (beA) für Anwälte verpflichtend, aber technisch fehlerhaft. Videoverhandlungen seit Corona möglich, kaum genutzt. Richtermangel: ~3.000 Stellen unbesetzt bundesweit. Verfahrensdauer steigt.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Deutscher Richterbund', ausgaben: '€280.000/Jahr', lobbyisten: 3 },
                { name: 'Deutscher Anwaltverein (DAV)', ausgaben: '€960.000/Jahr', lobbyisten: 6 },
            ],
            dagegen: [
                { name: 'BDI/BDA (gegen strengere Regulierung)', ausgaben: '€13,1 Mio/Jahr', lobbyisten: 60 },
            ],
            fazit: 'Die Justiz hat keine mächtige Lobby — sie soll unabhängig sein. Ergebnis: Gerichte werden chronisch unterfinanziert, während Wirtschaftslobby stärkere Regulierung bremst.',
        },
        international: {
            vorbild: 'Estland',
            flagge: '🇪🇪',
            wasBeimVorbild: 'Estlands e-Court-System: Alle Gerichtsverfahren digital — Klageschrift bis Urteil. Akten online einsehbar für alle Beteiligten. KI-unterstützte Urteilsvorschläge bei Bagatellsachen unter €7.000 (Richter:in entscheidet final). Durchschnittliche Verfahrensdauer Zivilsachen: 4,9 Monate (sinkend). Elektronische Zustellung spart 2 Wochen pro Verfahrensschritt.',
            wasWirLernen: 'E-Akte konsequent einführen — nicht als Parallelsystem zum Papier, sondern als Ersatz. KI für Standardfälle nutzen (Mahnverfahren, Verkehrsordnungswidrigkeiten) und Richter:innen für komplexe Fälle freisetzen. Videoverhandlungen als Standard, nicht als Ausnahme.',
            quelle: 'Estonian Ministry of Justice, EU Justice Scoreboard 2024, CEPEJ Report on European Judicial Systems',
        },
    },
    {
        id: 'obdachlosigkeit',
        keywords: ['obdachlosigkeit', 'wohnungslosigkeit', 'housing first', 'obdachlose', 'straße', 'notunterkunft', 'wohnungslose', 'social housing', 'sozialhilfe'],
        name: 'Obdachlosigkeit & Wohnungslosigkeit',
        icon: 'Building',
        color: '#ef4444',
        zustaendig: {
            ministerium: 'Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen (BMWSB) + BMAS',
            minister: 'BMWSB-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Wohnen, Stadtentwicklung, Bauwesen und Kommunen',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a24',
        },
        budget: {
            ressort: '€4,8 Mrd (BMWSB gesamt)',
            anteil: '~€150 Mio Bundesmittel direkt für Wohnungslosenhilfe — Hauptlast tragen Kommunen und Wohlfahrtsverbände. Geschätzte Gesamtkosten Wohnungslosigkeit: €4-6 Mrd/Jahr (Notunterkünfte, Gesundheit, Polizei, Justiz).',
            vergleich: 'Deutschland: ~263.000 wohnungslose Menschen (2024, erste offizielle Statistik). Finnland: ~3.600 (bei 5,5 Mio Einwohnern). Umgerechnet auf die Bevölkerung hat Deutschland 5x mehr Wohnungslose als Finnland.',
        },
        versprechen: {
            text: 'Nationaler Aktionsplan gegen Wohnungslosigkeit, Wohnungslosigkeit bis 2030 überwinden, Housing-First-Projekte fördern',
            status: 'Nationaler Aktionsplan 2024 beschlossen — aber ohne verbindliche Ziele und ohne ausreichende Finanzierung. Housing-First-Modellprojekte in wenigen Städten (Berlin, Düsseldorf, Hamburg), kein flächendeckender Ansatz.',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'BAG Wohnungslosenhilfe', ausgaben: '€120.000/Jahr', lobbyisten: 2 },
                { name: 'Diakonie Deutschland', ausgaben: '€1,8 Mio/Jahr', lobbyisten: 9 },
                { name: 'Caritas Deutschland', ausgaben: '€1,6 Mio/Jahr', lobbyisten: 8 },
            ],
            dagegen: [
                { name: 'ZIA (Immobilienwirtschaft — gegen Belegungsrechte)', ausgaben: '€2,1 Mio/Jahr', lobbyisten: 14 },
            ],
            fazit: 'Wohnungslose haben keine eigene Lobby — sie sind politisch unsichtbar. Wohlfahrtsverbände übernehmen die Fürsprache, aber ihr Fokus ist breit gestreut.',
        },
        international: {
            vorbild: 'Finnland',
            flagge: '🇫🇮',
            wasBeimVorbild: 'Finnland ist das einzige EU-Land, in dem Obdachlosigkeit seit 2008 kontinuierlich sinkt. Schlüssel: Housing First als nationale Strategie — nicht als Modellprojekt. Jeder Wohnungslose bekommt ZUERST eine eigene Wohnung, DANN Unterstützung (Suchtberatung, Schuldenberatung, Jobvermittlung). Obdachlosenunterkünfte wurden in normale Mietwohnungen umgewandelt. Kosten: ~€15.000/Person/Jahr. Zum Vergleich: Obdachlosigkeit auf der Straße kostet ~€40.000/Person/Jahr (Krankenhaus, Polizei, Notunterkünfte).',
            wasWirLernen: 'Housing First funktioniert und spart Geld: 80% der Housing-First-Teilnehmer:innen in Finnland behalten ihre Wohnung langfristig. Deutschland muss von Modellprojekten zur nationalen Strategie übergehen. Obdachlosenunterkünfte sind teurer und weniger wirksam als Wohnungen.',
            quelle: 'Y-Foundation Finland, ARA (Housing Finance and Development Centre of Finland) 2024, FEANTSA Homelessness Report 2024',
        },
    },
    {
        id: 'forschung',
        keywords: ['forschung', 'innovation', 'patente', 'ausgründungen', 'startups', 'transfer', 'spin-off', 'wissenschaft', 'technologie', 'hightech'],
        name: 'Forschung & Innovation',
        icon: 'Zap',
        color: 'var(--color-purple)',
        zustaendig: {
            ministerium: 'Bundesministerium für Bildung und Forschung (BMBF)',
            minister: 'BMBF-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Bildung, Forschung und Technikfolgenabschätzung',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a18',
        },
        budget: {
            ressort: '€22,3 Mrd (BMBF gesamt)',
            anteil: '~€14 Mrd für Forschungsförderung (DFG, Max-Planck, Fraunhofer, Helmholtz, Leibniz). Deutschland gibt 3,1% des BIP für Forschung aus — Ziel: 3,5%.',
            vergleich: 'Israel gibt 5,6% des BIP für F&E aus, Südkorea 4,9%, Deutschland 3,1%. Ergebnis: Israel hat 96 Unicorns bei 9 Mio Einwohnern. Deutschland: 30 bei 83 Mio.',
        },
        versprechen: {
            text: 'F&E-Ausgaben auf 3,5% BIP steigern, DATI (Agentur für Transfer und Innovation) gründen, Ausgründungen aus Universitäten fördern, Bürokratie bei Forschungsanträgen abbauen',
            status: 'DATI-Gründung gescheitert. F&E-Quote stagniert bei 3,1%. Ausgründungen aus Unis leicht gestiegen, aber weit unter Potenzial: ~1.600/Jahr (USA: ~6.000 aus vergleichbar vielen Unis). Forschungszulagengesetz eingeführt, aber zu bürokratisch.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Stifterverband', ausgaben: '€580.000/Jahr', lobbyisten: 4 },
                { name: 'Bundesverband Deutsche Startups', ausgaben: '€420.000/Jahr', lobbyisten: 4 },
                { name: 'Allianz der Wissenschaftsorganisationen', ausgaben: '€380.000/Jahr', lobbyisten: 3 },
            ],
            dagegen: [
                { name: 'Keine direkte Gegenlobby — aber Finanzministerium als Bremser (Haushaltsdisziplin)', ausgaben: '—', lobbyisten: 0 },
            ],
            fazit: 'Die Forschungslobby ist relativ einig — alle wollen mehr Geld. Das Problem ist nicht Lobby, sondern föderale Zuständigkeiten (Hochschulen = Länder) und ein risikoaverses Gründungsökosystem.',
        },
        international: {
            vorbild: 'Israel',
            flagge: '🇮🇱',
            wasBeimVorbild: 'Israel ("Start-up-Nation"): 5,6% des BIP für F&E (weltweit höchster Anteil). 96 Unicorns, mehr Börsen-Listings an der NASDAQ als ganz Europa. Schlüssel: Yozma-Programm (1993) — Staat investierte €100 Mio in Venture-Capital-Fonds und verdoppelte damit privates Kapital. Militärdienst als Innovationsinkubator (Unit 8200 → Cybersecurity-Startups). Innovation Authority: Unbürokratische Förderung, Geld in 60 Tagen. Scheitern ist kein Stigma.',
            wasWirLernen: 'Staat muss Risikokapital-Markt ankurbeln (HTGF ist zu klein: €900 Mio vs. Israel: €25 Mrd VC-Investitionen/Jahr). Bürokratie bei Gründungen radikal reduzieren: GmbH-Gründung dauert in Deutschland 8 Tage, in Israel 1 Tag. Uni-Professoren müssen gründen dürfen und wollen — Nebentätigkeitsrecht reformieren.',
            quelle: 'Israel Innovation Authority 2024, IVC Research Center, OECD Science, Technology and Innovation Outlook 2024',
        },
    },
    {
        id: 'entwicklungshilfe',
        keywords: ['entwicklungshilfe', 'entwicklungszusammenarbeit', 'oda', 'bmz', 'giz', 'klimafinanzierung', 'hunger', 'armut', 'globaler süden', 'kfw entwicklungsbank'],
        name: 'Entwicklungszusammenarbeit',
        icon: 'Map',
        color: 'var(--color-green)',
        zustaendig: {
            ministerium: 'Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung (BMZ)',
            minister: 'BMZ-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für wirtschaftliche Zusammenarbeit und Entwicklung',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a19',
        },
        budget: {
            ressort: '€11,2 Mrd (BMZ 2025)',
            anteil: 'ODA-Quote Deutschland: 0,79% des BNE (2023). Geplante Kürzungen auf 0,67% bis 2027. UN-Ziel: 0,7%.',
            vergleich: 'Norwegen: 1,09% des BNE. Schweden: 0,91%. Luxemburg: 1,03%. Deutschland war kurzzeitig über 0,7%, fällt nun zurück. Die absoluten Zahlen sind hoch (~€34 Mrd inkl. Flüchtlingskosten im Inland), aber ein Drittel wird für Flüchtlingsunterbringung im Inland angerechnet.',
        },
        versprechen: {
            text: 'ODA-Quote bei 0,7% halten, feministische Entwicklungspolitik umsetzen, Klimafinanzierung für den Globalen Süden stärken, neue Partnerschaften auf Augenhöhe',
            status: 'ODA-Quote sinkt (Kürzungen 2025/26). Feministische Entwicklungspolitik-Strategie veröffentlicht, aber bei Haushaltskürzungen als erstes gestrichen. Klimafinanzierungszusage (€6 Mrd/Jahr) nicht vollständig eingehalten.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'VENRO (Dachverband Entwicklungspolitik)', ausgaben: '€480.000/Jahr', lobbyisten: 4 },
                { name: 'ONE (Kampagnenorganisation)', ausgaben: '€1,2 Mio/Jahr', lobbyisten: 5 },
                { name: 'Brot für die Welt', ausgaben: '€620.000/Jahr', lobbyisten: 4 },
            ],
            dagegen: [
                { name: 'Bund der Steuerzahler (gegen höhere Ausgaben)', ausgaben: '€1,6 Mio/Jahr', lobbyisten: 7 },
            ],
            fazit: 'Entwicklungshilfe hat wenig innenpolitische Lobby — die Empfänger:innen können in Deutschland nicht wählen. Bei Haushaltszwängen wird Entwicklungsetat als erstes gekürzt.',
        },
        international: {
            vorbild: 'Norwegen',
            flagge: '🇳🇴',
            wasBeimVorbild: 'Norwegen gibt konstant über 1% des BNE für Entwicklungszusammenarbeit aus — seit Jahrzehnten. Schlüssel: Parteiübergreifender Konsens, dass Entwicklungshilfe nationales Interesse ist. Norwegischer Staatsfonds (€1,6 Billionen) schließt Unternehmen aus, die Menschenrechte oder Umweltstandards verletzen. NORAD (norwegische Entwicklungsagentur) ist bekannt für hohe Wirksamkeit und Transparenz. Fokus: Energie, Klima, Meeresressourcen — Bereiche, in denen Norwegen Expertise hat.',
            wasWirLernen: 'ODA-Quote gesetzlich verankern statt sie jährlich zur Haushaltsdisposition zu stellen. Entwicklungszusammenarbeit an deutsche Stärken koppeln (erneuerbare Energien, Berufsbildung, Ingenieurwesen). Transparenz: Jeder Euro muss nachvollziehbar sein — das stärkt die öffentliche Akzeptanz.',
            quelle: 'OECD DAC Peer Review Norway 2024, NORAD Results Report, ONE DATA Report',
        },
    },
    {
        id: 'demokratie',
        keywords: ['demokratie', 'wahlrecht', 'wahlbeteiligung', 'bürgerbeteiligung', 'bürgerrat', 'volksabstimmung', 'transparenz', 'lobbyregister', 'parteien', 'parlament'],
        name: 'Demokratie & Wahlrecht',
        icon: 'Users',
        color: 'var(--color-blue)',
        zustaendig: {
            ministerium: 'Bundesministerium des Innern und für Heimat (BMI) + Bundestag (Geschäftsordnung)',
            minister: 'BMI-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Inneres und Heimat + Wahlprüfungsausschuss',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a04',
        },
        budget: {
            ressort: '€15,1 Mrd (BMI gesamt)',
            anteil: '~€120 Mio für Demokratieförderung (Bundesprogramme) + ~€180 Mio Parteienfinanzierung + Wahlkosten (~€120 Mio pro Bundestagswahl)',
            vergleich: 'Wahlbeteiligung Bundestagswahl 2021: 76,6%. Schweiz (mit direkter Demokratie): 45% bei Wahlen, aber 40-60% bei Volksabstimmungen — Partizipation verteilt sich auf mehr Kanäle.',
        },
        versprechen: {
            text: 'Wahlrechtsreform (Bundestag verkleinern), Lobbyregister stärken, Demokratiefördergesetz, Wahlalter 16, Bürgerräte etablieren',
            status: 'Wahlrechtsreform 2023 beschlossen: Bundestag auf 630 Sitze begrenzt (von 736). Lobbyregister eingeführt, aber ohne legislative Fußspur. Demokratiefördergesetz gescheitert. Wahlalter 16 bei Europawahl umgesetzt.',
            note: 3,
        },
        lobby: {
            dafuer: [
                { name: 'Mehr Demokratie e.V.', ausgaben: '€380.000/Jahr', lobbyisten: 4 },
                { name: 'Transparency International Deutschland', ausgaben: '€480.000/Jahr', lobbyisten: 4 },
                { name: 'abgeordnetenwatch.de', ausgaben: '€220.000/Jahr', lobbyisten: 2 },
            ],
            dagegen: [
                { name: 'Etablierte Parteien (institutionell — gegen Verkleinerung)', ausgaben: '—', lobbyisten: 0 },
            ],
            fazit: 'Demokratie-NGOs sind gut organisiert, aber finanziell schwach. Die größten Widerstände gegen Demokratiereformen kommen aus den Parteien selbst, die von bestehenden Strukturen profitieren.',
        },
        international: {
            vorbild: 'Schweiz',
            flagge: '🇨🇭',
            wasBeimVorbild: 'Die Schweiz praktiziert direkte Demokratie seit 1848: Bürger:innen stimmen 4x/Jahr über Sachfragen ab (Volksinitiativen, Referenden). ~600 eidgenössische Abstimmungen seit 1848. Ergebnis: Höchstes Vertrauen in staatliche Institutionen in Europa (72%). Föderalismus funktioniert: 26 Kantone mit weitgehender Autonomie. Konkordanzdemokratie: Alle großen Parteien sind in der Regierung — kein Oppositionsprinzip.',
            wasWirLernen: 'Bürgerräte sind ein erster Schritt, aber unverbindlich — sie brauchen institutionelle Verankerung. Volksabstimmungen auf Bundesebene einführen (mit Quoren, um Populismus zu bremsen). Lobbyregister mit legislativer Fußspur: Wer hat welches Gesetz beeinflusst? Transparenz bei Parteispenden verschärfen — Großspenden ab €10.000 sofort veröffentlichen.',
            quelle: 'Swiss Federal Chancellery, OECD Trust in Government Survey 2024, Mehr Demokratie e.V.',
        },
    },
    {
        id: 'cybersicherheit',
        keywords: ['cybersicherheit', 'it-sicherheit', 'hacker', 'cyberangriff', 'bsi', 'ransomware', 'kritische infrastruktur', 'kritis', 'cyberattacke', 'informationssicherheit'],
        name: 'Cybersicherheit',
        icon: 'Zap',
        color: '#ef4444',
        zustaendig: {
            ministerium: 'Bundesamt für Sicherheit in der Informationstechnik (BSI) im Geschäftsbereich des BMI',
            minister: 'BMI-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Inneres und Heimat + Ausschuss für Digitales',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a04',
        },
        budget: {
            ressort: '€15,1 Mrd (BMI gesamt)',
            anteil: '~€220 Mio BSI-Budget (2025). Zum Vergleich: USA (CISA): €3,1 Mrd. UK (NCSC): €340 Mio. Deutschland ist Europas größte Volkswirtschaft, aber das BSI hat weniger Budget als die britische Cyberbehörde.',
            vergleich: 'Geschätzte Schäden durch Cyberangriffe in Deutschland: €148 Mrd/Jahr (Bitkom 2024). BSI-Budget: €220 Mio. Verhältnis Schutzinvestition zu Schaden: 1:673.',
        },
        versprechen: {
            text: 'BSI unabhängig machen, IT-Sicherheitsgesetz 3.0, KRITIS-Schutz stärken, aktive Cyberabwehr ermöglichen, Schwachstellenmanagement einführen',
            status: 'BSI weiterhin dem BMI unterstellt (nicht unabhängig). IT-Sicherheitsgesetz 2.0 beschlossen, 3.0 nicht verabschiedet. KRITIS-Dachgesetz gescheitert. Aktive Cyberabwehr (Hackback) verfassungsrechtlich umstritten.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Bitkom (IT-Sicherheitsbranche)', ausgaben: '€3,8 Mio/Jahr', lobbyisten: 22 },
                { name: 'eco — Verband der Internetwirtschaft', ausgaben: '€840.000/Jahr', lobbyisten: 5 },
                { name: 'TeleTrusT (IT-Sicherheitsverband)', ausgaben: '€280.000/Jahr', lobbyisten: 3 },
            ],
            dagegen: [
                { name: 'Nachrichtendienste (institutionell — wollen Schwachstellen für Überwachung behalten)', ausgaben: '—', lobbyisten: 0 },
            ],
            fazit: 'IT-Sicherheitslobby und Nachrichtendienste haben gegensätzliche Interessen: BSI will Schwachstellen schließen, BND/Verfassungsschutz will sie für Überwachung nutzen. Dieses "Schwachstellen-Dilemma" ist ungelöst.',
        },
        international: {
            vorbild: 'Israel',
            flagge: '🇮🇱',
            wasBeimVorbild: 'Israel hat ein weltführendes Cyber-Ökosystem: Unit 8200 (militärischer Nachrichtendienst) bildet jährlich ~1.000 Cybersicherheits-Experten aus, die nach dem Militärdienst Startups gründen. ~500 Cybersecurity-Firmen bei 9 Mio Einwohnern. Israel National Cyber Directorate (INCD): Unabhängige Behörde mit direktem Zugang zum Premierminister. CERT-IL reagiert durchschnittlich in 15 Minuten auf gemeldete Vorfälle.',
            wasWirLernen: 'BSI unabhängig machen — solange es dem BMI untersteht, bleiben Interessenkonflikte (BMI will auch überwachen können). Cybersicherheits-Ausbildung massiv ausbauen: Deutschland fehlen ~40.000 IT-Sicherheitsfachkräfte. Schwachstellen-Disclosure-Programm: Sicherheitslücken melden und schließen, nicht horten.',
            quelle: 'Israel National Cyber Directorate, BSI Lagebericht 2024, Bitkom Studienbericht Wirtschaftsschutz 2024',
        },
    },
    {
        id: 'luftqualitaet',
        keywords: ['luftqualität', 'feinstaub', 'stickoxid', 'lärm', 'verkehrslärm', 'emissionen', 'umweltzone', 'fahrverbot', 'luftverschmutzung', 'fluglärm'],
        name: 'Luftqualität & Lärm',
        icon: 'Leaf',
        color: 'var(--color-cyan)',
        zustaendig: {
            ministerium: 'Bundesministerium für Umwelt, Naturschutz, nukleare Sicherheit und Verbraucherschutz (BMUV)',
            minister: 'BMUV-Minister:in (neue Regierung)',
            ausschuss: 'Ausschuss für Umwelt, Naturschutz, nukleare Sicherheit und Verbraucherschutz',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a16',
        },
        budget: {
            ressort: '€2,6 Mrd (BMUV gesamt)',
            anteil: '~€180 Mio für Luftreinhaltung und Lärmschutz (Förderprogramme saubere Luft + Lärmschutzmaßnahmen)',
            vergleich: 'Luftverschmutzung verursacht in Deutschland ~70.000 vorzeitige Todesfälle/Jahr (European Environment Agency). Gesundheitskosten: geschätzte €44 Mrd/Jahr. Budget für Gegenmaßnahmen: €180 Mio.',
        },
        versprechen: {
            text: 'WHO-Grenzwerte für Luftqualität einhalten, Lärmaktionspläne umsetzen, Diesel-Fahrverbote vermeiden durch technische Nachrüstung, EU-Luftqualitätsrichtlinie umsetzen',
            status: 'Stickoxid-Grenzwerte in den meisten Städten eingehalten (nach Dieselskandal und Fahrverboten). ABER: Neue WHO-Grenzwerte (2021) werden in fast keiner deutschen Stadt eingehalten. Lärmschutz: 13 Mio Deutsche von gesundheitsschädlichem Verkehrslärm betroffen.',
            note: 4,
        },
        lobby: {
            dafuer: [
                { name: 'Deutsche Umwelthilfe (DUH)', ausgaben: '€480.000/Jahr', lobbyisten: 4 },
                { name: 'BUND (Naturschutz)', ausgaben: '€1,3 Mio/Jahr', lobbyisten: 7 },
            ],
            dagegen: [
                { name: 'VDA (Automobilindustrie)', ausgaben: '€12,4 Mio/Jahr', lobbyisten: 46 },
                { name: 'BDI (Industrie)', ausgaben: '€8,9 Mio/Jahr', lobbyisten: 42 },
            ],
            fazit: 'Die DUH hat durch Klagen mehr erreicht als durch Lobbyarbeit — sie hat Diesel-Fahrverbote vor Gericht erstritten. Die Autolobby gibt 25x mehr aus als Umweltverbände.',
        },
        international: {
            vorbild: 'Norwegen',
            flagge: '🇳🇴',
            wasBeimVorbild: 'Norwegens Null-Emissions-Zonen: Oslo hat die Innenstadt für Privatverkehr gesperrt und Parkplätze in Parks, Spielplätze und Radwege umgewandelt. E-Auto-Anteil an Neuzulassungen: 82% (2024). Ergebnis: NO₂-Werte in Oslo um 36% gesunken seit 2017, Lärmpegel in der Innenstadt um 3 dB reduziert. Bergen: Mautsystem mit Umweltdifferenzierung — Verbrenner zahlen 4x mehr als E-Autos.',
            wasWirLernen: 'Emissionszonen konsequent umsetzen statt ständig aufweichen. Elektromobilität als Luftreinhaltemaßnahme fördern — nicht nur als Klimapolitik. Lärmschutz als Gesundheitspolitik begreifen: Verkehrslärm erhöht Herzinfarkt-Risiko um 8% pro 10 dB.',
            quelle: 'Norwegian Environment Agency 2024, European Environment Agency Air Quality Report 2024, City of Oslo Climate Budget',
        },
    },
    {
        id: 'laendlicher-raum',
        keywords: ['ländlicher raum', 'land', 'dorf', 'ärztemangel', 'landarzt', 'öpnv land', 'abwanderung', 'daseinsvorsorge', 'breitband land', 'landleben'],
        name: 'Ländlicher Raum & Daseinsvorsorge',
        icon: 'Map',
        color: 'var(--color-green)',
        zustaendig: {
            ministerium: 'Bundesministerium für Ernährung und Landwirtschaft (BMEL) + BMWSB (Raumordnung)',
            minister: 'BMEL/BMWSB-Minister:innen (neue Regierung)',
            ausschuss: 'Ausschuss für Ernährung und Landwirtschaft',
            ausschussUrl: 'https://www.bundestag.de/ausschuesse/a10',
        },
        budget: {
            ressort: '€7,5 Mrd (BMEL gesamt)',
            anteil: '~€1,1 Mrd für ländliche Entwicklung (GAK — Gemeinschaftsaufgabe Verbesserung der Agrarstruktur und des Küstenschutzes) + ~€620 Mio Bundesprogramm Ländliche Entwicklung',
            vergleich: '46 Mio Menschen (55% der Bevölkerung) leben in ländlichen Räumen. Aber: 61% aller Landkreise verlieren Einwohner:innen. In 23% der Landkreise gibt es keinen Facharzt innerhalb von 30 Autominuten.',
        },
        versprechen: {
            text: 'Gleichwertige Lebensverhältnisse in Stadt und Land, Breitbandausbau, Ärztemangel auf dem Land bekämpfen, ÖPNV-Anbindung verbessern',
            status: 'Breitband: 77% der Haushalte mit Glasfaser erreichbar (aber nur 35% in ländlichen Gebieten). Ärztemangel: 4.500 Hausarztsitze unbesetzt. ÖPNV: In 60% der ländlichen Gemeinden fährt weniger als 1 Bus pro Stunde. Deutschlandticket hilft wenig, wenn kein Bus kommt.',
            note: 5,
        },
        lobby: {
            dafuer: [
                { name: 'Deutscher Landkreistag', ausgaben: '€980.000/Jahr', lobbyisten: 6 },
                { name: 'Deutscher Städte- und Gemeindebund', ausgaben: '€1,1 Mio/Jahr', lobbyisten: 7 },
            ],
            dagegen: [
                { name: 'Keine direkte Gegenlobby — aber urbane Fokussierung der Politik als strukturelles Problem', ausgaben: '—', lobbyisten: 0 },
            ],
            fazit: 'Ländliche Räume haben eine Stimme durch kommunale Spitzenverbände, aber politische Entscheidungsträger leben und denken urban. 73% der Bundestagsabgeordneten haben ihren Lebensmittelpunkt in einer Großstadt.',
        },
        international: {
            vorbild: 'Japan',
            flagge: '🇯🇵',
            wasBeimVorbild: 'Japan kämpft mit extremer Landflucht (Stichwort: "verschwundene Dörfer") und hat das Satoyama-Konzept entwickelt: Traditionelle Kulturlandschaften als Ressource begreifen, nicht als Problem. Konkret: Telework-Visa für Stadtbewohner:innen, die aufs Land ziehen (bis €30.000 Umzugsprämie). Regionale Revitalisierungsagentur mit €8 Mrd/Jahr Budget. "Chiiki Okoshi Kyoryokutai": Programm, das junge Menschen für 1-3 Jahre aufs Land schickt (Gehalt vom Staat), 60% bleiben danach. Telemedizin in 78% der ländlichen Kliniken.',
            wasWirLernen: 'Umzugsprämien für Fachkräfte aufs Land (nicht nur Landarztprämien, sondern auch für Lehrer:innen, Ingenieur:innen, IT-Fachkräfte). Telemedizin und digitale Gesundheitsversorgung flächendeckend ausrollen. Co-Working-Spaces in ländlichen Gemeinden als Alternative zum Pendeln. Daseinsvorsorge als Pflichtaufgabe gesetzlich verankern.',
            quelle: 'Japan Ministry of Agriculture, MAFF Satoyama Initiative, OECD Rural Policy Review Japan 2024',
        },
    },
];

// Search function
export function searchThemen(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    return themen.filter(t =>
        t.keywords.some(k => k.includes(q)) ||
        t.name.toLowerCase().includes(q)
    );
}
