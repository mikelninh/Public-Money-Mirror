"""Streamlit component for responsible parties."""
import streamlit as st
import requests
from typing import List, Dict, Any


def show_responsible_parties(case_id: int, backend_url: str = "http://localhost:8000"):
    """Display responsible parties for a case."""
    try:
        # Get responsible parties
        response = requests.get(
            f"{backend_url}/cases/{case_id}/responsible_parties",
            timeout=5
        )
        if response.status_code == 200:
            parties = response.json()
            
            if parties:
                st.subheader("👤 Responsible Parties")
                
                for i, party in enumerate(parties):
                    with st.expander(f"{party.get('role', 'Unknown')} - {party.get('name', 'N/A')}"):
                        col1, col2 = st.columns(2)
                        
                        with col1:
                            st.write(f"**Organization:** {party.get('organization', 'N/A')}")
                            st.write(f"**Role:** {party.get('role', 'N/A')}")
                            st.write(f"**Responsibility:** {party.get('responsibility', 'N/A')}")
                        
                        with col2:
                            if party.get('email'):
                                st.write(f"**Email:** {party['email']}")
                            if party.get('phone'):
                                st.write(f"**Phone:** {party['phone']}")
                            if party.get('address'):
                                st.write(f"**Address:** {party['address']}")
                        
                        # Generate email button
                        if st.button(f"Generate Email Template", key=f"email_{case_id}_{i}"):
                            email_response = requests.get(
                                f"{backend_url}/cases/{case_id}/email_templates",
                                params={"party_type": party.get("type")},
                                timeout=5
                            )
                            if email_response.status_code == 200:
                                templates = email_response.json()
                                if templates:
                                    template = templates[0]  # Get first template for this party
                                    st.text_area(
                                        "Email Template",
                                        f"To: {template.get('to', '')}\nSubject: {template.get('subject', '')}\n\n{template.get('body', '')}",
                                        height=400,
                                        key=f"email_template_{case_id}_{i}"
                                    )
                                    
                                    # Copy button
                                    st.code(f"To: {template.get('to', '')}\nSubject: {template.get('subject', '')}\n\n{template.get('body', '')}", language=None)
            else:
                st.info("No responsible parties found for this case.")
        else:
            st.error(f"Error fetching responsible parties: {response.status_code}")
    except Exception as e:
        st.error(f"Error: {e}")


def show_email_templates(case_id: int, backend_url: str = "http://localhost:8000"):
    """Display email templates for contacting responsible parties."""
    try:
        response = requests.get(
            f"{backend_url}/cases/{case_id}/email_templates",
            timeout=5
        )
        if response.status_code == 200:
            templates = response.json()
            
            if templates:
                st.subheader("📧 Email Templates")
                
                for i, template in enumerate(templates):
                    party = template.get('party', {})
                    with st.expander(f"Email to {party.get('name', 'Unknown')} ({party.get('role', 'N/A')})"):
                        st.write(f"**To:** {template.get('to', 'N/A')}")
                        st.write(f"**Subject:** {template.get('subject', 'N/A')}")
                        st.text_area(
                            "Email Body",
                            template.get('body', ''),
                            height=300,
                            key=f"email_body_{case_id}_{i}"
                        )
                        
                        # Copy button
                        email_text = f"To: {template.get('to', '')}\nSubject: {template.get('subject', '')}\n\n{template.get('body', '')}"
                        st.code(email_text, language=None)
            else:
                st.info("No email templates available.")
        else:
            st.error(f"Error fetching email templates: {response.status_code}")
    except Exception as e:
        st.error(f"Error: {e}")

