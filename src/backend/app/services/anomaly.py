"""Anomaly detection services."""
import numpy as np
from typing import List, Dict, Any, Optional

try:
    from scipy import stats
except ImportError:
    stats = None

try:
    from sklearn.preprocessing import robust_scale
except ImportError:
    robust_scale = None

try:
    import pandas as pd
except ImportError:
    pd = None


def robust_z_score(values: np.ndarray, median_absolute_deviation: Optional[float] = None) -> np.ndarray:
    """Calculate robust z-scores using MAD (Median Absolute Deviation)."""
    if len(values) == 0:
        return np.array([])
    median = np.median(values)
    if median_absolute_deviation is None:
        mad = np.median(np.abs(values - median))
    else:
        mad = median_absolute_deviation
    if mad == 0:
        return np.zeros_like(values)
    return (values - median) / (1.4826 * mad)  # 1.4826 makes MAD consistent with std for normal dist


def winsorize(values: np.ndarray, limits: tuple = (0.05, 0.95)) -> np.ndarray:
    """Winsorize values to limit outliers."""
    if len(values) == 0:
        return np.array([])
    lower, upper = np.percentile(values, [limits[0] * 100, limits[1] * 100])
    return np.clip(values, lower, upper)


def detect_price_outliers(
    prices: List[float],
    cpv_code: Optional[str] = None,
    region: Optional[str] = None,
    year: Optional[int] = None,
) -> Dict[str, Any]:
    """Detect price outliers using robust z-score."""
    prices_array = np.array(prices)
    if len(prices_array) < 3:
        return {
            "is_outlier": False,
            "z_score": 0.0,
            "outlier_score": 0.0,
        }

    z_scores = robust_z_score(prices_array)
    max_z = np.max(np.abs(z_scores))
    is_outlier = max_z > 2.5  # Threshold for anomaly

    # Normalize to 0-100 score
    outlier_score = min(100, max(0, (max_z - 2.0) * 25))

    return {
        "is_outlier": bool(is_outlier),
        "z_score": float(max_z),
        "outlier_score": float(outlier_score),
        "method": "robust_mad",
    }


def detect_single_bidder_risk(number_of_bids: Optional[int]) -> Dict[str, Any]:
    """Detect single-bidder or low-competition risk."""
    if number_of_bids is None:
        return {
            "is_risk": False,
            "risk_score": 0.0,
            "risk_type": "unknown",
        }

    if number_of_bids == 1:
        return {
            "is_risk": True,
            "risk_score": 85.0,
            "risk_type": "single_bidder",
        }
    elif number_of_bids == 2:
        return {
            "is_risk": True,
            "risk_score": 50.0,
            "risk_type": "low_competition",
        }
    elif number_of_bids <= 3:
        return {
            "is_risk": True,
            "risk_score": 25.0,
            "risk_type": "limited_competition",
        }
    else:
        return {
            "is_risk": False,
            "risk_score": 0.0,
            "risk_type": "normal",
        }


def detect_bid_rotation_pattern(winners: List[str], window: int = 5) -> Dict[str, Any]:
    """Detect bid rotation patterns (collusion heuristic using n-gram entropy)."""
    if len(winners) < window:
        return {
            "has_rotation": False,
            "entropy": 0.0,
            "rotation_score": 0.0,
        }

    # Calculate entropy of winner sequences
    ngrams = [tuple(winners[i : i + window]) for i in range(len(winners) - window + 1)]
    unique_ngrams = len(set(ngrams))
    total_ngrams = len(ngrams)

    if total_ngrams == 0:
        return {
            "has_rotation": False,
            "entropy": 0.0,
            "rotation_score": 0.0,
        }

    # Low entropy suggests repetitive patterns (suspicious)
    entropy = -sum((ngrams.count(ng) / total_ngrams) * np.log2(ngrams.count(ng) / total_ngrams) for ng in set(ngrams))

    # Normalize entropy (lower = more suspicious)
    max_entropy = np.log2(min(total_ngrams, len(set(winners)) ** window))
    normalized_entropy = entropy / max_entropy if max_entropy > 0 else 0
    rotation_score = (1 - normalized_entropy) * 70  # Scale to 0-70

    return {
        "has_rotation": normalized_entropy < 0.5,
        "entropy": float(entropy),
        "rotation_score": float(rotation_score),
    }


def detect_time_overrun(
    planned_date: Optional[Any],
    actual_date: Optional[Any],
    vendor_profile: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Detect time/cost overruns."""
    if planned_date and actual_date:
        try:
            if isinstance(planned_date, str):
                from datetime import datetime

                planned = datetime.fromisoformat(planned_date)
                actual = datetime.fromisoformat(actual_date)
            else:
                planned = planned_date
                actual = actual_date

            delay_days = (actual - planned).days
            if delay_days > 0:
                delay_score = min(100, delay_days * 2)  # Scale delay to score
                return {
                    "has_overrun": True,
                    "delay_days": delay_days,
                    "overrun_score": float(delay_score),
                }
        except Exception:
            pass

    # Fallback to vendor profile if dates unavailable
    if vendor_profile:
        historical_overrun_rate = vendor_profile.get("overrun_rate", 0.0)
        if historical_overrun_rate > 0.3:
            return {
                "has_overrun": True,
                "delay_days": None,
                "overrun_score": float(historical_overrun_rate * 50),
            }

    return {
        "has_overrun": False,
        "delay_days": None,
        "overrun_score": 0.0,
    }


def calculate_supplier_dependency(spend_by_supplier: Dict[str, float]) -> Dict[str, Any]:
    """Calculate supplier dependency using HHI (Herfindahl-Hirschman Index)."""
    if not spend_by_supplier:
        return {
            "hhi": 0.0,
            "concentration_score": 0.0,
            "risk_level": "low",
        }

    total_spend = sum(spend_by_supplier.values())
    if total_spend == 0:
        return {
            "hhi": 0.0,
            "concentration_score": 0.0,
            "risk_level": "low",
        }

    # Calculate HHI (0-10000, where 10000 = monopoly)
    market_shares = [s / total_spend for s in spend_by_supplier.values()]
    hhi = sum(ms * ms * 10000 for ms in market_shares)

    # Normalize to 0-100 score
    concentration_score = min(100, hhi / 100)

    if hhi > 2500:
        risk_level = "high"
    elif hhi > 1500:
        risk_level = "medium"
    else:
        risk_level = "low"

    return {
        "hhi": float(hhi),
        "concentration_score": float(concentration_score),
        "risk_level": risk_level,
    }

