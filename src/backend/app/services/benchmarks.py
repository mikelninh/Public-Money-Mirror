"""Benchmark services for unit prices."""
from typing import Optional, List, Dict, Any
from sqlmodel import Session, select
from app.models import UnitPriceBenchmark, Award
import statistics


def calculate_unit_price_benchmarks(
    session: Session,
    cpv_code: Optional[str] = None,
    region: Optional[str] = None,
    year: Optional[int] = None,
) -> Dict[str, Any]:
    """Calculate unit price benchmarks from awards."""
    # Query awards with unit prices
    query = select(Award).where(Award.unit_price_eur.isnot(None))
    if cpv_code:
        # Note: We'd need to join with Tender to filter by CPV
        # For now, simplified
        pass
    if year:
        # Extract year from award_date
        pass

    awards = session.exec(query).all()

    unit_prices = [a.unit_price_eur for a in awards if a.unit_price_eur is not None]

    if len(unit_prices) < 3:
        return {
            "unit_price_eur": 0.0,
            "p25_eur": 0.0,
            "p50_eur": 0.0,
            "p75_eur": 0.0,
            "p95_eur": 0.0,
            "count": 0,
        }

    unit_prices_sorted = sorted(unit_prices)
    n = len(unit_prices_sorted)

    return {
        "unit_price_eur": statistics.median(unit_prices_sorted),
        "p25_eur": unit_prices_sorted[int(n * 0.25)],
        "p50_eur": unit_prices_sorted[int(n * 0.50)],
        "p75_eur": unit_prices_sorted[int(n * 0.75)],
        "p95_eur": unit_prices_sorted[int(n * 0.95)] if n > 20 else unit_prices_sorted[-1],
        "count": n,
    }


def get_or_create_benchmark(
    session: Session,
    cpv_code: Optional[str],
    region: Optional[str],
    year: int,
) -> UnitPriceBenchmark:
    """Get or create benchmark record."""
    query = select(UnitPriceBenchmark).where(
        UnitPriceBenchmark.cpv_code == cpv_code,
        UnitPriceBenchmark.region == region,
        UnitPriceBenchmark.year == year,
    )
    benchmark = session.exec(query).first()

    if benchmark:
        return benchmark

    # Calculate and create
    stats = calculate_unit_price_benchmarks(session, cpv_code, region, year)
    benchmark = UnitPriceBenchmark(
        cpv_code=cpv_code,
        region=region,
        year=year,
        unit_price_eur=stats["p50_eur"],
        p25_eur=stats["p25_eur"],
        p50_eur=stats["p50_eur"],
        p75_eur=stats["p75_eur"],
        p95_eur=stats["p95_eur"],
        count=stats["count"],
    )
    session.add(benchmark)
    session.commit()
    session.refresh(benchmark)
    return benchmark

