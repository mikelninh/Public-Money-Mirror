"""Case ranking model that combines anomaly features into case scores."""
from typing import Dict, Any, List
import numpy as np


class CaseRanker:
    """Case ranker that combines features into scores."""

    def __init__(self, weights: Dict[str, float] = None):
        """Initialize case ranker with feature weights."""
        self.weights = weights or {
            "price_outlier_score": 0.35,
            "competition_risk_score": 0.25,
            "overrun_score": 0.20,
            "supplier_dependency_score": 0.20,
        }

    def calculate_case_score(self, features: Dict[str, float]) -> float:
        """Calculate case score from features (0-100)."""
        score = 0.0
        for feature_name, weight in self.weights.items():
            feature_value = features.get(feature_name, 0.0)
            score += feature_value * weight

        return min(100, max(0, score))

    def estimate_euro_potential(
        self,
        features: Dict[str, float],
        base_amount: float,
        volume_multiplier: float = 1.0,
    ) -> float:
        """Estimate potential savings in EUR."""
        # Conservative shrinkage based on confidence
        confidence_factor = features.get("confidence", 0.5)
        # Apply conservative estimate (50% of difference)
        price_factor = features.get("price_outlier_score", 0.0) / 100.0
        potential = base_amount * price_factor * volume_multiplier * confidence_factor * 0.5

        return max(0, potential)

    def generate_explainability(
        self,
        features: Dict[str, float],
        case_score: float,
        euro_estimate: float,
    ) -> Dict[str, Any]:
        """Generate explainability blob."""
        # Sort features by contribution
        feature_contributions = []
        for feature_name, weight in self.weights.items():
            feature_value = features.get(feature_name, 0.0)
            contribution = feature_value * weight
            feature_contributions.append({
                "feature": feature_name,
                "value": feature_value,
                "weight": weight,
                "contribution": contribution,
            })

        feature_contributions.sort(key=lambda x: x["contribution"], reverse=True)

        # Generate text rationale
        top_features = feature_contributions[:3]
        rationale = f"Case score of {case_score:.1f} based on: "
        rationale += ", ".join([f"{f['feature']} ({f['value']:.1f})" for f in top_features])

        # Generate risk tags
        risk_tags = []
        if features.get("price_outlier_score", 0) > 50:
            risk_tags.append("price_anomaly")
        if features.get("competition_risk_score", 0) > 50:
            risk_tags.append("low_competition")
        if features.get("overrun_score", 0) > 30:
            risk_tags.append("delivery_risk")
        if features.get("supplier_dependency_score", 0) > 60:
            risk_tags.append("supplier_concentration")

        return {
            "case_score": case_score,
            "euro_estimate": euro_estimate,
            "top_features": feature_contributions[:5],
            "rationale": rationale,
            "risk_tags": risk_tags,
            "confidence": min(1.0, case_score / 100.0),
        }


# Global instance
case_ranker = CaseRanker()

