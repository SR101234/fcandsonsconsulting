import React, { useState, useEffect } from 'react';
import { X, PieChart as PieChartIcon, TrendingUp, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum'>('sip');
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const [result, setResult] = useState({
    invested: 0,
    returns: 0,
    total: 0
  });

  // Reset defaults when switching tabs
  useEffect(() => {
    if (activeTab === 'sip') {
      setAmount(5000);
    } else {
      setAmount(100000);
    }
  }, [activeTab]);

  useEffect(() => {
    let investedVal = 0;
    let totalVal = 0;
    let returnsVal = 0;

    if (activeTab === 'sip') {
      investedVal = amount * years * 12;
      const monthlyRate = rate / 100 / 12;
      const months = years * 12;
      // SIP Formula: P * ({[1 + i]^n - 1} / i) * (1 + i)
      if (rate === 0) {
          totalVal = investedVal;
      } else {
          totalVal = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      }
    } else {
      investedVal = amount;
      // Lumpsum Formula: P * (1 + r/100)^n
      totalVal = amount * Math.pow(1 + rate / 100, years);
    }

    returnsVal = totalVal - investedVal;

    setResult({
      invested: Math.round(investedVal),
      returns: Math.round(returnsVal),
      total: Math.round(totalVal)
    });
  }, [activeTab, amount, rate, years]);

  if (!isOpen) return null;

  const data = [
    { name: 'Invested', value: result.invested },
    { name: 'Returns', value: result.returns }
  ];

  const COLORS = ['#94a3b8', '#0ea5e9']; // slate-400, sky-500

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 hover:text-red-500 transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Left Side: Inputs */}
        <div className="p-6 md:p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                <PieChartIcon size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Return Calculator</h2>
                <p className="text-sm text-slate-500">Plan your financial future</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8">
            <button
              onClick={() => setActiveTab('sip')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'sip'
                  ? 'bg-white text-brand-blue shadow-sm ring-1 ring-black/5'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <TrendingUp size={16} /> SIP
            </button>
            <button
              onClick={() => setActiveTab('lumpsum')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'lumpsum'
                  ? 'bg-white text-brand-blue shadow-sm ring-1 ring-black/5'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <IndianRupee size={16} /> Lumpsum
            </button>
          </div>

          <div className="space-y-8 flex-grow">
            {/* Amount Input */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-slate-700">
                  {activeTab === 'sip' ? 'Monthly Investment' : 'Total Investment'}
                </label>
                <div className="bg-white px-3 py-1 rounded-lg text-brand-blue font-bold text-sm shadow-sm border border-slate-100">
                  ₹ {amount.toLocaleString()}
                </div>
              </div>
              <input
                type="range"
                min={activeTab === 'sip' ? 500 : 5000}
                max={activeTab === 'sip' ? 100000 : 10000000}
                step={activeTab === 'sip' ? 500 : 5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue hover:accent-cyan-500 transition-all"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                  <span>₹ {activeTab === 'sip' ? '500' : '5K'}</span>
                  <span>₹ {activeTab === 'sip' ? '1L' : '1Cr'}</span>
              </div>
            </div>

            {/* Rate Input */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-slate-700">Expected Return (p.a)</label>
                <div className="bg-white px-3 py-1 rounded-lg text-brand-blue font-bold text-sm shadow-sm border border-slate-100">
                  {rate} %
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue hover:accent-cyan-500 transition-all"
              />
               <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                  <span>1%</span>
                  <span>30%</span>
              </div>
            </div>

            {/* Years Input */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between mb-4">
                <label className="text-sm font-bold text-slate-700">Time Period</label>
                <div className="bg-white px-3 py-1 rounded-lg text-brand-blue font-bold text-sm shadow-sm border border-slate-100">
                  {years} Years
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue hover:accent-cyan-500 transition-all"
              />
               <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                  <span>1 Yr</span>
                  <span>40 Yrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="p-6 md:p-8 md:w-1/2 bg-slate-50/50 flex flex-col justify-center relative">
           {/* Background Decor */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          <div className="h-64 w-full mb-8 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `₹ ${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#334155', fontWeight: 600 }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: 500 }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
               <div className="text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total</p>
                  <p className="text-lg font-black text-slate-800">
                    {result.total >= 10000000 
                        ? `₹ ${(result.total / 10000000).toFixed(2)}Cr` 
                        : `₹ ${(result.total / 100000).toFixed(2)}L`}
                  </p>
               </div>
            </div>
          </div>

          <div className="space-y-4 z-10">
            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-slate-200/60">
              <span className="text-slate-500 font-semibold text-sm">Invested Amount</span>
              <span className="text-lg font-bold text-slate-800">₹ {result.invested.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-slate-200/60">
              <span className="text-slate-500 font-semibold text-sm">Est. Returns</span>
              <span className="text-lg font-bold text-brand-blue">₹ {result.returns.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-5 bg-gradient-to-r from-brand-blue to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20 text-white transform transition-transform hover:scale-[1.02]">
              <span className="font-bold opacity-90 text-sm uppercase tracking-wide">Total Value</span>
              <span className="text-2xl font-black">₹ {result.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};