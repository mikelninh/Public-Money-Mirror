# Multi-stage build for Public Money Mirror
FROM python:3.11-slim as backend

WORKDIR /app/backend

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Expose backend port
EXPOSE 8000

# Run backend
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Frontend stage (uncomment if deploying standalone)
# FROM python:3.11-slim as frontend
# 
# WORKDIR /app/frontend
# 
# # Install frontend dependencies
# COPY frontend_streamlit/requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt
# 
# # Copy frontend code
# COPY frontend_streamlit/ .
# 
# # Expose frontend port
# EXPOSE 8501
# 
# # Run frontend
# CMD ["streamlit", "run", "app.py", "--server.port", "8501", "--server.address", "0.0.0.0"]

