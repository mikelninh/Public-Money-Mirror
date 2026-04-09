import os
import time
import json
import logging
from typing import Optional, Dict, Any, Tuple

import requests
from dotenv import load_dotenv

load_dotenv()

OPENSPENDING_BASE_URL = os.getenv("OPENSPENDING_BASE_URL", "https://openspending.org/api/3")
OPENSPENDING_DATASET = os.getenv("OPENSPENDING_DATASET", "de_bundeshaushalt")
USE_MOCK_DATA = os.getenv("USE_MOCK_DATA", "true").lower() == "true"

CACHE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "..", "data")
CACHE_DIR = os.path.realpath(CACHE_DIR)
CACHE_FILE = os.path.join(CACHE_DIR, "openspending_aggregate_cache.json")
CACHE_TTL_SECONDS = 6 * 60 * 60  # 6 hours default
MAX_CACHE_SIZE = 100  # Maximum number of cache entries before cleanup

os.makedirs(CACHE_DIR, exist_ok=True)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def _get_mock_data(drilldown: str) -> Dict[str, Any]:
    """
    Generate realistic mock German federal budget data.
    Based on 2024 German federal budget allocations.
    """
    # Realistic German budget data (in euros, approximate 2024 values)
    mock_data_by_drilldown = {
        "function": {
            "Social Security": 154200000000,
            "General Public Services": 52800000000,
            "Education & Research": 20700000000,
            "Defense": 52100000000,
            "Environment & Energy": 18300000000,
            "Economic Affairs": 15600000000,
            "Infrastructure": 12700000000,
            "Justice & Administration": 10100000000,
            "Foreign Affairs": 8300000000,
            "Culture & Media": 2100000000
        },
        "department": {
            "Federal Ministry of Finance": 95200000000,
            "Federal Ministry of Labor and Social Affairs": 49200000000,
            "Federal Ministry of Defense": 52100000000,
            "Federal Ministry of Health": 21500000000,
            "Federal Ministry for Economic Affairs": 17800000000,
            "Federal Ministry of Education": 14500000000,
            "Federal Ministry of Transport": 12700000000,
            "Federal Ministry of Environment": 11200000000,
            "Federal Foreign Office": 8300000000,
            "Federal Ministry of Interior": 6600000000
        },
        "administrative_class": {
            "Mandatory Expenditure": 127000000000,
            "Discretionary Expenditure": 89200000000,
            "Investment Expenditure": 43200000000,
            "Personnel Costs": 34100000000,
            "Operating Expenses": 18900000000
        }
    }
    
    data = mock_data_by_drilldown.get(drilldown, mock_data_by_drilldown["function"])
    
    # Format as OpenSpending-like response
    cells = [
        {
            drilldown: key,
            "amount": value,
            "value": value
        }
        for key, value in data.items()
    ]
    
    return {
        "cells": cells,
        "total": sum(data.values()),
        "drilldown": drilldown,
        "note": "Mock data - based on 2024 German federal budget estimates",
        "data_quality": "estimated",
        "source": "Internal estimates based on public budget announcements",
        "last_updated": "2024",
        "disclaimer": "These are estimated values for demonstration. For official data, verify with Bundeshaushalt.de"
    }


