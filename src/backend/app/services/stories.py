"""Story generation services for public web."""
from typing import Dict, Any, List
from app.models import Case, CaseEvidence
from sqlmodel import Session, select


def generate_story_card(session: Session, case: Case) -> Dict[str, Any]:
    """Generate story card from case."""
    import json
    
    # Get evidence
    evidence = session.exec(select(CaseEvidence).where(CaseEvidence.case_id == case.id)).all()

    receipts = [e.source_url for e in evidence if e.source_url]
    if not receipts and case.id:
        receipts = [f"/cases/{case.id}"]

    # Parse risk_tags if it's a JSON string
    risk_tags = []
    if case.risk_tags:
        try:
            risk_tags = json.loads(case.risk_tags) if isinstance(case.risk_tags, str) else case.risk_tags
        except:
            risk_tags = []

    # Generate narrative
    what_we_found = case.description or f"Identified potential savings of €{case.euro_estimate:,.0f} in {case.title}."
    why_it_matters = f"This represents {case.confidence * 100:.0f}% confidence that these funds could be recovered."

    lede = f"€{case.euro_estimate:,.0f} in potential savings detected"

    risk_tags_text = ", ".join(risk_tags[:3]) if risk_tags else "potential anomaly"

    # Parse explainability_blob if it's a JSON string
    explainability = None
    if case.explainability_blob:
        try:
            explainability = json.loads(case.explainability_blob) if isinstance(case.explainability_blob, str) else case.explainability_blob
            if explainability and isinstance(explainability, dict):
                top_features = explainability.get("top_features", [])
                if top_features:
                    feature_desc = top_features[0].get("feature", "")
                    what_we_found += f" Key indicators include {feature_desc}."
        except:
            pass

    return {
        "id": case.id,
        "title": case.title,
        "lede": lede,
        "what_we_found": what_we_found,
        "why_it_matters": why_it_matters,
        "receipts": receipts,
        "confidence": case.confidence,
        "next_steps": f"Review recovery kit for {risk_tags_text}.",
        "case_id": case.id,
        "euro_estimate": case.euro_estimate,
    }


def get_latest_stories(session: Session, limit: int = 3) -> List[Dict[str, Any]]:
    """Get latest story cards."""
    query = select(Case).where(Case.status == "open").order_by(Case.score.desc(), Case.euro_estimate.desc()).limit(limit)
    cases = session.exec(query).all()

    return [generate_story_card(session, case) for case in cases]

