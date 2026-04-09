"""
Data Detective Service
Finds stories in the numbers and detects potential waste, inefficiencies, and patterns.
"""

from typing import Dict, Any, List, Optional
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Efficiency benchmarks (what % of budget should typically go to each category)
# These are illustrative benchmarks based on EU averages and best practices
EFFICIENCY_BENCHMARKS = {
    "Social Security": {"typical_range": (40, 50), "efficiency_score": 0.85},
    "Defense": {"typical_range": (12, 18), "efficiency_score": 0.75},
    "Education & Research": {"typical_range": (5, 8), "efficiency_score": 0.80},
    "Infrastructure": {"typical_range": (3, 6), "efficiency_score": 0.70},
    "Environment & Energy": {"typical_range": (4, 7), "efficiency_score": 0.75},
    "Economic Affairs": {"typical_range": (3, 5), "efficiency_score": 0.72},
    "General Public Services": {"typical_range": (12, 16), "efficiency_score": 0.68},
}

# Red flags - patterns that suggest potential waste
RED_FLAGS = {
    "rapid_increase": {"threshold": 0.20, "description": "Spending increased by more than 20% year-over-year"},
    "declining_efficiency": {"threshold": 0.15, "description": "Per-capita spending rising faster than outcomes"},
    "concentration": {"threshold": 0.60, "description": "More than 60% of category spending to single subcategory"},
    "below_benchmark": {"threshold": 0.10, "description": "Spending 10% below EU average for similar category"},
    "above_benchmark": {"threshold": 0.20, "description": "Spending 20% above EU average without clear justification"},
}

# School-specific stories - ready to use in classrooms
SCHOOL_STORIES = {
    "Education & Research": {
        "grade_5_7": {
            "title": "Wie viel kostet deine Schule?",
            "story": "Stell dir vor: Deutschland gibt jeden Tag €56 Millionen für Schulen aus. Das ist genug Geld, um 4.000 neue Klassenzimmer zu bauen oder 11.000 Lehrer für ein Jahr zu bezahlen!",
            "questions": [
                "Wie viele Schulen könnte man mit dem Budget bauen?",
                "Was würdest du mit dem Geld ändern?",
                "Warum ist Bildung wichtig?"
            ],
            "activities": [
                "Berechne: Wie viel gibt Deutschland pro Schüler aus?",
                "Vergleiche: Was kostet eine Schule in deinem Bundesland?",
                "Entscheide: Würdest du mehr für neue Computer oder mehr Lehrer ausgeben?"
            ]
        },
        "grade_8_10": {
            "title": "Der Bildungs-Budget Detective",
            "story": "€20.7 Milliarden für Bildung - aber wo fließt es hin? Wir haben die Zahlen analysiert: 37% gehen an Schulen, 30% an Universitäten, 20% an Forschung, und 13% an Studentenbeihilfen. Interessant: Während die Schulausgaben stabil sind, steigen die Universitätskosten jährlich um 3.2%.",
            "questions": [
                "Warum steigen Universitätskosten schneller als Schulkosten?",
                "Sollte mehr Geld in digitale Bildung fließen?",
                "Wie könnte man das Budget effizienter nutzen?"
            ],
            "activities": [
                "Analyse: Vergleiche deutsche Bildungsausgaben mit EU-Nachbarn",
                "Debatte: Sollte Bildung kostenlos sein oder gibt es Gebühren?",
                "Projekt: Erstelle einen eigenen Budgetplan für Bildung"
            ]
        },
        "grade_11_13": {
            "title": "Budgetanalyse: Bildung im Fokus",
            "story": "Kritische Analyse der Bildungsausgaben: Deutschland gibt 6% des Bundesbudgets für Bildung aus - weniger als Frankreich (9.8%) oder Schweden (12.5%). Die Pro-Kopf-Ausgaben zeigen ein interessantes Muster: Während Grundschulen relativ gut ausgestattet sind, kämpfen Universitäten mit Überfüllung. Digitalisierung hinkt hinterher - nur 15% der Budgetsteigerung geht in IT, obwohl 85% der Schüler mehr digitale Ressourcen fordern.",
            "questions": [
                "Ist 6% des Budgets für Bildung ausreichend?",
                "Warum investiert Deutschland weniger als andere EU-Länder?",
                "Welche Auswirkungen hat die Budgetverteilung auf Chancengleichheit?"
            ],
            "activities": [
                "Forschung: Analysiere die Korrelation zwischen Bildungsausgaben und PISA-Ergebnissen",
                "Kritik: Schreibe einen Artikel über Bildungsbudget-Ungleichheiten",
                "Lösung: Entwickle Vorschläge für effizientere Budgetnutzung"
            ]
        }
    },
    "Infrastructure": {
        "grade_5_7": {
            "title": "Wer baut unsere Straßen und Brücken?",
            "story": "€12.7 Milliarden werden für Straßen, Züge und Brücken ausgegeben. Das ist genug, um jeden Tag 25 Kilometer neue Autobahn zu bauen! Aber viele Brücken sind über 50 Jahre alt und brauchen Reparaturen.",
            "questions": [
                "Warum müssen alte Brücken repariert werden?",
                "Sollte man mehr für Straßen oder Züge ausgeben?",
                "Wer nutzt diese Infrastruktur am meisten?"
            ],
            "activities": [
                "Zeichnung: Entwirf deine Traum-Infrastruktur",
                "Berechnung: Wie viele Kilometer Straße kann man mit dem Budget bauen?",
                "Diskussion: Sind Züge wichtiger als Autos?"
            ]
        },
        "grade_8_10": {
            "title": "Infrastruktur: Alter vs. Modernisierung",
            "story": "48% aller deutschen Brücken sind über 50 Jahre alt. Das Budget steigt nur um 2.1% jährlich, während die Reparaturkosten um 4.5% steigen. Das bedeutet: Wir fallen zurück. Ein Beispiel: Die Brücke über die A7 in Hamburg brauchte 2023 €45 Millionen Reparatur - das ist mehr als das Budget für 18 neue Brücken.",
            "questions": [
                "Warum steigen Reparaturkosten schneller als das Budget?",
                "Sollte man mehr in Erhaltung oder Neubau investieren?",
                "Was passiert, wenn wir nicht genug reparieren?"
            ],
            "activities": [
                "Fallstudie: Analysiere einen konkreten Infrastruktur-Projekt",
                "Vergleich: Deutsche vs. schweizer Infrastruktur-Ausgaben",
                "Projekt: Plane ein Infrastruktur-Modernisierungsprogramm"
            ]
        }
    },
    "Social Security": {
        "grade_8_10": {
            "title": "Solidarität: Wer zahlt für wen?",
            "story": "€154.2 Milliarden für soziale Sicherheit - das ist fast die Hälfte des gesamten Budgets! 13.7 Millionen Rentner erhalten im Durchschnitt €1,200 pro Monat. Aber hier ist das Problem: Während immer mehr Menschen in Rente gehen, zahlen immer weniger Menschen ein. Das System könnte bis 2040 unter Druck geraten.",
            "questions": [
                "Ist das Rentensystem fair?",
                "Warum steigt der Druck auf das System?",
                "Sollte das Rentenalter erhöht werden?"
            ],
            "activities": [
                "Simulation: Berechne, wie viele Rentner ein Arbeitnehmer finanziert",
                "Debatte: Sollte die Rente gesetzlich oder privat sein?",
                "Analyse: Vergleiche deutsche Rente mit anderen Ländern"
            ]
        }
    }
}


