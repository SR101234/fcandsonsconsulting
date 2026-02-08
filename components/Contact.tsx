import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { ContactForm } from '../types';
import { servicesList } from './Services';

interface ContactProps {
  selectedService: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedService }) => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    if (selectedService) {
      setForm(prev => ({ ...prev, subject: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    console.log("Submitting form:", form);

    try {
      const response = await fetch(
        'https://fcandsonsconsulting-back.vercel.app/send_info',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('idle');
        alert("Some error occurred. Please try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Failed to send request. Check your connection.");
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-brand-blue font-bold tracking-wide uppercase text-sm mb-2">Get in Touch</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Let's Discuss Your Financial Future</h3>
            <p className="text-lg text-slate-600 mb-10">
              Have a question about Mutual Funds, Insurance, or Taxation? Our team of experts is ready to assist you. Fill out the query form or visit our office.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-md text-brand-blue">
                  <MapPin size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-900">Our Office</h4>
                  <p className="text-slate-600">4th floor, Padamdeep Tower, In Front Of Central Government Office, Sanjay Palace, Agra, Uttar Pradesh 282002</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-md text-brand-blue">
                  <Mail size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-900">Email Us</h4>
                  <p className="text-slate-600">customersupport@fcandsonsconsulting.com<br /></p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-md text-brand-blue">
                  <Phone size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-900">Call Us</h4>
                  <p className="text-slate-600">+91 63995 88252<br /></p>
                  <p className="text-slate-600">+91 86309 50344<br /></p>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Query Form */}
          <div className="bg-white rounded-3xl p-8 shadow-3d relative">
            {status === 'success' ? (
              <div className="absolute inset-0 bg-white/90 rounded-3xl z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Query Received!</h4>
                <p className="text-slate-600 mb-4">Thank you. Our team has received your query and will contact you shortly.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 bg-brand-blue text-white rounded-full text-sm font-bold hover:bg-cyan-600 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : null}

            <h3 className="text-2xl font-bold text-slate-900 mb-6">Submit a Query</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Service Interest</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                >
                  <option value="">Select a Service</option>
                  {servicesList.map((service) => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${status === 'submitting' ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-blue hover:bg-cyan-500 hover:shadow-neon-blue'
                  }`}
              >
                {status === 'submitting' ? 'Saving...' : <>Send Message <Send size={20} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};