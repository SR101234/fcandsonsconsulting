import React, { useRef, useState } from 'react';
import { 
  Landmark, 
  TrendingUp, 
  Shield, 
  RefreshCcw, 
  Truck, 
  Calculator, 
  FileCheck, 
  Home, 
  Banknote, 
  PiggyBank 
} from 'lucide-react';
import { ServiceItem } from '../types';

export const servicesList: ServiceItem[] = [
  { 
    id: 1, 
    title: 'Mutual Funds', 
    description: 'Expertly managed investment portfolios.', 
    iconName: 'TrendingUp',
    longDescription: 'Unlock the potential of the equity and debt markets with our scientifically curated mutual fund portfolios. We analyze thousands of funds to select those that align strictly with your risk appetite and financial horizons, ensuring optimal returns over time.',
    features: [' personalized Risk Profiling', 'Quarterly Portfolio Rebalancing', 'SIP, SWP & Lumpsum Facilities', 'Tax Saving (ELSS) Recommendations']
  },
  { 
    id: 2, 
    title: 'Demat Services', 
    description: 'Secure and seamless electronic trading.', 
    iconName: 'Landmark',
    longDescription: 'Experience seamless trading and investing with our state-of-the-art Demat services. We provide a highly secure platform for holding your shares and securities electronically, effectively eliminating the risks associated with physical certificates and paperwork.',
    features: ['Zero Account Opening Charges', 'Lowest Brokerage Rates', 'Real-time Portfolio Analytics', 'Integrated Mobile Trading App']
  },
  { 
    id: 3, 
    title: 'Insurance', 
    description: 'Comprehensive Health & Vehicle coverage.', 
    iconName: 'Shield',
    longDescription: 'Protect what matters most with our comprehensive insurance solutions. Whether it is safeguarding your health against rising medical costs or insuring your vehicle against accidents, we provide policies with the best claim settlement ratios in the industry.',
    features: ['Cashless Hospitalization Network', '24/7 Claim Assistance', 'Comprehensive & Third-party Auto Cover', 'Critical Illness Riders']
  },
  { 
    id: 4, 
    title: 'Forex', 
    description: 'Competitive foreign exchange rates.', 
    iconName: 'RefreshCcw',
    longDescription: 'Navigate the global market with ease. Our Forex services offer competitive exchange rates for travel, education, and business purposes. We ensure compliance with all FEMA regulations while providing swift currency conversion and remittance services.',
    features: ['Best Market Rates', 'Multi-currency Travel Cards', 'Outward Remittance for Education', 'Doorstep Currency Delivery']
  },
  { 
    id: 5, 
    title: 'Customs Duty', 
    description: 'Navigating import/export taxes efficiently.', 
    iconName: 'Truck',
    longDescription: 'Streamline your international trade with our expert Customs Duty consultancy. We assist businesses in classifying goods correctly, calculating precise duties, and leveraging government schemes to minimize costs and avoid legal hurdles at the border.',
    features: ['HSN Code Classification', 'Duty Drawback Assistance', 'IGST Refund Processing', 'Import/Export Licensing']
  },
  { 
    id: 6, 
    title: 'Accounting & Taxation', 
    description: 'Precise bookkeeping and tax planning.', 
    iconName: 'Calculator',
    longDescription: 'Stay compliant and stress-free with our end-to-end accounting and taxation services. From maintaining daily ledgers to filing complex GST and Income Tax returns, our chartered accountants ensure your financial records are impeccable.',
    features: ['GST Registration & Filing', 'Income Tax Return (ITR)', 'Bookkeeping & Payroll', 'Tax Planning & Optimization']
  },
  { 
    id: 7, 
    title: 'Auditing & Assurance', 
    description: 'Internal and statutory audit services.', 
    iconName: 'FileCheck',
    longDescription: 'Enhance the credibility of your financial statements with our Auditing and Assurance services. We conduct thorough internal, statutory, and tax audits to identify discrepancies, improve operational efficiency, and ensure regulatory compliance.',
    features: ['Statutory Audit', 'Internal Control Review', 'Tax Audit (Section 44AB)', 'Due Diligence Reports']
  },
  { 
    id: 8, 
    title: 'Real Estate', 
    description: 'Property investment and management.', 
    iconName: 'Home',
    longDescription: 'Build tangible wealth with our Real Estate advisory. We help you identify high-growth residential and commercial properties, manage rental yields, and handle the legal documentation required for buying, selling, or leasing property.',
    features: ['Property Valuation', 'Legal Title Verification', 'Commercial Leasing', 'Investment Advisory']
  },
  { 
    id: 9, 
    title: 'Bill Discounting', 
    description: 'Improve cash flow with invoice financing.', 
    iconName: 'Banknote',
    longDescription: 'Don’t let unpaid invoices stall your business growth. Our Bill Discounting services provide you with immediate working capital by converting your accounts receivable into cash, allowing you to maintain a healthy cash flow cycle.',
    features: ['Instant Liquidity', 'Competitive Discount Rates', 'Off-balance Sheet Financing', 'Flexible Repayment Terms']
  },
  { 
    id: 10, 
    title: 'FD and Bonds', 
    description: 'Secure fixed income investment options.', 
    iconName: 'PiggyBank',
    longDescription: 'Secure your future with risk-free investment options. We offer a wide range of Corporate Fixed Deposits and Government Bonds that provide higher interest rates than traditional savings accounts, ensuring steady and guaranteed returns.',
    features: ['High Interest Corporate FDs', 'Sovereign Gold Bonds (SGB)', 'RBI Floating Rate Bonds', 'Senior Citizen Special Schemes']
  },
];

const IconMap: Record<string, React.ElementType> = {
  TrendingUp, Landmark, Shield, RefreshCcw, Truck, Calculator, FileCheck, Home, Banknote, PiggyBank
};

interface ServicesProps {
  onLearnMore: (service: ServiceItem) => void;
}

// 3D Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [shadow, setShadow] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Sensitivity
    const y = (e.clientY - top - height / 2) / 25;
    
    setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`);
    setShadow(`
      ${-x}px ${y}px 20px rgba(0, 0, 0, 0.05),
      0 20px 40px rgba(0, 146, 232, 0.2)
    `);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
    setShadow('');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="transition-all duration-200 ease-out h-full"
      style={{ transform, boxShadow: shadow ? shadow : undefined }}
    >
      {children}
    </div>
  );
};

export const Services: React.FC<ServicesProps> = ({ onLearnMore }) => {
  return (
    <section id="services" className="py-24 bg-white relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-brand-blue font-bold tracking-wide uppercase text-sm mb-2">Our Expertise</h2>
          <h3 className="text-4xl font-extrabold text-slate-900">Comprehensive Financial Services</h3>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            We offer a 360-degree approach to wealth management, ensuring every aspect of your financial life is optimized.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {servicesList.map((service, index) => {
            const Icon = IconMap[service.iconName];
            return (
              <div key={service.id} className="h-full" style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`, opacity: 0 }}>
                <TiltCard>
                  <div className="group relative bg-white border border-slate-100 rounded-2xl p-8 hover:border-brand-blue/30 shadow-xl flex flex-col h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col items-start h-full">
                      <div className="p-3 bg-blue-50 rounded-lg text-brand-blue mb-5 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 group-hover:scale-110">
                        <Icon size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                      <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{service.description}</p>
                      <div className="mt-auto">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onLearnMore(service); }}
                          className="text-sm font-bold text-brand-blue flex items-center hover:text-cyan-500 bg-transparent border-none cursor-pointer p-0 group/btn"
                        >
                          Learn more <span className="ml-1 transition-transform group-hover/btn:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};