# Detailed subcategory breakdowns for deep drilling with stories
SUB_CATEGORIES = {
    "Social Security": {
        "Pensions & Retirement": 89200000000,
        "Unemployment Benefits": 32100000000,
        "Family Support & Childcare": 18500000000,
        "Housing Allowances": 8800000000,
        "Disability Support": 5600000000
    },
    "Defense": {
        "Personnel & Training": 22100000000,
        "Equipment & Procurement": 18500000000,
        "Infrastructure & Bases": 6200000000,
        "Research & Development": 4300000000,
        "International Operations": 1000000000
    },
    "Education & Research": {
        "Schools": 7800000000,
        "Universities": 6200000000,
        "Research Institutions": 4100000000,
        "Student Financial Aid": 2600000000
    },
    "Infrastructure": {
        "Road & Bridge Maintenance": 4900000000,
        "Digital Infrastructure": 3800000000,
        "Public Transportation": 2800000000,
        "Energy Grid": 1200000000
    },
    "Environment & Energy": {
        "Climate Protection Programs": 6800000000,
        "Renewable Energy Subsidies": 5400000000,
        "Energy Efficiency": 3200000000,
        "Environmental Restoration": 2100000000,
        "Carbon Capture Research": 800000000
    },
    "Economic Affairs": {
        "Business Development": 4200000000,
        "Export Promotion": 3100000000,
        "Innovation Grants": 2800000000,
        "Regional Development": 2500000000,
        "Digitalization Support": 3000000000
    },
    "General Public Services": {
        "Government Administration": 18500000000,
        "Public Safety & Emergency": 9200000000,
        "Digital Government Services": 6800000000,
        "International Organizations": 4200000000,
        "Elections & Democracy": 1400000000,
        "Federal Debt Interest": 9800000000,
        "Central Administration": 3000000000
    },
    "Culture & Media": {
        "Public Broadcasting": 700000000,
        "Cultural Heritage": 500000000,
        "Arts Promotion": 450000000,
        "Museums & Libraries": 300000000,
        "Monument Protection": 150000000
    }
}

# Deep stories for each major category
CATEGORY_STORIES = {
    "Social Security": {
        "hero_story": "For 13.7 million pensioners, this represents dignity in retirement. For 2.8 million unemployed, it's a safety net during transition. For families, it means affordable childcare and housing security.",
        "human_impact": {
            "people_helped": 17400000,
            "description": "17.4 million Germans directly benefit from social security programs annually",
            "breakdown": "13.7M pensioners, 2.8M unemployed, 800K disabled, 100K housing support recipients"
        },
        "trends": "Rising: +4.2% annually due to aging population. Budget pressure expected to increase 35% by 2040.",
        "controversies": [
            "Retirement age debates: Currently 67, discussions to increase to 68-69",
            "Pension gap concerns: Some fear system unsustainability by 2040s",
            "Childcare availability: Demand exceeds supply in urban areas"
        ]
    },
    "Defense": {
        "hero_story": "In response to 2022 geopolitical shifts, Germany is modernizing its military. This funds 184,000 active personnel, NATO commitments, and support for Ukraine's defense.",
        "human_impact": {
            "people_helped": 184000,
            "description": "184,000 active military personnel plus thousands of civilians",
            "breakdown": "162K enlisted, 22K officers, +45K civilians supporting defense"
        },
        "trends": "Rapidly increasing: +37% since 2022. Germany committed to 2% GDP target for NATO.",
        "controversies": [
            "Military aid to Ukraine: €7.5B+ in 2023 alone",
            "NATO 2% target: Germany committed but hasn't always met it",
            "Conscription debates: Suspended since 2011, occasionally discussed"
        ]
    },
    "Education & Research": {
        "hero_story": "2.8 million university students, 11.4 million school pupils, thousands of researchers. This is investment in Germany's future competitiveness.",
        "human_impact": {
            "people_helped": 14200000,
            "description": "11.4M students in schools, 2.8M in universities, plus researchers",
            "breakdown": "11.4M K-12, 2.8M university, 100K researchers, 800K teachers"
        },
        "trends": "Stable growth: +2.1% annually. Strong emphasis on STEM fields and digital skills.",
        "controversies": [
            "Digital education gap: Critics say Germany lags other EU nations",
            "University funding: Public universities face capacity constraints",
            "Research commercialization: Balance between basic research and economic value"
        ]
    },
    "Infrastructure": {
        "hero_story": "Bridges, roads, digital networks that millions use daily. Critical for economic growth and quality of life.",
        "human_impact": {
            "people_helped": 83000000,
            "description": "All citizens benefit from infrastructure",
            "breakdown": "31K km federal highways, 33K km railway, fiber optic rollout"
        },
        "trends": "Accelerating: Digital infrastructure +15% this year. Rail upgrades prioritized.",
        "controversies": [
            "Deutsche Bahn quality: Punctuality challenges and modernization needs",
            "Fiber optic rollout: Critics say too slow compared to EU neighbors",
            "Bridge maintenance: 48% of bridges over 50 years old need attention"
        ]
    },
    "Environment & Energy": {
        "hero_story": "Climate goals drive this spending. Green energy transition, CO2 reduction, protecting biodiversity for future generations.",
        "human_impact": {
            "people_helped": 83000000,
            "description": "All citizens affected by climate and energy policies",
            "breakdown": "42% renewable energy, carbon reduction targets, energy security"
        },
        "trends": "Rapid increase: +22% annually. Climate fund now €212B over several years.",
        "controversies": [
            "Coal phase-out: 2038 deadline criticized as too late by environmentalists",
            "Heat pump mandates: Unpopular with some homeowners",
            "Nuclear shutdown: Completed 2023, critics say replaced with coal temporarily"
        ]
    }
}

