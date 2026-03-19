import { useGalabotStore } from '../store/useGalabotStore';
import { motion } from 'framer-motion';
import { Fan, Droplets, Activity } from 'lucide-react';

const BridgePipe = ({ isActive, type = 'clean' }: { isActive: boolean; type?: 'dirty' | 'clean'; isMobile?: boolean }) => {
  const color = type === 'dirty' ? '#78350F' : '#10B981';
  return (
    <div className="w-4 h-12 flex items-center justify-center shrink-0 xl:hidden my-1">
       <svg width="6" height="100%" className="overflow-visible">
         <line x1="3" y1="0" x2="3" y2="100%" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="butt" />
         <motion.line 
           x1="3" y1="0" x2="3" y2="100%" 
           stroke={isActive ? color : "transparent"} 
           strokeWidth="6" strokeLinecap="round" strokeDasharray="16 16"
           animate={isActive ? { strokeDashoffset: [32, 0] } : {}}
           transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
         />
       </svg>
    </div>
  );
};

const PipelineOverlay = ({ isFlowing, mixerActive }: { isFlowing: boolean, mixerActive: boolean }) => {
  return (
    <svg className="absolute inset-0 w-[1024px] h-[450px] z-30 pointer-events-none">
       {/* ======== PIPE 1: Polluted to Filter (BROWN) ======== */}
       {/* Background Track */}
       <path d="M 120,220 L 120,70 Q 120,50 140,50 L 344,50 Q 364,50 364,70 L 364,180" fill="none" stroke="#F1F5F9" strokeWidth="18" />
       {/* Inner grey dashes for depth */}
       <path d="M 120,220 L 120,70 Q 120,50 140,50 L 344,50 Q 364,50 364,70 L 364,180" fill="none" stroke="#E2E8F0" strokeWidth="18" strokeDasharray="6 12" strokeLinecap="butt" />
       {/* Active Moving Fluid */}
       <motion.path 
         d="M 120,220 L 120,70 Q 120,50 140,50 L 344,50 Q 364,50 364,70 L 364,180" 
         fill="none" stroke={isFlowing ? "#8D6E63" : "transparent"} strokeWidth="8" 
         strokeDasharray="16 20" strokeLinecap="round"
         animate={isFlowing ? { strokeDashoffset: [36, 0] } : {}}
         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
       />

       {/* ======== PIPE 2: Filter to Community (GREEN) ======== */}
       <path d="M 396,160 L 396,70 Q 396,50 416,50 L 604,50 Q 624,50 624,70 L 624,240" fill="none" stroke="#F1F5F9" strokeWidth="18" />
       <path d="M 396,160 L 396,70 Q 396,50 416,50 L 604,50 Q 624,50 624,70 L 624,240" fill="none" stroke="#E2E8F0" strokeWidth="18" strokeDasharray="6 12" strokeLinecap="butt" />
       
       <motion.path 
         d="M 396,160 L 396,70 Q 396,50 416,50 L 604,50 Q 624,50 624,70 L 624,240" 
         fill="none" stroke={isFlowing ? "#10B981" : "transparent"} strokeWidth="8" 
         strokeDasharray="16 20" strokeLinecap="round"
         animate={isFlowing ? { strokeDashoffset: [36, 0] } : {}}
         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
       />

       {/* ======== PIPE 3: Community to Mixer (GREEN) ======== */}
       <path d="M 656,220 L 656,70 Q 656,50 676,50 L 880,50 Q 900,50 900,70 L 900,196" fill="none" stroke="#F1F5F9" strokeWidth="18" />
       <path d="M 656,220 L 656,70 Q 656,50 676,50 L 880,50 Q 900,50 900,70 L 900,196" fill="none" stroke="#E2E8F0" strokeWidth="18" strokeDasharray="6 12" strokeLinecap="butt" />
       
       <motion.path 
         d="M 656,220 L 656,70 Q 656,50 676,50 L 880,50 Q 900,50 900,70 L 900,196" 
         fill="none" stroke={mixerActive ? "#10B981" : "transparent"} strokeWidth="8" 
         strokeDasharray="16 20" strokeLinecap="round"
         animate={mixerActive ? { strokeDashoffset: [36, 0] } : {}}
         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
       />
    </svg>
  );
};

