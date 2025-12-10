import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 drop-shadow-sm">
            Wealth Management <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">
              Redefined.
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Expert financial guidance for a prosperous future. From Mutual Funds to Real Estate, FC & Sons Consulting is your trusted partner in wealth creation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-brand-blue to-cyan-500 text-white text-lg font-bold rounded-full shadow-neon-blue hover:shadow-neon-strong transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Book Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 text-lg font-bold rounded-full hover:border-brand-blue hover:text-brand-blue transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* 3D Floating Elements */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {[
            { icon: TrendingUp, title: "Smart Growth", desc: "Maximize returns with data-driven insights.", delay: "" },
            { icon: ShieldCheck, title: "Secure Future", desc: "Robust insurance and risk management.", delay: "animation-delay-200" },
            { icon: PieChart, title: "Portfolio Balance", desc: "Diversified investments for stability.", delay: "animation-delay-500" },
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-3d hover:shadow-3d-hover card-3d border border-slate-50 animate-float ${idx === 1 ? 'animate-float-delayed' : ''}`}
              style={{ animationDelay: `${idx * 0.5}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-white rounded-2xl flex items-center justify-center mb-6 text-brand-blue shadow-inner transform rotate-3 transition-transform hover:rotate-6">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decor - Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter"></div>
         <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
         <div className="absolute -bottom-[10%] right-[20%] w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
      </div>
    </div>
  );
};