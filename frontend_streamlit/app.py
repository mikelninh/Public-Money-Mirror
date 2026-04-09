import os
import json
import requests
import pandas as pd
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go




API_BASE = os.getenv("API_BASE", "http://localhost:8000").rstrip("/")

# Page config
st.set_page_config(
    page_title="Public Money Mirror",
    page_icon="💶",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Complete translation system
TRANSLATIONS = {
    "en": {
        # Hero
        "hero_title": "Public Money Mirror",
        "hero_subtitle": "Follow the flow. Every euro has a story.",
        "opening_text": "€346.9 billion flows through the German federal budget every year. That's nearly €1 million per minute. Every decision shapes lives. Every allocation tells a story.",
        
        # Navigation
        "nav_controls": "Controls",
        "nav_filters": "Filters",
        "nav_stats": "Quick Stats",
        "view_by": "View by",
        "min_pct": "Min % of budget",
        "sort_by": "Sort by",
        "total_budget": "Total Budget",
        
        # Tabs
        "tab_flow": "Flow",
        "tab_trends": "Trends",
        "tab_compare": "Compare",
        "tab_deep": "Deep",
        "tab_insights": "Insights",
        "tab_lobby": "Lobby",
        "tab_watch": "Watch",
        "tab_animals": "Animals",
        
        # Animal Welfare tab
        "animals_title": "For the Animals: A Future Without Suffering",
        "animals_subtitle": "Germany can lead the way. Zero suffering. 100% plant-based. Together, we can create a world where love and compassion guide our choices.",
        "animals_mission": "Our Mission",
        "animals_mission_text": "We envision a Germany where no animal suffers for our food, clothing, or entertainment. A nation that chooses compassion over tradition, love over convenience, and freedom for all beings.",
        "animals_why": "Why This Matters",
        "animals_why_text": "Every year, millions of sentient beings in Germany endure lives of confinement, pain, and fear. They feel joy, they feel pain, they form bonds, they long for freedom—just like us. Their suffering is real, and it's happening right now.",
        "animals_vision": "Our Vision",
        "animals_vision_text": "A Germany that leads the world by example: 100% plant-based agriculture, ethical treatment for all animals, and policies that reflect our values of compassion and justice.",
        "animals_act_title": "Take Action Today",
        "animals_act_subtitle": "Every voice matters. Every choice counts. Together, we create change.",
        "animals_act_1": "🌱 Transition to plant-based",
        "animals_act_1_text": "Start with one meal. Try plant-based alternatives. Discover the abundance of delicious, compassionate foods available today.",
        "animals_act_2": "📢 Contact your representatives",
        "animals_act_2_text": "Write to your Bundestag member. Share your vision of a compassionate Germany. Demand policies that protect animals.",
        "animals_act_3": "🤝 Join the movement",
        "animals_act_3_text": "Connect with local animal welfare groups. Support organizations fighting for animal rights. Be part of a community of compassion.",
        "animals_act_4": "📱 Share the message",
        "animals_act_4_text": "Use your voice on social media. Share stories of hope and change. Inspire others with love and understanding.",
        "animals_act_5": "🎓 Educate yourself",
        "animals_act_5_text": "Learn about plant-based nutrition, animal agriculture impacts, and compassionate living. Knowledge empowers action.",
        "animals_act_6": "💚 Support ethical businesses",
        "animals_act_6_text": "Choose companies that align with your values. Support restaurants offering plant-based options. Vote with your wallet.",
        "animals_resources": "Resources & Support",
        "animals_resources_text": "You're not alone on this journey. Here are organizations and resources to help you make compassionate choices:",
        "animals_compassion": "The Path Forward",
        "animals_compassion_text": "Change begins with understanding. When we recognize that animals are not commodities but beings who deserve respect and freedom, our choices naturally align with compassion. Germany has the power, the resources, and the heart to lead this transformation.",
        "animals_closing": "Let's create a Germany where love wins. Where every animal is free. Where compassion guides our nation. The future is plant-based. The future is now.",
        
        # Flow tab
        "where_money_flows": "Where Your Money Flows",
        "top_category": "Top Category",
        "second": "Second",
        "third": "Third",
        "categories": "Categories",
        "human_story": "The Human Story",
        "people_impacted": "People Impacted",
        "what_means_you": "What This Means For You",
        "personal_share": "Your Personal Share",
        "per_year": "per year",
        "per_household": "per household (average 2.1 people)",
        "what_buys": "What This Buys",
        "voice_matters": "Your Voice Matters",
        "voice_title": "Want to influence how your tax money is spent?",
        "contact_bundestag": "Contact your Bundestag member",
        "find_rep": "Find your representative",
        "budget_consultations": "Join budget consultations - Public hearings on the federal budget",
        "sign_petitions": "Sign petitions - Threshold: 50,000 signatures for Bundestag consideration",
        "civil_society": "Participate in civil society - Join transparency advocacy groups",
        "democracy_note": "This is YOUR money. Democracy works when citizens are informed and engaged.",
        
        # Labels
        "official": "Official",
        "estimated": "Estimated",
        "mock_data": "Mock Data"
    },
    "de": {
        # Hero
        "hero_title": "Öffentlicher Geldspegel",
        "hero_subtitle": "Folgen Sie dem Fluss. Jeder Euro hat eine Geschichte.",
        "opening_text": "Jedes Jahr fließen 346,9 Milliarden Euro durch den deutschen Bundeshaushalt. Das sind fast eine Million Euro pro Minute. Jede Entscheidung prägt Leben. Jede Zuweisung erzählt eine Geschichte.",
        
        # Navigation
        "nav_controls": "Steuerung",
        "nav_filters": "Filter",
        "nav_stats": "Schnellübersicht",
        "view_by": "Ansicht nach",
        "min_pct": "Min % des Budgets",
        "sort_by": "Sortieren nach",
        "total_budget": "Gesamtbudget",
        
        # Tabs
        "tab_flow": "Fluss",
        "tab_trends": "Trends",
        "tab_compare": "Vergleich",
        "tab_deep": "Details",
        "tab_insights": "Einblicke",
        "tab_lobby": "Lobby",
        "tab_watch": "Warnung",
        "tab_animals": "Tiere",
        
        # Animal Welfare tab
        "animals_title": "Für die Tiere: Eine Zukunft ohne Leiden",
        "animals_subtitle": "Deutschland kann den Weg weisen. Null Leiden. 100% pflanzlich. Gemeinsam können wir eine Welt schaffen, in der Liebe und Mitgefühl unsere Entscheidungen leiten.",
        "animals_mission": "Unsere Mission",
        "animals_mission_text": "Wir stellen uns ein Deutschland vor, in dem kein Tier für unser Essen, unsere Kleidung oder unsere Unterhaltung leidet. Eine Nation, die Mitgefühl über Tradition, Liebe über Bequemlichkeit und Freiheit für alle Lebewesen wählt.",
        "animals_why": "Warum das wichtig ist",
        "animals_why_text": "Jedes Jahr erleiden Millionen fühlender Lebewesen in Deutschland ein Leben in Gefangenschaft, Schmerz und Angst. Sie empfinden Freude, sie empfinden Schmerz, sie knüpfen Bindungen, sie sehnen sich nach Freiheit—genau wie wir. Ihr Leiden ist real und geschieht genau jetzt.",
        "animals_vision": "Unsere Vision",
        "animals_vision_text": "Ein Deutschland, das durch Vorbild vorangeht: 100% pflanzliche Landwirtschaft, ethische Behandlung aller Tiere und Politik, die unsere Werte von Mitgefühl und Gerechtigkeit widerspiegelt.",
        "animals_act_title": "Heute handeln",
        "animals_act_subtitle": "Jede Stimme zählt. Jede Entscheidung hat Bedeutung. Gemeinsam schaffen wir Veränderung.",
        "animals_act_1": "🌱 Umstellung auf pflanzlich",
        "animals_act_1_text": "Beginnen Sie mit einer Mahlzeit. Probieren Sie pflanzliche Alternativen. Entdecken Sie die Fülle an köstlichen, mitfühlenden Lebensmitteln, die heute verfügbar sind.",
        "animals_act_2": "📢 Kontaktieren Sie Ihre Abgeordneten",
        "animals_act_2_text": "Schreiben Sie Ihrem Bundestagsabgeordneten. Teilen Sie Ihre Vision eines mitfühlenden Deutschlands. Fordern Sie Politik, die Tiere schützt.",
        "animals_act_3": "🤝 Treten Sie der Bewegung bei",
        "animals_act_3_text": "Verbinden Sie sich mit lokalen Tierschutzgruppen. Unterstützen Sie Organisationen, die für Tierrechte kämpfen. Werden Sie Teil einer Gemeinschaft des Mitgefühls.",
        "animals_act_4": "📱 Teilen Sie die Botschaft",
        "animals_act_4_text": "Nutzen Sie Ihre Stimme in den sozialen Medien. Teilen Sie Geschichten der Hoffnung und Veränderung. Inspirieren Sie andere mit Liebe und Verständnis.",
        "animals_act_5": "🎓 Bilden Sie sich weiter",
        "animals_act_5_text": "Lernen Sie über pflanzliche Ernährung, Auswirkungen der Tierhaltung und mitfühlendes Leben. Wissen ermächtigt zum Handeln.",
        "animals_act_6": "💚 Unterstützen Sie ethische Unternehmen",
        "animals_act_6_text": "Wählen Sie Unternehmen, die mit Ihren Werten übereinstimmen. Unterstützen Sie Restaurants mit pflanzlichen Optionen. Stimmen Sie mit Ihrer Brieftasche ab.",
        "animals_resources": "Ressourcen & Unterstützung",
        "animals_resources_text": "Sie sind nicht allein auf dieser Reise. Hier sind Organisationen und Ressourcen, die Ihnen bei mitfühlenden Entscheidungen helfen:",
        "animals_compassion": "Der Weg nach vorn",
        "animals_compassion_text": "Veränderung beginnt mit Verständnis. Wenn wir erkennen, dass Tiere keine Waren sind, sondern Lebewesen, die Respekt und Freiheit verdienen, richten sich unsere Entscheidungen natürlich nach Mitgefühl aus. Deutschland hat die Macht, die Ressourcen und das Herz, diese Transformation anzuführen.",
        "animals_closing": "Lassen Sie uns ein Deutschland schaffen, in dem die Liebe gewinnt. In dem jedes Tier frei ist. In dem Mitgefühl unsere Nation leitet. Die Zukunft ist pflanzlich. Die Zukunft ist jetzt.",
        
        # Flow tab
        "where_money_flows": "Wohin Ihr Geld fließt",
        "top_category": "Top-Kategorie",
        "second": "Zweiter",
        "third": "Dritter",
        "categories": "Kategorien",
        "human_story": "Die Menschliche Geschichte",
        "people_impacted": "Betroffene Personen",
        "what_means_you": "Was Das Für Sie Bedeutet",
        "personal_share": "Ihr Persönlicher Anteil",
        "per_year": "pro Jahr",
        "per_household": "pro Haushalt (Ø 2,1 Personen)",
        "what_buys": "Was Das Kauft",
        "voice_matters": "Ihre Stimme Zählt",
        "voice_title": "Möchten Sie beeinflussen, wie Ihr Steuergeld ausgegeben wird?",
        "contact_bundestag": "Kontaktieren Sie Ihren Bundestagsabgeordneten",
        "find_rep": "Finden Sie Ihren Vertreter",
        "budget_consultations": "Beteiligen Sie sich an Budgetanhörungen - Öffentliche Anhörungen zum Bundeshaushalt",
        "sign_petitions": "Petitionen unterschreiben - Schwelle: 50.000 Unterschriften für Bundestagsberücksichtigung",
        "civil_society": "Engagieren Sie sich in der Zivilgesellschaft - Beitreten Sie zu Transparenz-Advocacy-Gruppen",
        "democracy_note": "Das ist IHR Geld. Demokratie funktioniert, wenn Bürger informiert und engagiert sind.",
        
        # Labels
        "official": "Offiziell",
        "estimated": "Geschätzt",
        "mock_data": "Beispieldaten"
    }
}

# Initialize session state
if 'language' not in st.session_state:
    st.session_state.language = 'en'

# Helper functions for data quality displays
def get_quality_badge(quality):
    """Get quality badge HTML"""
    badges = {
        "official": '<span class="data-quality-badge badge-official">✅ Official</span>',
        "estimated": '<span class="data-quality-badge badge-estimated">⚠️ Estimated</span>',
        "mock": '<span class="data-quality-badge badge-mock">🎭 Mock Data</span>'
    }
    return badges.get(quality, "")

def show_data_disclaimer(data):
    """Show data quality disclaimer if present"""
    if not isinstance(data, dict):
        return
    
    quality = data.get("data_quality")
    disclaimer = data.get("disclaimer")
    source = data.get("source")
    last_updated = data.get("last_updated")
    
    if quality or disclaimer:
        st.markdown(f"""
        <div class="source-disclaimer">
            {get_quality_badge(quality) if quality else ""}
            {f'<strong>Source:</strong> {source}<br>' if source else ''}
            {f'<strong>Updated:</strong> {last_updated}<br>' if last_updated else ''}
            {f'<strong>Note:</strong> {disclaimer}' if disclaimer else ''}
        </div>
        """, unsafe_allow_html=True)

# BRAND DESIGN SYSTEM - "The Silent Architect of Feeling"
# Load brand CSS from file
try:
    import os
    # Try multiple possible paths for the CSS file
    possible_paths = [
        os.path.join(os.path.dirname(__file__), 'assets', 'brand_styles.css'),
        'assets/brand_styles.css',
        'frontend_streamlit/assets/brand_styles.css'
    ]
    brand_css = None
    for css_path in possible_paths:
        try:
            with open(css_path, 'r') as f:
                brand_css = f.read()
                break
        except FileNotFoundError:
            continue
    if brand_css:
        st.markdown(f'<style>{brand_css}</style>', unsafe_allow_html=True)
    else:
        raise FileNotFoundError
except (FileNotFoundError, Exception) as e:
    # Clean, minimal design focused on clarity and overview
    st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    /* === CLEAN, MINIMAL DESIGN SYSTEM === */
    :root {
        --primary: #2563EB;
        --primary-hover: #1D4ED8;
        --success: #10B981;
        --warning: #F59E0B;
        --danger: #EF4444;
        --bg: #FFFFFF;
        --bg-secondary: #F9FAFB;
        --border: #E5E7EB;
        --border-light: #F3F4F6;
        --text-primary: #111827;
        --text-secondary: #6B7280;
        --text-muted: #9CA3AF;
        --spacing-xs: 0.5rem;
        --spacing-sm: 1rem;
        --spacing-md: 1.5rem;
        --spacing-lg: 2rem;
        --spacing-xl: 3rem;
        --spacing-2xl: 4rem;
        --radius: 8px;
        --radius-lg: 12px;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
        --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
    }
    
    /* === BASE STYLES === */
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
    }
    
    html, body, .stApp {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
        background: var(--bg-secondary) !important;
        color: var(--text-primary) !important;
        line-height: 1.6 !important;
    }
    
    .stApp {
        background: var(--bg-secondary) !important;
        min-height: 100vh !important;
    }
    
    /* Main container - Clean, spacious layout */
    .main .block-container {
        padding-top: var(--spacing-xl) !important;
        padding-left: var(--spacing-xl) !important;
        padding-right: var(--spacing-xl) !important;
        padding-bottom: var(--spacing-2xl) !important;
        max-width: 1400px !important;
        margin: 0 auto !important;
    }
    
    /* Sidebar - completely hidden */
    [data-testid="stSidebar"] {
        display: none !important;
    }
    [data-testid="stMain"] {
        margin-left: 0 !important;
        width: 100% !important;
    }
    
    /* === CLEAN TYPOGRAPHY === */
    h1 {
        font-size: 2.5rem !important;
        font-weight: 700 !important;
        color: var(--text-primary) !important;
        line-height: 1.2 !important;
        margin-top: 0 !important;
        margin-bottom: var(--spacing-md) !important;
        letter-spacing: -0.02em !important;
    }
    
    h2 {
        font-size: 1.875rem !important;
        font-weight: 600 !important;
        color: var(--text-primary) !important;
        margin-top: var(--spacing-2xl) !important;
        margin-bottom: var(--spacing-lg) !important;
        line-height: 1.3 !important;
        letter-spacing: -0.01em !important;
    }
    
    h3 {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        color: var(--text-primary) !important;
        margin-top: var(--spacing-xl) !important;
        margin-bottom: var(--spacing-md) !important;
        line-height: 1.4 !important;
    }
    
    h4 {
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        color: var(--text-primary) !important;
        margin-top: var(--spacing-lg) !important;
        margin-bottom: var(--spacing-sm) !important;
    }
    
    /* === CLEAN CARDS === */
    .stat-card {
        background: var(--bg) !important;
        padding: var(--spacing-lg) !important;
        border-radius: var(--radius-lg) !important;
        border: 1px solid var(--border) !important;
        box-shadow: var(--shadow-sm) !important;
        height: 100% !important;
        transition: box-shadow 0.2s ease !important;
    }
    
    .stat-card:hover {
        box-shadow: var(--shadow-md) !important;
        border-color: var(--primary) !important;
    }
    
    .metric-label {
        font-size: 0.75rem !important;
        color: var(--text-muted) !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        margin-bottom: var(--spacing-sm) !important;
    }
    
    .metric-value {
        font-size: 2rem !important;
        font-weight: 700 !important;
        color: var(--text-primary) !important;
        line-height: 1.2 !important;
        letter-spacing: -0.02em !important;
    }
    
    /* === CLEAN TABS === */
    .stTabs [data-baseweb="tab-list"] {
        gap: var(--spacing-xs) !important;
        border-bottom: 2px solid var(--border) !important;
        background: transparent !important;
        padding: 0 !important;
        margin-bottom: var(--spacing-xl) !important;
        overflow-x: auto !important;
    }
    
    .stTabs [data-baseweb="tab"] {
        height: 48px !important;
        padding: 0 var(--spacing-lg) !important;
        background: transparent !important;
        border: none !important;
        border-radius: 0 !important;
        margin-right: var(--spacing-md) !important;
        transition: color 0.2s ease !important;
        font-weight: 500 !important;
        font-size: 0.875rem !important;
        color: var(--text-secondary) !important;
        border-bottom: 2px solid transparent !important;
        margin-bottom: -2px !important;
    }
    
    .stTabs [data-baseweb="tab"]:hover {
        color: var(--text-primary) !important;
    }
    
    .stTabs [aria-selected="true"] {
        color: var(--primary) !important;
        font-weight: 600 !important;
        border-bottom-color: var(--primary) !important;
    }
    
    /* === CLEAN HERO SECTION === */
    .hero-section {
        background: var(--bg) !important;
        padding: var(--spacing-2xl) var(--spacing-xl) !important;
        border-radius: var(--radius-lg) !important;
        border: 1px solid var(--border) !important;
        margin-bottom: var(--spacing-xl) !important;
        box-shadow: var(--shadow-sm) !important;
    }
    
    .hero-title {
        font-size: 2.5rem !important;
        font-weight: 700 !important;
        margin-bottom: var(--spacing-md) !important;
        line-height: 1.2 !important;
        color: var(--text-primary) !important;
    }
    
    .hero-subtitle {
        font-size: 1.125rem !important;
        font-weight: 400 !important;
        line-height: 1.7 !important;
        color: var(--text-secondary) !important;
    }
    
    /* === CLEAN BUTTONS === */
    .stButton>button {
        background: var(--primary) !important;
        color: white !important;
        border: none !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-sm) var(--spacing-lg) !important;
        font-weight: 600 !important;
        font-size: 0.875rem !important;
        transition: background-color 0.2s ease !important;
        box-shadow: var(--shadow-sm) !important;
    }
    
    .stButton>button:hover {
        background: var(--primary-hover) !important;
        box-shadow: var(--shadow-md) !important;
    }
    
    /* === CLEAN EXPANDABLE SECTIONS === */
    .streamlit-expanderHeader {
        background: var(--bg) !important;
        border: 1px solid var(--border) !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-md) !important;
        font-weight: 600 !important;
        font-size: 0.9375rem !important;
        color: var(--text-primary) !important;
        margin: var(--spacing-sm) 0 !important;
        box-shadow: var(--shadow-sm) !important;
        transition: background-color 0.2s ease !important;
    }
    
    .streamlit-expanderHeader:hover {
        background: var(--bg-secondary) !important;
    }
    
    .streamlit-expanderContent {
        background: var(--bg) !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-lg) !important;
        margin-top: var(--spacing-sm) !important;
        border: 1px solid var(--border) !important;
        box-shadow: var(--shadow-sm) !important;
    }
    
    /* === CHARTS === */
    .element-container {
        margin: 0 !important;
    }
    
    /* === CLEAN INFO BOXES === */
    .stSuccess {
        background: #F0FDF4 !important;
        border: 1px solid #86EFAC !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-md) !important;
        box-shadow: var(--shadow-sm) !important;
    }
    
    .stInfo {
        background: #EFF6FF !important;
        border: 1px solid #93C5FD !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-md) !important;
        box-shadow: var(--shadow-sm) !important;
    }
    
    .stWarning {
        background: #FFFBEB !important;
        border: 1px solid #FDE68A !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-md) !important;
        box-shadow: var(--shadow-sm) !important;
    }
    
    .stError {
        background: #FEF2F2 !important;
        border: 1px solid #FCA5A5 !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-md) !important;
        box-shadow: var(--shadow-sm) !important;
    }
    
    /* === CLEAN METRICS === */
    [data-testid="stMetricValue"] {
        font-size: 2rem !important;
        font-weight: 700 !important;
        color: var(--text-primary) !important;
        letter-spacing: -0.02em !important;
    }
    
    [data-testid="stMetricLabel"] {
        font-size: 0.75rem !important;
        font-weight: 600 !important;
        color: var(--text-muted) !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        margin-top: var(--spacing-xs) !important;
    }
    
    [data-testid="stMetricDelta"] {
        font-weight: 600 !important;
        font-size: 0.875rem !important;
    }
    
    /* Data quality badges */
    .data-quality-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-left: 0.5rem;
    }
    
    .badge-official { background: #d1fae5; color: var(--success); border: 1px solid #86efac; }
    .badge-estimated { background: #fed7aa; color: var(--warning); border: 1px solid #fbbf24; }
    .badge-mock { background: #fecaca; color: var(--danger); border: 1px solid #f87171; }
    
    .source-disclaimer {
        background: #EFF6FF;
        border-left: 3px solid var(--primary);
        padding: var(--spacing-md);
        border-radius: var(--radius);
        margin: var(--spacing-lg) 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }
    
    /* Remove Streamlit branding and sidebar */
    #MainMenu { visibility: hidden; }
    footer { visibility: hidden; }
    header { visibility: hidden; }
    [data-testid="stSidebar"] { display: none !important; }
    [data-testid="stMain"] { margin-left: 0 !important; }
    
    /* Captions */
    .stCaption {
        color: var(--text-muted) !important;
        font-size: 0.8125rem !important;
        margin-top: var(--spacing-xs) !important;
    }
    
    /* Divider */
    hr {
        margin: var(--spacing-xl) 0 !important;
        border: none !important;
        border-top: 1px solid var(--border) !important;
    }
    
    /* === CLEAN TEXT STYLES === */
    p, span, li {
        color: var(--text-secondary) !important;
        line-height: 1.7 !important;
        font-size: 1rem !important;
        margin-bottom: var(--spacing-sm) !important;
    }
    
    p:last-child, li:last-child {
        margin-bottom: 0 !important;
    }
    
    /* === SCROLLBAR STYLING === */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
    }
    
    /* === SELECTION STYLING === */
    ::selection {
        background: rgba(37, 99, 235, 0.2);
        color: var(--text-primary);
    }
    
    /* === FOCUS STYLING === */
    *:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }
    
    /* === RESPONSIVE DESIGN === */
    @media (max-width: 768px) {
        .main .block-container {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
            padding-top: 2rem !important;
        }
        
        .hero-section {
            padding: 3rem 2rem !important;
            border-radius: 24px !important;
        }
        
        h1 {
            font-size: 36px !important;
            letter-spacing: -2px !important;
        }
        
        h2 {
            font-size: 28px !important;
        }
        
        .stat-card {
            padding: 1.5rem !important;
        }
    }
    
    /* === LOADING ANIMATIONS === */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Removed animation from element-container - was causing conflicts */
    .element-container {
        margin: 0 !important;
    }
    
    /* === CLEAN FORM ELEMENTS === */
    .stSelectbox > div > div {
        background: var(--bg) !important;
        border: 1px solid var(--border) !important;
        border-radius: var(--radius) !important;
        transition: border-color 0.2s ease !important;
    }
    
    .stSelectbox > div > div:hover {
        border-color: var(--primary) !important;
    }
    
    .stRadio > div {
        background: var(--bg) !important;
        border-radius: var(--radius) !important;
        padding: var(--spacing-md) !important;
        border: 1px solid var(--border) !important;
    }
    
    .stSlider > div {
        margin: var(--spacing-md) 0 !important;
    }
    
    /* === SPACING HELPERS === */
    .element-container {
        margin-bottom: var(--spacing-md) !important;
    }
    
    /* === CLEAN TABLES === */
    .stDataFrame, table {
        border: 1px solid var(--border) !important;
        border-radius: var(--radius) !important;
        overflow: hidden !important;
    }
    
    /* === RESPONSIVE DESIGN === */
    @media (max-width: 768px) {
        .main .block-container {
            padding-left: var(--spacing-md) !important;
            padding-right: var(--spacing-md) !important;
            padding-top: var(--spacing-lg) !important;
        }
        
        h1 {
            font-size: 2rem !important;
        }
        
        h2 {
            font-size: 1.5rem !important;
        }
        
        .stat-card {
            padding: var(--spacing-md) !important;
        }
    }
</style>
""", unsafe_allow_html=True)

# Data
LOBBYIST_DATA = {
    "German Banking Federation (BdB)": {
        "spending_category": "Economic Affairs",
        "influence_score": 95,
        "reg_members": 12,
        "registered_events": 248,
        "connections": ["Finance Ministry", "ECB"]
    },
    "German Industry Federation (BDI)": {
        "spending_category": "Economic Affairs",
        "influence_score": 92,
        "reg_members": 15,
        "registered_events": 312,
        "connections": ["Economics Ministry", "Chancellery"]
    },
    "German Chemical Industry Association (VCI)": {
        "spending_category": "Environment & Energy",
        "influence_score": 88,
        "reg_members": 8,
        "registered_events": 187,
        "connections": ["Environment Ministry", "Economics Ministry"]
    },
    "German Automobile Association (VDA)": {
        "spending_category": "Economic Affairs",
        "influence_score": 85,
        "reg_members": 11,
        "registered_events": 203,
        "connections": ["Transport Ministry", "Economics Ministry"]
    },
    "German Energy Agency": {
        "spending_category": "Environment & Energy",
        "influence_score": 83,
        "reg_members": 9,
        "registered_events": 165,
        "connections": ["Economics Ministry", "Climate Ministry"]
    },
    "German Farmers' Association (DBV)": {
        "spending_category": "Economic Affairs",
        "influence_score": 78,
        "reg_members": 7,
        "registered_events": 142,
        "connections": ["Agriculture Ministry"]
    },
    "German Insurance Association (GDV)": {
        "spending_category": "Economic Affairs",
        "influence_score": 82,
        "reg_members": 10,
        "registered_events": 156,
        "connections": ["Finance Ministry"]
    },
    "Germany Defense Industry Association": {
        "spending_category": "Defense",
        "influence_score": 90,
        "reg_members": 14,
        "registered_events": 198,
        "connections": ["Defense Ministry"]
    }
}

INTERNATIONAL_DATA = {
    "Social Security": {
        "Germany": 44.5,
        "France": 51.2,
        "Italy": 48.8,
        "Sweden": 42.3,
        "UK": 38.7,
        "USA": 36.4,
        "Poland": 41.2,
        "Spain": 46.5
    },
    "Defense": {
        "Germany": 15.0,
        "France": 18.2,
        "Italy": 8.5,
        "Sweden": 11.4,
        "UK": 26.3,
        "USA": 39.2,
        "Poland": 22.1,
        "Spain": 7.8
    },
    "Education & Research": {
        "Germany": 6.0,
        "France": 9.8,
        "Italy": 8.1,
        "Sweden": 12.5,
        "UK": 11.2,
        "USA": 3.9,
        "Poland": 14.2,
        "Spain": 9.4
    },
    "Environment & Energy": {
        "Germany": 5.3,
        "France": 3.2,
        "Italy": 2.8,
        "Sweden": 8.7,
        "UK": 4.1,
        "USA": 1.4,
        "Poland": 3.5,
        "Spain": 2.1
    },
    "Infrastructure": {
        "Germany": 3.7,
        "France": 5.8,
        "Italy": 7.2,
        "Sweden": 4.5,
        "UK": 6.3,
        "USA": 2.8,
        "Poland": 8.9,
        "Spain": 12.3
    }
}

# Header
# Language toggle at top
col_lang, col_main = st.columns([0.15, 0.85])
with col_lang:
    lang_choice = st.radio("Language", ["🇬🇧 EN", "🇩🇪 DE"], horizontal=True, label_visibility="collapsed")
    if lang_choice == "🇩🇪 DE":
        st.session_state.language = 'de'
    else:
        st.session_state.language = 'en'

# Get current translations
t = TRANSLATIONS[st.session_state.language]

# CLEAN HERO SECTION
st.markdown(f'''
<div class="hero-section">
    <div style="text-align: center; max-width: 800px; margin: 0 auto;">
        <h1 class="hero-title">{t["hero_title"]}</h1>
        <p class="hero-subtitle" style="max-width: 600px; margin: 0 auto 2rem auto;">{t["hero_subtitle"]}</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);">
            <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">€1M</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">pro Minute</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">€347B</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">pro Jahr</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">83M</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Bürger</div>
            </div>
        </div>
    </div>
</div>
''', unsafe_allow_html=True)

# CLEAN STORY SECTION
st.markdown(
    f"""
    <div style="background: var(--bg); border: 1px solid var(--border); padding: var(--spacing-xl); border-radius: var(--radius-lg); margin: var(--spacing-xl) 0; box-shadow: var(--shadow-sm);">
        <p style="font-size: 1.125rem; line-height: 1.8; color: var(--text-secondary); margin: 0;">{t['opening_text']}</p>
    </div>
    """,
    unsafe_allow_html=True
)

# CLEAN PERSONAL CONTRIBUTION CARDS
st.markdown(f"### {t['personal_share']}")
col1, col2, col3 = st.columns(3)
with col1:
    st.markdown("""
    <div class="stat-card" style="text-align: center;">
        <div class="metric-value">€4,139</div>
        <div class="metric-label">Pro Jahr</div>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.5rem; margin-bottom: 0;">Durchschnitt pro Bürger</p>
    </div>
    """, unsafe_allow_html=True)
with col2:
    st.markdown("""
    <div class="stat-card" style="text-align: center;">
        <div class="metric-value">€11.30</div>
        <div class="metric-label">Pro Tag</div>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.5rem; margin-bottom: 0;">Jeden einzelnen Tag</p>
    </div>
    """, unsafe_allow_html=True)
with col3:
    st.markdown("""
    <div class="stat-card" style="text-align: center;">
        <div class="metric-value">€0.47</div>
        <div class="metric-label">Pro Stunde</div>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.5rem; margin-bottom: 0;">Auch während Sie schlafen</p>
    </div>
    """, unsafe_allow_html=True)

st.markdown("---")

# Hidden sidebar - using default filters inline
with st.sidebar:
    st.empty()  # Hide sidebar completely

# Set defaults
drilldown = "function"
min_percentage = 0.0
sort_by = "Amount (High to Low)"

# Main content - fun tabs with emojis
tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9, tab10 = st.tabs([
    f"💰 {t['tab_flow']}", f"📈 {t['tab_trends']}", f"🌍 {t['tab_compare']}", f"🗺️ Regions", f"🔬 {t['tab_deep']}", f"📖 Stories", f"📚 Bildung", f"🎭 {t['tab_lobby']}", f"🔍 {t['tab_watch']}", f"🐾 {t['tab_animals']}"
])

with tab1:
    st.markdown(f"## {t['where_money_flows']}")
    
    try:
        params = {"drilldown": drilldown}
        r = requests.get(f"{API_BASE}/spending/distribution", params=params, timeout=30)
        r.raise_for_status()
        data = r.json()

        # Show data quality disclaimer if available
        show_data_disclaimer(data)
        
        dist = data.get("distribution", {})
        pcts = data.get("percentages", {})
        
        if min_percentage > 0:
            dist = {k: v for k, v in dist.items() if pcts.get(k, 0) >= min_percentage}
            pcts = {k: v for k, v in pcts.items() if k in dist}
        
        if sort_by == "Amount (High to Low)":
            sorted_items = sorted(dist.items(), key=lambda x: x[1], reverse=True)
        elif sort_by == "Amount (Low to High)":
            sorted_items = sorted(dist.items(), key=lambda x: x[1], reverse=False)
        else:
            sorted_items = sorted(dist.items(), key=lambda x: x[0])
        
        # STUNNING GRADIENT CARDS FOR TOP 3
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.markdown(f"""
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 16px; box-shadow: 0 8px 24px rgba(102,126,234,0.3); text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                <div style="position: relative; z-index: 1;">
                    <div style="font-size: 13px; color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; font-weight: 700; letter-spacing: 0.5px;">🏆 TOP KATEGORIE</div>
                    <div style="font-size: 42px; font-weight: 900; color: white; margin: 0.5rem 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">€{sorted_items[0][1]/1e9:.1f}B</div>
                    <div style="font-size: 14px; color: rgba(255,255,255,0.95); font-weight: 600; margin-bottom: 0.25rem;">{sorted_items[0][0]}</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.8);">{pcts.get(sorted_items[0][0], 0):.1f}% des Budgets</div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        with col2:
            if len(sorted_items) > 1:
                st.markdown(f"""
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 16px; box-shadow: 0 8px 24px rgba(240,147,251,0.3); text-align: center; position: relative; overflow: hidden;">
                    <div style="position: absolute; bottom: -30px; left: -30px; width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                    <div style="position: relative; z-index: 1;">
                        <div style="font-size: 13px; color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; font-weight: 700; letter-spacing: 0.5px;">🥈 ZWEITER PLATZ</div>
                        <div style="font-size: 42px; font-weight: 900; color: white; margin: 0.5rem 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">€{sorted_items[1][1]/1e9:.1f}B</div>
                        <div style="font-size: 14px; color: rgba(255,255,255,0.95); font-weight: 600; margin-bottom: 0.25rem;">{sorted_items[1][0]}</div>
                        <div style="font-size: 12px; color: rgba(255,255,255,0.8);">{pcts.get(sorted_items[1][0], 0):.1f}% des Budgets</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
        
        with col3:
            if len(sorted_items) > 2:
                st.markdown(f"""
                <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 16px; box-shadow: 0 8px 24px rgba(79,172,254,0.3); text-align: center; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                    <div style="position: relative; z-index: 1;">
                        <div style="font-size: 13px; color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; font-weight: 700; letter-spacing: 0.5px;">🥉 DRITTER PLATZ</div>
                        <div style="font-size: 42px; font-weight: 900; color: white; margin: 0.5rem 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">€{sorted_items[2][1]/1e9:.1f}B</div>
                        <div style="font-size: 14px; color: rgba(255,255,255,0.95); font-weight: 600; margin-bottom: 0.25rem;">{sorted_items[2][0]}</div>
                        <div style="font-size: 12px; color: rgba(255,255,255,0.8);">{pcts.get(sorted_items[2][0], 0):.1f}% des Budgets</div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
        
        with col4:
            top3_pct = sum(pcts.get(k, 0) for k, _ in sorted_items[:3])
            st.markdown(f"""
            <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 1.5rem; border-radius: 16px; box-shadow: 0 8px 24px rgba(67,233,123,0.3); text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%;"></div>
                <div style="position: relative; z-index: 1;">
                    <div style="font-size: 13px; color: rgba(255,255,255,0.9); margin-bottom: 0.5rem; font-weight: 700; letter-spacing: 0.5px;">📂 KATEGORIEN</div>
                    <div style="font-size: 42px; font-weight: 900; color: white; margin: 0.5rem 0; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">{len(dist)}</div>
                    <div style="font-size: 14px; color: rgba(255,255,255,0.95); font-weight: 600; margin-bottom: 0.25rem;">Gesamt Kategorien</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.8);">Top 3: {top3_pct:.0f}% des Budgets</div>
                </div>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown("---")
        
        # Charts
        df = pd.DataFrame([
            {"Category": k, "Amount": v, "Percentage": pcts.get(k, 0)}
            for k, v in sorted_items
        ])
        
        # Add context story
        top_cat = sorted_items[0]
        stories = {
            "Social Security": "Ensures dignity in retirement, support for families, and a safety net for those who need it.",
            "Defense": "Securing peace requires readiness, alliances, and tools of deterrence.",
            "Education & Research": "Investing in minds today shapes tomorrow's economy and society.",
            "Health": "A healthy population is the foundation of prosperity.",
            "Infrastructure": "Roads, rails, and digital networks power growth.",
            "General Public Services": "The machinery of government keeps everything running.",
            "Economic Affairs": "Supporting industry, innovation, and economic growth."
        }
        
        story = stories.get(top_cat[0], "")
        if story:
            st.markdown(f"""
            <div style="background: #EFF6FF; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #0066FF;">
                <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0;">
                    <strong style="font-size: 18px;">{top_cat[0]}</strong> gets €{top_cat[1]/1e9:.1f}B ({pcts.get(top_cat[0], 0):.1f}%) • {story}
                </p>
            </div>
            """, unsafe_allow_html=True)
        
        # Deep Story Data
        try:
            story_r = requests.get(f"{API_BASE}/story/{top_cat[0]}", timeout=10)
            if story_r.status_code == 200:
                story_data = story_r.json()
                hero_story = story_data.get("hero_story")
                human_impact = story_data.get("human_impact")
                
                if hero_story:
                    st.markdown(f"""
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 16px; color: white; margin-bottom: 1.5rem;">
                        <h4 style="color: white; margin-top: 0; font-size: 20px; font-weight: 600;">📖 {t['human_story']}</h4>
                        <p style="font-size: 16px; line-height: 1.8; color: white; margin: 0.5rem 0;">{hero_story}</p>
                    </div>
                    """, unsafe_allow_html=True)
                
                if human_impact:
                    people_helped = human_impact.get("people_helped", 0)
                    description = human_impact.get("description", "")
                    breakdown = human_impact.get("breakdown", "")
                    
                    st.markdown(f"""
                    <div style="background: white; padding: 2rem; border-radius: 16px; border: 1px solid #E5E7EB; margin-bottom: 1.5rem;">
                        <h4 style="color: #111827; margin-top: 0; font-size: 18px;">👥 {t['people_impacted']}</h4>
                        <p style="font-size: 48px; font-weight: 900; color: #0066FF; margin: 0.5rem 0; letter-spacing: -2px;">{people_helped:,.0f}</p>
                        <p style="font-size: 16px; color: #374151; margin: 0.5rem 0;">{description}</p>
                        <p style="font-size: 14px; color: #6B7280; margin: 0.5rem 0 0 0;">{breakdown}</p>
                    </div>
                    """, unsafe_allow_html=True)
        except:
            pass
        
        # Personal Impact Calculator
        st.markdown(f"### 💡 {t['what_means_you']}")
        impact_col1, impact_col2 = st.columns(2)
        
        with impact_col1:
            # Get per-citizen breakdown
            try:
                per_citizen_r = requests.get(f"{API_BASE}/spending/per-citizen/{top_cat[1]}", timeout=10)
                if per_citizen_r.status_code == 200:
                    per_citizen_data = per_citizen_r.json()
                    per_person = per_citizen_data.get("per_citizen", 0)
                    per_household = per_citizen_data.get("per_household", 0)
                    
                    st.markdown(f"""
                    <div style="background: #F0FDF4; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #10B981;">
                        <p style="font-size: 14px; color: #059669; margin: 0 0 0.5rem 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">{t['personal_share']}</p>
                        <p style="font-size: 32px; font-weight: 800; color: #111827; margin: 0.5rem 0;">€{per_person:,.0f}<span style="font-size: 16px; color: #6B7280;"> {t['per_year']}</span></p>
                        <p style="font-size: 14px; color: #6B7280; margin: 0.5rem 0;">€{per_household:,.0f} {t['per_household']}</p>
                    </div>
                    """, unsafe_allow_html=True)
            except:
                pass
        
        with impact_col2:
            # Get concrete examples
            try:
                examples_r = requests.get(f"{API_BASE}/examples/{top_cat[0]}/{top_cat[1]}", timeout=10)
                if examples_r.status_code == 200:
                    examples_data = examples_r.json()
                    examples_text = examples_data.get("text", "")
                    if examples_text:
                        st.markdown(f"""
                        <div style="background: #FEF3C7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #F59E0B;">
                            <p style="font-size: 14px; color: #D97706; margin: 0 0 0.5rem 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">{t['what_buys']}</p>
                            <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.6;">{examples_text}</p>
                        </div>
                        """, unsafe_allow_html=True)
            except:
                pass
        
        st.markdown("---")
        
        col_left, col_right = st.columns([2, 1])
        
        with col_left:
            fig = go.Figure()
            fig.add_trace(go.Bar(
                x=df["Amount"],
                y=df["Category"],
                orientation='h',
                marker=dict(
                    color=df["Amount"],
                    colorscale='Blues',
                    showscale=True,
                    colorbar=dict(title="€")
                ),
                text=[f"€{x/1e9:.1f}B" for x in df["Amount"]],
                textposition='auto',
                hovertemplate='<b>%{y}</b><br>€%{x:,.0f}<extra></extra>'
            ))
            fig.update_layout(
                height=500,
                yaxis=dict(autorange="reversed"),
                xaxis_title="Spending (€)",
                showlegend=False,
                plot_bgcolor='white',
                paper_bgcolor='white',
                font=dict(family="Inter", size=14),
                margin=dict(l=0, r=0, t=0, b=0)
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with col_right:
            df_top10 = df.head(10)
            fig_pie = px.pie(
                df_top10,
                values="Amount",
                names="Category",
                hole=0.4,
                color_discrete_sequence=px.colors.sequential.Blues
            )
            fig_pie.update_traces(
                textposition='inside',
                textinfo='percent+label',
                textfont_size=11
            )
            fig_pie.update_layout(
                height=400,
                showlegend=False,
                font=dict(family="Inter", size=14),
                margin=dict(l=0, r=0, t=0, b=0)
            )
            st.plotly_chart(fig_pie, use_container_width=True)
        
        # Key insights box
        top3_total = sum([x[1] for x in sorted_items[:3]])
        total_budget = sum(dist.values())
        top3_pct = (top3_total / total_budget * 100) if total_budget > 0 else 0
        largest_category = sorted_items[0][0]
        largest_pct = pcts.get(largest_category, 0)
        
        st.markdown(f"""
        <div style="background: linear-gradient(135deg, #fef9c3 0%, #fde68a 100%); padding: 2rem; border-radius: 20px; margin: 2rem 0; border: 2px solid #fbbf24; box-shadow: 0 8px 24px rgba(251,191,36,0.15);">
            <h3 style="margin: 0 0 1rem 0; font-size: 20px; font-weight: 800; color: #78350f; display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 28px;">💡</span>
                <span>Key Insights</span>
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
                <div style="background: white; padding: 1.25rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <div style="font-size: 32px; font-weight: 900; color: #92400e; margin-bottom: 0.25rem;">{largest_pct:.1f}%</div>
                    <div style="font-size: 14px; color: #78350f; font-weight: 600;">Largest Category</div>
                    <div style="font-size: 12px; color: #a16207; margin-top: 0.25rem;">{largest_category}</div>
                    </div>
                <div style="background: white; padding: 1.25rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <div style="font-size: 32px; font-weight: 900; color: #92400e; margin-bottom: 0.25rem;">{top3_pct:.0f}%</div>
                    <div style="font-size: 14px; color: #78350f; font-weight: 600;">Top 3 Concentration</div>
                    <div style="font-size: 12px; color: #a16207; margin-top: 0.25rem;">Three categories dominate</div>
                    </div>
                <div style="background: white; padding: 1.25rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <div style="font-size: 32px; font-weight: 900; color: #92400e; margin-bottom: 0.25rem;">€{total_budget/1e9:.0f}B</div>
                    <div style="font-size: 14px; color: #78350f; font-weight: 600;">Total Budget</div>
                    <div style="font-size: 12px; color: #a16207; margin-top: 0.25rem;">2024 Federal Spending</div>
                    </div>
                </div>
            </div>
        """, unsafe_allow_html=True)
        
        # Engagement: Actions you can take
        st.markdown("---")
        st.markdown(f"### 🎯 {t['voice_matters']}")
        st.markdown(f"""
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 16px; color: white;">
            <h4 style="color: white; margin-top: 0;">{t['voice_title']}</h4>
            <ul style="line-height: 2; margin-bottom: 0;">
                <li><strong>{t['contact_bundestag']}</strong> - <a href="https://www.bundestag.de/abgeordnete" style="color: #FFD700; font-weight: bold;">{t['find_rep']}</a></li>
                <li><strong>{t['budget_consultations']}</strong></li>
                <li><strong>{t['sign_petitions']}</strong></li>
                <li><strong>{t['civil_society']}</strong></li>
            </ul>
            <p style="font-size: 14px; margin: 1rem 0 0 0; opacity: 0.9;">{t['democracy_note']}</p>
        </div>
        """, unsafe_allow_html=True)
    
    except Exception as e:
        st.error(f"Error: {e}")

with tab2:
    st.markdown("## 📈 Historical Trends: Stories Over Time")
    st.caption("Sehen Sie, wie sich die Ausgaben von 2018-2024 entwickelt haben und welche Geschichten die Trends erzählen")
    
    try:
        trends_r = requests.get(f"{API_BASE}/trends", timeout=30)
        trends_r.raise_for_status()
        
        # Show data quality disclaimer
        show_data_disclaimer(trends_r.json())
        
        category = st.selectbox(
            "Kategorie wählen:",
            ["Social Security", "Defense", "Education & Research", "Infrastructure", "Environment & Energy"],
            key="trend_category"
        )
        
        cat_trend_r = requests.get(f"{API_BASE}/trends?category={category}", timeout=30)
        cat_trend_r.raise_for_status()
        cat_trend = cat_trend_r.json()
        
        df_trend = pd.DataFrame([
            {"Year": year, "Amount": amt}
            for year, amt in sorted(cat_trend["trends"].items())
        ])
        
        # Calculate insights
        if len(df_trend) >= 2:
            first_amt = df_trend.iloc[0]["Amount"]
            last_amt = df_trend.iloc[-1]["Amount"]
            growth_pct = ((last_amt - first_amt) / first_amt) * 100
            absolute_change = last_amt - first_amt
            
            # Calculate average annual growth
            years = len(df_trend) - 1
            avg_annual = growth_pct / years if years > 0 else 0
            
            # Determine trend story
            if abs(growth_pct) < 2:
                trend_story = f"**Stabil:** {category} bleibt relativ konstant. Die Ausgaben schwanken nur minimal um ±2% über 7 Jahre."
                trend_color = "#3B82F6"
            elif growth_pct > 15:
                trend_story = f"**Stark steigend:** {category} ist seit 2018 um {growth_pct:.1f}% gewachsen. Das bedeutet zusätzliche €{absolute_change/1e9:.2f}B - eine erhebliche politische Priorität."
                trend_color = "#10B981"
            elif growth_pct > 5:
                trend_story = f"**Moderates Wachstum:** {category} steigt um durchschnittlich {avg_annual:.1f}% pro Jahr. Dies spiegelt steigende Bedürfnisse oder politische Entscheidungen wider."
                trend_color = "#3B82F6"
            elif growth_pct < -5:
                trend_story = f"**Rückläufig:** {category} ist zurückgegangen. Das könnte Budgetdruck oder veränderte Prioritäten widerspiegeln."
                trend_color = "#F59E0B"
            else:
                trend_story = f"**Leicht steigend:** {category} zeigt moderates Wachstum von {growth_pct:.1f}% über 7 Jahre."
                trend_color = "#3B82F6"
            
            # Story box
                st.markdown(f"""
            <div style="background: linear-gradient(135deg, {trend_color}15 0%, {trend_color}08 100%); padding: 2rem; border-radius: 16px; border-left: 4px solid {trend_color}; margin-bottom: 2rem;">
                <h3 style="color: #111827; margin-top: 0; font-size: 22px;">📖 Die Geschichte der Zahlen</h3>
                <p style="font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 1rem;">{trend_story}</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: {trend_color};">{growth_pct:+.1f}%</div>
                        <div style="font-size: 12px; color: #6B7280;">Gesamtwachstum</div>
                </div>
                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: {trend_color};">€{absolute_change/1e9:.2f}B</div>
                        <div style="font-size: 12px; color: #6B7280;">Absolute Änderung</div>
                </div>
                    <div style="background: white; padding: 1rem; border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: {trend_color};">{avg_annual:+.1f}%</div>
                        <div style="font-size: 12px; color: #6B7280;">Pro Jahr (Ø)</div>
                    </div>
                </div>
                </div>
                """, unsafe_allow_html=True)
        
            st.metric(
                f"{category} Entwicklung (2018-2024)",
                f"€{absolute_change:,.0f}",
                f"{growth_pct:+.1f}%"
            )
        
        # Enhanced visualization with annotations
        fig_trend = go.Figure()
        fig_trend.add_trace(go.Scatter(
            x=df_trend["Year"],
            y=df_trend["Amount"],
            mode='lines+markers',
            name=category,
            line=dict(color='#0066FF', width=4),
            marker=dict(size=14, color='#0066FF'),
            fill='tonexty',
            fillcolor='rgba(0,102,255,0.1)',
            hovertemplate='<b>%{x}</b><br>€%{y:,.0f}<extra></extra>'
        ))
        
        # Add annotations for significant changes
        if len(df_trend) >= 3:
            for i in range(1, len(df_trend)):
                prev_amt = df_trend.iloc[i-1]["Amount"]
                curr_amt = df_trend.iloc[i]["Amount"]
                change_pct = ((curr_amt - prev_amt) / prev_amt) * 100 if prev_amt > 0 else 0
                
                if abs(change_pct) > 5:  # Significant year-over-year change
                    year = df_trend.iloc[i]["Year"]
                    annotation_text = f"{change_pct:+.1f}%"
                    fig_trend.add_annotation(
                        x=year,
                        y=curr_amt,
                        text=annotation_text,
                        showarrow=True,
                        arrowhead=2,
                        arrowsize=1,
                        arrowwidth=2,
                        arrowcolor="#EF4444" if change_pct < 0 else "#10B981",
                        bgcolor="white",
                        bordercolor="#E5E7EB",
                        borderwidth=1
            )
        
        fig_trend.update_layout(
            height=500,
            xaxis_title="Jahr",
            yaxis_title="Betrag (€)",
            plot_bgcolor='white',
            paper_bgcolor='white',
            font=dict(family="Inter", size=14),
            margin=dict(l=0, r=0, t=0, b=0),
            hovermode='x unified'
        )
        st.plotly_chart(fig_trend, use_container_width=True)
        
        # Context and interpretation
        if len(df_trend) >= 2:
            st.markdown("---")
            st.markdown("### 💡 Was sagt uns dieser Trend?")
            
            # Get story for context
            try:
                story_r = requests.get(f"{API_BASE}/story/{category}", timeout=10)
                if story_r.status_code == 200:
                    story_data = story_r.json()
                    trends_text = story_data.get("trends", "")
                    if trends_text:
                        st.info(f"📊 **Trend-Kontext:** {trends_text}")
            except:
                pass
            
            # Comparative insights
            st.markdown("#### 🔍 Interpretationshilfen:")
            insights = []
            
            if category == "Defense" and growth_pct > 20:
                insights.append("🇺🇦 **Ukraine-Konflikt:** Der starke Anstieg seit 2022 spiegelt Deutschlands Reaktion auf geopolitische Veränderungen wider.")
            elif category == "Social Security" and growth_pct > 3:
                insights.append("👴 **Demografischer Wandel:** Steigende Rentenausgaben aufgrund einer alternden Bevölkerung.")
            elif category == "Education & Research" and growth_pct < 2:
                insights.append("📚 **Investitionsdruck:** Stabiles oder niedriges Wachstum kann auf unzureichende Investitionen hinweisen.")
            elif category == "Environment & Energy" and growth_pct > 15:
                insights.append("🌍 **Klimawende:** Rapid steigende Ausgaben zeigen den politischen Fokus auf Klimaschutz.")
            
            if insights:
                for insight in insights:
                    st.markdown(f"- {insight}")
            else:
                st.markdown("- Analysiere den Trend im Kontext aktueller politischer und gesellschaftlicher Entwicklungen.")
    
    except Exception as e:
        st.error(f"Error: {e}")

with tab3:
    st.markdown("## 🌍 Deutschland im internationalen Vergleich")
    st.caption("Wie positioniert sich Deutschland im Vergleich zu anderen Ländern? Was sagen die Zahlen?")
    st.warning("⚠️ International comparison data is **estimated** based on OECD/EU statistics. Verify independently for research purposes.")
    
    try:
        params = {"drilldown": "function"}
        r = requests.get(f"{API_BASE}/spending/distribution", params=params, timeout=30)
        r.raise_for_status()
        pcts = r.json().get("percentages", {})
        
        countries = st.multiselect(
            "Länder zum Vergleich:",
            ["France", "Italy", "Sweden", "UK", "USA", "Poland", "Spain"],
            default=["France", "UK", "USA", "Sweden"]
        )
        
        if countries:
            # Summary insights
            st.markdown("---")
            st.markdown("### 💡 Was zeigt der Vergleich?")
            
            insights_col = []
            for category in list(INTERNATIONAL_DATA.keys())[:5]:
                germany_pct = pcts.get(category, 0)
                other_values = [INTERNATIONAL_DATA[category].get(c, 0) for c in countries if c in INTERNATIONAL_DATA[category]]
                avg_other = sum(other_values) / len(other_values) if other_values else 0
                
                if germany_pct < avg_other * 0.9:
                    insights_col.append({
                        "category": category,
                        "insight": f"Deutschland gibt weniger aus ({germany_pct:.1f}% vs. Ø {avg_other:.1f}%)",
                        "color": "#F59E0B",
                        "icon": "⬇️"
                    })
                elif germany_pct > avg_other * 1.1:
                    insights_col.append({
                        "category": category,
                        "insight": f"Deutschland gibt mehr aus ({germany_pct:.1f}% vs. Ø {avg_other:.1f}%)",
                        "color": "#10B981",
                        "icon": "⬆️"
                    })
            
            if insights_col:
                col1, col2, col3 = st.columns(min(3, len(insights_col)))
                for i, insight_data in enumerate(insights_col[:3]):
                    with [col1, col2, col3][i % 3]:
                        st.markdown(f"""
                        <div style="background: {insight_data['color']}15; padding: 1rem; border-radius: 8px; border-left: 3px solid {insight_data['color']}; margin-bottom: 1rem;">
                            <div style="font-size: 20px; margin-bottom: 0.5rem;">{insight_data['icon']}</div>
                            <div style="font-weight: 600; color: #111827; font-size: 14px; margin-bottom: 0.25rem;">{insight_data['category']}</div>
                            <div style="font-size: 12px; color: #6B7280;">{insight_data['insight']}</div>
                        </div>
                        """, unsafe_allow_html=True)
            
            st.markdown("---")
            
            for category in list(INTERNATIONAL_DATA.keys())[:5]:
                st.markdown(f"### {category}")
                
                comp_data = []
                for country in countries:
                    value = INTERNATIONAL_DATA[category].get(country, 0)
                    comp_data.append({
                        "Country": country,
                        "%": value,
                        "Type": "Other"
                    })
                
                germany_pct = pcts.get(category, 0)
                comp_data.append({
                    "Country": "Germany",
                    "%": germany_pct,
                    "Type": "Germany"
                })
                
                df_comp = pd.DataFrame(comp_data)
                
                # Find position
                sorted_df = df_comp.sort_values("%", ascending=False)
                germany_position = sorted_df[sorted_df["Country"] == "Germany"].index[0] + 1
                total_countries = len(sorted_df)
                rank_text = f"{germany_position}. von {total_countries}"
                
                # Story
                avg_others = sorted_df[sorted_df["Type"] == "Other"]["%"].mean()
                diff = germany_pct - avg_others
                
                if abs(diff) < 2:
                    story = f"Deutschland liegt nahe am Durchschnitt der Vergleichsländer ({germany_pct:.1f}% vs. Ø {avg_others:.1f}%)."
                elif diff > 5:
                    story = f"Deutschland gibt deutlich mehr aus ({germany_pct:.1f}% vs. Ø {avg_others:.1f}%). Das zeigt eine starke politische Priorität für {category.lower()}."
                elif diff < -5:
                    story = f"Deutschland gibt deutlich weniger aus ({germany_pct:.1f}% vs. Ø {avg_others:.1f}%). Frage: Ist das ausreichend oder unterfinanziert?"
                elif diff > 0:
                    story = f"Deutschland gibt leicht mehr aus ({germany_pct:.1f}% vs. Ø {avg_others:.1f}%) - Rang {rank_text}."
                else:
                    story = f"Deutschland gibt leicht weniger aus ({germany_pct:.1f}% vs. Ø {avg_others:.1f}%) - Rang {rank_text}."
                
                st.info(f"📊 **{story}**")
                
                fig = px.bar(
                    df_comp,
                    x="Country",
                    y="%",
                    color="Type",
                    color_discrete_map={"Germany": "#0066FF", "Other": "#94A3B8"},
                    text="%"
                )
                fig.update_traces(texttemplate='%{text:.1f}%', textposition='outside')
                fig.update_layout(
                    height=350, 
                    showlegend=False,
                    plot_bgcolor='white',
                    paper_bgcolor='white',
                    font=dict(family="Inter", size=14),
                    margin=dict(l=0, r=0, t=0, b=0),
                    yaxis_title="% des Budgets"
                )
                st.plotly_chart(fig, use_container_width=True)
                
                # Category-specific insights
                if category == "Social Security":
                    st.markdown("💡 **Kontext:** Deutschland hat eine starke soziale Absicherung. Hohe Ausgaben spiegeln das Rentensystem und soziale Netze wider.")
                elif category == "Defense":
                    st.markdown("💡 **Kontext:** Nach 2022 steigen die Verteidigungsausgaben. Deutschland verpflichtet sich zur NATO-2%-Marke.")
                elif category == "Education & Research":
                    st.markdown("💡 **Kontext:** Bildungsausgaben variieren stark zwischen Ländern. Einige investieren stärker in öffentliche Bildung.")
                elif category == "Environment & Energy":
                    st.markdown("💡 **Kontext:** Klimapolitik spiegelt sich in den Energiewende-Investitionen wider.")
                
                st.markdown("---")
            
            # Overall conclusion
            st.markdown("### 🎯 Was bedeutet das?")
            st.markdown("""
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 16px; color: white; margin-top: 2rem;">
                <h4 style="color: white; margin-top: 0;">Vergleiche erzählen Geschichten</h4>
                <p style="color: white; line-height: 1.8;">
                    Internationale Vergleiche zeigen nicht nur Zahlen, sondern politische Prioritäten, gesellschaftliche Werte und historische Kontexte.
                    Deutschland's Position spiegelt Entscheidungen über unsere Zukunft wider.
                </p>
                <p style="color: white; margin-top: 1rem; font-size: 14px; opacity: 0.9;">
                    <strong>Frage dich:</strong> Steht Deutschland dort, wo es stehen sollte? Sind die Prioritäten richtig gesetzt?
                </p>
            </div>
            """, unsafe_allow_html=True)
    
    except Exception as e:
        st.error(f"Error: {e}")

with tab4:
    st.markdown("## 🗺️ Regionale Verteilung: Geschichten der 16 Bundesländer")
    st.caption("Wie wird der Bundeshaushalt über die deutschen Bundesländer verteilt? Welche Geschichten erzählen die regionalen Unterschiede?")
    
    try:
        bl_r = requests.get(f"{API_BASE}/bundeslaender", timeout=30)
        bl_r.raise_for_status()
        bl_data = bl_r.json()
        states = bl_data.get("states", {})
        
        show_data_disclaimer(bl_data)
        
        st.markdown("---")
        
        # Sort by allocation
        sorted_states = sorted(states.items(), key=lambda x: x[1].get("budget_allocation", 0), reverse=True)
        
        # Calculate insights
        total_alloc = sum(s[1].get("budget_allocation", 0) for s in sorted_states)
        avg_per_state = total_alloc / len(sorted_states) if sorted_states else 0
        
        if sorted_states:
            top_state = sorted_states[0][0]
            top_amount = sorted_states[0][1].get("budget_allocation", 0)
            top_pop = sorted_states[0][1].get("population", 0)
            
            bottom_state = sorted_states[-1][0]
            bottom_amount = sorted_states[-1][1].get("budget_allocation", 0)
            
            spread = top_amount / bottom_amount if bottom_amount > 0 else 0
            
            # Story about distribution
            if spread > 3:
                distribution_story = f"Die Verteilung ist sehr ungleich: {top_state} erhält {spread:.1f}x mehr als {bottom_state}. Das spiegelt Bevölkerungsgröße, Wirtschaftskraft und regionale Bedürfnisse wider."
            elif spread > 2:
                distribution_story = f"Moderate Unterschiede: {top_state} erhält {spread:.1f}x mehr als {bottom_state}. Die Verteilung berücksichtigt regionale Unterschiede."
            else:
                distribution_story = f"Relativ ausgewogene Verteilung: Die Unterschiede zwischen den Bundesländern sind moderat."
            
            st.markdown(f"""
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); padding: 2rem; border-radius: 16px; border-left: 4px solid #6366f1; margin-bottom: 2rem;">
                <h3 style="color: #1e293b; margin-top: 0; font-size: 22px;">📖 Die Geschichte der regionalen Verteilung</h3>
                <p style="font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 1rem;">{distribution_story}</p>
            </div>
            """, unsafe_allow_html=True)
        
        # Top states stats with stories
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            st.markdown('<div class="metric-label">🏆 Höchste Zuweisung</div>', unsafe_allow_html=True)
            if sorted_states:
                top_state = sorted_states[0][0]
                top_amount = sorted_states[0][1].get("budget_allocation", 0)
                st.markdown(f'<div class="metric-value">€{top_amount/1e9:.1f}B</div>', unsafe_allow_html=True)
                st.markdown(f'**{top_state}**', unsafe_allow_html=True)
                st.caption(f"{top_amount/avg_per_state:.1f}x Durchschnitt")
            st.markdown('</div>', unsafe_allow_html=True)
        
        with col2:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            st.markdown('<div class="metric-label">📊 Gesamt</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="metric-value">€{total_alloc/1e9:.1f}B</div>', unsafe_allow_html=True)
            st.caption("Alle Bundesländer")
            st.markdown('</div>', unsafe_allow_html=True)
        
        with col3:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            st.markdown('<div class="metric-label">📈 Pro Kopf Ø</div>', unsafe_allow_html=True)
            total_pop = sum(s[1].get("population", 0) for s in sorted_states)
            avg_per_capita = total_alloc / total_pop if total_pop > 0 else 0
            st.markdown(f'<div class="metric-value">€{avg_per_capita:,.0f}</div>', unsafe_allow_html=True)
            st.caption("Durchschnitt pro Bürger")
            st.markdown('</div>', unsafe_allow_html=True)
        
        with col4:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            st.markdown('<div class="metric-label">🗺️ Bundesländer</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="metric-value">{len(sorted_states)}</div>', unsafe_allow_html=True)
            st.markdown('</div>', unsafe_allow_html=True)
        
        st.markdown("---")
        
        # Create dataframe for visualization
        df_states = pd.DataFrame([
            {
                "State": name,
                "Budget (€B)": data.get("budget_allocation", 0) / 1e9,
                "Population (M)": data.get("population", 0) / 1e6,
                "Per Capita": (data.get("budget_allocation", 0) / data.get("population", 1)) if data.get("population", 0) > 0 else 0
            }
            for name, data in sorted_states
        ])
        
        # Enhanced visualization with per capita
        view_type = st.radio("Ansicht:", ["Gesamte Zuweisung", "Pro Kopf"], horizontal=True, key="state_view")
        
        if view_type == "Pro Kopf":
            fig = go.Figure()
            fig.add_trace(go.Bar(
                x=df_states["State"],
                y=df_states["Per Capita"],
                marker=dict(
                    color=df_states["Per Capita"],
                    colorscale='Blues',
                    showscale=True,
                    colorbar=dict(title="€")
                ),
                text=[f"€{x:,.0f}" for x in df_states["Per Capita"]],
                textposition='auto',
                hovertemplate='<b>%{x}</b><br>€%{y:,.0f} pro Kopf<extra></extra>'
            ))
            fig.update_layout(
                height=600,
                xaxis_title="Bundesland",
                yaxis_title="Zuweisung pro Kopf (€)",
                showlegend=False,
                plot_bgcolor='white',
                paper_bgcolor='white',
                font=dict(family="Inter", size=14),
                margin=dict(l=0, r=0, t=0, b=0)
            )
        else:
            fig = go.Figure()
        fig.add_trace(go.Bar(
            x=df_states["State"],
            y=df_states["Budget (€B)"],
            marker=dict(
                color=df_states["Budget (€B)"],
                colorscale='Viridis',
                showscale=True,
                colorbar=dict(title="€ Billions")
            ),
            text=[f"€{x:.1f}B" for x in df_states["Budget (€B)"]],
            textposition='auto',
                hovertemplate='<b>%{x}</b><br>€%{y:.1f}B zugewiesen<extra></extra>'
        ))
        fig.update_layout(
            height=600,
                xaxis_title="Bundesland",
                yaxis_title="Gesamte Zuweisung (€ Milliarden)",
            showlegend=False,
            plot_bgcolor='white',
            paper_bgcolor='white',
            font=dict(family="Inter", size=14),
            margin=dict(l=0, r=0, t=0, b=0)
        )
        
        fig.update_xaxes(tickangle=45)
        st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("---")
        st.markdown("### 📍 Bundesland-Geschichten")
        st.caption("Entdecken Sie die Geschichten hinter jedem Bundesland")
        
        # Show expandable sections for each state with stories
        for state_name, state_data in sorted_states:
            pop = state_data.get("population", 0)
            budget = state_data.get("budget_allocation", 0)
            per_capita = budget / pop if pop > 0 else 0
            top_cat = state_data.get("top_category", "N/A")
            projects = state_data.get("signature_projects", [])
            
            # Generate state story
            if per_capita > avg_per_capita * 1.2:
                state_story = f"{state_name} erhält überdurchschnittlich viel pro Kopf (€{per_capita:,.0f} vs. Ø €{avg_per_capita:,.0f})."
            elif per_capita < avg_per_capita * 0.8:
                state_story = f"{state_name} erhält unterdurchschnittlich viel pro Kopf (€{per_capita:,.0f} vs. Ø €{avg_per_capita:,.0f})."
            else:
                state_story = f"{state_name} liegt nahe am Durchschnitt (€{per_capita:,.0f} pro Kopf)."
            
            with st.expander(f"**{state_name}** • €{budget/1e9:.1f}B • {pop/1e6:.1f}M Einwohner"):
                st.markdown(f"""
                <div style="background: #F0F9FF; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #0EA5E9; margin-bottom: 1rem;">
                    <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0;"><strong>📖 Geschichte:</strong> {state_story}</p>
                </div>
                """, unsafe_allow_html=True)
                
                col_a, col_b = st.columns(2)
                with col_a:
                    st.metric("Pro Kopf", f"€{per_capita:,.0f}", f"Ø €{avg_per_capita:,.0f}")
                    st.write(f"**Schwerpunkt:** {top_cat}")
                    
                    # Compare to average
                    if per_capita > avg_per_capita:
                        st.success(f"💡 {state_name} liegt {((per_capita/avg_per_capita - 1) * 100):.1f}% über dem Durchschnitt")
                    elif per_capita < avg_per_capita:
                        st.info(f"💡 {state_name} liegt {((1 - per_capita/avg_per_capita) * 100):.1f}% unter dem Durchschnitt")
                    
                with col_b:
                    st.metric("Bevölkerung", f"{pop:,.0f}", "")
                    if projects:
                        st.write("**🏗️ Signature-Projekte:**")
                        for project in projects:
                            st.write(f"- {project}")
                    
                    # Economic context
                    if state_name == "Nordrhein-Westfalen":
                        st.caption("💡 Industrielles Herz Deutschlands - Strukturwandel von Kohle zu grüner Industrie")
                    elif state_name == "Bayern":
                        st.caption("💡 Starke Wirtschaft - Innovation und traditionelle Werte")
                    elif state_name == "Berlin":
                        st.caption("💡 Hauptstadt - Kultur, Politik und Wissenschaft")
    
    except Exception as e:
        st.error(f"Error: {e}")

with tab5:
    st.markdown("## 🔬 Deep Dive: Die Details erzählen Geschichten")
    st.caption("Erkunden Sie Unterkategorien und entdecken Sie, wie Budgets tatsächlich verwendet werden")
    
    try:
        params = {"drilldown": "function"}
        r = requests.get(f"{API_BASE}/spending/distribution", params=params, timeout=30)
        r.raise_for_status()
        dist = r.json().get("distribution", {})
        
        sorted_items = sorted(dist.items(), key=lambda x: x[1], reverse=True)
        
        # Category selector
        selected_category = st.selectbox(
            "Kategorie wählen:",
            [cat for cat, _ in sorted_items],
            key="deep_dive_category"
        )
        
        if selected_category:
            selected_amount = dist.get(selected_category, 0)
            
            st.markdown("---")
            st.markdown(f"### 📖 {selected_category}: €{selected_amount/1e9:.2f}B")
            
            # Get story for context
            try:
                story_r = requests.get(f"{API_BASE}/story/{selected_category}", timeout=10)
                if story_r.status_code == 200:
                    story_data = story_r.json()
                    hero_story = story_data.get("hero_story", "")
                    if hero_story:
                        st.info(f"📖 **Kontext:** {hero_story}")
            except:
                pass
            
            # Get breakdown
            try:
                br = requests.get(f"{API_BASE}/spending/breakdown/{selected_category}", timeout=10)
                if br.status_code == 200:
                        breakdown_data = br.json()
                        cells = breakdown_data.get("cells", [])
                    
                        if cells:
                            # Show disclaimer
                            show_data_disclaimer(breakdown_data)
                            
                            df_subs = pd.DataFrame(cells)
                            
                            # Calculate percentages and insights
                            if "amount" in df_subs.columns:
                                total_sub = df_subs["amount"].sum()
                                df_subs["percentage"] = (df_subs["amount"] / total_sub * 100).round(2)
                                df_subs = df_subs.sort_values("amount", ascending=False)
                            
                            # Visualization
                            st.markdown("#### 📊 Verteilung der Unterkategorien")
                            
                            # Find subcategory key
                            subcat_key = "subcategory" if "subcategory" in df_subs.columns else df_subs.columns[0]
                            
                            fig = px.pie(
                            df_subs,
                            values="amount",
                            names=subcat_key,
                                hole=0.4,
                                color_discrete_sequence=px.colors.sequential.Blues,
                                title=f"Wie {selected_category} aufgeteilt wird"
                            )
                        fig.update_traces(
                                textposition='inside',
                                textinfo='percent+label',
                                textfont_size=11
                            )
                        fig.update_layout(
                                height=500,
                                showlegend=True,
                                font=dict(family="Inter", size=14),
                                margin=dict(l=0, r=0, t=30, b=0)
                            )
                        st.plotly_chart(fig, use_container_width=True)
                            
                        st.markdown("---")
                        st.markdown("#### 📋 Detaillierte Aufschlüsselung")
                        
                        # Format dataframe for display
                        display_cols = [subcat_key, "amount"]
                        if "percentage" in df_subs.columns:
                            display_cols.append("percentage")
                        
                        df_display = df_subs[display_cols].copy()
                        df_display["amount"] = df_display["amount"].apply(lambda x: f"€{x/1e9:.2f}B")
                        if "percentage" in df_display.columns:
                            df_display["percentage"] = df_display["percentage"].apply(lambda x: f"{x:.1f}%")
                            
                        df_display.columns = [col.replace("_", " ").title() for col in df_display.columns]
                            
                        st.dataframe(df_display, use_container_width=True, hide_index=True)
                            
                        # Generate insights
                        if len(df_subs) > 1:
                            top_sub = df_subs.iloc[0]
                            top_sub_pct = df_subs.iloc[0]["percentage"] if "percentage" in df_subs.columns else (top_sub["amount"] / total_sub * 100)
                            
                            if top_sub_pct > 50:
                                st.warning(f"⚠️ **Konzentration:** {top_sub[subcat_key]} macht {top_sub_pct:.1f}% des gesamten {selected_category} Budgets aus. Das ist eine hohe Konzentration.")
                            elif top_sub_pct > 30:
                                st.info(f"💡 **Hauptfokus:** {top_sub[subcat_key]} ist mit {top_sub_pct:.1f}% die größte Unterkategorie.")
                            
                            # Story about distribution
                            top3_subs = df_subs.head(3)
                            top3_total_pct = top3_subs["percentage"].sum() if "percentage" in top3_subs.columns else (top3_subs["amount"].sum() / total_sub * 100)
                            
                            if top3_total_pct > 80:
                                st.markdown(f"""
                                    <div style="background: #FEF3C7; padding: 1rem; border-radius: 8px; border-left: 4px solid #F59E0B; margin-top: 1rem;">
                            <p style="margin: 0; color: #92400E;"><strong>📖 Geschichte:</strong> Die Top 3 Unterkategorien machen {top3_total_pct:.1f}% des Budgets aus. 
                                        Das zeigt einen klaren Schwerpunkt, aber auch mögliche Diversifizierungsmöglichkeiten.</p>
                                    </div>
                                    """, unsafe_allow_html=True)
                        else:
                            st.dataframe(df_subs, use_container_width=True, hide_index=True)
                else:
                    st.info("⚠️ Detaillierte Aufschlüsselung nicht verfügbar für diese Kategorie")
            except Exception as e:
                st.warning(f"Fehler beim Laden der Details: {e}")
    
    except Exception as e:
        st.error(f"Error: {e}")

with tab6:
    # APPLE-LEVEL "STORIES TO SHARE" SECTION
    # Premium design with generous spacing and compelling narratives
    
    st.markdown("""
    <div style="margin-bottom: 96px;">
        <h1 style="font-size: clamp(56px, 8vw, 96px); font-weight: 900; letter-spacing: -6px; line-height: 1.05; color: #1D1D1F; margin-bottom: 24px; text-align: center;">
            Stories to Share
        </h1>
        <p style="font-size: clamp(20px, 3vw, 28px); font-weight: 400; color: #636366; line-height: 1.6; text-align: center; max-width: 800px; margin: 0 auto;">
            Every euro has a story. Every number connects to real people. 
            Discover the four stories that define Germany's budget priorities.
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    try:
        # Get data for stories
        params = {"drilldown": drilldown}
        r = requests.get(f"{API_BASE}/spending/distribution", params=params, timeout=30)
        r.raise_for_status()
        dist = r.json().get("distribution", {})
        pcts = r.json().get("percentages", {})
        
        # Get trends data for Story 2
        trends_data = None
        try:
            trends_r = requests.get(f"{API_BASE}/trends", timeout=10)
            if trends_r.status_code == 200:
                trends_data = trends_r.json()
        except:
            pass
        
        total_budget = sum(dist.values())
        population = 83_200_000  # Germany population
        per_citizen = total_budget / population
        
        # ============================================
        # STORY 1: THE GENERATIONAL TRANSFER (Social Security)
        # ============================================
        social_sec_amount = dist.get("Social Security", 154_200_000_000)
        social_sec_pct = pcts.get("Social Security", 44.5)
        social_sec_per_person = social_sec_amount / population
        social_sec_per_day = social_sec_per_person / 365
        
        st.markdown(f"""
        <div style="margin-bottom: 96px; animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="background: linear-gradient(135deg, rgba(45, 134, 89, 0.08) 0%, rgba(52, 211, 153, 0.08) 100%); 
                        backdrop-filter: blur(40px); border-radius: 32px; padding: 80px 64px; 
                        border: 1px solid rgba(45, 134, 89, 0.15); box-shadow: 0 20px 60px rgba(45, 134, 89, 0.1);
                        position: relative; overflow: hidden;">
                
                <!-- Background decorative elements -->
                <div style="position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; 
                            background: radial-gradient(circle, rgba(45, 134, 89, 0.1) 0%, transparent 70%); 
                            border-radius: 50%; pointer-events: none;"></div>
                
                <div style="position: relative; z-index: 1;">
                    <!-- Story Header -->
                    <div style="margin-bottom: 48px;">
                        <div style="display: inline-block; background: rgba(45, 134, 89, 0.15); 
                                    color: #2D8659; padding: 8px 20px; border-radius: 20px; 
                                    font-size: 14px; font-weight: 700; letter-spacing: 0.5px; 
                                    text-transform: uppercase; margin-bottom: 24px;">
                            Story 1
                        </div>
                        <h2 style="font-size: clamp(42px, 6vw, 64px); font-weight: 900; letter-spacing: -3px; 
                                   line-height: 1.05; color: #1D1D1F; margin-bottom: 24px;">
                            The Generational Transfer
                        </h2>
                        <p style="font-size: 24px; font-weight: 600; color: #636366; line-height: 1.4;">
                            44.5% of YOUR tax money goes to social welfare
                        </p>
                    </div>
                    
                    <!-- Key Metrics Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                                gap: 32px; margin-bottom: 64px;">
                        <div style="background: white; padding: 40px; border-radius: 24px; 
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                            <div style="font-size: 48px; font-weight: 900; color: #2D8659; margin-bottom: 8px;">
                                €{social_sec_amount/1e9:.1f}B
                            </div>
                            <div style="font-size: 14px; color: #8E8E93; font-weight: 600; text-transform: uppercase; 
                                       letter-spacing: 1px;">Total Spending</div>
                            <div style="font-size: 18px; color: #636366; margin-top: 12px;">
                                {social_sec_pct:.1f}% of federal budget
                            </div>
                        </div>
                        
                        <div style="background: white; padding: 40px; border-radius: 24px; 
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                            <div style="font-size: 48px; font-weight: 900; color: #2D8659; margin-bottom: 8px;">
                                €{social_sec_per_person:,.0f}
                            </div>
                            <div style="font-size: 14px; color: #8E8E93; font-weight: 600; text-transform: uppercase; 
                                       letter-spacing: 1px;">Per Person, Per Year</div>
                            <div style="font-size: 18px; color: #636366; margin-top: 12px;">
                                €{social_sec_per_day:.2f} every single day
                            </div>
                        </div>
                        
                        <div style="background: white; padding: 40px; border-radius: 24px; 
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                            <div style="font-size: 48px; font-weight: 900; color: #2D8659; margin-bottom: 8px;">
                                17.4M
                            </div>
                            <div style="font-size: 14px; color: #8E8E93; font-weight: 600; text-transform: uppercase; 
                                       letter-spacing: 1px;">Germans Served</div>
                            <div style="font-size: 18px; color: #636366; margin-top: 12px;">
                                Pensions, unemployment, families
                            </div>
                        </div>
                    </div>
                    
                    <!-- Narrative -->
                    <div style="background: white; padding: 48px; border-radius: 24px; margin-bottom: 48px; 
                                box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                        <p style="font-size: 20px; line-height: 1.8; color: #1D1D1F; margin-bottom: 24px;">
                            Social Security isn't just a budget line—it's a promise. Every day, you contribute 
                            <strong>€{social_sec_per_day:.2f}</strong> from your pocket to support 17.4 million Germans: 
                            pensioners, the unemployed, families, and those in need.
                        </p>
                        <p style="font-size: 20px; line-height: 1.8; color: #636366;">
                            This represents the largest single allocation in Germany's federal budget—nearly half 
                            of every euro collected. It's a generational transfer that reflects Germany's commitment 
                            to social welfare, but it raises fundamental questions about sustainability and priorities.
                        </p>
                    </div>
                    
                    <!-- Discussion Question -->
                    <div style="background: linear-gradient(135deg, #2D8659 0%, #34D399 100%); 
                                padding: 40px; border-radius: 24px; color: white; text-align: center;">
                        <p style="font-size: 24px; font-weight: 700; margin: 0; line-height: 1.4;">
                            🤔 Is 44% too much, or just right for a welfare state?
                        </p>
                    </div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # ============================================
        # STORY 2: THE UKRAINE RESPONSE (Defense Surge)
        # ============================================
        defense_amount = dist.get("Defense", 52_100_000_000)
        defense_pct = pcts.get("Defense", 15.0)
        defense_2018 = 37_900_000_000
        defense_growth = ((defense_amount - defense_2018) / defense_2018) * 100
        defense_per_person = defense_amount / population
        defense_per_day = defense_per_person / 365
        
        st.markdown(f"""
        <div style="margin-bottom: 96px; animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;">
            <div style="background: linear-gradient(135deg, rgba(255, 149, 0, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%); 
                        backdrop-filter: blur(40px); border-radius: 32px; padding: 80px 64px; 
                        border: 1px solid rgba(255, 149, 0, 0.15); box-shadow: 0 20px 60px rgba(255, 149, 0, 0.1);
                        position: relative; overflow: hidden;">
                
                <div style="position: absolute; top: -100px; left: -100px; width: 400px; height: 400px; 
                            background: radial-gradient(circle, rgba(255, 149, 0, 0.1) 0%, transparent 70%); 
                            border-radius: 50%; pointer-events: none;"></div>
                
                <div style="position: relative; z-index: 1;">
                    <div style="margin-bottom: 48px;">
                        <div style="display: inline-block; background: rgba(255, 149, 0, 0.15); 
                                    color: #D97706; padding: 8px 20px; border-radius: 20px; 
                                    font-size: 14px; font-weight: 700; letter-spacing: 0.5px; 
                                    text-transform: uppercase; margin-bottom: 24px;">
                            Story 2
                        </div>
                        <h2 style="font-size: clamp(42px, 6vw, 64px); font-weight: 900; letter-spacing: -3px; 
                                   line-height: 1.05; color: #1D1D1F; margin-bottom: 24px;">
                            The Ukraine Response
                        </h2>
                        <p style="font-size: 24px; font-weight: 600; color: #636366; line-height: 1.4;">
                            Defense spending exploded +{defense_growth:.1f}% since 2018
                        </p>
                    </div>
                    
                    <!-- Timeline Comparison -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 64px;">
                        <div style="background: white; padding: 48px; border-radius: 24px; 
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center;">
                            <div style="font-size: 20px; color: #8E8E93; margin-bottom: 16px; font-weight: 600;">
                                2018
                            </div>
                            <div style="font-size: 56px; font-weight: 900; color: #636366; margin-bottom: 8px;">
                                €{defense_2018/1e9:.1f}B
                            </div>
                            <div style="font-size: 16px; color: #8E8E93;">Before Ukraine</div>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #FF9500 0%, #FBBF24 100%); 
                                    padding: 48px; border-radius: 24px; box-shadow: 0 8px 32px rgba(255, 149, 0, 0.3); 
                                    text-align: center; color: white;">
                            <div style="font-size: 20px; margin-bottom: 16px; font-weight: 600; opacity: 0.9;">
                                2024
                            </div>
                            <div style="font-size: 56px; font-weight: 900; margin-bottom: 8px;">
                                €{defense_amount/1e9:.1f}B
                            </div>
                            <div style="font-size: 16px; opacity: 0.9;">After Ukraine</div>
                            <div style="margin-top: 24px; padding: 12px 24px; background: rgba(255,255,255,0.2); 
                                        border-radius: 16px; font-size: 24px; font-weight: 700;">
                                +{defense_growth:.1f}%
                            </div>
                        </div>
                    </div>
                    
                    <!-- Key Facts -->
                    <div style="background: white; padding: 48px; border-radius: 24px; margin-bottom: 48px; 
                                box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                        <p style="font-size: 20px; line-height: 1.8; color: #1D1D1F; margin-bottom: 24px;">
                            The Russian invasion of Ukraine in 2022 fundamentally changed Germany's defense posture. 
                            What was once €{defense_2018/1e9:.1f}B in 2018 is now <strong>€{defense_amount/1e9:.1f}B</strong>—a 
                            <strong>{defense_growth:.1f}% increase</strong> driven by NATO commitments and Ukraine support.
                        </p>
                        <p style="font-size: 20px; line-height: 1.8; color: #636366;">
                            Every German now contributes <strong>€{defense_per_day:.2f} per day</strong> to defense—nearly 
                            €{defense_per_person:,.0f} per year. This surge represents the most dramatic shift in German 
                            budget priorities since reunification.
                        </p>
                    </div>
                    
                    <!-- Discussion Question -->
                    <div style="background: linear-gradient(135deg, #FF9500 0%, #FBBF24 100%); 
                                padding: 40px; border-radius: 24px; color: white; text-align: center;">
                        <p style="font-size: 24px; font-weight: 700; margin: 0; line-height: 1.4;">
                            🤔 Was this necessary, or an overreaction?
                        </p>
                    </div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # ============================================
        # STORY 3: BETTING ON THE FUTURE (Education)
        # ============================================
        education_amount = dist.get("Education & Research", 20_700_000_000)
        education_pct = pcts.get("Education & Research", 6.0)
        education_per_person = education_amount / population
        students_served = 14_200_000
                
        st.markdown(f"""
        <div style="margin-bottom: 96px; animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;">
            <div style="background: linear-gradient(135deg, rgba(79, 172, 254, 0.08) 0%, rgba(0, 242, 254, 0.08) 100%); 
                        backdrop-filter: blur(40px); border-radius: 32px; padding: 80px 64px; 
                        border: 1px solid rgba(79, 172, 254, 0.15); box-shadow: 0 20px 60px rgba(79, 172, 254, 0.1);
                        position: relative; overflow: hidden;">
                
                <div style="position: absolute; bottom: -100px; right: -100px; width: 400px; height: 400px; 
                            background: radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%); 
                            border-radius: 50%; pointer-events: none;"></div>
                
                <div style="position: relative; z-index: 1;">
                    <div style="margin-bottom: 48px;">
                        <div style="display: inline-block; background: rgba(79, 172, 254, 0.15); 
                                    color: #2563EB; padding: 8px 20px; border-radius: 20px; 
                                    font-size: 14px; font-weight: 700; letter-spacing: 0.5px; 
                                    text-transform: uppercase; margin-bottom: 24px;">
                            Story 3
                        </div>
                        <h2 style="font-size: clamp(42px, 6vw, 64px); font-weight: 900; letter-spacing: -3px; 
                                   line-height: 1.05; color: #1D1D1F; margin-bottom: 24px;">
                            Betting on the Future
                        </h2>
                        <p style="font-size: 24px; font-weight: 600; color: #636366; line-height: 1.4;">
                            Every German pays €{education_per_person:,.0f}/year for {students_served/1e6:.1f}M students
                        </p>
                    </div>
                    
                    <!-- Impact Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                                gap: 32px; margin-bottom: 64px;">
                        <div style="background: white; padding: 40px; border-radius: 24px; 
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center;">
                            <div style="font-size: 48px; font-weight: 900; color: #2563EB; margin-bottom: 8px;">
                                €{education_per_person:,.0f}
    </div>
                            <div style="font-size: 14px; color: #8E8E93; font-weight: 600; text-transform: uppercase; 
                                       letter-spacing: 1px;">Your Annual Investment</div>
                            <div style="font-size: 18px; color: #636366; margin-top: 12px;">
                                Per citizen, per year
                            </div>
                        </div>
                        
                        <div style="background: white; padding: 40px; border-radius: 24px; 
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center;">
                            <div style="font-size: 48px; font-weight: 900; color: #2563EB; margin-bottom: 8px;">
                                {students_served/1e6:.1f}M
                            </div>
                            <div style="font-size: 14px; color: #8E8E93; font-weight: 600; text-transform: uppercase; 
                                       letter-spacing: 1px;">Students Funded</div>
                            <div style="font-size: 18px; color: #636366; margin-top: 12px;">
                                Schools, universities, research
                            </div>
                        </div>
                        
                        <div style="background: white; padding: 40px; border-radius: 24px; 
                                    box-shadow: 0 4px 20px rgba(0,0,0,0.06); text-align: center;">
                            <div style="font-size: 48px; font-weight: 900; color: #2563EB; margin-bottom: 8px;">
                                {education_pct:.1f}%
                            </div>
                            <div style="font-size: 14px; color: #8E8E93; font-weight: 600; text-transform: uppercase; 
                                       letter-spacing: 1px;">Of Federal Budget</div>
                            <div style="font-size: 18px; color: #636366; margin-top: 12px;">
                                Below OECD average (6% vs 9%)
                            </div>
                        </div>
                    </div>
                    
                    <!-- Narrative -->
                    <div style="background: white; padding: 48px; border-radius: 24px; margin-bottom: 48px; 
                                box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                        <p style="font-size: 20px; line-height: 1.8; color: #1D1D1F; margin-bottom: 24px;">
                            Education is an investment in Germany's future. Your <strong>€{education_per_person:,.0f} per year</strong> 
                            funds {students_served/1e6:.1f} million students—from kindergarten to university—and supports the research 
                            that keeps Germany competitive.
                        </p>
                        <p style="font-size: 20px; line-height: 1.8; color: #636366;">
                            Yet Germany spends 6% of its federal budget on education, below the OECD average of 9%. 
                            In an era of technological disruption, this raises questions: Are we investing enough 
                            in the next generation? Is Germany's competitive edge at risk?
                        </p>
                    </div>
                    
                    <!-- Discussion Question -->
                    <div style="background: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%); 
                                padding: 40px; border-radius: 24px; color: white; text-align: center;">
                        <p style="font-size: 24px; font-weight: 700; margin: 0; line-height: 1.4;">
                            🤔 Should we invest MORE in education?
                        </p>
                    </div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # ============================================
        # STORY 4: THE REAL TALK (Personal Contribution)
        # ============================================
        personal_per_day = per_citizen / 365
        personal_per_hour = personal_per_day / 24
        
        st.markdown(f"""
        <div style="margin-bottom: 96px; animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;">
            <div style="background: linear-gradient(135deg, rgba(240, 147, 251, 0.08) 0%, rgba(245, 87, 108, 0.08) 100%); 
                        backdrop-filter: blur(40px); border-radius: 32px; padding: 80px 64px; 
                        border: 1px solid rgba(240, 147, 251, 0.15); box-shadow: 0 20px 60px rgba(240, 147, 251, 0.1);
                        position: relative; overflow: hidden;">
                
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                            width: 500px; height: 500px; background: radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%); 
                            border-radius: 50%; pointer-events: none;"></div>
                
                <div style="position: relative; z-index: 1;">
                    <div style="margin-bottom: 48px;">
                        <div style="display: inline-block; background: rgba(240, 147, 251, 0.15); 
                                    color: #C026D3; padding: 8px 20px; border-radius: 20px; 
                                    font-size: 14px; font-weight: 700; letter-spacing: 0.5px; 
                                    text-transform: uppercase; margin-bottom: 24px;">
                            Story 4
                        </div>
                        <h2 style="font-size: clamp(42px, 6vw, 64px); font-weight: 900; letter-spacing: -3px; 
                                   line-height: 1.05; color: #1D1D1F; margin-bottom: 24px;">
                            The Real Talk
                        </h2>
                        <p style="font-size: 24px; font-weight: 600; color: #636366; line-height: 1.4;">
                            What YOUR money actually buys
                        </p>
                    </div>
                    
                    <!-- Personal Contribution Cards -->
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 64px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                    padding: 48px; border-radius: 24px; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3); 
                                    text-align: center; color: white;">
                            <div style="font-size: 64px; font-weight: 900; margin-bottom: 16px; line-height: 1;">
                                €{per_citizen:,.0f}
                            </div>
                            <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px; opacity: 0.9;">
                                Per Year
                            </div>
                            <div style="font-size: 16px; opacity: 0.8;">
                                = 2 iPhones
                            </div>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
                                    padding: 48px; border-radius: 24px; box-shadow: 0 8px 32px rgba(240, 147, 251, 0.3); 
                                    text-align: center; color: white;">
                            <div style="font-size: 64px; font-weight: 900; margin-bottom: 16px; line-height: 1;">
                                €{personal_per_day:.2f}
                            </div>
                            <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px; opacity: 0.9;">
                                Per Day
                            </div>
                            <div style="font-size: 16px; opacity: 0.8;">
                                = 3 Netflix subscriptions
                            </div>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); 
                                    padding: 48px; border-radius: 24px; box-shadow: 0 8px 32px rgba(79, 172, 254, 0.3); 
                                    text-align: center; color: white;">
                            <div style="font-size: 64px; font-weight: 900; margin-bottom: 16px; line-height: 1;">
                                €{personal_per_hour:.2f}
                            </div>
                            <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px; opacity: 0.9;">
                                Per Hour
                            </div>
                            <div style="font-size: 16px; opacity: 0.8;">
                                = 1 coffee
                            </div>
                        </div>
                    </div>
                    
                    <!-- Narrative -->
                    <div style="background: white; padding: 48px; border-radius: 24px; margin-bottom: 48px; 
                                box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
                        <p style="font-size: 20px; line-height: 1.8; color: #1D1D1F; margin-bottom: 24px;">
                            The German federal budget isn't abstract billions—it's <strong>€{per_citizen:,.0f} from YOUR pocket every year</strong>. 
                            That's <strong>€{personal_per_day:.2f} per day</strong>, <strong>€{personal_per_hour:.2f} per hour</strong>, 
                            even while you sleep.
                        </p>
                        <p style="font-size: 20px; line-height: 1.8; color: #636366;">
                            This is YOUR money funding 17.4 million people's pensions, 14.2 million students' education, 
                            and 184,000 soldiers' service. Every decision about where this money goes is a decision about 
                            YOUR priorities, YOUR values, YOUR democracy.
                        </p>
                    </div>
                    
                    <!-- Discussion Question -->
                    <div style="background: linear-gradient(135deg, #F093FB 0%, #F5576C 100%); 
                                padding: 40px; border-radius: 24px; color: white; text-align: center;">
                        <p style="font-size: 24px; font-weight: 700; margin: 0; line-height: 1.4;">
                            🤔 Is €{per_citizen:,.0f} per year worth it?
                        </p>
                    </div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # Final call to action
        st.markdown("""
        <div style="text-align: center; margin-top: 96px; padding: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    border-radius: 32px; color: white;">
            <h2 style="font-size: clamp(36px, 5vw, 56px); font-weight: 900; letter-spacing: -3px; 
                       line-height: 1.05; margin-bottom: 24px; color: white;">
                Every euro has a story.
            </h2>
            <p style="font-size: 20px; line-height: 1.6; opacity: 0.95; max-width: 600px; margin: 0 auto 32px;">
                These four stories define Germany's budget priorities. But they're just the beginning. 
                Explore the data, ask questions, and join the conversation about YOUR democracy.
            </p>
            <p style="font-size: 18px; opacity: 0.9; font-weight: 600;">
                This is YOUR money. This is YOUR democracy. Let's talk about it.
            </p>
        </div>
        """, unsafe_allow_html=True)
        
    except Exception as e:
        st.error(f"Error: {e}")