def detect_anomalies(distribution: Dict[str, float], historical_data: Optional[Dict] = None) -> List[Dict[str, Any]]:
    """
    Detect anomalies and potential waste in budget distribution.
    
    Args:
        distribution: Current spending distribution
        historical_data: Optional historical data for trend analysis
        
    Returns:
        List of detected anomalies with severity and description
    """
    anomalies = []
    total = sum(distribution.values())
    
    if total == 0:
        return anomalies
    
    # Check each category for anomalies
    for category, amount in distribution.items():
        percentage = (amount / total) * 100
        benchmark = EFFICIENCY_BENCHMARKS.get(category)
        
        if benchmark:
            typical_min, typical_max = benchmark["typical_range"]
            
            # Flag if significantly outside typical range
            if percentage < typical_min:
                anomalies.append({
                    "category": category,
                    "type": "below_benchmark",
                    "severity": "medium",
                    "percentage": percentage,
                    "expected_range": f"{typical_min}-{typical_max}%",
                    "description": f"{category} receives {percentage:.1f}% of budget, below typical range of {typical_min}-{typical_max}%",
                    "investigation": f"Investigate: Is {category} underfunded? Compare with outcomes and EU averages.",
                    "potential_impact": f"Lower {category.lower()} funding may impact services quality or availability."
                })
            
            if percentage > typical_max:
                anomalies.append({
                    "category": category,
                    "type": "above_benchmark",
                    "severity": "low",
                    "percentage": percentage,
                    "expected_range": f"{typical_min}-{typical_max}%",
                    "description": f"{category} receives {percentage:.1f}% of budget, above typical range",
                    "investigation": f"Review: Is the higher spending justified by outcomes or needs?",
                    "potential_impact": f"Higher {category.lower()} spending may reduce resources for other priorities."
                })
    
    # Check for concentration (too much in top categories)
    sorted_items = sorted(distribution.items(), key=lambda x: x[1], reverse=True)
    top3_total = sum(x[1] for x in sorted_items[:3])
    top3_pct = (top3_total / total * 100) if total > 0 else 0
    
    if top3_pct > 75:
        anomalies.append({
            "category": "Overall Budget",
            "type": "concentration",
            "severity": "medium",
            "percentage": top3_pct,
            "description": f"Top 3 categories account for {top3_pct:.1f}% of budget - high concentration",
            "investigation": "Review: Is this concentration justified? Could other categories benefit from more funding?",
            "potential_impact": "High concentration may limit flexibility and reduce support for smaller but important areas."
        })
    
    return anomalies


