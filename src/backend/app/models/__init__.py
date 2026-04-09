"""Database models."""
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    """User roles."""

    ADMIN = "admin"
    ANALYST = "analyst"
    GOV_CLIENT = "gov_client"
    CONSUMER = "consumer"


class User(SQLModel, table=True):
    """User model."""

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    role: UserRole = UserRole.CONSUMER
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    subscriptions: List["Subscription"] = Relationship(back_populates="user")
    alerts: List["Alert"] = Relationship(back_populates="user")


class Organization(SQLModel, table=True):
    """Organization model (government agencies, enterprises)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    type: str = Field(default="gov")  # gov, enterprise
    region: Optional[str] = None
    country: str = Field(default="DE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    budget_lines: List["BudgetLine"] = Relationship(back_populates="organization")
    tenders: List["Tender"] = Relationship(back_populates="organization")
    cases: List["Case"] = Relationship(back_populates="organization")


class BudgetLine(SQLModel, table=True):
    """Budget line item."""

    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organization.id")
    year: int = Field(index=True)
    functional_code: Optional[str] = None
    administrative_code: Optional[str] = None
    description: str
    allocated_amount_eur: float
    spent_amount_eur: Optional[float] = None
    source_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    organization: Organization = Relationship(back_populates="budget_lines")


class Supplier(SQLModel, table=True):
    """Supplier/vendor model."""

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    canonical_name: Optional[str] = None  # Normalized for entity resolution
    vat_number: Optional[str] = None
    registration_number: Optional[str] = None
    country: str = Field(default="DE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    awards: List["Award"] = Relationship(back_populates="supplier")
    entity_links: List["EntityLink"] = Relationship(back_populates="supplier")


class Tender(SQLModel, table=True):
    """Procurement tender."""

    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organization.id")
    tender_number: str = Field(unique=True, index=True)
    title: str
    description: Optional[str] = None
    cpv_code: Optional[str] = None  # Common Procurement Vocabulary
    estimated_value_eur: Optional[float] = None
    publication_date: Optional[datetime] = None
    deadline_date: Optional[datetime] = None
    source_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    organization: Organization = Relationship(back_populates="tenders")
    awards: List["Award"] = Relationship(back_populates="tender")


class Award(SQLModel, table=True):
    """Procurement award/contract."""

    id: Optional[int] = Field(default=None, primary_key=True)
    tender_id: int = Field(foreign_key="tender.id")
    supplier_id: int = Field(foreign_key="supplier.id")
    award_date: Optional[datetime] = None
    contract_value_eur: float
    unit_price_eur: Optional[float] = None
    quantity: Optional[float] = None
    planned_completion_date: Optional[datetime] = None
    actual_completion_date: Optional[datetime] = None
    number_of_bids: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    tender: Tender = Relationship(back_populates="awards")
    supplier: Supplier = Relationship(back_populates="awards")


class EntityLink(SQLModel, table=True):
    """Entity resolution link (supplier name variations)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    supplier_id: int = Field(foreign_key="supplier.id")
    variant_name: str = Field(index=True)
    confidence: float = Field(default=1.0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    supplier: Supplier = Relationship(back_populates="entity_links")


class CaseStatus(str, Enum):
    """Case status."""

    DRAFT = "draft"
    OPEN = "open"
    INVESTIGATING = "investigating"
    CLOSED = "closed"
    RECOVERED = "recovered"


class Case(SQLModel, table=True):
    """Anomaly case / potential savings opportunity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organization.id")
    title: str
    description: Optional[str] = None
    score: float = Field(default=0.0, index=True)  # 0-100 anomaly score
    euro_estimate: float = Field(default=0.0, index=True)  # Potential savings €
    risk_tags: Optional[str] = Field(default=None)  # JSON string for SQLite compatibility
    confidence: float = Field(default=0.0)  # 0-1
    status: CaseStatus = CaseStatus.OPEN
    explainability_blob: Optional[str] = Field(default=None)  # JSON string for SQLite
    responsible_parties: Optional[str] = Field(default=None)  # JSON string: list of responsible parties with contacts
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    organization: Organization = Relationship(back_populates="cases")
    evidence: List["CaseEvidence"] = Relationship(back_populates="case")
    recovery_kits: List["RecoveryKit"] = Relationship(back_populates="case")


class CaseEvidence(SQLModel, table=True):
    """Evidence for a case (awards, benchmarks, etc.)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    case_id: int = Field(foreign_key="case.id")
    evidence_type: str  # "award", "benchmark", "comparison"
    data: str = Field(default="{}")  # JSON string for SQLite
    source_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    case: Case = Relationship(back_populates="evidence")


class RecoveryKit(SQLModel, table=True):
    """Recovery kit generated for a case."""

    id: Optional[int] = Field(default=None, primary_key=True)
    case_id: int = Field(foreign_key="case.id")
    file_path: Optional[str] = None  # Path to generated PDF/ZIP
    benchmark_data: str = Field(default="{}")  # JSON string for SQLite
    alternative_suppliers: str = Field(default="[]")  # JSON string for SQLite
    draft_letter: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    case: Case = Relationship(back_populates="recovery_kits")


class Subscription(SQLModel, table=True):
    """User subscription (premium, enterprise, etc.)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    plan: str = Field(default="free")  # free, premium, enterprise
    stripe_subscription_id: Optional[str] = None
    stripe_customer_id: Optional[str] = None
    is_active: bool = True
    started_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None

    # Relationships
    user: User = Relationship(back_populates="subscriptions")


class Alert(SQLModel, table=True):
    """User alert (saved filters)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    name: str
    filters: str = Field(default="{}")  # JSON string for SQLite
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: User = Relationship(back_populates="alerts")


class Invoice(SQLModel, table=True):
    """Invoice (success fee, enterprise, API)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    organization_id: Optional[int] = Field(default=None, foreign_key="organization.id")
    invoice_number: str = Field(unique=True, index=True)
    invoice_type: str  # success_fee, enterprise, api
    amount_eur: float
    savings_realised_eur: Optional[float] = None  # For success fees
    rate_pct: Optional[float] = None  # For success fees
    file_path: Optional[str] = None  # Path to PDF
    status: str = Field(default="draft")  # draft, sent, paid
    created_at: datetime = Field(default_factory=datetime.utcnow)
    paid_at: Optional[datetime] = None


class UnitPriceBenchmark(SQLModel, table=True):
    """Unit price benchmark by category/region/year."""

    id: Optional[int] = Field(default=None, primary_key=True)
    cpv_code: Optional[str] = Field(index=True)
    region: Optional[str] = Field(index=True)
    year: int = Field(index=True)
    unit_price_eur: float
    p25_eur: float
    p50_eur: float
    p75_eur: float
    p95_eur: float
    count: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

