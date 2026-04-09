"""Main FastAPI application."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import init_db
from app.routers import (
    auth,
    cases,
    stories,
    recovery,
    benchmarks,
    invoices,
    alerts,
    premium,
    entities,
    billing,
    api_v1,
    responsible_parties,
)

app = FastAPI(
    title="Public Money Mirror API",
    description="API for identifying savings and anomalies in public spending",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(cases.router)
app.include_router(stories.router)
app.include_router(recovery.router)
app.include_router(benchmarks.router)
app.include_router(invoices.router)
app.include_router(alerts.router)
app.include_router(premium.router)
app.include_router(entities.router)
app.include_router(billing.router)
app.include_router(api_v1.router)
app.include_router(responsible_parties.router)


@app.on_event("startup")
def startup_event():
    """Initialize database on startup."""
    init_db()


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "public-money-mirror"}


@app.get("/")
def root():
    """Root endpoint."""
    return {
        "service": "Public Money Mirror API",
        "version": "1.0.0",
        "docs": "/docs",
    }

