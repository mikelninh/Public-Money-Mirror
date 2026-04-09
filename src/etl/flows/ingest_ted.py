"""Ingest TED (Tenders Electronic Daily) data flow."""
from prefect import flow, task
import polars as pl
from typing import List
from app.models import Tender, Award, Supplier, Organization
from datetime import datetime
from etl.common.io import read_csv_polars


@task
def read_ted_csv(filepath: str) -> pl.DataFrame:
    """Read TED CSV file."""
    df = read_csv_polars(filepath)
    return df


@task
def normalize_ted_tenders(df: pl.DataFrame, org_id: int) -> List[Tender]:
    """Normalize TED data to Tender format."""
    tenders = []
    for row in df.iter_rows(named=True):
        tender = Tender(
            organization_id=org_id,
            tender_number=row.get("tender_number", ""),
            title=row.get("title", ""),
            description=row.get("description"),
            cpv_code=row.get("cpv_code"),
            estimated_value_eur=float(row.get("estimated_value", 0.0)) if row.get("estimated_value") else None,
            publication_date=datetime.fromisoformat(row["publication_date"]) if row.get("publication_date") else None,
            deadline_date=datetime.fromisoformat(row["deadline_date"]) if row.get("deadline_date") else None,
            source_url=row.get("source_url"),
        )
        tenders.append(tender)
    return tenders


@flow
def ingest_ted_flow(organization_id: int, csv_path: str):
    """Main flow to ingest TED data."""
    # Read CSV
    df = read_ted_csv(csv_path)

    # Normalize
    tenders = normalize_ted_tenders(df, organization_id)

    return tenders

