"""Responsible parties router."""
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from app.db import get_session
from app.models import Case
from app.services.responsible_parties import (
    get_responsible_parties_for_case,
    generate_all_email_templates,
    generate_email_template,
)
from app.utils.errors import NotFoundError
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/cases", tags=["responsible_parties"])


@router.get("/{case_id}/responsible_parties")
def get_responsible_parties(
    case_id: int,
    session: Session = Depends(get_session),
) -> List[Dict[str, Any]]:
    """Get responsible parties for a case."""
    case = session.get(Case, case_id)
    if not case:
        raise NotFoundError("Case", str(case_id))
    
    parties = get_responsible_parties_for_case(session, case_id)
    return parties


@router.get("/{case_id}/email_templates")
def get_email_templates(
    case_id: int,
    party_type: Optional[str] = Query(default=None, description="Filter by party type"),
    session: Session = Depends(get_session),
) -> List[Dict[str, Any]]:
    """Get email templates for contacting responsible parties."""
    case = session.get(Case, case_id)
    if not case:
        raise NotFoundError("Case", str(case_id))
    
    templates = generate_all_email_templates(session, case_id)
    
    # Filter by party type if specified
    if party_type:
        templates = [t for t in templates if t.get("party", {}).get("type") == party_type]
    
    return templates


@router.post("/{case_id}/contact")
def generate_contact_email(
    case_id: int,
    party_index: int = Query(default=0, description="Index of party to contact"),
    custom_questions: Optional[List[str]] = Query(default=None, description="Custom questions to include"),
    session: Session = Depends(get_session),
) -> Dict[str, Any]:
    """Generate contact email for a specific responsible party."""
    case = session.get(Case, case_id)
    if not case:
        raise NotFoundError("Case", str(case_id))
    
    parties = get_responsible_parties_for_case(session, case_id)
    
    if party_index >= len(parties):
        raise NotFoundError("Party", str(party_index))
    
    party = parties[party_index]
    template = generate_email_template(case, party, custom_questions)
    
    return template

