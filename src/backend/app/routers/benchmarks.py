"""Benchmarks router."""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from app.db import get_session
from app.schemas import BenchmarkResponse
from app.services.benchmarks import get_or_create_benchmark

router = APIRouter(prefix="/benchmarks", tags=["benchmarks"])


@router.get("/unit_price", response_model=BenchmarkResponse)
def get_unit_price_benchmark(
    cpv_code: Optional[str] = Query(default=None),
    region: Optional[str] = Query(default=None),
    year: int = Query(default=2024),
    session: Session = Depends(get_session),
):
    """Get unit price benchmark."""
    benchmark = get_or_create_benchmark(session, cpv_code, region, year)
    return BenchmarkResponse.model_validate(benchmark)