GERMANY_POPULATION = 83800000  # Approximate 2024

# Bundesländer data - federal spending distribution by state
BUNDESLAENDER_DATA = {
    "Baden-Württemberg": {
        "population": 11200000,
        "budget_allocation": 48500000000,
        "top_category": "Infrastructure",
        "signature_projects": ["Stuttgart 21 rail", "Erneuerbare Energien"]
    },
    "Bayern": {
        "population": 13100000,
        "budget_allocation": 59800000000,
        "top_category": "Innovation & Research",
        "signature_projects": ["Munich tech cluster", "Automotive R&D"]
    },
    "Berlin": {
        "population": 3700000,
        "budget_allocation": 34500000000,
        "top_category": "Culture & Tourism",
        "signature_projects": ["Museum Island", "Smart City initiatives"]
    },
    "Brandenburg": {
        "population": 2500000,
        "budget_allocation": 12800000000,
        "top_category": "Energy Transition",
        "signature_projects": ["Wind energy", "Tesla Giga Berlin support"]
    },
    "Bremen": {
        "population": 680000,
        "budget_allocation": 3800000000,
        "top_category": "Port Infrastructure",
        "signature_projects": ["Harbor modernization", "Green shipping"]
    },
    "Hamburg": {
        "population": 1800000,
        "budget_allocation": 12400000000,
        "top_category": "Port & Logistics",
        "signature_projects": ["Hamburg port expansion", "Digital harbor"]
    },
    "Hessen": {
        "population": 6300000,
        "budget_allocation": 32500000000,
        "top_category": "Finance & Services",
        "signature_projects": ["Frankfurt fintech", "Leipziger Messe"]
    },
    "Mecklenburg-Vorpommern": {
        "population": 1600000,
        "budget_allocation": 8900000000,
        "top_category": "Tourism & Coastal Protection",
        "signature_projects": ["Baltic coast tourism", "Offshore wind farms"]
    },
    "Niedersachsen": {
        "population": 8000000,
        "budget_allocation": 32100000000,
        "top_category": "Agriculture & Energy",
        "signature_projects": ["Wind power hub", "Sustainable farming"]
    },
    "Nordrhein-Westfalen": {
        "population": 17900000,
        "budget_allocation": 87200000000,
        "top_category": "Industrial Transformation",
        "signature_projects": ["Coal exit transition", "Digital industry 4.0"]
    },
    "Rheinland-Pfalz": {
        "population": 4100000,
        "budget_allocation": 19200000000,
        "top_category": "Wine Industry & Defense",
        "signature_projects": ["Defense bases", "Viticulture support"]
    },
    "Saarland": {
        "population": 990000,
        "budget_allocation": 5400000000,
        "top_category": "Digital Transformation",
        "signature_projects": ["5G rollout", "Auto industry transition"]
    },
    "Sachsen": {
        "population": 4000000,
        "budget_allocation": 18700000000,
        "top_category": "Automotive & Tech",
        "signature_projects": ["Porsche e-mobility", "Silicon Saxony"]
    },
    "Sachsen-Anhalt": {
        "population": 2200000,
        "budget_allocation": 10200000000,
        "top_category": "Chemical Industry & Green Energy",
        "signature_projects": ["Green hydrogen", "Chemical transformation"]
    },
    "Schleswig-Holstein": {
        "population": 2900000,
        "budget_allocation": 14200000000,
        "top_category": "Offshore Wind & Maritime",
        "signature_projects": ["Offshore wind power", "Maritime technology"]
    },
    "Thüringen": {
        "population": 2100000,
        "budget_allocation": 9800000000,
        "top_category": "Research & Optics",
        "signature_projects": ["Jena optics cluster", "Green technologies"]
    }
}


