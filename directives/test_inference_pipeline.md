# Directive: Test Inference Pipeline

## 1. Goal
Execute and validate model predictions across Kisan Vision engines using deterministic test harnesses:
1. Verify `CropEngine` produces top recommendations given N-P-K and climate inputs.
2. Verify `YieldEngine` predicts yield given crop, area, rainfall, pesticide, and temperature inputs.
3. Validate that outputs are properly formatted and returned without runtime exceptions.

## 2. Inputs & Prerequisites
- Trained model files present in `crop_model/models/` and `yield_model/models/`.
- Virtual environment active with `scikit-learn`, `xgboost`, and `numpy` installed.

## 3. Execution Tools
Deterministic execution script:
- `execution/test_inference.py`

Run commands:
```bash
# Test all engines
python execution/test_inference.py --engine all

# Test specific engine
python execution/test_inference.py --engine crop
python execution/test_inference.py --engine yield
```

## 4. Expected Outputs
- Console validation output confirming model loading and prediction values.
- Intermediate results saved in `.tmp/inference_test_result.json`.

## 5. Edge Cases & Handling
- **Engine Initialization**: Both `CropEngine` and `YieldEngine` require calling `.load()` to initialize model weights, encoders, and metadata before `.predict()`.
- **Output Schema**: `CropEngine` prediction payload contains `crop_name`, `confidence`, and `top_predictions`. `YieldEngine` returns `predicted_yield`, `yield_unit`, and `yield_level`.
- **Categorical Encoders**: Categorical features like crop name or area must match the trained label/category encoders (`label_encoder.pkl`, `area_encoder.pkl`, `crop_encoder.pkl`).

## 6. Self-Annealing Log (Learnings)
- *2026-10-11*: Initial creation of directive. Tested with Rice / India sample scenarios.
- *2026-10-11*: Verified `CropEngine` and `YieldEngine` calling signatures. Fixed input parameter requirements (`area`, `crop`, `year`) and automated loading in `execution/test_inference.py`. Confirmed predictions: `rice` (93.87% confidence). Intermediate saved to `.tmp/inference_test_result.json`.
