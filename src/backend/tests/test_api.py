"""Tests for API endpoints."""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    """Test health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_root_endpoint():
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "service" in response.json()


def test_cases_endpoint():
    """Test cases endpoint."""
    response = client.get("/cases?limit=10")
    assert response.status_code == 200
    data = response.json()
    assert "cases" in data
    assert "total" in data


def test_stories_endpoint():
    """Test stories endpoint."""
    response = client.get("/stories/latest?limit=3")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_benchmarks_endpoint():
    """Test benchmarks endpoint."""
    response = client.get("/benchmarks/unit_price?year=2024")
    assert response.status_code == 200
    data = response.json()
    assert "year" in data

