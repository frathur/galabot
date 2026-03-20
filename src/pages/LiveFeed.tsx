import { useState } from 'react';
import { Camera, Link as LinkIcon, Save } from 'lucide-react';

export default function LiveFeed() {
  const [streamError, setStreamError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Try to grab cached IP, else raw IP from env, else empty
  const [camUrl, setCamUrl] = useState(() => {
    return localStorage.getItem('galabot_cam_url') || import.meta.env.VITE_ESP32_CAM_URL || '';
  });
  
  const [inputUrl, setInputUrl] = useState(camUrl);

  const handleConnect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCamUrl(inputUrl);
    localStorage.setItem('galabot_cam_url', inputUrl);
    setStreamError(false);
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-brown tracking-tight">Live Camera Feed</h1>
          <p className="text-gray-500 mt-1">Real-time ESP32-CAM optical stream from Galabot.</p>
        </div>
        
        {/* Dynamic IP Injector Form */}
        <form onSubmit={handleConnect} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm w-full lg:max-w-md shrink-0">
          <div className="flex-1 relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="w-4 h-4 text-gray-400" />
             </div>
             <input 
               type="url" 
               value={inputUrl}
               onChange={(e) => setInputUrl(e.target.value)}
               placeholder="e.g. http://192.168.1.51:81/stream" 
               className="block w-full pl-9 pr-3 py-2 border-none bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-brand-green/30 focus:bg-white transition-colors text-gray-700 font-bold outline-none"
             />
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-brand-brown hover:bg-brand-brown/90 text-white rounded-lg text-sm font-bold transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Set Stream</span>
          </button>
        </form>
      </div>

      <div className="flex-1 bg-brand-white border border-gray-200 rounded-2xl overflow-hidden relative shadow-sm flex flex-col items-center justify-center group">
        
        {!streamError && camUrl ? (
          <img 
            src={camUrl} 
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
              Unable to connect to the ESP32-CAM module. Ensure Galabot is powered on, connected to the network, and the stream URL matches your current DHCP IP address.
            </p>
            <button 
              onClick={() => handleConnect()}
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
            <span className={`w-2 h-2 rounded-full ${!streamError && camUrl ? 'bg-brand-green animate-pulse' : 'bg-red-500'}`}></span>
            {(!streamError && camUrl) ? 'LIVE' : 'OFFLINE'}
          </div>
          <div className="bg-brand-white/90 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 tracking-wider shadow-sm">
            ESP32-CAM MJPEG
          </div>
        </div>

      </div>
    </div>
  );
}
