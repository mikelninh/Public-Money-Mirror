"""Service to identify responsible parties for cases."""
from typing import List, Dict, Any, Optional
from sqlmodel import Session, select
from app.models import Case, Organization, Supplier, Award, Tender
import json


def extract_responsible_parties(session: Session, case: Case) -> List[Dict[str, Any]]:
    """Extract responsible parties (procurement officers, suppliers, decision makers) for a case."""
    parties = []
    
    # Get organization (buyer)
    organization = None
    if case and case.organization_id:
        organization = session.get(Organization, case.organization_id)
    
    if organization:
        # Try to find procurement contact from organization data
        # In real system, would extract from procurement documents
        parties.append({
            "type": "procurement_officer",
            "role": "Procurement Manager",
            "organization": organization.name,
            "name": f"Procurement Manager - {organization.name}",
            "email": f"procurement@{organization.name.lower().replace(' ', '').replace('.', '')}.de",
            "phone": None,
            "address": f"{organization.name}, Procurement Department",
            "responsibility": "Contract award and procurement decisions",
        })
    
    # Get related awards/suppliers
    # In real system, would query awards related to this case
    # For now, find awards with high values that might be related
    awards = session.exec(select(Award).limit(100)).all()
    if awards:
        # Find top supplier by contract value
        supplier_contracts = {}
        for award in awards:
            if award.supplier_id:
                if award.supplier_id not in supplier_contracts:
                    supplier_contracts[award.supplier_id] = 0
                supplier_contracts[award.supplier_id] += award.contract_value_eur or 0
        
        if supplier_contracts:
            top_supplier_id = max(supplier_contracts, key=supplier_contracts.get)
            supplier = session.get(Supplier, top_supplier_id)
            if supplier:
                parties.append({
                    "type": "supplier",
                    "role": "Contractor/Supplier",
                    "organization": supplier.name,
                    "name": f"Sales Manager - {supplier.name}",
                    "email": f"sales@{supplier.name.lower().replace(' ', '').replace('.', '')}.de",
                    "phone": None,
                    "address": supplier.name,
                    "responsibility": "Contract pricing and delivery",
                    "vat_number": supplier.vat_number,
                })
    
    # Add decision maker (e.g., Minister, Mayor, Department Head)
    if organization:
        org_name = organization.name.lower()
        if "ministry" in org_name or "federal" in org_name:
            decision_maker_title = "Minister"
            decision_maker_name = "Minister of Finance"
        elif "city" in org_name or "council" in org_name:
            decision_maker_title = "Mayor"
            decision_maker_name = "Mayor"
        else:
            decision_maker_title = "Department Head"
            decision_maker_name = "Department Head"
        
        parties.append({
            "type": "decision_maker",
            "role": decision_maker_title,
            "organization": organization.name,
            "name": decision_maker_name,
            "email": f"office@{organization.name.lower().replace(' ', '').replace('.', '')}.de",
            "phone": None,
            "address": organization.name,
            "responsibility": "Final approval and oversight",
        })
    
    return parties


def generate_email_template(
    case: Case,
    responsible_party: Dict[str, Any],
    questions: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """Generate email template for contacting responsible party."""
    if questions is None:
        questions = [
            f"Can you explain why the contract for {case.title} was awarded at the stated price?",
            "What competitive bidding process was followed?",
            "Were alternative suppliers considered?",
            "What benchmarking or market analysis was conducted?",
            "Can you provide a cost breakdown for this contract?",
        ]
    
    subject = f"Clarification Request: {case.title}"
    
    body = f"""Dear {responsible_party['name']},

I am writing to request clarification regarding the procurement case:
"{case.title}"

We have identified potential savings of €{case.euro_estimate:,.0f} in this procurement.

Questions for clarification:

"""
    
    for i, question in enumerate(questions, 1):
        body += f"{i}. {question}\n\n"
    
    body += f"""
I would appreciate your response within 14 business days.

Best regards,
Public Money Mirror Team

---
Case Reference: PMM-{case.id:04d}
Estimated Potential Savings: €{case.euro_estimate:,.0f}
Confidence Level: {case.confidence * 100:.0f}%
"""
    
    return {
        "to": responsible_party.get("email"),
        "subject": subject,
        "body": body,
        "party": responsible_party,
        "case_id": case.id,
    }


def get_responsible_parties_for_case(session: Session, case_id: int) -> List[Dict[str, Any]]:
    """Get responsible parties for a specific case."""
    case = session.get(Case, case_id)
    if not case:
        return []
    
    # Check if already extracted
    if case.responsible_parties:
        try:
            parties = json.loads(case.responsible_parties) if isinstance(case.responsible_parties, str) else case.responsible_parties
            if isinstance(parties, list):
                return parties
        except:
            pass
    
    # Extract if not already done
    parties = extract_responsible_parties(session, case)
    
    # Save to case
    case.responsible_parties = json.dumps(parties)
    session.add(case)
    session.commit()
    session.refresh(case)
    
    return parties


def generate_all_email_templates(session: Session, case_id: int) -> List[Dict[str, Any]]:
    """Generate email templates for all responsible parties in a case."""
    parties = get_responsible_parties_for_case(session, case_id)
    case = session.get(Case, case_id)
    if not case:
        return []
    
    templates = []
    for party in parties:
        template = generate_email_template(case, party)
        templates.append(template)
    
    return templates

