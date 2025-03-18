'use client';
import { Globe, Clock, Car, TreePalm, Cat, House, BookOpen, CircleDashed } from 'lucide-react';
import useGameStore from '../../store/gameStore';
import DynamicBackground from './DynamicBackground.tsx';

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
        
        {/* Animated particle overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] opacity-30"></div>
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
        <div className="absolute top-8 left-8 animate-bounce">
          <House className="w-12 h-12 text-[#FF69B4] opacity-70 drop-shadow-[0_0_8px_rgba(255,105,180,0.7)]" />
        </div>
        <div className="absolute top-16 right-16 animate-pulse">
          <Car className="w-10 h-10 text-[#FFFF00] opacity-70 drop-shadow-[0_0_8px_rgba(255,255,0,0.7)]" />
        </div>
        
        {/* Middle row icons with enhanced visibility */}
        <div className="absolute top-1/3 left-1/4 animate-pulse">
          <TreePalm className="w-14 h-14 text-[#32CD32] opacity-70 drop-shadow-[0_0_8px_rgba(50,205,50,0.7)]" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-bounce">
          <Cat className="w-12 h-12 text-[#FFA500] opacity-70 drop-shadow-[0_0_8px_rgba(255,165,0,0.7)]" />
        </div>
        
        {/* Timer element with enhanced glow */}
        <div className="absolute bottom-12 right-12 animate-pulse">
          <Clock className="w-16 h-16 text-[#00FFFF] opacity-70 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]" />
        </div>
        
        {/* Using your existing icons but in different positions/colors */}
        <div className="absolute bottom-24 left-20 animate-bounce">
          <CircleDashed className="w-10 h-10 text-[#FF6347] opacity-70 drop-shadow-[0_0_8px_rgba(255,99,71,0.7)]" />
        </div>
        <div className="absolute top-24 left-1/3 animate-pulse">
          <BookOpen className="w-12 h-12 text-[#9370DB] opacity-70 drop-shadow-[0_0_8px_rgba(147,112,219,0.7)]" />
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
