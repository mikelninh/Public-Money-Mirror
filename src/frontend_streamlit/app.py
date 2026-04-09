"""Enhanced Streamlit dashboard for Public Money Mirror."""
import streamlit as st
import requests
import plotly.express as px
import plotly.graph_objects as go
from typing import Dict, Any
import os
from datetime import datetime

# Configuration
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
API_BASE = f"{BACKEND_URL}/api"

# Page config
st.set_page_config(
    page_title="Public Money Mirror Dashboard",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 1rem;
    }
    .sub-header {
        font-size: 1.5rem;
        color: #666;
        text-align: center;
        margin-bottom: 2rem;
    }
    .story-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 10px;
        color: white;
        margin: 1rem 0;
    }
    .stButton>button {
        background-color: #1f77b4;
        color: white;
        border-radius: 5px;
        padding: 0.5rem 2rem;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown('<div class="main-header">💰 Public Money Mirror</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-header">Follow the flow. Every euro has a story.</div>', unsafe_allow_html=True)

# Sidebar
st.sidebar.title("📊 Navigation")
page = st.sidebar.radio(
    "Choose a page",
    ["🏠 Home", "📋 Cases", "📰 Stories", "📊 Benchmarks", "📦 Recovery Kits", "💳 Billing"]
)

# Helper functions
@st.cache_data(ttl=60)
def fetch_stories(limit=5):
    """Fetch latest stories."""
    try:
        # Try without /api prefix first
        response = requests.get(f"{BACKEND_URL}/stories/latest", params={"limit": limit}, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                return data
        # Fallback to API_BASE
        response = requests.get(f"{API_BASE}/stories/latest", params={"limit": limit}, timeout=5)
        if response.status_code == 200:
            data = response.json()
            # Handle both list and dict responses
            if isinstance(data, list):
                return data
            elif isinstance(data, dict) and "story" in data:
                # OpenSpending format - convert to our format
                return [{
                    "title": data.get("story", "Story")[:100],
                    "lede": data.get("story", "")[:200],
                    "what_we_found": data.get("story", ""),
                    "why_it_matters": "This data represents public spending transparency.",
                    "euro_estimate": 0,
                    "confidence": 0.5,
                    "receipts": []
                }]
            return []
        return []
    except Exception as e:
        st.sidebar.error(f"API Error: {e}")
        return []

@st.cache_data(ttl=60)
def fetch_cases(limit=50, min_score=0, min_euro=0):
    """Fetch cases."""
    try:
        # Try without /api prefix first
        response = requests.get(
            f"{BACKEND_URL}/cases",
            params={"limit": limit, "min_score": min_score, "min_euro": min_euro},
            timeout=5
        )
        if response.status_code == 200:
            return response.json()
        # Fallback to API_BASE
        response = requests.get(
            f"{API_BASE}/cases",
            params={"limit": limit, "min_score": min_score, "min_euro": min_euro},
            timeout=5
        )
        if response.status_code == 200:
            return response.json()
        return {"cases": [], "total": 0}
    except Exception as e:
        st.sidebar.error(f"API Error: {e}")
        return {"cases": [], "total": 0}

# Home Page
if page == "🏠 Home":
    st.header("Welcome to Public Money Mirror")
    st.markdown("""
    Public Money Mirror identifies savings and anomalies in public spending, 
    powers success-fee recoveries for governments, and offers enterprise licenses.
    """)
    
    # Fetch stories for homepage
    stories = fetch_stories(3)
    
    if stories:
        st.subheader("📰 Latest Stories")
        for story in stories[:3]:
            if isinstance(story, dict):
                with st.container():
                    st.markdown(f"""
                    <div class="story-card">
                        <h2>{story.get('title', 'Story')}</h2>
                        <p><strong>€{story.get('euro_estimate', 0):,.0f}</strong> in potential savings</p>
                        <p>{story.get('what_we_found', story.get('lede', ''))[:200]}...</p>
                    </div>
                    """, unsafe_allow_html=True)
    
    # Summary metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Cases", "0")
    
    with col2:
        st.metric("Potential Savings", "€0")
    
    with col3:
        st.metric("High Confidence", "0")
    
    with col4:
        st.metric("Recovery Kits", "0")

# Cases Page
elif page == "📋 Cases":
    st.header("📋 Cases - Potential Savings Opportunities")
    
    # Filters
    col1, col2, col3 = st.columns(3)
    with col1:
        min_score = st.slider("Min Score", 0, 100, 50)
    with col2:
        min_euro = st.number_input("Min EUR Estimate", 0, 1000000000, 0)
    with col3:
        limit = st.number_input("Limit", 1, 100, 50)
    
    # Fetch cases
    data = fetch_cases(limit, min_score, min_euro)
    cases = data.get("cases", [])
    total = data.get("total", 0)
    
    # Display summary
    st.subheader("Summary")
    col1, col2 = st.columns(2)
    with col1:
        total_euro = sum(c.get('euro_estimate', 0) for c in cases)
        if total_euro >= 1_000_000_000:
            st.metric("Total Potential Savings", f"€{total_euro/1_000_000_000:.2f}B")
        else:
            st.metric("Total Potential Savings", f"€{total_euro:,.0f}")
    with col2:
        st.metric("Number of Cases", len(cases))
    
    # Case table
    if cases:
        st.subheader("Cases")
        
        # Create DataFrame for display
        import pandas as pd
        df_data = []
        for case in cases:
            eur = case.get('euro_estimate', 0)
            eur_display = f"€{eur/1_000_000_000:.2f}B" if eur >= 1_000_000_000 else f"€{eur:,.0f}"
            
            df_data.append({
                "ID": case.get("id", ""),
                "Title": case.get("title", "")[:50] + "...",
                "Score": f"{case.get('score', 0):.1f}",
                "EUR Estimate": eur_display,
                "Confidence": f"{case.get('confidence', 0)*100:.0f}%",
                "Status": case.get("status", ""),
            })
        
        df = pd.DataFrame(df_data)
        st.dataframe(df, use_container_width=True, hide_index=True)
        
        # Case details with responsible parties
        st.subheader("Case Details & Responsible Parties")
        selected_case_id = st.selectbox(
            "Select a case to view details and responsible parties",
            [c.get("id") for c in cases],
            format_func=lambda x: next((c.get("title", f"Case {x}") for c in cases if c.get("id") == x), f"Case {x}")
        )
        
        if selected_case_id:
            selected_case = next((c for c in cases if c.get("id") == selected_case_id), None)
            if selected_case:
                st.markdown("---")
                st.markdown(f"### {selected_case.get('title', 'Case')}")
                st.markdown(f"**Description:** {selected_case.get('description', 'N/A')}")
                
                col1, col2, col3 = st.columns(3)
                with col1:
                    eur = selected_case.get('euro_estimate', 0)
                    if eur >= 1_000_000_000:
                        st.metric("EUR Estimate", f"€{eur/1_000_000_000:.2f}B")
                    else:
                        st.metric("EUR Estimate", f"€{eur:,.0f}")
                with col2:
                    st.metric("Score", f"{selected_case.get('score', 0):.1f}/100")
                with col3:
                    st.metric("Confidence", f"{selected_case.get('confidence', 0)*100:.0f}%")
                
                # Show responsible parties
                from components.responsible_parties import show_responsible_parties, show_email_templates
                show_responsible_parties(selected_case_id, BACKEND_URL)
                show_email_templates(selected_case_id, BACKEND_URL)
        
        # Charts
        col1, col2 = st.columns(2)
        
        with col1:
            # Bar chart of top cases by EUR estimate
            if len(cases) > 0:
                fig = px.bar(
                    x=[c.get("title", "")[:30] for c in cases[:10]],
                    y=[c.get("euro_estimate", 0) for c in cases[:10]],
                    labels={"x": "Case", "y": "EUR Estimate"},
                    title="Top Cases by EUR Estimate",
                    color=[c.get("score", 0) for c in cases[:10]],
                    color_continuous_scale="Viridis"
                )
                fig.update_layout(height=400)
                st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            # Scatter plot: Score vs EUR Estimate
            if len(cases) > 0:
                fig = px.scatter(
                    cases[:20],
                    x="score",
                    y="euro_estimate",
                    size="confidence",
                    color="confidence",
                    hover_data=["title"],
                    labels={"score": "Score", "euro_estimate": "EUR Estimate"},
                    title="Score vs EUR Estimate",
                    color_continuous_scale="Blues"
                )
                fig.update_layout(height=400)
                st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No cases found. Try adjusting filters or seed data first.")
        st.code("python scripts/seed_synthetic_data.py", language="bash")

# Stories Page
elif page == "📰 Stories":
    st.header("📰 Stories - Every Euro Has a Story")
    
    limit = st.slider("Number of stories", 1, 10, 3)
    
    stories = fetch_stories(limit)
    
    if stories:
        for i, story in enumerate(stories):
            if isinstance(story, dict):
                with st.container():
                    st.markdown("---")
                    st.markdown(f"""
                    <div class="story-card">
                        <h2>{story.get('title', 'Story')}</h2>
                        <p style="font-size: 1.2rem; font-weight: bold;">
                            €{story.get('euro_estimate', 0):,.0f} in potential savings
                        </p>
                        <p><strong>What we found:</strong></p>
                        <p>{story.get('what_we_found', story.get('lede', ''))}</p>
                        <p><strong>Why it matters:</strong></p>
                        <p>{story.get('why_it_matters', 'This represents transparency in public spending.')}</p>
                        <p><strong>Confidence:</strong> {story.get('confidence', 0)*100:.0f}%</p>
                    </div>
                    """, unsafe_allow_html=True)
    else:
        st.info("No stories available. Check backend connection or seed data.")
        st.code("python scripts/seed_synthetic_data.py", language="bash")

# Benchmarks Page
elif page == "📊 Benchmarks":
    st.header("📊 Unit Price Benchmarks")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        cpv_code = st.text_input("CPV Code", "")
    with col2:
        region = st.text_input("Region", "DE")
    with col3:
        year = st.number_input("Year", 2020, 2025, 2024)
    
    if st.button("Get Benchmark"):
        try:
            response = requests.get(
                f"{API_BASE}/benchmarks/unit_price",
                params={"cpv_code": cpv_code or None, "region": region or None, "year": year},
                timeout=5
            )
            if response.status_code == 200:
                benchmark = response.json()
                st.json(benchmark)
            else:
                st.error(f"Error: {response.status_code}")
        except Exception as e:
            st.error(f"Error: {e}")

# Recovery Kits Page
elif page == "📦 Recovery Kits":
    st.header("📦 Recovery Kits")
    
    case_id = st.number_input("Case ID", 1, 10000, 1)
    
    col1, col2, col3 = st.columns(3)
    with col1:
        include_benchmarks = st.checkbox("Include Benchmarks", True)
    with col2:
        include_alternatives = st.checkbox("Include Alternative Suppliers", True)
    with col3:
        include_letter = st.checkbox("Include Draft Letter", True)
    
    if st.button("Generate Recovery Kit"):
        try:
            response = requests.post(
                f"{API_BASE}/recovery_kits/{case_id}",
                json={
                    "include_benchmarks": include_benchmarks,
                    "include_alternatives": include_alternatives,
                    "include_draft_letter": include_letter,
                },
                timeout=10
            )
            if response.status_code == 200:
                kit = response.json()
                st.success("Recovery kit generated!")
                st.json(kit)
            else:
                st.error(f"Error: {response.status_code}")
        except Exception as e:
            st.error(f"Error: {e}")

# Billing Page
elif page == "💳 Billing":
    st.header("💳 Billing & Invoices")
    
    st.subheader("Create Success Fee Invoice")
    
    col1, col2 = st.columns(2)
    with col1:
        org_id = st.number_input("Organization ID", 1, 10000, 1)
        savings_realised = st.number_input("Savings Realised (EUR)", 0.0, 1000000.0, 0.0)
    with col2:
        rate_pct = st.number_input("Rate (%)", 15.0, 25.0, 20.0)
        amount = savings_realised * (rate_pct / 100.0)
        st.metric("Invoice Amount", f"€{amount:,.2f}")
    
    if st.button("Create Invoice"):
        try:
            response = requests.post(
                f"{API_BASE}/invoices/success_fee",
                json={
                    "org_id": org_id,
                    "savings_realised_eur": savings_realised,
                    "rate_pct": rate_pct
                },
                timeout=10
            )
            if response.status_code == 200:
                invoice = response.json()
                st.success("Invoice created!")
                st.json(invoice)
            else:
                st.error(f"Error: {response.status_code}")
        except Exception as e:
            st.error(f"Error: {e}")

# Footer
st.markdown("---")
st.markdown(f"""
<div style="text-align: center; color: #666; padding: 2rem;">
    <p>Public Money Mirror - Follow the flow. Every euro has a story.</p>
    <p>Backend API: <a href="{BACKEND_URL}/docs">{BACKEND_URL}/docs</a></p>
</div>
""", unsafe_allow_html=True)
