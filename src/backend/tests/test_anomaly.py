"""Tests for anomaly detection services."""
import pytest
import numpy as np
from app.services.anomaly import (
    robust_z_score,
    detect_price_outliers,
    detect_single_bidder_risk,
    calculate_supplier_dependency,
)


def test_robust_z_score():
    """Test robust z-score calculation."""
    values = np.array([100, 105, 110, 115, 200])  # 200 is outlier
    z_scores = robust_z_score(values)
    assert len(z_scores) == len(values)
    assert np.abs(z_scores[-1]) > np.abs(z_scores[0])  # Outlier has larger z-score


def test_detect_price_outliers():
    """Test price outlier detection."""
    prices = [100, 105, 110, 115, 200]  # 200 is outlier
    result = detect_price_outliers(prices)
    assert "is_outlier" in result
    assert "outlier_score" in result
    assert result["outlier_score"] >= 0


def test_detect_single_bidder_risk():
    """Test single bidder risk detection."""
    result = detect_single_bidder_risk(1)
    assert result["is_risk"] is True
    assert result["risk_score"] > 0
    assert result["risk_type"] == "single_bidder"

    result = detect_single_bidder_risk(5)
    assert result["is_risk"] is False
    assert result["risk_score"] == 0.0


def test_calculate_supplier_dependency():
    """Test supplier dependency calculation."""
    spend_by_supplier = {"A": 800000, "B": 150000, "C": 50000}
    result = calculate_supplier_dependency(spend_by_supplier)
    assert "hhi" in result
    assert "concentration_score" in result
    assert result["hhi"] > 0
    assert result["risk_level"] in ["low", "medium", "high"]

