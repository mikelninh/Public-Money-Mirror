#!/usr/bin/env python3
"""Start the Streamlit dashboard for Public Money Mirror."""
import subprocess
import sys
import os

def main():
    """Start Streamlit dashboard."""
    print("="*70)
    print("  PUBLIC MONEY MIRROR - DASHBOARD")
    print("="*70)
    print("\n🚀 Starting Streamlit dashboard...")
    print("   📍 URL: http://localhost:8501")
    print("   📊 Dashboard: Cases, Benchmarks, Recovery Kits")
    print("\n⏳ Starting server...")
    
    # Change to streamlit directory
    streamlit_dir = os.path.join(os.path.dirname(__file__), 'src/frontend_streamlit')
    os.chdir(streamlit_dir)
    
    # Start streamlit
    try:
        subprocess.run([sys.executable, "-m", "streamlit", "run", "app.py", "--server.port", "8501"], check=True)
    except KeyboardInterrupt:
        print("\n\n🛑 Dashboard stopped")
    except Exception as e:
        print(f"\n❌ Error starting dashboard: {e}")
        print("\n💡 Make sure streamlit is installed:")
        print("   pip install streamlit plotly requests")

if __name__ == "__main__":
    main()

