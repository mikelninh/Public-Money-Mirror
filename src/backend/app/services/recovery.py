"""Recovery kit generation services."""
from typing import Dict, Any, List
from sqlmodel import Session, select
from app.models import Case, CaseEvidence, RecoveryKit, Supplier, Award, Tender, UnitPriceBenchmark
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from io import BytesIO
import os
from datetime import datetime


def generate_recovery_kit(session: Session, case: Case, output_dir: str = "./recovery_kits") -> RecoveryKit:
    """Generate recovery kit for a case."""
    os.makedirs(output_dir, exist_ok=True)

    # Get benchmark data
    evidence = session.exec(select(CaseEvidence).where(CaseEvidence.case_id == case.id)).all()
    benchmark_data = {}
    for e in evidence:
        if e.evidence_type == "benchmark":
            benchmark_data.update(e.data)

    # Find alternative suppliers (simplified - would need proper category matching)
    awards = session.exec(select(Award).limit(100)).all()
    alternative_suppliers = []
    seen_suppliers = set()

    for award in awards[:10]:  # Get top 10 as alternatives
        if award.supplier_id not in seen_suppliers:
            supplier = session.get(Supplier, award.supplier_id)
            if supplier:
                alternative_suppliers.append({
                    "name": supplier.name,
                    "vat_number": supplier.vat_number,
                    "country": supplier.country,
                })
                seen_suppliers.add(award.supplier_id)

    # Generate draft letter
    draft_letter = generate_draft_letter(case, benchmark_data)

    # Generate PDF
    filename = f"recovery_kit_{case.id}_{datetime.now().strftime('%Y%m%d')}.pdf"
    filepath = os.path.join(output_dir, filename)
    create_recovery_kit_pdf(case, benchmark_data, alternative_suppliers, draft_letter, filepath)

    # Create recovery kit record
    recovery_kit = RecoveryKit(
        case_id=case.id,
        file_path=filepath,
        benchmark_data=benchmark_data,
        alternative_suppliers=alternative_suppliers,
        draft_letter=draft_letter,
    )
    session.add(recovery_kit)
    session.commit()
    session.refresh(recovery_kit)

    return recovery_kit


def generate_draft_letter(case: Case, benchmark_data: Dict[str, Any]) -> str:
    """Generate draft renegotiation letter."""
    letter_text = f"""
Dear Procurement Team,

Subject: Request for Review - Potential Cost Savings Identified

We have identified a potential savings opportunity in the procurement case "{case.title}".

Estimated Potential Savings: €{case.euro_estimate:,.0f}
Confidence Level: {case.confidence * 100:.0f}%

Risk Indicators Identified:
{chr(10).join(f"- {tag}" for tag in case.risk_tags[:5])}

Based on our benchmark analysis, we recommend:
1. Review of contract terms and pricing
2. Consideration of alternative suppliers
3. Renegotiation of current agreements where possible

We are available to discuss this case in detail and provide additional evidence as needed.

Best regards,
Public Money Mirror Team
"""
    return letter_text.strip()


def create_recovery_kit_pdf(
    case: Case,
    benchmark_data: Dict[str, Any],
    alternative_suppliers: List[Dict[str, Any]],
    draft_letter: str,
    filepath: str,
) -> None:
    """Create PDF recovery kit."""
    doc = SimpleDocTemplate(filepath, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Title
    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Heading1"],
        fontSize=18,
        textColor="darkblue",
        spaceAfter=30,
    )
    story.append(Paragraph("Recovery Kit", title_style))
    story.append(Paragraph(f"Case: {case.title}", styles["Heading2"]))
    story.append(Spacer(1, 0.2 * inch))

    # Summary
    story.append(Paragraph("Summary", styles["Heading2"]))
    summary_data = [
        ["Estimated Savings:", f"€{case.euro_estimate:,.0f}"],
        ["Confidence:", f"{case.confidence * 100:.0f}%"],
        ["Score:", f"{case.score:.1f}/100"],
    ]
    summary_table = Table(summary_data, colWidths=[3 * inch, 3 * inch])
    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), "lightblue"),
        ("TEXTCOLOR", (0, 0), (-1, 0), "black"),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("BACKGROUND", (1, 0), (1, -1), "white"),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 0.3 * inch))

    # Risk Tags
    if case.risk_tags:
        story.append(Paragraph("Risk Indicators", styles["Heading2"]))
        for tag in case.risk_tags:
            story.append(Paragraph(f"• {tag}", styles["Normal"]))
        story.append(Spacer(1, 0.2 * inch))

    # Benchmark Data
    if benchmark_data:
        story.append(Paragraph("Benchmark Analysis", styles["Heading2"]))
        # Add benchmark table if available
        story.append(Paragraph(str(benchmark_data), styles["Normal"]))
        story.append(Spacer(1, 0.2 * inch))

    # Alternative Suppliers
    if alternative_suppliers:
        story.append(Paragraph("Alternative Suppliers", styles["Heading2"]))
        alt_data = [["Name", "VAT", "Country"]]
        for sup in alternative_suppliers:
            alt_data.append([
                sup.get("name", ""),
                sup.get("vat_number", ""),
                sup.get("country", ""),
            ])
        alt_table = Table(alt_data, colWidths=[3 * inch, 2 * inch, 1 * inch])
        alt_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), "lightgray"),
            ("TEXTCOLOR", (0, 0), (-1, 0), "black"),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ]))
        story.append(alt_table)
        story.append(Spacer(1, 0.3 * inch))

    # Draft Letter
    story.append(Paragraph("Draft Letter", styles["Heading2"]))
    story.append(Paragraph(draft_letter.replace("\n", "<br/>"), styles["Normal"]))

    doc.build(story)

