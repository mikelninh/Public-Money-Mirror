# System Architecture

## Overview

Public Money Mirror is a microservices-based system with separate backend, ETL, analytics, and frontend components.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
├───────────────────┬───────────────────┬──────────────────────┤
│  Next.js Public  │ Streamlit Admin  │  Mobile (Future)     │
│      Web         │    Dashboard      │                      │
└─────────┬─────────┴──────────┬────────┴──────────────────────┘
          │                    │
          └────────────────────┼────────────────────┐
                               │                    │
┌──────────────────────────────▼────────────────────▼──────────┐
│                    API Gateway (Nginx)                        │
│              Routes: /api → Backend                           │
│                        / → Public Web                        │
│                        /dashboard → Streamlit               │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                    Backend (FastAPI)                         │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │  Auth    │  Cases   │ Recovery │ Billing  │  API v1  │  │
│  │  Router  │  Router  │  Router  │  Router  │  Router  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│                                                              │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Anomaly  │ Entities │Benchmarks│ Stories  │ Recovery │  │
│  │ Service  │ Service  │ Service  │ Service  │ Service  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  PostgreSQL  │  │    Redis     │  │   DuckDB     │        │
│  │  (Production)│  │   (Cache)    │  │  (Analytics) │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ETL Pipeline (Prefect)                    │
│  ┌──────────┬──────────┬──────────┬──────────┐              │
│  │OpenSpend │ Bundesh  │   TED    │ Normalize│              │
│  │  Flow    │  Flow    │  Flow    │  Flow    │              │
│  └──────────┴──────────┴──────────┴──────────┘              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Analytics (Background)                       │
│  ┌──────────┬──────────┬──────────┬──────────┐              │
│  │ Features │Case Rank │ Metrics  │Evaluation│              │
│  │   Engine │  Model   │  Calc    │   Tools   │              │
│  └──────────┴──────────┴──────────┴──────────┘              │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### Backend API (FastAPI)

**Technology**: Python 3.11, FastAPI, SQLModel, Pydantic v2

**Responsibilities**:
- REST API endpoints
- Authentication & authorization (JWT, RBAC)
- Business logic services
- Database ORM operations

**Key Services**:
- `anomaly.py`: Price outliers, bid rotation, time overruns
- `entities.py`: Supplier name matching, VAT resolution
- `benchmarks.py`: Unit price benchmark calculation
- `stories.py`: Narrative generation for public web
- `recovery.py`: Recovery kit PDF generation
- `billing.py`: Stripe integration, invoice generation

### Data Layer

**PostgreSQL**:
- Primary database for production data
- Models: Users, Organizations, Cases, Awards, etc.
- ACID transactions, referential integrity

**Redis**:
- Caching (API responses, computed values)
- Session storage (future)
- Background job queue (Celery)

**DuckDB**:
- Local analytics database
- Fast columnar analytics
- Used for ETL staging and feature engineering

### ETL Pipeline (Prefect)

**Flows**:
- `ingest_openspending.py`: OpenSpending API ingestion
- `ingest_bundeshaushalt.py`: Bundeshaushalt CSV ingestion
- `ingest_ted.py`: EU TED procurement data ingestion

**Process**:
1. Extract from source (API, CSV, etc.)
2. Normalize to common schema
3. Load to DuckDB (staging)
4. Transform and validate
5. Load to PostgreSQL (production)

### Analytics Module

**Feature Engineering**:
- Extract anomaly features (price outliers, competition risk)
- Supplier dependency metrics (HHI)
- Time overrun detection

**Case Ranking**:
- Weighted ensemble model
- Score calculation (0-100)
- EUR potential estimation
- Explainability generation

### Frontend

**Streamlit Dashboard** (Operators & Gov Clients):
- Case management
- Benchmarks viewer
- Recovery kit generator
- Organization management
- Billing/invoice creation

**Next.js Public Web**:
- Homepage with latest stories
- Charts and visualizations
- Premium subscription (Stripe)
- Regional alerts (premium feature)

## Data Flow

### Case Identification Flow

```
1. ETL ingests procurement data → DuckDB
2. Analytics extracts features → Feature vectors
3. Case ranker scores cases → Ranked cases
4. Top cases loaded → PostgreSQL
5. Recovery kits generated → PDF files
6. API exposes cases → Frontend displays
```

### Recovery Kit Generation Flow

```
1. User requests recovery kit for case
2. Backend fetches case + evidence
3. Benchmark service calculates comparisons
4. Entity service finds alternative suppliers
5. Recovery service generates PDF
6. PDF saved, URL returned to user
```

## Deployment

### Docker Compose (Development)

- All services containerized
- Single `docker-compose.yml` orchestrates services
- Volume mounts for hot reload
- Environment variables via `.env`

### Production (Future)

- Kubernetes orchestration
- Separate staging/production environments
- CI/CD pipeline (GitHub Actions)
- Monitoring (Prometheus, Grafana)
- Log aggregation (ELK stack)

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Public Internet                  │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│          Nginx (TLS Termination)         │
│         Rate Limiting, CORS             │
└──────────────────┬──────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
┌───▼───┐    ┌────▼────┐    ┌───▼────┐
│  Web  │    │ Backend │    │Streamlit│
│ (Next)│    │(FastAPI)│    │         │
└───────┘    └────┬────┘    └─────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐   ┌────▼────┐   ┌───▼────┐
│ Postgres│   │ Redis │   │ DuckDB │
│         │   │        │   │        │
└─────────┘   └────────┘   └────────┘
```

## Scalability Considerations

- **Horizontal Scaling**: Backend API stateless, can scale horizontally
- **Caching**: Redis reduces database load
- **Database**: Read replicas for analytics queries
- **ETL**: Prefect flows can scale with workers
- **Frontend**: CDN for static assets

## Monitoring & Observability

**Logging**:
- Structured logging (JSON format)
- Log levels (INFO, WARNING, ERROR)
- Centralized log aggregation (planned)

**Metrics**:
- API response times
- Database query performance
- Case ranking accuracy
- User activity metrics

**Alerts**:
- Service health checks
- Error rate thresholds
- Database connection pool exhaustion

---

**Last Updated**: 2024

