# Execution Scripts (Layer 3: Doing the work)

This directory contains deterministic Python scripts that perform concrete operations for Kisan Vision.

## Principles of Layer 3 Scripts

1. **Deterministic & Reliable**: No guesswork or probabilistic behavior. Given the same inputs, the script should produce predictable outputs or fail with informative error messages.
2. **Environment & Secrets**: Load credentials and settings from `.env` using `python-dotenv`.
3. **Transient Data**: Intermediate outputs, logs, and artifacts are saved to `.tmp/`.
4. **Standalone & Executable**: Each script should be runnable from the CLI with clean `--help` documentation and standard exit codes (0 for success, non-zero for failure).
5. **No Manual Work**: Complex logic is encapsulated here so the AI agent (Layer 2) only orchestrates calls.

## Available Scripts

- [`health_check.py`](file:///c:/Users/user/Desktop/Kisan%20Vision/execution/health_check.py): Verifies dependencies, ML model weights, environment variables, and port availability.
- [`manage_services.py`](file:///c:/Users/user/Desktop/Kisan%20Vision/execution/manage_services.py): Helper script to check or run backend API and frontend services.
- [`test_inference.py`](file:///c:/Users/user/Desktop/Kisan%20Vision/execution/test_inference.py): Validates predictions across disease, crop, and yield models with sample inputs.
