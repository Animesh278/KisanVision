import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ShieldAlert, Cpu, BookOpen, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-900 text-emerald-400 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-heading font-bold text-lg text-forest-950">
                KisanVision<span className="text-emerald-600"> AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              A multimodal agricultural intelligence platform bridging deep learning Computer Vision with 
              retrieval-augmented generation (RAG) to provide verifiable, evidence-grounded crop pathology support.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                <Cpu className="w-3.5 h-3.5 text-forest-700" /> PyTorch CNN (52 Classes)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-forest-700" /> FAISS Vector RAG
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-forest-700" /> Gemini 3.8 Flash Grounding
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-600 hover:text-forest-900 font-medium transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/crop-doctor" className="text-slate-600 hover:text-forest-900 font-medium transition-colors">
                  AI Crop Doctor (Diagnostic)
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-600 hover:text-forest-900 font-medium transition-colors">
                  How It Works (Architecture)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-forest-900 font-medium transition-colors">
                  About & Tech Stack
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Project Citation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Project Information
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Final Year Major Capstone Project. Designed for real-world agricultural decision support.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Version: <span className="font-semibold text-slate-700">4.0.0 (RAG Polish)</span></div>
              <div>Backend: <span className="font-semibold text-slate-700">FastAPI & Python 3.11</span></div>
              <div>Knowledge: <span className="font-semibold text-slate-700">ICAR / USDA IPM Guides</span></div>
            </div>
          </div>

        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Agronomic Safety Notice:</span> KisanVision AI provides advisory recommendations intended to assist farmers and agronomists with early identification. All chemical interventions, fungicides, and biocontrols must be confirmed against regional agricultural department registrations and manufacturer container labels before field application.
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} KisanVision AI — Presentation-Ready Capstone Release.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Models Live & Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