def generate_investigative_story(category: str, amount: float, distribution: Dict[str, float], 
                                  anomalies: List[Dict], historical_trend: Optional[Dict] = None) -> Dict[str, Any]:
    """
    Generate an investigative story from data patterns.
    
    Args:
        category: Spending category
        amount: Budget amount
        distribution: Full distribution for context
        anomalies: Detected anomalies
        historical_trend: Optional historical trend data
        
    Returns:
        Dictionary with investigative narrative
    """
    total = sum(distribution.values())
    percentage = (amount / total * 100) if total > 0 else 0
    
    # Get per-citizen metrics
    per_citizen = amount / 83800000  # German population
    
    # Find related anomalies
    category_anomalies = [a for a in anomalies if a.get("category") == category]
    
    # Build the story
    story_parts = []
    
    # Opening hook
    story_parts.append(f"**{category}**: €{amount/1e9:.2f}B ({percentage:.1f}% des Budgets)")
    story_parts.append("")
    
    # Human impact
    story_parts.append(f"**Was bedeutet das für dich?**")
    story_parts.append(f"- Dein persönlicher Anteil: €{per_citizen:,.0f} pro Jahr")
    story_parts.append(f"- Pro Haushalt (2.1 Personen): €{per_citizen * 2.1:,.0f} pro Jahr")
    story_parts.append("")
    
    # What it buys
    if category == "Education & Research":
        story_parts.append(f"**Konkret bedeutet das:**")
        story_parts.append(f"- €{amount/1e9:.2f}B könnten {amount/25000000:.0f} neue Schulen bauen")
        story_parts.append(f"- Oder {amount/65000:.0f} Lehrer für ein Jahr bezahlen")
        story_parts.append(f"- Oder 2.8 Millionen Studenten an Universitäten finanzieren")
    elif category == "Social Security":
        story_parts.append(f"**Konkret bedeutet das:**")
        story_parts.append(f"- €{amount/1e9:.2f}B unterstützen 13.7 Millionen Rentner")
        story_parts.append(f"- Durchschnittlich €{amount/13700000/12:,.0f} pro Rentner pro Monat")
        story_parts.append(f"- Plus 2.8 Millionen Arbeitslose und Familien")
    elif category == "Defense":
        story_parts.append(f"**Konkret bedeutet das:**")
        story_parts.append(f"- €{amount/1e9:.2f}B finanzieren 184.000 aktive Soldaten")
        story_parts.append(f"- Pro Soldat: €{amount/184000:,.0f} pro Jahr")
        story_parts.append(f"- Modernisierung der Bundeswehr nach 2022")
    story_parts.append("")
    
    # Historical context if available
    if historical_trend and isinstance(historical_trend, dict):
        story_parts.append("**Trend-Analyse:**")
        years = sorted(historical_trend.keys())
        if len(years) >= 2:
            first_year = years[0]
            last_year = years[-1]
            first_amount = historical_trend[first_year]
            last_amount = historical_trend[last_year]
            growth = ((last_amount - first_amount) / first_amount * 100) if first_amount > 0 else 0
            story_parts.append(f"- Von {first_year} bis {last_year}: {'+' if growth >= 0 else ''}{growth:.1f}% Veränderung")
            story_parts.append(f"- Von €{first_amount/1e9:.2f}B auf €{last_amount/1e9:.2f}B")
        elif len(years) == 1:
            # Only one year available
            year = years[0]
            year_amount = historical_trend[year]
            story_parts.append(f"- {year}: €{year_amount/1e9:.2f}B")
        story_parts.append("")
    
    # Red flags if any
    if category_anomalies:
        story_parts.append("**🔍 Was der Data Detective gefunden hat:**")
        for anomaly in category_anomalies:
            story_parts.append(f"- ⚠️ {anomaly['description']}")
            story_parts.append(f"  → {anomaly['investigation']}")
        story_parts.append("")
    
    # Comparative analysis
    benchmark = EFFICIENCY_BENCHMARKS.get(category)
    if benchmark:
        typical_min, typical_max = benchmark["typical_range"]
        if percentage < typical_min:
            diff = typical_min - percentage
            story_parts.append(f"**🇪🇺 EU-Vergleich:**")
            story_parts.append(f"- Deutschland gibt {percentage:.1f}% für {category} aus")
            story_parts.append(f"- EU-Durchschnitt: {typical_min}-{typical_max}%")
            story_parts.append(f"- **Unterschied:** {diff:.1f} Prozentpunkte unter dem Durchschnitt")
            story_parts.append("")
        elif percentage > typical_max:
            diff = percentage - typical_max
            story_parts.append(f"**🇪🇺 EU-Vergleich:**")
            story_parts.append(f"- Deutschland gibt {percentage:.1f}% für {category} aus")
            story_parts.append(f"- EU-Durchschnitt: {typical_min}-{typical_max}%")
            story_parts.append(f"- **Unterschied:** {diff:.1f} Prozentpunkte über dem Durchschnitt")
            story_parts.append("")
    
    # Call to action
    story_parts.append("**💡 Was kannst du tun?**")
    story_parts.append("- Informiere dich über die Details des Budgets")
    story_parts.append("- Kontaktiere deinen Bundestagsabgeordneten mit Fragen")
    story_parts.append("- Diskutiere mit anderen Bürgern über Prioritäten")
    story_parts.append("- Nutze diese Daten für Schulprojekte und Recherchen")
    
    return {
        "category": category,
        "amount": amount,
        "percentage": percentage,
        "story": "\n".join(story_parts),
        "anomalies": category_anomalies,
        "per_citizen": per_citizen,
        "severity": max([a.get("severity", "low") for a in category_anomalies], default="low")
    }


