"""Cases router."""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select, func
from app.db import get_session
from app.models import Case, CaseEvidence
from app.schemas import CaseResponse, CaseListResponse
from app.auth import get_current_user, require_role
from app.models import User, UserRole
from typing import Optional

router = APIRouter(prefix="/cases", tags=["cases"])


@router.get("/", response_model=CaseListResponse)
def list_cases(
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    min_score: Optional[float] = Query(default=None, ge=0, le=100),
    min_euro: Optional[float] = Query(default=None, ge=0),
    session: Session = Depends(get_session),
):
    # Make cases endpoint public - no authentication required
    """List cases with filtering."""
    query = select(Case)
    count_query = select(func.count(Case.id))

    if min_score is not None:
        query = query.where(Case.score >= min_score)
        count_query = count_query.where(Case.score >= min_score)

    if min_euro is not None:
        query = query.where(Case.euro_estimate >= min_euro)
        count_query = count_query.where(Case.euro_estimate >= min_euro)

    query = query.order_by(Case.score.desc(), Case.euro_estimate.desc()).limit(limit).offset(offset)

    cases = session.exec(query).all()
    total = session.exec(count_query).first() or 0

    # Convert cases to response format
    case_responses = []
    for c in cases:
        # Parse risk_tags if it's a JSON string
        import json
        risk_tags = []
        if c.risk_tags:
            try:
                risk_tags = json.loads(c.risk_tags) if isinstance(c.risk_tags, str) else c.risk_tags
            except:
                risk_tags = []
        
        # Parse explainability_blob if it's a JSON string
        explainability = None
        if c.explainability_blob:
            try:
                explainability = json.loads(c.explainability_blob) if isinstance(c.explainability_blob, str) else c.explainability_blob
            except:
                explainability = None
        
        # Parse responsible_parties if it's a JSON string
        responsible_parties = None
        if c.responsible_parties:
            try:
                responsible_parties = json.loads(c.responsible_parties) if isinstance(c.responsible_parties, str) else c.responsible_parties
            except:
                responsible_parties = None
        
        # Create response with parsed data
        case_dict = {
            "id": c.id,
            "organization_id": c.organization_id,
            "title": c.title,
            "description": c.description,
            "score": c.score,
            "euro_estimate": c.euro_estimate,
            "risk_tags": risk_tags,
            "confidence": c.confidence,
            "status": c.status,
            "explainability_blob": explainability,
            "responsible_parties": responsible_parties,
            "created_at": c.created_at,
            "updated_at": c.updated_at,
        }
        case_responses.append(CaseResponse(**case_dict))
    
    return CaseListResponse(cases=case_responses, total=total, limit=limit, offset=offset)


@router.get("/{case_id}", response_model=CaseResponse)
def get_case(case_id: int, session: Session = Depends(get_session)):
    """Get case by ID."""
    import json
    from app.services.responsible_parties import get_responsible_parties_for_case
    
    case = session.get(Case, case_id)
    if not case:
        from app.utils.errors import NotFoundError

        raise NotFoundError("Case", str(case_id))
    
    # Parse fields for response
    risk_tags = []
    if case.risk_tags:
        try:
            risk_tags = json.loads(case.risk_tags) if isinstance(case.risk_tags, str) else case.risk_tags
        except:
            risk_tags = []
    
    explainability = None
    if case.explainability_blob:
        try:
            explainability = json.loads(case.explainability_blob) if isinstance(case.explainability_blob, str) else case.explainability_blob
        except:
            explainability = None
    
    # Get responsible parties if not already loaded
    responsible_parties = None
    if case.responsible_parties:
        try:
            responsible_parties = json.loads(case.responsible_parties) if isinstance(case.responsible_parties, str) else case.responsible_parties
        except:
            # Extract if not available
            responsible_parties = get_responsible_parties_for_case(session, case_id)
    
    case_dict = {
        "id": case.id,
        "organization_id": case.organization_id,
        "title": case.title,
        "description": case.description,
        "score": case.score,
        "euro_estimate": case.euro_estimate,
        "risk_tags": risk_tags,
        "confidence": case.confidence,
        "status": case.status,
        "explainability_blob": explainability,
        "responsible_parties": responsible_parties,
        "created_at": case.created_at,
        "updated_at": case.updated_at,
    }
    return CaseResponse(**case_dict)


@router.get("/{case_id}/evidence")
def get_case_evidence(case_id: int, session: Session = Depends(get_session)):
    """Get evidence for a case."""
    evidence = session.exec(select(CaseEvidence).where(CaseEvidence.case_id == case_id)).all()
    return [{"id": e.id, "type": e.evidence_type, "data": e.data, "source_url": e.source_url} for e in evidence]

