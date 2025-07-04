'use client';
import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { audiowide } from '../app/fonts';

export const Footer = () => {
  return (
    <footer className="rounded-t-2xl shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-yellow-300 p-1 rounded-xl">
              <p className={`text-1xl md:text-2xl font-bold bg-gray-900 px-8 py-2 rounded-lg text-white ${audiowide.className}`}>Challenge your mind, test your speed, connect with others.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className={`text-gray-900 text-lg font-semibold mb-4 ${audiowide.className}`}>Quick Links</h3>
            <nav className="text-purple-400">
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-purple-500 transition-colors ">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-purple-500 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-purple-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact/Social */}
          <div className="text-center md:text-right">
            <h3 className={`text-gray-900 text-lg font-semibold mb-4 ${audiowide.className}`}>Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://github.com/ideftbuild" className="text-purple-400 hover:text-purple-500 transition-colors">
                <SiGithub className="w-6 h-6" />
              </a>
              <Link href="/contact" className="text-purple-400 hover:text-purple-500 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-purple-400">
          <p>&copy; {new Date().getFullYear()} Ideftbuild. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