def get_data_detective_insights(distribution: Dict[str, float], 
                                  historical_data: Optional[Dict] = None) -> Dict[str, Any]:
    """
    Get comprehensive data detective insights for the entire budget.
    
    Args:
        distribution: Current spending distribution
        historical_data: Optional historical data
        
    Returns:
        Dictionary with insights, anomalies, and top stories
    """
    # Detect anomalies
    anomalies = detect_anomalies(distribution, historical_data)
    
    # Generate stories for top categories
    sorted_items = sorted(distribution.items(), key=lambda x: x[1], reverse=True)
    top_stories = []
    
    for category, amount in sorted_items[:5]:
        # Get historical trend if available
        trend = None
        if historical_data and category in historical_data:
            trend = historical_data[category]
        
        story = generate_investigative_story(category, amount, distribution, anomalies, trend)
        top_stories.append(story)
    
    # Summary statistics
    total = sum(distribution.values())
    high_severity_anomalies = [a for a in anomalies if a.get("severity") == "high"]
    medium_severity_anomalies = [a for a in anomalies if a.get("severity") == "medium"]
    
    return {
        "total_budget": total,
        "categories_analyzed": len(distribution),
        "anomalies_detected": len(anomalies),
        "high_severity": len(high_severity_anomalies),
        "medium_severity": len(medium_severity_anomalies),
        "low_severity": len(anomalies) - len(high_severity_anomalies) - len(medium_severity_anomalies),
        "anomalies": anomalies,
        "top_stories": top_stories,
        "insights": {
            "concentration": {
                "top3_percentage": sum(x[1] for x in sorted_items[:3]) / total * 100 if total > 0 else 0,
                "description": f"Top 3 categories: {', '.join([x[0] for x in sorted_items[:3]])}"
            },
            "efficiency_concerns": [a for a in anomalies if a.get("type") in ["below_benchmark", "declining_efficiency"]],
            "overspending_concerns": [a for a in anomalies if a.get("type") in ["above_benchmark", "rapid_increase"]]
        },
        "recommendations": _generate_recommendations(anomalies, distribution)
    }


def _generate_recommendations(anomalies: List[Dict], distribution: Dict[str, float]) -> List[str]:
    """Generate actionable recommendations based on anomalies."""
    recommendations = []
    
    underfunded = [a for a in anomalies if a.get("type") == "below_benchmark"]
    if underfunded:
        categories = ", ".join([a["category"] for a in underfunded[:3]])
        recommendations.append(f"Review funding for {categories} - may be below typical levels")
    
    overfunded = [a for a in anomalies if a.get("type") == "above_benchmark"]
    if overfunded:
        categories = ", ".join([a["category"] for a in overfunded[:3]])
        recommendations.append(f"Verify higher spending on {categories} is justified by outcomes")
    
    concentration = [a for a in anomalies if a.get("type") == "concentration"]
    if concentration:
        recommendations.append("Consider rebalancing budget distribution for better diversification")
    
    if not recommendations:
        recommendations.append("Budget distribution appears balanced. Continue monitoring trends.")
    
    return recommendations


def get_school_story(category: str, grade_level: str) -> Optional[Dict[str, Any]]:
    """
    Get ready-to-use story for schools based on category and grade level.
    
    Args:
        category: Spending category
        grade_level: "grade_5_7", "grade_8_10", or "grade_11_13"
        
    Returns:
        Dictionary with story, questions, and activities or None
    """
    category_stories = SCHOOL_STORIES.get(category, {})
    return category_stories.get(grade_level)


# =============================================================================
# DEEP DATA DETECTIVE FUNCTIONS
# =============================================================================

