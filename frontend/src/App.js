import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import CropDoctor from './pages/CropDoctor';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8FAF6] text-slate-800 antialiased selection:bg-emerald-500/20 selection:text-forest-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crop-doctor" element={<CropDoctor />} />
            {/* Backward-compatible alias for legacy /disease route */}
            <Route path="/disease" element={<Navigate to="/crop-doctor" replace />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
