#!/usr/bin/env python3
"""Live demo of Public Money Mirror API."""
import sys
import os
import time
import subprocess
import signal
import requests
from urllib.parse import quote

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src/backend'))

def print_header(text):
    print("\n" + "="*70)
    print(f"  {text}")
    print("="*70)

def print_section(text):
    print(f"\n📌 {text}")
    print("-" * 70)

def test_endpoint(url, description, params=None):
    """Test an API endpoint."""
    try:
        print(f"\n🔗 {description}")
        print(f"   URL: {url}")
        response = requests.get(url, params=params, timeout=3)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, dict):
                if "status" in data:
                    print(f"   ✅ {data['status']}")
                elif "service" in data:
                    print(f"   ✅ Service: {data['service']}")
                    print(f"   ✅ Version: {data.get('version', 'N/A')}")
                elif "cases" in data:
                    total = data.get('total', 0)
                    cases = data.get('cases', [])
                    print(f"   ✅ Total cases: {total}")
                    print(f"   ✅ Retrieved: {len(cases)} cases")
                    if cases:
                        top = cases[0]
                        print(f"   📋 Top case: {top.get('title', 'N/A')[:50]}...")
                        print(f"      Score: {top.get('score', 0):.1f} | EUR: €{top.get('euro_estimate', 0):,.0f}")
                elif "year" in data:
                    print(f"   ✅ Year: {data['year']}")
                    print(f"   ✅ Count: {data.get('count', 0)}")
            elif isinstance(data, list):
                print(f"   ✅ Retrieved {len(data)} items")
                if data:
                    item = data[0]
                    print(f"   📰 Latest: {item.get('title', 'N/A')[:50]}...")
            return True
        else:
            print(f"   ⚠️  Error: {response.text[:100]}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"   ⚠️  Connection refused - server not ready yet")
        return False
    except Exception as e:
        print(f"   ⚠️  Error: {str(e)[:100]}")
        return False

def main():
    """Main demo function."""
    print_header("PUBLIC MONEY MIRROR - LIVE DEMO")
    
    base_url = "http://localhost:8000"
    
    print("\n🚀 Starting server...")
    print(f"   📍 Base URL: {base_url}")
    print(f"   ⏳ Waiting for server to start...")
    
    # Wait for server to be ready
    max_retries = 30
    for i in range(max_retries):
        try:
            response = requests.get(f"{base_url}/health", timeout=1)
            if response.status_code == 200:
                print(f"   ✅ Server is ready!")
                break
        except:
            if i < max_retries - 1:
                time.sleep(1)
                print(f"   ⏳ Waiting... ({i+1}/{max_retries})")
            else:
                print(f"\n❌ Server not responding after {max_retries} seconds")
                print("   Please start the server manually:")
                print("   cd src/backend && uvicorn app.main:app --reload")
                return
    
    print_section("Testing API Endpoints")
    
    # Test endpoints
    endpoints = [
        (f"{base_url}/health", "Health Check"),
        (f"{base_url}/", "Root Endpoint"),
        (f"{base_url}/cases", "Cases API", {"limit": 5}),
        (f"{base_url}/stories/latest", "Stories API", {"limit": 3}),
        (f"{base_url}/benchmarks/unit_price", "Benchmarks API", {"year": 2024}),
        (f"{base_url}/entities/search", "Entity Search", {"q": "supplier"}),
    ]
    
    results = []
    for endpoint_info in endpoints:
        if len(endpoint_info) == 2:
            url, desc = endpoint_info
            params = None
        else:
            url, desc, params = endpoint_info
        results.append(test_endpoint(url, desc, params))
    
    print_section("Demo Summary")
    
    successful = sum(results)
    total = len(results)
    
    print(f"\n✅ Successfully tested: {successful}/{total} endpoints")
    
    if successful == total:
        print("\n🎉 All endpoints working!")
    else:
        print("\n⚠️  Some endpoints need data (run seed script first)")
    
    print("\n" + "="*70)
    print("  🌐 ACCESS THE API")
    print("="*70)
    print(f"\n📚 Interactive API Docs: {base_url}/docs")
    print(f"📖 ReDoc: {base_url}/redoc")
    print(f"💚 Health Check: {base_url}/health")
    print(f"📋 Cases: {base_url}/cases")
    print(f"📰 Stories: {base_url}/stories/latest")
    print("\n💡 To add data, run: python scripts/seed_synthetic_data.py")
    print("="*70 + "\n")

if __name__ == "__main__":
    main()