with tab7:
    st.markdown("## 📚 Bildungsmaterial für Lehrer")
    st.caption("Fertige Unterrichtsmaterialien zum deutschen Bundeshaushalt")
    
    # Introduction
    st.markdown("""
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); padding: 2rem; border-radius: 16px; margin-bottom: 2rem; border-left: 4px solid #6366f1;">
        <h3 style="margin-top: 0; color: #1e293b;">Für den Unterricht vorbereitet</h3>
        <p style="color: #475569; margin-bottom: 0;">
            Diese Materialien helfen Ihnen, Schülern den deutschen Bundeshaushalt verständlich zu erklären. 
            Alle Materialien sind sofort einsatzbereit und DSGVO-konform.
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Download sections
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 📊 Daten für Schülerprojekte")
        st.markdown("Laden Sie aktuelle Budgetdaten herunter für Analyse-Aufgaben und Präsentationen.")
        
        export_type = st.radio(
            "Datenquelle wählen:",
            ["Gesamtbudget 2024", "Bundesländer-Vergleich", "Trends 2018-2024"],
            label_visibility="collapsed"
        )
        
        if export_type == "Gesamtbudget 2024":
            csv_url = f"{API_BASE}/export/spending/csv"
            excel_url = f"{API_BASE}/export/spending/excel"
            filename_csv = "bundeshaushalt_2024.csv"
            filename_excel = "bundeshaushalt_2024.xlsx"
        elif export_type == "Bundesländer-Vergleich":
            csv_url = f"{API_BASE}/export/bundeslaender/csv"
            excel_url = None
            filename_csv = "bundeslaender.csv"
        else:  # Trends
            csv_url = f"{API_BASE}/export/trends/csv"
            excel_url = None
            filename_csv = "trends_2018-2024.csv"
        
        button_col1, button_col2 = st.columns(2)
        with button_col1:
            st.markdown(f'<a href="{csv_url}" download="{filename_csv}"><button style="width: 100%; padding: 0.75rem; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">📥 CSV herunterladen</button></a>', unsafe_allow_html=True)
        
        if excel_url:
            with button_col2:
                st.markdown(f'<a href="{excel_url}" download="{filename_excel}"><button style="width: 100%; padding: 0.75rem; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">📊 Excel herunterladen</button></a>', unsafe_allow_html=True)
    
    with col2:
        st.markdown("### 📚 Unterrichtseinheiten")
        st.markdown("Komplette Materialien für verschiedene Klassenstufen.")
        
        st.info("📌 Unterrichtsmaterialien werden in Kürze verfügbar sein!")
        
        # Placeholder for future materials
        st.markdown("""
        <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 2px dashed #d1d5db;">
            <p style="color: #6b7280; margin: 0; text-align: center;">
                <strong>Kommende Inhalte:</strong><br><br>
                🎓 Klasse 8-10: Bundeshaushalt leicht erklärt<br>
                🎓 Klasse 11-13: Budgetanalyse & kritische Fragen<br>
                📝 Quiz: Teste dein Wissen<br>
                📊 Infografiken zum Ausdrucken
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("---")
    
    # Educational insights
    st.markdown("### 💡 Verwendung im Unterricht")
    
    insights = [
        {
            "topic": "📊 Datenanalyse",
            "content": "Schüler können Budgetdaten in Excel öffnen, sortieren und eigene Visualisierungen erstellen."
        },
        {
            "topic": "🗺️ Geografie & Politik",
            "content": "Bundesländer-Vergleiche zeigen regionale Unterschiede und föderale Strukturen."
        },
        {
            "topic": "📈 Mathematik",
            "content": "Prozentrechnung, Durchschnitte und Trends bieten echte Übungsaufgaben."
        },
        {
            "topic": "🏛️ Demokratiebildung",
            "content": "Verständnis für öffentliche Finanzen stärkt demokratisches Bewusstsein."
        }
    ]
    
    for insight in insights:
        col_a, col_b = st.columns([0.2, 0.8])
        with col_a:
            st.markdown(f"## {insight['topic']}")
        with col_b:
            st.markdown(insight['content'])
    
    st.markdown("---")
    
    # Contact section
    st.markdown("### 🤝 Feedback & Anfragen")
    st.markdown("""
    Haben Sie Anregungen für neue Materialien oder Fragen zur Verwendung? 
    Wir freuen uns über Ihr Feedback!
    
    📧 Email: bildung@example.org | 
    🌐 [GitHub Issues](https://github.com/public-money-mirror/issues)
    """)

with tab8:
    st.markdown("## 🎭 Lobby & Einfluss: Wer hat Zugang zur Macht?")
    st.caption("Entdecken Sie, welche Interessengruppen Einfluss auf Budgetentscheidungen haben")
    
    st.error("🎭 **MOCK DATA**: This section contains illustrative example data. For real lobby information, visit [Lobbyregister-Bundestag.de](https://www.lobbyregister-bundestag.de)")
    
    try:
        sorted_lobbyists = sorted(
            LOBBYIST_DATA.items(),
            key=lambda x: x[1]["influence_score"],
            reverse=True
        )
        
        # Story about lobbying
        st.markdown("""
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 2rem; border-radius: 16px; border-left: 4px solid #f59e0b; margin-bottom: 2rem;">
            <h3 style="color: #92400E; margin-top: 0; font-size: 22px;">📖 Die Geschichte des Lobbyismus</h3>
            <p style="font-size: 17px; line-height: 1.8; color: #78350F; margin: 0;">
                Lobbyismus ist legitim - Interessengruppen haben das Recht, ihre Positionen zu vertreten. 
                Aber <strong>Transparenz ist entscheidend:</strong> Bürger sollten wissen, wer Einfluss auf Budgetentscheidungen hat. 
                Dieser Überblick zeigt, welche Gruppen am aktivsten sind.
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        st.warning("⚠️ Diese Beispiele zeigen, wie Lobbyregister-Daten aussehen würden. Tatsächlicher Einfluss kann variieren.")
        
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            st.markdown('<div class="metric-label">🏆 Höchster Einfluss</div>', unsafe_allow_html=True)
            top_influence = sorted_lobbyists[0][1]["influence_score"]
            st.markdown(f'<div class="metric-value">{top_influence}</div>', unsafe_allow_html=True)
            st.caption(f"{sorted_lobbyists[0][0]}")
            if top_influence > 90:
                st.caption("🔴 Sehr hoch")
            st.markdown('</div>', unsafe_allow_html=True)
        
        with col2:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            st.markdown('<div class="metric-label">📊 Gruppen gesamt</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="metric-value">{len(LOBBYIST_DATA)}</div>', unsafe_allow_html=True)
            st.caption("Registrierte Gruppen")
            st.markdown('</div>', unsafe_allow_html=True)
        
        with col3:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            total_events = sum(d["registered_events"] for d in LOBBYIST_DATA.values())
            st.markdown('<div class="metric-label">📅 Veranstaltungen</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="metric-value">{total_events}</div>', unsafe_allow_html=True)
            st.caption(f"Ø {total_events//len(LOBBYIST_DATA)} pro Gruppe")
            st.markdown('</div>', unsafe_allow_html=True)
        
        with col4:
            st.markdown('<div class="stat-card">', unsafe_allow_html=True)
            avg_score = sum(d["influence_score"] for d in LOBBYIST_DATA.values()) / len(LOBBYIST_DATA)
            st.markdown('<div class="metric-label">📈 Ø Einfluss</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="metric-value">{avg_score:.0f}</div>', unsafe_allow_html=True)
            st.caption("Durchschnitt")
            st.markdown('</div>', unsafe_allow_html=True)
        
        st.markdown("---")
        st.markdown("### 🔍 Investigative Analyse: Wer beeinflusst was?")
        
        # Analyze by category
        category_lobbyists = {}
        for name, data in LOBBYIST_DATA.items():
            cat = data.get("spending_category", "Unknown")
            if cat not in category_lobbyists:
                category_lobbyists[cat] = []
            category_lobbyists[cat].append((name, data))
        
        # Get budget data for context
        try:
            params = {"drilldown": "function"}
            r = requests.get(f"{API_BASE}/spending/distribution", params=params, timeout=10)
            if r.status_code == 200:
                budget_dist = r.json().get("distribution", {})
                
                for cat, lobby_groups in category_lobbyists.items():
                    budget_amount = budget_dist.get(cat, 0)
                    avg_influence = sum(d[1]["influence_score"] for d in lobby_groups) / len(lobby_groups) if lobby_groups else 0
                    
                    if avg_influence > 85:
                        st.warning(f"🔴 **{cat}** (€{budget_amount/1e9:.2f}B): Hohe Lobby-Aktivität (Ø {avg_influence:.0f}/100) - {len(lobby_groups)} aktive Gruppen")
                    elif avg_influence > 75:
                        st.info(f"🟡 **{cat}** (€{budget_amount/1e9:.2f}B): Moderate Lobby-Aktivität (Ø {avg_influence:.0f}/100) - {len(lobby_groups)} Gruppen")
        except:
            pass
        
        st.markdown("---")
        st.markdown("### 📋 Detailierte Gruppen-Analyse")
        
        for name, data in sorted_lobbyists:
            influence_score = data['influence_score']
            
            # Color based on influence
            if influence_score > 90:
                color = "#EF4444"
                severity = "🔴 Sehr hoch"
            elif influence_score > 80:
                color = "#F59E0B"
                severity = "🟡 Hoch"
            else:
                color = "#3B82F6"
                severity = "🔵 Moderate"
            
            with st.expander(f"**{name}** • Einfluss: {influence_score}/100 • {severity}"):
                st.markdown(f"""
                <div style="background: {color}15; padding: 1rem; border-radius: 8px; border-left: 4px solid {color}; margin-bottom: 1rem;">
                    <p style="margin: 0; color: #111827; line-height: 1.6;">
                        <strong>📖 Geschichte:</strong> {name} ist in der Kategorie "{data['spending_category']}" aktiv. 
                        Mit {data['registered_events']} registrierten Veranstaltungen und {data['reg_members']} Mitgliedern 
                        zeigt diese Gruppe eine {severity.lower()} Aktivität im Lobbyregister.
                    </p>
                </div>
                """, unsafe_allow_html=True)
                
                col_a, col_b = st.columns(2)
                with col_a:
                    st.metric("Einfluss-Score", f"{influence_score}/100", "")
                    st.metric("Registrierte Mitglieder", f"{data['reg_members']}", "")
                    st.write(f"**Kategorie:** {data['spending_category']}")
                with col_b:
                    st.metric("Registrierte Veranstaltungen", f"{data['registered_events']}", "")
                    st.write("**🔗 Verbindungen:**")
                    for conn in data['connections']:
                        st.write(f"- {conn}")
                
                # Investigative note
                if influence_score > 90:
                    st.warning("⚠️ **Investigative Note:** Sehr hohe Aktivität könnte auf intensive Lobby-Arbeit hinweisen. Prüfe öffentliche Berichte über diese Gruppe.")
        
        st.markdown("---")
        
        # Call to action
        st.markdown("""
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 16px; color: white; margin-top: 2rem;">
            <h4 style="color: white; margin-top: 0;">💡 Transparenz ist entscheidend</h4>
            <p style="color: white; line-height: 1.8; margin-bottom: 0;">
                Lobbyismus ist Teil der Demokratie, aber <strong>Transparenz ist entscheidend</strong>. 
                Frage dich: Wer hat Zugang zu Entscheidungsträgern? Sind alle Interessen gleich vertreten?
                Nutze das <a href="https://www.lobbyregister-bundestag.de" style="color: #FFD700; font-weight: bold;">offizielle Lobbyregister</a> für echte Daten.
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    except Exception as e:
        st.error(f"Error: {e}")

with tab9:
    st.markdown("## 🔍 Watch List: Tiefe Analyse & Verdächtige Aktivitäten")
    st.caption("Umfassende Data Detective Analyse - Muster, Risiken und Verschwendung identifizieren")
    
    st.info("🎭 **DEMONSTRATION DATA**: This section uses illustrative patterns. For official audit reports, visit [BRH.de](https://www.bundesrechnungshof.de)")
    
    try:
        # Fetch comprehensive watchlist
        r = requests.get(f"{API_BASE}/detective/watchlist", timeout=30)
        r.raise_for_status()
        watchlist_data = r.json()
        
        # Hero section
        st.markdown("""
        <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 2rem; border-radius: 16px; border-left: 4px solid #ef4444; margin-bottom: 2rem;">
            <h3 style="color: #991B1B; margin-top: 0; font-size: 22px;">📖 Deep Data Detective: Die Geschichte der Verschwendung</h3>
            <p style="font-size: 17px; line-height: 1.8; color: #7F1D1D; margin: 0;">
                <strong>Jeder verschwendete Euro ist ein gestohlener Euro</strong> von den Bürgern. 
                Diese Watch List verwendet fortgeschrittene Pattern-Erkennung, um verdächtige Muster zu identifizieren:
                Kostenüberschreitungen, Lieferantenkonzentration, rapide Änderungen, Effizienzprobleme.
                <strong>Transparenz ist der erste Schritt zur Rechenschaftspflicht.</strong>
        </p>
        </div>
        """, unsafe_allow_html=True)
        
        # Summary metrics
        summary = watchlist_data.get("summary", {})
        col1, col2, col3, col4, col5 = st.columns(5)
    
        with col1:
            st.metric("🔴 Anomalien", watchlist_data.get("total_anomalies", 0))
            st.caption("Insgesamt gefunden")
    
        with col2:
            st.metric("⚠️ Hoch", watchlist_data.get("high_severity_count", 0))
            st.caption("Schwere Anomalien")
    
        with col3:
            st.metric("⚠️ Mittel", watchlist_data.get("medium_severity_count", 0))
            st.caption("Mittelschwere")
    
        with col4:
            st.metric("🔴 Kritisch", summary.get("critical_issues", 0))
            st.caption("Kritische Risiken")
        
        with col5:
            st.metric("📋 Review", summary.get("requires_investigation", 0))
            st.caption("Benötigen Prüfung")
    
        st.markdown("---")
    
        # Risk Scores Section
        st.markdown("### 🎯 Risiko-Scores: Top Risiko-Kategorien")
        st.markdown("*Berechnet anhand von Anomalien, Mustern, Trends und Benchmarks*")
        
        risk_scores = watchlist_data.get("risk_scores", {})
        high_risk = watchlist_data.get("high_risk_categories", [])
        
        if high_risk:
            # Create risk score visualization
            risk_df = pd.DataFrame([{
                "category": r["category"],
                "risk_score": r["risk_score"],
                "risk_level": r["risk_level"],
                "anomaly_count": r.get("anomaly_count", 0)
            } for r in high_risk[:10]])
            
            # Color mapping
            colors = []
            for level in risk_df["risk_level"]:
                if level == "critical":
                    colors.append("#DC2626")
                elif level == "high":
                    colors.append("#F59E0B")
                elif level == "medium":
                    colors.append("#FBBF24")
                else:
                    colors.append("#84CC16")
            
            fig = px.bar(
                risk_df,
                x="risk_score",
                y="category",
                orientation="h",
                color="risk_level",
                color_discrete_map={
                    "critical": "#DC2626",
                    "high": "#F59E0B",
                    "medium": "#FBBF24",
                    "low": "#84CC16"
                },
                labels={"risk_score": "Risiko-Score", "category": "Kategorie"},
                title="Risiko-Scores nach Kategorie (Top 10)"
            )
            fig.update_layout(
                height=500,
                showlegend=True,
                font=dict(family="Inter", size=14),
                plot_bgcolor="white",
                yaxis={"categoryorder": "total ascending"}
            )
            st.plotly_chart(fig, use_container_width=True)
            
            # Show detailed risk breakdown
            with st.expander("🔍 Detaillierte Risiko-Analyse anzeigen", expanded=False):
                for risk in high_risk[:5]:
                    risk_level_colors = {
                        "critical": "#DC2626",
                        "high": "#F59E0B",
                        "medium": "#FBBF24",
                        "low": "#84CC16"
                    }
                    risk_color = risk_level_colors.get(risk["risk_level"], "#6B7280")
                
                st.markdown(f"""
                <div style="background: white; padding: 1.5rem; border-radius: 12px; border-left: 4px solid {risk_color}; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <h4 style="margin: 0; color: #111827; font-size: 18px;">{risk['category']}</h4>
                            <div style="display: flex; gap: 1rem; align-items: center;">
                                <span style="background: {risk_color}; color: white; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">
                                    Risiko: {risk['risk_score']:.1f}/10
                                </span>
                                <span style="color: #6B7280; font-size: 14px;">{risk['risk_level'].upper()}</span>
                        </div>
                        </div>
                        <p style="color: #374151; margin: 0.5rem 0; line-height: 1.6;">{risk.get('recommendation', '')}</p>
                        <p style="color: #6B7280; font-size: 13px; margin: 0;">Anomalien gefunden: {risk.get('anomaly_count', 0)}</p>
                </div>
                """, unsafe_allow_html=True)
    
        st.markdown("---")
    
        # Anomalies by Type
        st.markdown("### 📊 Anomalien nach Typ")
        
        anomalies_by_type = watchlist_data.get("anomalies_by_type", {})
        
        if anomalies_by_type:
            type_counts = {atype: len(anomalies) for atype, anomalies in anomalies_by_type.items()}
            type_df = pd.DataFrame([
                {"type": k.replace("_", " ").title(), "count": v}
                for k, v in type_counts.items()
            ]).sort_values("count", ascending=False)
            
            fig = px.pie(
                type_df,
                values="count",
                names="type",
                title="Verteilung der Anomalie-Typen",
                color_discrete_sequence=px.colors.sequential.Reds_r
            )
            fig.update_traces(
                textposition='outside',
                textinfo='percent+label',
                textfont_size=12
            )
            fig.update_layout(
                height=500,
                font=dict(family="Inter", size=14),
                showlegend=True
            )
            st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("---")
        
        # Cost Overruns Section
        st.markdown("### 💰 Kostenüberschreitungen: Projekte über Budget")
        
        try:
            overruns_r = requests.get(f"{API_BASE}/detective/cost-overruns", timeout=30)
            overruns_r.raise_for_status()
            overruns_data = overruns_r.json()
            overruns = overruns_data.get("anomalies", [])
            
            if overruns:
                total_overrun = overruns_data.get("total_overrun_amount", 0)
                
                col1, col2 = st.columns([2, 1])
                with col1:
                    st.markdown(f"**Gesamtüberschreitung:** €{total_overrun/1e6:.0f}M über Budget")
                with col2:
                    st.markdown(f"**Projekte:** {len(overruns)}")
                
                for overrun in overruns[:5]:
                    overrun_pct = overrun.get("overrun_percentage", 0)
                    overrun_amount = overrun.get("overrun_amount", 0)
                    
                    st.markdown(f"""
                    <div style="background: #FEF2F2; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #EF4444; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <div>
                                <h4 style="margin: 0; color: #111827; font-size: 18px;">{overrun.get('project', 'Unknown Project')}</h4>
                                <p style="color: #6B7280; font-size: 14px; margin: 0.25rem 0;">{overrun.get('category', 'Unknown Category')}</p>
                            </div>
                            <span style="background: #DC2626; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                +{overrun_pct:.0f}%
                            </span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                            <div>
                                <p style="color: #6B7280; font-size: 12px; margin: 0;">Budgetiert</p>
                                <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0.25rem 0;">€{overrun.get('budgeted', 0)/1e6:.0f}M</p>
                            </div>
                            <div>
                                <p style="color: #6B7280; font-size: 12px; margin: 0;">Tatsächlich</p>
                                <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0.25rem 0;">€{overrun.get('actual', 0)/1e6:.0f}M</p>
                            </div>
                            <div>
                                <p style="color: #DC2626; font-size: 12px; margin: 0;">Überschreitung</p>
                                <p style="color: #DC2626; font-size: 16px; font-weight: 600; margin: 0.25rem 0;">€{overrun_amount/1e6:.0f}M</p>
                            </div>
                        </div>
                        <p style="color: #7F1D1D; margin-top: 1rem; margin-bottom: 0; font-size: 14px;">
                            <strong>🔍 Untersuchung:</strong> {overrun.get('investigation', 'Review recommended')}
                        </p>
                        {f'<ul style="color: #6B7280; font-size: 13px; margin-top: 0.5rem; padding-left: 1.5rem;">' + 
                         ''.join([f"<li>{rec}</li>" for rec in overrun.get('recommendations', [])]) + '</ul>' 
                         if overrun.get('recommendations') else ''}
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.info("Keine signifikanten Kostenüberschreitungen erkannt.")
        except Exception as e:
            st.warning(f"Konnte Kostenüberschreitungen nicht laden: {e}")
        
        st.markdown("---")
        
        # Vendor Concentration Section
        st.markdown("### 🏢 Lieferantenkonzentration: Mangel an Wettbewerb?")
        
        try:
            vendor_r = requests.get(f"{API_BASE}/detective/vendor-concentration", timeout=30)
            vendor_r.raise_for_status()
            vendor_data = vendor_r.json()
            vendor_anomalies = vendor_data.get("anomalies", [])
            
            if vendor_anomalies:
                for vendor in vendor_anomalies[:5]:
                    vendor_share = vendor.get("top_vendor_share", 0)
                    
                    st.markdown(f"""
                    <div style="background: #FEF3C7; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #F59E0B; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <div>
                                <h4 style="margin: 0; color: #111827; font-size: 18px;">{vendor.get('category', 'Unknown Category')}</h4>
                            </div>
                            <span style="background: #F59E0B; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600;">
                                {vendor_share:.0f}% an einen Lieferanten
                            </span>
                        </div>
                        <p style="color: #92400E; margin: 0.5rem 0; line-height: 1.6;">
                            <strong>⚠️ Risiko:</strong> {vendor.get('potential_impact', 'Lack of competition may lead to higher prices.')}
                        </p>
                        <p style="color: #78350F; margin-top: 0.75rem; margin-bottom: 0; font-size: 14px;">
                            <strong>🔍 Untersuchung:</strong> {vendor.get('investigation', 'Review recommended')}
                        </p>
                        {f'<ul style="color: #6B7280; font-size: 13px; margin-top: 0.5rem; padding-left: 1.5rem;">' + 
                         ''.join([f"<li>{rec}</li>" for rec in vendor.get('recommendations', [])]) + '</ul>' 
                         if vendor.get('recommendations') else ''}
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.info("Keine signifikante Lieferantenkonzentration erkannt.")
        except Exception as e:
            st.warning(f"Konnte Lieferantenkonzentration nicht laden: {e}")
        
            st.markdown("---")
        
        # Temporal Anomalies
        st.markdown("### 📈 Temporale Anomalien: Ungewöhnliche Trends")
        
        try:
            temporal_r = requests.get(f"{API_BASE}/detective/temporal-anomalies", timeout=30)
            temporal_r.raise_for_status()
            temporal_data = temporal_r.json()
            temporal_anomalies = temporal_data.get("anomalies", [])
            
            if temporal_anomalies:
                for temp in temporal_anomalies[:5]:
                    change_pct = temp.get("change_percentage", 0)
                    temp_type = temp.get("type", "unknown")
                    
                    if "rapid" in temp_type.lower() or "spike" in temp_type.lower():
                        color = "#DC2626"
                        icon = "📈"
                    else:
                        color = "#F59E0B"
                        icon = "📉"
                    
                    st.markdown(f"""
                    <div style="background: #F9FAFB; padding: 1.5rem; border-radius: 12px; border-left: 4px solid {color}; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <div>
                                <h4 style="margin: 0; color: #111827; font-size: 18px;">{icon} {temp.get('category', 'Unknown')}</h4>
                                <p style="color: #6B7280; font-size: 14px; margin: 0.25rem 0;">
                                    Jahr: {temp.get('year', 'N/A')} | Typ: {temp_type.replace('_', ' ').title()}
                                </p>
                            </div>
                            <span style="background: {color}; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600;">
                                {change_pct:+.1f}%
                            </span>
                        </div>
                        <p style="color: #374151; margin: 0.5rem 0; line-height: 1.6;">{temp.get('description', '')}</p>
                        <p style="color: #6B7280; margin-top: 0.75rem; margin-bottom: 0; font-size: 14px;">
                            <strong>🔍 Untersuchung:</strong> {temp.get('investigation', 'Review recommended')}
                        </p>
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.info("Keine signifikanten temporalen Anomalien erkannt.")
        except Exception as e:
            st.warning(f"Konnte temporale Anomalien nicht laden: {e}")
        
        st.markdown("---")
        
        # All Anomalies Summary
        all_anomalies = watchlist_data.get("all_anomalies", [])
        
        if all_anomalies:
            st.markdown("### 📋 Alle Anomalien: Vollständige Liste")
            
            with st.expander("🔍 Alle Anomalien anzeigen", expanded=False):
                for i, anomaly in enumerate(all_anomalies[:20], 1):
                    severity = anomaly.get("severity", "low")
                    severity_colors = {
                        "high": "#DC2626",
                        "medium": "#F59E0B",
                        "low": "#FBBF24"
                    }
                    color = severity_colors.get(severity, "#6B7280")

                
                    st.markdown(f"""
                    <div style="background: white; padding: 1rem; border-radius: 8px; border-left: 3px solid {color}; margin-bottom: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <p style="margin: 0; color: #111827; font-weight: 600;">{anomaly.get('category', 'Unknown')} - {anomaly.get('type', 'unknown').replace('_', ' ').title()}</p>
                                <p style="margin: 0.5rem 0; color: #374151; font-size: 14px;">{anomaly.get('description', '')}</p>
                                <p style="margin: 0.5rem 0 0 0; color: #6B7280; font-size: 13px;">{anomaly.get('investigation', '')}</p>
                            </div>
                            <span style="background: {color}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 12px; font-weight: 600; margin-left: 1rem;">
                                {severity.upper()}
                            </span>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
                    
        st.markdown("---")
        
        # Call to Action
        st.markdown("""
        <div style="background: #F0FDF4; padding: 2rem; border-radius: 16px; border-left: 4px solid #10B981; margin-top: 2rem;">
            <h4 style="color: #065F46; margin-top: 0;">💡 Was kannst du tun?</h4>
            <ul style="color: #047857; line-height: 2; margin-bottom: 0;">
                <li><strong>Teile deine Erkenntnisse:</strong> Sprich mit anderen Bürgern über diese Muster</li>
                <li><strong>Kontaktiere Abgeordnete:</strong> Frage nach Untersuchungen zu verdächtigen Aktivitäten</li>
                <li><strong>Fordere Transparenz:</strong> Unterstütze Gesetze für offenere Budgets</li>
                <li><strong>Überwache kontinuierlich:</strong> Besuche regelmäßig die Watch List für Updates</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
        
    except Exception as e:
        st.error(f"Fehler beim Laden der Watch List: {e}")
        st.info("Versuche es später erneut oder kontaktiere den Support.")

with tab10:
    # BRAND HERO SECTION - "For the Animals"
    st.markdown(f"""
    <div class="hero-section fade-in-up" style="text-align: center; padding: 64px 32px; background: linear-gradient(180deg, #FAFAFA 0%, transparent 100%); margin-bottom: 48px;">
        <h1 class="hero-title" style="font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 600; line-height: 1.2; letter-spacing: -0.5px; color: #1A1A1A; margin-bottom: 24px;">
            {t['animals_title']}
        </h1>
        <p class="hero-subtitle" style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 400; line-height: 1.6; color: #4A4A4A; max-width: 900px; margin: 0 auto;">
            {t['animals_subtitle']}
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Mission section with brand cards
        st.markdown("---")
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown(f"""
        <div class="feature-card fade-in-up">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_mission']}</h2>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_mission_text']}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div class="brand-card fade-in-up">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_vision']}</h2>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_vision_text']}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    # Why this matters section with brand styling
    st.markdown("---")
                    st.markdown(f"""
    <div class="glass-card fade-in-up" style="margin-bottom: 32px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 24px;">{t['animals_why']}</h2>
        <p style="font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 400; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
            {t['animals_why_text']}
        </p>
                    </div>
                    """, unsafe_allow_html=True)
            
    # Take Action section with brand styling
    st.markdown("---")
    st.markdown(f"<h2 style='font-family: \"Playfair Display\", serif; font-size: 36px; font-weight: 600; color: #1A1A1A; margin-bottom: 16px;'>{t['animals_act_title']}</h2>", unsafe_allow_html=True)
    st.markdown(f"<p style='font-family: \"Inter\", sans-serif; font-size: 18px; font-weight: 400; color: #4A4A4A; margin-bottom: 32px;'>{t['animals_act_subtitle']}</p>", unsafe_allow_html=True)
    
    # Action cards with brand styling
    col1, col2 = st.columns(2)
    
    with col1:
                    st.markdown(f"""
        <div class="feature-card fade-in-up">
            <h3 style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_act_1']}</h3>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_act_1_text']}
            </p>
                    </div>
                    """, unsafe_allow_html=True)
        
    with col2:
        st.markdown(f"""
        <div class="feature-card fade-in-up">
            <h3 style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_act_3']}</h3>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_act_3_text']}
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="feature-card fade-in-up">
            <h3 style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_act_5']}</h3>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_act_5_text']}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div class="feature-card fade-in-up">
            <h3 style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_act_2']}</h3>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_act_2_text']}
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="feature-card fade-in-up">
            <h3 style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_act_4']}</h3>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_act_4_text']}
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="feature-card fade-in-up">
            <h3 style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 16px;">{t['animals_act_6']}</h3>
            <p style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: #4A4A4A; margin-bottom: 0;">
                {t['animals_act_6_text']}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    # Resources section
        st.markdown("---")
    st.markdown(f"## 📚 {t['animals_resources']}")
    st.markdown(f"<p style='font-size: 17px; color: #374151; margin-bottom: 1.5rem;'>{t['animals_resources_text']}</p>", unsafe_allow_html=True)
        
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div style="background: #F9FAFB; padding: 1.5rem; border-radius: 12px; border: 2px solid #E5E7EB;">
            <h4 style="color: #111827; margin-top: 0;">🇩🇪 German Organizations</h4>
            <ul style="color: #374151; line-height: 2;">
                <li><a href="https://www.peta.de" target="_blank" style="color: #059669; font-weight: 600;">PETA Deutschland</a></li>
                <li><a href="https://www.albert-schweitzer-stiftung.de" target="_blank" style="color: #059669; font-weight: 600;">Albert Schweitzer Stiftung</a></li>
                <li><a href="https://www.proveg.com" target="_blank" style="color: #059669; font-weight: 600;">ProVeg</a></li>
                <li><a href="https://www.tierrechte.de" target="_blank" style="color: #059669; font-weight: 600;">Menschen für Tierrechte</a></li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="background: #F9FAFB; padding: 1.5rem; border-radius: 12px; border: 2px solid #E5E7EB;">
            <h4 style="color: #111827; margin-top: 0;">🌱 Plant-Based Living</h4>
            <ul style="color: #374151; line-height: 2;">
                <li><a href="https://www.vegansociety.com" target="_blank" style="color: #059669; font-weight: 600;">The Vegan Society</a></li>
                <li><a href="https://www.happycow.net" target="_blank" style="color: #059669; font-weight: 600;">HappyCow</a> - Find vegan restaurants</li>
                <li><a href="https://www.nutritionfacts.org" target="_blank" style="color: #059669; font-weight: 600;">NutritionFacts.org</a></li>
                <li><a href="https://www.vrg.org" target="_blank" style="color: #059669; font-weight: 600;">Vegetarian Resource Group</a></li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div style="background: #F9FAFB; padding: 1.5rem; border-radius: 12px; border: 2px solid #E5E7EB;">
            <h4 style="color: #111827; margin-top: 0;">💚 Take Action</h4>
            <ul style="color: #374151; line-height: 2;">
                <li><a href="https://www.bundestag.de" target="_blank" style="color: #059669; font-weight: 600;">Contact Bundestag</a> - Find your representative</li>
                <li><a href="https://epetitionen.bundestag.de" target="_blank" style="color: #059669; font-weight: 600;">Petitions</a> - Sign and create petitions</li>
                <li><a href="https://www.change.org" target="_blank" style="color: #059669; font-weight: 600;">Change.org</a> - Join campaigns</li>
                <li><a href="https://www.greenpeace.de" target="_blank" style="color: #059669; font-weight: 600;">Greenpeace Germany</a></li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    # Compassion path forward with brand styling
    st.markdown("---")
    st.markdown(f"""
    <div class="glass-card fade-in-up" style="text-align: center; margin-top: 48px; background: rgba(45, 134, 89, 0.05); border: 1px solid rgba(45, 134, 89, 0.2);">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 600; color: #1A1A1A; margin-top: 0; margin-bottom: 24px;">
            {t['animals_compassion']}
        </h2>
        <p style="font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 400; line-height: 1.6; color: #4A4A4A; max-width: 900px; margin: 0 auto 32px auto;">
            {t['animals_compassion_text']}
        </p>
        <div style="background: rgba(45, 134, 89, 0.05); padding: 32px; border-radius: 12px; margin-top: 24px; border: 1px solid rgba(45, 134, 89, 0.1);">
            <p style="font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: #1A1A1A; margin: 0; line-height: 1.6;">
                {t['animals_closing']}
            </p>
        </div>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("<br><br>", unsafe_allow_html=True)

# Footer with comprehensive disclaimer
st.markdown("---")
st.markdown("""
<div style="background: #F9FAFB; padding: 2rem; border-radius: 12px; margin-top: 2rem;">
    <h4 style="color: #111827; margin-top: 0;">📋 Data Transparency & Sources</h4>
    <p style="color: #6B7280; line-height: 1.8; margin-bottom: 1rem;">
        Public Money Mirror is a transparency demonstration tool. <strong>Always verify data independently for research, journalism, or decision-making.</strong>
    </p>
    <p style="color: #6B7280; line-height: 1.8;">
        • <strong>Official Sources:</strong> <a href="https://www.bundeshaushalt.de" target="_blank">Bundeshaushalt.de</a> • 
        <a href="https://www.bundesrechnungshof.de" target="_blank">BRH.de</a><br>
        • <a href="SOURCES.md" target="_blank">View full source documentation</a>
    </p>
</div>
""", unsafe_allow_html=True)

st.markdown('<p style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 2rem;">💶 Public Money Mirror | Every euro has a story | Verify before you cite</p>', unsafe_allow_html=True)
