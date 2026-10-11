import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Stethoscope, Upload, Sparkles, CheckCircle2, 
  AlertTriangle, ShieldCheck, BookOpen, Layers, 
  Send, RefreshCw, ChevronDown, ChevronUp, HelpCircle, 
  BarChart3, Activity, X
} from 'lucide-react';

const API_BASE = 'http://localhost:8000';

const CropDoctor = () => {
  const [searchParams] = useSearchParams();

  // Samples State
  const [samples, setSamples] = useState([]);
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

  // 1. Fetch available demonstration samples
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/crop-doctor/samples`);
        if (res.data?.samples) {
          setSamples(res.data.samples);
          
          // Check if URL query param specifies sample
          const sampleParam = searchParams.get('sample');
          if (sampleParam) {
            const match = res.data.samples.find(s => s.id === sampleParam);
            if (match) {
              handleSelectSample(match);
            }
          }
        }
      } catch (err) {
        console.warn('Could not load remote sample catalog, using local presets:', err);
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

    // Step animation simulator for clear presentation visuals
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
        // Setup initial chat suggestions
        const initialQuestions = response.data.assessment?.suggested_follow_up_questions || [];
        if (initialQuestions.length > 0) {
          setChatMessages([
            {
              sender: 'system',
              text: 'Case registered. You can ask follow-up questions below regarding this diagnosis, chemical timing, or prevention.',
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
        text: res.data.answer || 'Consult your local extension agent for specific dosage guidelines.',
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
          text: 'Unable to reach the AI assistant. For foliar diseases, ensure foliage is kept dry and avoid overhead watering.' 
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
      
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 pb-6 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-forest-700" />
              <span>Multimodal Agronomic Diagnostic System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
              AI Crop Doctor
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Upload a leaf photograph to run deep learning disease detection, retrieve authoritative agricultural extension literature, and receive grounded treatment plans.
            </p>
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>RAG Vector DB: Active (28 Extension Chunks)</span>
          </div>
        </div>

        {/* ── DEMO PRESETS BAR ──────────────────────────────────── */}
        <div className="mt-6 pt-5 border-t border-slate-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-forest-700" />
            <span>Try a Demonstration Sample (Zero-Risk Presentation Mode):</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {samples.map((s) => {
              const isSelected = selectedSample?.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSample(s)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-forest-50 border-forest-600 ring-2 ring-forest-600/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-forest-300 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={s.url || `/samples/${s.filename}`}
                    alt={s.title}
                    className="w-11 h-11 rounded-lg object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {s.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {s.crop} • {s.growth_stage}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── INPUT SECTION: Upload + Context Fields ────────────── */}
      <form onSubmit={handleAnalyze} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Upload & Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="agri-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="form-label mb-0">
                1. Leaf Photograph <span className="text-rose-500">*</span>
              </label>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>

            {previewUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video sm:aspect-square flex items-center justify-center group">
                <img
                  src={previewUrl}
                  alt="Leaf Preview"
                  className="w-full h-full object-contain"
                />
                {selectedSample && (
                  <div className="absolute top-3 left-3 bg-forest-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    Sample: {selectedSample.title}
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-forest-600 hover:bg-forest-50/40 rounded-xl p-8 text-center cursor-pointer transition-all aspect-video sm:aspect-square flex flex-col items-center justify-center space-y-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-forest-100 text-slate-600 group-hover:text-forest-800 flex items-center justify-center transition-colors">
                  <Upload className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Click to browse or drag leaf photo here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports high-resolution JPEG, PNG, or WEBP (up to 10MB)
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
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Agronomic Context & Action */}
        <div className="lg:col-span-7 space-y-4">
          <div className="agri-card p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                2. Field Context (Optional for Grounded Precision)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Supplying crop growth details enables the RAG retriever to cite exact growth-stage extension protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Host Crop Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tomato, Potato, Corn, Rice"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Growth Stage</label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="form-input"
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
                <label className="form-label">Field Location / Region</label>
                <input
                  type="text"
                  placeholder="e.g. Nashik, Shimla, Kolar"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Observed Foliar Symptoms</label>
                <input
                  type="text"
                  placeholder="e.g. Concentric rings, yellowing, water-soaked"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">
                {previewUrl ? 'Image ready for dual-stage inference' : 'Select an image or sample above to proceed'}
              </span>

              <button
                type="submit"
                disabled={loading || (!file && !selectedSample)}
                className="btn-accent px-8 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{loading ? 'Processing Analysis...' : 'Run Clinical Diagnosis'}</span>
              </button>
            </div>

          </div>

          {/* Diagnostic Step Indicator when Running */}
          {loading && (
            <div className="agri-card p-5 bg-forest-900 text-white space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                <span>RAG DIAGNOSTIC PIPELINE IN PROGRESS</span>
                <span>Stage {loadingStep} of 3</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className={`flex items-center gap-2 ${loadingStep >= 1 ? 'text-white' : 'text-slate-400'}`}>
                  {loadingStep > 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-emerald-300 animate-spin flex-shrink-0" />
                  )}
                  <span>Stage 1: Computing 52-class foliar disease logits with PyTorch CNN</span>
                </div>
                <div className={`flex items-center gap-2 ${loadingStep >= 2 ? 'text-white' : 'text-slate-400'}`}>
                  {loadingStep > 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : loadingStep === 2 ? (
                    <RefreshCw className="w-4 h-4 text-emerald-300 animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                  )}
                  <span>Stage 2: FAISS vector retrieval across agricultural extension literature</span>
                </div>
                <div className={`flex items-center gap-2 ${loadingStep >= 3 ? 'text-white' : 'text-slate-400'}`}>
                  {loadingStep === 3 ? (
                    <RefreshCw className="w-4 h-4 text-emerald-300 animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                  )}
                  <span>Stage 3: Grounded clinical synthesis & structured schema validation with Gemini 3.8 Flash</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </form>

      {/* ── CLINICAL RESULTS SECTION ───────────────────────────── */}
      {result && (
        <div className="space-y-8 animate-fadeIn pt-4">
          
          {/* Main Diagnosis Card */}
          <div className="agri-card-elevated overflow-hidden border-forest-300">
            
            {/* Diagnosis Banner */}
            <div className="bg-forest-900 text-white p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                    <span>Host Plant: {result.plant}</span>
                    <span>•</span>
                    <span>Condition: {result.condition}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {result.prediction.replace(/___/g, ' ').replace(/__/g, ' ').replace(/_/g, ' ')}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 font-mono">
                    Diagnostic Model ID: ResNet-50 / EfficientNet PyTorch Classifier
                  </p>
                </div>

                {/* Verified Confidence & Heatmap Toggle */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-right">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-300">
                      Verified CV Confidence
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-heading">
                      {result.confidence}%
                    </div>
                    <div className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
                      Status: {result.confidence_level}
                    </div>
                  </div>

                  {(result.heatmap_url || result.heatmap_b64) && (
                    <button
                      type="button"
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
                    >
                      <Layers className="w-4 h-4" />
                      <span>{showHeatmap ? 'Show Normal Image' : 'View Grad-CAM Attention Heatmap'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Heatmap Modal / Inline Comparison */}
              {showHeatmap && (
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-300">Original Leaf Ingestion</span>
                    <div className="h-48 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                      <img src={previewUrl} alt="Original Leaf" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> Grad-CAM Lesion Localization (CNN Activation Map)
                    </span>
                    <div className="h-48 rounded-xl overflow-hidden bg-black/40 border border-emerald-400/30">
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

            {/* Plain-Language Clinical Summary */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-900">
                  <Stethoscope className="w-4 h-4 text-forest-700" />
                  <span>Clinical Assessment Summary for Farmer:</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {result.assessment?.summary}
                </p>
              </div>

              {/* Detailed Pathological Grounding */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Evidence-Grounded Diagnostic Pathology
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {result.assessment?.evidence_based_explanation}
                </p>
              </div>

              {/* Immediate Action Steps Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Prioritized Field Action Protocol
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.assessment?.immediate_action_steps?.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-forest-300 space-y-1.5 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {step.category}
                        </span>
                        <span className="text-xs font-bold text-slate-400">Step {idx + 1}</span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900">
                        {step.action}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long-term prevention + Uncertainty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Prevention */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Long-Term Preventative Agronomy</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {result.assessment?.preventative_measures?.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Uncertainty & Limitations */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>Diagnostic Uncertainty & Safety Note</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {result.assessment?.uncertainty_note}
                  </p>
                  {result.assessment?.missing_information_requests?.length > 0 && (
                    <div className="pt-1 text-[11px] text-amber-800">
                      <span className="font-semibold">Info needed for greater certainty: </span>
                      {result.assessment.missing_information_requests.join(', ')}
                    </div>
                  )}
                </div>

              </div>

              {/* Source References (RAG Traceability) */}
              <div className="p-4 rounded-xl bg-forest-50/40 border border-forest-200/70 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-forest-700" />
                  <span>Traceable Extension Literature Sources (Grounding Evidence):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {result.assessment?.source_references?.map((src, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900">{src.title}</div>
                      <div className="text-[11px] text-slate-500">{src.authority} • {src.section}</div>
                      <div className="text-[10px] text-emerald-700 font-mono mt-0.5">{src.source_id}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Expandable "How This Was Generated" Panel (Presentation Key Slide!) */}
            <div className="border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => setShowHowItWasGenerated(!showHowItWasGenerated)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-forest-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Examiner Presentation Panel: How This Output Was Generated (CV + RAG Proof)
                  </span>
                </div>
                {showHowItWasGenerated ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showHowItWasGenerated && (
                <div className="p-6 border-t border-slate-200 bg-white space-y-5 animate-fadeIn">
                  
                  {/* Tabs */}
                  <div className="flex border-b border-slate-200 gap-4 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveDebugTab('cv')}
                      className={`pb-2 border-b-2 transition-colors ${
                        activeDebugTab === 'cv'
                          ? 'border-forest-800 text-forest-900'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      1. Computer Vision Logits (Top-5 Distribution)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDebugTab('rag')}
                      className={`pb-2 border-b-2 transition-colors ${
                        activeDebugTab === 'rag'
                          ? 'border-forest-800 text-forest-900'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      2. Retrieved Knowledge Passages (FAISS Vector Match)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDebugTab('schema')}
                      className={`pb-2 border-b-2 transition-colors ${
                        activeDebugTab === 'schema'
                          ? 'border-forest-800 text-forest-900'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      3. Pydantic Structured Schema
                    </button>
                  </div>

                  {/* Tab 1: CV Logits */}
                  {activeDebugTab === 'cv' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-600">
                        Raw probabilities produced by the PyTorch model across the 52 training classes:
                      </p>
                      <div className="space-y-2">
                        {result.top_predictions?.map((pred, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-800">
                                {pred.disease.replace(/___/g, ' ').replace(/_/g, ' ')}
                              </span>
                              <span className="font-bold text-slate-700">{pred.confidence}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  i === 0 ? 'bg-emerald-600' : 'bg-slate-300'
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
                      <p className="text-xs text-slate-600">
                        Dense 3072-dimensional vector retrieval results from `smart_system/rag/index/rag_dense.faiss`:
                      </p>
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {result.retrieved_evidence?.map((chunk, i) => (
                          <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-forest-900">
                                [{chunk.doc_id}] {chunk.section}
                              </span>
                              <span className="badge-high">Score: {chunk.similarity_score}</span>
                            </div>
                            <p className="text-slate-700 font-mono text-[11px] leading-relaxed whitespace-pre-line">
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
                      <p className="text-xs text-slate-600">
                        Pydantic model `GroundedClinicalAssessment` enforced on `gemini-3.8-flash`:
                      </p>
                      <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto max-h-60">
                        {JSON.stringify(result.assessment, null, 2)}
                      </pre>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

          {/* ── INTERACTIVE FOLLOW-UP CONSULTATION ───────────────── */}
          <div className="agri-card p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-forest-900 text-emerald-400 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Follow-Up Agronomic Consultation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ask questions regarding this specific diagnosis ({result.prediction.replace(/___/g, ' ').replace(/_/g, ' ')}). Context is preserved.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggested Question Chips */}
            {result.assessment?.suggested_follow_up_questions?.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recommended Questions to Ask:
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.assessment.suggested_follow_up_questions.map((q, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendFollowUp(q)}
                      disabled={chatLoading}
                      className="text-xs font-medium px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-forest-100 hover:text-forest-900 text-slate-700 border border-slate-200 transition-colors text-left"
                    >
                      💬 {q}
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
                    className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-forest-900 text-white rounded-br-none'
                        : msg.sender === 'system'
                        ? 'bg-slate-100 text-slate-600 border border-slate-200 w-full text-center text-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm space-y-2.5'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.recommendations?.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <span className="font-bold text-slate-900 text-xs">Immediate Recommendations:</span>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {msg.recommendations.map((rec, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {msg.safety && (
                      <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        {msg.safety}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-600 text-xs px-4 py-3 rounded-2xl flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-forest-700" />
                    <span>Consulting agricultural extension literature...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendFollowUp();
              }}
              className="flex items-center gap-2 pt-2"
            >
              <input
                type="text"
                placeholder="Ask about fertilizer timing, organic sprays, weather effects..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading}
                className="form-input"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="btn-forest px-4 py-2.5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Ask</span>
              </button>
            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default CropDoctor;
