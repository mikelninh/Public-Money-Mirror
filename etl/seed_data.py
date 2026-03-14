"""
Seed script with real Bundeshaushalt data (rounded).
Sources: Bundesministerium der Finanzen, Einzelpläne.

Run: python -m etl.seed_data
"""
import os
import json
from sqlalchemy import create_engine, text

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql+asyncpg://pmm:pmm_secret@localhost:5432/pmm",
)

# Replace asyncpg with psycopg2 for sync seed script
SYNC_URL = DATABASE_URL.replace("+asyncpg", "").replace("postgresql://", "postgresql+psycopg2://")
if "psycopg2" not in SYNC_URL:
    SYNC_URL = SYNC_URL.replace("postgresql://", "postgresql+psycopg2://")

CATEGORIES = [
    {
        "id": "social",
        "name": "Social Services",
        "icon": "Users",
        "color": "var(--color-accent-green)",
        "description": "Supporting pensions, unemployment benefits, and social care.",
        "sort_order": 1,
    },
    {
        "id": "health",
        "name": "Healthcare",
        "icon": "Heart",
        "color": "var(--color-accent-blue)",
        "description": "Funding hospitals, medical research, and public health initiatives.",
        "sort_order": 2,
    },
    {
        "id": "defense",
        "name": "Defense",
        "icon": "Shield",
        "color": "#ef4444",
        "description": "Ensuring national security and disaster response capabilities.",
        "sort_order": 3,
    },
    {
        "id": "infrastructure",
        "name": "Infrastructure",
        "icon": "Train",
        "color": "var(--color-accent-orange)",
        "description": "Building roads, bridges, and sustainable transport networks.",
        "sort_order": 4,
    },
    {
        "id": "education",
        "name": "Education",
        "icon": "BookOpen",
        "color": "var(--color-accent-purple)",
        "description": "Investing in schools, universities, and future generations.",
        "sort_order": 5,
    },
    {
        "id": "admin",
        "name": "Administration",
        "icon": "Building",
        "color": "#64748b",
        "description": "Running government institutions and public services.",
        "sort_order": 6,
    },
]