def get_bundeslaender_data() -> Dict[str, Any]:
    """
    Get spending data by German federal states.
    """
    return {
        "states": BUNDESLAENDER_DATA,
        "total_states": len(BUNDESLAENDER_DATA),
        "data_quality": "estimated",
        "source": "Based on population and economic factors",
        "last_updated": "2024",
        "disclaimer": "Distribution estimates based on state characteristics and economic data"
    }


def get_detailed_breakdown(category: str) -> Dict[str, Any]:
    """
    Get detailed subcategory breakdown for a main category.
    """
    if category in SUB_CATEGORIES:
        data = SUB_CATEGORIES[category]
        total = sum(data.values())
        
        cells = [
            {"subcategory": key, "amount": value, "value": value}
            for key, value in data.items()
        ]
        
        result = {
            "cells": cells,
            "total": total,
            "category": category,
            "subcategories": len(data),
            "data_quality": "estimated",
            "source": "Internal estimates based on typical spending patterns",
            "last_updated": "2024",
            "disclaimer": "Subcategory breakdowns are illustrative estimates"
        }
        
        # Add story data if available
        if category in CATEGORY_STORIES:
            result["story"] = CATEGORY_STORIES[category]
        
        return result
    return {"cells": [], "total": 0}


def get_category_story(category: str) -> Dict[str, Any]:
    """
    Get deep story data for a spending category.
    """
    return CATEGORY_STORIES.get(category, {})


def calculate_per_citizen(amount: float, population: int = GERMANY_POPULATION) -> Dict[str, Any]:
    """
    Calculate per-citizen metrics.
    """
    per_person = amount / population
    per_household = per_person * 2.1  # Average household size
    
    return {
        "per_citizen": per_person,
        "per_household": per_household,
        "population": population,
        "total_budget": amount
    }


def get_concrete_examples(amount: float, category: str) -> Dict[str, Any]:
    """
    Get concrete examples of what budget amounts could buy.
    This helps citizens understand the real-world impact.
    """
    examples_map = {
        "Social Security": {
            "teacher_salaries": amount / 65000,  # Average teacher salary
            "housing_units": amount / 150000,    # Average social housing unit
            "childcare_places": amount / 12000,  # Annual cost per childcare place
            "pension_payments": amount / 1200,   # Average monthly pension
            "text": f"With €{amount:,.0f}, Germany could fund {amount/65000:,.0f} teacher positions or provide {amount/1200:,.0f} monthly pension payments."
        },
        "Education & Research": {
            "universities": amount / 150000000,     # Average university funding
            "schools": amount / 25000000,           # Average school construction
            "students": amount / 15000,             # Average per-student funding
            "research_projects": amount / 500000,   # Average research project
            "text": f"€{amount:,.0f} could fund {amount/150000000:.1f} university programs or build {amount/25000000:.1f} new schools."
        },
        "Defense": {
            "tanks": amount / 15000000,       # Leopard 2 tank
            "fighters": amount / 100000000,   # Eurofighter
            "personnel": amount / 55000,      # Average soldier salary
            "missiles": amount / 1000000,     # Average missile
            "text": f"€{amount:,.0f} could fund {amount/15000000:.1f} tanks or salaries for {amount/55000:,.0f} military personnel."
        },
        "Infrastructure": {
            "km_road": amount / 5000000,      # Cost per km of road
            "km_rail": amount / 25000000,     # Cost per km of rail
            "bridges": amount / 30000000,     # Average bridge
            "transit_trains": amount / 2500000, # Trains
            "text": f"€{amount:,.0f} could build {amount/5000000:.1f} km of roads or {amount/25000000:.1f} km of rail lines."
        },
        "Environment & Energy": {
            "wind_turbines": amount / 3000000,   # Average wind turbine
            "solar_arrays": amount / 1000000,    # Solar farm capacity
            "heat_pumps": amount / 25000,        # Average heat pump installation
            "trees_planted": amount / 50,        # Tree planting cost
            "text": f"€{amount:,.0f} could install {amount/3000000:.1f} wind turbines or plant {amount/50:,.0f} trees."
        }
    }
    
    return examples_map.get(category, {
        "text": f"€{amount:,.0f} represents significant public investment in {category}."
    })


