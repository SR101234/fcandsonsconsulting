import React from 'react';
import { Gem, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  onServiceSelect: (service: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onServiceSelect }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img src="2634_logo.png" alt="logo" className="h-12 w-auto bg-white" />
              <span className="font-bold text-1xl tracking-tight text-white">FC & Sons Consulting</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering your financial journey with expert advice and comprehensive wealth management solutions since 2004.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-blue">Services</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><button onClick={() => onServiceSelect('Mutual Funds')} className="hover:text-cyan-400 transition-colors text-left">Mutual Funds</button></li>
              <li><button onClick={() => onServiceSelect('Accounting & Taxation')} className="hover:text-cyan-400 transition-colors text-left">Taxation</button></li>
              <li><button onClick={() => onServiceSelect('Real Estate')} className="hover:text-cyan-400 transition-colors text-left">Real Estate</button></li>
              <li><button onClick={() => onServiceSelect('Forex')} className="hover:text-cyan-400 transition-colors text-left">Forex</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-blue">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-blue">Follow Us</h4>
            <div className="flex space-x-4">
              {/* <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue hover:text-white transition-all">
                <Facebook size={20} />
              </a> */}
              {/* <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue hover:text-white transition-all">
                <Twitter size={20} />
              </a> */}
              <a href="https://www.linkedin.com/company/fc-and-sons-consulting" target="_blank" className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
              {/* <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue hover:text-white transition-all">
                
              </a> */}
              <a
                href="https://wa.me/919012722233"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue hover:text-white transition-all"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p className="mb-1">Made with <span className="text-red-500">❤️</span> by <strong>Sharad Bansal</strong></p>
          <p>&copy; {new Date().getFullYear()} FC and Sons Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};