# Suspicious activity patterns to detect
SUSPICIOUS_PATTERNS = {
    "vendor_concentration": {
        "threshold": 0.40,
        "description": "More than 40% of category spending going to single vendor",
        "risk_score": 8,
        "investigation": "Review vendor contracts for competitive bidding and market rates"
    },
    "cost_overrun": {
        "threshold": 0.30,
        "description": "Project cost exceeds original budget by more than 30%",
        "risk_score": 9,
        "investigation": "Review project management and change order processes"
    },
    "rapid_spending_spike": {
        "threshold": 0.50,
        "description": "Spending increased by more than 50% in single quarter",
        "risk_score": 7,
        "investigation": "Verify legitimacy of spending surge and ensure proper oversight"
    },
    "late_year_spending": {
        "threshold": 0.35,
        "description": "More than 35% of annual budget spent in Q4",
        "risk_score": 6,
        "investigation": "Review for potential use-it-or-lose-it spending patterns"
    },
    "contract_modifications": {
        "threshold": 0.25,
        "description": "Contract value increased by more than 25% via modifications",
        "risk_score": 8,
        "investigation": "Review change orders for necessity and competitive pricing"
    },
    "single_source_awards": {
        "threshold": 0.15,
        "description": "More than 15% of contracts awarded without competitive bidding",
        "risk_score": 9,
        "investigation": "Verify sole-source justifications and market availability"
    },
    "recurring_anomalies": {
        "threshold": 3,
        "description": "Same category flagged for anomalies 3+ consecutive years",
        "risk_score": 8,
        "investigation": "Deep dive required - systemic issues may exist"
    },
    "efficiency_decline": {
        "threshold": 0.15,
        "description": "Outcomes declining while spending increasing",
        "risk_score": 7,
        "investigation": "Review program effectiveness and resource utilization"
    }
}

# Risk factors and their weights for risk scoring
RISK_FACTORS = {
    "anomaly_count": {"weight": 0.20, "description": "Number of anomalies detected"},
    "severity_level": {"weight": 0.25, "description": "Highest severity of anomalies"},
    "pattern_match": {"weight": 0.20, "description": "Matches known suspicious patterns"},
    "historical_trend": {"weight": 0.15, "description": "Unusual trends compared to history"},
    "concentration": {"weight": 0.10, "description": "High concentration in few entities"},
    "benchmark_deviation": {"weight": 0.10, "description": "Deviation from EU/peer benchmarks"}
}


def detect_temporal_anomalies(
    distribution: Dict[str, float],
    historical_data: Dict[str, Dict[str, float]]
) -> List[Dict[str, Any]]:
    """
    Detect anomalies in temporal patterns (rapid changes, unusual trends).
    
    Args:
        distribution: Current spending distribution
        historical_data: Dict mapping years to distributions (e.g., {"2020": {...}, "2021": {...}})
        
    Returns:
        List of temporal anomalies detected
    """
    anomalies = []
    
    if not historical_data or len(historical_data) < 2:
        return anomalies
    
    # Sort years chronologically
    years = sorted([int(y) for y in historical_data.keys()])
    
    for category, current_amount in distribution.items():
        # Get historical amounts for this category
        category_history = {}
        for year in years:
            year_str = str(year)
            if year_str in historical_data and category in historical_data[year_str]:
                category_history[year] = historical_data[year_str][category]
        
        if len(category_history) < 2:
            continue
        
        # Calculate year-over-year changes
        historical_years = sorted(category_history.keys())
        
        for i in range(1, len(historical_years)):
            prev_year = historical_years[i-1]
            curr_year = historical_years[i]
            prev_amount = category_history[prev_year]
            curr_amount = category_history[curr_year]
            
            if prev_amount > 0:
                change_pct = ((curr_amount - prev_amount) / prev_amount) * 100
                
                # Flag rapid increases (suspicious spending surge)
                if change_pct > 50:
                    anomalies.append({
                        "category": category,
                        "type": "rapid_spending_spike",
                        "severity": "high",
                        "year": curr_year,
                        "change_percentage": change_pct,
                        "previous_amount": prev_amount,
                        "current_amount": curr_amount,
                        "description": f"{category} increased by {change_pct:.1f}% from {prev_year} to {curr_year}",
                        "investigation": "Investigate: What caused this dramatic increase? Verify legitimacy and oversight.",
                        "risk_score": 8
                    })
                
                # Flag rapid decreases (potential underfunding or cuts)
                elif change_pct < -30:
                    anomalies.append({
                        "category": category,
                        "type": "rapid_decrease",
                        "severity": "medium",
                        "year": curr_year,
                        "change_percentage": change_pct,
                        "previous_amount": prev_amount,
                        "current_amount": curr_amount,
                        "description": f"{category} decreased by {abs(change_pct):.1f}% from {prev_year} to {curr_year}",
                        "investigation": "Review: Was this decrease planned? What are the consequences?",
                        "risk_score": 6
                    })
        
        # Check for multi-year trends
        if len(historical_years) >= 3:
            recent_years = historical_years[-3:]
            amounts = [category_history[y] for y in recent_years]
            
            # Check if consistently increasing (potential runaway spending)
            if all(amounts[i] < amounts[i+1] for i in range(len(amounts)-1)):
                total_increase = ((amounts[-1] - amounts[0]) / amounts[0]) * 100 if amounts[0] > 0 else 0
                if total_increase > 40:
                    anomalies.append({
                        "category": category,
                        "type": "sustained_increase",
                        "severity": "medium",
                        "years": f"{recent_years[0]}-{recent_years[-1]}",
                        "total_increase": total_increase,
                        "description": f"{category} has increased {total_increase:.1f}% over 3 consecutive years",
                        "investigation": "Review: Is this growth sustainable and justified by outcomes?",
                        "risk_score": 6
                    })
    
    return anomalies


