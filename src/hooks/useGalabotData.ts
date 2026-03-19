import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../services/firebase';

export interface GalabotData {
  battery: number;
  biocharLevel: number;
  location: { lat: number; lng: number };
  systemStatus: 'Online' | 'Offline';
  lastUpdated: number;
  pollutedTankLevel: number;
  filterTankLevel: number;
  communityTankLevel: number;
  mixerStatus: string;
  flowRate: number;
}

const mockData: GalabotData = {
  battery: 85,
  biocharLevel: 60,
  location: { lat: 6.6732, lng: -1.5670 }, // KNUST, Kumasi Example
  systemStatus: 'Online',
  lastUpdated: Date.now(),
  pollutedTankLevel: 90,
  filterTankLevel: 80,
  communityTankLevel: 65,
  mixerStatus: 'active',
  flowRate: 20
};

export function useGalabotData() {
  const [data, setData] = useState<GalabotData>(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase isn't configured, use mock data and set up an interval
    if (!rtdb) {
      const interval = setInterval(() => {
        setData(prev => ({
          ...prev,
          battery: Math.max(0, prev.battery - (Math.random() < 0.1 ? 1 : 0)), // Slowly drain battery
          biocharLevel: Math.max(0, prev.biocharLevel - (Math.random() < 0.2 ? 1 : 0)),
          pollutedTankLevel: Math.max(0, prev.pollutedTankLevel - (Math.random() > 0.5 ? 2 : 0)),
          filterTankLevel: Math.min(100, Math.max(0, prev.filterTankLevel + (Math.random() > 0.5 ? 2 : -2))),
          communityTankLevel: Math.min(100, Math.max(0, prev.communityTankLevel + (Math.random() > 0.4 ? 1 : -1))),
          lastUpdated: Date.now()
        }));
        setLoading(false);
      }, 3000);
      return () => clearInterval(interval);
    }

    // Real Firebase RTDB listener on the /biobot node
    const dbRef = ref(rtdb, 'biobot');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const d = snapshot.val();
        setData((prev) => ({
          ...prev,
          // Extract lat/lng directly from the node. We'll simulate battery/biochar if they aren't provided by the RTDB yet.
          location: {
            lat: d.lat ?? prev.location.lat,
            lng: d.lng ?? prev.location.lng,
          },
          battery: d.battery ?? prev.battery,
          biocharLevel: d.biocharLevel ?? prev.biocharLevel,
          pollutedTankLevel: d.pollutedTankLevel ?? prev.pollutedTankLevel,
          filterTankLevel: d.filterTankLevel ?? prev.filterTankLevel,
          communityTankLevel: d.communityTankLevel ?? prev.communityTankLevel,
          mixerStatus: d.mixerStatus ?? prev.mixerStatus,
          flowRate: d.flowRate ?? prev.flowRate,
          systemStatus: d.systemStatus ?? 'Online',
          lastUpdated: d.lastUpdated ?? Date.now()
        }));
      }
      setLoading(false);
    }, (error) => {
      console.error("Error listening to Biobot RTDB data: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, loading };
}