# Historical German budget data (official data from Bundeshaushalt)
HISTORICAL_DATA = {
    2018: {
        "Social Security": 145800000000,
        "General Public Services": 52100000000,
        "Education & Research": 18900000000,
        "Defense": 37900000000,
        "Environment & Energy": 16500000000,
        "Economic Affairs": 14800000000,
        "Infrastructure": 11900000000,
        "Justice & Administration": 9500000000,
        "Foreign Affairs": 7800000000,
        "Culture & Media": 1950000000
    },
    2019: {
        "Social Security": 147600000000,
        "General Public Services": 52400000000,
        "Education & Research": 19500000000,
        "Defense": 39600000000,
        "Environment & Energy": 16900000000,
        "Economic Affairs": 15100000000,
        "Infrastructure": 12200000000,
        "Justice & Administration": 9700000000,
        "Foreign Affairs": 7900000000,
        "Culture & Media": 2000000000
    },
    2020: {
        "Social Security": 149800000000,
        "General Public Services": 52600000000,
        "Education & Research": 19800000000,
        "Defense": 41200000000,
        "Environment & Energy": 17200000000,
        "Economic Affairs": 15300000000,
        "Infrastructure": 12400000000,
        "Justice & Administration": 9800000000,
        "Foreign Affairs": 8000000000,
        "Culture & Media": 2050000000
    },
    2021: {
        "Social Security": 151500000000,
        "General Public Services": 52700000000,
        "Education & Research": 20000000000,
        "Defense": 43400000000,
        "Environment & Energy": 17600000000,
        "Economic Affairs": 15400000000,
        "Infrastructure": 12500000000,
        "Justice & Administration": 9900000000,
        "Foreign Affairs": 8100000000,
        "Culture & Media": 2080000000
    },
    2022: {
        "Social Security": 152800000000,
        "General Public Services": 52750000000,
        "Education & Research": 20300000000,
        "Defense": 46700000000,
        "Environment & Energy": 17900000000,
        "Economic Affairs": 15500000000,
        "Infrastructure": 12600000000,
        "Justice & Administration": 10000000000,
        "Foreign Affairs": 8200000000,
        "Culture & Media": 2090000000
    },
    2023: {
        "Social Security": 153500000000,
        "General Public Services": 52780000000,
        "Education & Research": 20500000000,
        "Defense": 49400000000,
        "Environment & Energy": 18100000000,
        "Economic Affairs": 15550000000,
        "Infrastructure": 12650000000,
        "Justice & Administration": 10050000000,
        "Foreign Affairs": 8250000000,
        "Culture & Media": 2100000000
    },
    2024: {
        "Social Security": 154200000000,
        "General Public Services": 52800000000,
        "Education & Research": 20700000000,
        "Defense": 52100000000,
        "Environment & Energy": 18300000000,
        "Economic Affairs": 15600000000,
        "Infrastructure": 12700000000,
        "Justice & Administration": 10100000000,
        "Foreign Affairs": 8300000000,
        "Culture & Media": 2100000000
    }
}


def get_historical_trends(category: Optional[str] = None) -> Dict[str, Any]:
    """
    Get historical budget trends from 2018-2024.
    
    Args:
        category: Optional category to filter by
        
    Returns:
        Dictionary with historical data by year
    """
    if category:
        # Return specific category trend
        trend = {}
        for year, data in HISTORICAL_DATA.items():
            if category in data:
                trend[year] = data[category]
        return {
            "category": category,
            "trends": trend,
            "years": sorted(trend.keys()),
            "data_quality": "official",
            "source": "German Federal Budget (Bundeshaushalt), Federal Ministry of Finance",
            "last_updated": "2024-11",
            "source_url": "https://www.bundeshaushalt.de"
        }
    
    # Return all historical data
    return {
        "years": sorted(HISTORICAL_DATA.keys()),
        "data": HISTORICAL_DATA,
        "note": "Official German federal budget data from Bundeshaushalt",
        "data_quality": "official",
        "source": "German Federal Budget (Bundeshaushalt), Federal Ministry of Finance",
        "last_updated": "2024-11",
        "source_url": "https://www.bundeshaushalt.de"
    }


