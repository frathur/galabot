import { useState } from 'react';
import { Camera } from 'lucide-react';

export default function LiveFeed() {
  const [streamError, setStreamError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const esp32CamUrl = import.meta.env.VITE_ESP32_CAM_URL || '';

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setStreamError(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-brand-brown tracking-tight">Live Camera Feed</h1>
        <p className="text-gray-500 mt-1">Real-time ESP32-CAM optical stream from Galabot.</p>
      </div>

      <div className="flex-1 bg-brand-white border border-gray-200 rounded-2xl overflow-hidden relative shadow-sm flex flex-col items-center justify-center group">
        
        {!streamError && esp32CamUrl ? (
          <img 
            src={esp32CamUrl} 
            alt="Galabot Live Feed"
            className="w-full h-full object-cover"
            onError={() => setStreamError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 p-8 text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center mb-6 shadow-inner ring-1 ring-brand-green/10">
              <Camera className="w-10 h-10 text-brand-green" />
            </div>
            <h3 className="text-xl font-bold text-brand-brown mb-2">Stream Offline</h3>
            <p className="text-sm leading-relaxed mb-6 font-medium">
              Unable to connect to the ESP32-CAM module. Ensure Galabot is powered on, connected to the network, and the stream URL is correctly configured.
            </p>
            <button 
              onClick={handleRetry}
              disabled={isRetrying}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all duration-200 border flex items-center justify-center gap-2 min-w-[160px] ${
                isRetrying 
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'bg-brand-green/10 text-brand-green border-brand-green/20 hover:bg-brand-green hover:text-white'
              }`}
            >
              {isRetrying ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"></div>
                  Connecting...
                </>
              ) : (
                'Retry Connection'
              )}
            </button>
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-3">
          <div className="bg-brand-white/90 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-brand-brown shadow-sm">
            <span className={`w-2 h-2 rounded-full ${!streamError && esp32CamUrl ? 'bg-brand-green animate-pulse' : 'bg-red-500'}`}></span>
            {(!streamError && esp32CamUrl) ? 'LIVE' : 'OFFLINE'}
          </div>
          <div className="bg-brand-white/90 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 tracking-wider shadow-sm">
            ESP32-CAM MJPEG
          </div>
        </div>

      </div>
    </div>
  );
}
