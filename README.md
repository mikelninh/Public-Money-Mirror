# Public Money Mirror

**Wo landet dein Steuergeld? Wer entscheidet das? Was kannst du tun?**

> **Live:** [mikelninh.github.io/Public-Money-Mirror](https://mikelninh.github.io/Public-Money-Mirror/)

€489 Mrd Bundeshaushalt — durchleuchtet, bewertet, in deiner Hand. Nicht noch ein Daten-Dashboard. Ein Demokratie-Werkzeug.

---

## Was kann PMM?

### Verstehen
- **30 Themen-Lookup** — Tippe "Tierschutz", "Rente" oder "Klima". Sofort sehen: wer zuständig ist, was versprochen wurde, wer Lobby macht, welches Land es besser macht. 6 Kategorien: Soziales, Wirtschaft, Umwelt, Staat & Recht, Infrastruktur, Gesellschaft.
- **Lebenssituation** — Elternteil, Student:in, Rentner:in, Angestellt, Selbstständig, Arbeitsuchend. Der Haushalt aus DEINER Perspektive.
- **Bundeshaushalt 2018–2025** — Echte Einzelpläne mit Live-API (bundeshaushalt.de). 24h-Cache, Offline-Fallback.
- **Wirkungsketten** — Lobby → Partei → Haushalt → Dein Leben. 4 dokumentierte Ketten.
- **Live-Steuerzähler** — €15.497 pro Sekunde. Sieh in Echtzeit zu.

### Bewerten
- **Politik-Zeugnis** — Koalitionsvertrag vs. Realität. 7 Fächer, 25 Versprechen, Note 1-6. Transparente Methodik + "So verbessert ihr eure Note".
- **MdB Transparenz-Index** — 28 kuratierte + **Live-Suche für 180.000+ Politiker:innen**. 5 Faktoren, 0-100 Punkte. Ehrliche Confidence-Level: 📡 Live / ✏️ Geschätzt / ? Keine Daten.
- **KorruptionsTracker** — 5 Tabs: Lobby×Politik-Korrelationen, Skandale, Drehtür (7 Fälle), Parteispenden-Ranking, Karenzzeit-Analyse.
- **Verschwendungstracker** — 7 Fälle, €25+ Mrd Schaden.
- **Parteienvergleich** — Matrix, Radar-Chart, Dot-Plot, Mini-Wahlkompass (6 Fragen).

### Lernen
- **Globale Vorbilder** — 15+ Länder: Schweden (Rente), Estland (Digital), Finnland (Schulessen), Wien (Wohnen), Dänemark (Klima). Mit Zahlen und Quellen.
- **Tierrechte** — 763 Mio Tiere/Jahr, Lobby-Ungleichgewicht, 5 internationale Vorbilder, Win-Win-Win Vision, konkrete Aktionen.
- **Bürger-Vorschläge** — Eigene Ideen einreichen, über die besten abstimmen.

### Handeln
- **Kampagnen** — 4 aktive Kampagnen mit fertigen Briefen und **Antwort-Tracker**: "31 von 34 MdBs schweigen."
- **MdB-Brief-Generator** — 3 vorformulierte Briefe mit Quellen.
- **Budget-Simulator** — Verschiebe €489 Mrd. "Das entspricht 333 Schulneubauten."
- **Bürgersignal** — Transparenz-Forderungen.

### Gamification
- **Demokratie-Profil** — 22 Achievements, 6 Levels, Streaks, 30 tägliche Fakten.
- **Echte Belohnungen** — Demokratie-Ausweis (75 Pkt), Unterstützer:innen-Wand (150), eigene Kampagnen erstellen (250), PMM Sticker-Pack per Post (400).
- **Gemeinsame Ziele** — 100 Briefe → Transparenzbericht. 1.000 Unterstützer → Bundestags-Petition. 5.000 Profile → Town Hall mit MdB.

---

## Datenquellen

| Quelle | Daten | Zugang |
|--------|-------|--------|
| [bundeshaushalt.de](https://www.bundeshaushalt.de) | Bundeshaushalt 2012-2025 | Live-API |
| [Lobbyregister Bundestag](https://www.lobbyregister.bundestag.de) | 6.760+ Organisationen | Live-API |
| [abgeordnetenwatch.de](https://www.abgeordnetenwatch.de) | 180.000+ Politiker:innen | Live-API (CC0) |
| [donation.watch](https://donation.watch/en/germany) | Parteispenden 2022-2025 | Referenz |
| [LobbyControl](https://www.lobbycontrol.de) | Drehtür-Fälle | Referenz |
| [Bundesrechnungshof](https://www.bundesrechnungshof.de) | Prüfberichte | Statisch |
| OECD, Eurostat, EFSA, FAO, WHO | Internationale Vergleiche | Referenz |

---

## Tech Stack

- **React 18** + **Vite 5** — Frontend mit Code-Splitting
- **Tailwind CSS 4** — Light/Dark Theme
- **Framer Motion 11** — Animationen
- **GitHub Pages** — Auto-Deploy via GitHub Actions
- Kein Backend — API-Fallbacks auf statische Daten

---

## Quick Start

```bash
git clone https://github.com/mikelninh/Public-Money-Mirror.git
cd Public-Money-Mirror
npm install
npm run dev
```

---

## Projektstruktur

```
src/
├── api/                        # 4 Live-API-Clients
│   ├── bundeshaushalt.js       # BMF Budget-API (24h Cache)
│   ├── lobbyregister.js        # Lobbyregister Bundestag
│   ├── bundestag.js            # MdB-Scoring
│   └── politikerSuche.js       # Live-Suche 180k+ Politiker
│
├── components/                 # 35 React-Komponenten
│   ├── Hero, Navbar, ThemeToggle
│   ├── LifeSituation, PersonalImpact
│   ├── ThemenLookup (30 Themen, 6 Kategorien)
│   ├── FeatureGrid (4 Gruppen: Verstehen/Bewerten/Lernen/Handeln)
│   ├── BudgetStream, BudgetFacts, CategoryCard
│   ├── ImpactChains, PartyCompare, LobbyTracker
│   ├── KorruptionsTracker (5 Tabs)
│   ├── ScandalTracker, PolitikZeugnis, MdBZeugnis
│   ├── VorbilderGlobal, TierrechteSektion
│   ├── BudgetSimulator, Kampagnen, BriefGenerator
│   ├── VotingInterface, TaxTicker, ShareCard
│   └── DemokratieProfil (Gamification)
│
├── data/                       # 9 Daten-Dateien
│   ├── themen.js (30 Themen), kampagnen.js (4 Kampagnen)
│   ├── korruption.js, mdbScores.js (28 MdBs)
│   ├── vorbilder.js, tierrechte.js
│   ├── lifeImpact.js, zeugnis.js, partyData.js
│   └── gamification.js (22 Achievements, 30 Daily Facts)
│
└── data.js                     # Bundeshaushalt 2018-2025
```

---

## UX-Architektur

**Landing** (sofort sichtbar):
1. Hero → Lebenssituation → Themen-Lookup → Feature-Grid

**Deep Dive** (nach Klick):
- Haushalt → Fakten → Wirkungsketten → Parteien → Lobby → Projekte → Verschwendung → Korruption → Zeugnis → MdB-Index → Vorbilder → Tierrechte → Simulator → Kampagnen → Brief → Bürgersignal

**Gamification** (immer sichtbar):
- Floating Punkte-Counter → Profil-Panel → Achievements → Rewards → Gemeinsame Ziele

---

## Mitmachen

- **Kampagnen** — Neue Forderungen mit Vorbildern und Briefen
- **Themen** — Datensätze für weitere Policy-Bereiche
- **MdBs** — Automatisierung für alle 736 Bundestagsabgeordneten
- **Backend** — Persistenz für Vorschläge, Kampagnen, Profile
- **Barrierefreiheit** — WCAG 2.1 AA
- **Daten-Verifizierung** — Faktencheck durch Community

---

## Lizenz

MIT — Offene Daten für eine offene Demokratie.
