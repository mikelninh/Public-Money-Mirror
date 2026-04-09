"""Ingest Bundeshaushalt CSV data flow."""
from prefect import flow, task
import polars as pl
from typing import List
from app.models import BudgetLine, Organization
from sqlmodel import Session
from etl.common.io import read_csv_polars


@task
def read_bundeshaushalt_csv(filepath: str) -> pl.DataFrame:
    """Read Bundeshaushalt CSV file."""
    df = read_csv_polars(filepath)
    return df


@task
def normalize_bundeshaushalt(df: pl.DataFrame, org_id: int) -> List[BudgetLine]:
    """Normalize Bundeshaushalt data to BudgetLine format."""
    budget_lines = []
    for row in df.iter_rows(named=True):
        budget_line = BudgetLine(
            organization_id=org_id,
            year=row.get("year", 2024),
            functional_code=row.get("functional_code"),
            administrative_code=row.get("administrative_code"),
            description=row.get("description", ""),
            allocated_amount_eur=float(row.get("allocated", 0.0)),
            spent_amount_eur=float(row.get("spent", 0.0)) if row.get("spent") else None,
            source_url=row.get("source_url"),
        )
        budget_lines.append(budget_line)
    return budget_lines


@flow
def ingest_bundeshaushalt_flow(organization_id: int, csv_path: str):
    """Main flow to ingest Bundeshaushalt CSV."""
    # Read CSV
    df = read_bundeshaushalt_csv(csv_path)

    # Normalize
    budget_lines = normalize_bundeshaushalt(df, org_id)

    return budget_lines

