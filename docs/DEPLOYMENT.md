# 🚀 Make Your Public Money Mirror Shareable

Your Public Money Mirror is now working with realistic German budget data! Here are several ways to share it with others.

---

## 🌐 Option 1: Local Network (Quick & Easy)

Your site is already accessible on your local network!

### Share Your Local URL
**Network URL:** `http://192.168.0.7:8501`

Anyone on the same WiFi network can visit this URL to see your dashboard.

**Note:** Your computer must be on and the services running for others to access it.

---

## ☁️ Option 2: Streamlit Cloud (Recommended - Free!)

Streamlit offers free hosting for your app!

### Setup Steps:

1. **Create a GitHub Repository**
   ```bash
   cd /Users/mikel
   git init
   git add .
   git commit -m "Public Money Mirror - German budget tracker"
   ```

2. **Push to GitHub**
   - Create a new repo at https://github.com/new
   - Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/public-money-mirror.git
   git push -u origin main
   ```

3. **Deploy to Streamlit Cloud**
   - Go to https://share.streamlit.io
   - Sign in with GitHub
   - Click "New app"
   - Select your repository
   - Set:
     - **Main file:** `frontend_streamlit/app.py`
     - **Branch:** `main`
   - Click "Deploy"

4. **Configure Backend** (Streamlit doesn't support separate backends)
   - You'll need to integrate the backend logic into Streamlit
   - Or use a separate hosting for the backend (see Option 3)

**Result:** Your app will be live at `https://YOUR_APP_NAME.streamlit.app`

---

## 🐳 Option 3: Full Stack Deployment

Host both backend and frontend separately for best performance.

### Backend: Render.com (Free Tier)

1. **Create `Procfile`** in `/Users/mikel/backend/`:
   ```
   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

2. **Create `runtime.txt`**:
   ```
   python-3.13.5
   ```

3. **Deploy**:
   - Go to https://render.com
   - Create new Web Service
   - Connect GitHub repo
   - Render will auto-detect and deploy

### Frontend: Streamlit Cloud (Free)

Deploy frontend separately as in Option 2, but update API_BASE to point to your Render backend URL.

---

## 📦 Option 4: Docker (Portable)

Create a Docker container that anyone can run.

### Create `Dockerfile`

```dockerfile
FROM python:3.13-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend
COPY backend/requirements.txt backend/
RUN pip install -r backend/requirements.txt

# Copy frontend  
COPY frontend_streamlit/requirements.txt frontend_streamlit/
RUN pip install -r frontend_streamlit/requirements.txt

# Copy app code
COPY . .

WORKDIR /app/frontend_streamlit

EXPOSE 8501

CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

### Create `docker-compose.yml`

```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    working_dir: /app/backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000
    environment:
      - USE_MOCK_DATA=true
  
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8501:8501"
    depends_on:
      - backend
    environment:
      - API_BASE=http://backend:8000
```

### Build & Run

```bash
docker-compose up --build
```

---

## 🔗 Option 5: ngrok (Instant Public URL)

Create a temporary public URL to your local server.

1. **Install ngrok**:
   ```bash
   brew install ngrok
   ```

2. **Create account** at https://ngrok.com (free)

3. **Run**:
   ```bash
   ngrok http 8501
   ```

4. **Share the ngrok URL** - like `https://abc123.ngrok.io`

**Note:** Free tier URLs are temporary and change each time you restart ngrok.

---

## 📊 Current Setup Summary

✅ **Backend:** Running on http://localhost:8000
✅ **Frontend:** Running on http://localhost:8501
✅ **Network URL:** http://192.168.0.7:8501
✅ **Data Source:** Mock German federal budget data (2024 estimates)
✅ **Features:** Distribution charts, stories, cache management

---

## 🎯 Quick Share Right Now

**For immediate sharing on your local network:**

1. Your services are running
2. Share this URL: **http://192.168.0.7:8501**
3. Tell people to connect to the same WiFi

**Best long-term solution:**
- Deploy to Streamlit Cloud (free, permanent URL)
- Or use Render.com for full control

---

## 🔒 Privacy & Security Notes

⚠️ **Current setup:**
- No authentication
- Cache is local only
- Mock data only

**For production:**
- Add user authentication
- Secure API endpoints
- Add rate limiting
- Use HTTPS/SSL
- Consider adding real data APIs

---

## 📝 Need Help?

- Streamlit Cloud: https://docs.streamlit.io/streamlit-community-cloud
- Render Docs: https://render.com/docs
- Docker: https://docs.docker.com/get-started/

