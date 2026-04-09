# Quick Start - Public Money Mirror Dashboard

## 🚀 Access the Dashboard

**Open in your browser:** http://localhost:8501

## 📊 What You'll See

### 🏠 Home Page
- Welcome message
- Latest stories with narratives
- Summary metrics

### 📋 Cases Page
- Interactive charts (bar charts, scatter plots)
- Filter cases by score and EUR estimate
- Case table with details
- Visualizations of potential savings

### 📰 Stories Page
- Story cards with narratives
- "What we found" and "Why it matters"
- EUR estimates and confidence levels
- Source links

### 📊 Benchmarks Page
- Unit price analysis
- Filter by CPV code, region, year

### 📦 Recovery Kits Page
- Generate recovery kits for cases
- Include benchmarks, alternatives, draft letters

### 💳 Billing Page
- Create success fee invoices
- Calculate invoice amounts

## 🔧 Troubleshooting

### If dashboard doesn't load:

1. **Check if Streamlit is running:**
   ```bash
   ps aux | grep streamlit
   ```

2. **Restart the dashboard:**
   ```bash
   cd src/frontend_streamlit
   python3 -m streamlit run app.py --server.port 8501
   ```

3. **Check backend API:**
   ```bash
   curl http://localhost:8000/health
   ```

4. **Check for errors:**
   - Look at the terminal where Streamlit is running
   - Check browser console for errors

## 💡 Tips

- The dashboard works even without data
- You can explore all UI features
- To add sample data: `python scripts/seed_synthetic_data.py`
- Backend API docs: http://localhost:8000/docs

## 🎯 Next Steps

1. Open http://localhost:8501 in your browser
2. Navigate through the pages using the sidebar
3. Explore the interactive charts and filters
4. Read the stories behind the numbers

