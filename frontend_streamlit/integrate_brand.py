"""
Brand Design System Integration for Streamlit
Apply the brand identity to your Streamlit app
"""

import streamlit as st

def load_brand_styles():
    """Load the brand CSS into Streamlit"""
    with open('assets/brand_styles.css', 'r') as f:
        css = f.read()
    st.markdown(f'<style>{css}</style>', unsafe_allow_html=True)

def render_hero(title: str, subtitle: str, body_text: str = None, buttons: list = None):
    """
    Render a hero section with brand styling
    
    Args:
        title: Main hero title (Playfair Display, 64px)
        subtitle: Hero subtitle (Inter, 24px)
        body_text: Optional body text below subtitle
        buttons: List of button configs [{"label": "Text", "action": "url"}]
    """
    st.markdown(f"""
    <div class="hero-section fade-in-up">
        <h1 class="hero-title">{title}</h1>
        <p class="hero-subtitle">{subtitle}</p>
        {f'<p style="font-size: 18px; color: #4A4A4A; max-width: 800px; margin: 0 auto; line-height: 1.6;">{body_text}</p>' if body_text else ''}
        {_render_buttons(buttons) if buttons else ''}
    </div>
    """, unsafe_allow_html=True)

def _render_buttons(buttons: list):
    """Render hero buttons"""
    if not buttons:
        return ""
    
    button_html = '<div style="margin-top: 48px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">'
    for btn in buttons:
        button_html += f'''
        <a href="{btn.get('action', '#')}" style="
            background-color: #2D8659;
            color: #FAFAFA;
            padding: 16px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.2s ease-out;
            display: inline-block;
        ">{btn['label']}</a>
        '''
    button_html += '</div>'
    return button_html

def render_brand_card(title: str, content: str, accent_left: bool = False):
    """
    Render a brand-styled card
    
    Args:
        title: Card title
        content: Card content (can include HTML)
        accent_left: Add emerald accent border on left
    """
    card_class = "feature-card" if accent_left else "brand-card"
    st.markdown(f"""
    <div class="{card_class} fade-in-up">
        <h3 style="margin-bottom: 16px; color: #1A1A1A;">{title}</h3>
        <div style="color: #4A4A4A; line-height: 1.6;">{content}</div>
    </div>
    """, unsafe_allow_html=True)

def render_metric_card(value: str, label: str, delta: str = None, delta_color: str = "#2D8659"):
    """
    Render a brand-styled metric card
    
    Args:
        value: Main metric value
        label: Metric label
        delta: Optional delta value (e.g., "+2.3%")
        delta_color: Color for delta (default: Emerald Truth)
    """
    delta_html = f'<div style="font-size: 14px; font-weight: 500; color: {delta_color}; margin-top: 8px;">{delta}</div>' if delta else ''
    
    st.markdown(f"""
    <div class="brand-card" style="text-align: center;">
        <div style="font-family: 'Inter', sans-serif; font-size: 36px; font-weight: 600; color: #1A1A1A;">{value}</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: #4A4A4A; margin-top: 8px;">{label}</div>
        {delta_html}
    </div>
    """, unsafe_allow_html=True)

def render_closing_statement(text: str):
    """
    Render a closing statement with brand typography
    
    Args:
        text: Closing statement text
    """
    st.markdown(f"""
    <div style="
        text-align: center;
        padding: 64px 0;
        font-family: 'Playfair Display', serif;
        font-size: 28px;
        font-weight: 600;
        color: #1A1A1A;
        line-height: 1.6;
    ">
        {text}
    </div>
    """, unsafe_allow_html=True)

# Example usage in your Streamlit app:
"""
# In your app.py:

from integrate_brand import load_brand_styles, render_hero, render_brand_card, render_closing_statement

# Load brand styles
load_brand_styles()

# Render hero section
render_hero(
    title="99% Vegan Germany",
    subtitle="Transparency is Love",
    body_text="€346.9 billion flows through the German federal budget every year. Every decision shapes lives. Every allocation tells a story.",
    buttons=[
        {"label": "See the Impact", "action": "#impact"},
        {"label": "Join the Movement", "action": "#join"}
    ]
)

# Render branded cards
render_brand_card(
    title="Our Mission",
    content="We envision a Germany where no animal suffers for our food, clothing, or entertainment. A nation that chooses compassion over tradition, love over convenience, and freedom for all beings.",
    accent_left=True
)

# Render closing statement
render_closing_statement(
    "Let's create a Germany where love wins. Where every animal is free. Where compassion guides our nation. The future is plant-based. The future is now."
)
"""






