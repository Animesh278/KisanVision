import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

const TECH_STACK = [
  { module: 'Computer Vision Backbone', tech: 'PyTorch 2.13.0', details: 'ResNet-50 / EfficientNet trained across 52 foliar disease classes' },
  { module: 'Vector Database (RAG)', tech: 'FAISS-CPU 1.7.4', details: 'Dense index using IndexFlatIP with L2 cosine normalization' },
  { module: 'Dense Embeddings', tech: 'gemini-embedding-001', details: '3072-dimensional semantic vectors of agricultural extension literature' },
  { module: 'Reasoning Engine', tech: 'Gemini 3.8 Flash', details: 'Strict Pydantic schema validation (`GroundedClinicalAssessment`)' },
  { module: 'Backend API Framework', tech: 'FastAPI 0.115.0 & Uvicorn', details: 'Async Python 3.11 with structured Pydantic input/output validation' },
  { module: 'Web Application Frontend', tech: 'React 19 & Tailwind CSS', details: 'Responsive editorial botanical UI with Lucide icons' },
  { module: 'Offline Fallback Search', tech: 'Scikit-Learn TF-IDF', details: 'Deterministic keyword retrieval ensuring zero downtime if network drops' },
];

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 text-left">
      
      {/* ── 1. HEADER ────────────────────────────────────────────── */}
      <div className="border-b border-[#E7E0D2] pb-8 space-y-3">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#556B5B]">
          <span>ACADEMIC PROJECT DISCLOSURE</span>
          <span>&bull;</span>
          <span>CAPSTONE SPECIFICATION</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-botanical-950 tracking-tight">
          About KisanVision AI
        </h1>
        <p className="text-xs sm:text-sm text-[#4A5D50] leading-relaxed max-w-3xl font-sans">
          Built as a final-year major engineering capstone project to investigate how deep learning Computer Vision and modern Retrieval-Augmented Generation (RAG) can create verifiable, safety-grounded agricultural diagnostic tools.
        </p>
      </div>

      {/* ── 2. PROJECT PURPOSE & PROBLEM STATEMENT ───────────────── */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E7E0D2] space-y-4 shadow-xs">
        <div className="font-mono text-[10px] tracking-wider uppercase text-[#6B7D70]">
          RESEARCH BACKGROUND
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl text-botanical-950 font-normal">
          Problem Statement &amp; Academic Motivation
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[#3E5244] leading-relaxed">
          <p>
            Smallholder farmers frequently suffer catastrophic crop losses due to late diagnosis of foliar diseases. While extension officers can identify pathogens such as Early Blight, Late Blight, and Bacterial Spot, access to field pathologists is constrained by geographic distance and cost.
          </p>
          <p>
            Recent attempts to deploy raw conversational AI chatbots in agriculture have highlighted grave risks: probabilistic LLMs hallucinate inaccurate chemical treatments, prescribe unsupported pesticide dosages, and present diagnoses with unearned confidence.
          </p>
          <p className="font-semibold text-botanical-950">
            KisanVision addresses this gap by decoupling perception from reasoning:
          </p>
          <ul className="space-y-1.5 pl-3 text-xs text-[#4A5D50] font-sans">
            <li>&bull; 1. A deterministic Computer Vision model evaluates physical leaf symptoms to produce verifiable softmax probabilities.</li>
            <li>&bull; 2. A FAISS vector database retrieves peer-reviewed extension literature matching the detected pathogen.</li>
            <li>&bull; 3. Gemini 3.8 Flash acts strictly as a clinical synthesis layer, constrained by Pydantic schemas to cite retrieved literature.</li>
          </ul>
        </div>
      </div>

      {/* ── 3. VERIFIED TECH STACK TABLE ──────────────────────────── */}
      <div className="space-y-4">
        <div>
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#556B5B]">
            SYSTEM ARCHITECTURES
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-botanical-950 font-normal mt-0.5">
            Verified Technology Stack &amp; Libraries
          </h2>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#E7E0D2] bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E7E0D2] bg-[#F7F3EA] font-mono text-[10px] uppercase tracking-wider text-[#556B5B]">
                  <th className="p-4 font-semibold">Subsystem Component</th>
                  <th className="p-4 font-semibold">Framework / Model</th>
                  <th className="p-4 font-semibold">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E0D2]">
                {TECH_STACK.map((row, i) => (
                  <tr key={i} className="hover:bg-[#FAF7F0] transition-colors">
                    <td className="p-4 font-medium text-botanical-950">{row.module}</td>
                    <td className="p-4 font-mono font-medium text-botanical-800 text-[11px]">{row.tech}</td>
                    <td className="p-4 text-[#4A5D50]">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── 4. EXTENSION ATTRIBUTION ───────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E7E0D2] space-y-4 shadow-xs">
        <div className="font-mono text-[10px] tracking-wider uppercase text-[#6B7D70]">
          AUTHORITATIVE GROUNDING CORPUS
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl text-botanical-950 font-normal">
          Extension Knowledge Base Attribution
        </h2>
        <p className="text-xs sm:text-sm text-[#4A5D50] leading-relaxed">
          The RAG retrieval corpus is constructed from public agricultural extension guides:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-[#FAF7F0] border border-[#E7E0D2]">
            <div className="font-editorial text-base text-botanical-950 font-medium">Solanaceous Crop Pathology Manual</div>
            <div className="font-mono text-[10px] text-botanical-700 mt-0.5">EXT-SOL-2024-TOM &bull; Solanaceous IPM Program</div>
            <div className="text-[#556B5B] mt-1 text-[11px]">Covers Tomato &amp; Potato Early Blight, Late Blight, Bacterial Spot, and TYLCV.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#FAF7F0] border border-[#E7E0D2]">
            <div className="font-editorial text-base text-botanical-950 font-medium">Tuber Health &amp; Potato Pathology</div>
            <div className="font-mono text-[10px] text-botanical-700 mt-0.5">EXT-TUB-2024-POT &bull; National Potato Research</div>
            <div className="text-[#556B5B] mt-1 text-[11px]">Covers foliar blights, tuber storage rot, and cultural sanitation protocols.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#FAF7F0] border border-[#E7E0D2]">
            <div className="font-editorial text-base text-botanical-950 font-medium">Cereal &amp; Maize Foliar Disease Guide</div>
            <div className="font-mono text-[10px] text-botanical-700 mt-0.5">EXT-GRN-2024-CEREAL &bull; Cooperative Grain Pathology</div>
            <div className="text-[#556B5B] mt-1 text-[11px]">Covers Northern Corn Leaf Blight, Common Rust, Rice Blast, and Bacterial Blight.</div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#FAF7F0] border border-[#E7E0D2]">
            <div className="font-editorial text-base text-botanical-950 font-medium">Horticultural Integrated Pest Management</div>
            <div className="font-mono text-[10px] text-botanical-700 mt-0.5">EXT-HORT-2024-IPM &bull; Extension Network</div>
            <div className="text-[#556B5B] mt-1 text-[11px]">Covers Apple Scab, Pepper Bacterial Spot, Powdery Mildew, and IPM principles.</div>
          </div>
        </div>
      </div>

      {/* ── 5. HONEST LIMITATIONS ───────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#FEF6EE] border border-[#F5D8C3] space-y-4">
        <div className="flex items-center gap-2 text-[#8F3E10] font-mono text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-[#C9531E]" />
          <span>Honest Technical Limitations &amp; Ethical Boundaries</span>
        </div>
        <p className="text-xs text-[#70300C]">
          In adherence to academic integrity guidelines, the following system limitations are acknowledged:
        </p>
        <ul className="space-y-2 text-xs text-[#5C270A] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="font-semibold text-[#8F3E10]">&bull; Visual Symptom Overlap:</span>
            <span>Early viral infections and nutritional chlorosis can mimic fungal symptoms. Laboratory tissue testing remains necessary for definitive confirmation.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-[#8F3E10]">&bull; No Unsupported Chemical Dosages:</span>
            <span>KisanVision explicitly refuses to generate arbitrary chemical concentrations. Exact pesticide dosage depends strictly on regional product registration and container labels.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-[#8F3E10]">&bull; Field Photography Variance:</span>
            <span>Images taken in severe direct sunlight, heavy shadows, or with out-of-focus optics lower model confidence below the 60% threshold, prompting a request for a clearer photograph.</span>
          </li>
        </ul>
      </div>

      {/* ── 6. CITATION BANNER ─────────────────────────────────── */}
      <div className="p-4 rounded-lg bg-[#FAF7F0] border border-[#E7E0D2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#556B5B] gap-3">
        <div className="font-mono text-[11px]">
          Git Branch: <span className="font-bold text-botanical-950">main</span> &bull; Original history preserved.
        </div>
        <Link
          to="/crop-doctor"
          className="font-mono text-xs font-medium text-botanical-900 hover:text-botanical-700 flex items-center gap-1.5"
        >
          <span>Return to Crop Doctor</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};

export default About;
