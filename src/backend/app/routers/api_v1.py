"""API v1 router (enterprise)."""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select
from app.db import get_session
from app.models import Supplier, Award, User, UserRole
from app.services.anomaly import detect_price_outliers, detect_single_bidder_risk
from app.auth import require_role

router = APIRouter(prefix="/api/v1", tags=["api"])


@router.get("/risk_score")
def get_supplier_risk_score(
    supplier_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_role(UserRole.ADMIN, UserRole.ANALYST)),
):
    """Get risk score for a supplier."""
    supplier = session.get(Supplier, supplier_id)
    if not supplier:
        from app.utils.errors import NotFoundError

        raise NotFoundError("Supplier", str(supplier_id))

    # Get supplier's awards
    awards = session.exec(select(Award).where(Award.supplier_id == supplier_id)).all()

    # Calculate risk metrics
    prices = [a.unit_price_eur for a in awards if a.unit_price_eur is not None]
    price_risk = detect_price_outliers(prices) if prices else {"outlier_score": 0.0}

    # Single bidder risk
    bid_risks = [detect_single_bidder_risk(a.number_of_bids) for a in awards]
    avg_bid_risk = sum(b["risk_score"] for b in bid_risks) / len(bid_risks) if bid_risks else 0.0

    overall_risk = (price_risk.get("outlier_score", 0.0) + avg_bid_risk) / 2

    return {
        "supplier_id": supplier_id,
        "supplier_name": supplier.name,
        "overall_risk_score": overall_risk,
        "price_risk": price_risk,
        "competition_risk": avg_bid_risk,
    }


@router.get("/cases/export.csv")
def export_cases_csv(
    limit: Optional[int] = Query(default=100, ge=1, le=1000),
    session: Session = Depends(get_session),
    current_user: User = Depends(require_role(UserRole.ADMIN, UserRole.ANALYST)),
):
    """Export cases as CSV."""
    from fastapi.responses import StreamingResponse
    from io import StringIO
    import csv
    from app.models import Case

    cases = session.exec(select(Case).limit(limit)).all()

    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["id", "title", "score", "euro_estimate", "risk_tags", "confidence", "status"])
    for case in cases:
        writer.writerow([
            case.id,
            case.title,
            case.score,
            case.euro_estimate,
            ",".join(case.risk_tags),
            case.confidence,
            case.status,
        ])

    output.seek(0)
    return StreamingResponse(iter([output.getvalue()]), media_type="text/csv")

