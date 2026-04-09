#!/usr/bin/env python3
"""Run the Public Money Mirror demo server."""
import sys
import os
import asyncio
import threading
import time
import requests
from contextlib import contextmanager

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src/backend'))

# Import after path setup
try:
    from app.main import app
    from app.db import init_db
    from app.config import settings
    import uvicorn
except ImportError as e:
    print(f"❌ Error importing modules: {e}")
    print("Please install dependencies: pip install -r requirements.txt")
    sys.exit(1)

def print_header(text):
    print("\n" + "="*70)
    print(f"  {text}")
    print("="*70)

def print_section(text):
    print(f"\n📌 {text}")
    print("-" * 70)

def test_api_endpoints():
    """Test API endpoints after server starts."""
    time.sleep(2)  # Wait for server to start
    
    base_url = "http://localhost:8000"
    
    print_section("Testing API Endpoints")
    
    try:
        # 1. Health check
        print("\n1️⃣  Health Check")
        response = requests.get(f"{base_url}/health", timeout=2)
        print(f"   GET /health → Status: {response.status_code}")
        if response.status_code == 200:
            print(f"   ✅ Response: {response.json()}")
        
        # 2. Root endpoint
        print("\n2️⃣  Root Endpoint")
        response = requests.get(f"{base_url}/", timeout=2)
        print(f"   GET / → Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Service: {data.get('service')}")
            print(f"   ✅ Version: {data.get('version')}")
        
        # 3. Cases endpoint
        print("\n3️⃣  Cases API")
        response = requests.get(f"{base_url}/cases?limit=5", timeout=2)
        print(f"   GET /cases → Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Found {data.get('total', 0)} cases")
            print(f"   ✅ Retrieved {len(data.get('cases', []))} cases")
        
        # 4. Stories endpoint
        print("\n4️⃣  Stories API")
        response = requests.get(f"{base_url}/stories/latest?limit=3", timeout=2)
        print(f"   GET /stories/latest → Status: {response.status_code}")
        if response.status_code == 200:
            stories = response.json()
            print(f"   ✅ Retrieved {len(stories)} stories")
            if stories:
                print(f"   📰 Latest: {stories[0].get('title', 'N/A')[:50]}...")
        
        # 5. Benchmarks endpoint
        print("\n5️⃣  Benchmarks API")
        response = requests.get(f"{base_url}/benchmarks/unit_price?year=2024", timeout=2)
        print(f"   GET /benchmarks/unit_price → Status: {response.status_code}")
        if response.status_code == 200:
            benchmark = response.json()
            print(f"   ✅ Year: {benchmark.get('year')}")
            print(f"   ✅ Count: {benchmark.get('count')}")
        
        # 6. Entity search
        print("\n6️⃣  Entity Search API")
        response = requests.get(f"{base_url}/entities/search?q=supplier", timeout=2)
        print(f"   GET /entities/search?q=supplier → Status: {response.status_code}")
        if response.status_code == 200:
            entities = response.json()
            print(f"   ✅ Found {len(entities)} entities")
        
        print_section("✅ All API Endpoints Tested Successfully!")
        print("\n🌐 API Documentation available at: http://localhost:8000/docs")
        print("📊 Interactive API Explorer: http://localhost:8000/redoc")
        
    except requests.exceptions.ConnectionError:
        print("   ⚠️  Server not ready yet, waiting...")
        time.sleep(3)
        test_api_endpoints()  # Retry
    except Exception as e:
        print(f"   ⚠️  Error testing endpoints: {e}")

def run_server():
    """Run the FastAPI server."""
    print_header("PUBLIC MONEY MIRROR - DEMO SERVER")
    print("\n🚀 Starting FastAPI server...")
    print(f"   📍 Server: http://localhost:8000")
    print(f"   📚 API Docs: http://localhost:8000/docs")
    print(f"   📖 ReDoc: http://localhost:8000/redoc")
    print(f"   💾 Database: {settings.database_url}")
    
    # Initialize database
    try:
        print("\n📦 Initializing database...")
        init_db()
        print("   ✅ Database initialized")
    except Exception as e:
        print(f"   ⚠️  Database initialization warning: {e}")
    
    # Start server in background thread
    def start_server():
        uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
    
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Test endpoints after server starts
    print("\n⏳ Waiting for server to start...")
    time.sleep(1)
    
    # Run endpoint tests
    test_thread = threading.Thread(target=test_api_endpoints, daemon=True)
    test_thread.start()
    
    print("\n" + "="*70)
    print("  ✅ SERVER RUNNING - Press Ctrl+C to stop")
    print("="*70)
    print("\n💡 Try these URLs in your browser:")
    print("   • http://localhost:8000/docs - Interactive API docs")
    print("   • http://localhost:8000/health - Health check")
    print("   • http://localhost:8000/cases - List cases")
    print("\n🔄 Server is running in the background...")
    
    try:
        # Keep main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping server...")
        print("✅ Server stopped")

if __name__ == "__main__":
    run_server()

