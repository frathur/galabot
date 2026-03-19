import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Filtration from './pages/Filtration';
import LiveFeed from './pages/LiveFeed';
import MapTracker from './pages/MapTracker';
import UserManual from './pages/UserManual';
import logoImg from './assets/logo.png';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const hideTimer = setTimeout(() => setFade(true), 2000);
    // Completely unmount after 2.5 seconds (gives 500ms for transition)
    const removeTimer = setTimeout(() => setShowSplash(false), 2500);
    
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showSplash && (
        <div className={`fixed inset-0 bg-brand-light z-50 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative flex flex-col items-center justify-center">
            {/* Pulsing ring effect behind logo */}
            <div className="absolute inset-0 bg-brand-green/20 rounded-full blur-xl animate-pulse scale-150"></div>
            
            <img 
              src={logoImg} 
              alt="Galabot System Logo" 
              className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10 animate-bounce" 
            />
            <h1 className="mt-8 text-4xl md:text-5xl font-bold text-brand-brown tracking-tighter relative z-10">
              Galabot
            </h1>
            <p className="mt-2 text-sm text-brand-green font-bold tracking-widest uppercase relative z-10">
              Environmental Interface
            </p>
          </div>
        </div>
      )}

      {/* Main App Routes */}
      {!showSplash && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="filtration" element={<Filtration />} />
            <Route path="live-feed" element={<LiveFeed />} />
            <Route path="map" element={<MapTracker />} />
            <Route path="manual" element={<UserManual />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
