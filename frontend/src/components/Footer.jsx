import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ShieldAlert, Cpu, BookOpen, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F0] border-t border-[#E7E0D2] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-botanical-950 text-[#D8E6DC] flex items-center justify-center border border-botanical-800">
                <Stethoscope className="w-4 h-4 stroke-[1.8] text-botanical-300" />
              </div>
              <span className="font-editorial text-2xl text-botanical-950 font-normal tracking-tight">
                KisanVision
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded bg-botanical-100 text-botanical-800 border border-botanical-200">
                SERIES 2024
              </span>
            </div>
            
            <p className="text-xs text-[#4A5D50] leading-relaxed max-w-sm font-sans">
              A botanical field research platform bridging deep learning Computer Vision with dense vector literature retrieval. Designed to replace ungrounded LLM guessing with clinical, evidence-backed crop pathology.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="specimen-tag">
                <Cpu className="w-3 h-3 text-botanical-700" /> 52-Class CNN Backbone
              </span>
              <span className="specimen-tag">
                <BookOpen className="w-3 h-3 text-botanical-700" /> FAISS 3072-Dim Vector Index
              </span>
              <span className="specimen-tag">
                <CheckCircle className="w-3 h-3 text-botanical-700" /> Gemini 3.8 Flash Reasoning
              </span>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6B7D70]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-[#2D3F33] hover:text-botanical-950 transition-colors">
                  Field Overview
                </Link>
              </li>
              <li>
                <Link to="/crop-doctor" className="text-[#2D3F33] hover:text-botanical-950 transition-colors font-medium">
                  Crop Doctor (Diagnostic Workbench)
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[#2D3F33] hover:text-botanical-950 transition-colors">
                  RAG Pipeline Architecture
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#2D3F33] hover:text-botanical-950 transition-colors">
                  Research Attribution & Limits
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Agronomic Literature Notes */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#6B7D70]">
              Extension Literature Base
            </div>
            <p className="text-xs text-[#4A5D50] leading-relaxed">
              Curated from university agricultural extension bulletins, ICAR-IIPR pathology manuals, and USDA Integrated Pest Management (IPM) literature.
            </p>
            <div className="p-3 rounded-md bg-[#F3ECE0] border border-[#E2D8C6] space-y-1 font-mono text-[11px] text-[#334639]">
              <div className="flex justify-between">
                <span className="text-[#788A7C]">INDEX ACCESSION:</span>
                <span className="font-medium text-botanical-900">FAISS-DENSE-2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#788A7C]">VECTOR CHUNKS:</span>
                <span className="font-medium text-botanical-900">28 Verified Sections</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#788A7C]">RUNTIME SCHEMA:</span>
                <span className="font-medium text-botanical-900">Pydantic Grounded Clinical</span>
              </div>
            </div>
          </div>

        </div>

        {/* Agronomic Safety Disclaimers */}
        <div className="p-3.5 rounded-md bg-[#FEF8F0] border border-[#EEDCC4] text-[11px] text-[#5C3D18] leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#A85A18] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#3D250C]">Clinical Safety Disclaimer:</span> Recommendations provided by KisanVision AI represent advisory agronomic decision support. Prior to field chemical spraying, always cross-reference active ingredients against state registration lists and verify container PHI (Pre-Harvest Interval) and REI (Restricted Entry Interval) requirements.
          </div>
        </div>

        {/* Baseline Bar */}
        <div className="border-t border-[#E7E0D2] mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#697B6E] gap-2">
          <div>
            &copy; {new Date().getFullYear()} KisanVision AI &bull; Major Capstone Presentation Release.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-botanical-leaf"></span>
            <span className="font-mono text-[10px] tracking-wide uppercase text-botanical-800">
              Deterministic Vision + Grounded RAG
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
