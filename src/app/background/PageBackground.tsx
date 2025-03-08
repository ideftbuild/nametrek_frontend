'use client';
import React, { useState, useEffect } from 'react';
import { Globe, Clock, Car, TreePalm, Cat, House } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import useUserLocation from '../hooks/useUserLocation';

const PageBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-screen z-[-10] overflow-hidden">
      <div className="fixed inset-0 overflow-hidden">
        {/* Animated Sky Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-400/90"></div>

      </div>
      {/* Base gradient background */}
      
      {/* Large faded globe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pt-10">
        <Globe className="w-96 h-96 text-gray-600" />
      </div>
      
      {/* Decorative elements container */}
      <div className="absolute inset-0">
        {/* Top row icons */}
        <div className="absolute top-8 left-8 animate-bounce">
          <House className="w-12 h-12 text-purple-500 opacity-40" />
        </div>
        <div className="absolute top-16 right-16 animate-pulse">
          <Car className="w-10 h-10 text-red-500 opacity-40" />
        </div>
        
        {/* Middle row icons */}
        <div className="absolute top-1/3 left-1/4 animate-pulse">
          <TreePalm className="w-14 h-14 text-emerald-600 opacity-40" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-bounce">
          <Cat className="w-12 h-12 text-amber-500 opacity-40" />
        </div>
        
        {/* Timer element */}
        <div className="absolute bottom-12 right-12 animate-pulse">
          <Clock className="w-16 h-16 text-blue-600 opacity-50" />
        </div>
        
        {/* Motion lines */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="motion-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Diagonal motion lines */}
          <path 
            d="M-100,600 L200,-100" 
            stroke="url(#motion-gradient)" 
            strokeWidth="3"
            className="opacity-20"
          />
          <path 
            d="M0,700 L300,0" 
            stroke="url(#motion-gradient)" 
            strokeWidth="2"
            className="opacity-20"
          />
          <path 
            d="M100,800 L400,100" 
            stroke="url(#motion-gradient)" 
            strokeWidth="4"
            className="opacity-20"
          />
        </svg>
      </div>
      
      {/* Accessibility overlay for screen readers */}
      <div className="sr-only">
        Game background with decorative elements including a globe, icons representing different categories, and motion elements
      </div>
    </div>
  );
};

export default PageBackground;
