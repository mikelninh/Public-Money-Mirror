"""Ingest OpenSpending data flow."""
from prefect import flow, task
import httpx
from typing import List, Dict
from app.models import BudgetLine, Organization
from sqlmodel import Session
from etl.common.constants import OPENSPENDING_API_BASE


@task
def fetch_openspending_data(dataset: str, drilldowns: List[str] = None, years: List[int] = None) -> List[Dict]:
    """Fetch data from OpenSpending API."""
    if drilldowns is None:
        drilldowns = ["functional", "administrative"]
    if years is None:
        years = [2023, 2024]

    # Simplified: In production, would call actual API
    # For now, return empty list (will be populated by seed data)
    return []


@task
def normalize_budget_lines(raw_data: List[Dict], org_id: int) -> List[BudgetLine]:
    """Normalize OpenSpending data to BudgetLine format."""
    budget_lines = []
    for item in raw_data:
        budget_line = BudgetLine(
            organization_id=org_id,
            year=item.get("year", 2024),
            functional_code=item.get("functional_code"),
            administrative_code=item.get("administrative_code"),
            description=item.get("description", ""),
            allocated_amount_eur=item.get("amount", 0.0),
            spent_amount_eur=item.get("spent", None),
            source_url=item.get("source_url"),
        )
        budget_lines.append(budget_line)
    return budget_lines


@flow
def ingest_openspending_flow(organization_id: int, dataset: str = "bundeshaushalt"):
    """Main flow to ingest OpenSpending data."""
    # Fetch data
    raw_data = fetch_openspending_data(dataset)

    # Normalize
    budget_lines = normalize_budget_lines(raw_data, organization_id)

    # Load to database (would be done in loader)
    return budget_lines

