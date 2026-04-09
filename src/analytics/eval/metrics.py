"""Evaluation metrics for case ranking."""
from typing import List, Dict, Any
import numpy as np


def calculate_precision_recall(predictions: List[float], labels: List[bool], threshold: float = 0.5) -> Dict[str, float]:
    """Calculate precision and recall."""
    pred_binary = [p >= threshold for p in predictions]
    tp = sum(p and l for p, l in zip(pred_binary, labels))
    fp = sum(p and not l for p, l in zip(pred_binary, labels))
    fn = sum(not p and l for p, l in zip(pred_binary, labels))

    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0.0

    return {
        "precision": precision,
        "recall": recall,
        "f1": f1,
    }


def calculate_euro_accuracy(predicted_savings: List[float], actual_savings: List[float]) -> Dict[str, float]:
    """Calculate accuracy of EUR estimates."""
    if len(predicted_savings) != len(actual_savings):
        return {"error": "Mismatched lengths"}

    errors = [abs(p - a) / max(a, 1.0) for p, a in zip(predicted_savings, actual_savings)]
    mae = np.mean(errors)
    mape = np.mean(errors) * 100

    return {
        "mae": mae,
        "mape": mape,
    }

