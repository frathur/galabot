import { Droplets } from 'lucide-react';

export default function BiocharWidget({ level }: { level: number }) {
  // Biochar color logic for nature theme
  let colorClass = 'bg-brand-brown'; // Earthy brown for biochar
  let waveClass = 'bg-brand-green'; // Green water/filter representation
  
  if (level < 20) {
    waveClass = 'bg-red-500 animate-pulse';
  } else if (level < 50) {
    waveClass = 'bg-orange-400';
  }

  return (
    <div className="flex justify-center items-center h-full relative p-4">
      <div className="relative w-32 h-32 rounded-full border-4 border-gray-100 flex items-center justify-center bg-brand-light overflow-hidden shadow-inner">
        {/* Wave background representing biochar level */}
        <div 
          className={`absolute bottom-0 w-[200%] h-[200%] ${waveClass} opacity-80 left-[-50%] rounded-[40%] animate-[spin_6s_linear_infinite] transition-all duration-1000 ease-in-out`}
          style={{ transform: `translateY(${100 - level}%)` }}
        />
        <div 
          className={`absolute bottom-0 w-[200%] h-[200%] ${colorClass} opacity-40 left-[-30%] rounded-[45%] animate-[spin_8s_linear_infinite] transition-all duration-1000 ease-in-out`}
          style={{ transform: `translateY(${100 - level}%)` }}
        />
        
        <div className="z-10 flex flex-col items-center">
          <Droplets className="w-5 h-5 text-brand-white mb-1 drop-shadow-md" />
          <span className="text-3xl font-bold text-white tracking-tight drop-shadow-md">{Math.round(level)}%</span>
        </div>
      </div>
      
      {level < 20 && (
        <div className="absolute top-0 right-[-10px] bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded border border-red-400 animate-bounce shadow-sm">
          LOW CAPACITY
        </div>
      )}
    </div>
  );
}
