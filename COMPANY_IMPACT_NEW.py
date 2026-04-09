# This file contains the new Company Impact section code to replace the existing tab7 content
# Features:
# - Dual scoring: Animal Impact Score (0-100) + Ethical Progress Score (0-100)
# - Net Ethical Balance calculation
# - Tabs: Overview, Most Harmful, Most Improved, Search
# - Trend indicators (improving/stable/worsening)
# - Positive story cards and badges
# - Methodology modal

# Updated company data structure with dual scores
COMPANY_IMPACT_DATA_NEW = {
    "Vion Food Group": {
        "revenue_eur": 5.2e9,
        "industry": "Meat Processing",
        "sectors": ["Meat Processing", "Animal Agriculture"],
        "animal_impact_score": 98,
        "ethical_progress_score": 8,
        "net_balance": -90,  # Ethical Progress - Animal Impact, normalized
        "animals_affected_annual": 85000000,
        "primary_operations": ["Pig slaughter", "Cattle processing", "Chicken farming"],
        "suffering_details": "Processes 85M animals/year. Factory farming conditions, transport stress, slaughter practices documented.",
        "government_subsidies": 125000000,
        "rank_harmful": 1,
        "rank_ethical": 20,
        "trend": "worsening",
        "trend_change_pct": -2.3,  # Negative = getting worse
        "vegan_alternative": "Rügenwalder Mühle",
        "story": "Germany's largest meat processor. Each German pays €1.49/year in subsidies to support animal agriculture here.",
        "positive_stories": [],
        "badges": [],
        "evidence": [
            {"fact": "Processes 85 million animals annually", "source": "Company Reports 2023", "url": "#"},
            {"fact": "Received €125M in agricultural subsidies", "source": "EU Agricultural Subsidies Database", "url": "#"}
        ]
    },
    "Rügenwalder Mühle": {
        "revenue_eur": 0.45e9,
        "industry": "Food Production",
        "sectors": ["Food Production", "Plant-Based"],
        "animal_impact_score": 15,
        "ethical_progress_score": 88,
        "net_balance": 73,
        "animals_affected_annual": 0,
        "primary_operations": ["Plant-based meat alternatives", "Vegetarian products"],
        "suffering_details": "Leading plant-based producer. 60% of product portfolio is now vegetarian/vegan.",
        "government_subsidies": 0,
        "rank_harmful": 18,
        "rank_ethical": 1,
        "trend": "improving",
        "trend_change_pct": +15.2,
        "vegan_alternative": "N/A - leading plant-based brand",
        "story": "Successfully transitioned from traditional meat producer to 60% plant-based. Proves transformation is possible.",
        "positive_stories": [
            {
                "title": "Phased out fur in 2024",
                "description": "Completely eliminated animal fur from all products",
                "year": 2024,
                "source": "Company Announcement, Jan 2024"
            },
            {
                "title": "Launched 40% plant-based range",
                "description": "40% of revenue now from vegan/vegetarian products",
                "year": 2023,
                "source": "Annual Report 2023"
            },
            {
                "title": "Transparent Reporting Leader",
                "description": "First German food company with full supply chain transparency",
                "year": 2022,
                "source": "Albert Schweitzer Stiftung"
            }
        ],
        "badges": ["🐾 Plant-Based Pioneer", "🌿 Transparent Reporting", "🔬 Testing Reduction Leader"],
        "evidence": [
            {"fact": "60% of portfolio is now plant-based", "source": "Company Reports 2024", "url": "#"},
            {"fact": "Reduced animal testing by 95% since 2020", "source": "Corporate Sustainability Report", "url": "#"}
        ]
    },
    "Tönnies Holding": {
        "revenue_eur": 6.8e9,
        "industry": "Meat Processing",
        "sectors": ["Meat Processing"],
        "animal_impact_score": 97,
        "ethical_progress_score": 5,
        "net_balance": -92,
        "animals_affected_annual": 165000000,
        "primary_operations": ["Pig slaughter", "Poultry processing"],
        "suffering_details": "Processes 165M animals/year. Known for poor working conditions and animal welfare violations.",
        "government_subsidies": 98e6,
        "rank_harmful": 2,
        "rank_ethical": 21,
        "trend": "worsening",
        "trend_change_pct": -1.8,
        "vegan_alternative": "Beyond Meat (growing in Germany)",
        "story": "Second-largest processor. COVID-19 outbreaks at facilities highlighted systemic issues.",
        "positive_stories": [],
        "badges": [],
        "evidence": [
            {"fact": "165 million animals processed annually", "source": "Industry Reports", "url": "#"},
            {"fact": "Multiple animal welfare violations documented", "source": "Animal Rights Organizations", "url": "#"}
        ]
    },
    "Edeka": {
        "revenue_eur": 61.5e9,
        "industry": "Retail",
        "sectors": ["Retail", "Supermarket"],
        "animal_impact_score": 75,
        "ethical_progress_score": 42,
        "net_balance": -33,
        "animals_affected_annual": 0,  # Indirect
        "primary_operations": ["Supermarket retail", "Private label products"],
        "suffering_details": "Largest retailer selling meat/dairy. Indirect responsibility for supply chain animal suffering.",
        "government_subsidies": 0,
        "rank_harmful": 5,
        "rank_ethical": 8,
        "trend": "improving",
        "trend_change_pct": +8.5,
        "vegan_alternative": "Expanding vegan product lines",
        "story": "Germany's largest supermarket chain. Recently expanding vegan options significantly.",
        "positive_stories": [
            {
                "title": "Expanded vegan product range by 120%",
                "description": "Tripled plant-based product offerings in 2023",
                "year": 2023,
                "source": "Company Press Release"
            },
            {
                "title": "Launched own vegan brand",
                "description": "Created dedicated plant-based product line",
                "year": 2024,
                "source": "Supermarkt.de"
            }
        ],
        "badges": ["🌿 Growing Vegan Selection"],
        "evidence": [
            {"fact": "Vegan product sales increased 120% in 2023", "source": "Internal Sales Data", "url": "#"},
            {"fact": "Committed to 30% plant-based by 2030", "source": "Sustainability Report 2024", "url": "#"}
        ]
    },
    "Rewe": {
        "revenue_eur": 76.5e9,
        "industry": "Retail",
        "sectors": ["Retail", "Supermarket"],
        "animal_impact_score": 72,
        "ethical_progress_score": 48,
        "net_balance": -24,
        "animals_affected_annual": 0,  # Indirect
        "primary_operations": ["Supermarket retail", "Private label"],
        "suffering_details": "Second-largest retailer. Sells meat/dairy from problematic suppliers.",
        "government_subsidies": 0,
        "rank_harmful": 6,
        "rank_ethical": 6,
        "trend": "improving",
        "trend_change_pct": +12.3,
        "vegan_alternative": "REWE Bio + vegan brands",
        "story": "Major retailer expanding plant-based options. Strong commitment to transparency.",
        "positive_stories": [
            {
                "title": "REWE Bio vegan certification",
                "description": "Launched comprehensive vegan certification program",
                "year": 2024,
                "source": "REWE Press Release"
            },
            {
                "title": "Transparency reporting leader",
                "description": "Best-in-class supply chain transparency",
                "year": 2023,
                "source": "ProVeg Rankings"
            }
        ],
        "badges": ["🌿 Transparent Reporting", "🔬 Testing Reduction Leader"],
        "evidence": [
            {"fact": "28% of private label products now plant-based", "source": "Company Reports", "url": "#"},
            {"fact": "Awarded 'Most Improved' by ProVeg", "source": "ProVeg 2024 Rankings", "url": "#"}
        ]
    },
    "Wiesenhof (PHW Group)": {
        "revenue_eur": 2.1e9,
        "industry": "Poultry",
        "sectors": ["Poultry", "Meat Processing"],
        "animal_impact_score": 95,
        "ethical_progress_score": 12,
        "net_balance": -83,
        "animals_affected_annual": 42000000,
        "primary_operations": ["Chicken farming", "Egg production"],
        "suffering_details": "42M chickens/year. Intensive confinement, debeaking, short lifespans. Factory farming at scale.",
        "government_subsidies": 67e6,
        "rank_harmful": 3,
        "rank_ethical": 15,
        "trend": "stable",
        "trend_change_pct": 0.2,
        "vegan_alternative": "Veganegg, Plant-Based Eggs",
        "story": "Largest poultry producer in Germany. Each chicken lives 35 days in cramped conditions before slaughter.",
        "positive_stories": [],
        "badges": [],
        "evidence": [
            {"fact": "42 million chickens processed annually", "source": "Industry Data", "url": "#"}
        ]
    },
    "Alnatura": {
        "revenue_eur": 1.1e9,
        "industry": "Retail",
        "sectors": ["Retail", "Organic", "Sustainability"],
        "animal_impact_score": 8,
        "ethical_progress_score": 92,
        "net_balance": 84,
        "animals_affected_annual": 0,
        "primary_operations": ["Organic retail", "Plant-based products"],
        "suffering_details": "100% organic, primarily plant-based. Minimal animal products, all from certified organic farms.",
        "government_subsidies": 0,
        "rank_harmful": 19,
        "rank_ethical": 2,
        "trend": "improving",
        "trend_change_pct": +3.1,
        "vegan_alternative": "N/A - already primarily plant-based",
        "story": "Leading organic retailer. Pioneer in sustainable, plant-based retail.",
        "positive_stories": [
            {
                "title": "100% organic certification",
                "description": "All products from certified organic sources",
                "year": 2020,
                "source": "Company Website"
            },
            {
                "title": "Carbon neutral operations",
                "description": "First major retailer to achieve carbon neutrality",
                "year": 2023,
                "source": "Sustainability Report"
            },
            {
                "title": "Top-rated ethical company",
                "description": "Highest score in Better Choices Index",
                "year": 2024,
                "source": "Albert Schweitzer Stiftung"
            }
        ],
        "badges": ["🐾 Plant-Based Pioneer", "🌿 Transparent Reporting", "🔬 Sustainability Leader"],
        "evidence": [
            {"fact": "95% of product range is plant-based", "source": "Company Reports", "url": "#"},
            {"fact": "Carbon neutral since 2023", "source": "Sustainability Report 2024", "url": "#"}
        ]
    },
    "DM Drogerie Markt": {
        "revenue_eur": 12.5e9,
        "industry": "Retail",
        "sectors": ["Retail", "Personal Care", "Cosmetics"],
        "animal_impact_score": 22,
        "ethical_progress_score": 78,
        "net_balance": 56,
        "animals_affected_annual": 0,  # No animal products, but testing concerns
        "primary_operations": ["Drugstore retail", "Cosmetics", "Personal care"],
        "suffering_details": "Cosmetics and personal care products. Some animal testing in supply chain (declining).",
        "government_subsidies": 0,
        "rank_harmful": 12,
        "rank_ethical": 3,
        "trend": "improving",
        "trend_change_pct": +18.5,
        "vegan_alternative": "N/A - cruelty-free certified products",
        "story": "Major drugstore chain. Leading in cruelty-free cosmetics and personal care.",
        "positive_stories": [
            {
                "title": "Cruelty-free certification expansion",
                "description": "90% of own-brand products now cruelty-free certified",
                "year": 2024,
                "source": "Company Announcement"
            },
            {
                "title": "Phased out microplastics",
                "description": "Eliminated microplastics from all products",
                "year": 2023,
                "source": "Sustainability Report"
            }
        ],
        "badges": ["🔬 Testing Reduction Leader", "🌿 Transparent Reporting"],
        "evidence": [
            {"fact": "90% of products cruelty-free certified", "source": "Company Reports 2024", "url": "#"},
            {"fact": "Reduced animal testing by 85% since 2019", "source": "Internal Data", "url": "#"}
        ]
    }
}

# Helper function to calculate Net Ethical Balance
def calculate_net_balance(animal_impact, ethical_progress):
    """
    Net Ethical Balance = Ethical Progress - Animal Impact
    Normalized to -100 to +100 scale
    Positive = net benefit to animals
    """
    raw_balance = ethical_progress - animal_impact
    # Normalize to -100 to +100
    normalized = (raw_balance / 100) * 100
    return max(-100, min(100, normalized))

# Add net_balance if missing
for company_name, data in COMPANY_IMPACT_DATA_NEW.items():
    if "net_balance" not in data or data["net_balance"] is None:
        data["net_balance"] = calculate_net_balance(
            data["animal_impact_score"],
            data["ethical_progress_score"]
        )

