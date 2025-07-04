'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Clouds from './components/Clouds';
import Stars from './components/Stars'
import useGameStore from '../../store/gameStore';
import { setSkyPhaseByWeather, skyPhases } from './services/SkyPhases';

const DynamicBackground = () => {
  const [weather, setWeather] = useState(skyPhases.default);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const setIsDynamicBackground = useGameStore((state) => state.setIsDynamicBackground);
  const setBgError = useGameStore((state) => state.setBgError);
  const bgError = useGameStore((state) => state.bgError);

  useEffect(() => {
    if (bgError) {
      // Use default background when an error occurs
      console.log('An error occured setting the dynamic back to false without changing default settings');
      setIsDynamicBackground(false);
    }

  }, [bgError, setIsDynamicBackground]);

  useEffect(() => {
    if (location) {
      setSkyPhaseByWeather(location, setWeather).then(null);
      setIsDynamicBackground(true);
    }
  }, [location, setIsDynamicBackground]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setBgError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (err) => { 
        console.error("Geolocation error:", err); // Log the actual error for debugging
        setBgError("Couldn't get location, possibly due to network issues.");
      },
    );
  }, [setBgError]);

  return (
    <div className={"fixed inset-0 w-full h-screen z-[-10] overflow-hidden"}>
      {/* Animated Sky Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={weather?.name}
          className={`absolute inset-0 bg-gradient-to-b ${weather.colors} transition-all duration-[2000ms]`}
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
