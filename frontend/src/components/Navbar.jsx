import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X, ArrowRight } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Crop Doctor', path: '/crop-doctor', highlight: true },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About', path: '/about' },
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-forest-900 text-emerald-400 flex items-center justify-center shadow-sm group-hover:bg-forest-800 transition-colors">
              <Stethoscope className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-xl tracking-tight text-forest-950">
                  KisanVision<span className="text-emerald-600">.ai</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                  GenAI Doctor
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Evidence-Grounded Agronomic Decision Support
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-forest-50 text-forest-900 border border-forest-200/60'
                      : 'text-slate-600 hover:text-forest-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs + Lang Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/crop-doctor"
              className="btn-forest"
            >
              <span>Diagnose Leaf</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  active
                    ? 'bg-forest-50 text-forest-900 border border-forest-200/60'
                    : 'text-slate-700 hover:bg-slate-50'
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
              className="w-full btn-forest justify-center py-3"
            >
              <span>Open Crop Doctor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
