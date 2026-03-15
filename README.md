# Public Money Mirror

**Wo landet dein Steuergeld? Wer entscheidet das? Was kannst du tun?**

> Live: [mikelninh.github.io/Public-Money-Mirror](https://mikelninh.github.io/Public-Money-Mirror/)

Public Money Mirror macht den deutschen Bundeshaushalt (€489 Mrd) verständlich, persönlich und handlungsfähig. Nicht noch ein Daten-Dashboard — ein Demokratie-Werkzeug.

## Was kann PMM?

### Persönlich
- **Lebenssituation-Filter** — Elternteil, Student:in, Rentner:in, Angestellt, Selbstständig, Arbeitsuchend. Der ganze Haushalt aus DEINER Perspektive.
- **Themen-Lookup mit Kategorien** — 30 Politikthemen in 6 Kategorien (Soziales, Wirtschaft, Umwelt, Staat & Recht, Infrastruktur, Gesellschaft). Jedes Thema zeigt: Zuständigkeit, Budget, Versprechen-Note, Lobby-Kräfte, internationales Vorbild, Aktionsmöglichkeiten.
- **Live-Steuerzähler** — €15.497 pro Sekunde gibt der Bund aus. Sieh in Echtzeit zu.

### Transparenz
- **Bundeshaushalt 2018-2025** — Echte Einzelpläne vom BMF, Live-API-Anbindung an bundeshaushalt.de
- **Lobbyregister** — Wer gibt wie viel aus, um die Politik zu beeinflussen? Live-Daten vom Bundestag.
- **Wirkungsketten** — Lobby → Partei → Haushalt → Dein Leben. 4 konkrete Ketten: Warum dein Zug Verspätung hat, warum dein Krankenkassenbeitrag steigt.
- **Verschwendungstracker** — 7 dokumentierte Fälle, €25+ Mrd Schaden, mit Quellen und Links.

### Bewertung
- **Politik-Zeugnis** — Koalitionsvertrag-Versprechen vs. Realität. Note 1-6, mit transparenter Methodik. "So verbessert ihr eure Note" — direkt an die Politik.
- **MdB Transparenz-Index** — 28 Abgeordnete, 5 Faktoren, 0-100 Punkte + Schulnote. Anwesenheit, Erreichbarkeit, Nebeneinkünfte, Aktivität, Transparenz.
- **Parteienvergleich** — Matrix, Radar-Chart, Dot-Plot, Mini-Wahlkompass mit 6 Fragen.

### Lernen
- **Globale Vorbilder** — Für jedes Problem gibt es ein Land, das eine Lösung hat. 15+ Vorbilder mit konkreten Zahlen: Schweden (Rente), Estland (Bildung), Wien (Wohnen), Dänemark (Klima).
- **"Wusstest du?"** — Überraschende Budget-Fakten mit Quellen.

### Handeln
- **Budget-Simulator** — Verschiebe die Regler, sieh was passiert. "↑ Das entspricht 333 Schulneubauten." Teile deinen Entwurf.
- **MdB-Brief-Generator** — 3 vorformulierte Briefe mit Quellen (Bundesrechnungshof, OECD). MdB-Name eintragen, kopieren, via abgeordnetenwatch.de senden.
- **Bürger-Vorschläge** — Eigene Ideen einreichen, über die besten abstimmen.
- **Bürgersignal** — Transparenz-Forderungen von Transparency International, Open Knowledge Foundation. Zeige, was dir wichtig ist.

## Datenquellen

| Quelle | Was | API |
|--------|-----|-----|
| [bundeshaushalt.de](https://www.bundeshaushalt.de) | Bundeshaushalt Einzelpläne, Soll/Ist | Live |
| [Lobbyregister Bundestag](https://www.lobbyregister.bundestag.de) | 6.760+ Organisationen, Ausgaben, Interessen | Live |
| [Bundesrechnungshof](https://www.bundesrechnungshof.de) | Prüfberichte, Verschwendungsfälle | Statisch |
| [abgeordnetenwatch.de](https://www.abgeordnetenwatch.de) | MdB-Antwortquoten, Abstimmungsverhalten | Referenz |
| [OECD](https://data.oecd.org) | Internationale Vergleichsdaten | Referenz |
| BMF Monatsberichte | Steuereinnahmen, Haushaltsvollzug | Statisch |

## Tech Stack

- **React 18** + **Vite 5** — Frontend
- **Tailwind CSS 4** — Styling mit Light/Dark Theme
- **Framer Motion 11** — Animationen
- **Lucide React** — Icons
- Keine Backend-Abhängigkeit — läuft komplett im Browser

## Quick Start

```bash
git clone https://github.com/mikelninh/Public-Money-Mirror.git
cd Public-Money-Mirror
npm install
npm run dev
```

Öffne `http://localhost:5173`.

## Projektstruktur

```
src/
├── api/                    # API-Clients
│   ├── bundeshaushalt.js   # bundeshaushalt.de API
│   └── lobbyregister.js    # Lobbyregister API
├── components/             # React-Komponenten
│   ├── Hero.jsx            # Landing
│   ├── LifeSituation.jsx   # Lebenssituation-Picker
│   ├── PersonalImpact.jsx  # Persönlicher Budget-Impact
│   ├── ThemenLookup.jsx    # Themen-Suche
│   ├── BudgetStream.jsx    # Haushalt-Übersicht (Live API)
│   ├── BudgetFacts.jsx     # "Wusstest du?"
│   ├── ImpactChains.jsx    # Lobby → Partei → Budget → Du
│   ├── PartyCompare.jsx    # Parteienvergleich (4 Tabs)
│   ├── LobbyTracker.jsx    # Lobbyregister-Auswertung
│   ├── NearMeMap.jsx       # Bundesweite Projekte
│   ├── ScandalTracker.jsx  # Verschwendungstracker
│   ├── PolitikZeugnis.jsx  # Regierungs-Zeugnis
│   ├── MdBZeugnis.jsx      # MdB Transparenz-Index
│   ├── VorbilderGlobal.jsx # Internationale Vorbilder + Voting
│   ├── BudgetSimulator.jsx # "Dein Haushalt" Simulator
│   ├── BriefGenerator.jsx  # MdB-Brief-Generator
│   ├── VotingInterface.jsx # Bürgersignal
│   ├── TaxTicker.jsx       # Live-Steuerzähler
│   └── ...                 # Theme, Navbar, Utilities
├── data/                   # Daten-Layer
│   ├── partyData.js        # 6 Parteien, 6 Kategorien, Quiz
│   ├── lifeImpact.js       # 6 Lebenssituationen, Wirkungsketten
│   ├── zeugnis.js          # Koalitionsvertrag-Auswertung
│   ├── mdbScores.js        # 28 MdBs, 5-Faktoren-Scoring
│   ├── themen.js           # 15 Policy-Themen mit Vorbildern
│   └── vorbilder.js        # Globale Vergleiche + Bürger-Vorschläge
├── data.js                 # Bundeshaushalt 2018-2025 (Fallback)
└── index.css               # Light/Dark Theme System
```

## Narrative Architektur

Die App erzählt eine Geschichte:

1. **"Wo landet dein Steuergeld?"** — Hook
2. **"Wer bist du?"** — Personalisierung
3. **"Was bedeutet das für DICH?"** — Relevanz
4. **"Was ist dir wichtig?"** — Themen-Deep-Dive
5. **"So verteilt sich der Haushalt"** — Daten
6. **"Wusstest du?"** — Überraschung
7. **"Wie Lobby-Geld deinen Alltag beeinflusst"** — Ursache & Wirkung
8. **"Wer will was?"** — Parteien
9. **"Wer bezahlt dafür?"** — Lobbyregister
10. **"Wo wird gebaut?"** — Lokale Projekte
11. **"Was geht schief?"** — Accountability
12. **"Note: 3,4"** — Regierungs-Zeugnis
13. **"Wie gut machen MdBs ihren Job?"** — Transparenz-Index
14. **"Andere können das besser"** — Vorbilder + Bürger-Ideen
15. **"Wie würdest du €489 Mrd verteilen?"** — Simulator
16. **"Schreib deinem MdB"** — Handlung
17. **"Was ist dir am wichtigsten?"** — Bürgersignal

## Mitmachen

Issues und PRs willkommen. Besonders gesucht:

- **Mehr Themen** — Aktuell 30, Ziel: alle relevanten Policy-Bereiche
- **Mehr MdBs** — Aktuell 28 manuell + Live-API. Ziel: alle 736 Abgeordneten automatisch gescored
- **Mehr Vorbilder** — Internationale Vergleiche mit Quellen
- **Backend** — API für Bürger-Vorschläge, Persistenz, Newsletter
- **Barrierefreiheit** — WCAG 2.1 AA Compliance
- **i18n** — Englische Übersetzung

## Lizenz

MIT — Offene Daten für eine offene Demokratie.
