import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, CheckCircle2, ArrowRight, Database } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-forest-700" />
          <span>Technical Architecture & RAG Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-950 tracking-tight">
          How KisanVision AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          A modular 3-layer architecture that separates probabilistic language reasoning from deterministic 
          computer vision inference and verified agricultural extension literature.
        </p>
      </div>

      {/* ── INTERACTIVE 4-STAGE PIPELINE DIAGRAM ───────────────── */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            End-to-End Execution Flow
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            From Leaf Image to Grounded Clinical Guidance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Stage 1 */}
          <div className="agri-card p-6 space-y-4 border-t-4 border-t-emerald-600">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 1</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold">
                CV
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Vision Classification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The input leaf photo is preprocessed to 224x224 RGB and passed through the PyTorch vision backbone. 
              The model evaluates softmax logits over 52 foliar disease classes, returning top-5 probabilities.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
              Output: Predicted class + verified confidence score (e.g. 98.66%)
            </div>
          </div>

          {/* Stage 2 */}
          <div className="agri-card p-6 space-y-4 border-t-4 border-t-forest-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 2</span>
              <span className="w-7 h-7 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center text-xs font-bold">
                CAM
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Lesion Localization
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Grad-CAM extracts gradients from the final convolutional feature layer to compute spatial lesion intensity, 
              confirming the model looks at actual fungal spots rather than background noise.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
              Output: Spatial activation map + infection severity level
            </div>
          </div>

          {/* Stage 3 */}
          <div className="agri-card p-6 space-y-4 border-t-4 border-t-emerald-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 3</span>
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold">
                RAG
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              FAISS Vector Retrieval
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Query vector generated via 3072-dimensional embeddings searches our FAISS vector index of verified agricultural 
              extension manuals (ICAR & USDA IPM guides) with cosine similarity ranking.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
              Output: Top-3 relevant passages + official document citations
            </div>
          </div>

          {/* Stage 4 */}
          <div className="agri-card p-6 space-y-4 border-t-4 border-t-forest-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 4</span>
              <span className="w-7 h-7 rounded-lg bg-forest-900 text-emerald-400 flex items-center justify-center text-xs font-bold">
                LLM
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Structured Reasoning
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini 3.8 Flash synthesizes the CV prediction, farmer symptoms, and retrieved evidence. 
              Output conforms to a strict Pydantic schema with cultural, biological, and chemical actions.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700">
              Output: GroundedClinicalAssessment JSON + follow-up readiness
            </div>
          </div>

        </div>
      </div>

      {/* ── TECHNICAL COMPARISON TABLE ─────────────────────────── */}
      <div className="agri-card-elevated overflow-hidden">
        <div className="p-6 sm:p-8 bg-forest-900 text-white">
          <h2 className="text-2xl font-bold font-heading">
            Technical Comparison: Raw LLM vs. KisanVision Grounded RAG
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Why domain-specific retrieval-augmented generation is required for agricultural AI:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px]">
                <th className="p-4 font-bold">Evaluation Vector</th>
                <th className="p-4 font-bold text-rose-700">Generic Chatbot (Unassisted LLM)</th>
                <th className="p-4 font-bold text-emerald-800 bg-emerald-50/60">KisanVision AI (Grounded RAG)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-4 font-bold text-slate-900">Visual Diagnosis</td>
                <td className="p-4 text-slate-600">Superficial multimodal captioning without trained agronomic priors</td>
                <td className="p-4 font-medium text-emerald-950 bg-emerald-50/30">Dedicated PyTorch CNN calibrated on 52 crop disease classes</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Evidence Grounding</td>
                <td className="p-4 text-slate-600">Probabilistic hallucinations from training pre-corpus</td>
                <td className="p-4 font-medium text-emerald-950 bg-emerald-50/30">Vector retrieval strictly from ICAR & USDA Extension documents</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Traceability & Citations</td>
                <td className="p-4 text-slate-600">Fabricated URLs, missing document codes, or generic claims</td>
                <td className="p-4 font-medium text-emerald-950 bg-emerald-50/30">Explicit Document ID, section names, and publishing authority citations</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Chemical Safety</td>
                <td className="p-4 text-slate-600">Risk of suggesting illegal or excessive pesticide concentrations</td>
                <td className="p-4 font-medium text-emerald-950 bg-emerald-50/30">Strict safety guardrails: cultural & biological controls prioritized</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Output Validation</td>
                <td className="p-4 text-slate-600">Unstructured markdown text, variable formats</td>
                <td className="p-4 font-medium text-emerald-950 bg-emerald-50/30">Pydantic schema validation guaranteed via response_schema JSON</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── KNOWLEDGE BASE INGESTION PIPELINE ──────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <Database className="w-3.5 h-3.5" />
            <span>Document Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
            The Agricultural Extension Corpus
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our knowledge base is not scraped from random blogs. It is compiled from peer-reviewed agricultural extension 
            literature published by university extension networks and state agricultural universities.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Hierarchical chunking by disease etiology, symptoms, and IPM controls</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>3072-dimensional dense embeddings (`gemini-embedding-001`)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Deterministic TF-IDF fallback index for offline demonstration resilience</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link to="/crop-doctor" className="btn-forest">
              <span>Test Live in Crop Doctor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-3 overflow-x-auto shadow-md">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
            <span>rag_retriever.py (Core Query Logic)</span>
            <span>FAISS L2 Normalized</span>
          </div>
          <pre className="text-emerald-400 leading-relaxed">
{`# 1. Dense query embedding
vec = client.models.embed_content(
    model="gemini-embedding-001",
    contents=f"{crop} {disease} {symptoms}"
)

# 2. Vector search in FAISS
distances, indices = faiss_index.search(vec, top_k=3)

# 3. Grounded Gemini Generation
res = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=grounded_prompt,
    config={
        "response_mime_type": "application/json",
        "response_schema": GroundedClinicalAssessment
    }
)`}
          </pre>
        </div>

      </div>

    </div>
  );
};

export default HowItWorks;
