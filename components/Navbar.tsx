import React, { useState, useEffect } from 'react';
import { Menu, X, Gem } from 'lucide-react';
// import logo from "./2634_logo.png";

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Extract section ID from href (e.g., "#services" -> "services")
    const section = href.replace('#', '');
    
    if (onNavigate) {
      onNavigate(section || 'home');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 group cursor-pointer" 
            onClick={(e) => handleLinkClick(e, '#')}
          >
            <div className="p-2 rounded-lg group-hover:scale-110 transition-transform">
               <img src="2634_logo.png" alt="logo" className="h-12 w-auto" />
            </div>
            <span className={`font-extrabold text-2xl tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              FC & Sons Consulting
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-slate-600 hover:text-brand-blue font-semibold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="bg-brand-blue hover:bg-cyan-500 text-white px-6 py-2 rounded-full font-bold shadow-neon-blue hover:shadow-neon transition-all transform hover:-translate-y-1"
            >
              Get Started
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-brand-blue p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-blue-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};