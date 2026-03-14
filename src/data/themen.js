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
