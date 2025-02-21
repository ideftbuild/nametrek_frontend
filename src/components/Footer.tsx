import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { SiGithub } from 'react-icons/si';


export const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-80 backdrop-blur-sm text-gray-200 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
                NameTrek
              </span>
            </h2>
            <p className="">
              Challenge your mind, test your speed, connect with others.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-yellow-300 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-yellow-300 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-yellow-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact/Social */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://github.com/ideftbuild" className="text-gray-400 hover:text-yellow-300 transition-colors">
                <SiGithub className="w-6 h-6" />
              </a>
              <Link href="/contact" className="text-gray-400 hover:text-yellow-300 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ideftbuild. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
