"""Billing services (Stripe, invoices)."""
from typing import Optional, Dict, Any
from sqlmodel import Session
from app.models import Invoice, Organization
from app.config import settings
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
import os
from datetime import datetime
import stripe

if settings.stripe_secret_key:
    stripe.api_key = settings.stripe_secret_key


def create_success_fee_invoice(
    session: Session,
    org_id: int,
    savings_realised_eur: float,
    rate_pct: float,
) -> Invoice:
    """Create success fee invoice."""
    organization = session.get(Organization, org_id)
    if not organization:
        raise ValueError(f"Organization {org_id} not found")

    amount_eur = savings_realised_eur * (rate_pct / 100.0)
    invoice_number = f"SF-{datetime.now().strftime('%Y%m%d')}-{org_id:04d}"

    invoice = Invoice(
        organization_id=org_id,
        invoice_number=invoice_number,
        invoice_type="success_fee",
        amount_eur=amount_eur,
        savings_realised_eur=savings_realised_eur,
        rate_pct=rate_pct,
        status="draft",
    )
    session.add(invoice)
    session.commit()
    session.refresh(invoice)

    # Generate PDF
    filepath = generate_invoice_pdf(invoice, organization)
    invoice.file_path = filepath
    session.add(invoice)
    session.commit()
    session.refresh(invoice)

    return invoice


def generate_invoice_pdf(invoice: Invoice, organization: Organization, output_dir: str = "./invoices") -> str:
    """Generate invoice PDF."""
    os.makedirs(output_dir, exist_ok=True)
    filename = f"{invoice.invoice_number}.pdf"
    filepath = os.path.join(output_dir, filename)

    doc = SimpleDocTemplate(filepath, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Header
    story.append(Paragraph("Public Money Mirror", styles["Heading1"]))
    story.append(Paragraph("Invoice", styles["Heading2"]))
    story.append(Spacer(1, 0.3 * inch))

    # Invoice Details
    invoice_data = [
        ["Invoice Number:", invoice.invoice_number],
        ["Invoice Type:", invoice.invoice_type.replace("_", " ").title()],
        ["Date:", invoice.created_at.strftime("%Y-%m-%d")],
        ["Organization:", organization.name],
    ]

    if invoice.savings_realised_eur:
        invoice_data.extend([
            ["Savings Realised:", f"€{invoice.savings_realised_eur:,.2f}"],
            ["Rate:", f"{invoice.rate_pct}%"],
        ])

    invoice_data.append(["Amount Due:", f"€{invoice.amount_eur:,.2f}"])

    invoice_table = Table(invoice_data, colWidths=[3 * inch, 3 * inch])
    invoice_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), "lightblue"),
        ("TEXTCOLOR", (0, 0), (-1, 0), "black"),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(invoice_table)
    story.append(Spacer(1, 0.3 * inch))

    # Terms
    story.append(Paragraph("Payment Terms", styles["Heading3"]))
    story.append(Paragraph("Payment due within 30 days.", styles["Normal"]))

    doc.build(story)
    return filepath


def create_stripe_checkout_session(customer_email: str, price_id: str) -> Optional[Dict[str, Any]]:
    """Create Stripe checkout session for premium subscription."""
    if not settings.stripe_secret_key:
        return None

    try:
        session = stripe.checkout.Session.create(
            customer_email=customer_email,
            payment_method_types=["card"],
            line_items=[{"price": price_id, "quantity": 1}],
            mode="subscription",
            success_url=f"{settings.backend_url}/premium/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{settings.backend_url}/premium/cancel",
        )
        return {"session_id": session.id, "url": session.url}
    except Exception as e:
        print(f"Stripe error: {e}")
        return None


def handle_stripe_webhook(payload: Dict[str, Any], signature: str) -> bool:
    """Handle Stripe webhook."""
    if not settings.stripe_webhook_secret:
        return False

    try:
        event = stripe.Webhook.construct_event(payload, signature, settings.stripe_webhook_secret)
        # Handle subscription events
        if event["type"] == "checkout.session.completed":
            # Update user subscription
            pass
        return True
    except Exception as e:
        print(f"Stripe webhook error: {e}")
        return False

