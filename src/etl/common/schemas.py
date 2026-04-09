"""Common schemas for ETL."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BudgetLineSchema(BaseModel):
    """Budget line schema."""

    organization_id: int
    year: int
    functional_code: Optional[str] = None
    administrative_code: Optional[str] = None
    description: str
    allocated_amount_eur: float
    spent_amount_eur: Optional[float] = None
    source_url: Optional[str] = None


class TenderSchema(BaseModel):
    """Tender schema."""

    organization_id: int
    tender_number: str
    title: str
    description: Optional[str] = None
    cpv_code: Optional[str] = None
    estimated_value_eur: Optional[float] = None
    publication_date: Optional[datetime] = None
    deadline_date: Optional[datetime] = None
    source_url: Optional[str] = None


class AwardSchema(BaseModel):
    """Award schema."""

    tender_id: int
    supplier_id: int
    award_date: Optional[datetime] = None
    contract_value_eur: float
    unit_price_eur: Optional[float] = None
    quantity: Optional[float] = None
    planned_completion_date: Optional[datetime] = None
    actual_completion_date: Optional[datetime] = None
    number_of_bids: Optional[int] = None

