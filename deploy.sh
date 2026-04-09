#!/bin/bash

# Deployment script for Public Money Mirror
# Supports multiple deployment platforms

set -e

echo "🚀 Public Money Mirror Deployment Script"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Install it from https://docs.docker.com/get-docker/"
        exit 1
    fi
    print_success "Docker is installed"
}

# Deploy with Docker Compose
deploy_docker_compose() {
    print_status "Deploying with Docker Compose..."
    docker-compose down
    docker-compose build
    docker-compose up -d
    print_success "Deployment complete! Backend: http://localhost:8000, Frontend: http://localhost:8501"
}

# Deploy to Streamlit Cloud
deploy_streamlit_cloud() {
    print_status "Streamlit Cloud deployment instructions:"
    echo ""
    echo "1. Push your code to GitHub"
    echo "2. Go to https://share.streamlit.io/"
    echo "3. Click 'New app' and connect your repository"
    echo "4. Set main file to: frontend_streamlit/app.py"
    echo "5. Deploy!"
    echo ""
    print_warning "Note: You'll need to deploy backend separately or use Streamlit Cloud's secrets for API URL"
}

# Main deployment menu
main() {
    echo "Select deployment method:"
    echo "1) Docker Compose (local/remote server)"
    echo "2) Streamlit Cloud (free hosting)"
    echo "3) Railway.app (recommended - free tier)"
    echo "4) Render.com (free tier)"
    echo "5) Exit"
    echo ""
    read -p "Enter choice [1-5]: " choice

    case $choice in
        1)
            check_docker
            deploy_docker_compose
            ;;
        2)
            deploy_streamlit_cloud
            ;;
        3)
            print_status "Railway deployment:"
            echo "1. Install Railway CLI: https://docs.railway.app/develop/cli"
            echo "2. Run: railway login"
            echo "3. Run: railway init"
            echo "4. Run: railway up"
            ;;
        4)
            print_status "Render deployment:"
            echo "1. Go to https://render.com"
            echo "2. Connect your GitHub repository"
            echo "3. Create a new Web Service"
            echo "4. Use these settings:"
            echo "   - Build Command: pip install -r frontend_streamlit/requirements.txt"
            echo "   - Start Command: streamlit run frontend_streamlit/app.py --server.port \$PORT"
            ;;
        5)
            exit 0
            ;;
        *)
            print_warning "Invalid choice"
            exit 1
            ;;
    esac
}

main

