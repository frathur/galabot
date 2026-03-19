import { useGalabotStore } from '../store/useGalabotStore';
import CardWidget from '../components/widgets/CardWidget';
import BatteryWidget from '../components/widgets/BatteryWidget';
import BiocharWidget from '../components/widgets/BiocharWidget';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format } from 'date-fns';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Activity, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

const galabotIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function Dashboard() {
  const state = useGalabotStore();
  const loading = useGalabotStore(s => s.isInitializing);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-brand-green border-r-4 border-r-transparent"></div>
      </div>
    );
  }

  const { lat, lng } = state.location;
  const position: [number, number] = [lat, lng];

  return (
    <div className="flex flex-col gap-6 lg:gap-8 pb-8 animate-in fade-in duration-500">
      
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardWidget title="Power Cell" className="w-full">
          <BatteryWidget battery={state.battery} />
        </CardWidget>

        <CardWidget title="Biochar Filter Level" className="w-full">
          <BiocharWidget level={state.biocharLevel} />
        </CardWidget>
        
        <CardWidget title="Pipeline Flow Rate" className="w-full">
           <div className="flex flex-col items-center justify-center h-full pb-4">
              <span className="text-5xl font-extrabold text-cyan-600 font-mono tracking-tighter">
                {state.flowRate}
              </span>
              <span className="text-sm text-cyan-700/60 font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                Liters / Sec <Activity className="w-4 h-4 ml-1" />
              </span>
           </div>
        </CardWidget>

        <CardWidget title="Platform Sync" className="w-full">
          <div className="flex flex-col items-center justify-center h-full pb-4 text-center">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-700 font-mono tracking-tight">
              {format(state.lastUpdated, 'HH:mm:ss')}
            </span>
            <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${state.systemStatus === 'Online' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
              <div className={`w-2 h-2 rounded-full ${state.systemStatus === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
              {state.systemStatus}
            </div>
          </div>
        </CardWidget>
      </div>

      {/* Analytics & Events Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Historical Chart (Col span 2) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Telemetric Analytics</h2>
             <div className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">Live Window</div>
           </div>
           
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={state.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorBattery" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                   itemStyle={{ fontWeight: 'bold' }}
                 />
                 <Area type="monotone" dataKey="battery" name="Battery %" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorBattery)" />
                 <Area type="step" dataKey="flowRate" name="Flow (L/s)" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorFlow)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Live Event Log */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col h-[350px] lg:h-auto">
           <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-6">System Events</h2>
           <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {state.events.length === 0 ? (
                <div className="text-center text-slate-400 mt-10 font-medium text-sm">No recent events logged.</div>
              ) : (
                state.events.map((event) => (
                  <div key={event.id} className="flex gap-3 items-start group">
                    <div className="mt-0.5">
                      {event.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                      {event.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                      {event.type === 'alert' && <AlertOctagon className="w-5 h-5 text-red-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 leading-snug">{event.message}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                        {format(event.time, 'HH:mm:ss')}
                      </span>
                    </div>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>

      {/* Embedded Map Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-2">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-800">Live Global Tracking</h2>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <div className="bg-white px-3 sm:px-4 py-1.5 border border-slate-200 rounded-lg text-brand-brown shadow-sm whitespace-nowrap">
              <span className="text-slate-400 mr-2">LAT:</span>{lat.toFixed(5)}
            </div>
            <div className="bg-white px-3 sm:px-4 py-1.5 border border-slate-200 rounded-lg text-brand-brown shadow-sm whitespace-nowrap">
              <span className="text-slate-400 mr-2">LNG:</span>{lng.toFixed(5)}
            </div>
          </div>
        </div>
        
        <div className="w-full h-[400px] md:h-[500px] relative z-0">
          <MapContainer 
            center={position} 
            zoom={16} 
            style={{ height: '100%', width: '100%', background: '#F1F8E9' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; Google Maps'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              maxZoom={20}
            />
            <Marker position={position} icon={galabotIcon}>
              <Popup className="custom-popup">
                <div className="text-center font-sans tracking-wide">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-1 uppercase">Galabot Alpha</h3>
                  <p className="text-xs text-brand-green font-bold m-0 mt-2">Battery: {state.battery}%</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Status: {state.systemStatus}</p>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={position}
              radius={100}
              pathOptions={{ fillColor: '#10B981', color: '#047857', fillOpacity: 0.15, weight: 2 }}
            />
          </MapContainer>

          {/* Map Overlay Radar */}
          <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-ping relative">
              <div className="absolute inset-0 bg-brand-green rounded-full"></div>
            </div>
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest hidden sm:inline-block">GPS Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