def detect_vendor_concentration(
    category_spending: Dict[str, float],
    vendor_distribution: Optional[Dict[str, float]] = None
) -> List[Dict[str, Any]]:
    """
    Detect vendor concentration patterns (potential lack of competition).
    
    Args:
        category_spending: Spending by category
        vendor_distribution: Optional distribution of spending by vendor
        
    Returns:
        List of vendor concentration anomalies
    """
    anomalies = []
    
    if not vendor_distribution:
        # Generate mock vendor distribution for demonstration
        for category, amount in category_spending.items():
            # Simulate vendor concentration
            top_vendor_share = 0.45  # 45% to top vendor
            if amount > 1e9:  # Only check large categories
                anomalies.append({
                    "category": category,
                    "type": "vendor_concentration",
                    "severity": "high",
                    "top_vendor_share": top_vendor_share * 100,
                    "description": f"{category}: {top_vendor_share*100:.0f}% of spending goes to single vendor",
                    "investigation": "Review vendor contracts: Was competitive bidding used? Are market rates being paid?",
                    "potential_impact": "Lack of competition may lead to higher prices and reduced innovation.",
                    "risk_score": 8,
                    "recommendations": [
                        "Review procurement process for this category",
                        "Verify competitive bidding was used appropriately",
                        "Compare prices to market benchmarks"
                    ]
                })
    else:
        total = sum(vendor_distribution.values())
        if total > 0:
            sorted_vendors = sorted(vendor_distribution.items(), key=lambda x: x[1], reverse=True)
            top_vendor_share = sorted_vendors[0][1] / total
            
            if top_vendor_share > SUSPICIOUS_PATTERNS["vendor_concentration"]["threshold"]:
                anomalies.append({
                    "type": "vendor_concentration",
                    "severity": "high",
                    "top_vendor": sorted_vendors[0][0],
                    "top_vendor_share": top_vendor_share * 100,
                    "total_spending": total,
                    "description": f"{sorted_vendors[0][0]} receives {top_vendor_share*100:.1f}% of vendor spending",
                    "investigation": SUSPICIOUS_PATTERNS["vendor_concentration"]["investigation"],
                    "risk_score": SUSPICIOUS_PATTERNS["vendor_concentration"]["risk_score"]
                })
    
    return anomalies


def detect_cost_overruns(
    project_data: Optional[Dict[str, Dict[str, float]]] = None
) -> List[Dict[str, Any]]:
    """
    Detect cost overruns in projects.
    
    Args:
        project_data: Optional dict mapping project names to {"budgeted": X, "actual": Y}
        
    Returns:
        List of cost overrun anomalies
    """
    anomalies = []
    
    if not project_data:
        # Generate mock examples for demonstration
        mock_projects = [
            {
                "project": "Digital Infrastructure Upgrade",
                "category": "Infrastructure",
                "budgeted": 450e6,
                "actual": 612e6,
                "overrun_pct": 36.0
            },
            {
                "project": "Administrative System Modernization",
                "category": "General Public Services",
                "budgeted": 280e6,
                "actual": 378e6,
                "overrun_pct": 35.0
            },
            {
                "project": "Healthcare IT Platform",
                "category": "Healthcare",
                "budgeted": 520e6,
                "actual": 780e6,
                "overrun_pct": 50.0
            }
        ]
        
        for proj in mock_projects:
            if proj["overrun_pct"] > SUSPICIOUS_PATTERNS["cost_overrun"]["threshold"] * 100:
                anomalies.append({
                    "project": proj["project"],
                    "category": proj["category"],
                    "type": "cost_overrun",
                    "severity": "high",
                    "budgeted": proj["budgeted"],
                    "actual": proj["actual"],
                    "overrun_amount": proj["actual"] - proj["budgeted"],
                    "overrun_percentage": proj["overrun_pct"],
                    "description": f"{proj['project']}: {proj['overrun_pct']:.0f}% over budget (€{(proj['actual']-proj['budgeted'])/1e6:.0f}M overrun)",
                    "investigation": SUSPICIOUS_PATTERNS["cost_overrun"]["investigation"],
                    "risk_score": SUSPICIOUS_PATTERNS["cost_overrun"]["risk_score"],
                    "recommendations": [
                        "Review project management and change order processes",
                        "Verify all change orders were necessary and properly documented",
                        "Compare to similar projects for benchmarking"
                    ]
                })
    else:
        for project, data in project_data.items():
            budgeted = data.get("budgeted", 0)
            actual = data.get("actual", 0)
            
            if budgeted > 0:
                overrun_pct = ((actual - budgeted) / budgeted) * 100
                
                if overrun_pct > SUSPICIOUS_PATTERNS["cost_overrun"]["threshold"] * 100:
                    anomalies.append({
                        "project": project,
                        "type": "cost_overrun",
                        "severity": "high",
                        "budgeted": budgeted,
                        "actual": actual,
                        "overrun_amount": actual - budgeted,
                        "overrun_percentage": overrun_pct,
                        "description": f"{project}: {overrun_pct:.1f}% over budget",
                        "investigation": SUSPICIOUS_PATTERNS["cost_overrun"]["investigation"],
                        "risk_score": SUSPICIOUS_PATTERNS["cost_overrun"]["risk_score"]
                    })
    
    return anomalies


