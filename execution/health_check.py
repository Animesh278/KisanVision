"""
Health Check Script for Kisan Vision (Layer 3: Execution)
Verifies:
- Python environment and required package installations
- Presence and integrity of ML model weights and encoders
- Environment variables and API keys
- Port availability for backend API and frontend
"""

import sys
import os
import json
import socket
import argparse
from pathlib import Path

# Fix Windows console encoding for Unicode/emojis
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Base directory of the repository
BASE_DIR = Path(__file__).resolve().parent.parent

# Attempt loading dotenv if installed
try:
    from dotenv import load_dotenv
    load_dotenv(BASE_DIR / ".env")
except ImportError:
    pass

REQUIRED_PACKAGES = [
    "fastapi",
    "uvicorn",
    "torch",
    "torchvision",
    "xgboost",
    "sklearn",
    "numpy",
    "pandas",
    "PIL",
    "cv2",
    "dotenv"
]

EXPECTED_MODELS = [
    {
        "name": "Disease Detection Model (PyTorch)",
        "path": BASE_DIR / "disease_model" / "models" / "disease_model.pth"
    },
    {
        "name": "Disease Class Names",
        "path": BASE_DIR / "disease_model" / "models" / "class_names.json"
    },
    {
        "name": "Crop Recommendation Model (Pickle)",
        "path": BASE_DIR / "crop_model" / "models" / "improved_crop_model.pkl"
    },
    {
        "name": "Crop Label Encoder",
        "path": BASE_DIR / "crop_model" / "models" / "label_encoder.pkl"
    },
    {
        "name": "Yield Prediction Model (XGBoost/Pickle)",
        "path": BASE_DIR / "yield_model" / "models" / "yield_model.pkl"
    },
    {
        "name": "Yield Area Encoder",
        "path": BASE_DIR / "yield_model" / "models" / "area_encoder.pkl"
    },
    {
        "name": "Yield Crop Encoder",
        "path": BASE_DIR / "yield_model" / "models" / "crop_encoder.pkl"
    }
]

def check_package(pkg_name: str) -> dict:
    try:
        mod = __import__(pkg_name)
        ver = getattr(mod, "__version__", "installed")
        return {"package": pkg_name, "installed": True, "version": ver}
    except ImportError:
        return {"package": pkg_name, "installed": False, "version": None}

def check_file(path: Path) -> dict:
    if path.exists() and path.is_file():
        size_mb = path.stat().st_size / (1024 * 1024)
        return {"exists": True, "size_mb": round(size_mb, 2)}
    return {"exists": False, "size_mb": 0.0}

def is_port_in_use(port: int, host: str = "127.0.0.1") -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex((host, port)) == 0

def run_health_check() -> dict:
    results = {
        "status": "healthy",
        "python_version": sys.version.split()[0],
        "packages": {},
        "models": {},
        "environment": {},
        "network": {}
    }

    # 1. Packages
    missing_packages = []
    for pkg in REQUIRED_PACKAGES:
        pkg_res = check_package(pkg)
        results["packages"][pkg] = pkg_res
        if not pkg_res["installed"]:
            missing_packages.append(pkg)

    # 2. Models
    missing_models = []
    for model in EXPECTED_MODELS:
        m_name = model["name"]
        m_res = check_file(model["path"])
        results["models"][m_name] = {
            "path": str(model["path"].relative_to(BASE_DIR)),
            **m_res
        }
        if not m_res["exists"]:
            missing_models.append(m_name)

    # 3. Environment Variables
    gemini_key = os.environ.get("GEMINI_API_KEY")
    results["environment"]["GEMINI_API_KEY"] = {
        "configured": bool(gemini_key and len(gemini_key) > 10 and not gemini_key.startswith("your_")),
        "present": bool(gemini_key)
    }

    # 4. Port Checks
    ports_to_check = {"FastAPI (8000)": 8000, "Frontend (5173)": 5173, "Frontend (3000)": 3000}
    for label, port in ports_to_check.items():
        in_use = is_port_in_use(port)
        results["network"][label] = {
            "port": port,
            "status": "in_use" if in_use else "available"
        }

    # Global status summary
    if missing_packages or missing_models:
        results["status"] = "degraded"
    
    return results

def print_text_summary(report: dict):
    print("=" * 60)
    print("🌾 KISAN VISION SYSTEM HEALTH REPORT")
    print(f"Overall Status: {report['status'].upper()}")
    print(f"Python: {report['python_version']}")
    print("=" * 60)

    print("\n[PACKAGES]")
    for pkg, info in report["packages"].items():
        status = f"✓ {info['version']}" if info["installed"] else "✗ MISSING"
        print(f"  - {pkg:<15}: {status}")

    print("\n[ML MODELS]")
    for name, info in report["models"].items():
        status = f"✓ Present ({info['size_mb']} MB)" if info["exists"] else "✗ MISSING"
        print(f"  - {name:<35}: {status}")

    print("\n[ENVIRONMENT]")
    env_info = report["environment"]["GEMINI_API_KEY"]
    key_status = "✓ Configured" if env_info["configured"] else ("⚠ Key present but default/short" if env_info["present"] else "✗ Missing")
    print(f"  - GEMINI_API_KEY                    : {key_status}")

    print("\n[NETWORK PORTS]")
    for label, info in report["network"].items():
        print(f"  - {label:<35}: {info['status']}")

    print("=" * 60)

def main():
    parser = argparse.ArgumentParser(description="Kisan Vision Health Check")
    parser.add_argument("--json", action="store_true", help="Output report in JSON format")
    parser.add_argument("--output", type=str, default=None, help="Save report to JSON file path")
    args = parser.parse_args()

    report = run_health_check()

    # Save to .tmp if requested or default
    out_path = Path(args.output) if args.output else (BASE_DIR / ".tmp" / "health_report.json")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print_text_summary(report)
        print(f"\nReport written to: {out_path}")

    # Return exit code based on health
    if report["status"] != "healthy":
        sys.exit(1)
    sys.exit(0)

if __name__ == "__main__":
    main()
