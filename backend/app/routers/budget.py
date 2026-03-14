from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.budget import BudgetCategory, BudgetItem
from app.schemas.budget import BudgetCategoryResponse

router = APIRouter(prefix="/budget", tags=["budget"])


def format_amount(cents: int) -> str:
    billions = cents / 100_000_000_000  # cents to billions
    if billions >= 1:
        return f"€{round(billions)}B"
    millions = cents / 100_000_000  # cents to millions
    return f"€{round(millions)}M"


@router.get("/categories", response_model=list[BudgetCategoryResponse])
async def get_categories(
    year: int = Query(default=2024, ge=2018, le=2025),
    session: AsyncSession = Depends(get_session),
):
    # Get all categories with their items for the given year
    stmt = (
        select(
            BudgetCategory.id,
            BudgetCategory.name,
            BudgetCategory.icon,
            BudgetCategory.color,
            BudgetCategory.description,
            BudgetCategory.sort_order,
            BudgetItem.amount_cents,
            BudgetItem.examples,
        )
        .join(BudgetItem, BudgetCategory.id == BudgetItem.category_id)
        .where(BudgetItem.year == year)
        .order_by(BudgetCategory.sort_order)
    )

    result = await session.execute(stmt)
    rows = result.all()

    if not rows:
        return []

    total_cents = sum(row.amount_cents for row in rows)

    return [
        BudgetCategoryResponse(
            id=row.id,
            name=row.name,
            percentage=round(row.amount_cents * 100 / total_cents) if total_cents else 0,
            amount=format_amount(row.amount_cents),
            description=row.description,
            examples=row.examples or [],
            color=row.color,
            icon=row.icon,
        )
        for row in rows
    ]
