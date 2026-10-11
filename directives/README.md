# Directives (Layer 1: What to do)

This directory contains Standard Operating Procedures (SOPs) written in Markdown. Directives define **what** needs to be done, leaving the orchestration to the agent (Layer 2) and deterministic code execution to scripts in `execution/` (Layer 3).

## Directive Structure

Every directive should follow this standardized structure:
1. **Goal**: High-level objective and outcome.
2. **Inputs & Prerequisites**: Required data, credentials, environment variables, or files.
3. **Execution Tools**: Python scripts in `execution/` to run, along with expected arguments.
4. **Outputs & Deliverables**: Where results are written (`.tmp/` for intermediate data, cloud services/deliverables for final results).
5. **Edge Cases & Failure Recovery**: Known issues, timeouts, retry logic, and self-annealing notes.
6. **Changelog / Learnings**: Record of updates made through the self-annealing loop.

## Standard Directives Index

- [`_template.md`](file:///c:/Users/user/Desktop/Kisan%20Vision/directives/_template.md): Template for creating new directives.
- [`system_health_check.md`](file:///c:/Users/user/Desktop/Kisan%20Vision/directives/system_health_check.md): Verify Python environment, ML models, and API readiness.
- [`run_services.md`](file:///c:/Users/user/Desktop/Kisan%20Vision/directives/run_services.md): SOP for running backend and frontend development services.
- [`test_inference_pipeline.md`](file:///c:/Users/user/Desktop/Kisan%20Vision/directives/test_inference_pipeline.md): Test and validate inference across crop, disease, and yield models.

## Operating Rules for Agents
- **Check tools first**: Before writing an execution script, verify if one already exists in `execution/`.
- **Self-anneal**: When an error or edge case occurs, fix the tool, verify the fix, and update the corresponding directive with the learning.
- **Preserve directives**: Directives are living documents. Do not overwrite or discard them without preserving previous learnings.
