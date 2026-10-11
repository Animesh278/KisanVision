# Directive: [Task Name]

## 1. Goal
[State clearly what this directive achieves and the expected end state.]

## 2. Inputs & Prerequisites
- **Environment Variables**: e.g., `GEMINI_API_KEY` in `.env`
- **Input Files / Parameters**: [Describe inputs, schemas, or locations]
- **Prerequisites**: [Virtual environment activated, packages installed, etc.]

## 3. Execution Tools
Deterministic scripts in `execution/` to invoke:
- Script: `execution/[script_name].py`
- Arguments:
  ```bash
  python execution/[script_name].py --arg1 value1
  ```

## 4. Expected Outputs
- **Intermediates**: Stored under `.tmp/` (e.g. `.tmp/output.json`)
- **Deliverables**: Final user-facing deliverables (Google Sheets, Slides, summary reports, or API responses)

## 5. Edge Cases & Handling
- **Case 1**: [Description of edge case and how to resolve]
- **Case 2**: [Description of API limits, missing files, or fallback behavior]

## 6. Self-Annealing Log (Learnings)
- *YYYY-MM-DD*: Initial creation of directive.
- *YYYY-MM-DD*: [Document bugs encountered, fixes applied to execution scripts, and workflow adjustments]
