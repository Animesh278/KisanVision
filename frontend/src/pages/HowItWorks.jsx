import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-left">
      
      {/* ── 1. HEADER ────────────────────────────────────────────── */}
      <div className="border-b border-[#E7E0D2] pb-8 space-y-3">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#556B5B]">
          <span>SYSTEM ARCHITECTURE</span>
          <span>&bull;</span>
          <span>RAG PIPELINE SPECIFICATION</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-botanical-950 tracking-tight">
          How KisanVision AI Works
        </h1>
        <p className="text-xs sm:text-sm text-[#4A5D50] max-w-2xl font-sans leading-relaxed">
          A modular 3-layer architecture separating probabilistic language reasoning from deterministic computer vision inference and verified agricultural extension literature.
        </p>
      </div>

      {/* ── 2. 4-STAGE PIPELINE CARDS ───────────────────────────── */}
      <div className="space-y-6">
        <div>
          <span className="font-mono text-[11px] tracking-wider uppercase text-[#6B7D70]">
            EXECUTION PIPELINE FLOW
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-botanical-950 font-normal">
            From Leaf Ingestion to Grounded Guidance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          
          {/* Stage 1 */}
          <div className="p-5 rounded-lg bg-white border border-[#E7E0D2] space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#788A7C]">STAGE 01</span>
              <span className="px-1.5 py-0.5 rounded bg-botanical-100 text-botanical-800 font-semibold">CV</span>
            </div>
            <h3 className="font-editorial text-xl text-botanical-950 font-medium">
              Vision Classification
            </h3>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              Input photo preprocessed to 224x224 RGB. PyTorch model computes softmax logits across 52 foliar disease classes, returning top probabilities.
            </p>
            <div className="p-2 rounded bg-[#FAF7F0] border border-[#EAE3D5] font-mono text-[10px] text-botanical-900">
              Output: Predicted class + verified confidence score (e.g. 98.66%)
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-5 rounded-lg bg-white border border-[#E7E0D2] space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#788A7C]">STAGE 02</span>
              <span className="px-1.5 py-0.5 rounded bg-botanical-100 text-botanical-800 font-semibold">CAM</span>
            </div>
            <h3 className="font-editorial text-xl text-botanical-950 font-medium">
              Lesion Localization
            </h3>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              Grad-CAM extracts gradients from final convolutional features to compute spatial attention maps, confirming model focus on fungal spots.
            </p>
            <div className="p-2 rounded bg-[#FAF7F0] border border-[#EAE3D5] font-mono text-[10px] text-botanical-900">
              Output: Spatial activation map + infection severity estimation
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-5 rounded-lg bg-white border border-[#E7E0D2] space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#788A7C]">STAGE 03</span>
              <span className="px-1.5 py-0.5 rounded bg-botanical-100 text-botanical-800 font-semibold">RAG</span>
            </div>
            <h3 className="font-editorial text-xl text-botanical-950 font-medium">
              Vector Retrieval
            </h3>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              Dense query embedding probes our FAISS index of verified ICAR and USDA agricultural extension guides via cosine similarity ranking.
            </p>
            <div className="p-2 rounded bg-[#FAF7F0] border border-[#EAE3D5] font-mono text-[10px] text-botanical-900">
              Output: Relevant passages + official document citations
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-5 rounded-lg bg-white border border-[#E7E0D2] space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#788A7C]">STAGE 04</span>
              <span className="px-1.5 py-0.5 rounded bg-botanical-900 text-paper-50 font-semibold">LLM</span>
            </div>
            <h3 className="font-editorial text-xl text-botanical-950 font-medium">
              Clinical Synthesis
            </h3>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              Gemini 3.8 Flash synthesizes the CV prediction, farmer symptoms, and retrieved evidence into a strict Pydantic clinical schema.
            </p>
            <div className="p-2 rounded bg-[#FAF7F0] border border-[#EAE3D5] font-mono text-[10px] text-botanical-900">
              Output: GroundedClinicalAssessment JSON + multi-turn context
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. TECHNICAL COMPARISON TABLE ───────────────────────── */}
      <div className="rounded-xl overflow-hidden border border-[#E0D7C5] bg-white shadow-xs">
        <div className="p-6 sm:p-8 bg-[#0A1B12] text-white border-b border-[#1A3827]">
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#FAF7F0]">
            Technical Comparison: Raw LLM vs. KisanVision Grounded RAG
          </h2>
          <p className="text-xs text-[#95ADA0] mt-1 font-mono">
            EVALUATION MATRIX: GENERAL-PURPOSE CHATBOT VS. DOMAIN-SPECIFIC AGRONOMIC RAG
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E7E0D2] bg-[#F7F3EA] font-mono text-[10px] uppercase tracking-wider text-[#556B5B]">
                <th className="p-4 font-semibold">Evaluation Vector</th>
                <th className="p-4 font-semibold text-[#8F3E10]">Generic Chatbot (Unassisted LLM)</th>
                <th className="p-4 font-semibold text-botanical-900 bg-botanical-50">KisanVision AI (Grounded RAG)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E0D2] text-[#334639]">
              <tr>
                <td className="p-4 font-mono font-medium text-botanical-950">Visual Diagnosis</td>
                <td className="p-4 text-[#667A6C]">Superficial multimodal captioning without trained agronomic priors</td>
                <td className="p-4 font-medium text-botanical-950 bg-botanical-50/50">Dedicated PyTorch CNN calibrated on 52 foliar pathogen classes</td>
              </tr>
              <tr>
                <td className="p-4 font-mono font-medium text-botanical-950">Evidence Grounding</td>
                <td className="p-4 text-[#667A6C]">Probabilistic hallucinations from uncurated web training data</td>
                <td className="p-4 font-medium text-botanical-950 bg-botanical-50/50">Vector retrieval strictly from ICAR &amp; USDA Extension documents</td>
              </tr>
              <tr>
                <td className="p-4 font-mono font-medium text-botanical-950">Traceability &amp; Citations</td>
                <td className="p-4 text-[#667A6C]">Fabricated URLs, missing document codes, or vague generic claims</td>
                <td className="p-4 font-medium text-botanical-950 bg-botanical-50/50">Explicit Document ID (e.g. EXT-SOL-2024-TOM), section, and authority</td>
              </tr>
              <tr>
                <td className="p-4 font-mono font-medium text-botanical-950">Chemical Safety</td>
                <td className="p-4 text-[#667A6C]">Risk of suggesting banned or excessive pesticide concentrations</td>
                <td className="p-4 font-medium text-botanical-950 bg-botanical-50/50">Strict safety guardrails: cultural &amp; biological controls prioritized</td>
              </tr>
              <tr>
                <td className="p-4 font-mono font-medium text-botanical-950">Output Validation</td>
                <td className="p-4 text-[#667A6C]">Unstructured natural text prone to unpredictable formatting</td>
                <td className="p-4 font-medium text-botanical-950 bg-botanical-50/50">Pydantic schema validation guaranteed via response_schema JSON</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 4. DOCUMENTATION CODE INSPECTION ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-[#E7E0D2] pt-12">
        
        <div className="md:col-span-6 space-y-4">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#556B5B]">
            DOCUMENT INGESTION &amp; EMBEDDINGS
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-botanical-950 font-normal">
            The Agricultural Extension Corpus
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D50] leading-relaxed">
            Compiled from university agricultural extension bulletins, state agricultural universities, and ICAR plant pathology manuals.
          </p>
          <ul className="space-y-2 text-xs text-[#3E5244]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-700 flex-shrink-0" />
              <span>Hierarchical chunking by disease etiology, symptoms, and IPM controls</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-700 flex-shrink-0" />
              <span>3072-dimensional dense embeddings (`gemini-embedding-001`)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-700 flex-shrink-0" />
              <span>Deterministic TF-IDF fallback index for offline demonstration resilience</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link
              to="/crop-doctor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-botanical-950 text-paper-50 font-mono text-xs border border-botanical-800 hover:bg-botanical-900 transition-colors"
            >
              <span>Test Live in Crop Doctor</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-botanical-300" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-6 p-5 rounded-lg bg-[#0A1B12] text-[#F3EFE6] font-mono text-xs space-y-3 overflow-x-auto border border-[#1A3827]">
          <div className="flex items-center justify-between text-[#8BA594] pb-2 border-b border-[#1E4330] text-[10px]">
            <span>rag_retriever.py (Query Logic)</span>
            <span>FAISS Dense L2 Normalized</span>
          </div>
          <pre className="text-[#7EE7A6] leading-relaxed text-[11px]">
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
