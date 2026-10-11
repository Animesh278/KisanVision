<div align="center">

  <h1>🌾 KisanVision AI</h1>
  <h3>GenAI-Powered Crop Doctor: Multimodal Vision Diagnostics with Grounded Extension RAG</h3>
  <p>An evidence-grounded agricultural decision-support platform combining 52-class PyTorch Computer Vision classification, FAISS vector retrieval of authoritative extension literature, and Google Gemini 3.8 Flash structured clinical reasoning.</p>

  <br/>

  <!-- Tech Stack Badges -->
  <p>
    <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/PyTorch-2.13-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
    <img src="https://img.shields.io/badge/FAISS-Vector_RAG-00599C?style=for-the-badge&logo=meta&logoColor=white" alt="FAISS" />
    <img src="https://img.shields.io/badge/Gemini_3.8_Flash-GenAI-1A73E8?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
    <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </p>

  <!-- Status Badges -->
  <p>
    <img src="https://img.shields.io/badge/Branch-presentation--polish-emerald?style=flat-square" alt="Branch" />
    <img src="https://img.shields.io/badge/Tests-8%2F8%20Passed-brightgreen?style=flat-square" alt="Tests" />
    <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square" alt="Build" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
  </p>

</div>

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [System Architecture (3-Layer RAG Design)](#-system-architecture)
- [Why RAG Matters in Agricultural AI](#-why-rag-matters-in-agricultural-ai)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Knowledge Base Ingestion](#-knowledge-base-ingestion)
- [Running the Test Suite](#-running-the-test-suite)
- [Running the Application](#-running-the-application)
- [Presentation & Demo Guide](#-presentation--demo-guide)
- [Ethical Safety & Honest Limitations](#-ethical-safety--honest-limitations)
- [License](#-license)

---

## 🌐 Project Overview

**KisanVision AI** is an enterprise-grade agricultural decision-support application built for final-year major engineering capstone presentation.

### The Problem
Smallholder farmers lack affordable, timely access to certified plant pathologists. When foliar diseases strike (e.g., Early Blight in tomatoes or Late Blight in potatoes), farmers face catastrophic crop loss within days. Meanwhile, generic LLM chatbots hallucinate arbitrary chemical dosages, confuse look-alike fungal spots, and have no connection to local agricultural extension standards.

### The KisanVision Solution
KisanVision decouples **Perception** from **Reasoning**:
1. **Perception**: A dedicated PyTorch deep learning vision model classifies leaf pathology into 52 classes and generates Grad-CAM attention heatmaps.
2. **Retrieval (RAG)**: A FAISS vector database retrieves exact matching treatment protocols from peer-reviewed agricultural extension manuals (ICAR & USDA IPM guides).
3. **Reasoning**: Google Gemini 3.8 Flash reasons over the prediction and retrieved evidence, producing a strictly validated Pydantic clinical action plan with traceable source citations and multi-turn follow-up memory.

---

## 🏛️ System Architecture

```
[ Leaf Photograph ] + [ Optional Field Context: Crop, Growth Stage, Symptoms, Location ]
        │
        ▼
┌────────────────────────────────────────────────────────┐
│ 1. PERCEPTION LAYER (PyTorch CNN Backbone)             │
│    • 52 Foliar Disease Classes (Softmax Probabilities) │
│    • Tested Benchmark: 98.66% Confidence on Tomato EB  │
│    • Grad-CAM Spatial Lesion Attention Heatmap         │
└───────────────────────┬────────────────────────────────┘
                        │ Pathogen Label + Real Confidence
                        ▼
┌────────────────────────────────────────────────────────┐
│ 2. RETRIEVAL LAYER (FAISS Dense Vector RAG)           │
│    • Curated Extension Guides (ICAR & USDA Manuals)    │
│    • 3072-Dim Embeddings (gemini-embedding-001)       │
│    • Cosine Similarity Search (IndexFlatIP)            │
│    • Deterministic TF-IDF Fallback for Offline Safety │
└───────────────────────┬────────────────────────────────┘
                        │ Top-3 Evidence Passages + Citations
                        ▼
┌────────────────────────────────────────────────────────┐
│ 3. REASONING & PRESENTATION LAYER                      │
│    • Gemini 3.8 Flash (Low Temperature: 0.2)          │
│    • Pydantic Schema: GroundedClinicalAssessment      │
│    • Prioritized Actions: Cultural > Bio > Chemical   │
│    • Multi-Turn Case-Preserving Follow-Up Assistant   │
│    • React 19 Enterprise Agritech Dashboard           │
└────────────────────────────────────────────────────────┘
```

---

## 🔬 Why RAG Matters in Agricultural AI

| Vector | Unassisted LLM Chatbot | KisanVision AI (Grounded RAG) |
| :--- | :--- | :--- |
| **Visual Diagnosis** | Uncalibrated multimodal guessing | Dedicated PyTorch CNN (52 foliar disease classes) |
| **Evidence Grounding** | Unverifiable probabilistic hallucinations | Vector retrieval from published extension guides |
| **Traceability** | None (cannot cite official documents) | Explicit Document ID (`EXT-SOL-2024-TOM`) & section citations |
| **Dosage Safety** | Hallucinates dangerous chemical concentrations | Cultural pruning & irrigation adjustment prioritized first |
| **Output Integrity** | Variable unstructured text | Pydantic JSON schema strictly enforced |

---

## ✨ Key Features

1. **Focused Product Experience (Crop Doctor)**:
   - Unified diagnostic workflow replacing fragmented chatbots and duplicate pages.
   - Clean navigation: **Home | Crop Doctor | How It Works | About**.
2. **One-Click Demonstration Presets**:
   - 4 preloaded test cases (`Tomato Early Blight`, `Potato Late Blight`, `Tomato Bacterial Spot`, `Healthy Control`) for zero-risk live presentations.
3. **Transparent "How This Was Generated" Panel**:
   - Live presentation drawer exposing model logits, top-5 distributions, retrieved text chunks, and Pydantic JSON.
4. **Context-Aware Follow-Up Assistant**:
   - Multi-turn conversation preserving diagnosed case history, allowing farmers to ask about chemical timing, weather impacts, or composting.
5. **Presentation-Grade Agritech Aesthetics**:
   - Deep forest green (`#0F2E22`), fresh accent green (`#16A34A`), and warm off-white background (`#F8FAF6`) styled for professional agricultural software.

---

## 📁 Project Structure

```
Kisan Vision/
├── ai_api/
│   ├── api.py                    # Consolidated FastAPI backend
│   └── .env                      # API keys & secrets (gitignored)
├── smart_system/
│   ├── disease_engine.py         # PyTorch disease model inference engine
│   ├── rag/
│   │   ├── documents/            # Extension manuals (Tomato, Potato, Cereals, IPM)
│   │   ├── ingest.py             # Knowledge chunking & FAISS index builder
│   │   ├── retriever.py          # Dense vector search & TF-IDF fallback
│   │   ├── advisor.py            # Gemini 3.8 Flash grounded clinical reasoning
│   │   └── index/                # FAISS vector index & metadata JSON
│   ├── crop_engine.py            # Crop recommendation engine
│   └── yield_engine.py           # Historical yield prediction engine
├── disease_model/
│   ├── models/                   # disease_model.pth & class_names.json
│   └── data/PlantVillage/        # Evaluation & test leaf datasets
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Footer, LanguageSwitcher
│   │   ├── pages/                # Home, CropDoctor, HowItWorks, About
│   │   ├── App.js                # Clean 4-page router
│   │   └── index.css             # Enterprise agritech design system
│   └── public/samples/           # Demonstration preset leaf images
├── samples/                      # Root copies of verified sample images
├── tests/
│   └── test_crop_doctor_rag.py   # 8-point automated test suite
├── docs/
│   ├── DEMO.md                   # 5-7 minute presentation script & examiner Q&A
│   └── PRESENTATION_OUTLINE.md   # Slide-by-slide defense deck outline
├── requirements.txt              # Backend dependencies
└── README.md                     # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.10+ (Python 3.11 recommended)
- Node.js v18+ and npm
- Google Gemini API Key

### 1. Backend Setup
```bash
# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Copy .env.example to .env in workspace root and ai_api/.env
cp .env.example .env
cp .env.example ai_api/.env
# Add your GEMINI_API_KEY inside .env
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

---

## 📚 Knowledge Base Ingestion

To compile the extension literature and generate the dense FAISS vector index:
```bash
python smart_system/rag/ingest.py
```
Outputs generated:
- `smart_system/rag/index/rag_chunks.json` (28 semantic chunks with metadata)
- `smart_system/rag/index/rag_dense.faiss` (3072-dim FAISS IndexFlatIP)
- `smart_system/rag/index/rag_tfidf.pkl` (Deterministic offline fallback index)

---

## 🧪 Running the Test Suite

Run the 8-point automated test suite:
```bash
python -m unittest tests/test_crop_doctor_rag.py -v
```
**Test Coverage:**
- `test_01_disease_inference_integration`: PyTorch model inference & class names verification.
- `test_02_rag_knowledge_base_integrity`: Extension chunk metadata completeness.
- `test_03_rag_retrieval_and_source_metadata`: FAISS retrieval and citation generation.
- `test_04_pydantic_schema_validation`: Strict schema enforcement.
- `test_05_offline_fallback_and_uncertainty_guard`: Deterministic advice fallback and low-confidence handling.
- `test_06_crop_doctor_samples_endpoint`: Sample preset catalog availability.
- `test_07_crop_doctor_analyze_endpoint`: Full end-to-end diagnostic pipeline.
- `test_08_crop_doctor_follow_up_endpoint`: Multi-turn conversational consultation.

---

## 💻 Running the Application

### 1. Launch FastAPI Backend
```bash
python -m uvicorn ai_api.api:app --host 127.0.0.1 --port 8000 --reload
```
API runs at: `http://localhost:8000` (Interactive docs at `http://localhost:8000/docs`).

### 2. Launch React Frontend
```bash
cd frontend
npm start
```
Frontend runs at: `http://localhost:3000`.

---

## 🎤 Presentation & Demo Guide

Refer to our specialized documentation for presentation defense:
- **[docs/DEMO.md](docs/DEMO.md)**: A complete 5 to 7 minute click-by-click script with exact narration and examiner Q&A answers.
- **[docs/PRESENTATION_OUTLINE.md](docs/PRESENTATION_OUTLINE.md)**: Slide-by-slide outline with verified metrics and architectural diagrams.

---

## ⚖️ Ethical Safety & Honest Limitations

1. **Advisory Decision Support**: KisanVision AI is an early-warning and decision-support tool. Farmers must verify all chemical interventions against regional agricultural department guidelines and manufacturer container labels.
2. **Visual Mimicry**: Abiotic factors (sunscald, ozone damage, nitrogen deficiency) can mimic initial foliar fungal spotting. When confidence is below 60%, the system flags uncertainty and requests additional field checks.
3. **No Unvetted Dosages**: The GenAI layer is strictly forbidden from generating arbitrary pesticide concentrations.

---

## 📄 License
This project is licensed under the MIT License.