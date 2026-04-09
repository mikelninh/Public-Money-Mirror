"""Seed synthetic data for development."""
import sys
import os
import json
from datetime import datetime, timedelta
import random

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src', 'backend'))

from sqlmodel import Session, create_engine
from app.models import (
    User, Organization, BudgetLine, Supplier, Tender, Award,
    Case, CaseEvidence, UnitPriceBenchmark, EntityLink, Subscription,
    UserRole, CaseStatus
)
from app.config import settings
from app.utils.security import get_password_hash

# Create engine
engine = create_engine(settings.database_url, echo=False)

# Initialize database
from app.db import init_db
init_db()


def seed_data():
    """Seed synthetic data."""
    with Session(engine) as session:
        # Create admin user
        admin = User(
            email="admin@pmm.local",
            hashed_password=get_password_hash("admin123"),
            role=UserRole.ADMIN,
            full_name="Admin User",
        )
        session.add(admin)

        # Create analyst user
        analyst = User(
            email="analyst@pmm.local",
            hashed_password=get_password_hash("analyst123"),
            role=UserRole.ANALYST,
            full_name="Analyst User",
        )
        session.add(analyst)

        # Create organizations
        orgs = [
            Organization(name="Federal Ministry of Finance", type="gov", region="Federal", country="DE"),
            Organization(name="Berlin City Council", type="gov", region="Berlin", country="DE"),
            Organization(name="Bavaria State Government", type="gov", region="Bavaria", country="DE"),
        ]
        for org in orgs:
            session.add(org)

        session.commit()
        session.refresh(admin)
        session.refresh(analyst)
        for org in orgs:
            session.refresh(org)

        # Create suppliers
        suppliers = []
        supplier_names = [
            "TechSolutions GmbH", "BuildCorp AG", "ServicesPlus Ltd",
            "InfraBuild GmbH", "ConsultExperts AG", "DataSystems GmbH",
            "ConstructionCo Ltd", "ITServices AG", "MaintenancePro GmbH",
            "SupplyChain Solutions", "LogisticsHub GmbH", "EnergySystems AG",
        ]
        for name in supplier_names:
            supplier = Supplier(
                name=name,
                canonical_name=name.lower().replace(" ", "").replace(".", ""),
                vat_number=f"DE{random.randint(100000000, 999999999)}",
                country="DE",
            )
            suppliers.append(supplier)
            session.add(supplier)

        session.commit()
        for supplier in suppliers:
            session.refresh(supplier)

        # Create budget lines
        budget_lines = []
        for org in orgs:
            for year in [2023, 2024]:
                for i in range(20):
                    budget_line = BudgetLine(
                        organization_id=org.id,
                        year=year,
                        functional_code=f"F{random.randint(10, 99)}",
                        administrative_code=f"A{random.randint(100, 999)}",
                        description=f"Budget line {i+1} for {org.name}",
                        allocated_amount_eur=random.uniform(10000, 1000000),
                        spent_amount_eur=random.uniform(8000, 950000),
                        source_url=f"https://example.com/budget/{org.id}/{year}/{i}",
                    )
                    budget_lines.append(budget_line)
                    session.add(budget_line)

        session.commit()

        # Create tenders
        tenders = []
        cpv_codes = ["45200000", "45300000", "48000000", "50000000", "72000000"]
        for org in orgs:
            for i in range(50):
                tender = Tender(
                    organization_id=org.id,
                    tender_number=f"T{org.id}-{i+1:04d}",
                    title=f"Tender {i+1} for {org.name}",
                    description=f"Procurement tender description {i+1}",
                    cpv_code=random.choice(cpv_codes),
                    estimated_value_eur=random.uniform(50000, 500000),
                    publication_date=datetime.now() - timedelta(days=random.randint(1, 365)),
                    deadline_date=datetime.now() + timedelta(days=random.randint(1, 90)),
                    source_url=f"https://example.com/tender/{org.id}/{i}",
                )
                tenders.append(tender)
                session.add(tender)

        session.commit()
        for tender in tenders:
            session.refresh(tender)

        # Create awards
        awards = []
        for tender in tenders[:200]:  # Create awards for first 200 tenders
            num_bids = random.randint(1, 8)
            unit_price = random.uniform(100, 10000)
            quantity = random.uniform(1, 100)
            contract_value = unit_price * quantity

            award = Award(
                tender_id=tender.id,
                supplier_id=random.choice(suppliers).id,
                award_date=tender.publication_date + timedelta(days=random.randint(30, 90)) if tender.publication_date else None,
                contract_value_eur=contract_value,
                unit_price_eur=unit_price,
                quantity=quantity,
                planned_completion_date=tender.deadline_date + timedelta(days=random.randint(30, 180)) if tender.deadline_date else None,
                actual_completion_date=None,
                number_of_bids=num_bids,
            )
            awards.append(award)
            session.add(award)

        session.commit()
        for award in awards:
            session.refresh(award)

        # Create cases (anomalies)
        cases = []
        risk_tags_options = ["price_anomaly", "low_competition", "single_bidder", "supplier_concentration", "delivery_risk"]
        for org in orgs:
            for i in range(10):
                score = random.uniform(50, 95)
                euro_estimate = random.uniform(50000, 500000)
                num_tags = random.randint(1, 3)
                risk_tags = random.sample(risk_tags_options, num_tags)
                risk_tags_str = json.dumps(risk_tags)

                explainability_blob = {
                    "top_features": [
                        {"feature": "price_outlier_score", "value": random.uniform(60, 90), "contribution": random.uniform(20, 35)},
                        {"feature": "competition_risk_score", "value": random.uniform(40, 80), "contribution": random.uniform(10, 25)},
                    ],
                    "rationale": f"High anomaly score due to price outliers and low competition",
                }
                
                case = Case(
                    organization_id=org.id,
                    title=f"Potential savings case {i+1} for {org.name}",
                    description=f"Identified potential anomaly in procurement",
                    score=score,
                    euro_estimate=euro_estimate,
                    risk_tags=risk_tags_str,
                    confidence=score / 100.0,
                    status=CaseStatus.OPEN,
                    explainability_blob=json.dumps(explainability_blob),
                )
                cases.append(case)
                session.add(case)

        session.commit()
        for case in cases:
            session.refresh(case)

            # Create evidence for cases
            evidence_data = {
                "award_id": random.choice(awards).id if awards else 1,
                "price_anomaly": True,
                "comparison_data": {"median": 5000, "actual": 8500},
            }
            evidence = CaseEvidence(
                case_id=case.id,
                evidence_type="award",
                data=json.dumps(evidence_data),
                source_url=f"https://example.com/evidence/{case.id}",
            )
            session.add(evidence)

        session.commit()

        # Create unit price benchmarks
        for cpv in cpv_codes:
            for year in [2023, 2024]:
                prices = [a.unit_price_eur for a in awards if a.unit_price_eur is not None]
                if prices:
                    sorted_prices = sorted(prices)
                    n = len(sorted_prices)

                    benchmark = UnitPriceBenchmark(
                        cpv_code=cpv,
                        region="DE",
                        year=year,
                        unit_price_eur=sorted_prices[n // 2],
                        p25_eur=sorted_prices[n // 4],
                        p50_eur=sorted_prices[n // 2],
                        p75_eur=sorted_prices[3 * n // 4],
                        p95_eur=sorted_prices[19 * n // 20] if n > 20 else sorted_prices[-1],
                        count=n,
                    )
                    session.add(benchmark)

        session.commit()

        print("✅ Seed data created successfully!")
        print(f"   - Users: 2 (admin, analyst)")
        print(f"   - Organizations: {len(orgs)}")
        print(f"   - Suppliers: {len(suppliers)}")
        print(f"   - Budget lines: {len(budget_lines)}")
        print(f"   - Tenders: {len(tenders)}")
        print(f"   - Awards: {len(awards)}")
        print(f"   - Cases: {len(cases)}")


if __name__ == "__main__":
    seed_data()