const Tank = ({ name, level, max = 100, type = 'clean', className = '' }: { name: string; level: number; max?: number, type?: 'dirty' | 'filter' | 'clean', className?: string }) => {
  const percentage = Math.max(0, Math.min(100, (level / max) * 100));
  
  let liquidColor = 'bg-blue-500';
  let waveColor = 'bg-blue-400';
  
  const isFilter = type === 'filter';
  
  if (type === 'dirty') {
    liquidColor = 'bg-[#78350F]'; // Deep umber brown
    waveColor = 'bg-[#92400E]'; // Lighter amber brown for surface
  } else if (isFilter) {
    liquidColor = 'bg-teal-500';
    waveColor = 'bg-teal-400';
  }
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Tank Main Body */}
      <div 
        className={`w-36 h-56 bg-white relative overflow-hidden flex items-end shadow-sm z-10 transition-all 
          ${isFilter ? 'rounded-md border-4 border-slate-300' : 'rounded-b-[2rem] rounded-t-lg border-[3px] border-slate-200'}`}
      >
        
        {/* Layer Layout for Filter Block as perfectly requested by design image */}
        {isFilter && (
          <div className="absolute inset-0 flex flex-col z-0">
            <div className="flex-[0.8] bg-[#c3e8e4] flex items-center justify-center"><span className="text-[10px] font-bold text-[#629791] tracking-widest z-10 opacity-70">POLYPAD</span></div>
            <div className="flex-1 bg-[#95c391] border-b border-[#7fb37a]/30 flex items-center justify-center"><span className="text-[10px] font-bold text-[#568153] tracking-widest z-10">SAND</span></div>
            <div className="flex-1 bg-[#6d8a96] border-b border-[#5a7681]/30 flex items-center justify-center"><span className="text-[10px] font-bold text-[#3d535d] tracking-widest z-10">GRAVELS</span></div>
            <div className="flex-[1.5] bg-[#223545] border-b border-[#182734]/30 flex items-center justify-center"><span className="text-[10px] font-bold text-slate-300 tracking-widest z-10">BIOCHAR</span></div>
            <div className="flex-[0.8] bg-[#a7e8cf] flex items-center justify-center"><span className="text-[10px] font-bold text-[#57977e] tracking-widest z-10 opacity-70">POLYPAD</span></div>
          </div>
        )}

        {/* Dynamic Water Volume Overlay */}
        <motion.div 
          className={`absolute left-0 bottom-0 w-full z-10 ${isFilter ? 'opacity-40 mix-blend-multiply' : 'opacity-90'} ${liquidColor}`}
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        >
          {percentage > 0 && percentage < 100 && (
            <motion.div 
              className={`absolute left-0 w-[200%] h-4 rounded-full blur-[2px] -top-2 ${waveColor}`}
              animate={{ x: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
          )}
        </motion.div>
      </div>
      
      {/* Pristine HUD Labels below */}
      <div className="mt-8 flex flex-col items-center">
        <span className="px-5 py-2 bg-white border border-slate-200 rounded-full text-[11px] font-extrabold font-mono tracking-widest shadow-sm text-slate-500">
          {Math.round(percentage)}% CAPACITY
        </span>
        <h3 className="text-brand-brown font-extrabold text-sm tracking-widest uppercase mt-4 text-center leading-tight">
          {name}
        </h3>
      </div>
    </div>
  );
};

