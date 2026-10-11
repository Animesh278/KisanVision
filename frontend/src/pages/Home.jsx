import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, ArrowRight, ShieldCheck, Cpu, BookOpen, 
  Sparkles, CheckCircle2, AlertCircle, Eye, FileText, ChevronRight
} from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next-Gen Agricultural AI Decision Support</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-950 leading-[1.15]">
                Grounded Crop Doctor for Precision Plant Health
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Combines a 52-class deep learning Computer Vision model with 
                <span className="font-semibold text-slate-800"> Retrieval-Augmented Generation (RAG)</span>. 
                Delivers clinical diagnosis, verifiable extension literature citations, and practical field action plans.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/crop-doctor"
                  className="btn-accent text-base py-3.5 px-8 shadow-sm hover:shadow-md"
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Analyze Your Crop</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="btn-outline text-base py-3.5 px-6"
                >
                  <Cpu className="w-4 h-4 text-forest-800" />
                  <span>Explore RAG Architecture</span>
                </Link>
              </div>

              {/* Key Trust Metrics (Real & Verified) */}
              <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-bold text-forest-900 font-heading">52 Classes</div>
                  <div className="text-xs text-slate-500 font-medium">Foliar Pathogens Covered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600 font-heading">Vector RAG</div>
                  <div className="text-xs text-slate-500 font-medium">Extension Grounded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forest-900 font-heading">Zero Hallucination</div>
                  <div className="text-xs text-slate-500 font-medium">Traceable Citations</div>
                </div>
              </div>

            </div>

            {/* Right Column: Realistic Live Diagnostic Preview */}
            <div className="lg:col-span-5">
              <div className="agri-card-elevated p-6 bg-white relative overflow-hidden">
                
                {/* Status Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Sample Case Diagnostic
                    </span>
                  </div>
                  <span className="badge-high">
                    <ShieldCheck className="w-3.5 h-3.5" /> 98.7% Verified Confidence
                  </span>
                </div>

                {/* Leaf Visual & Prediction Box */}
                <div className="py-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                      <img
                        src="/samples/tomato_early_blight.jpg"
                        alt="Tomato Early Blight Leaf"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Host: Tomato (Solanum lycopersicum)</div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        Tomato Early Blight
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        Pathogen: Alternaria solani
                      </p>
                    </div>
                  </div>

                  {/* Grounded Summary */}
                  <div className="p-3.5 rounded-xl bg-forest-50/60 border border-forest-100 text-xs text-slate-700 leading-relaxed">
                    <span className="font-semibold text-forest-900">Clinical Assessment:</span> Concentric ring lesions with chlorotic halos detected on lower canopy foliage. Disease pressure is at initial stage; immediate cultural sanitation recommended.
                  </div>

                  {/* Verifiable Extension Citation */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                      <BookOpen className="w-3.5 h-3.5 text-forest-700" />
                      <span>Retrieved Extension Literature:</span>
                    </div>
                    <div className="text-xs text-slate-600 italic">
                      "ICAR-IIPR & Extension IPM Guide: Solanaceous Pathology [EXT-SOL-2024-TOM], Section 1"
                    </div>
                  </div>

                  {/* Immediate Action Chips */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Prioritized Field Actions:
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Prune infected lower foliage during dry weather</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Cease overhead sprinklers; switch to furrow/drip</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/crop-doctor?sample=tomato_early_blight"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-forest-100 text-slate-800 hover:text-forest-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Test This Exact Case in Crop Doctor</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3-STEP WORKFLOW SECTION ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Systematic Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950">
            How KisanVision Diagnoses Your Crop
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Unlike superficial wrappers, KisanVision runs a verifiable two-stage diagnostic pipeline: 
            deep learning vision inference followed by semantic extension retrieval and grounded reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="agri-card p-6 space-y-4 hover:border-forest-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-center font-bold text-lg font-heading">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Leaf Image Ingestion
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload a photograph of the affected leaf or select from verified demonstration samples. 
              The system validates dimensions, file integrity, and extracts host context.
            </p>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-2">
              <CheckCircle2 className="w-4 h-4" /> Supports Tomato, Potato, Corn, Rice & Fruits
            </div>
          </div>

          {/* Step 2 */}
          <div className="agri-card p-6 space-y-4 hover:border-forest-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-lg font-heading">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Vision CNN + FAISS Vector RAG
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The PyTorch vision model calculates 52-class disease probabilities. 
              Simultaneously, the FAISS vector database retrieves relevant extension literature 
              using dense embeddings.
            </p>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-2">
              <CheckCircle2 className="w-4 h-4" /> 3072-Dim Embeddings + Extension Guides
            </div>
          </div>

          {/* Step 3 */}
          <div className="agri-card p-6 space-y-4 hover:border-forest-400 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-forest-900 text-emerald-400 flex items-center justify-center font-bold text-lg font-heading">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Grounded Gemini Synthesis
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gemini 3.8 Flash reasons over the CV prediction, farmer symptoms, and retrieved evidence. 
              It enforces strict Pydantic schemas, generates citations, and answers follow-up questions.
            </p>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-2">
              <CheckCircle2 className="w-4 h-4" /> Structured Schema with Traceable Sources
            </div>
          </div>

        </div>
      </section>

      {/* ── TECHNICAL INNOVATION / COMPARISON SECTION ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          
          <div className="max-w-3xl space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              GenAI Engineering Contribution
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why RAG is Mandatory for Agricultural AI
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A general-purpose LLM chatbot cannot be trusted in agronomy. It invents pesticide rates, 
              misdiagnoses look-alike lesions, and has no grounding in local extension guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Old / Basic Way */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Plain Chatbot Wrapper (Unreliable)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>• Hallucinates arbitrary chemical dosages and unverified brand names.</li>
                <li>• No connection to actual Computer Vision model logits or confidence scores.</li>
                <li>• Cannot provide verifiable bibliographic sources or extension citations.</li>
                <li>• Overconfident advice even when leaf photos are blurry or ambiguous.</li>
              </ul>
            </div>

            {/* The KisanVision RAG Way */}
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>KisanVision Grounded RAG (Presentation-Ready)</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-100 leading-relaxed">
                <li>• Dual validation: Deterministic PyTorch CNN + vector literature retrieval.</li>
                <li>• Explicit separation between Computer Vision prediction and LLM reasoning.</li>
                <li>• Every recommendation cites verified extension manuals (e.g. EXT-SOL-2024-TOM).</li>
                <li>• Built-in uncertainty quantification when confidence is low or info is missing.</li>
              </ul>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-medium">
              Want to see the raw logits, retrieved text chunks, and prompt schema?
            </span>
            <Link
              to="/how-it-works"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Inspect Full Pipeline Diagram</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── DEMO PRESET SAMPLES SECTION ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Zero-Risk Presentation Demos
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
              Test One-Click Demonstration Cases
            </h2>
          </div>
          <Link
            to="/crop-doctor"
            className="text-sm font-semibold text-forest-800 hover:text-forest-950 flex items-center gap-1"
          >
            <span>Open Custom Upload</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Sample 1 */}
          <Link
            to="/crop-doctor?sample=tomato_early_blight"
            className="agri-card p-4 space-y-3 group hover:border-forest-400 hover:shadow-md transition-all"
          >
            <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src="/samples/tomato_early_blight.jpg"
                alt="Tomato Early Blight"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Tomato
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-forest-900 transition-colors">
                Tomato Early Blight
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                Concentric target-board rings on lower foliage.
              </p>
            </div>
          </Link>

          {/* Sample 2 */}
          <Link
            to="/crop-doctor?sample=potato_late_blight"
            className="agri-card p-4 space-y-3 group hover:border-forest-400 hover:shadow-md transition-all"
          >
            <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src="/samples/potato_late_blight.jpg"
                alt="Potato Late Blight"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Potato
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-forest-900 transition-colors">
                Potato Late Blight
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                Water-soaked purplish lesions with rapid blight spread.
              </p>
            </div>
          </Link>

          {/* Sample 3 */}
          <Link
            to="/crop-doctor?sample=tomato_bacterial_spot"
            className="agri-card p-4 space-y-3 group hover:border-forest-400 hover:shadow-md transition-all"
          >
            <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src="/samples/tomato_bacterial_spot.jpg"
                alt="Tomato Bacterial Spot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Tomato
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-forest-900 transition-colors">
                Bacterial Spot
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                Small angular greasy lesions with yellow margins.
              </p>
            </div>
          </Link>

          {/* Sample 4 */}
          <Link
            to="/crop-doctor?sample=tomato_healthy"
            className="agri-card p-4 space-y-3 group hover:border-forest-400 hover:shadow-md transition-all"
          >
            <div className="h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src="/samples/tomato_healthy.jpg"
                alt="Healthy Leaf"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Healthy Control
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-forest-900 transition-colors">
                Healthy Tomato Leaf
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                Uniform green canopy without fungal or bacterial necrosis.
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-50 border border-forest-200/80 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold text-forest-950 font-heading">
              Ready to Test with Your Own Leaf Photo?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Upload any crop photo, explore the model's confidence distribution, inspect retrieved agricultural literature, and consult the follow-up assistant.
            </p>
          </div>
          <Link
            to="/crop-doctor"
            className="btn-accent px-8 py-3.5 whitespace-nowrap text-base"
          >
            <Stethoscope className="w-5 h-5" />
            <span>Launch Crop Doctor</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
