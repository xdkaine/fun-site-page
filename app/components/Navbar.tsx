'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-black sticky top-0 z-50 py-6 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center">          
          {/* Centered Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group hover:scale-105 ${
                isActive('/')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${
                isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link
              href="/projects"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group hover:scale-105 ${
                isActive('/projects') || pathname?.startsWith('/projects')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Projects
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 ${
                isActive('/projects') || pathname?.startsWith('/projects') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          <div className="flex justify-between items-center">
            {/* Mobile Logo */}
            <Link 
              href="/" 
              className="text-xl font-bold text-gradient"
            >
              Kaine
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                }`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl">
              <div className="p-6 space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors ${
                    isActive('/')
                      ? 'text-black dark:text-white border-l-4 border-black dark:border-white pl-4'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white pl-4'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors ${
                    isActive('/projects') || pathname?.startsWith('/projects')
                      ? 'text-black dark:text-white border-l-4 border-black dark:border-white pl-4'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white pl-4'
                  }`}
                >
                  Projects
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}