const Mixer = ({ status, className = '' }: { status: string, className?: string }) => {
  const isActive = status === 'active';
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Crisp Circular Frame identical to design blueprint */}
      <div className={`w-36 h-36 border-[4px] rounded-full flex items-center justify-center relative shadow-sm transition-all duration-500 z-10 ${isActive ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-300 bg-white'}`}>
        <motion.div
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        >
          <Fan className={`w-16 h-16 ${isActive ? 'text-emerald-500' : 'text-slate-300'}`} />
        </motion.div>
      </div>
      
      {/* Mixer HUD Label */}
      <div className="mt-8 flex flex-col items-center">
        <span className={`px-6 py-2 rounded-full text-[11px] font-extrabold font-mono tracking-widest uppercase shadow-sm ${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
          {isActive ? 'ACTIVE' : 'IDLE'}
        </span>
        <h3 className="text-brand-brown font-extrabold text-sm tracking-widest uppercase mt-4 text-center leading-tight">
          Vortex Mixer
        </h3>
      </div>
    </div>
  );
};

export default function Filtration() {
  const state = useGalabotStore();
  const loading = useGalabotStore(s => s.isInitializing);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-green border-r-4 border-r-transparent"></div>
      </div>
    );
  }

  const { pollutedTankLevel, filterTankLevel, communityTankLevel, mixerStatus, flowRate, systemStatus } = state;
  const isFlowing = flowRate > 0 && systemStatus === 'Online';
  const mixerActive = isFlowing && mixerStatus === 'active';

  return (
    <div className="flex flex-col pt-4 pb-8 min-h-full">
      {/* Header Panel */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-brown tracking-tight flex justify-center items-center gap-3">
            <Droplets className="w-6 h-6 md:w-8 md:h-8 text-brand-green" />
            Filtration Operations
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-xs md:text-base">Real-time modular tracking of pipeline hydrodynamics.</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
          <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 flex flex-col shadow-sm">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Flow Rate</span>
            <span className="text-xl font-mono font-bold text-brand-green flex items-center gap-2 mt-0.5">
              {flowRate} L/s <Activity className="w-4 h-4 text-brand-green/70" />
            </span>
          </div>
          <div className={`border rounded-2xl px-6 py-3 flex flex-col shadow-sm ${systemStatus === 'Online' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">System State</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-2.5 h-2.5 rounded-full ${systemStatus === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-extrabold uppercase tracking-wide ${systemStatus === 'Online' ? 'text-emerald-700' : 'text-red-700'}`}>{systemStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Coordinate Vector Diagram (Dual Logic) */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 p-4 md:p-8 relative flex flex-col items-center xl:justify-center overflow-x-auto shadow-sm xl:min-h-[550px] w-full">
        
        {/* ==== DESKTOP PIPELINE OVERLAY ==== */}
        <div className="hidden xl:block w-[1024px] h-[450px] relative shrink-0 z-10">
          
          {/* Advanced Pipeline Array SVG */}
          <PipelineOverlay isFlowing={isFlowing} mixerActive={mixerActive} />
          
          {/* Coordinates correctly map precisely to the 1024px Pipeline Vectors */}
          <Tank className="absolute left-[48px] top-[80px]" name="Polluted Source" level={pollutedTankLevel} type="dirty" />
          <Tank className="absolute left-[308px] top-[80px]" name="Filter System" level={filterTankLevel} type="filter" />
          <Tank className="absolute left-[568px] top-[80px]" name="Community Tank" level={communityTankLevel} type="clean" />
          
          <Mixer className="absolute left-[828px] top-[108px]" status={mixerStatus} />

        </div>

        {/* ==== MOBILE VERTICAL PIPELINE ==== */}
        <div className="xl:hidden flex flex-col items-center w-full py-8 z-10">
           <Tank name="Polluted Source" level={pollutedTankLevel} type="dirty" className="mb-2" />
           
           <BridgePipe isMobile isActive={isFlowing} type="dirty" />
           <Tank name="Filter System" level={filterTankLevel} type="filter" className="mb-2" />
           
           <BridgePipe isMobile isActive={isFlowing} type="clean" />
           <Tank name="Community Tank" level={communityTankLevel} type="clean" className="mb-2" />
           
           <BridgePipe isMobile isActive={mixerActive} type="clean" />
           <Mixer status={mixerStatus} />
        </div>
        
        {/* Schematic Dot Grid Background overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none rounded-3xl hidden md:block" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
      </div>
    </div>
  );
}