# Real Bundeshaushalt data (rounded, in billions EUR)
# Source: Bundesministerium der Finanzen - Einzelpläne
# social = Arbeit und Soziales (EPl 11)
# health = Gesundheit (EPl 15)
# defense = Verteidigung (EPl 14)
# infrastructure = Verkehr und Digitales (EPl 12)
# education = Bildung und Forschung (EPl 30)
# admin = Allgemeine Finanzverwaltung / Bundespräsident / Bundestag etc.
BUDGET_DATA = {
    # fmt: off
    "social": {
        2018: (139_500_000_000_00, ["Rente mit 63", "Mütterrente", "Grundsicherung"]),
        2019: (145_300_000_000_00, ["Teilhabechancengesetz", "Starke-Familien-Gesetz", "Grundrente Planung"]),
        2020: (170_000_000_000_00, ["Kurzarbeitergeld Corona", "Sozialschutz-Pakete", "Kinderbonus"]),
        2021: (171_400_000_000_00, ["Kurzarbeitergeld Verlängerung", "Kinderfreizeitbonus", "Aufholpaket"]),
        2022: (161_000_000_000_00, ["Energiepreispauschale", "Wohngeldreform", "Bürgergeld Einführung"]),
        2023: (165_500_000_000_00, ["Bürgergeld", "Kindergrundsicherung Planung", "Wohngeld Plus"]),
        2024: (171_000_000_000_00, ["Kindergrundsicherung", "Bürgergeld Anpassung", "Rentenstabilisierung"]),
        2025: (175_000_000_000_00, ["Rentenpaket II", "Familienentlastung", "Pflegereform"]),
    },
    "health": {
        2018: (15_200_000_000_00, ["Pflegepersonal-Stärkungsgesetz", "E-Health", "Krankenhausförderung"]),
        2019: (15_300_000_000_00, ["Terminservice-Gesetz", "Digitale-Versorgung-Gesetz", "Impfpflicht Masern"]),
        2020: (62_000_000_000_00, ["Corona-Schutzschirm Kliniken", "Impfstoffbeschaffung", "Intensivbettenausbau"]),
        2021: (64_400_000_000_00, ["Impfkampagne", "Corona-Testinfrastruktur", "Long-COVID-Forschung"]),
        2022: (52_600_000_000_00, ["Impfstoffproduktion", "Krankenhausreform", "Digitalisierung Gesundheit"]),
        2023: (24_500_000_000_00, ["Krankenhausreform", "Digitale Gesundheitsanwendungen", "Hitzeschutzplan"]),
        2024: (16_700_000_000_00, ["Krankenhausversorgungsgesetz", "ePA für alle", "Cannabis-Regulierung"]),
        2025: (17_000_000_000_00, ["Krankenhausreform Umsetzung", "Gesundheitskioske", "Pharmastandort DE"]),
    },
    "defense": {
        2018: (38_500_000_000_00, ["Cyber-Kommando", "Fregatten F125", "Eurofighter Nachrüstung"]),
        2019: (43_200_000_000_00, ["NATO-Verpflichtungen", "Tornado-Nachfolge", "Digitalisierung Bundeswehr"]),
        2020: (45_600_000_000_00, ["Mehrzweckkampfschiff", "Hubschrauber NH90", "Munitionsbeschaffung"]),
        2021: (46_900_000_000_00, ["Schwerer Transporthubschrauber", "Funkgeräte", "Drohnenprogramm"]),
        2022: (50_400_000_000_00, ["Sondervermögen 100Mrd", "F-35 Beschaffung", "Puma-Modernisierung"]),
        2023: (51_800_000_000_00, ["F-35 Kampfjets", "Leopard 2 A8", "Arrow 3 Raketenabwehr"]),
        2024: (51_900_000_000_00, ["Zeitenwende Umsetzung", "Drohnenabwehr", "Marineschiffbau"]),
        2025: (53_300_000_000_00, ["2% NATO-Ziel", "FCAS Entwicklung", "Digitalisierung Truppe"]),
    },
    "infrastructure": {
        2018: (27_900_000_000_00, ["Breitbandausbau", "Bundesfernstraßen", "Schienennetz-Sanierung"]),
        2019: (29_600_000_000_00, ["Mobilfunkstrategie", "Radverkehrsplan", "Elektromobilität"]),
        2020: (31_600_000_000_00, ["Konjunkturpaket Infrastruktur", "5G-Ausbau", "Ladesäuleninfrastruktur"]),
        2021: (35_000_000_000_00, ["Hochwasser-Wiederaufbau", "Glasfaserausbau", "Wasserstoffstrategie"]),
        2022: (37_400_000_000_00, ["9-Euro-Ticket", "LNG-Terminals", "Autobahnmodernisierung"]),
        2023: (38_600_000_000_00, ["Deutschlandticket", "Schienengipfel", "Brückenmodernisierung"]),
        2024: (42_200_000_000_00, ["Generalsanierung Schiene", "Autobahnausbau A2/A7", "Digitale Schiene"]),
        2025: (43_000_000_000_00, ["Schienennetz Generalsanierung", "Brückenmodernisierung", "ÖPNV-Ausbau"]),
    },
    "education": {
        2018: (17_600_000_000_00, ["Exzellenzstrategie", "BAföG-Reform", "Hightech-Strategie"]),
        2019: (18_300_000_000_00, ["DigitalPakt Schule", "Forschungszulagen", "KI-Strategie"]),
        2020: (20_300_000_000_00, ["Corona-Digitalpakt", "Nationale Forschungsdateninfrastruktur", "Quantencomputing"]),
        2021: (21_200_000_000_00, ["Aufholprogramm Bildung", "mRNA-Forschungsförderung", "Nationale Bildungsplattform"]),
        2022: (19_400_000_000_00, ["Startchancen-Programm", "Chips Act Beteiligung", "Wasserstoff-Forschung"]),
        2023: (21_500_000_000_00, ["BAföG-Erhöhung", "Startchancen-Programm Planung", "KI-Forschungszentren"]),
        2024: (22_300_000_000_00, ["Startchancen-Programm Start", "Forschung Energiewende", "Raumfahrtstrategie"]),
        2025: (22_800_000_000_00, ["Startchancen-Programm Ausbau", "Quantencomputer-Roadmap", "Exzellenzunis"]),
    },
    "admin": {
        2018: (10_200_000_000_00, ["Digitale Verwaltung", "Bundespresseamt", "Auswärtiger Dienst"]),
        2019: (10_600_000_000_00, ["E-Government-Gesetz", "Zensus 2022 Vorbereitung", "IT-Konsolidierung"]),
        2020: (11_500_000_000_00, ["Onlinezugangsgesetz", "Corona-Krisenstab", "Homeoffice Verwaltung"]),
        2021: (12_000_000_000_00, ["OZG Umsetzung", "Registermodernisierung", "Bundescloud"]),
        2022: (11_800_000_000_00, ["Verwaltungsdigitalisierung", "Smart-eID", "Open-Data-Gesetz"]),
        2023: (12_300_000_000_00, ["OZG 2.0", "Digitalcheck Gesetze", "Verwaltungs-KI"]),
        2024: (12_800_000_000_00, ["OZG 2.0 Umsetzung", "BundID", "Digitale Identitäten"]),
        2025: (13_200_000_000_00, ["Verwaltungsmodernisierung", "Once-Only-Prinzip", "GovTech Campus"]),
    },
    # fmt: on
}


def seed():
    engine = create_engine(SYNC_URL)

    with engine.begin() as conn:
        # Clear existing data
        conn.execute(text("DELETE FROM budget_items"))
        conn.execute(text("DELETE FROM budget_categories"))

        # Insert categories
        for cat in CATEGORIES:
            conn.execute(
                text(
                    "INSERT INTO budget_categories (id, name, icon, color, description, sort_order) "
                    "VALUES (:id, :name, :icon, :color, :description, :sort_order)"
                ),
                cat,
            )

        # Insert budget items
        for cat_id, years in BUDGET_DATA.items():
            for year, (amount_cents, examples) in years.items():
                conn.execute(
                    text(
                        "INSERT INTO budget_items (category_id, year, amount_cents, examples) "
                        "VALUES (:category_id, :year, :amount_cents, :examples)"
                    ),
                    {
                        "category_id": cat_id,
                        "year": year,
                        "amount_cents": amount_cents,
                        "examples": json.dumps(examples),
                    },
                )

    print(f"Seeded {len(CATEGORIES)} categories and {sum(len(y) for y in BUDGET_DATA.values())} budget items.")


if __name__ == "__main__":
    seed()
