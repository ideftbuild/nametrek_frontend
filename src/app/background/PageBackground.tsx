'use client';
import { Globe, Clock, Car, Cat, House, BookOpen } from 'lucide-react';
import useGameStore from '@/store/gameStore';
import DynamicBackground from './DynamicBackground';

const PageBackground = () => {

  const isDynamicBackground = useGameStore((state) => state.isDynamicBackground);

  return (
    <div className="fixed inset-0 w-full h-screen z-[-10] overflow-hidden">
      <div className="fixed inset-0 overflow-hidden z-[-15]">
        {/* Vibrant Game Background - Electric Blue to Neon Purple */}
        {isDynamicBackground ?
          <DynamicBackground />
          :
          <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF] via-[#6A5ACD] to-[#4B0082]"></div>
        }
      </div>

      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#00BFFF] opacity-20"></div>

      {/* Large faded globe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 mb-4 pt-10">
        <Globe className="w-96 h-96 text-white" />
      </div>

      {/* Decorative elements container with more game-like objects */}
      <div className="absolute inset-0">
        {/* Top row icons with glow effects */}
        <div className="absolute top-8 left-8">
          <House className="w-12 h-12 text-[#FF69B4] opacity-70" />
        </div>
        <div className="absolute top-16 right-16">
          <Car className="w-10 h-10 text-[#FFFF00] opacity-70" />
        </div>

        {/* Middle row icons with enhanced visibility */}
        <div className="absolute top-[31%] left-1/4 animate-bounce">
          <Cat className="w-12 h-12 text-[#FFA500] opacity-70" />
        </div>

        {/* Timer element with enhanced glow */}
        <div className="absolute bottom-12 right-12">
          <Clock className="w-16 h-16 text-[#00FFFF] opacity-70" />
        </div>

        {/* Using your existing icons but in different positions/colors */}
        <div className="absolute bottom-24 left-20">
          <BookOpen className="w-12 h-12 text-[#FF6347] opacity-70" />
        </div>

        {/* Enhanced motion lines with glow */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="motion-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF69B4" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Diagonal motion lines with glow effect */}
          <path
            d="M-100,600 L200,-100"
            stroke="url(#motion-gradient)"
            strokeWidth="3"
            className="opacity-40"
          />
          <path
            d="M0,700 L300,0"
            stroke="url(#motion-gradient)"
            strokeWidth="2"
            className="opacity-40"
          />
          <path
            d="M100,800 L400,100"
            stroke="url(#motion-gradient)"
            strokeWidth="4"
            className="opacity-40"
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
