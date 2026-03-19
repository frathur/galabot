import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Radio, BookOpen, Filter, X, Map as MapIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logoImg from '../assets/logo.png';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Map Tracker', path: '/map', icon: MapIcon },
  { name: 'Filtration', path: '/filtration', icon: Filter },
  { name: 'Live Feed', path: '/live-feed', icon: Radio },
  { name: 'User Manual', path: '/manual', icon: BookOpen },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="w-64 bg-brand-white h-screen border-r border-gray-200 flex flex-col shadow-lg md:shadow-sm">
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-white rounded-xl flex items-center justify-center p-1 border border-brand-green/20 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-green/5 group-hover:bg-brand-green/10 transition-colors"></div>
            <img src={logoImg} alt="Galabot Logo" className="w-full h-full object-contain relative z-10" />
          </div>
          <div className="flex flex-col">
            <h1 
              className="text-2xl font-[900] tracking-tighter bg-gradient-to-br from-brand-brown to-brand-green bg-clip-text text-transparent leading-none"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              GALABOT
            </h1>
            <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] mt-0.5 ml-0.5">System</span>
          </div>
        </div>
        
        {/* Mobile close button */}
        <button 
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-brand-brown p-1 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-brand-green/10 text-brand-green shadow-[inset_4px_0_0_0_#2E7D32]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-brand-brown'
                )
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center flex-shrink-0">
        GALABOT Ecosystem &copy; {new Date().getFullYear()}
      </div>
    </aside>
  );
}
