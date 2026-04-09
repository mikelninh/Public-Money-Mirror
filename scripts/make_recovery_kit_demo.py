"""Generate demo recovery kit from top case."""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from sqlmodel import Session, select
from app.models import Case
from app.services.recovery import generate_recovery_kit
from app.db import engine

def create_demo_kit():
    """Create demo recovery kit from top case."""
    with Session(engine) as session:
        # Get top case by score
        query = select(Case).order_by(Case.score.desc(), Case.euro_estimate.desc()).limit(1)
        top_case = session.exec(query).first()

        if not top_case:
            print("❌ No cases found. Run seed_synthetic_data.py first.")
            return

        print(f"📦 Generating recovery kit for case: {top_case.title}")
        print(f"   Score: {top_case.score:.1f}")
        print(f"   EUR Estimate: €{top_case.euro_estimate:,.0f}")

        # Generate kit
        kit = generate_recovery_kit(session, top_case)

        print(f"✅ Recovery kit generated!")
        print(f"   File: {kit.file_path}")
        print(f"   Benchmarks: {len(kit.benchmark_data)} items")
        print(f"   Alternative Suppliers: {len(kit.alternative_suppliers)}")
        print(f"   Draft Letter: {'Yes' if kit.draft_letter else 'No'}")

if __name__ == "__main__":
    create_demo_kit()

