import { BatteryFull, BatteryMedium, BatteryLow, BatteryWarning } from 'lucide-react';

export default function BatteryWidget({ battery }: { battery: number }) {
  let colorClass = 'bg-brand-green shadow-[0_0_12px_rgba(46,125,50,0.5)]';
  let Icon = BatteryFull;

  if (battery < 30) {
    colorClass = 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)] animate-pulse';
    Icon = battery < 10 ? BatteryWarning : BatteryLow;
  } else if (battery < 70) {
    colorClass = 'bg-brand-green-light shadow-[0_0_12px_rgba(76,175,80,0.5)]';
    Icon = BatteryMedium;
  }

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="flex items-end gap-2 mb-6">
        <span className="text-5xl font-bold tracking-tighter text-brand-brown">{Math.round(battery)}</span>
        <span className="text-xl text-gray-400 font-bold mb-1">%</span>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden ring-1 ring-gray-200 inset-shadow-sm">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${Math.max(0, Math.min(100, battery))}%` }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between w-full text-sm text-gray-500 font-bold">
        <span className="flex items-center gap-2"><Icon className="w-4 h-4 text-brand-green" /> Capacity</span>
        <span>7000 mAh</span>
      </div>
    </div>
  );
}
