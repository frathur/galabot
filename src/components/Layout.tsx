import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Bell, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useGalabotStore } from '../store/useGalabotStore';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const location = useLocation();
  
  // Init unified state listener cleanly on mount
  const initializeStore = useGalabotStore(state => state.initialize);
  const events = useGalabotStore(state => state.events);
  
  const hasAlerts = events.some(e => e.type === 'alert' || e.type === 'warning');

  useEffect(() => {
    initializeStore();
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [initializeStore]);

  return (
    <div className="flex min-h-screen bg-brand-light font-sans text-brand-brown selection:bg-brand-green/20">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-brand-brown/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Responsive Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Core */}
      <main className="flex-1 md:ml-64 flex flex-col min-w-0 transition-all duration-300 ease-in-out bg-[#F8FAFC]">
        
        {/* App Header Bar */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-brand-brown hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-sm font-extrabold text-brand-brown tracking-wide uppercase truncate hidden sm:block">
              Environmental Interface
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
             {/* Live Clock Component */}
             <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full text-sm font-bold text-gray-500 shadow-inner">
               <Clock className="w-4 h-4 text-brand-green" />
               {format(time, 'MMM dd, yyyy \u2014 HH:mm:ss')}
             </div>
             
             {/* Notification Bell */}
             <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group outline-none focus:bg-brand-green/10 focus:text-brand-green">
               <Bell className="w-5 h-5 text-gray-600 group-hover:text-brand-brown transition-colors" />
               {hasAlerts && (
                 <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
               )}
             </button>

             {/* Profile Avatar Placeholder */}
             <div className="w-9 h-9 bg-brand-green/10 border-2 border-brand-green/20 rounded-full flex items-center justify-center font-bold text-brand-green shadow-sm overflow-hidden pointer-events-none">
               <img src="https://ui-avatars.com/api/?name=Admin+Bio&color=2E7D32&background=E8F5E9" alt="Profile" />
             </div>
          </div>
        </header>
        
        {/* Dynamic Outlet with Route Transitions */}
        <div className="flex-1 w-full flex flex-col relative">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.99 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex-1 flex flex-col"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
      </main>
    </div>
  );
}
