"""Feature engineering for case ranking."""
from typing import List, Dict, Any
import numpy as np
from app.services.anomaly import (
    detect_price_outliers,
    detect_single_bidder_risk,
    detect_bid_rotation_pattern,
    detect_time_overrun,
    calculate_supplier_dependency,
)


def extract_anomaly_features(award_data: Dict[str, Any]) -> Dict[str, float]:
    """Extract anomaly features from award data."""
    features = {}

    # Price outlier features
    if "unit_price_eur" in award_data and "prices_context" in award_data:
        price_result = detect_price_outliers(award_data["prices_context"])
        features["price_outlier_score"] = price_result.get("outlier_score", 0.0)
        features["price_z_score"] = price_result.get("z_score", 0.0)
    else:
        features["price_outlier_score"] = 0.0
        features["price_z_score"] = 0.0

    # Competition features
    if "number_of_bids" in award_data:
        bid_result = detect_single_bidder_risk(award_data["number_of_bids"])
        features["competition_risk_score"] = bid_result.get("risk_score", 0.0)
    else:
        features["competition_risk_score"] = 0.0

    # Time overrun features
    if "planned_date" in award_data or "vendor_profile" in award_data:
        overrun_result = detect_time_overrun(
            award_data.get("planned_date"),
            award_data.get("actual_date"),
            award_data.get("vendor_profile"),
        )
        features["overrun_score"] = overrun_result.get("overrun_score", 0.0)
    else:
        features["overrun_score"] = 0.0

    return features


def extract_supplier_features(supplier_data: Dict[str, Any]) -> Dict[str, float]:
    """Extract supplier-level features."""
    features = {}

    # Supplier dependency
    if "spend_by_supplier" in supplier_data:
        dependency_result = calculate_supplier_dependency(supplier_data["spend_by_supplier"])
        features["supplier_dependency_score"] = dependency_result.get("concentration_score", 0.0)
        features["hhi"] = dependency_result.get("hhi", 0.0)
    else:
        features["supplier_dependency_score"] = 0.0
        features["hhi"] = 0.0

    return features


def combine_features(anomaly_features: Dict[str, float], supplier_features: Dict[str, float]) -> Dict[str, float]:
    """Combine all features."""
    combined = {**anomaly_features, **supplier_features}

    # Normalize to 0-100 scale
    for key, value in combined.items():
        if "score" in key:
            combined[key] = min(100, max(0, value))

    return combined

