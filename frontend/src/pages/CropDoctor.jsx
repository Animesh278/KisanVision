import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Stethoscope, Upload, CheckCircle2, 
  AlertTriangle, ShieldCheck, BookOpen, Layers, 
  Send, RefreshCw, ChevronDown, ChevronUp, HelpCircle, 
  BarChart3, Activity, X
} from 'lucide-react';

const API_BASE = 'http://localhost:8000';

const DEFAULT_SAMPLES = [
  {
    id: "tomato_early_blight",
    title: "Tomato Early Blight",
    crop: "Tomato",
    condition: "Early blight",
    filename: "tomato_early_blight.jpg",
    growth_stage: "Fruit Set / Grain Filling",
    symptoms: "Concentric target-board rings on lower foliage with chlorotic yellow halo",
    location: "Nashik, Maharashtra",
    url: "/samples/tomato_early_blight.jpg"
  },
  {
    id: "potato_late_blight",
    title: "Potato Late Blight",
    crop: "Potato",
    condition: "Late blight",
    filename: "potato_late_blight.jpg",
    growth_stage: "Vegetative / Tillering",
    symptoms: "Water-soaked purplish lesions, rapid foliar collapse",
    location: "Shimla, Himachal Pradesh",
    url: "/samples/potato_late_blight.jpg"
  },
  {
    id: "tomato_bacterial_spot",
    title: "Tomato Bacterial Spot",
    crop: "Tomato",
    condition: "Bacterial spot",
    filename: "tomato_bacterial_spot.jpg",
    growth_stage: "Flowering / Booting",
    symptoms: "Small angular greasy lesions with yellow margins on leaves",
    location: "Kolar, Karnataka",
    url: "/samples/tomato_bacterial_spot.jpg"
  },
  {
    id: "tomato_healthy",
    title: "Healthy Tomato Foliage",
    crop: "Tomato",
    condition: "Healthy",
    filename: "tomato_healthy.jpg",
    growth_stage: "Vegetative / Tillering",
    symptoms: "Uniform vibrant green foliage, no necrotic spots or lesions",
    location: "Pune, Maharashtra",
    url: "/samples/tomato_healthy.jpg"
  }
];

