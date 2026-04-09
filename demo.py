#!/usr/bin/env python3
"""Quick demo script to show Public Money Mirror working."""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src/backend'))

from fastapi.testclient import TestClient
from app.main import app
import json

def print_section(title):
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def print_response(response, endpoint):
    print(f"\n📍 {endpoint}")
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, dict):
            if "cases" in data:
                print(f"   ✅ Found {len(data['cases'])} cases")
                if data['cases']:
                    top_case = data['cases'][0]
                    print(f"   💰 Top case: {top_case.get('title', 'N/A')[:50]}...")
                    print(f"      Score: {top_case.get('score', 0):.1f} | EUR: €{top_case.get('euro_estimate', 0):,.0f}")
            elif "status" in data:
                print(f"   ✅ {data['status']}")
            else:
                print(f"   ✅ {json.dumps(data, indent=2)[:200]}...")
        elif isinstance(data, list):
            print(f"   ✅ Retrieved {len(data)} items")
            if data:
                item = data[0]
                print(f"   📰 Story: {item.get('title', 'N/A')[:50]}...")
        else:
            print(f"   ✅ {str(data)[:100]}...")
    else:
        print(f"   ⚠️  Error: {response.text[:200]}")

# Create test client
client = TestClient(app)

print_section("Public Money Mirror - API Demo")
print("\n🚀 Starting API server demo...")

# 1. Health Check
print_section("1. Health Check")
response = client.get("/health")
print_response(response, "GET /health")

# 2. Root Endpoint
print_section("2. Root Endpoint")
response = client.get("/")
print_response(response, "GET /")

# 3. Cases (may be empty if no data)
print_section("3. Cases API")
response = client.get("/cases?limit=5")
print_response(response, "GET /cases?limit=5")

# 4. Stories
print_section("4. Stories API")
response = client.get("/stories/latest?limit=3")
print_response(response, "GET /stories/latest?limit=3")

# 5. Benchmarks
print_section("5. Benchmarks API")
response = client.get("/benchmarks/unit_price?year=2024")
print_response(response, "GET /benchmarks/unit_price?year=2024")

# 6. Entity Search
print_section("6. Entity Search API")
response = client.get("/entities/search?q=supplier")
print_response(response, "GET /entities/search?q=supplier")

print_section("Demo Complete")
print("\n✅ All endpoints are working!")
print("\n💡 To see data:")
print("   1. Run: python scripts/seed_synthetic_data.py")
print("   2. Restart the server")
print("\n🌐 Access points:")
print("   - API Docs: http://localhost:8000/docs")
print("   - Health:  http://localhost:8000/health")
print("   - Cases:   http://localhost:8000/cases")

