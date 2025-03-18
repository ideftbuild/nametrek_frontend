'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Clouds from './components/Clouds';
import Stars from './components/Stars'
import useGameStore from '../../store/gameStore';
import { setSkyPhaseByWeather } from './services/SkyPhases';

const DynamicBackground = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const setIsDynamicBackground = useGameStore((state) => state.setIsDynamicBackground);
  
  useEffect(() => {
    if (error) {
      // Use default background when an error occurs 
      setIsDynamicBackground(false);
    }

  }, [error]);

  useEffect(() => {
    if (location) {
      setSkyPhaseByWeather(location, setWeather);
    } else {
      // Use default background when user doesn't grant permission or location is null at the time of execution
      setIsDynamicBackground(false);
    }
  }, [location]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (err) => setError(err.message),
    );
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen z-[-10] overflow-hidden">
      {/* Animated Sky Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={weather?.name}
          className={`absolute inset-0 bg-gradient-to-b ${weather?.colors} transition-all duration-[2000ms]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
      </AnimatePresence>

      {/* Floating Clouds */}
      {weather?.showClouds && <Clouds />}

      {/* Twinkling Stars */}
      {weather?.showStars && <Stars />}
    </div>
  );
};


export default DynamicBackground;