const CropDoctor = () => {
  const [searchParams] = useSearchParams();

  // Samples State with immediate default plates
  const [samples, setSamples] = useState(DEFAULT_SAMPLES);
  const [selectedSample, setSelectedSample] = useState(null);

  // Form State
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [crop, setCrop] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [location, setLocation] = useState('');

  // Processing State
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [error, setError] = useState('');

  // Results State
  const [result, setResult] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeDebugTab, setActiveDebugTab] = useState('cv');
  const [showHowItWasGenerated, setShowHowItWasGenerated] = useState(false);

  // Follow-Up Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const fileInputRef = useRef(null);
  const chatBottomRef = useRef(null);

  // 1. Handle demonstration samples on mount
  useEffect(() => {
    const sampleParam = searchParams.get('sample');
    if (sampleParam) {
      const immediateMatch = DEFAULT_SAMPLES.find(s => s.id === sampleParam);
      if (immediateMatch) {
        handleSelectSample(immediateMatch);
      }
    }

    const fetchSamples = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/crop-doctor/samples`);
        if (res.data?.samples && res.data.samples.length > 0) {
          setSamples(res.data.samples);
          if (sampleParam) {
            const match = res.data.samples.find(s => s.id === sampleParam);
            if (match) {
              handleSelectSample(match);
            }
          }
        }
      } catch (err) {
        console.warn('Using local preset demonstration plates:', err);
      }
    };
    fetchSamples();
  }, [searchParams]);

  // Handle sample selection
  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setFile(null);
    setPreviewUrl(sample.url || `/samples/${sample.filename}`);
    setCrop(sample.crop || '');
    setGrowthStage(sample.growth_stage || '');
    setSymptoms(sample.symptoms || '');
    setLocation(sample.location || '');
    setError('');
  };

  // Handle custom file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please select a valid image file (JPEG, PNG, or WEBP).');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('Image file size must be under 10MB.');
      return;
    }

    setError('');
    setSelectedSample(null);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleClearImage = () => {
    setFile(null);
    setSelectedSample(null);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Run full diagnosis
  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!file && !selectedSample) {
      setError('Please upload a leaf photograph or select one of the demo samples.');
      return;
    }

    setLoading(true);
    setLoadingStep(1);
    setError('');
    setResult(null);
    setChatMessages([]);

    // Step animation simulator for presentation clarity
    const stepTimer1 = setTimeout(() => setLoadingStep(2), 700);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 1600);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else if (selectedSample) {
        formData.append('sample_id', selectedSample.id);
      }

      if (crop) formData.append('crop', crop);
      if (growthStage) formData.append('growth_stage', growthStage);
      if (symptoms) formData.append('symptoms', symptoms);
      if (location) formData.append('location', location);

      const response = await axios.post(`${API_BASE}/api/crop-doctor/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.status === 'success') {
        setResult(response.data);
        const initialQuestions = response.data.assessment?.suggested_follow_up_questions || [];
        if (initialQuestions.length > 0) {
          setChatMessages([
            {
              sender: 'system',
              text: 'Clinical case registered. Longitudinal consultation active. You may inquire about intervention timing, biological controls, or weather conditions below.',
            }
          ]);
        }
      } else {
        setError(response.data?.message || 'Diagnostic service error. Please try again.');
      }
    } catch (err) {
      console.error('Diagnostic error:', err);
      setError(
        err.response?.data?.detail?.message || 
        err.response?.data?.message || 
        'Could not complete analysis. Ensure the backend server is running.'
      );
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoading(false);
    }
  };

  // Handle follow-up query
  const handleSendFollowUp = async (questionText) => {
    const query = questionText || chatInput;
    if (!query.trim() || !result || chatLoading) return;

    const userMessage = { sender: 'user', text: query };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const payload = {
        case_context: result.case_context || {},
        retrieved_evidence: result.retrieved_evidence || [],
        assessment: result.assessment || {},
        question: query,
        history: chatMessages.filter(m => m.sender !== 'system').map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text
        }))
      };

      const res = await axios.post(`${API_BASE}/api/crop-doctor/follow-up`, payload);
      
      const assistantMessage = {
        sender: 'assistant',
        text: res.data.answer || 'Consult your regional agricultural extension agent for site-specific treatment guidance.',
        recommendations: res.data.practical_recommendations || [],
        safety: res.data.safety_disclaimer || '',
        furtherQuestions: res.data.further_questions || []
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Follow-up error:', err);
      setChatMessages(prev => [
        ...prev, 
        { 
            sender: 'assistant', 
            text: 'Connection to agronomic reasoning engine interrupted. General guidance: Keep canopy foliage well-aerated and avoid overhead sprinkler irrigation.' 
        }
      ]);
    } finally {
      setChatLoading(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* ── 1. LABORATORY HEADER ───────────────────────────────── */}
      <div className="border-b border-[#E7E0D2] pb-6 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-widest uppercase text-[#556B5B]">
              <span>MULTIMODAL DIAGNOSTIC WORKBENCH</span>
              <span>&bull;</span>
              <span>SERIES FOL-52</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-normal text-botanical-950 tracking-tight">
              Crop Doctor
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5D50] mt-1 max-w-2xl font-sans leading-relaxed">
              Precision foliar disease classification, dense vector extension literature retrieval, and grounded clinical decision support.
            </p>
          </div>

          {/* Active Status Badge */}
          <div className="flex items-center gap-2.5 self-start md:self-auto bg-[#F4EFE6] border border-[#E0D7C5] px-3 py-1.5 rounded font-mono text-[11px] text-botanical-950">
            <span className="w-2 h-2 rounded-full bg-botanical-leaf"></span>
            <span>RAG INDEX: ACTIVE (28 EXTENSION SECTIONS)</span>
          </div>
        </div>

        {/* ── VERIFIED DEMONSTRATION SPECIMENS ─────────────────── */}
        <div className="mt-6 pt-5 border-t border-[#E7E0D2]">
          <div className="text-[11px] font-mono tracking-wider uppercase text-[#6B7D70] mb-3 flex items-center justify-between">
            <span>Verified Demonstration Plates (1-Click Examiner Presets)</span>
            <span className="text-[10px] text-[#8A9C8F]">SELECT TO AUTO-POPULATE</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {samples.map((s, index) => {
              const isSelected = selectedSample?.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSample(s)}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-[#F2ECE0] border-botanical-800 ring-1 ring-botanical-800 shadow-xs'
                      : 'bg-white border-[#E7E0D2] hover:border-botanical-400 hover:bg-[#FAF7F0]'
                  }`}
                >
                  <img
                    src={s.url || `/samples/${s.filename}`}
                    alt={s.title}
                    className="w-12 h-12 rounded object-cover bg-[#F4EFE6] flex-shrink-0 border border-[#E0D7C5]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[9px] text-[#7A8C7F] uppercase tracking-wider">
                      PLATE 0{index + 1}
                    </div>
                    <div className="font-editorial text-sm font-medium text-botanical-950 truncate leading-snug">
                      {s.title}
                    </div>
                    <div className="font-mono text-[10px] text-[#647769] truncate">
                      {s.crop}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2. INGESTION BENCH: Upload + Context ───────────────── */}
      <form onSubmit={handleAnalyze} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: Specimen Image Mount */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-5 rounded-xl bg-white border border-[#E7E0D2] space-y-4 shadow-xs">
            
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-botanical-900 uppercase tracking-wide">
                1. Specimen Ingestion Plate
              </span>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="font-mono text-[11px] text-[#A63F15] hover:text-[#7A2805] flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Clear Mount
                </button>
              )}
            </div>

            {previewUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-[#D9CFC0] bg-[#112419] aspect-[4/3] flex items-center justify-center group">
                <img
                  src={previewUrl}
                  alt="Mounted Leaf Specimen"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#09170F]/80 backdrop-blur-xs text-[#E1EBE4] px-2 py-0.5 rounded font-mono text-[10px] border border-[#234B33]">
                  {selectedSample ? `SPECIMEN: ${selectedSample.title}` : 'CUSTOM SPECIMEN UPLOAD'}
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-[#CFC5B4] hover:border-botanical-600 hover:bg-[#F9F7F2] rounded-lg p-8 text-center cursor-pointer transition-all aspect-[4/3] flex flex-col items-center justify-center space-y-2.5 group"
              >
                <div className="w-10 h-10 rounded-md bg-[#F4EFE6] group-hover:bg-[#E8EFEA] text-[#556B5B] group-hover:text-botanical-800 flex items-center justify-center border border-[#E0D7C5] transition-colors">
                  <Upload className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <p className="font-editorial text-lg text-botanical-950 font-medium">
                    Mount foliar photograph here
                  </p>
                  <p className="font-mono text-[11px] text-[#788A7C] mt-0.5">
                    JPEG, PNG, or WEBP up to 10MB
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {error && (
              <div className="p-3 rounded-lg bg-[#FEF4EE] border border-[#F6D0BA] text-xs text-[#8A360F] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C9531E] flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Agronomic Context & Action */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-xl bg-white border border-[#E7E0D2] space-y-5 shadow-xs">
            <div>
              <span className="font-mono text-xs font-semibold text-botanical-900 uppercase tracking-wide">
                2. Field Context Parameters (Optional)
              </span>
              <p className="text-xs text-[#5A6D60] mt-1 font-sans">
                Supplying growth and regional context enables the RAG retriever to cite exact phenological protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-[#556B5B] mb-1">
                  Host Crop Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tomato, Potato, Corn"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2D9C8] focus:border-botanical-700 outline-none bg-white text-botanical-950 font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-[#556B5B] mb-1">
                  Phenological Growth Stage
                </label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2D9C8] focus:border-botanical-700 outline-none bg-white text-botanical-950 font-sans"
                >
                  <option value="">Select Growth Stage...</option>
                  <option value="Seedling / Nursery">Seedling / Nursery</option>
                  <option value="Vegetative / Tillering">Vegetative / Tillering</option>
                  <option value="Flowering / Booting">Flowering / Booting</option>
                  <option value="Fruit Set / Grain Filling">Fruit Set / Grain Filling</option>
                  <option value="Maturity / Pre-Harvest">Maturity / Pre-Harvest</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-[#556B5B] mb-1">
                  Geographic Region
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nashik, Shimla, Kolar"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2D9C8] focus:border-botanical-700 outline-none bg-white text-botanical-950 font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-wider uppercase text-[#556B5B] mb-1">
                  Observed Foliar Lesions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Concentric rings, yellowing"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E2D9C8] focus:border-botanical-700 outline-none bg-white text-botanical-950 font-sans"
                />
              </div>
            </div>

            {/* Run Diagnostic Button */}
            <div className="pt-4 border-t border-[#F0EAE0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[#788A7C]">
                {previewUrl ? 'SPECIMEN MOUNTED // READY' : 'MOUNT SPECIMEN OR SELECT PLATE'}
              </span>

              <button
                type="submit"
                disabled={loading || (!file && !selectedSample)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-botanical-950 text-paper-50 font-medium text-xs font-mono tracking-wide border border-botanical-800 hover:bg-botanical-900 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <Stethoscope className="w-4 h-4 text-botanical-300" />
                <span>{loading ? 'EXECUTING PIPELINE...' : 'EXECUTE CLINICAL ASSESSMENT'}</span>
              </button>
            </div>

          </div>

          {/* ── 3-STAGE PROGRESS VISUALIZER ────────────────────── */}
          {loading && (
            <div className="p-5 rounded-xl bg-[#0A1B12] text-[#F3EFE6] border border-[#1A3827] space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#7EE7A6]">
                <span>DIAGNOSTIC PIPELINE IN EXECUTION</span>
                <span>STAGE {loadingStep} / 3</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className={`flex items-center gap-2 ${loadingStep >= 1 ? 'text-white' : 'text-[#647C6F]'}`}>
                  {loadingStep > 1 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#68D391] flex-shrink-0" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5 text-[#7EE7A6] animate-spin flex-shrink-0" />
                  )}
                  <span>Stage 1: Computing 52-class softmax foliar logits via PyTorch CNN</span>
                </div>
                <div className={`flex items-center gap-2 ${loadingStep >= 2 ? 'text-white' : 'text-[#647C6F]'}`}>
                  {loadingStep > 2 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#68D391] flex-shrink-0" />
                  ) : loadingStep === 2 ? (
                    <RefreshCw className="w-3.5 h-3.5 text-[#7EE7A6] animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-[#274D38] flex-shrink-0" />
                  )}
                  <span>Stage 2: FAISS vector retrieval across agricultural extension literature</span>
                </div>
                <div className={`flex items-center gap-2 ${loadingStep >= 3 ? 'text-white' : 'text-[#647C6F]'}`}>
                  {loadingStep === 3 ? (
                    <RefreshCw className="w-3.5 h-3.5 text-[#7EE7A6] animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-[#274D38] flex-shrink-0" />
                  )}
                  <span>Stage 3: Grounded clinical synthesis &amp; schema validation with Gemini 3.8</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </form>

      {/* ── 3. CLINICAL DIAGNOSTIC DOSSIER ─────────────────────── */}
      {result && (
        <div className="space-y-8 animate-fadeIn pt-4 text-left">
          
          <div className="rounded-xl overflow-hidden border border-[#DFD6C4] bg-white shadow-sm">
            
            {/* Report Header: Botanical Dark */}
            <div className="bg-[#0A1B12] text-white p-6 sm:p-8 border-b border-[#1A3827]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#8BA594] mb-1.5">
                    <span>HOST: {result.plant}</span>
                    <span>&bull;</span>
                    <span>CONDITION: {result.condition}</span>
                    <span>&bull;</span>
                    <span>ACCESSION: SL-2024</span>
                  </div>
                  <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#FAF7F0] tracking-tight">
                    {result.prediction.replace(/___/g, ' ').replace(/__/g, ' ').replace(/_/g, ' ')}
                  </h2>
                  <p className="font-mono text-xs text-[#95ADA0] mt-1">
                    Vision Classifier Backbone: PyTorch 52-Class CNN Architecture
                  </p>
                </div>

                {/* Confidence Metrics & Grad-CAM Button */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-[#122E20] border border-[#235639] rounded-lg px-4 py-2.5 text-right font-mono">
                    <div className="text-[10px] uppercase tracking-wider text-[#93AE9E]">
                      VERIFIED CONFIDENCE
                    </div>
                    <div className="text-2xl sm:text-3xl font-medium text-[#7EE7A6] font-editorial">
                      {result.confidence}%
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-[#B5D1C0]">
                      LEVEL: {result.confidence_level}
                    </div>
                  </div>

                  {(result.heatmap_url || result.heatmap_b64) && (
                    <button
                      type="button"
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className="px-4 py-3 rounded-lg bg-[#1B432D] hover:bg-[#23583C] text-[#E4EDE7] font-mono text-xs border border-[#2E6B4A] flex items-center gap-2 transition-all"
                    >
                      <Layers className="w-4 h-4 text-[#7EE7A6]" />
                      <span>{showHeatmap ? 'ORIGINAL SPECIMEN' : 'GRAD-CAM ATTENTION HEATMAP'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Heatmap Comparison Visualizer */}
              {showHeatmap && (
                <div className="mt-6 pt-6 border-t border-[#1C3E2B] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-[#A6BFB0]">ORIGINAL SPECIMEN INTAKE</span>
                    <div className="h-52 rounded-lg overflow-hidden bg-black/60 border border-[#1E4330]">
                      <img src={previewUrl} alt="Original Leaf" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-[#7EE7A6] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> GRAD-CAM ACTIVATION MAP (CONV FEATURE SALIENCY)
                    </span>
                    <div className="h-52 rounded-lg overflow-hidden bg-black/60 border border-[#276142]">
                      <img 
                        src={result.heatmap_url || `data:image/jpeg;base64,${result.heatmap_b64}`} 
                        alt="Grad-CAM Heatmap" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Assessment Body */}
            <div className="p-6 sm:p-8 space-y-7">
              
              {/* Farmer Summary Banner */}
              <div className="p-4 rounded-lg bg-[#F7F3EA] border border-[#E2D9C8] space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#556B5B] flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-botanical-700" />
                  <span>Clinical Assessment Summary:</span>
                </div>
                <p className="font-editorial text-lg text-botanical-950 font-normal leading-relaxed">
                  {result.assessment?.summary}
                </p>
              </div>

              {/* Detailed Pathological Grounding */}
              <div className="space-y-2">
                <div className="font-mono text-[10px] tracking-wider uppercase text-[#6B7D70]">
                  Pathological Grounding &amp; Foliar Analysis
                </div>
                <p className="text-xs sm:text-sm text-[#3E5244] leading-relaxed font-sans">
                  {result.assessment?.evidence_based_explanation}
                </p>
              </div>

              {/* Prioritized Clinical Protocol */}
              <div className="space-y-3">
                <div className="font-mono text-[10px] tracking-wider uppercase text-[#6B7D70]">
                  Prioritized Field Intervention Protocol
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.assessment?.immediate_action_steps?.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-[#E7E0D2] bg-white space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-botanical-100 text-botanical-800 border border-botanical-200">
                          {step.category}
                        </span>
                        <span className="font-mono text-[10px] text-[#788A7C]">STEP 0{idx + 1}</span>
                      </div>
                      <h5 className="font-editorial text-base text-botanical-950 font-medium">
                        {step.action}
                      </h5>
                      <p className="text-xs text-[#4A5D50] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long-term prevention & Diagnostic Uncertainty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Preventative Agronomy */}
                <div className="p-4 rounded-lg bg-[#FAF7F0] border border-[#E7E0D2] space-y-2">
                  <div className="font-mono text-[10px] tracking-wider uppercase text-botanical-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-botanical-700" />
                    <span>Long-Term Preventative Agronomy</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#4A5D50]">
                    {result.assessment?.preventative_measures?.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-botanical-700 font-bold">&bull;</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Uncertainty & Safety Note */}
                <div className="p-4 rounded-lg bg-[#FEF6EE] border border-[#F5D8C3] space-y-2">
                  <div className="font-mono text-[10px] tracking-wider uppercase text-[#8F3E10] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#C9531E]" />
                    <span>Diagnostic Uncertainty &amp; Safety Note</span>
                  </div>
                  <p className="text-xs text-[#70300C] leading-relaxed">
                    {result.assessment?.uncertainty_note}
                  </p>
                  {result.assessment?.missing_information_requests?.length > 0 && (
                    <div className="pt-1 text-[11px] text-[#8F3E10] font-mono">
                      <span>ADDITIONAL FIELD DATA DESIRED: </span>
                      {result.assessment.missing_information_requests.join(', ')}
                    </div>
                  )}
                </div>

              </div>

              {/* Retrieved Extension Literature (Grounding Evidence) */}
              <div className="p-4 rounded-lg bg-[#F4EFE6] border border-[#DFD6C4] space-y-2">
                <div className="font-mono text-[10px] tracking-wider uppercase text-botanical-950 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-botanical-700" />
                  <span>Traceable Extension Literature Sources:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {result.assessment?.source_references?.map((src, i) => (
                    <div key={i} className="p-2.5 rounded bg-white border border-[#E0D7C5] text-xs">
                      <div className="font-editorial text-sm font-medium text-botanical-950">{src.title}</div>
                      <div className="text-[11px] text-[#556B5B]">{src.authority} &bull; {src.section}</div>
                      <div className="font-mono text-[10px] text-botanical-700 mt-0.5">{src.source_id}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── EXAMINER PROOF PANEL (CV LOGITS + FAISS CHUNKS) ──── */}
            <div className="border-t border-[#E7E0D2] bg-[#FAF7F0]">
              <button
                type="button"
                onClick={() => setShowHowItWasGenerated(!showHowItWasGenerated)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F2ECE0] transition-colors"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-botanical-950 font-medium">
                  <BarChart3 className="w-4 h-4 text-botanical-700" />
                  <span>EXAMINER PRESENTATION PANEL: HOW THIS OUTPUT WAS GENERATED</span>
                </div>
                {showHowItWasGenerated ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showHowItWasGenerated && (
                <div className="p-6 border-t border-[#E7E0D2] bg-white space-y-5 animate-fadeIn">
                  
                  {/* Tabs */}
                  <div className="flex border-b border-[#E7E0D2] gap-4 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveDebugTab('cv')}
                      className={`pb-2 border-b-2 transition-colors ${
                        activeDebugTab === 'cv'
                          ? 'border-botanical-900 text-botanical-950 font-semibold'
                          : 'border-transparent text-[#788A7C] hover:text-botanical-950'
                      }`}
                    >
                      1. Vision CNN Logits (Top-5 Distribution)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDebugTab('rag')}
                      className={`pb-2 border-b-2 transition-colors ${
                        activeDebugTab === 'rag'
                          ? 'border-botanical-900 text-botanical-950 font-semibold'
                          : 'border-transparent text-[#788A7C] hover:text-botanical-950'
                      }`}
                    >
                      2. Retrieved Passages (FAISS 3072-d Index)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDebugTab('schema')}
                      className={`pb-2 border-b-2 transition-colors ${
                        activeDebugTab === 'schema'
                          ? 'border-botanical-900 text-botanical-950 font-semibold'
                          : 'border-transparent text-[#788A7C] hover:text-botanical-950'
                      }`}
                    >
                      3. Enforced Pydantic Schema
                    </button>
                  </div>

                  {/* Tab 1: CV Logits */}
                  {activeDebugTab === 'cv' && (
                    <div className="space-y-3">
                      <p className="text-xs text-[#556B5B] font-mono">
                        Softmax probabilities calculated by PyTorch vision backbone across 52 foliar classes:
                      </p>
                      <div className="space-y-2">
                        {result.top_predictions?.map((pred, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between font-mono text-xs">
                              <span className="text-botanical-950">
                                {pred.disease.replace(/___/g, ' ').replace(/_/g, ' ')}
                              </span>
                              <span className="font-semibold text-botanical-800">{pred.confidence}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-[#EAE4D7] overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  i === 0 ? 'bg-botanical-600' : 'bg-[#B0A795]'
                                }`}
                                style={{ width: `${Math.min(pred.confidence, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: FAISS Chunks */}
                  {activeDebugTab === 'rag' && (
                    <div className="space-y-3">
                      <p className="text-xs text-[#556B5B] font-mono">
                        Dense 3072-dimensional vector retrieval results from `smart_system/rag/index/rag_dense.faiss`:
                      </p>
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {result.retrieved_evidence?.map((chunk, i) => (
                          <div key={i} className="p-3.5 rounded-lg border border-[#E2D9C8] bg-[#FAF7F0] space-y-1">
                            <div className="flex items-center justify-between font-mono text-[11px]">
                              <span className="font-semibold text-botanical-900">
                                [{chunk.doc_id}] {chunk.section}
                              </span>
                              <span className="text-[10px] text-botanical-700 bg-botanical-100 px-1.5 py-0.5 rounded">
                                Score: {chunk.similarity_score}
                              </span>
                            </div>
                            <p className="text-[#3E5244] font-mono text-[11px] leading-relaxed whitespace-pre-line pt-1">
                              {chunk.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Pydantic Schema */}
                  {activeDebugTab === 'schema' && (
                    <div className="space-y-2">
                      <p className="text-xs text-[#556B5B] font-mono">
                        Model `GroundedClinicalAssessment` enforced on `gemini-3.8-flash`:
                      </p>
                      <pre className="p-3.5 rounded-lg bg-[#0A1B12] text-[#7EE7A6] text-xs font-mono overflow-x-auto max-h-60">
                        {JSON.stringify(result.assessment, null, 2)}
                      </pre>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

          {/* ── 4. LONGITUDINAL CASE CONSULTATION (FOLLOW-UP) ────── */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E7E0D2] space-y-6 shadow-xs">
            
            <div className="border-b border-[#F0EAE0] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-botanical-950 text-[#D8E6DC] flex items-center justify-center border border-botanical-800">
                  <Stethoscope className="w-4 h-4 stroke-[1.8] text-botanical-300" />
                </div>
                <div>
                  <h3 className="font-editorial text-2xl text-botanical-950 font-normal">
                    Follow-Up Agronomic Consultation
                  </h3>
                  <p className="font-mono text-xs text-[#647769]">
                    Context-preserved inquiry for diagnosis: {result.prediction.replace(/___/g, ' ').replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Suggested Question Chips */}
            {result.assessment?.suggested_follow_up_questions?.length > 0 && (
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#6B7D70]">
                  Suggested Phenological Questions:
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.assessment.suggested_follow_up_questions.map((q, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendFollowUp(q)}
                      disabled={chatLoading}
                      className="text-xs px-3 py-1.5 rounded-md bg-[#FAF7F0] hover:bg-[#F2ECE0] text-[#334639] border border-[#E2D9C8] transition-colors text-left font-sans"
                    >
                      &bull; {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Thread */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-2xl rounded-lg p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-botanical-950 text-paper-50'
                        : msg.sender === 'system'
                        ? 'bg-[#FAF7F0] text-[#556B5B] border border-[#E7E0D2] w-full text-center text-xs font-mono'
                        : 'bg-white border border-[#E2D9C8] text-[#223528] shadow-2xs space-y-2.5'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.recommendations?.length > 0 && (
                      <div className="pt-2 border-t border-[#F0EAE0] space-y-1">
                        <span className="font-semibold text-botanical-950 text-xs">Prescribed Interventions:</span>
                        <ul className="space-y-1 text-xs text-[#3E5244]">
                          {msg.recommendations.map((rec, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-700 flex-shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {msg.safety && (
                      <div className="text-[11px] text-[#70300C] bg-[#FEF6EE] p-2 rounded border border-[#F5D8C3]">
                        {msg.safety}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#FAF7F0] text-[#556B5B] font-mono text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 border border-[#E7E0D2]">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-botanical-700" />
                    <span>Consulting agricultural extension literature...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendFollowUp();
              }}
              className="flex items-center gap-2 pt-2"
            >
              <input
                type="text"
                placeholder="Ask regarding chemical intervals, irrigation adjustments, or organic alternatives..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading}
                className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#E2D9C8] focus:border-botanical-700 outline-none bg-white text-botanical-950 font-sans"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="px-4 py-2.5 rounded-md bg-botanical-950 text-paper-50 font-mono text-xs font-medium border border-botanical-800 hover:bg-botanical-900 disabled:opacity-50 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SEND</span>
              </button>
            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default CropDoctor;
