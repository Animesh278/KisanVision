# Directive: Run Services

## 1. Goal
Start and monitor the core Kisan Vision services:
1. **AI API (FastAPI Backend)**: Serves endpoints on `http://127.0.0.1:8000`.
2. **Frontend (React)**: Web UI running via Vite or npm dev server.

## 2. Inputs & Prerequisites
- Virtual environment with Python dependencies installed from `requirements.txt`.
- Node.js and dependencies installed in `frontend/` (`npm install`).
- Valid `.env` file with `GEMINI_API_KEY`.

## 3. Execution Tools
Deterministic execution scripts:
- `execution/manage_services.py`
  - Commands:
    - Check service status: `python execution/manage_services.py status`
    - Run API backend: `python execution/manage_services.py run-api`
    - Run Frontend: `python execution/manage_services.py run-frontend`

Or manual commands:
- API: `uvicorn ai_api.api:app --host 127.0.0.1 --port 8000 --reload`
- Frontend: `npm run dev --prefix frontend`

## 4. Expected Outputs
- API accessible at `http://127.0.0.1:8000/docs` (Swagger UI) and `http://127.0.0.1:8000/health`
- Frontend accessible at `http://localhost:5173` or `http://localhost:3000`

## 5. Edge Cases & Handling
- **Port Conflict**: If port 8000 or 5173 is already in use, check running processes before launching.
- **Missing Models on Startup**: FastAPI `lifespan` or startup events may fail if `.pth` or `.pkl` files are corrupted or missing. Check `execution/health_check.py` first.

## 6. Self-Annealing Log (Learnings)
- *2026-10-11*: Initial directive creation.
