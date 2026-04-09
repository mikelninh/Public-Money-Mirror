"""Entity search router."""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select
from app.db import get_session
from app.models import Supplier

router = APIRouter(prefix="/entities", tags=["entities"])


@router.get("/search")
def search_entities(
    q: str = Query(..., min_length=2),
    limit: int = Query(default=10, ge=1, le=50),
    session: Session = Depends(get_session),
):
    """Search entities (suppliers)."""
    query = select(Supplier).where(Supplier.name.ilike(f"%{q}%")).limit(limit)
    suppliers = session.exec(query).all()
    return [
        {
            "id": s.id,
            "name": s.name,
            "canonical_name": s.canonical_name,
            "vat_number": s.vat_number,
            "country": s.country,
        }
        for s in suppliers
    ]

