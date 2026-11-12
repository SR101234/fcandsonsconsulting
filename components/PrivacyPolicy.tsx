import React, { useEffect } from 'react';
import { X, User, Briefcase, MapPin, Phone, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close privacy policy"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={22} />
        </button>

        <h2 id="privacy-policy-title" className="mb-2 pr-10 text-3xl font-bold text-slate-900">
          Privacy Policy
        </h2>
        <p className="mb-6 text-sm text-slate-500">FC &amp; Sons Consulting · Version 1.0</p>

        <div className="space-y-5 text-sm leading-6 text-slate-700">
          <p>
            This policy explains how FC &amp; Sons Consulting handles personal data you provide
            through the website contact form. We use the information for the specific purpose of
            receiving, reviewing, and responding to your enquiry.
          </p>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">Information and purpose</h3>
            <p>
              The form asks for your name, email address, phone number, service interest, and
              message. We use these details to identify your enquiry, contact you about it, and
              maintain a record of the request and our response.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">Sharing and retention</h3>
            <p>
              Your enquiry is sent to our customer support team by email. Website hosting and
              email delivery providers may process the information to provide those services.
              We do not use this form submission to send unrelated marketing. Enquiry records are
              kept only as long as needed to handle the enquiry and meet applicable legal or
              record-keeping requirements, and are then deleted or anonymized.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">Your choices and requests</h3>
            <p>
              You may withdraw consent for future processing by contacting us. You may also
              contact us to request access to information about your enquiry, correction or
              erasure where applicable, or to raise a grievance. Withdrawal does not affect
              processing carried out before we receive your request, or processing required by
              law.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <h3 className="mb-2 font-semibold text-slate-900">Privacy &amp; Grievance Contact</h3>
            <p className="mb-4 text-slate-600">
              For questions, rights requests, or grievances relating to personal data, you may reach out to our designated contact person:
            </p>

            <div className="space-y-2.5 text-slate-700">
              <div className="flex items-center gap-2.5">
                <User size={18} className="shrink-0 text-brand-blue" />
                <span>
                  <strong className="text-slate-900">Contact Person Name:</strong> Ankur Mittal
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Briefcase size={18} className="shrink-0 text-brand-blue" />
                <span>
                  <strong className="text-slate-900">Designation:</strong> Director
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-blue" />
                <span>
                  <strong className="text-slate-900">Business Address:</strong> 4th floor, Padamdeep Tower, In Front Of Central Government Office, Sanjay Palace, Agra, Uttar Pradesh 282002
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={18} className="shrink-0 text-brand-blue" />
                <span>
                  <strong className="text-slate-900">Mobile Number:</strong>{' '}
                  <a href="tel:+91 90127 22233" className="font-semibold text-brand-blue underline hover:text-cyan-600">
                    +91 90127 22233
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={18} className="shrink-0 text-brand-blue" />
                <span>
                  <strong className="text-slate-900">Email Address:</strong>{' '}
                  <a
                    className="font-semibold text-brand-blue underline hover:text-cyan-600"
                    href="mailto:customersupport@fcandsonsconsulting.com"
                  >
                    customersupport@fcandsonsconsulting.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
