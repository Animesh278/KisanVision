# KisanVision AI — Presentation Deck Outline & Slide-by-Slide Guide

**Degree / Course**: Final Year Major Project Presentation  
**Project Title**: KisanVision AI: A Grounded GenAI Crop Doctor  
**Repository Branch**: `presentation-polish`  

---

## Slide 1: Title & Project Overview
- **Header**: KisanVision AI: A Grounded GenAI Crop Doctor
- **Subtitle**: Bridging Deep Learning Computer Vision with Retrieval-Augmented Generation for Precision Agronomy
- **Key Visual**: KisanVision logo, clean split visual showing leaf pathology input -> RAG retrieval -> clinical field report.
- **Presenter Details**: Student Name, Department of Computer Science & Engineering, Final Year Major Capstone.

---

## Slide 2: The Problem & The Gap in Existing Ag-Tech
- **Core Agronomic Problem**:
  - Foliar crop diseases (blights, rusts, bacterial spots) cause 20% to 40% yield losses globally.
  - Smallholder farmers lack timely access to certified plant pathologists.
- **The "AI Chatbot" Failure Mode (Why Professors Criticize LLM Wrappers)**:
  - Raw LLMs hallucinate unverified chemical dosages and brand names.
  - LLMs have no visual calibration: an LLM cannot inspect high-frequency leaf textures reliably without a dedicated vision model.
  - Lack of traceability: farmers cannot verify whether recommendations come from official agricultural extension bodies or random internet forums.
- **KisanVision Thesis**: Couple a dedicated PyTorch vision classifier with local vector search (FAISS) over peer-reviewed extension manuals to ensure grounded, verifiable GenAI advice.

---

## Slide 3: System Architecture (The 3-Layer Design)
- **Visual Diagram**:
  ```
  [ Farmer Leaf Image ] + [ Field Context: Crop, Symptoms, Stage ]
           │
           ▼
  ┌────────────────────────────────────────────────────────┐
  │ 1. PERCEPTION LAYER (PyTorch CNN)                      │
  │    • ResNet-50 / EfficientNet Backbone                 │
  │    • 52 Foliar Disease Classes (Softmax Probabilities) │
  │    • Grad-CAM Spatial Lesion Attention Map             │
  └────────────────────────┬───────────────────────────────┘
                           │ Predicted Pathogen + Logits
                           ▼
  ┌────────────────────────────────────────────────────────┐
  │ 2. RETRIEVAL LAYER (FAISS Vector RAG)                  │
  │    • Curated Extension Corpus (ICAR & USDA Guides)     │
  │    • 3072-Dim Embeddings (gemini-embedding-001)        │
  │    • Cosine Similarity Retrieval (IndexFlatIP)         │
  │    • Deterministic TF-IDF Fallback for Offline Safety  │
  └────────────────────────┬───────────────────────────────┘
                           │ Top-3 Evidence Passages + Citations
                           ▼
  ┌────────────────────────────────────────────────────────┐
  │ 3. REASONING & PRESENTATION LAYER                      │
  │    • Google Gemini 3.8 Flash (Low Temperature: 0.2)   │
  │    • Pydantic Schema: GroundedClinicalAssessment       │
  │    • Categorized Actions (Cultural > Bio > Chemical)   │
  │    • Multi-Turn Context-Preserving Follow-Up Assistant │
  │    • React 19 Enterprise Agritech Dashboard            │
  └────────────────────────────────────────────────────────┘
  ```

---

## Slide 4: Computer Vision Backbone (Deterministic Perception)
- **Model Details (Real & Verified Metrics)**:
  - Framework: PyTorch 2.13.0
  - Input: 224 × 224 RGB Leaf Image (Normalized with ImageNet statistics)
  - Classes: 52 Foliar Disease Classes spanning Solanaceous, Cereal, and Horticultural crops
  - Tested Sample Performance: Tomato Early Blight correctly identified with **98.66% confidence** and full probability distribution over alternatives.
- **Explainability**:
  - Grad-CAM (Gradient-weighted Class Activation Mapping) localizes lesion areas to verify the network focuses on pathology rather than background artifacts.

---

## Slide 5: The GenAI Contribution: Evidence-Grounded RAG Pipeline
- **Knowledge Base Composition**:
  - 4 peer-reviewed extension manuals in `smart_system/rag/documents/`:
    1. `EXT-SOL-2024-TOM`: Solanaceous Crop Pathology Manual (Tomato & Potato)
    2. `EXT-TUB-2024-POT`: National Potato Research Initiative Tuber & Foliar Health
    3. `EXT-GRN-2024-CEREAL`: Cereal & Maize Pathology (Northern Leaf Blight, Rust, Blast)
    4. `EXT-HORT-2024-IPM`: Horticultural Crop IPM (Apple Scab, Pepper Spot, Mildew)
  - Extracted: 28 semantic chunks indexed with source authority, document ID, section, and pathogen tags.
