# Public Money Mirror

**Wo landet dein Steuergeld? Wer entscheidet das? Was kannst du tun?**

> **Live:** [mikelninh.github.io/Public-Money-Mirror](https://mikelninh.github.io/Public-Money-Mirror/)

€489 Mrd Bundeshaushalt — durchleuchtet, bewertet, in deiner Hand. Nicht noch ein Daten-Dashboard. Ein Demokratie-Werkzeug.

---

## Was kann PMM?

### Verstehen
- **30 Themen-Lookup** — Tippe "Tierschutz", "Rente" oder "Klima" und sieh sofort: wer zuständig ist, was versprochen wurde, wer Lobby macht, welches Land es besser macht, und was du tun kannst. 6 Kategorien: Soziales, Wirtschaft, Umwelt, Staat & Recht, Infrastruktur, Gesellschaft.
- **Lebenssituation** — Elternteil, Student:in, Rentner:in, Angestellt, Selbstständig, Arbeitsuchend. Der Haushalt aus DEINER Perspektive mit konkreten Euro-Beträgen.
- **Bundeshaushalt 2018–2025** — Echte Einzelpläne vom BMF mit Live-API-Anbindung (bundeshaushalt.de). 24h-Cache, Offline-Fallback.
- **Wirkungsketten** — Lobby → Partei → Haushalt → Dein Leben. 4 dokumentierte Ketten.
- **Live-Steuerzähler** — €15.497 pro Sekunde gibt der Bund aus. Sieh in Echtzeit zu.

### Bewerten
- **Politik-Zeugnis** — Koalitionsvertrag-Versprechen vs. Realität. 7 Fächer, 25 Einzelversprechen, Note 1-6. Transparente Methodik + "So verbessert ihr eure Note".
- **MdB Transparenz-Index** — 28 kuratierte + Live-API für 180.000+ Politiker:innen. 5 Faktoren (Anwesenheit, Erreichbarkeit, Nebeneinkünfte, Aktivität, Transparenz), 0-100 Punkte + Schulnote. 📡 Live / ✏️ Geschätzt / ? Keine Daten — ehrliche Confidence-Level.
- **KorruptionsTracker** — 5 Tabs: Lobby×Politik-Korrelationen, dokumentierte Skandale, Drehtür (7 Fälle), Parteispenden-Ranking, Karenzzeit-Analyse.
- **Verschwendungstracker** — 7 dokumentierte Fälle, €25+ Mrd Schaden, mit Quellen.
- **Parteienvergleich** — Matrix, Radar-Chart, Dot-Plot, Mini-Wahlkompass (6 Fragen).

### Lernen
- **Globale Vorbilder** — 15+ Länder die es besser machen. Schweden (Rente), Estland (Bildung/Digital), Finnland (Schulessen/Housing First), Wien (Wohnen), Dänemark (Klima/Bürokratie). Mit Zahlen und Quellen.
- **Bürger-Vorschläge** — Eigene Ideen einreichen, über die besten abstimmen.
- **"Wusstest du?"** — Überraschende Budget-Fakten mit BMF-Quellen.

### Handeln
- **Kampagnen** — Konkrete Forderungen mit internationalen Vorbildern, fertigen Briefen, und Antwort-Tracker. "31 von 34 Ausschussmitgliedern schweigen" — das ist der Druck.
- **MdB-Brief-Generator** — 3 vorformulierte Briefe mit Quellen. MdB-Name eintragen, kopieren, via abgeordnetenwatch.de senden.
- **Budget-Simulator** — Verschiebe €489 Mrd mit Reglern. "Das entspricht 333 Schulneubauten." Teile deinen Entwurf.
- **Bürgersignal** — Transparenz-Forderungen von Transparency International, OKF. Zeige was dir wichtig ist.

---

## Datenquellen

| Quelle | Daten | Zugang |
|--------|-------|--------|
| [bundeshaushalt.de](https://www.bundeshaushalt.de) | Bundeshaushalt Einzelpläne 2012-2025 | Live-API |
| [Lobbyregister Bundestag](https://www.lobbyregister.bundestag.de) | 6.760+ Organisationen mit Ausgaben | Live-API |
| [abgeordnetenwatch.de](https://www.abgeordnetenwatch.de) | 180.000+ Politiker:innen, Antwortquoten, Nebentätigkeiten | Live-API (CC0) |
| [Bundesrechnungshof](https://www.bundesrechnungshof.de) | Prüfberichte, Verschwendungsfälle | Statisch |
| [donation.watch](https://donation.watch/en/germany) | Parteispenden 2022-2025 | Referenz |
| [LobbyControl](https://www.lobbycontrol.de) | Drehtür-Fälle, Lobbypedia | Referenz |
| OECD, Eurostat | Internationale Vergleichsdaten | Referenz |
| BMF Monatsberichte | Steuereinnahmen, Haushaltsvollzug | Statisch |

---

## Tech Stack

- **React 18** + **Vite 5** — Frontend
- **Tailwind CSS 4** — Light/Dark Theme mit semantischen Variablen
- **Framer Motion 11** — Animationen
- **Lucide React** — Icons
- **GitHub Pages** — Hosting (auto-deploy via GitHub Actions)
- Kein Backend — läuft komplett im Browser, API-Fallbacks auf statische Daten

---

## Quick Start

```bash
git clone https://github.com/mikelninh/Public-Money-Mirror.git
cd Public-Money-Mirror
npm install
npm run dev
```

Öffne `http://localhost:5173`

---

## Projektstruktur

```
src/
├── api/                        # Live-API-Clients
│   ├── bundeshaushalt.js       # BMF Budget-API (24h Cache)
│   ├── lobbyregister.js        # Lobbyregister Bundestag
│   ├── bundestag.js            # MdB-Scoring via abgeordnetenwatch
│   ├── politikerSuche.js       # Live-Suche 180k+ Politiker:innen
│   └── client.js               # Base HTTP client
│
├── components/                 # 33 React-Komponenten
│   ├── Hero.jsx                # Landing
│   ├── LifeSituation.jsx       # 6 Lebenssituationen
│   ├── PersonalImpact.jsx      # Persönlicher Budget-Impact
│   ├── ThemenLookup.jsx        # 30 Themen mit Kategorien
│   ├── FeatureGrid.jsx         # Navigations-Grid (4 Kategorien)
│   ├── BudgetStream.jsx        # Haushalt (Live-API + Fallback)
│   ├── BudgetFacts.jsx         # "Wusstest du?"
│   ├── ImpactChains.jsx        # Lobby → Budget → Du
│   ├── PartyCompare.jsx        # 4-Tab Parteienvergleich
│   ├── LobbyTracker.jsx        # Lobbyregister Top-Ausgaben
│   ├── KorruptionsTracker.jsx  # 5-Tab Korruptions-Analyse
│   ├── ScandalTracker.jsx      # Verschwendung
│   ├── PolitikZeugnis.jsx      # Regierungs-Zeugnis
│   ├── MdBZeugnis.jsx          # MdB-Index + Live-Suche
│   ├── VorbilderGlobal.jsx     # Internationale Vorbilder + Voting
│   ├── BudgetSimulator.jsx     # Haushalt-Simulator
│   ├── Kampagnen.jsx           # Bürger-Kampagnen
│   ├── BriefGenerator.jsx      # MdB-Brief-Vorlagen
│   ├── VotingInterface.jsx     # Bürgersignal
│   ├── TaxTicker.jsx           # Live-Steuerzähler
│   ├── ShareCard.jsx           # Teilbare Ergebnis-Karten
│   ├── Navbar.jsx              # Mobile Hamburger + Desktop
│   ├── ThemeToggle.jsx         # Light/Dark
│   └── ...                     # Weitere Utilities
│
├── data/                       # 8 Daten-Dateien, ~2.900 Zeilen
│   ├── themen.js               # 30 Policy-Themen
│   ├── kampagnen.js            # 4 Bürger-Kampagnen
│   ├── korruption.js           # Skandale, Drehtür, Korrelationen
│   ├── mdbScores.js            # 28 MdBs mit 5-Faktor-Scoring
│   ├── vorbilder.js            # 15+ Länder-Vergleiche
│   ├── lifeImpact.js           # 6 Lebenssituationen
│   ├── zeugnis.js              # Koalitionsvertrag-Auswertung
│   └── partyData.js            # 6 Parteien, 6 Kategorien
│
├── data.js                     # Bundeshaushalt 2018-2025
└── index.css                   # Theme-System
```

---

## UX-Architektur

Die App ist in **Landing** und **Deep Dive** geteilt:

**Landing** (sofort sichtbar):
1. Hero — "Wo landet dein Steuergeld?"
2. Lebenssituation — "Zeig mir, was mich betrifft"
3. Persönlicher Impact — (nach Auswahl)
4. Themen-Lookup — 30 Themen mit Kategorien
5. Feature-Grid — Verstehen / Bewerten / Lernen / Handeln

**Deep Dive** (nach Klick auf Feature):
- Haushalt → Fakten → Wirkungsketten → Parteien → Lobby → Projekte → Verschwendung → Korruption → Zeugnis → MdB-Index → Vorbilder → Simulator → Kampagnen → Brief → Bürgersignal

Jedes Feature-Grid-Element scrollt direkt zur richtigen Sektion.

---

## Mitmachen

Issues und PRs willkommen. Besonders gesucht:

- **Mehr Kampagnen** — Konkrete Forderungen mit Vorbildern und Briefen
- **Mehr MdBs** — Automatisierung für alle 736 Bundestagsabgeordneten
- **Backend** — Supabase/Firebase für persistente Bürger-Vorschläge und Kampagnen-Daten
- **Barrierefreiheit** — WCAG 2.1 AA
- **i18n** — Englische Übersetzung
- **Daten-Verifizierung** — Faktencheck durch Community

---

## Lizenz

MIT — Offene Daten für eine offene Demokratie.
