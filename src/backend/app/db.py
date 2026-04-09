"""Database connection and session management."""
from sqlmodel import SQLModel, create_engine, Session
from app.config import settings

# Create engine (use connect_args for SQLite)
connect_args = {"check_same_thread": False} if "sqlite" in settings.database_url else {}
engine = create_engine(settings.database_url, echo=False, connect_args=connect_args)


def init_db() -> None:
    """Initialize database tables."""
    SQLModel.metadata.create_all(engine)


def get_session() -> Session:
    """Get database session."""
    with Session(engine) as session:
        yield session

