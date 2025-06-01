'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/#services' },
  { name: 'Projects', path: '/#projects' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        left-1/2 -translate-x-1/2 top-6 z-50 rounded-full px-6 transition-all duration-300
        ${mounted ? 'fixed scale-100' : 'relative scale-95 opacity-0 pointer-events-none'}
        bg-black ${isSticky ? 'border border-neutral-800 shadow-md backdrop-blur-md bg-black/80' : 'bg-transparent border-0 shadow-none'}
        text-white
      `}
    >
      <div className="flex items-center justify-between gap-6 px-10 py-5 rounded-full">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-white font-bold text-2xl tracking-wide hover:text-gray-300 transition-colors"
          >
            LORENZO MAIURI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm transition-colors ${
                pathname === item.path.replace("#", "")
                  ? 'text-white font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/#contact"
            className="glow-button relative hidden md:inline-block bg-white text-black font-medium px-4 py-2 rounded-lg overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-gray-100 before:to-transparent before:animate-shimmer hover:bg-gray-200 transition-all"
          >
            Contact Me
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-black border-t border-neutral-800 py-4 px-4">
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block text-base ${
                  pathname === item.path.replace("#", "")
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
