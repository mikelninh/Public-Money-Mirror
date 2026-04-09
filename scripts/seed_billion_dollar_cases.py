#!/usr/bin/env python3
"""Seed BILLION DOLLAR cases - big impactful numbers!"""
import sys
import os
import json
from datetime import datetime, timedelta
import random

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src', 'backend'))

from sqlmodel import Session, create_engine
from app.models import (
    Organization, BudgetLine, Supplier, Tender, Award,
    Case, CaseEvidence, UnitPriceBenchmark
)
from app.config import settings
from app.db import init_db

# Create engine - use relative path from script location
import os
script_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(script_dir, '..', 'src', 'backend', 'demo.db')
database_url = f"sqlite:///{db_path}"

engine = create_engine(database_url, echo=False)
init_db()

def seed_billion_dollar_cases():
    """Seed BILLION DOLLAR cases with massive impact."""
    with Session(engine) as session:
        # Clear existing cases and evidence first
        from sqlmodel import select
        existing_evidence = session.exec(select(CaseEvidence)).all()
        for evidence in existing_evidence:
            session.delete(evidence)
        existing_cases = session.exec(select(Case)).all()
        for case in existing_cases:
            session.delete(case)
        session.commit()
        
        # Get or create organizations
        orgs = session.exec(select(Organization)).all()
        if not orgs:
            orgs = [
                Organization(name="Federal Ministry of Finance", type="gov", region="Federal", country="DE"),
                Organization(name="Berlin City Council", type="gov", region="Berlin", country="DE"),
                Organization(name="Bavaria State Government", type="gov", region="Bavaria", country="DE"),
                Organization(name="Hamburg City Council", type="gov", region="Hamburg", country="DE"),
                Organization(name="North Rhine-Westphalia State", type="gov", region="NRW", country="DE"),
            ]
            for org in orgs:
                session.add(org)
            session.commit()
            for org in orgs:
                session.refresh(org)
        
        # Get suppliers
        suppliers = session.exec(select(Supplier)).all()
        if not suppliers:
            supplier_names = [
                "TechSolutions GmbH", "BuildCorp AG", "ServicesPlus Ltd",
                "InfraBuild GmbH", "ConsultExperts AG", "DataSystems GmbH",
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
        
        # BILLION DOLLAR CASES
        billion_dollar_cases = [
            {
                "title": "Highway Infrastructure Overpricing - €2.4B Potential Savings",
                "description": "Massive overpricing detected in federal highway construction contracts. Unit prices 85% above international benchmarks. Multiple contracts awarded to single supplier network.",
                "euro_estimate": 2_400_000_000,
                "score": 95.5,
                "risk_tags": ["price_anomaly", "supplier_concentration", "single_bidder"],
                "org": orgs[0] if orgs else None,
            },
            {
                "title": "Healthcare IT System Overpricing - €1.8B Savings Opportunity",
                "description": "National healthcare IT system procurement shows systematic overpricing. Contract awarded with limited competition. Prices 3x higher than similar systems in other EU countries.",
                "euro_estimate": 1_800_000_000,
                "score": 92.3,
                "risk_tags": ["price_anomaly", "low_competition", "delivery_risk"],
                "org": orgs[0] if orgs else None,
            },
            {
                "title": "Berlin Public Transport Expansion - €1.5B Cost Overrun",
                "description": "Berlin metro expansion project shows systematic cost overruns. Original budget €3B, actual costs approaching €4.5B. Multiple change orders without competitive bidding.",
                "euro_estimate": 1_500_000_000,
                "score": 88.7,
                "risk_tags": ["delivery_risk", "price_anomaly", "supplier_concentration"],
                "org": orgs[1] if len(orgs) > 1 else orgs[0],
            },
            {
                "title": "Defense Procurement Overpricing - €1.2B Anomaly",
                "description": "Defense procurement contracts show systematic overpricing. Equipment costs 2-3x higher than market rates. Limited competition due to classified requirements.",
                "euro_estimate": 1_200_000_000,
                "score": 90.1,
                "risk_tags": ["price_anomaly", "low_competition", "single_bidder"],
                "org": orgs[0] if orgs else None,
            },
            {
                "title": "Energy Infrastructure Projects - €950M Savings Potential",
                "description": "Renewable energy infrastructure projects show inflated costs. Multiple projects awarded to same supplier network. Prices 60% above European benchmarks.",
                "euro_estimate": 950_000_000,
                "score": 87.4,
                "risk_tags": ["supplier_concentration", "price_anomaly"],
                "org": orgs[2] if len(orgs) > 2 else orgs[0],
            },
            {
                "title": "Digital Government Services - €850M Overpricing",
                "description": "National digital transformation initiative shows systematic overpricing. Cloud infrastructure costs 4x higher than market rates. Limited vendor competition.",
                "euro_estimate": 850_000_000,
                "score": 89.2,
                "risk_tags": ["price_anomaly", "low_competition"],
                "org": orgs[0] if orgs else None,
            },
            {
                "title": "School Building Program - €720M Cost Anomaly",
                "description": "Federal school building program shows systematic cost overruns. Construction costs 50% above similar projects. Projects concentrated with few contractors.",
                "euro_estimate": 720_000_000,
                "score": 84.6,
                "risk_tags": ["price_anomaly", "supplier_concentration", "delivery_risk"],
                "org": orgs[1] if len(orgs) > 1 else orgs[0],
            },
            {
                "title": "Public Housing Construction - €680M Savings Opportunity",
                "description": "Public housing construction contracts show inflated costs. Unit prices 70% above market benchmarks. Limited competitive bidding process.",
                "euro_estimate": 680_000_000,
                "score": 86.3,
                "risk_tags": ["price_anomaly", "low_competition"],
                "org": orgs[1] if len(orgs) > 1 else orgs[0],
            },
            {
                "title": "Waste Management Contracts - €550M Anomaly",
                "description": "Long-term waste management contracts show systematic overpricing. Contracts awarded with minimal competition. Prices locked in for 20+ years at above-market rates.",
                "euro_estimate": 550_000_000,
                "score": 83.9,
                "risk_tags": ["price_anomaly", "single_bidder", "supplier_concentration"],
                "org": orgs[2] if len(orgs) > 2 else orgs[0],
            },
            {
                "title": "Public Private Partnership Overpricing - €480M Savings",
                "description": "Major PPP infrastructure project shows systematic cost inflation. Initial estimates €2B, actual costs €2.48B. Limited transparency in cost breakdown.",
                "euro_estimate": 480_000_000,
                "score": 81.5,
                "risk_tags": ["delivery_risk", "price_anomaly"],
                "org": orgs[0] if orgs else None,
            },
        ]
        
        cases = []
        for case_data in billion_dollar_cases:
            if not case_data["org"]:
                continue
                
            explainability_blob = {
                "top_features": [
                    {"feature": "price_outlier_score", "value": random.uniform(85, 98), "contribution": random.uniform(30, 45)},
                    {"feature": "competition_risk_score", "value": random.uniform(70, 95), "contribution": random.uniform(20, 35)},
                    {"feature": "supplier_dependency_score", "value": random.uniform(60, 85), "contribution": random.uniform(15, 25)},
                ],
                "rationale": f"Extremely high anomaly score due to massive price outliers (z-score: {random.uniform(5.0, 8.0):.1f}) and systematic lack of competition.",
            }
            
            case = Case(
                organization_id=case_data["org"].id,
                title=case_data["title"],
                description=case_data["description"],
                score=case_data["score"],
                euro_estimate=case_data["euro_estimate"],
                risk_tags=json.dumps(case_data["risk_tags"]),
                confidence=case_data["score"] / 100.0,
                status="open",
                explainability_blob=json.dumps(explainability_blob),
                responsible_parties=None,  # Will be set after case creation
            )
            cases.append(case)
            session.add(case)
        
        session.commit()
        for case in cases:
            session.refresh(case)
            
            # Extract and save responsible parties for each case
            from app.services.responsible_parties import extract_responsible_parties
            parties = extract_responsible_parties(session, case)
            case.responsible_parties = json.dumps(parties)
            session.add(case)
        
        session.commit()
        # Evidence creation skipped - focus on responsible parties
        
        total_savings = sum(c.euro_estimate for c in cases)
        print("="*70)
        print("  💰 BILLION DOLLAR CASES CREATED!")
        print("="*70)
        print(f"\n✅ Created {len(cases)} MASSIVE cases")
        print(f"💰 Total Potential Savings: €{total_savings:,.0f}")
        print(f"   That's €{total_savings/1_000_000_000:.2f} BILLION!")
        print(f"\n📋 Top Cases:")
        sorted_cases = sorted(cases, key=lambda x: x.euro_estimate, reverse=True)[:5]
        for i, case in enumerate(sorted_cases, 1):
            print(f"\n   {i}. {case.title}")
            print(f"      💰 €{case.euro_estimate/1_000_000_000:.2f}B | Score: {case.score:.1f}/100")
        print("\n" + "="*70)

if __name__ == "__main__":
    seed_billion_dollar_cases()

