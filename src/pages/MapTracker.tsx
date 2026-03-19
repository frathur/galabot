import { useGalabotStore } from '../store/useGalabotStore';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix typical Leaflet icon issue with Vite
const galabotIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapTracker() {
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
    <div className="h-full flex flex-col pb-8">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-brown tracking-tight">Location Tracker</h1>
          <p className="text-gray-500 mt-1">Live GPS tracking of Galabot operations.</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold max-w-full overflow-x-auto pb-2 sm:pb-0">
          <div className="bg-brand-white px-4 py-2 border border-gray-200 rounded-lg text-brand-brown shadow-sm whitespace-nowrap">
            <span className="text-gray-400 mr-2">LAT:</span>{lat.toFixed(5)}
          </div>
          <div className="bg-brand-white px-4 py-2 border border-gray-200 rounded-lg text-brand-brown shadow-sm whitespace-nowrap">
            <span className="text-gray-400 mr-2">LNG:</span>{lng.toFixed(5)}
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0 min-h-[500px]">
        <MapContainer 
          center={position} 
          zoom={16} 
          style={{ height: '100%', width: '100%', background: '#F1F8E9' }}
        >
          {/* Using direct Google Maps tile servers */}
          <TileLayer
            attribution='&copy; Google Maps'
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={20}
          />
          <Marker position={position} icon={galabotIcon}>
            <Popup className="custom-popup">
              <div className="text-center font-sans">
                <h3 className="font-bold text-brand-brown text-sm mb-1">Galabot #1</h3>
                <p className="text-xs text-brand-green font-bold m-0">Battery: {state.battery}%</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Status: {state.systemStatus}</p>
              </div>
            </Popup>
          </Marker>
          <Circle 
            center={position}
            radius={100}
            pathOptions={{ fillColor: '#4CAF50', color: '#2E7D32', fillOpacity: 0.15, weight: 2 }}
          />
        </MapContainer>

        {/* Floating Indicator */}
        <div className="absolute bottom-6 right-6 z-[1000] bg-brand-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-200 shadow-lg flex items-center gap-3">
          <div className="w-3 h-3 bg-brand-green rounded-full animate-ping relative">
             <div className="absolute inset-0 bg-brand-green rounded-full"></div>
          </div>
          <span className="text-xs font-bold text-brand-brown uppercase tracking-widest hidden sm:inline-block">GPS Active</span>
          <span className="text-xs font-bold text-brand-brown uppercase tracking-widest sm:hidden">GPS</span>
        </div>
      </div>
    </div>
  );
}
