'use client';
import { useState, useEffect } from 'react';

export default function useUserLocation() {
  console.log("Getting user location");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    
    const run = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
        (err) => setError(err.message)
      );
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(run);
    } else {
      setTimeout(run, 500);  // fallback
    }
  }, []);
  
  return { location, error };
}