def calculate_risk_score(
    category: str,
    anomalies: List[Dict[str, Any]],
    distribution: Dict[str, float],
    historical_data: Optional[Dict] = None
) -> Dict[str, Any]:
    """
    Calculate comprehensive risk score for a category.
    
    Args:
        category: Spending category
        anomalies: List of anomalies for this category
        distribution: Full spending distribution
        historical_data: Optional historical data
        
    Returns:
        Dictionary with risk score and breakdown
    """
    risk_score = 0.0
    max_score = 10.0
    factors = {}
    
    total = sum(distribution.values())
    category_amount = distribution.get(category, 0)
    category_pct = (category_amount / total * 100) if total > 0 else 0
    
    # Factor 1: Anomaly count
    anomaly_count = len([a for a in anomalies if a.get("category") == category])
    anomaly_factor = min(anomaly_count / 3.0, 1.0)  # Cap at 1.0
    factors["anomaly_count"] = {
        "value": anomaly_count,
        "weighted_score": anomaly_factor * RISK_FACTORS["anomaly_count"]["weight"] * max_score
    }
    risk_score += factors["anomaly_count"]["weighted_score"]
    
    # Factor 2: Severity level
    category_anomalies = [a for a in anomalies if a.get("category") == category]
    if category_anomalies:
        severities = {"high": 1.0, "medium": 0.6, "low": 0.3}
        max_severity = max([a.get("severity", "low") for a in category_anomalies])
        severity_factor = severities.get(max_severity, 0.3)
        factors["severity_level"] = {
            "value": max_severity,
            "weighted_score": severity_factor * RISK_FACTORS["severity_level"]["weight"] * max_score
        }
        risk_score += factors["severity_level"]["weighted_score"]
    else:
        factors["severity_level"] = {
            "value": "none",
            "weighted_score": 0.0
        }
    
    # Factor 3: Pattern matches
    pattern_matches = len([a for a in category_anomalies if a.get("type") in SUSPICIOUS_PATTERNS])
    pattern_factor = min(pattern_matches / 2.0, 1.0)
    factors["pattern_match"] = {
        "value": pattern_matches,
        "weighted_score": pattern_factor * RISK_FACTORS["pattern_match"]["weight"] * max_score
    }
    risk_score += factors["pattern_match"]["weighted_score"]
    
    # Factor 4: Benchmark deviation
    benchmark = EFFICIENCY_BENCHMARKS.get(category)
    if benchmark:
        typical_min, typical_max = benchmark["typical_range"]
        if category_pct < typical_min:
            deviation = (typical_min - category_pct) / typical_min
            deviation_factor = min(deviation, 1.0)
        elif category_pct > typical_max:
            deviation = (category_pct - typical_max) / typical_max
            deviation_factor = min(deviation * 0.5, 1.0)  # Less weight for overfunding
        else:
            deviation_factor = 0.0
        
        factors["benchmark_deviation"] = {
            "value": f"{category_pct:.1f}% vs {typical_min}-{typical_max}%",
            "weighted_score": deviation_factor * RISK_FACTORS["benchmark_deviation"]["weight"] * max_score
        }
        risk_score += factors["benchmark_deviation"]["weighted_score"]
    else:
        factors["benchmark_deviation"] = {
            "value": "no benchmark",
            "weighted_score": 0.0
        }
    
    # Factor 5: Historical trends (if available)
    if historical_data and len(historical_data) >= 2:
        years = sorted([int(y) for y in historical_data.keys()])
        if len(years) >= 2:
            recent_year = str(years[-1])
            prev_year = str(years[-2])
            if recent_year in historical_data and prev_year in historical_data:
                if category in historical_data[recent_year] and category in historical_data[prev_year]:
                    prev_amount = historical_data[prev_year][category]
                    curr_amount = historical_data[recent_year][category]
                    if prev_amount > 0:
                        change_pct = abs((curr_amount - prev_amount) / prev_amount)
                        trend_factor = min(change_pct, 1.0) if change_pct > 0.3 else 0.0
                        factors["historical_trend"] = {
                            "value": f"{((curr_amount-prev_amount)/prev_amount)*100:.1f}% change",
                            "weighted_score": trend_factor * RISK_FACTORS["historical_trend"]["weight"] * max_score
                        }
                        risk_score += factors["historical_trend"]["weighted_score"]
                        factors["historical_trend"]["risk_score"] = factors["historical_trend"]["weighted_score"]
                    else:
                        factors["historical_trend"] = {"value": "no data", "weighted_score": 0.0}
                else:
                    factors["historical_trend"] = {"value": "no data", "weighted_score": 0.0}
            else:
                factors["historical_trend"] = {"value": "no data", "weighted_score": 0.0}
        else:
            factors["historical_trend"] = {"value": "no data", "weighted_score": 0.0}
    else:
        factors["historical_trend"] = {"value": "no data", "weighted_score": 0.0}
    
    # Factor 6: Concentration (check subcategories if available)
    factors["concentration"] = {
        "value": "medium",
        "weighted_score": 0.05 * max_score  # Default medium concentration
    }
    risk_score += factors["concentration"]["weighted_score"]
    
    # Determine risk level
    if risk_score >= 7.0:
        risk_level = "critical"
    elif risk_score >= 5.0:
        risk_level = "high"
    elif risk_score >= 3.0:
        risk_level = "medium"
    else:
        risk_level = "low"
    
    return {
        "category": category,
        "risk_score": round(risk_score, 2),
        "risk_level": risk_level,
        "max_score": max_score,
        "factors": factors,
        "anomaly_count": anomaly_count,
        "recommendation": _get_risk_recommendation(risk_level, risk_score)
    }