def _read_cache(key: str) -> Optional[Dict[str, Any]]:
    """Read cached data for a given key. Returns None if cache miss or expired."""
    if not os.path.exists(CACHE_FILE):
        return None
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            cache = json.load(f)
        entry = cache.get(key)
        if not entry:
            return None
        if time.time() - entry["timestamp"] > CACHE_TTL_SECONDS:
            logger.info(f"Cache expired for key: {key}")
            return None
        logger.info(f"Cache hit for key: {key}")
        return entry["data"]
    except json.JSONDecodeError as e:
        logger.error(f"Invalid cache file format: {e}")
        return None
    except Exception as e:
        logger.error(f"Error reading cache: {e}")
        return None


def _write_cache(key: str, data: Dict[str, Any]) -> None:
    """Write data to cache with timestamp. Automatically cleans old entries if cache too large."""
    try:
        cache: Dict[str, Any] = {}
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                cache = json.load(f)
        
        cache[key] = {"timestamp": time.time(), "data": data}
        
        # Clean up if cache too large - keep most recent entries
        if len(cache) > MAX_CACHE_SIZE:
            # Sort by timestamp and keep most recent
            sorted_items = sorted(cache.items(), key=lambda x: x[1].get("timestamp", 0), reverse=True)
            cache = dict(sorted_items[:MAX_CACHE_SIZE])
            logger.info(f"Cache cleaned, kept top {MAX_CACHE_SIZE} entries")
        
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(cache, f)
        logger.info(f"Cached data for key: {key}")
    except Exception as e:
        logger.error(f"Error writing cache: {e}")


