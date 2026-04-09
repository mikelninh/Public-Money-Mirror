#!/usr/bin/env python3
"""
Data Quality Verification Script for Public Money Mirror
Verifies budget data accuracy, checks for anomalies, and flags suspicious patterns
"""

import json
from typing import Dict, Any, List


# Budget data from the codebase
MAIN_BUDGET = {
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


class DataVerifier:
    """Verifies budget data accuracy and flags suspicious patterns"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.success_count = 0
        
    def verify_total_budget(self) -> bool:
        """Verify main budget totals match"""
        total = sum(MAIN_BUDGET.values())
        print(f"\n{'='*80}")
        print("📊 MAIN BUDGET VERIFICATION")
        print(f"{'='*80}")
        print(f"Total Budget: €{total:,.0f} ({total/1e9:.1f} billion)")
        print(f"Number of Categories: {len(MAIN_BUDGET)}")
        
        if total > 200_000_000_000:  # Should be ~350B
            print("✅ Total budget in realistic range")
            self.success_count += 1
            return True
        else:
            self.issues.append("Total budget seems too low")
            return False
    
    def verify_subcategory_sums(self) -> bool:
        """Verify subcategories sum to main categories"""
        print(f"\n{'='*80}")
        print("🔍 SUBCATEGORY BREAKDOWN VERIFICATION")
        print(f"{'='*80}")
        
        all_ok = True
        for main_cat, main_amount in MAIN_BUDGET.items():
            if main_cat not in SUB_CATEGORIES:
                continue
                
            subs = SUB_CATEGORIES[main_cat]
            sub_total = sum(subs.values())
            diff = main_amount - sub_total
            diff_pct = (diff / main_amount * 100) if main_amount > 0 else 0
            
            print(f"\n{main_cat}: €{main_amount/1e9:.2f}B")
            print(f"  Subtotal: €{sub_total/1e9:.2f}B")
            print(f"  Difference: €{diff/1e9:.2f}B ({diff_pct:+.1f}%)")
            
            # Allow 5% tolerance for subcategory coverage
            if abs(diff_pct) < 5:
                print(f"  ✅ Subcategories match main category")
                self.success_count += 1
            elif abs(diff_pct) < 10:
                print(f"  ⚠️ Minor mismatch (<10%) - acceptable")
                self.warnings.append(f"{main_cat} subcategory mismatch: {diff_pct:.1f}%")
            else:
                print(f"  ❌ Significant mismatch!")
                self.issues.append(f"{main_cat} subcategory mismatch: {diff_pct:.1f}%")
                all_ok = False
        
        return all_ok
    
    def check_for_anomalies(self) -> bool:
        """Check for statistical anomalies and suspicious patterns"""
        print(f"\n{'='*80}")
        print("🚨 ANOMALY DETECTION")
        print(f"{'='*80}")
        
        # Check for unusually large items
        total = sum(MAIN_BUDGET.values())
        for cat, amount in sorted(MAIN_BUDGET.items(), key=lambda x: x[1], reverse=True):
            pct = (amount / total * 100)
            
            if pct > 60:
                self.issues.append(f"⚠️ {cat}: {pct:.1f}% of budget is unusually high")
                print(f"  🔴 {cat}: {pct:.1f}% - UNUSUALLY HIGH")
            elif pct > 50:
                self.warnings.append(f"{cat}: {pct:.1f}% is very high")
                print(f"  🟡 {cat}: {pct:.1f}% - High concentration")
            else:
                print(f"  ✓ {cat}: {pct:.1f}%")
                self.success_count += 1
        
        # Check historical trends
        print(f"\nHistorical Trend Analysis (2018 → 2024):")
        for cat in MAIN_BUDGET.keys():
            if cat in HISTORICAL_DATA[2018] and cat in HISTORICAL_DATA[2024]:
                old_val = HISTORICAL_DATA[2018][cat]
                new_val = HISTORICAL_DATA[2024][cat]
                growth_pct = ((new_val - old_val) / old_val * 100) if old_val > 0 else 0
                
                if abs(growth_pct) > 50:
                    self.issues.append(f"{cat}: Extreme growth of {growth_pct:.1f}% over 6 years")
                    print(f"  🔴 {cat}: {growth_pct:+.1f}% growth - EXTREME CHANGE")
                elif abs(growth_pct) > 30:
                    self.warnings.append(f"{cat}: Significant growth of {growth_pct:.1f}%")
                    print(f"  🟡 {cat}: {growth_pct:+.1f}% growth - Significant change")
                else:
                    print(f"  ✓ {cat}: {growth_pct:+.1f}% growth")
                    self.success_count += 1
    
    def check_data_integrity(self) -> bool:
        """Check for data integrity issues"""
        print(f"\n{'='*80}")
        print("🔧 DATA INTEGRITY CHECKS")
        print(f"{'='*80}")
        
        all_ok = True
        
        # Check for negative values
        for cat, amount in MAIN_BUDGET.items():
            if amount < 0:
                self.issues.append(f"Negative value in {cat}: {amount}")
                all_ok = False
        
        # Check for zero values
        for cat, amount in MAIN_BUDGET.items():
            if amount == 0:
                self.warnings.append(f"Zero value in {cat}")
        
        if all_ok:
            print("✅ No data integrity issues found")
            self.success_count += 1
        else:
            print("❌ Data integrity issues detected")
        
        return all_ok
    
    def generate_report(self) -> Dict[str, Any]:
        """Generate comprehensive verification report"""
        print(f"\n{'='*80}")
        print("📋 VERIFICATION SUMMARY")
        print(f"{'='*80}")
        
        print(f"\n✅ Successful Checks: {self.success_count}")
        print(f"⚠️  Warnings: {len(self.warnings)}")
        print(f"❌ Issues: {len(self.issues)}")
        
        if self.warnings:
            print(f"\n⚠️  WARNINGS:")
            for warning in self.warnings:
                print(f"  - {warning}")
        
        if self.issues:
            print(f"\n❌ ISSUES REQUIRING ATTENTION:")
            for issue in self.issues:
                print(f"  - {issue}")
        
        # Overall status
        print(f"\n{'='*80}")
        if not self.issues:
            print("✅ ALL CHECKS PASSED - Data quality is good!")
            status = "PASS"
        elif len(self.issues) <= 2:
            print("⚠️  DATA HAS MINOR ISSUES - Review recommended")
            status = "WARNING"
        else:
            print("❌ DATA HAS CRITICAL ISSUES - Immediate review required")
            status = "FAIL"
        print(f"{'='*80}\n")
        
        return {
            "status": status,
            "success_count": self.success_count,
            "warnings": self.warnings,
            "issues": self.issues
        }
    
    def run_all_checks(self) -> Dict[str, Any]:
        """Run all verification checks"""
        self.verify_total_budget()
        self.verify_subcategory_sums()
        self.check_for_anomalies()
        self.check_data_integrity()
        return self.generate_report()


def main():
    """Main entry point"""
    print("\n" + "="*80)
    print("🔍 PUBLIC MONEY MIRROR - DATA QUALITY VERIFICATION")
    print("="*80)
    
    verifier = DataVerifier()
    report = verifier.run_all_checks()
    
    # Save report
    with open("data/verification_report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"📄 Report saved to: data/verification_report.json")
    
    return 0 if report["status"] != "FAIL" else 1


if __name__ == "__main__":
    import sys
    sys.exit(main())

