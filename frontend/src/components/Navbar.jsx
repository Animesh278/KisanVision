import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X, ArrowUpRight } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_LINKS = [
  { name: 'Field Overview', path: '/' },
  { name: 'Crop Doctor', path: '/crop-doctor', highlight: true },
  { name: 'RAG Architecture', path: '/how-it-works' },
  { name: 'Research & About', path: '/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#E7E0D2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Mark */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-md bg-botanical-950 text-[#D8E6DC] flex items-center justify-center border border-botanical-800 shadow-sm group-hover:bg-botanical-900 transition-colors">
              <Stethoscope className="w-5 h-5 stroke-[1.8] text-botanical-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl tracking-tight text-botanical-950 font-normal">
                  KisanVision
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded bg-botanical-100/70 border border-botanical-200/80 text-botanical-800">
                  RAG LAB
                </span>
              </div>
              <p className="text-[11px] text-[#556B5B] font-sans tracking-wide hidden sm:block">
                Botanical Field Intelligence &bull; Extension-Grounded AI
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-md text-xs tracking-wide font-medium transition-all ${
                    active
                      ? 'bg-botanical-900 text-paper-50 shadow-xs'
                      : 'text-[#2D3F33] hover:text-botanical-950 hover:bg-[#F2ECE0]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Controls & Action */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/crop-doctor"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-botanical-900 text-paper-50 text-xs font-medium tracking-wide border border-botanical-800 hover:bg-botanical-800 active:scale-[0.99] transition-all shadow-xs"
            >
              <span>Analyze Leaf</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-botanical-300" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-botanical-950 hover:bg-paper-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E7E0D2] bg-[#FAF7F0] px-4 pt-3 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-md text-sm font-medium ${
                  active
                    ? 'bg-botanical-900 text-paper-50'
                    : 'text-[#2D3F33] hover:bg-paper-200'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/crop-doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-botanical-900 text-paper-50 text-xs font-medium"
            >
              <span>Launch Crop Doctor</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-botanical-300" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
