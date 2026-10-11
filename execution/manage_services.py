"""
Service Management Script for Kisan Vision (Layer 3: Execution)
Allows checking, probing, and launching FastAPI and React frontend services.
"""

import sys
import os
import argparse
import subprocess
import socket
from pathlib import Path

# Fix Windows console encoding
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

BASE_DIR = Path(__file__).resolve().parent.parent

def is_port_in_use(port: int, host: str = "127.0.0.1") -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex((host, port)) == 0

def check_status():
    api_port = 8000
    fe_port = 5173
    fe_alt_port = 3000

    api_running = is_port_in_use(api_port)
    fe_running = is_port_in_use(fe_port) or is_port_in_use(fe_alt_port)

    print("=" * 50)
    print("KISAN VISION SERVICE STATUS")
    print("=" * 50)
    print(f"Backend API (Port {api_port}): {'[RUNNING]' if api_running else '[STOPPED]'}")
    print(f"Frontend UI (Port 5173/3000): {'[RUNNING]' if fe_running else '[STOPPED]'}")
    
    # Check node_modules
    nm_dir = BASE_DIR / "frontend" / "node_modules"
    print(f"Frontend node_modules: {'[INSTALLED]' if nm_dir.exists() else '[NOT INSTALLED - run npm install]'}")
    print("=" * 50)

def main():
    parser = argparse.ArgumentParser(description="Manage Kisan Vision Services")
    parser.add_argument("action", choices=["status", "run-api", "run-frontend"], help="Action to execute")
    args = parser.parse_args()

    if args.action == "status":
        check_status()
    elif args.action == "run-api":
        print(f"Starting FastAPI backend on http://127.0.0.1:8000 ...")
        cmd = [sys.executable, "-m", "uvicorn", "ai_api.api:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]
        subprocess.run(cmd, cwd=BASE_DIR)
    elif args.action == "run-frontend":
        print("Starting Frontend dev server ...")
        cmd = ["npm", "run", "dev"]
        subprocess.run(cmd, cwd=BASE_DIR / "frontend", shell=True)

if __name__ == "__main__":
    main()
