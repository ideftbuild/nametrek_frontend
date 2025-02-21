'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import RulesModal from './RulesModal';
import { Menu, X } from 'lucide-react';

const AnimatedLogo: React.FC<{text: string}> = ({ text } ) => {
  return (
    <p className={"text-3xl text-center overflow-hidden"}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={"inline-block animate-drop"}
          style={{
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
          }}
        >
          <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
            {char}
          </span>
        </span>
      ))}

    </p>
  )
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-sm sticky w-full top-0 z-50 order-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">
              <AnimatedLogo text="NameTrek" />
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">

            <button className="text-white hover:text-yellow-300 transition-colors" onClick={() => setOpen(true)}>Rules</button>

            <RulesModal open={open} setOpen={setOpen} />
            <Link href="/" className="text-white hover:text-yellow-300 transition-colors">
              Play Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col items-start space-y-4">
              <button className="text-white hover:text-yellow-300 transition-colors" onClick={() => setOpen(true)}>Rules</button>

              <RulesModal open={open} setOpen={setOpen} />
              <Link href="/" className="text-white hover:text-yellow-300 transition-colors">
                Play Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
