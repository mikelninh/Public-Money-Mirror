// Bürger-Kampagnen: Konkrete Forderungen mit messbarem Ziel
// Jede Kampagne: Problem → Forderung → Zuständige MdBs → Brief → Ergebnis-Tracking

export const kampagnen = [
    {
        id: 'tierschutz-kastenstand',
        thema: 'Tierschutz',
        icon: 'Heart',
        color: 'var(--color-green)',
        titel: 'Kastenstand sofort verbieten — wie Dänemark seit 2015',
        problem: '90% der Sauen in Deutschland werden in Kastenständen gehalten — Metallkäfige so eng, dass sie sich nicht umdrehen können. Die Übergangsfrist läuft bis 2036. Dänemark hat es 2015 verboten.',
        forderung: 'Verbot der Kastenstandhaltung bis Ende 2027 statt 2036. Übergangshilfen für Landwirte wie in Dänemark (€300 Mio Umstellungsfonds).',
        vorbild: { land: '🇩🇰 Dänemark', detail: 'Kastenstand seit 2015 verboten. Umstellungskosten wurden vom Staat getragen. Kein Betrieb musste schließen.' },
        zustaendigeMdBs: [
            { name: 'Ausschuss für Ernährung und Landwirtschaft', url: 'https://www.bundestag.de/ausschuesse/a10', mitglieder: 34 },
        ],
        briefBetreff: 'Kastenstandhaltung sofort verbieten — Dänemark zeigt wie es geht',
        briefText: `Sehr geehrtes Mitglied des Ausschusses für Ernährung und Landwirtschaft,

82% der Deutschen befürworten strengere Tierschutzgesetze (Eurobarometer 2023). Trotzdem werden 90% der Sauen in Deutschland weiterhin in Kastenständen gehalten — in Käfigen, in denen sie sich nicht einmal umdrehen können.

Die aktuelle Übergangsfrist bis 2036 ist inakzeptabel. Dänemark hat die Kastenstandhaltung 2015 verboten — mit einem staatlichen Umstellungsfonds, der Landwirte beim Umbau unterstützt. Kein Betrieb musste schließen.

Ich fordere Sie auf:
1. Das Verbot der Kastenstandhaltung auf Ende 2027 vorzuziehen.
2. Einen Umstellungsfonds von €300 Mio für betroffene Betriebe einzurichten.
3. Sich im Ausschuss für eine Beschlussempfehlung stark zu machen.

Die Agrarlobby (DBV: €5,7 Mio Lobbyausgaben/Jahr) darf nicht stärker sein als der Wille von 82% der Bevölkerung.

Mit freundlichen Grüßen`,
        lobby: { dafuer: 'Tierschutzbund (€280k/Jahr)', dagegen: 'Bauernverband (€5,7 Mio/Jahr)' },
        teilnehmer: 4218,
        antworten: { erhalten: 3, ausstehend: 31, positiv: 1, negativ: 1, ausweichend: 1 },
        status: 'aktiv',
        startDatum: '2025-11-15',
    },
    {
        id: 'bildung-schulessen',
        thema: 'Bildung',
        icon: 'GraduationCap',
        color: 'var(--color-purple)',
        titel: 'Kostenloses Schulessen für alle — wie Finnland seit 1948',
        problem: 'Jedes 5. Kind in Deutschland ist armutsgefährdet. Viele kommen hungrig in die Schule. Kostenloses Schulessen gibt es nur in Berlin und teilweise in anderen Bundesländern — aber nicht als Bundesstandard.',
        forderung: 'Bundesweites kostenloses Schulessen für alle Schüler:innen, finanziert durch den Bund. Geschätzte Kosten: €3,5 Mrd/Jahr — weniger als 1% des Bundeshaushalts.',
        vorbild: { land: '🇫🇮 Finnland', detail: 'Kostenloses, gesundes Schulessen seit 1948 — für alle, nicht nur für Bedürftige. Ergebnis: bessere Konzentration, weniger Fehlzeiten, gesündere Kinder.' },
        zustaendigeMdBs: [
            { name: 'Ausschuss für Bildung, Forschung und Technikfolgenabschätzung', url: 'https://www.bundestag.de/ausschuesse/a18', mitglieder: 39 },
            { name: 'Ausschuss für Familie, Senioren, Frauen und Jugend', url: 'https://www.bundestag.de/ausschuesse/a13', mitglieder: 37 },
        ],
        briefBetreff: 'Kostenloses Schulessen bundesweit — Finnland zeigt seit 1948 wie es geht',
        briefText: `Sehr geehrtes Ausschussmitglied,

2,8 Millionen Kinder in Deutschland sind armutsgefährdet. Viele kommen hungrig in die Schule und können sich nicht konzentrieren. Ein kostenloses, gesundes Schulessen für alle würde das sofort ändern.

Finnland macht es seit 1948 — für alle Schüler:innen, nicht nur für Bedürftige. Kein Stigma, kein Antrag, kein Nachweis. Einfach Essen für alle Kinder. Die Kosten: ~€800 pro Schüler:in pro Jahr.

Für Deutschland: ~€3,5 Mrd/Jahr — das sind 0,7% des Bundeshaushalts. Weniger als die Zinsen auf eine Woche Staatsschulden. Weniger als die Hälfte dessen, was die Maskenaffäre an überteuerten Masken gekostet hat.

Ich fordere:
1. Einen Gesetzentwurf für bundesweites kostenloses Schulessen.
2. Finanzierung durch den Bund — nicht auf Länder und Kommunen abwälzen.
3. Qualitätsstandards: regional, bio, gesund.

Kein Kind in einem der reichsten Länder der Welt sollte hungrig lernen müssen.

Mit freundlichen Grüßen`,
        lobby: { dafuer: 'Kinderhilfswerk (€190k/Jahr)', dagegen: 'Bund der Steuerzahler (€1,6 Mio/Jahr)' },
        teilnehmer: 6891,
        antworten: { erhalten: 8, ausstehend: 68, positiv: 5, negativ: 1, ausweichend: 2 },
        status: 'aktiv',
        startDatum: '2025-10-01',
    },
    {
        id: 'transparenz-vertragsregister',
        thema: 'Transparenz',
        icon: 'Search',
        color: 'var(--color-blue)',
        titel: 'Öffentliches Vertragsregister — wie die Slowakei seit 2011',
        problem: 'Bundesaufträge über €25.000 sind nicht öffentlich einsehbar. Überteuerte Beschaffung (Masken, Berater, IT-Projekte) fällt oft erst Jahre später auf — wenn überhaupt.',
        forderung: 'Alle Verträge des Bundes über €25.000 müssen in einem öffentlichen Online-Register veröffentlicht werden. Verträge ohne Veröffentlichung werden unwirksam — wie in der Slowakei.',
        vorbild: { land: '🇸🇰 Slowakei', detail: 'Seit 2011: Verträge der öffentlichen Hand sind erst gültig, wenn sie online veröffentlicht sind. Ergebnis: Einsparungen von 10-15% bei öffentlichen Aufträgen.' },
        zustaendigeMdBs: [
            { name: 'Haushaltsausschuss', url: 'https://www.bundestag.de/ausschuesse/a08', mitglieder: 44 },
        ],
        briefBetreff: 'Öffentliches Vertragsregister jetzt — Slowakei spart 10-15% damit',
        briefText: `Sehr geehrtes Mitglied des Haushaltsausschusses,

der Bundesrechnungshof fordert seit Jahren mehr Transparenz bei öffentlichen Aufträgen. Die Slowakei hat 2011 ein einfaches Gesetz erlassen: Verträge der öffentlichen Hand sind erst gültig, wenn sie online veröffentlicht sind.

Ergebnis: 10-15% Einsparungen bei öffentlichen Aufträgen. Weniger Korruption. Mehr Wettbewerb. Bürger:innen können nachprüfen, wofür ihr Geld ausgegeben wird.

In Deutschland bleiben die meisten Bundesaufträge geheim. Die Masken-Beschaffung (€6+ Mrd Schaden), die Berateraffäre (€155 Mio), die BER-Kostenexplosion (€6,6 Mrd) — all das wäre früher aufgefallen, wenn Verträge öffentlich gewesen wären.

Ich fordere:
1. Ein Bundesvertragsregister für alle Aufträge über €25.000.
2. Gültigkeit von Verträgen erst nach Veröffentlichung — wie in der Slowakei.
3. Maschinenlesbares Format (CSV/JSON), nicht nur PDFs.

Transparenz ist der beste Korruptionsschutz.

Mit freundlichen Grüßen`,
        lobby: { dafuer: 'Transparency International (€850k/Jahr)', dagegen: 'Keine organisierte Gegenlobby — aber Verwaltungsträgheit' },
        teilnehmer: 3456,
        antworten: { erhalten: 5, ausstehend: 39, positiv: 3, negativ: 0, ausweichend: 2 },
        status: 'aktiv',
        startDatum: '2025-12-01',
    },
    {
        id: 'rente-orange-envelope',
        thema: 'Rente',
        icon: 'Clock',
        color: 'var(--color-orange)',
        titel: 'Renten-Transparenz: Orange Envelope für Deutschland',
        problem: 'Die meisten Deutschen wissen nicht, wie viel Rente sie bekommen werden. Die "Renteninformation" ist ein unverständliches Formular. In Schweden bekommt jede:r jährlich einen klaren, einfachen Brief.',
        forderung: 'Jährliche, verständliche Renteninformation für alle — digital und per Post. Klare Aussage: "So viel Rente bekommst du, wenn du so weitermachst. So viel fehlt dir."',
        vorbild: { land: '🇸🇪 Schweden', detail: 'Der "Orange Envelope" kommt jährlich: eine Seite, klare Zahlen, Prognose. 92% der Schweden kennen ihre voraussichtliche Rente.' },
        zustaendigeMdBs: [
            { name: 'Ausschuss für Arbeit und Soziales', url: 'https://www.bundestag.de/ausschuesse/a11', mitglieder: 49 },
        ],
        briefBetreff: 'Verständliche Renteninformation für alle — Schweden macht es vor',
        briefText: `Sehr geehrtes Mitglied des Ausschusses für Arbeit und Soziales,

nur 38% der Deutschen wissen ungefähr, wie viel Rente sie erwarten können (DIA-Studie 2023). Die aktuelle "Renteninformation" ist ein unverständliches Formular voller Fachbegriffe und Kleingedrucktem.

In Schweden bekommt jede:r einmal im Jahr den "Orange Envelope" — eine Seite, klare Zahlen: "So viel Rente bekommst du. So viel musst du privat vorsorgen." 92% der Schweden kennen ihre voraussichtliche Rente.

Ich fordere:
1. Eine jährliche, verständliche Renteninformation — digital + per Post.
2. Klare Sprache statt Beamtendeutsch: "Du bekommst €1.340/Monat. Das sind 48% deines letzten Gehalts."
3. Prognose-Rechner: "Wenn du €200/Monat mehr einzahlst, bekommst du €180 mehr Rente."

Transparenz ist die Grundlage für gute Altersvorsorge. Wer nicht weiß was er bekommt, kann nicht vorsorgen.

Mit freundlichen Grüßen`,
        lobby: { dafuer: 'Verbraucherzentrale (€1,2 Mio/Jahr)', dagegen: 'Versicherungslobby (€23,8 Mio/Jahr — will private Vorsorge verkaufen)' },
        teilnehmer: 2134,
        antworten: { erhalten: 2, ausstehend: 47, positiv: 2, negativ: 0, ausweichend: 0 },
        status: 'aktiv',
        startDatum: '2026-01-10',
    },
];
