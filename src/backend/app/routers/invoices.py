"""Invoices router."""
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db import get_session
from app.schemas import SuccessFeeInvoice, InvoiceResponse
from app.services.billing import create_success_fee_invoice
from app.auth import require_role
from app.models import UserRole
from app.models import User

router = APIRouter(prefix="/invoices", tags=["invoices"])


@router.post("/success_fee", response_model=InvoiceResponse)
def create_success_fee_invoice_endpoint(
    invoice_data: SuccessFeeInvoice,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_role(UserRole.ADMIN, UserRole.ANALYST)),
):
    """Create success fee invoice."""
    invoice = create_success_fee_invoice(
        session,
        invoice_data.org_id,
        invoice_data.savings_realised_eur,
        invoice_data.rate_pct,
    )
    return InvoiceResponse.model_validate(invoice)

