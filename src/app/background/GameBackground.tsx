'use client';
import React, { useState, useEffect } from 'react';
import { Globe, Clock, Car, TreePalm, Cat, House } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Cloud from './components/Cloud';
import Clouds from './components/Clouds';
import Stars from './components/Stars'
import useUserLocation from '../hooks/useUserLocation';
import { skyPhases, setSkyPhaseByWeather } from './services/SkyPhases';

const GameBackground = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  const { location, error } = useUserLocation();

  useEffect(() => {
    if (error) {
      setWeather(skyPhases.default);
    }

  }, [error])

  useEffect(() => {

    if (location) {
      setSkyPhaseByWeather(location, setWeather)
    }
  }, [location]);

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


export default GameBackground;
