import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home.jsx';
import CropDoctor from './pages/CropDoctor.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-botanical-950 antialiased selection:bg-botanical-200 selection:text-botanical-950">
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
