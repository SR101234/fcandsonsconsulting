import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, TrendingUp, Landmark, Shield, RefreshCcw, Truck, Calculator, FileCheck, Home, Banknote, PiggyBank } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailProps {
  service: ServiceItem;
  onBack: () => void;
  onConsult: () => void;
}

const IconMap: Record<string, React.ElementType> = {
  TrendingUp, Landmark, Shield, RefreshCcw, Truck, Calculator, FileCheck, Home, Banknote, PiggyBank
};

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, onConsult }) => {
  const Icon = IconMap[service.iconName] || TrendingUp;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center text-slate-500 hover:text-brand-blue transition-colors mb-8 font-medium animate-fade-in-up"
        >
          <div className="p-2 bg-white rounded-full shadow-sm mr-3 group-hover:shadow-md transition-all">
            <ArrowLeft size={20} />
          </div>
          Back to Services
        </button>

        {/* Hero Section of the Detail Page */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
           <div className="absolute bottom-0 right-10 w-32 h-32 bg-cyan-100/50 rounded-full blur-2xl animate-pulse"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="p-6 bg-blue-50 rounded-2xl text-brand-blue shadow-inner animate-float">
                <Icon size={48} />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{service.title}</h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                  {service.longDescription}
                </p>
              </div>
           </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-3d border border-slate-100 h-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-brand-blue rounded-full mr-3 shadow-neon-blue"></span>
              Key Features
            </h3>
            <ul className="space-y-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start group" style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}>
                  <CheckCircle2 className="text-brand-blue mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-slate-700 font-medium text-lg group-hover:text-brand-blue transition-colors">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl text-white flex flex-col justify-center items-center text-center relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-transparent opacity-50"></div>
             
             <div className="relative z-10">
               <h3 className="text-3xl font-bold mb-4">Ready to optimize your {service.title}?</h3>
               <p className="text-slate-300 mb-8 max-w-md mx-auto">
                 Consult with our top-tier experts today and build a strategy tailored to your financial goals.
               </p>
               <button 
                 onClick={onConsult}
                 className="px-8 py-4 bg-gradient-to-r from-brand-blue to-cyan-400 text-white font-bold rounded-full shadow-neon-blue hover:shadow-neon-strong transition-all transform hover:-translate-y-1 hover:scale-105"
               >
                 Book a Consultation
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};