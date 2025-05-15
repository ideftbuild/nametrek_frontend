'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import RulesModal from './RulesModal';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Orbitron } from 'next/font/google';
import useGameStore from '../store/gameStore';
import ToggleBtn from './ToggleBtn';

const orbitron = Orbitron({
  weight: '400', // Default weight
  subsets: ['latin'], // Only load required subsets
  display: 'swap',
});

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const bgError = useGameStore((state) => state.bgError);
  const setIsDynamicBackground = useGameStore((state) => state.setIsDynamicBackground);
  const isDynamicBackground = useGameStore((state) => state.isDynamicBackground);
  const bgPreferenceVariable = "dynamicBgEnabled";
  const isHomePage = usePathname() === '/';

  console.log("Default isDynamicBackground is set to: " + isDynamicBackground);

  const toggleBackground = () => {
    console.log("toggleBackground called");
    const newState = !isDynamicBackground;
    // Don't enable dynamic background when an error occured
    if (bgError != null && newState) {
      return;
    }
    setIsDynamicBackground(newState);
    localStorage.setItem(bgPreferenceVariable, String(newState));
  }

  return (
    <header className={`rounded-b-3xl sticky w-full top-0 z-50 ${orbitron.className}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-yellow-300 p-1 rounded-xl">
            <h1 className="text-1xl md:text-2xl font-bold bg-gray-900 px-8 py-2 rounded-lg text-white">
              Nametrek
            </h1>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ToggleBtn toggler={toggleBackground}/>

            <button className="text-white hover:text-blue-200 transition-colors bg-sky-300 p-2 rounded-md" onClick={() => setOpen(true)}>
              Rules
            </button>
            <RulesModal open={open} setOpen={setOpen} />
            { !isHomePage && (
              <Link href="/" className="text-white hover:text-blue-200 transition-colors bg-sky-300 p-2 rounded-md">
                Play Now
              </Link>
            )}
          </nav>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-blue-600 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col justify-center items-center space-y-4">
              <ToggleBtn toggler={toggleBackground}/>

              <button className="text-white hover:text-yellow-300 transition-colors bg-sky-300 p-2 rounded-md" onClick={() => setOpen(true)}>
                Rules
              </button>
              <RulesModal open={open} setOpen={setOpen} />
              { !isHomePage && (
                <Link href="/" className="text-white hover:text-yellow-300 transition-colors bg-sky-300 p-2 rounded-md">
                Play Now
              </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
