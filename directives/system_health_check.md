# Directive: System Health Check

## 1. Goal
Diagnose and report the operational status of Kisan Vision:
1. Verify Python virtual environment and required dependencies.
2. Check presence and integrity of ML models and label encoders (`disease_model.pth`, `yield_model.pkl`, `improved_crop_model.pkl`, etc.).
3. Verify environment variables and API keys (`GEMINI_API_KEY`).
4. Check network port availability for FastAPI (8000) and Frontend (3000 / 5173).

## 2. Inputs & Prerequisites
- Python environment with requirements installed (or `.venv` / `venv`).
- `.env` file present in root directory.

## 3. Execution Tools
Deterministic execution script:
- `execution/health_check.py`

Run command:
```bash
python execution/health_check.py
```

Optional flags:
- `--json`: Output results formatted as JSON for automated parsing.
- `--output .tmp/health_report.json`: Save report to `.tmp/`.

## 4. Expected Outputs
- Console summary report showing status of:
  - Python version & packages
  - Machine Learning Model files
  - Environment variables
  - Port status
- Intermediate JSON file: `.tmp/health_report.json`

## 5. Edge Cases & Handling
- **Windows Console Encoding (cp1252)**: On Windows terminals without UTF-8 codepage (default `cp1252`), stdout can throw `UnicodeEncodeError` when printing symbols or emojis. Resolved by calling `sys.stdout.reconfigure(encoding='utf-8', errors='replace')`.
- **Missing Models**: If large `.pkl` or `.pth` models are absent, note whether they need to be trained via respective model scripts (`crop_model/train.py`, `yield_model/train.py`) or downloaded.
- **Missing GEMINI_API_KEY**: Alert user to copy `.env.example` to `.env` and set the key.

## 6. Self-Annealing Log (Learnings)
- *2026-10-11*: Initial creation of directive for Kisan Vision 3-layer architecture.
- *2026-10-11*: Handled Windows console default `cp1252` encoding issue in `execution/health_check.py` by reconfiguring stdout to UTF-8. Verified all 7 model artifacts and dependencies successfully.
