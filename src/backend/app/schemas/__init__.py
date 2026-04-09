"""Pydantic schemas for API requests/responses."""
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models import UserRole, CaseStatus


# Auth schemas
class Token(BaseModel):
    """JWT token response."""

    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    """User creation schema."""

    email: EmailStr
    password: str
    full_name: Optional[str] = None
    role: UserRole = UserRole.CONSUMER


class UserResponse(BaseModel):
    """User response schema."""

    id: int
    email: str
    role: UserRole
    full_name: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Case schemas
class CaseResponse(BaseModel):
    """Case response schema."""

    id: int
    organization_id: int
    title: str
    description: Optional[str] = None
    score: float
    euro_estimate: float
    risk_tags: List[str]
    confidence: float
    status: CaseStatus
    explainability_blob: Optional[Dict[str, Any]] = None
    responsible_parties: Optional[List[Dict[str, Any]]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        orm_mode = True  # For SQLModel compatibility


class CaseListResponse(BaseModel):
    """Case list response with pagination."""

    cases: List[CaseResponse]
    total: int
    limit: int
    offset: int


# Story schemas
class StoryCard(BaseModel):
    """Story card for public web."""

    id: int
    title: str
    lede: str
    what_we_found: str
    why_it_matters: str
    receipts: List[str]  # Source URLs
    confidence: float
    next_steps: Optional[str] = None
    case_id: int
    euro_estimate: float


# Recovery Kit schemas
class RecoveryKitCreate(BaseModel):
    """Request to create recovery kit."""

    include_benchmarks: bool = True
    include_alternatives: bool = True
    include_draft_letter: bool = True


class RecoveryKitResponse(BaseModel):
    """Recovery kit response."""

    id: int
    case_id: int
    file_path: Optional[str] = None
    benchmark_data: Dict[str, Any]
    alternative_suppliers: List[Dict[str, Any]]
    draft_letter: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Benchmark schemas
class BenchmarkRequest(BaseModel):
    """Benchmark query parameters."""

    cpv_code: Optional[str] = None
    region: Optional[str] = None
    year: Optional[int] = None


class BenchmarkResponse(BaseModel):
    """Benchmark response."""

    cpv_code: Optional[str] = None
    region: Optional[str] = None
    year: int
    unit_price_eur: float
    p25_eur: float
    p50_eur: float
    p75_eur: float
    p95_eur: float
    count: int

    class Config:
        from_attributes = True


# Invoice schemas
class SuccessFeeInvoice(BaseModel):
    """Success fee invoice creation."""

    org_id: int
    savings_realised_eur: float
    rate_pct: float


class InvoiceResponse(BaseModel):
    """Invoice response."""

    id: int
    invoice_number: str
    invoice_type: str
    amount_eur: float
    savings_realised_eur: Optional[float] = None
    rate_pct: Optional[float] = None
    file_path: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Alert schemas
class AlertCreate(BaseModel):
    """Alert creation."""

    name: str
    filters: Dict[str, Any]  # Region, category, min_score, etc.


class AlertResponse(BaseModel):
    """Alert response."""

    id: int
    name: str
    filters: Dict[str, Any]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