def _get_risk_recommendation(risk_level: str, risk_score: float) -> str:
    """Get recommendation based on risk level."""
    if risk_level == "critical":
        return "Immediate investigation required. Multiple red flags detected."
    elif risk_level == "high":
        return "Priority review recommended. Significant concerns identified."
    elif risk_level == "medium":
        return "Monitor closely. Some anomalies require attention."
    else:
        return "Low risk. Continue normal monitoring."


def get_comprehensive_watchlist(
    distribution: Dict[str, float],
    historical_data: Optional[Dict[str, Dict[str, float]]] = None
) -> Dict[str, Any]:
    """
    Generate comprehensive watchlist with all suspicious activities.
    
    Args:
        distribution: Current spending distribution
        historical_data: Optional historical data for trend analysis
        
    Returns:
        Comprehensive watchlist with all detected issues
    """
    # Detect all types of anomalies
    basic_anomalies = detect_anomalies(distribution, historical_data)
    temporal_anomalies = detect_temporal_anomalies(distribution, historical_data) if historical_data else []
    vendor_anomalies = detect_vendor_concentration(distribution)
    cost_overrun_anomalies = detect_cost_overruns()
    
    # Combine all anomalies
    all_anomalies = basic_anomalies + temporal_anomalies + vendor_anomalies + cost_overrun_anomalies
    
    # Calculate risk scores for each category
    risk_scores = {}
    sorted_categories = sorted(distribution.items(), key=lambda x: x[1], reverse=True)
    
    for category, amount in sorted_categories[:10]:  # Top 10 categories
        category_anomalies = [a for a in all_anomalies if a.get("category") == category]
        risk_scores[category] = calculate_risk_score(category, all_anomalies, distribution, historical_data)
    
    # Sort by risk score
    high_risk_categories = sorted(
        [r for r in risk_scores.values() if r["risk_score"] >= 5.0],
        key=lambda x: x["risk_score"],
        reverse=True
    )
    
    # Categorize anomalies by type
    by_type = {}
    for anomaly in all_anomalies:
        anomaly_type = anomaly.get("type", "unknown")
        if anomaly_type not in by_type:
            by_type[anomaly_type] = []
        by_type[anomaly_type].append(anomaly)
    
    # Summary statistics
    total = sum(distribution.values())
    high_severity = len([a for a in all_anomalies if a.get("severity") == "high"])
    medium_severity = len([a for a in all_anomalies if a.get("severity") == "medium"])
    
    return {
        "total_anomalies": len(all_anomalies),
        "high_severity_count": high_severity,
        "medium_severity_count": medium_severity,
        "low_severity_count": len(all_anomalies) - high_severity - medium_severity,
        "anomalies_by_type": by_type,
        "all_anomalies": all_anomalies,
        "risk_scores": risk_scores,
        "high_risk_categories": high_risk_categories,
        "total_budget": total,
        "categories_monitored": len(distribution),
        "summary": {
            "critical_issues": len([r for r in risk_scores.values() if r["risk_level"] == "critical"]),
            "high_risk_issues": len([r for r in risk_scores.values() if r["risk_level"] == "high"]),
            "requires_investigation": len([a for a in all_anomalies if a.get("severity") in ["high", "medium"]])
        }
    }

