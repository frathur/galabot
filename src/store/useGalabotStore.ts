import { create } from 'zustand';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../services/firebase';

export interface DataPoint {
  time: string;
  battery: number;
  flowRate: number;
  biochar: number;
}

export interface SystemEvent {
  id: string;
  time: number;
  message: string;
  type: 'info' | 'warning' | 'alert';
}

export interface GalabotState {
  // Sensor State
  battery: number;
  biocharLevel: number;
  location: { lat: number; lng: number };
  systemStatus: 'Online' | 'Offline';
  lastUpdated: number;
  
  // Filtration State
  pollutedTankLevel: number;
  filterTankLevel: number;
  communityTankLevel: number;
  mixerStatus: string;
  flowRate: number;
  
  // App Intelligence
  history: DataPoint[];
  events: SystemEvent[];
  isInitializing: boolean;
  
  // Actions
  initialize: () => void;
  addEvent: (message: string, type: 'info'|'warning'|'alert') => void;
}

export const useGalabotStore = create<GalabotState>((set) => {
  let isListening = false;

  return {
    battery: 85,
    biocharLevel: 60,
    location: { lat: 6.6732, lng: -1.5670 }, // Default: KNUST, Kumasi
    systemStatus: 'Offline',
    lastUpdated: Date.now(),
    pollutedTankLevel: 90,
    filterTankLevel: 80,
    communityTankLevel: 65,
    mixerStatus: 'active',
    flowRate: 20,
    history: [],
    events: [
      { id: '1', time: Date.now() - 60000, message: 'System boot initialized successfully.', type: 'info' }
    ],
    isInitializing: false,
    
    addEvent: (message, type) => {
      set(state => ({
        events: [{ id: Math.random().toString(36).substring(7), time: Date.now(), message, type }, ...state.events].slice(0, 30)
      }));
    },

    initialize: () => {
      if (isListening) return;
      isListening = true;
      set({ isInitializing: true });

      // 1. Establish Firebase Listener
      if (rtdb) {
        const dbRef = ref(rtdb as any, 'biobot');
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            set((state) => {
              let lat = state.location.lat;
            let lng = state.location.lng;
            
            // Permissively cast to Number to support ESP32 sending metrics as strings
            if (data.lat !== undefined && data.lng !== undefined) {
               lat = Number(data.lat) || lat; 
               lng = Number(data.lng) || lng;
            } else if (data.location && data.location.lat !== undefined && data.location.lng !== undefined) {
               lat = Number(data.location.lat) || lat; 
               lng = Number(data.location.lng) || lng;
            }

            return {
              location: { lat, lng },
              battery: data.battery ?? state.battery,
              biocharLevel: data.biocharLevel ?? state.biocharLevel,
              pollutedTankLevel: data.pollutedTankLevel ?? state.pollutedTankLevel,
              filterTankLevel: data.filterTankLevel ?? state.filterTankLevel,
              communityTankLevel: data.communityTankLevel ?? state.communityTankLevel,
              mixerStatus: data.mixerStatus ?? state.mixerStatus,
              flowRate: data.flowRate ?? state.flowRate,
              systemStatus: data.systemStatus ?? 'Online',
              lastUpdated: data.lastUpdated ?? Date.now(),
              isInitializing: false
            };
            });
          } else {
            set({ isInitializing: false });
          }
        });
      } else {
        console.warn('Firebase RTDB not initialized. Running solely on local simulation physics.');
        set({ isInitializing: false });
      }

      // 2. Local Hardware Physics Simulation (Fills gaps natively if sensors are missing from RTDB)
      setInterval(() => {
        set((state) => {
           const newBattery = Math.max(0, state.battery - (Math.random() < 0.05 ? 1 : 0));
           const newBiochar = Math.max(0, state.biocharLevel - (Math.random() < 0.1 ? 1 : 0));
           let newPolluted = state.pollutedTankLevel;
           let newComm = state.communityTankLevel;
           
           if (newPolluted > 0) {
             // Transfer volume from Polluted to Community
             newPolluted = Math.max(0, newPolluted - 2);
             newComm = Math.min(100, newComm + 1.5);
           } else {
             // Infinite simulation loop refill
             newPolluted = 95;
             newComm = Math.max(0, newComm - 60); // Flush community
           }

           const newFilter = Math.min(100, Math.max(20, state.filterTankLevel + (Math.random() > 0.5 ? 1 : -1)));
           
           // Append Historical Tracking payload
           const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
           const newHistory = [...state.history];
           if (newHistory.length === 0 || newHistory[newHistory.length-1].time !== timeStr) {
             newHistory.push({ time: timeStr, battery: newBattery, flowRate: state.flowRate, biochar: newBiochar });
             if (newHistory.length > 25) newHistory.shift();
           }

           // Emit proactive logic alerts
           const newEvents = [...state.events];
           if (newBattery < 30 && state.battery >= 30) {
             newEvents.unshift({ id: Date.now().toString(), time: Date.now(), message: 'Warning: Power Cell critically low (<30%)', type: 'warning' });
           }
           if (newBiochar < 20 && state.biocharLevel >= 20) {
             newEvents.unshift({ id: Date.now().toString()+'1', time: Date.now(), message: 'Alert: Biochar media depletion imminent.', type: 'alert' });
           }
           if (newFilter >= 95 && state.filterTankLevel < 95) {
             newEvents.unshift({ id: Date.now().toString()+'2', time: Date.now(), message: 'Caution: Filter System nearing maximum capacity!', type: 'warning' });
           }

           return {
             battery: newBattery,
             biocharLevel: newBiochar,
             pollutedTankLevel: newPolluted,
             filterTankLevel: newFilter,
             communityTankLevel: newComm,
             lastUpdated: Date.now(),
             history: newHistory,
             events: newEvents.slice(0, 30) // retain 30 records
           };
        });
      }, 1500);
    }
  };
});
