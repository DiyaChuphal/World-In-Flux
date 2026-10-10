# 🌍 SHOCKWAVES
### From Global Events to Everyday Prices

**An interactive data storytelling and visualization platform exploring how global disruptions ripple through commodity markets, food prices, and international trade.**

![Project](https://img.shields.io/badge/Project-Data%20Storytelling-0D9488)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

---

## 📌 Overview

The world is deeply interconnected. A geopolitical conflict, a shipping disruption, or a sudden change in energy prices can have consequences that extend far beyond its point of origin.

But how do these changes appear in the data? Which commodities move together? When do their trends diverge? And what can historical data tell us about the potential ripple effects on food prices and global trade?

**SHOCKWAVES** is an interactive data storytelling platform designed to investigate these questions using real-world datasets.

The platform combines data acquisition, preprocessing, exploratory data analysis, statistical techniques, and interactive visualizations to transform complex datasets into meaningful, evidence-based stories.

Rather than simply displaying charts, SHOCKWAVES helps users understand what the data shows, why a pattern may matter, and what conclusions can or cannot be drawn from the evidence.

## 🎯 Project Objectives

- Analyze global commodity-price movements and historical trends.
- Explore relationships between energy, food, and fertilizer prices.
- Investigate international trade patterns and documented global disruptions.
- Automatically generate visualizations from uploaded datasets.
- Identify trends, outliers, correlations, and significant changes.
- Convert analytical findings into readable data narratives.
- Encourage evidence-based interpretation rather than assumptions.
- Make data exploration accessible through an interactive web interface.

## ✨ Key Features

### 1. 🌐 Global Shock Explorer
Explore available commodity-price data through interactive charts, date filters, comparisons, and calculated indicators.

- Historical price trends
- Percentage and absolute changes
- Month-over-month and year-over-year comparisons
- Indexed commodity comparisons
- Rolling averages and volatility
- Correlation analysis
- Peak and trough identification

### 2. 📖 Investigative Data Stories
Explore focused investigations built around real datasets and analytical questions.

**Featured investigations:**

- **The Oil-to-Food Connection:** Investigating relationships between energy and food prices.
- **The Fertilizer Shock:** Exploring fertilizer-price movements and agricultural input costs.
- **Winners and Losers of Global Trade:** Examining trade patterns and commodity exposure where country-level data is available.
- **The Hidden Cost of Global Disruptions:** Comparing historical price movements before and after documented events.

Each investigation combines visual evidence, calculated observations, explanatory context, source references, and limitations.

### 3. 📊 Upload and Analyze Any Dataset
Upload your own CSV or Excel file and explore its structure and contents.

- Dataset preview and column profiling
- Data types and descriptive statistics
- Missing-value and duplicate analysis
- Data-quality reporting
- Outlier detection
- Interactive chart generation
- Column selection and filtering
- Data cleaning and export
- Automatic chart recommendations

The application recommends visualizations based on the available data types and allows users to customize their charts.

### 4. 🧠 Automated Data Story Generator
Turn analytical results into a structured summary.

- Key observations and notable changes
- Largest increases and decreases
- Trend comparisons
- Unusual movements and outliers
- Potential relationships between variables
- Suggested follow-up questions
- Executive summaries and detailed reports

Narratives are grounded in calculated results. Optional AI-assisted rewriting can be added without making the core analysis dependent on an external AI service.

### 5. 🔬 What-If Analysis Lab
Explore hypothetical changes in selected commodity prices.

- Adjust percentage-change assumptions
- Compare baseline and scenario values
- View differences through interactive charts
- Explore alternative scenarios
- Understand assumptions and limitations

Scenarios are illustrative, not guaranteed predictions of future prices or inflation.

### 6. 📚 Data Sources and Methodology
Understand where the data comes from and how the analysis works.

- Source attribution and dataset documentation
- Date coverage and measurement units
- Data-cleaning methodology
- Statistical formulas
- Missing-data handling
- Correlation versus causation
- Known limitations and assumptions

---

## 🗂️ Data Sources

The project is designed to use publicly available datasets from credible institutions.

| Source | Purpose | Website |
|---|---|---|
| World Bank Commodity Markets | Energy, food, fertilizer and other commodity prices | [Visit](https://www.worldbank.org/en/research/commodity-markets) |
| FAO Food Price Index | Global food-price trends and category-level indices | [Visit](https://www.fao.org/worldfoodsituation/foodpricesindex/en/) |
| UNCTADstat | International trade and economic statistics | [Visit](https://unctadstat.unctad.org/datacentre/) |
| UNCTAD | Trade, transport and maritime analysis | [Visit](https://unctad.org/) |

**Data integrity:** Actual data availability, date coverage, units, and reporting frequencies are documented during ingestion. The platform must distinguish downloaded data from sample data and disclose when the latest available observations are not current.

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, TypeScript |
| Styling | Tailwind CSS |
| Visualizations | Plotly.js / Apache ECharts |
| Backend | Python, FastAPI |
| Data processing | Pandas, NumPy |
| Statistical analysis | SciPy, statsmodels |
| Machine learning | scikit-learn |
| Database | SQLite |
| Data formats | CSV, Excel, JSON |
| Testing | Pytest |

*The technologies listed above describe the intended architecture. Refer to the actual project implementation for the components currently completed.*

## 🏗️ System Architecture

```text
Official Data Sources / User Uploads
                 |
                 v
        Data Acquisition Layer
                 |
                 v
       Data Cleaning & Validation
                 |
                 v
       Processed Data Repository
                 |
                 v
      Python Analytics Engine
                 |
        +--------+--------+
        |        |        |
        v        v        v
     Trends  Statistics  Comparisons
        |        |        |
        +--------+--------+
                 |
                 v
          FastAPI Backend
                 |
                 v
       React Interactive Frontend
                 |
                 v
    Charts, Insights & Data Stories
```

## 📁 Project Structure

The intended modular structure is:

```text
SHOCKWAVES/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── charts/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── api/
│   ├── data_ingestion/
│   ├── preprocessing/
│   ├── analytics/
│   ├── storytelling/
│   ├── database/
│   ├── tests/
│   └── main.py
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── sample/
│
├── docs/
│   ├── methodology.md
│   └── data_dictionary.md
│
├── .env.example
├── .gitignore
├── README.md
└── requirements.txt
```

*Adjust this tree to match the folders and files actually present in your repository.*

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Python 3.11 or a compatible version
- Node.js and npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd SHOCKWAVES
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository's actual URL.

### 2. Set up the backend

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file using `.env.example` as a reference.

Add optional API keys only if the corresponding integrations are implemented. Never commit the `.env` file to GitHub.

### 4. Start the backend

From the project root, run:

```bash
uvicorn backend.main:app --reload
```

If your entry point is located elsewhere, adjust the import path accordingly.

Once running, open:

http://127.0.0.1:8000/docs

This opens the FastAPI interactive API documentation.

### 5. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

http://localhost:5173

### 6. Load the datasets

Download supported datasets from the documented official sources or upload them through the application.

Verify the dataset's reporting period, units, and data quality before interpreting the visualizations.

> **Note:** The commands above assume the intended folder structure and API entry point. Update them to match your implementation if necessary.

## 📈 Analytical Methods

SHOCKWAVES uses appropriate analytical techniques to investigate data patterns.

| Method | Purpose |
|---|---|
| Descriptive statistics | Summarize distributions and central tendencies |
| Percentage change | Measure relative changes over time |
| Indexed comparisons | Compare series with different units or starting values |
| Rolling averages | Examine trends while smoothing short-term fluctuations |
| Rolling volatility | Explore how variability changes over time |
| Correlation analysis | Measure associations between numerical variables |
| Outlier detection | Flag unusual observations for further investigation |
| Event-window comparisons | Compare observations before and after documented events |
| Scenario analysis | Explore hypothetical changes under explicit assumptions |

Results are interpreted in context. Correlation alone is not treated as proof of causation, and event-window comparisons are not automatically interpreted as causal effects.

## 🎨 Design Philosophy

SHOCKWAVES follows an editorial data-journalism design approach.

- Dark, research-oriented interface
- Clear typography and visual hierarchy
- Interactive, responsive visualizations
- Restrained accent colors
- Readable charts with labels and tooltips
- Explanations alongside analytical findings
- Source attribution and transparent limitations

The goal is to make complex global trends understandable without sacrificing analytical rigor.

## 🔐 Data Integrity and Responsible Analysis

The platform follows these principles:

- Use traceable and attributable data sources.
- Never represent fabricated values as real observations.
- Clearly identify sample datasets.
- Preserve missing-value information.
- Document data transformations and assumptions.
- Distinguish observations from hypotheses.
- Avoid unsupported causal claims.
- Disclose data coverage and freshness.
- Treat scenario outputs as hypothetical.
- Validate user-uploaded files and handle errors safely.

## 🔮 Future Enhancements

Potential future improvements include:

- Automated scheduled data updates
- More country-level trade and supply-chain datasets
- Interactive global shipping-route visualizations
- Advanced time-series analysis
- Explainable forecasting where sufficient data exists
- AI-assisted natural-language querying
- Downloadable investigative reports
- Saved analyses and shareable data stories
- Additional public datasets covering climate and economic indicators

These enhancements will be added only when reliable data and suitable methods are available.

## 🎓 Academic Relevance

This project demonstrates practical applications of:

- Data acquisition and preprocessing
- Exploratory data analysis
- Statistical analysis
- Interactive data visualization
- Data storytelling
- Full-stack application development
- Responsible data interpretation
- Analytical communication

It is designed as a Data Science portfolio project that connects technical implementation with real-world questions.

## 👩‍💻 Author

**Diya Chuphal**

B.Tech Integrated Data Science

School of Engineering & Technology

MGM University, Chhatrapati Sambhajinagar, Maharashtra, India

### Project Focus

Data Science · Data Analytics · Data Visualization · Data Storytelling · Statistical Analysis · Interactive Web Applications

---

## ⭐ Support

If you find the project interesting, consider giving the repository a star ⭐.

Feedback, suggestions, and contributions to improve the analysis and visualization experience are welcome.

---

**SHOCKWAVES — Explore the data. Question the patterns. Understand the ripple effects.**
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