- **Vector Index**:
  - Dense Index: FAISS IndexFlatIP (3072 dimensions, cosine similarity)
  - Ingestion Script: `smart_system/rag/ingest.py`
  - Retriever Module: `smart_system/rag/retriever.py` with domain-boosting for crop and pathogen matching.

---

## Slide 6: Reasoning & Safety Guardrails (Gemini 3.8 Flash)
- **Prompt Engineering Strategy**:
  - Strict system prompt constraining Gemini to rely *only* on retrieved extension text.
  - Low temperature (0.2) to suppress creative hallucinations.
- **Schema Enforcement**:
  - Structured output using Pydantic `GroundedClinicalAssessment`:
    - `summary`: Farmer-friendly status summary
    - `model_predicted_condition` & `model_confidence_pct`: Direct reflection of CV model
    - `immediate_action_steps`: Categorized as Cultural, Biological, Chemical, or Monitoring
    - `preventative_measures`: Long-term sanitation and crop rotation
    - `uncertainty_note`: Explicit transparency if confidence is low
    - `source_references`: Verifiable bibliographic citations
- **Safety Boundaries**:
  - Refuses to invent unverified chemical concentrations.
  - Enforces prioritization: Cultural pruning & irrigation adjustment *before* chemical sprays.

---

## Slide 7: Presentation-Grade UI & User Experience
- **Aesthetic Overhaul**:
  - Transitioned from generic glowing dark dashboard to an enterprise agritech product design.
  - Forest green palette (`#0F2E22`), fresh accent green (`#16A34A`), and crisp warm off-white background (`#F8FAF6`).
  - Clear navigation: **Home | Crop Doctor | How It Works | About**.
- **Interactive Highlights**:
  - **Try a Demonstration Sample**: 4 one-click verified presets (`Tomato Early Blight`, `Potato Late Blight`, `Tomato Bacterial Spot`, `Healthy Tomato Leaf`).
  - **How This Was Generated Panel**: Live presentation drawer exposing model logits, retrieved FAISS chunks, and Pydantic JSON.
  - **Contextual Follow-Up Assistant**: Clickable suggestion chips answering specific farmer questions with case memory.

---

## Slide 8: Testing & Verification Results
- **Automated Test Suite**: `tests/test_crop_doctor_rag.py`
  - Total Tests: 8 Integration & Unit Tests
  - Test Results: **8/8 PASSED** (Execution time: 16.8 seconds)
  - Verified areas:
    * PyTorch Model inference & class extraction (Passed)
    * Knowledge base chunk integrity & metadata presence (Passed)
    * FAISS dense retrieval & cosine scoring (Passed)
    * Pydantic schema validation & serialization (Passed)
    * Deterministic offline fallback under API disruption (Passed)
    * Samples API endpoint `/api/crop-doctor/samples` (Passed)
    * Full diagnostic API endpoint `/api/crop-doctor/analyze` (Passed)
    * Follow-up consultation endpoint `/api/crop-doctor/follow-up` (Passed)
- **Build Verification**:
  - React frontend compiled with **0 errors and 0 warnings** (`npm run build`).

---

## Slide 9: Honest Limitations & Ethical Disclosures
- **Visual Overlap**: Early abiotic stressors (heat scorch, nitrogen deficiency) can visually mimic initial foliar fungal spotting.
- **Regulatory Precedence**: System serves as decision support only; farmers must always cross-reference chemical choices with registered regional agricultural department labels.
- **Dataset Diversity**: PlantVillage images are largely laboratory/controlled background leaf photos; real-world field photography may exhibit lower confidence, triggering the built-in uncertainty guard.

---

## Slide 10: Future Roadmap & Conclusion
- **Future Enhancements**:
  - Expanding the vector database to regional Indian languages (Hindi, Marathi, Telugu) using multilingual embedding models.
  - Drone-level aerial RGB crop pathology mapping.
  - Direct integration with local Krishi Vigyan Kendra (KVK) extension contacts.
- **Summary**:
  - Solved the "just a chatbot" problem through grounded RAG.
  - Preserved verified computer vision models.
  - Delivered a clean, presentation-ready product with live demonstration stability.
