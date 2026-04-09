"""Entity resolution services (supplier name matching, VAT/ID stitching)."""
from typing import List, Dict, Optional
from rapidfuzz import fuzz, process
from sqlmodel import Session, select
from app.models import Supplier, EntityLink
import re


def normalize_name(name: str) -> str:
    """Normalize supplier name for matching."""
    # Lowercase
    name = name.lower()
    # Remove common suffixes
    suffixes = [" gmbh", " ag", " ltd", " inc", " llc", " kg", " e.v.", " e.v", " mbh"]
    for suffix in suffixes:
        if name.endswith(suffix):
            name = name[: -len(suffix)].strip()
    # Remove punctuation
    name = re.sub(r"[^\w\s]", "", name)
    # Normalize whitespace
    name = re.sub(r"\s+", " ", name).strip()
    return name


def find_canonical_supplier(
    session: Session,
    name: str,
    vat_number: Optional[str] = None,
    registration_number: Optional[str] = None,
    threshold: float = 0.85,
) -> Optional[Supplier]:
    """Find canonical supplier by name/VAT matching."""
    normalized = normalize_name(name)

    # First try exact match on normalized canonical name
    suppliers = session.exec(select(Supplier)).all()
    for supplier in suppliers:
        if supplier.canonical_name and normalize_name(supplier.canonical_name) == normalized:
            return supplier

    # Try VAT match
    if vat_number:
        supplier = session.exec(select(Supplier).where(Supplier.vat_number == vat_number)).first()
        if supplier:
            return supplier

    # Try registration number
    if registration_number:
        supplier = session.exec(select(Supplier).where(Supplier.registration_number == registration_number)).first()
        if supplier:
            return supplier

    # Fuzzy match on names
    supplier_names = {s.id: s.name for s in suppliers}
    if not supplier_names:
        return None

    # Use RapidFuzz to find best match
    best_match = process.extractOne(normalized, supplier_names.values(), scorer=fuzz.ratio)
    if best_match and best_match[1] >= threshold * 100:
        # Find supplier ID
        for sid, sname in supplier_names.items():
            if sname == best_match[0]:
                return session.get(Supplier, sid)

    return None


def create_or_link_supplier(
    session: Session,
    name: str,
    vat_number: Optional[str] = None,
    registration_number: Optional[str] = None,
    country: str = "DE",
) -> Supplier:
    """Create new supplier or link to existing canonical supplier."""
    canonical = find_canonical_supplier(session, name, vat_number, registration_number)

    if canonical:
        # Link variant name
        normalized_name = normalize_name(name)
        if normalized_name != normalize_name(canonical.canonical_name or canonical.name):
            # Check if link exists
            existing_link = session.exec(
                select(EntityLink).where(
                    EntityLink.supplier_id == canonical.id,
                    EntityLink.variant_name == normalized_name,
                )
            ).first()
            if not existing_link:
                link = EntityLink(
                    supplier_id=canonical.id,
                    variant_name=normalized_name,
                    confidence=0.9,
                )
                session.add(link)
                session.commit()
        return canonical

    # Create new supplier
    normalized = normalize_name(name)
    supplier = Supplier(
        name=name,
        canonical_name=normalized,
        vat_number=vat_number,
        registration_number=registration_number,
        country=country,
    )
    session.add(supplier)
    session.commit()
    session.refresh(supplier)
    return supplier

