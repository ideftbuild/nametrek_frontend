'use client';
import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { Audiowide, Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  weight: '400', // Default weight
  subsets: ['latin'], // Only load required subsets
});

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
});

export const Footer = () => {
  return (
    <footer className="bg-[#D2B48C] text-gray-800 bg-opacity-40 rounded-t-2xl shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">
              <span className={`bg-pink-500 to-yellow-400 bg-clip-text text-transparent ${audiowide.className}`}>
                NameTrek
              </span>
            </h2>
            <p className="text-gray-700">Challenge your mind, test your speed, connect with others.</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className={`text-lg font-semibold mb-4 ${audiowide.className}`}>Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-[#8B4513] transition-colors text-gray-700">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#8B4513] transition-colors text-gray-700">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#8B4513] transition-colors text-gray-700">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact/Social */}
          <div className="text-center md:text-right text-black">
            <h3 className={`text-lg font-semibold mb-4 ${audiowide.className}`}>Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://github.com/ideftbuild" className="text-gray-600 hover:text-[#8B4513] transition-colors">
                <SiGithub className="w-6 h-6" />
              </a>
              <Link href="/contact" className="text-gray-600 hover:text-[#8B4513] transition-colors">
                <MessageCircle className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Ideftbuild. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
