"""Common I/O utilities for ETL."""
import pandas as pd
import polars as pl
from typing import Optional
import duckdb


def read_csv_polars(filepath: str) -> pl.DataFrame:
    """Read CSV using Polars."""
    return pl.read_csv(filepath)


def read_csv_pandas(filepath: str) -> pd.DataFrame:
    """Read CSV using Pandas."""
    return pd.read_csv(filepath)


def save_to_duckdb(df: pl.DataFrame, table_name: str, db_path: str) -> None:
    """Save DataFrame to DuckDB."""
    conn = duckdb.connect(db_path)
    conn.execute(f"CREATE TABLE IF NOT EXISTS {table_name} AS SELECT * FROM df")
    conn.close()


def load_from_duckdb(table_name: str, db_path: str) -> pl.DataFrame:
    """Load table from DuckDB."""
    conn = duckdb.connect(db_path)
    result = conn.execute(f"SELECT * FROM {table_name}").df()
    conn.close()
    return pl.from_pandas(result)

