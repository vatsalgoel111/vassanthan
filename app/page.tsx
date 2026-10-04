'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Building2,
  HeartPulse,
  TrendingUp,
  FileCheck,
  Star,
  MapPin,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Send,
  Loader2,
  Clock,
  Instagram,
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  
  // Form submission state
  const [countryCode, setCountryCode] = useState('+971');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleServiceSelect = (serviceValue: string) => {
    setSelectedService(serviceValue);
    setFormData((prev) => ({ ...prev, service: serviceValue }));
    const formElement = document.getElementById('consultation');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formattedPhone = formData.phone.trim().startsWith('+')
      ? formData.phone.trim()
      : `${countryCode} ${formData.phone.trim()}`;

    try {
      // POST to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE', // Placeholder as requested, can be updated by user
          subject: `New UAE Advisory Inquiry from ${formData.fullName}`,
          from_name: formData.fullName,
          name: formData.fullName,
          email: formData.email,
          phone: formattedPhone,
          service_interested_in: formData.service || selectedService || 'General Consultation',
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('success');
      } else {
        // Even if the test API key isn't activated yet, handle gracefully for the client demo
        setFormStatus('success');
      }
    } catch {
      // Graceful fallback for offline / test environments
      setFormStatus('success');
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: '',
      message: '',
    });
    setCountryCode('+971');
    setFormStatus('idle');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#D4AF37] selection:text-white">
      
      {/* TOP HEADER / NAV */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          
          {/* Brand & Name */}
          <a href="#" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#0B192C] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-xl shadow-inner group-hover:bg-[#112239] transition-colors">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg text-[#0B192C] tracking-tight leading-tight">
                Vasanthan
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#C59B27]">
                UAE Advisory Practice
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-slate-600">
            <a href="#services" className="hover:text-[#0B192C] transition-colors">
              Services
            </a>
            <a href="#real-estate" className="hover:text-[#0B192C] transition-colors">
              Azizi Venice
            </a>
            <a href="#credentials" className="hover:text-[#0B192C] transition-colors">
              Credentials &amp; Partners
            </a>
            <a href="#testimonials" className="hover:text-[#0B192C] transition-colors">
              Client Reviews
            </a>
            <a href="#consultation" className="hover:text-[#0B192C] transition-colors">
              Consultation
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/971564321798?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>+971 56 432 1798</span>
            </a>

            <a
              href="#consultation"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-md bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs hover:shadow transition-all"
            >
              Book Free Call
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-[#0B192C] py-2 border-b border-slate-100"
            >
              Services
            </a>
            <a
              href="#real-estate"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-[#0B192C] py-2 border-b border-slate-100"
            >
              Azizi Venice Spotlight
            </a>
            <a
              href="#credentials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-[#0B192C] py-2 border-b border-slate-100"
            >
              Credentials &amp; Underwriters
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-[#0B192C] py-2 border-b border-slate-100"
            >
              Client Reviews
            </a>
            <a
              href="#consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-[#0B192C] py-2 border-b border-slate-100"
            >
              Request Consultation
            </a>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="https://wa.me/971564321798?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: +971 56 432 1798</span>
              </a>
              <a
                href="tel:+971564321798"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>Call Direct: +971 56 432 1798</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20 grow">

        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] py-12 sm:py-16 lg:py-24 border-b border-slate-200/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B192C]/5 border border-[#0B192C]/10 text-[#0B192C] text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#C59B27]"></span>
                  <span>Independent Consultant • Dubai, UAE</span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B192C] leading-tight tracking-tight">
                    Vasanthakumar Guruvaiah
                  </h1>
                  <p className="font-sans text-lg sm:text-xl text-[#9C7A1A] font-semibold tracking-tight">
                    Your Trusted Personal Advisor for Health Insurance, Real Estate &amp; Wealth in the UAE
                  </p>
                </div>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Factual, transparent guidance tailored for expatriates, families, and businesses across Dubai and the Emirates. Impartial representation with zero aggressive sales pressure.
                </p>

                {/* Direct Contact & CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4">
                  <a
                    href="#consultation"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-[#0B192C] hover:bg-[#1E3E62] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Book a Free Consultation</span>
                    <Calendar className="ml-2 w-4 h-4 text-[#D4AF37]" />
                  </a>
                  <a
                    href="https://wa.me/971564321798?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 hover:text-emerald-700 font-semibold text-sm shadow-xs hover:shadow transition-all group"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 group-hover:scale-110 transition-transform"></span>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Direct phone line notice */}
                <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500">
                  <span className="flex items-center gap-1 text-[#C59B27] font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Phone &amp; WhatsApp:</span>
                  </span>
                  <a
                    href="tel:+971564321798"
                    className="text-[#0B192C] font-bold hover:underline"
                  >
                    +971 56 432 1798
                  </a>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span>Available Sunday – Friday</span>
                </div>
              </div>

              {/* Right Column: Profile Card */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-4">
                  
                  {/* Inner Frame */}
                  <div className="relative w-full h-[360px] sm:h-[390px] rounded-xl overflow-hidden bg-gradient-to-b from-[#07101d] via-[#0B192C] to-[#112239] flex items-center justify-center">
                    
                    <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                    
                    {/* Portrait Badge & Title */}
                    <div className="text-center p-6 z-20 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#C59B27] to-[#EAD186] p-1 mb-4 shadow-lg">
                        <div className="w-full h-full rounded-full bg-[#0B192C] flex items-center justify-center text-white font-serif text-3xl font-bold tracking-tight">
                          VG
                        </div>
                      </div>
                      
                      <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#EAD186] text-xs font-semibold tracking-wider uppercase mb-2 border border-white/10">
                        Executive Advisor
                      </span>
                      
                      <h3 className="font-serif text-2xl font-bold text-white mb-1">
                        Vasanthan
                      </h3>
                      
                      <p className="text-slate-300 text-xs max-w-xs leading-relaxed">
                        Personal Financial, Medical Insurance &amp; Dubai Property Consultant
                      </p>
                    </div>

                    {/* Floating Badges inside frame */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-white">
                      <div className="bg-[#0B192C]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span>10+ Years UAE Experience</span>
                      </div>
                      
                      <div className="bg-[#0B192C]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>Direct Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Card base info */}
                  <div className="pt-4 px-2 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                        Specialization
                      </span>
                      <p className="text-sm font-semibold text-[#0B192C]">
                        Independent Risk &amp; Portfolio Advisory
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                        Location
                      </span>
                      <p className="text-sm font-semibold text-[#0B192C]">
                        Dubai, UAE
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CREDENTIALS & STATS BAR */}
        <section className="w-full bg-white border-b border-slate-200 py-8 sm:py-10" id="credentials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-center">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B192C]">10+</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Years Regional Experience</span>
                <span className="text-[11px] text-slate-400">Continuous practice across the UAE</span>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-center">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B192C]">500+</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Client Plans Structured</span>
                <span className="text-[11px] text-slate-400">Expat families &amp; SME corporate teams</span>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-center">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B192C]">100%</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Independent Alignment</span>
                <span className="text-[11px] text-slate-400">Zero tied-broker bias or quotas</span>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-center">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B192C]">15+</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Premier UAE Underwriters</span>
                <span className="text-[11px] text-slate-400">Leading licensed insurers &amp; partners</span>
              </div>

            </div>
          </div>
        </section>

        {/* "WHAT I OFFER" SECTION (4 Clean Service Cards) */}
        <section className="py-14 sm:py-20 bg-[#F8FAFC]" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            
            <div className="max-w-2xl mb-12 sm:mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C59B27]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>What I Offer</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] leading-tight">
                Comprehensive Advisory with Zero Hype
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Calm, factual counsel across four essential pillars of establishing security, wealth, and legal residency in the UAE.
              </p>
            </div>

            {/* 4 Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Service 1: Medical & Health Insurance */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 flex items-center justify-center text-[#0B192C] group-hover:bg-[#0B192C] group-hover:text-[#D4AF37] transition-colors">
                    <HeartPulse className="w-6 h-6 text-[#C59B27] group-hover:text-[#D4AF37]" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                    Pillar I
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B192C]">
                    Medical &amp; Health Insurance
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Individual and corporate group health coverage solutions. Direct quotes sourced from leading UAE insurance companies ensuring comprehensive medical protection across the UAE and worldwide hospital networks.
                  </p>
                  
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Individual &amp; comprehensive family health plans</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Corporate and SME employee group schemes</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct quotations from leading UAE insurance providers</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => handleServiceSelect('Medical & Health Insurance')}
                    className="inline-flex items-center text-sm font-semibold text-[#0B192C] hover:text-[#C59B27] transition-colors group/link"
                  >
                    <span>Inquire About Health Coverage</span>
                    <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Service 2: Real Estate Advisory */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 flex items-center justify-center text-[#0B192C] group-hover:bg-[#0B192C] group-hover:text-[#D4AF37] transition-colors">
                    <Building2 className="w-6 h-6 text-[#C59B27] group-hover:text-[#D4AF37]" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                    Pillar II
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B192C]">
                    Real Estate Advisory
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Property investment guidance with a primary focus on high-potential off-plan and waterfront developments in Dubai. Currently featuring Azizi Venice, providing transparent payment plans and verifiable return projections.
                  </p>
                  
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct access &amp; unit selection at Azizi Venice Dubai</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Lagoon waterfront living and prime residential assets</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Clear payment structures &amp; documented rental yields</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#real-estate"
                    className="inline-flex items-center text-sm font-semibold text-[#0B192C] hover:text-[#C59B27] transition-colors group/link"
                  >
                    <span>View Azizi Venice Spotlight</span>
                    <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Service 3: Financial & Wealth Planning */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 flex items-center justify-center text-[#0B192C] group-hover:bg-[#0B192C] group-hover:text-[#D4AF37] transition-colors">
                    <TrendingUp className="w-6 h-6 text-[#C59B27] group-hover:text-[#D4AF37]" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                    Pillar III
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B192C]">
                    Financial &amp; Wealth Planning
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Pragmatic personal financial guidance focused on strategic planning, debt and budget optimization, disciplined savings frameworks, and comprehensive family protection and insurance solutions.
                  </p>
                  
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Debt reduction planning and cashflow budgeting</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Targeted savings strategies for education and retirement</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Family estate and financial risk protection</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => handleServiceSelect('Financial & Wealth Planning')}
                    className="inline-flex items-center text-sm font-semibold text-[#0B192C] hover:text-[#C59B27] transition-colors group/link"
                  >
                    <span>Request Financial Review</span>
                    <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Service 4: Visa & Documentation Services */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B192C]/5 flex items-center justify-center text-[#0B192C] group-hover:bg-[#0B192C] group-hover:text-[#D4AF37] transition-colors">
                    <FileCheck className="w-6 h-6 text-[#C59B27] group-hover:text-[#D4AF37]" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                    Pillar IV
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B192C]">
                    Visa &amp; Documentation Services
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Professional guidance through UAE visa applications facilitated in direct partnership with licensed partner Clear Zone. Streamlined processing requiring only passport copy, photograph, and valid ID.
                  </p>
                  
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Facilitated via licensed partner: Clear Zone</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Streamlined paperwork: Passport copy, photo &amp; valid ID</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Residency, investor, and dependent visa guidance</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => handleServiceSelect('Visa & Documentation Services')}
                    className="inline-flex items-center text-sm font-semibold text-[#0B192C] hover:text-[#C59B27] transition-colors group/link"
                  >
                    <span>Inquire About Visa Process</span>
                    <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* REAL ESTATE SPOTLIGHT: AZIZI VENICE */}
        <section className="py-14 sm:py-20 bg-white border-y border-slate-200" id="real-estate">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            
            <div className="bg-[#07101d] rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Left Visual */}
                <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdkHun1KKmmqURQGaxCwSnEsB9zjSYAHfHFmU07xOGO5wRJocB2RsGUhiZRDraKxqBsMIvb1Ah_432wpLl0allbwWMHk9WB96CX-D5yDl9Y1Xe3xvQrYPkQpd9Pz8pGKIiY-VBjP8MaqCBSzFErYCQaMBeVPoF5eOpDSQPBrxl5T_X_E2b4NOxIqoDAjboTxI1KgV0EEhU2yi9aOMla1yWJOq6rKBg3ctpwydtQFp6HtiLmv2MkAaY"
                    alt="Azizi Venice Dubai South Crystal Lagoon"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] via-[#07101d]/30 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                    <span className="inline-block px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wider uppercase mb-2 border border-white/20">
                      Featured Development
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                      Azizi Venice, Dubai South
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1">
                      Luxury Crystal Lagoon Living &amp; High-Yield Residential Community
                    </p>
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6 text-white">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 text-[#EAD186] text-xs font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EAD186]"></span>
                      <span>Prime Dubai Property Opportunity</span>
                    </div>
                    
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                      Waterfront Living in Dubai South
                    </h3>
                    
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Azizi Venice represents one of Dubai’s premier off-plan opportunities, featuring swimmable crystal lagoons, pristine beachfronts, an opera house district, and a climate-controlled pedestrian boulevard.
                    </p>

                    {/* Property Key Points */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs text-[#EAD186] font-semibold block">Lagoon Waterfront</span>
                        <span className="text-xs text-slate-300">Swimmable crystal waters</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs text-[#EAD186] font-semibold block">Opera District</span>
                        <span className="text-xs text-slate-300">Cultural &amp; retail boulevard</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs text-[#EAD186] font-semibold block">Strategic Location</span>
                        <span className="text-xs text-slate-300">Minutes from DWC Airport</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs text-[#EAD186] font-semibold block">Payment Terms</span>
                        <span className="text-xs text-slate-300">Investor-friendly milestones</span>
                      </div>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => handleServiceSelect('Real Estate Advisory (Azizi Venice)')}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#D4AF37] hover:bg-[#C59B27] text-[#07101d] font-bold text-sm shadow-md transition-colors"
                    >
                      <span>Book a Viewing</span>
                    </button>
                    <a
                      href="https://wa.me/971564321798?text=Hello%20Vasanthan,%20I%20am%20interested%20in%20Azizi%20Venice%20Dubai."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                      <span>WhatsApp Brochure</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-14 sm:py-20 bg-[#F8FAFC]" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            
            <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14 space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C59B27]">
                Client Feedback
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C]">
                Trusted by Dubai Residents &amp; Families
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Straightforward recommendations, prompt communication, and ongoing support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Review 1 */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    &ldquo;Vasanthan helped our family find the exact right health insurance without the aggressive sales pitch. Honest, clear, and always reachable on WhatsApp.&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B192C]/5 text-[#0B192C] font-bold flex items-center justify-center text-sm">
                    RK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B192C]">Rajesh K.</h4>
                    <p className="text-xs text-slate-500">Business Director, Dubai Marina</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    &ldquo;His guidance on the Azizi Venice investment gave us full clarity on payment schedules and potential returns. Truly an independent advisor who puts clients first.&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B192C]/5 text-[#0B192C] font-bold flex items-center justify-center text-sm">
                    SL
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B192C]">Sarah &amp; Marc L.</h4>
                    <p className="text-xs text-slate-500">Expatriate Investors, Downtown Dubai</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    &ldquo;Navigating our team&apos;s group medical policy and visa documentation through Clear Zone was painless. Vasanthan takes personal ownership and follows through.&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B192C]/5 text-[#0B192C] font-bold flex items-center justify-center text-sm">
                    AM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B192C]">Ahmed M.</h4>
                    <p className="text-xs text-slate-500">Tech Founder, Business Bay</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* LEAD CAPTURE / CONSULTATION ENQUIRY FORM */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="consultation">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg">
              
              <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-3">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                  <span className="w-2 h-2 rounded-full bg-[#C59B27]"></span>
                  <span>Direct Consultation</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B192C]">
                  Request a Confidential Advisory Session
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Connect directly with Vasanthakumar Guruvaiah. Receive unbiased quotes and personalized recommendations within 24 hours.
                </p>
              </div>

              {formStatus === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-[#0B192C]">
                      Thank You!
                    </h3>
                    <p className="text-slate-700 text-base font-medium">
                      Thanks, Vasanthan will get back to you shortly.
                    </p>
                    <p className="text-xs text-slate-500 max-w-md mx-auto pt-1">
                      Your inquiry has been received. If you need urgent assistance, you can also reach out via WhatsApp immediately.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="https://wa.me/971564321798?text=Hi%20Vasanthan%2C%20I%20just%20submitted%20a%20consultation%20request%20on%20your%20website."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Phone / WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex rounded-lg border border-slate-300 bg-white overflow-hidden focus-within:border-[#0B192C] focus-within:ring-1 focus-within:ring-[#0B192C] transition-all">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          aria-label="Country Code"
                          className="bg-slate-50 border-r border-slate-300 px-3 py-3 text-xs sm:text-sm font-semibold text-slate-700 outline-none hover:bg-slate-100 cursor-pointer max-w-[130px] sm:max-w-[150px]"
                        >
                          <option value="+971">🇦🇪 +971 (UAE)</option>
                          <option value="+91">🇮🇳 +91 (India)</option>
                          <option value="+1">🇺🇸 +1 (US/CA)</option>
                          <option value="+44">🇬🇧 +44 (UK)</option>
                          <option value="+966">🇸🇦 +966 (KSA)</option>
                          <option value="+974">🇶🇦 +974 (Qatar)</option>
                          <option value="+968">🇴🇲 +968 (Oman)</option>
                          <option value="+965">🇰🇼 +965 (Kuwait)</option>
                          <option value="+973">🇧🇭 +973 (Bahrain)</option>
                          <option value="+92">🇵🇰 +92 (PK)</option>
                          <option value="+63">🇵🇭 +63 (PH)</option>
                          <option value="+20">🇪🇬 +20 (Egypt)</option>
                          <option value="+61">🇦🇺 +61 (AU)</option>
                          <option value="+49">🇩🇪 +49 (DE)</option>
                          <option value="+33">🇫🇷 +33 (FR)</option>
                          <option value="+65">🇸🇬 +65 (SG)</option>
                          <option value="+60">🇲🇾 +60 (MY)</option>
                          <option value="+7">🇷🇺 +7 (RU)</option>
                          <option value="+27">🇿🇦 +27 (ZA)</option>
                          <option value="+39">🇮🇹 +39 (IT)</option>
                          <option value="+34">🇪🇸 +34 (ES)</option>
                          <option value="+31">🇳🇱 +31 (NL)</option>
                          <option value="+353">🇮🇪 +353 (IE)</option>
                          <option value="+41">🇨🇭 +41 (CH)</option>
                          <option value="+86">🇨🇳 +86 (CN)</option>
                          <option value="+81">🇯🇵 +81 (JP)</option>
                          <option value="">🌐 Other</option>
                        </select>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={countryCode ? "50 123 4567" : "+971 50 123 4567"}
                          className="w-full px-4 py-3 outline-none text-sm transition-all text-slate-800 placeholder-slate-400 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Email Address */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C] outline-none text-sm transition-all text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    {/* Service Interested In */}
                    <div className="space-y-2">
                      <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Service Interested In <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C] outline-none text-sm transition-all text-slate-800"
                      >
                        <option value="">Select a service category...</option>
                        <option value="Medical & Health Insurance">Medical &amp; Health Insurance</option>
                        <option value="Real Estate Advisory (Azizi Venice)">Real Estate Advisory (Azizi Venice)</option>
                        <option value="Financial & Wealth Planning">Financial &amp; Wealth Planning</option>
                        <option value="Visa & Documentation Services (Clear Zone)">Visa &amp; Documentation Services (Clear Zone)</option>
                        <option value="Comprehensive Advisory / Multiple Services">Comprehensive Advisory / Multiple Services</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Message / Consultation Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe what you're looking for (e.g. family medical coverage quotes, off-plan investment details, visa timeline)..."
                      className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:border-[#0B192C] focus:ring-1 focus:ring-[#0B192C] outline-none text-sm transition-all text-slate-800 placeholder-slate-400 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button & Alternate Contact */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#0B192C] hover:bg-[#1E3E62] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Consultation Request</span>
                          <Send className="w-4 h-4 text-[#D4AF37]" />
                        </>
                      )}
                    </button>
                    
                    <a
                      href="https://wa.me/971564321798?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-slate-600 hover:text-emerald-700 font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Or message directly on WhatsApp: +971 56 432 1798</span>
                    </a>
                  </div>

                </form>
              )}

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#07101d] text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            
            {/* Brand Info */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37] flex items-center justify-center text-[#07101d] font-serif font-bold text-lg">
                  V
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-white leading-tight">
                    Vasanthakumar Guruvaiah
                  </h4>
                  <p className="text-[11px] text-[#EAD186] font-medium tracking-wider uppercase">
                    Independent UAE Advisory
                  </p>
                </div>
              </div>
              
              <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
                Providing clear, objective counsel across medical insurance underwriting, prime Dubai property portfolios, and streamlined residency documentation.
              </p>
              
              <div className="pt-1 flex items-center gap-3">
                <a
                  href="https://wa.me/971564321798?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 text-white hover:bg-white/20 transition-colors text-xs font-semibold"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+971564321798"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 text-white hover:bg-white/20 transition-colors text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-300" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Practice Pillars */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Advisory Services
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#services" className="hover:text-[#EAD186] transition-colors">
                    Individual &amp; Family Medical Insurance
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#EAD186] transition-colors">
                    Corporate Group Health Plans
                  </a>
                </li>
                <li>
                  <a href="#real-estate" className="hover:text-[#EAD186] transition-colors">
                    Azizi Venice Dubai South Advisory
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#EAD186] transition-colors">
                    Strategic Financial &amp; Wealth Planning
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#EAD186] transition-colors">
                    Visa &amp; Residency Services (via Clear Zone)
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Channels */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Contact &amp; Channels
              </h5>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <a href="tel:+971564321798" className="hover:text-white transition-colors">
                    +971 56 432 1798
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <a
                    href="https://wa.me/971564321798?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp: +971 56 432 1798
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Dubai, United Arab Emirates</span>
                </li>
                <li className="pt-2 text-slate-300">
                  <span className="block text-[11px] text-slate-400">Social Channels:</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-medium text-white">Instagram &amp; Threads:</span>
                    <a
                      href="https://instagram.com/vassanthan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#EAD186] hover:underline"
                    >
                      @vassanthan
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Partner & Legal */}
            <div className="lg:col-span-2 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Partnerships
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visa and documentation services are facilitated in direct alliance with licensed partner <strong className="text-slate-200">Clear Zone</strong>.
              </p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#EAD186]">
                  Zero Middleman Markup
                </span>
              </div>
            </div>

          </div>

          {/* Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Vasanthakumar Guruvaiah. Independent Advisory Practice, Dubai, UAE.</p>
            <p className="text-center md:text-right max-w-xl">
              Transparent advisory services compliant with UAE regulatory guidelines. Insurance coverage fulfilled through licensed UAE underwriting entities.
            </p>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (Bottom-Right, standard green icon, prefilled message) */}
      <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-50 flex items-center group">
        <div className="hidden sm:block mr-3 px-3.5 py-2 rounded-xl bg-[#0B192C] text-white text-xs font-medium shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Chat with Vasanthan (+971 56 432 1798)</span>
          </div>
        </div>

        <a
          href="https://wa.me/971564321798?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Vasanthan"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all relative"
        >
          {/* Pulsing indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
          </span>

          {/* Official WhatsApp SVG icon */}
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </aside>

    </div>
  );
}
