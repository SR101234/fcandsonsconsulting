import React, { useState } from 'react';
import { Calculator as CalculatorIcon, Mail } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ServiceDetail } from './components/ServiceDetail';
import { Calculator } from './components/Calculator';
import { ServiceItem } from './types';

function App() {
  const [viewingService, setViewingService] = useState<ServiceItem | null>(null);
  const [contactSubject, setContactSubject] = useState<string>('');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleLearnMore = (service: ServiceItem) => {
    setViewingService(service);
    window.scrollTo(0, 0);
  };

  const handleConsultationRequest = () => {
    if (viewingService) {
      setContactSubject(viewingService.title);
      setViewingService(null); // Go back to home
      // Wait for render then scroll
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleNavigation = (section: string) => {
    setViewingService(null);
    // If navigating to a specific section (not home), scroll there after view resets
    if (section !== 'home' && section !== '') {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Footer navigation handler
  const handleFooterServiceSelect = (serviceName: string) => {
    setContactSubject(serviceName);
    setViewingService(null);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <Navbar
        onNavigate={handleNavigation}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Sticky Calculator Button */}
      <button
        onClick={() => setIsCalculatorOpen(true)}
        /* Changed right-0 to left-0, and rounded-l-xl to rounded-r-xl */
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-brand-blue hover:bg-cyan-500 text-white py-4 px-1.5 rounded-r-xl shadow-lg hover:shadow-neon-blue transition-all transform hover:translate-x-1 flex flex-col items-center gap-3 group border-r border-t border-b border-white/20"
        title="Open SIP/Lumpsum Calculator"
      >
        <CalculatorIcon size={24} className="group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-bold tracking-widest uppercase opacity-90 group-hover:opacity-100">
          Calculator
        </span>
      </button>

      {/* Calculator Modal remains the same */}
      <Calculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

       <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-brand-blue hover:bg-cyan-500 text-white py-4 px-1.5 rounded-l-xl shadow-lg hover:shadow-neon-blue transition-all transform hover:-translate-x-1 flex flex-col items-center gap-3 group border-l border-t border-b border-white/20"
        title="Contact Us"
      >
        <Mail size={24} className="group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-bold tracking-widest uppercase opacity-90 group-hover:opacity-100">
          Contact
        </span>
      </a>

      <main>
        {viewingService ? (
          <ServiceDetail
            service={viewingService}
            onBack={() => setViewingService(null)}
            onConsult={handleConsultationRequest}
          />
        ) : (
          <>
            <Hero />
            <Services onLearnMore={handleLearnMore} />
          </>
        )}

        {/* Contact section is always visible at bottom, but we scroll to it when needed */}
        <Contact selectedService={contactSubject} />
      </main>

      <Footer onServiceSelect={handleFooterServiceSelect} />

    </div>
  );
}

export default App;