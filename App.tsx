import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ServiceDetail } from './components/ServiceDetail';
import { ServiceItem } from './types';

function App() {
  const [viewingService, setViewingService] = useState<ServiceItem | null>(null);
  const [contactSubject, setContactSubject] = useState<string>('');

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
    <div className="bg-slate-50 min-h-screen">
      <Navbar onNavigate={handleNavigation} />
      
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