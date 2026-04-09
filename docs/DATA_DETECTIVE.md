# 🕵️ Data Detective Features

## Overview

The Data Detective features transform Public Money Mirror into a powerful tool for finding stories in the numbers, detecting potential waste, and presenting investigative narratives to citizens and schools.

## Features

### 1. Anomaly Detection 🔍

The system automatically detects anomalies in budget distribution:

- **Below Benchmark**: Spending below typical EU averages for a category
- **Above Benchmark**: Spending above typical ranges without clear justification
- **Concentration**: Too much budget concentrated in top categories
- **Rapid Increase**: Year-over-year increases exceeding thresholds

### 2. Investigative Stories 📖

Automatically generated stories that connect numbers to real-world impacts:

- **Per-citizen calculations**: Shows what each person contributes
- **Concrete examples**: Translates billions into tangible items (schools, teachers, etc.)
- **Historical trends**: Shows how spending has changed over time
- **EU comparisons**: Compares Germany to European neighbors
- **Red flags**: Highlights anomalies that need investigation

### 3. School-Ready Materials 📚

Ready-to-use educational materials for different grade levels:

- **Grade 5-7**: Simple, engaging stories about budget basics
- **Grade 8-10**: Deeper analysis with questions and activities
- **Grade 11-13**: Critical analysis suitable for advanced students

Each story includes:
- Compelling narrative
- Discussion questions
- Activity suggestions
- Real data connections

### 4. Data Detective Tab 🕵️

A dedicated frontend tab that:
- Shows detected anomalies with severity levels
- Displays investigative stories for top categories
- Provides actionable recommendations
- Presents findings in citizen-friendly language

## API Endpoints

### `/detective/insights`
Get comprehensive insights including:
- Detected anomalies
- Top investigative stories
- Recommendations
- Summary statistics

### `/detective/story/{category}`
Get investigative story for a specific category with:
- Narrative explanation
- Human impact calculations
- Historical context
- Detected anomalies

### `/detective/anomalies`
Get all detected anomalies filtered by severity

### `/school/story/{category}/{grade_level}`
Get ready-to-use story for schools:
- `category`: Spending category (e.g., "Education & Research")
- `grade_level`: "grade_5_7", "grade_8_10", or "grade_11_13"

Returns story with questions and activities.

## How It Works

### Anomaly Detection Algorithm

1. **Benchmark Comparison**: Compares each category's percentage against EU average ranges
2. **Concentration Analysis**: Checks if top categories consume too much of budget
3. **Trend Analysis**: Identifies rapid changes in spending patterns
4. **Severity Assessment**: Classifies anomalies as high, medium, or low severity

### Story Generation

1. **Data Collection**: Gathers category data, historical trends, and anomalies
2. **Human Impact**: Calculates per-citizen and per-household metrics
3. **Concrete Examples**: Translates abstract billions into real-world items
4. **Context Addition**: Adds EU comparisons and trend analysis
5. **Narrative Assembly**: Combines into compelling, citizen-friendly story

## Example Output

### Anomaly Example
```
{
  "category": "Education & Research",
  "type": "below_benchmark",
  "severity": "medium",
  "percentage": 6.0,
  "expected_range": "5-8%",
  "description": "Education & Research receives 6.0% of budget, below typical range of 5-8%",
  "investigation": "Investigate: Is Education & Research underfunded? Compare with outcomes and EU averages.",
  "potential_impact": "Lower education & research funding may impact services quality or availability."
}
```

### Story Example
A complete investigative story includes:
- Category name and budget amount
- Personal share calculations
- Concrete examples (e.g., "could build X schools")
- Historical trend analysis
- EU comparison
- Detected anomalies
- Call to action

## Use Cases

### For Citizens
1. **Understand Your Tax Euros**: See exactly where your money goes
2. **Spot Waste**: Anomaly detection highlights potential issues
3. **Ask Questions**: Stories provide talking points for representatives
4. **Stay Informed**: Trend analysis shows changing priorities

### For Schools
1. **Ready-Made Lessons**: Stories designed for specific grade levels
2. **Real Data**: Students work with actual budget numbers
3. **Critical Thinking**: Questions encourage analysis and debate
4. **Democracy Education**: Learn how public finances work

### For Journalists
1. **Story Ideas**: Anomalies suggest investigation areas
2. **Context**: Stories provide background for articles
3. **Comparisons**: EU benchmarks support reporting
4. **Trends**: Historical data shows changes over time

## Technical Details

### Efficiency Benchmarks
Based on EU averages and best practices:
- **Social Security**: 40-50% typical range
- **Defense**: 12-18%
- **Education & Research**: 5-8%
- **Infrastructure**: 3-6%
- **Environment & Energy**: 4-7%

### Red Flag Thresholds
- **Rapid Increase**: >20% year-over-year
- **Declining Efficiency**: >15% per-capita vs outcomes
- **Concentration**: >60% to single subcategory
- **Below Benchmark**: 10% below EU average
- **Above Benchmark**: 20% above EU average

## Future Enhancements

- Machine learning for more sophisticated anomaly detection
- Integration with audit reports for validation
- Automated report generation
- Export to PDF for sharing
- Multi-language support for stories
- Customizable benchmarks by user preferences

## Notes

- All benchmarks and comparisons are illustrative based on EU averages
- Anomalies are **indicators**, not proof of waste
- Always verify findings with official sources
- Stories are automatically generated and may need fact-checking for publication

---

**Remember**: This is YOUR money. Every euro should benefit all. The Data Detective helps ensure transparency and accountability.