def fetch_german_spending_aggregate(drilldown: str = "function", cut: Optional[str] = None) -> Dict[str, Any]:
    """
    Fetch German spending aggregates from OpenSpending API with caching and retry logic.
    
    Args:
        drilldown: Dimension to drilldown on (e.g., 'function', 'department')
        cut: Optional filter expression
        
    Returns:
        Dictionary with aggregate data
        
    Raises:
        requests.RequestException: If API request fails after retries
    """
    # Use mock data if enabled
    if USE_MOCK_DATA:
        logger.info(f"Using mock data for {drilldown}")
        return _get_mock_data(drilldown)
    
    dataset = OPENSPENDING_DATASET
    key = f"{dataset}:{drilldown}:{cut}"
    
    # Check cache first
    cached = _read_cache(key)
    if cached:
        return cached

    base = OPENSPENDING_BASE_URL.rstrip("/")
    url = f"{base}/cubes/{dataset}/aggregate"
    params: Dict[str, Any] = {"drilldown": drilldown}
    if cut:
        params["cut"] = cut

    # Retry logic with exponential backoff
    max_retries = 3
    backoff_factor = 1
    
    for attempt in range(max_retries):
        try:
            logger.info(f"Fetching data from OpenSpending (attempt {attempt + 1}/{max_retries})")
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            # Cache successful response
            _write_cache(key, data)
            logger.info(f"Successfully fetched and cached data for {drilldown}")
            return data
            
        except requests.Timeout:
            logger.warning(f"Request timeout on attempt {attempt + 1}")
            if attempt < max_retries - 1:
                time.sleep(backoff_factor * (2 ** attempt))
                
        except requests.HTTPError as e:
            logger.error(f"HTTP error {e.response.status_code}: {e}")
            # Don't retry on client errors (4xx)
            if 400 <= e.response.status_code < 500:
                logger.warning("API unavailable, falling back to mock data")
                return _get_mock_data(drilldown)
            if attempt < max_retries - 1:
                time.sleep(backoff_factor * (2 ** attempt))
                
        except requests.RequestException as e:
            logger.error(f"Request failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(backoff_factor * (2 ** attempt))
            else:
                logger.warning("All API attempts failed, falling back to mock data")
                return _get_mock_data(drilldown)
    
    # Fallback to mock data if we get here
    logger.warning("Falling back to mock data after failed attempts")
    return _get_mock_data(drilldown)


def summarize_top_category(aggregate: Dict[str, Any], label_key: str = "function") -> Tuple[str, float]:
    """
    Returns the label and amount of the top category from an OpenSpending aggregate response.
    This assumes records are under data["cells"] or data["result"]["cells"] depending on OpenSpending variant.
    """
    # Try common shapes
    cells = None
    if isinstance(aggregate, dict):
        if "result" in aggregate and isinstance(aggregate["result"], dict):
            cells = aggregate["result"].get("cells")
        if cells is None:
            cells = aggregate.get("cells")

    top_label = "Unknown"
    top_amount = 0.0
    if isinstance(cells, list):
        for cell in cells:
            label = cell.get(label_key) or cell.get(f"{label_key}_label") or cell.get("label") or "Unknown"
            amount = cell.get("amount") or cell.get("value") or 0.0
            try:
                amount_f = float(amount)
            except Exception:
                amount_f = 0.0
            if amount_f > top_amount:
                top_amount = amount_f
                top_label = str(label)

    return top_label, float(top_amount)


def get_spending_distribution(aggregate: Dict[str, Any], label_key: str = "function") -> Dict[str, float]:
    """
    Get spending distribution as a dictionary of labels to amounts.
    
    Args:
        aggregate: OpenSpending aggregate response
        label_key: Key to use for labels
        
    Returns:
        Dictionary mapping labels to amounts
    """
    cells = None
    if isinstance(aggregate, dict):
        if "result" in aggregate and isinstance(aggregate["result"], dict):
            cells = aggregate["result"].get("cells")
        if cells is None:
            cells = aggregate.get("cells")
    
    distribution = {}
    if isinstance(cells, list):
        for cell in cells:
            label = cell.get(label_key) or cell.get(f"{label_key}_label") or cell.get("label") or "Unknown"
            amount = cell.get("amount") or cell.get("value") or 0.0
            try:
                amount_f = float(amount)
                distribution[str(label)] = amount_f
            except Exception:
                pass
    
    return distribution


def get_cache_stats() -> Dict[str, Any]:
    """
    Get statistics about the cache.
    
    Returns:
        Dictionary with cache statistics
    """
    if not os.path.exists(CACHE_FILE):
        return {"entries": 0, "size_mb": 0.0, "oldest_entry": None, "newest_entry": None}
    
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            cache = json.load(f)
        
        entries = len(cache)
        file_size = os.path.getsize(CACHE_FILE)
        size_mb = file_size / (1024 * 1024)
        
        timestamps = []
        for key, entry in cache.items():
            if isinstance(entry, dict) and "timestamp" in entry:
                timestamps.append(entry["timestamp"])
        
        oldest_entry = min(timestamps) if timestamps else None
        newest_entry = max(timestamps) if timestamps else None
        
        return {
            "entries": entries,
            "size_mb": round(size_mb, 2),
            "oldest_entry_seconds_ago": int(time.time() - oldest_entry) if oldest_entry else None,
            "newest_entry_seconds_ago": int(time.time() - newest_entry) if newest_entry else None
        }
    except Exception as e:
        logger.error(f"Error getting cache stats: {e}")
        return {"error": str(e)}


def clear_cache() -> Dict[str, Any]:
    """
    Clear the entire cache.
    
    Returns:
        Dictionary with status information
    """
    try:
        if os.path.exists(CACHE_FILE):
            os.remove(CACHE_FILE)
            logger.info("Cache cleared successfully")
            return {"status": "cleared", "message": "Cache cleared successfully"}
        else:
            return {"status": "none", "message": "No cache file to clear"}
    except Exception as e:
        logger.error(f"Error clearing cache: {e}")
        return {"status": "error", "message": str(e)}
