# Public Money Mirror

**Follow the flow. Every euro has a story.**

Public Money Mirror identifies savings and anomalies in public spending, powers success-fee recoveries for governments, and offers enterprise/API licenses and freemium consumer subscriptions.

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.11+ (for local development)
- Node.js 20+ (for web frontend)

### Development Setup

1. **Clone and setup**:
```bash
git clone <repo-url>
cd public-money-mirror
cp .env.sample .env
# Edit .env with your configuration
```

2. **Start services**:
```bash
make dev
```

This starts:
- Backend API at `http://localhost:8000`
- Streamlit dashboard at `http://localhost:8501`
- Next.js public web at `http://localhost:3000`
- Postgres database at `localhost:5432`
- Redis at `localhost:6379`
- Nginx proxy at `http://localhost:80`

3. **Seed data**:
```bash
make seed
```

4. **Generate demo recovery kit**:
```bash
make demo_kit
```

### API Endpoints

#### Health & Auth
- `GET /health` - Health check
- `POST /auth/login` - Login (returns JWT)
- `POST /auth/signup` - Signup
- `GET /auth/me` - Current user info

#### Data & Insights
- `GET /cases?limit=&min_score=&min_euro=` - List ranked cases
- `GET /cases/{id}` - Get case details
- `GET /cases/{id}/evidence` - Get case evidence
- `GET /stories/latest?limit=3` - Get latest story cards
- `GET /benchmarks/unit_price?cpv=&region=&year=` - Get benchmarks
- `GET /entities/search?q=` - Search entities

#### Recovery & Billing
- `POST /recovery_kits/{case_id}` - Generate recovery kit
- `POST /invoices/success_fee` - Create success fee invoice

#### Consumer
- `GET /alerts` - User's alerts
- `POST /alerts` - Create alert
- `GET /premium/status` - Premium subscription status

#### Enterprise/API
- `GET /api/v1/risk_score?supplier_id=` - Supplier risk score
- `GET /api/v1/cases/export.csv` - Export cases CSV

### Sample cURL

```bash
# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@pmm.local&password=admin123"

# Get cases
curl http://localhost:8000/cases?limit=10&min_score=50

# Get latest stories
curl http://localhost:8000/stories/latest?limit=3

# Generate recovery kit (requires auth)
curl -X POST http://localhost:8000/recovery_kits/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"include_benchmarks": true, "include_alternatives": true}'
```

### Makefile Commands

- `make dev` - Start development environment
- `make test` - Run tests
- `make fmt` - Format code (black, ruff)
- `make lint` - Lint code (ruff, mypy)
- `make seed` - Seed synthetic data
- `make demo_kit` - Generate demo recovery kit
- `make clean` - Clean up containers
- `make build` - Build Docker images

### Environment Variables

See `.env.sample` for all configuration options. Key variables:

- `DATABASE_URL` - Postgres connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - JWT secret key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

### User Roles

- `admin` - Full access
- `analyst` - Can create cases, recovery kits, invoices
- `gov_client` - Read-only + request recovery kits
- `consumer` - Public site access + premium alerts

### Project Structure

```
src/
├── backend/          # FastAPI backend
│   └── app/
│       ├── models/   # SQLModel ORM models
│       ├── schemas/  # Pydantic schemas
│       ├── routers/  # API routes
│       └── services/ # Business logic
├── etl/              # Prefect ETL flows
│   └── flows/        # Data ingestion flows
├── analytics/        # Analytics & ML
│   ├── features/     # Feature engineering
│   └── models/       # Case ranking models
├── frontend_streamlit/  # Operator dashboard
└── web_public/       # Next.js public site

scripts/              # Utility scripts
docs/                 # Documentation
deploy/               # Docker & deployment configs
```

## Features

### Anomaly Detection

- **Price outliers**: Robust z-score using MAD (Median Absolute Deviation)
- **Single-bidder risk**: Detects low-competition tenders
- **Bid rotation**: Collusion heuristic using n-gram entropy
- **Time overruns**: Planned vs. actual delivery dates
- **Supplier dependency**: HHI (Herfindahl-Hirschman Index) concentration

### Case Ranking

- Weighted ensemble scoring (0-100)
- EUR potential estimation with conservative shrinkage
- Explainability blob with top features and rationale
- Risk tags for quick categorization

### Recovery Kits

- Benchmark analysis with percentile breakdowns
- Alternative supplier suggestions
- Draft renegotiation letters
- PDF export for government clients

### Monetization

1. **Success Fees (B2G)**: 15-25% of realised savings
2. **Enterprise/API Licenses (B2B)**: Access to risk scores, CSV exports
3. **Premium Subscriptions (B2C)**: €4.99/month for alerts & dossiers

## Data Sources

- **OpenSpending (Germany)**: Budget aggregates
- **Bundeshaushalt**: Federal budget CSVs
- **EU TED**: Public procurement notices (Tenders Electronic Daily)

## Testing

```bash
make test
```

Runs pytest with coverage for:
- Unit tests (anomaly detection, entity resolution)
- API tests (FastAPI TestClient)
- Integration tests

## CI/CD

GitHub Actions runs on PR:
- Tests
- Linting (ruff, black)
- Type checking (mypy)

On `main` branch:
- Builds and pushes Docker images

## Documentation

- `docs/README.md` - General documentation
- `docs/PILOT_MOU_TEMPLATE.md` - Success-fee pilot MoU template
- `docs/SUCCESS_FEE_TERMS.md` - Success fee terms & definitions
- `docs/PRIVACY_SECURITY.md` - Privacy & security controls
- `docs/ARCHITECTURE.md` - System architecture diagrams

## License

Proprietary - All rights reserved

## Support

For questions or issues, contact: support@publicmoneymirror.com
# Public-Money-Mirror
