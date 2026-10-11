import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';

const TECH_STACK = [
  { module: 'Computer Vision Backbone', tech: 'PyTorch 2.13.0', details: 'ResNet-50 / EfficientNet trained across 52 foliar disease classes' },
  { module: 'Vector Database (RAG)', tech: 'FAISS-CPU 1.7.4', details: 'Dense index using IndexFlatIP with L2 cosine normalization' },
  { module: 'Dense Embeddings', tech: 'gemini-embedding-001', details: '3072-dimensional semantic vectors of agricultural extension literature' },
  { module: 'Reasoning Engine', tech: 'Gemini 3.8 Flash', details: 'Strict Pydantic schema validation (`GroundedClinicalAssessment`)' },
  { module: 'Backend API Framework', tech: 'FastAPI 0.115.0 & Uvicorn', details: 'Async Python 3.11 with structured Pydantic input/output validation' },
  { module: 'Web Application Frontend', tech: 'React 19 & Tailwind CSS', details: 'Responsive enterprise UI with Lucide icons & Framer Motion' },
  { module: 'Offline Fallback Search', tech: 'Scikit-Learn TF-IDF', details: 'Deterministic keyword retrieval ensuring zero downtime if network drops' },
];

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
      
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-forest-700" />
          <span>Academic Project Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-forest-950 tracking-tight">
          About KisanVision AI
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
          KisanVision AI was built as a final-year major engineering capstone project to investigate how 
          deep learning Computer Vision and modern Retrieval-Augmented Generation (RAG) can create verifiable, 
          safety-grounded agricultural diagnostic tools.
        </p>
      </div>

      {/* ── PROJECT PURPOSE & PROBLEM STATEMENT ───────────────── */}
      <div className="agri-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-heading">
          Problem Statement & Academic Motivation
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Smallholder farmers frequently suffer catastrophic crop losses due to late diagnosis of foliar diseases. 
            While agronomists and extension officers can readily identify pathogens such as Early Blight, Late Blight, 
            and Bacterial Spot, access to experts is constrained by geographic distance and cost.
          </p>
          <p>
            Recent attempts to deploy raw conversational AI chatbots in agriculture have highlighted grave risks: 
            probabilistic LLMs hallucinate inaccurate chemical treatments, prescribe unsupported pesticide dosages, 
            and present diagnoses with unearned confidence.
          </p>
          <p className="font-semibold text-forest-950">
            KisanVision addresses this gap by decoupling perception from reasoning:
          </p>
          <ul className="space-y-1.5 pl-4 text-xs sm:text-sm text-slate-700">
            <li>1. A deterministic Computer Vision model evaluates physical leaf symptoms to produce verifiable probabilities.</li>
            <li>2. A FAISS vector database retrieves peer-reviewed extension literature matching the detected pathogen.</li>
            <li>3. Gemini 3.8 Flash acts strictly as a clinical synthesis layer, constrained to cite the retrieved literature.</li>
          </ul>
        </div>
      </div>

      {/* ── VERIFIED TECH STACK TABLE ──────────────────────────── */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            System Specifications
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Verified Technology Stack & Architectures
          </h2>
        </div>

        <div className="agri-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px]">
                  <th className="p-4 font-bold">Subsystem Component</th>
                  <th className="p-4 font-bold">Framework / Model</th>
                  <th className="p-4 font-bold">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TECH_STACK.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{row.module}</td>
                    <td className="p-4 font-mono font-semibold text-forest-800 text-xs">{row.tech}</td>
                    <td className="p-4 text-slate-600 text-xs">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── KNOWLEDGE BASE CREDITS ─────────────────────────────── */}
      <div className="agri-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-heading">
          Extension Knowledge Base Attribution
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The RAG retrieval corpus is constructed from public and permitted agricultural extension guides:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900">Solanaceous Crop Pathology Manual</div>
            <div className="text-slate-500 mt-0.5">EXT-SOL-2024-TOM • Solanaceous IPM Program</div>
            <div className="text-slate-600 mt-1">Covers Tomato & Potato Early Blight, Late Blight, Bacterial Spot, and TYLCV.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900">Tuber Health & Potato Pathology</div>
            <div className="text-slate-500 mt-0.5">EXT-TUB-2024-POT • National Potato Research Initiative</div>
            <div className="text-slate-600 mt-1">Covers foliar blights, tuber storage rot, and cultural sanitation protocols.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900">Cereal & Maize Foliar Disease Guide</div>
            <div className="text-slate-500 mt-0.5">EXT-GRN-2024-CEREAL • Cooperative Grain Pathology</div>
            <div className="text-slate-600 mt-1">Covers Northern Corn Leaf Blight, Common Rust, Rice Blast, and Bacterial Blight.</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900">Horticultural Integrated Pest Management</div>
            <div className="text-slate-500 mt-0.5">EXT-HORT-2024-IPM • Cooperative Extension Network</div>
            <div className="text-slate-600 mt-1">Covers Apple Scab, Pepper Bacterial Spot, Powdery Mildew, and IPM principles.</div>
          </div>
        </div>
      </div>

      {/* ── HONEST LIMITATIONS ──────────────────────────────────── */}
      <div className="agri-card p-6 sm:p-8 space-y-4 border-amber-300 bg-amber-50/20">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-lg font-heading">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>Honest Technical Limitations & Ethical Boundaries</span>
        </div>
        <p className="text-xs text-slate-600">
          In adherence to academic integrity guidelines, the following system limitations are acknowledged:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-700">• Visual Symptom Overlap:</span>
            <span>Early-stage viral infections and nutritional deficiencies (such as nitrogen chlorosis or iron deficiency) can mimic fungal symptoms. Laboratory tissue testing or soil analysis remains necessary for absolute confirmation.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-700">• No Unsupported Chemical Dosages:</span>
            <span>KisanVision explicitly refuses to generate arbitrary chemical concentrations. Exact pesticide dosage depends strictly on regional product registration, weather conditions, and manufacturer label instructions.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-700">• Field Photography Variance:</span>
            <span>Images taken in severe direct sunlight, heavy shadows, or with out-of-focus optics may lower model confidence below the 60% threshold, prompting a request for a clearer photograph.</span>
          </li>
        </ul>
      </div>

      {/* ── GIT BRANCH & WORKSPACE INFO ─────────────────────────── */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
        <div>
          Git Branch: <span className="font-mono font-bold text-forest-900">presentation-polish</span> • Original history preserved.
        </div>
        <Link
          to="/crop-doctor"
          className="font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1"
        >
          <span>Return to Crop Doctor Diagnostic</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default About;
