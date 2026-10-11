import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, ArrowUpRight, ShieldCheck, Cpu, 
  CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      
      {/* ── 1. SIGNATURE HERO COMPOSITION ────────────────────────── */}
      <section className="relative pt-6 sm:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Series Identifier */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E7E0D2] mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#556B5B] font-medium">
                AI CROP INTELLIGENCE // FIELD RESEARCH SERIES
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E683F]"></span>
              <span className="font-mono text-[11px] text-[#788A7C]">
                DOC-REF: KV-2024.08
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#788A7C] hidden md:block">
              52 FOLIAR PATHOGENS &bull; FAISS VECTOR RETRIEVAL &bull; GEMINI 3.8 REASONING
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Editorial Headline & Stance */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              <div className="space-y-3">
                <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-normal text-botanical-950 tracking-tight leading-[1.05]">
                  Clinical intelligence for the living canopy.
                </h1>
                <p className="text-base sm:text-lg text-[#3E5244] leading-relaxed max-w-xl font-sans pt-1">
                  Bridging deep convolutional vision with agricultural extension literature. KisanVision replaces speculative chatbot guesswork with verifiable, evidence-grounded plant pathology.
                </p>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <Link
                  to="/crop-doctor"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-botanical-950 text-paper-50 font-medium text-sm border border-botanical-800 hover:bg-botanical-900 active:scale-[0.99] transition-all shadow-sm group"
                >
                  <Stethoscope className="w-4 h-4 text-botanical-300" />
                  <span>Analyze Your Crop</span>
                  <ArrowUpRight className="w-4 h-4 text-botanical-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#FAF7F0] text-botanical-900 font-medium text-sm border border-[#E0D7C5] hover:bg-[#F2ECE0] active:scale-[0.99] transition-all"
                >
                  <Cpu className="w-4 h-4 text-[#556B5B]" />
                  <span>Explore RAG Architecture</span>
                </Link>
              </div>

              {/* Research Baseline Metrics */}
              <div className="pt-8 border-t border-[#E7E0D2] grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="font-editorial text-3xl font-medium text-botanical-950">52</div>
                  <div className="font-mono text-[10px] tracking-wider uppercase text-[#67796C] mt-0.5">Pathogen Classes</div>
                </div>
                <div>
                  <div className="font-editorial text-3xl font-medium text-botanical-700">3072-d</div>
                  <div className="font-mono text-[10px] tracking-wider uppercase text-[#67796C] mt-0.5">Dense Vector RAG</div>
                </div>
                <div>
                  <div className="font-editorial text-3xl font-medium text-botanical-950">100%</div>
                  <div className="font-mono text-[10px] tracking-wider uppercase text-[#67796C] mt-0.5">Cited Evidence</div>
                </div>
              </div>

            </div>

            {/* Right Column: High-Resolution Botanical Specimen Plate */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#F4EFE6] p-3.5 sm:p-4 rounded-xl border border-[#DFD6C4] shadow-sm">
                
                {/* Specimen Header Ribbon */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2D9C8]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1E683F]"></span>
                    <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-botanical-900">
                      BOTANICAL SPECIMEN PLATE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#738477]">
                    REF // CANOPY-042
                  </span>
                </div>

                {/* Macro Crop Photograph */}
                <div className="relative rounded-lg overflow-hidden bg-[#10241A] aspect-[4/3] border border-[#D5C9B4]">
                  <img
                    src="/hero_botanical.jpg"
                    alt="Botanical Leaf Specimen"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Scientific calibration overlays */}
                  <div className="absolute top-3 left-3 bg-[#0A1811]/85 backdrop-blur-xs text-[#E1EBE4] px-2.5 py-1 rounded border border-[#274834] font-mono text-[10px]">
                    SPECTRAL VEIN MAPPING
                  </div>
                  
                  <div className="absolute bottom-3 right-3 bg-[#0A1811]/85 backdrop-blur-xs text-[#E1EBE4] px-2.5 py-1 rounded border border-[#274834] font-mono text-[10px]">
                    CONFIDENCE: 98.7%
                  </div>
                </div>

                {/* Specimen Field Notes */}
                <div className="mt-4 pt-3 border-t border-[#E2D9C8] space-y-2 text-left">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[#647769]">TARGET HOST:</span>
                    <span className="font-medium text-botanical-950 italic font-editorial text-sm">Solanum lycopersicum</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[#647769]">DIAGNOSIS PIPELINE:</span>
                    <span className="text-botanical-800">PyTorch CNN &rarr; FAISS Vector RAG</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#ECE5D6] border border-[#DDD3C0] text-[11px] text-[#445648] leading-relaxed">
                    <strong>Field Observation:</strong> Grounded extension protocols require cultural canopy sanitation prior to fungicide application, limiting chemical resistance.
                  </div>
                </div>

                <div className="mt-3">
                  <Link
                    to="/crop-doctor?sample=tomato_early_blight"
                    className="w-full py-2.5 px-3 rounded bg-botanical-950 hover:bg-botanical-900 text-paper-50 font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Test Tomato Early Blight Sample</span>
                    <ArrowRight className="w-3.5 h-3.5 text-botanical-400" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. THE THREE-STAGE DIAGNOSTIC METHODOLOGY ────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-t border-[#E7E0D2] pt-14 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#556B5B] font-medium">
                METHODOLOGY & EXECUTION
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-botanical-950 font-normal">
                How KisanVision Diagnoses Your Crop
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4E6253] max-w-md font-sans">
              A deterministic two-stage pipeline separating computer vision inference from generative language synthesis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="p-6 rounded-xl bg-white border border-[#E7E0D2] space-y-4 hover:border-botanical-300 transition-colors text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-botanical-800 px-2 py-0.5 rounded bg-botanical-50 border border-botanical-200">
                PHASE 01
              </span>
              <span className="font-mono text-[10px] text-[#788A7C]">IMAGE INGESTION</span>
            </div>
            <h3 className="font-editorial text-2xl text-botanical-950 font-normal">
              Canopy & Specimen Intake
            </h3>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              Upload a photograph of the symptomatic crop leaf or select from verified demonstration plates. Dimensions are normalized and validated for RGB channel fidelity.
            </p>
            <div className="pt-2 border-t border-[#F0EBE0] font-mono text-[11px] text-[#5A6D5F] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-600" />
              <span>Supports Solanaceous, Cereals, and Fruits</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl bg-white border border-[#E7E0D2] space-y-4 hover:border-botanical-300 transition-colors text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-botanical-800 px-2 py-0.5 rounded bg-botanical-50 border border-botanical-200">
                PHASE 02
              </span>
              <span className="font-mono text-[10px] text-[#788A7C]">CV &amp; DENSE RETRIEVAL</span>
            </div>
            <h3 className="font-editorial text-2xl text-botanical-950 font-normal">
              Vision CNN &amp; Vector Matching
            </h3>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              PyTorch backbone outputs 52-class softmax logits. Concurrently, dense query embeddings probe our FAISS vector index of verified extension literature for matching agronomic guidance.
            </p>
            <div className="pt-2 border-t border-[#F0EBE0] font-mono text-[11px] text-[#5A6D5F] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-600" />
              <span>3072-Dimensional Dense Vectors</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl bg-white border border-[#E7E0D2] space-y-4 hover:border-botanical-300 transition-colors text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-botanical-800 px-2 py-0.5 rounded bg-botanical-50 border border-botanical-200">
                PHASE 03
              </span>
              <span className="font-mono text-[10px] text-[#788A7C]">CLINICAL SYNTHESIS</span>
            </div>
            <h3 className="font-editorial text-2xl text-botanical-950 font-normal">
              Grounded Gemini Reasoning
            </h3>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              Gemini 3.8 Flash reasons over the vision prediction and retrieved extension excerpts. Structured Pydantic schemas enforce cultural, biological, and chemical safety boundaries.
            </p>
            <div className="pt-2 border-t border-[#F0EBE0] font-mono text-[11px] text-[#5A6D5F] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-600" />
              <span>Traceable Document Citations</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. TECHNICAL PROBLEM / EVIDENCE GROUNDING ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A1B12] text-[#F3EFE6] rounded-2xl p-8 sm:p-12 border border-[#1A3827]">
          
          <div className="max-w-3xl space-y-3 mb-10 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[#132E20] border border-[#235036] text-[#A6C4AF]">
              ACADEMIC &amp; AGRONOMIC COMPARISON
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#FAF7F0] tracking-tight">
              Why Unconstrained LLMs Fail in Agriculture
            </h2>
            <p className="text-xs sm:text-sm text-[#A8BDB0] leading-relaxed">
              Agronomic decision support demands strict adherence to university extension protocols. General chatbots invent pesticide rates and recommend restricted chemicals without safety grounding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            
            {/* The Unreliable Chatbot */}
            <div className="p-6 rounded-xl bg-[#0F261B] border border-[#1E4330] space-y-4">
              <div className="flex items-center gap-2 text-[#E87A5D] font-mono text-xs font-semibold uppercase">
                <AlertCircle className="w-4 h-4 text-[#E87A5D]" />
                <span>Standard AI Chatbot (Ungrounded)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#B2C5B9] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#E87A5D] font-bold">&times;</span>
                  <span>Invents arbitrary chemical application dosages without label context.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E87A5D] font-bold">&times;</span>
                  <span>No connection to actual Computer Vision model logits or confidence values.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E87A5D] font-bold">&times;</span>
                  <span>Cannot provide verifiable bibliographic citations to agricultural bulletins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E87A5D] font-bold">&times;</span>
                  <span>Falsely confident output even when leaf photos are blurry or ambiguous.</span>
                </li>
              </ul>
            </div>

            {/* KisanVision RAG */}
            <div className="p-6 rounded-xl bg-[#143324] border border-[#276142] space-y-4">
              <div className="flex items-center gap-2 text-[#68D391] font-mono text-xs font-semibold uppercase">
                <ShieldCheck className="w-4 h-4 text-[#68D391]" />
                <span>KisanVision Grounded RAG Platform</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#D8EADB] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#68D391] flex-shrink-0 mt-0.5" />
                  <span>Dual validation: PyTorch CNN probability + vector literature retrieval.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#68D391] flex-shrink-0 mt-0.5" />
                  <span>Strict architectural boundary between image inference and LLM explanation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#68D391] flex-shrink-0 mt-0.5" />
                  <span>Every recommendation cites verified extension manuals (e.g. EXT-SOL-2024-TOM).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#68D391] flex-shrink-0 mt-0.5" />
                  <span>Built-in uncertainty indicators when confidence is low or symptoms diverge.</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-[#1C3E2B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#8BA594]">
              INSPECTION: Softmax logits, retrieved chunks &amp; Pydantic schema
            </span>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#7EE7A6] hover:text-white transition-colors"
            >
              <span>View Interactive Architecture Diagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 4. ZERO-RISK DEMONSTRATION CASES ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#556B5B] font-medium">
              VERIFIED FIELD SPECIMENS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-botanical-950 font-normal">
              One-Click Demonstration Cases
            </h2>
          </div>
          <Link
            to="/crop-doctor"
            className="text-xs font-mono font-medium text-botanical-900 hover:text-botanical-700 flex items-center gap-1.5"
          >
            <span>Open Custom Upload</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Specimen 1 */}
          <Link
            to="/crop-doctor?sample=tomato_early_blight"
            className="p-3.5 rounded-xl bg-white border border-[#E7E0D2] group hover:border-botanical-400 transition-all text-left flex flex-col"
          >
            <div className="h-40 rounded-lg overflow-hidden bg-[#F4EFE6] border border-[#E0D7C5] mb-3">
              <img
                src="/samples/tomato_early_blight.jpg"
                alt="Tomato Early Blight"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider uppercase text-botanical-800 bg-[#E8EFEA] px-1.5 py-0.5 rounded">
                  TOMATO
                </span>
                <span className="font-mono text-[10px] text-[#758778]">EXT-SOL-TOM</span>
              </div>
              <h4 className="font-editorial text-lg text-botanical-950 font-medium pt-1">
                Tomato Early Blight
              </h4>
              <p className="text-xs text-[#526557] line-clamp-2">
                Concentric target-board necrotic lesions with chlorotic halos on lower foliage.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F0EBE0] font-mono text-[11px] text-botanical-800 flex items-center justify-between">
              <span>Run Diagnostic</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Specimen 2 */}
          <Link
            to="/crop-doctor?sample=potato_late_blight"
            className="p-3.5 rounded-xl bg-white border border-[#E7E0D2] group hover:border-botanical-400 transition-all text-left flex flex-col"
          >
            <div className="h-40 rounded-lg overflow-hidden bg-[#F4EFE6] border border-[#E0D7C5] mb-3">
              <img
                src="/samples/potato_late_blight.jpg"
                alt="Potato Late Blight"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#8D4A1B] bg-[#FDF0E6] px-1.5 py-0.5 rounded">
                  POTATO
                </span>
                <span className="font-mono text-[10px] text-[#758778]">EXT-TUB-POT</span>
              </div>
              <h4 className="font-editorial text-lg text-botanical-950 font-medium pt-1">
                Potato Late Blight
              </h4>
              <p className="text-xs text-[#526557] line-clamp-2">
                Water-soaked purplish lesions with rapid necrotic canopy collapse.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F0EBE0] font-mono text-[11px] text-botanical-800 flex items-center justify-between">
              <span>Run Diagnostic</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Specimen 3 */}
          <Link
            to="/crop-doctor?sample=tomato_bacterial_spot"
            className="p-3.5 rounded-xl bg-white border border-[#E7E0D2] group hover:border-botanical-400 transition-all text-left flex flex-col"
          >
            <div className="h-40 rounded-lg overflow-hidden bg-[#F4EFE6] border border-[#E0D7C5] mb-3">
              <img
                src="/samples/tomato_bacterial_spot.jpg"
                alt="Tomato Bacterial Spot"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider uppercase text-botanical-800 bg-[#E8EFEA] px-1.5 py-0.5 rounded">
                  TOMATO
                </span>
                <span className="font-mono text-[10px] text-[#758778]">EXT-SOL-TOM</span>
              </div>
              <h4 className="font-editorial text-lg text-botanical-950 font-medium pt-1">
                Bacterial Spot
              </h4>
              <p className="text-xs text-[#526557] line-clamp-2">
                Small angular greasy lesions with distinct yellow margins on leaflets.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F0EBE0] font-mono text-[11px] text-botanical-800 flex items-center justify-between">
              <span>Run Diagnostic</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Specimen 4 */}
          <Link
            to="/crop-doctor?sample=tomato_healthy"
            className="p-3.5 rounded-xl bg-white border border-[#E7E0D2] group hover:border-botanical-400 transition-all text-left flex flex-col"
          >
            <div className="h-40 rounded-lg overflow-hidden bg-[#F4EFE6] border border-[#E0D7C5] mb-3">
              <img
                src="/samples/tomato_healthy.jpg"
                alt="Healthy Control"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider uppercase text-botanical-800 bg-[#E8EFEA] px-1.5 py-0.5 rounded">
                  CONTROL
                </span>
                <span className="font-mono text-[10px] text-[#758778]">BASELINE</span>
              </div>
              <h4 className="font-editorial text-lg text-botanical-950 font-medium pt-1">
                Healthy Foliage
              </h4>
              <p className="text-xs text-[#526557] line-clamp-2">
                Uniform green canopy without fungal or bacterial necrosis.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#F0EBE0] font-mono text-[11px] text-botanical-800 flex items-center justify-between">
              <span>Run Diagnostic</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>

        </div>
      </section>

      {/* ── 5. FINAL INVITATION ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] border border-[#E5DDCE] rounded-xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-editorial text-2xl sm:text-3xl text-botanical-950 font-normal">
              Conduct a Clinical Field Examination
            </h3>
            <p className="text-xs sm:text-sm text-[#4E6253] leading-relaxed">
              Upload any custom crop leaf photograph or load a demonstration case. Inspect real model confidence distributions, Grad-CAM activation heatmaps, and retrieved extension guides.
            </p>
          </div>
          <Link
            to="/crop-doctor"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-botanical-950 text-paper-50 font-medium text-xs font-mono tracking-wide border border-botanical-800 hover:bg-botanical-900 active:scale-[0.99] transition-all whitespace-nowrap shadow-xs"
          >
            <Stethoscope className="w-4 h-4 text-botanical-300" />
            <span>LAUNCH CROP DOCTOR</span>
            <ArrowUpRight className="w-4 h-4 text-botanical-400" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
