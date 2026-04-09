#!/usr/bin/env python3
import os
import sys
import json
import time
from typing import Dict, Any

import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("OPENSPENDING_BASE_URL", "https://openspending.org/api/3").rstrip("/")
DATASET = os.getenv("OPENSPENDING_DATASET", "de_bundeshaushalt")
OUTPUT = os.path.join("data", "openspending_aggregate_sample.json")


def fetch_aggregate(drilldown: str = "function", cut: str | None = None) -> Dict[str, Any]:
    url = f"{BASE_URL}/cubes/{DATASET}/aggregate"
    params: Dict[str, Any] = {"drilldown": drilldown}
    if cut:
        params["cut"] = cut
    r = requests.get(url, params=params, timeout=30)
    r.raise_for_status()
    return r.json()


def main() -> int:
    os.makedirs("data", exist_ok=True)
    try:
        data = fetch_aggregate(drilldown="function")
        payload = {"fetched_at": int(time.time()), "params": {"drilldown": "function"}, "data": data}
        with open(OUTPUT, "w", encoding="utf-8") as f:
            json.dump(payload, f)
        print(f"Saved sample aggregate to {OUTPUT}")
        return 0
    except requests.HTTPError as e:
        print(f"HTTP error: {e}")
        return 1
    except Exception as e:
        print(f"Unexpected error: {e}")
        return 2


if __name__ == "__main__":
    sys.exit(main())
