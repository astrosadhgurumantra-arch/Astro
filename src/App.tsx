import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Compass, 
  MessageCircle, 
  Heart, 
  Star, 
  Calendar, 
  Phone,
  Grid,
  MapPin,
  Menu,
  X
} from "lucide-react";

import { zodiacSigns } from "./data/zodiacs";
import { ZodiacSign } from "./types";

// Import modular subcomponents
import Starfield from "./components/Starfield";
import ZodiacWheel from "./components/ZodiacWheel";
import HoroscopesSection from "./components/HoroscopesSection";
import LifeAndLoveSection from "./components/LifeAndLoveSection";
import WealthAndFinanceSection from "./components/WealthAndFinanceSection";
import AppointmentBooking from "./components/AppointmentBooking";
import Consultation from "./components/Consultation";
import logoImg from "./assets/images/spiritual_logo_triskelion_1784656467125.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "horoscope" | "love" | "wealth" | "consultation" | "book">("home");
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(zodiacSigns[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const contactWhatsApp = "+918882195832";
  const contactWhatsAppFormatted = "+91 88821 95832";

  const handleSelectSignFromWheel = (sign: ZodiacSign) => {
    setSelectedSign(sign);
  };

  const tabs = [
    { id: "home", label: "Temple Home", icon: Grid },
    { id: "horoscope", label: "Horoscopes", icon: Calendar },
    { id: "love", label: "Life & Love", icon: Heart },
    { id: "wealth", label: "Wealth & Finance", icon: Star },
    { id: "consultation", label: "AI Consultation", icon: Sparkles },
    { id: "book", label: "Book Appointment", icon: Compass }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-amber-500/30 overflow-x-hidden pb-16">
      {/* Immersive 3D Space Background */}
      <Starfield />

      {/* TOP DESKTOP HEADER BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-amber-500/10 px-4 py-3 sm:px-6 shadow-[0_10px_35px_rgba(4,4,12,0.8)] relative">
        {/* Divine Horizon bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        
        {/* Soft top border line with glowing golden sky ambience */}
        <div className="absolute top-0 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Spiritual Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 text-left cursor-pointer group relative"
          >
            {/* Outer golden spiritual aura ring that pulses on hover */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-600/30 blur-sm opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] transition-all duration-500 group-hover:scale-105 overflow-hidden border border-amber-500/30 relative z-10 bg-slate-900">
              <div className="absolute inset-0 bg-amber-500/15 mix-blend-overlay pointer-events-none group-hover:bg-amber-400/25 transition-colors duration-300"></div>
              <img 
                src={logoImg} 
                alt="Astro Sadhguru Mantra Logo" 
                className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.12] transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
            </div>
            
            <div className="relative z-10">
              <h1 className="text-base sm:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 font-serif drop-shadow-md select-none">
                Astro Sadhguru Mantra
              </h1>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[9px] sm:text-[10px] text-amber-500/80 font-mono tracking-[0.2em] uppercase block">
                  Vedic Astrology & Remedies
                </span>
                <Sparkles className="w-2.5 h-2.5 text-amber-400/80 animate-pulse hidden sm:inline" />
              </div>
            </div>
          </button>

          {/* Desktop Navigation Floating Dock */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 border border-amber-500/10 rounded-full px-2 py-1 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            {tabs.filter(tab => tab.id !== "home").map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-300 flex items-center gap-1.5 cursor-pointer select-none
                    ${
                      isActive
                        ? "text-amber-200"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                >
                  <IconComponent className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/15 to-yellow-600/10 border border-amber-500/30 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.12)]"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Premium Direct WhatsApp Helpline */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/40 border border-amber-500/15 rounded-full p-1 pl-3.5 backdrop-blur-md shadow-[0_4px_20px_rgba(4,4,12,0.4),inset_0_1px_1px_rgba(255,255,255,0.03)] hover:border-amber-500/30 hover:bg-slate-900/60 transition-all duration-300">
            <div className="text-right text-[10px] font-mono text-slate-400 hidden md:block pr-3 border-r border-amber-500/10">
              <div className="flex items-center justify-end gap-1.5 text-slate-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Divine Helpline</span>
              </div>
              <span className="text-amber-400 font-bold tracking-wider">{contactWhatsAppFormatted}</span>
            </div>
            <a
              id="header-whatsapp-connect"
              href={`https://wa.me/${contactWhatsApp}?text=Hare%20Krishna%21%20I%20am%20visiting%20the%20Astro%20Sadhguru%20Mantra%20portal%20and%20would%20like%20to%20receive%20a%20personal%20reading.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4.5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-[0_2px_10px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer relative overflow-hidden group/btn"
            >
              {/* Dynamic subtle white light shimmer shine on hover */}
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer pointer-events-none" />
              
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Connect Live</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-300 p-2.5 rounded-full hover:bg-slate-900/80 border border-slate-800/60 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* MOBILE EXPANDED MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-amber-500/15 absolute w-full left-0 z-30 overflow-hidden shadow-[0_20px_50px_rgba(4,4,12,0.9)]"
          >
            {/* Glowing inner border line for mobile drawer */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <div className="px-5 py-5 space-y-2">
              {tabs.filter(tab => tab.id !== "home").map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`mobile-nav-tab-${tab.id}`}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase text-left flex items-center gap-3 transition-all duration-300 cursor-pointer border
                      ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500/15 to-yellow-600/5 text-amber-200 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.08)]"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/40 border-transparent"
                      }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-amber-400 animate-pulse" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="pt-5 mt-4 border-t border-slate-900 grid grid-cols-2 gap-3 text-center text-xs font-mono">
                <a
                  id="mobile-whatsapp-btn"
                  href={`https://wa.me/${contactWhatsApp}?text=Hare%20Krishna%21%20I%20am%20visiting%20the%20Astro%20Sadhguru%20Mantra%20portal%20and%20would%20like%20to%20receive%20a%20personal%20reading.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/25 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.05)] hover:from-emerald-500 hover:to-emerald-600 hover:text-slate-950 transition-all duration-300"
                >
                  <MessageCircle className="w-4.5 h-4.5 fill-current" />
                  <span>WhatsApp Help</span>
                </a>
                <div className="p-3 text-[10px] text-amber-500/80 flex flex-col justify-center border border-amber-500/10 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl">
                  <span className="text-slate-500 text-[9px] uppercase tracking-wider block mb-0.5">Helpline Support</span>
                  <span className="font-bold tracking-wide text-amber-400">{contactWhatsAppFormatted}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE PAGES ROUTER WITH CELESTIAL TRANSITIONS */}
      <main className="max-w-7xl mx-auto py-6 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: TEMPLE HOME / LANDING */}
          {activeTab === "home" && (
            <motion.section
              key="home-section"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.4 }}
              className="px-4 sm:px-6"
            >
              
              {/* Spiritual Banner Headline */}
              <div className="text-center max-w-3xl mx-auto mt-6 mb-12 space-y-4">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold tracking-widest uppercase font-mono">
                  ✨ Ancient Vedic Wisdom Manifested ✨
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-wide leading-tight text-amber-100 drop-shadow-md">
                  Unravel Your Destiny with <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 italic">
                    Astro Sadhguru Mantra
                  </span>
                </h2>
                <p className="text-[17px] sm:text-lg font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200/90 to-amber-400 leading-relaxed max-w-2xl mx-auto tracking-wide drop-shadow-sm">
                  "Enter a sacred digital sanctuary where planetary alignments, celestial coordinates, and ancient remedies converge to illuminate your true life path."
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    id="hero-ai-consult-btn"
                    onClick={() => setActiveTab("consultation")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    Start Live AI Reading
                  </button>
                  <button
                    id="hero-book-session-btn"
                    onClick={() => setActiveTab("book")}
                    className="px-6 py-3 rounded-xl border border-amber-500/30 text-amber-300 hover:bg-amber-950/15 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Schedule 1-on-1 Session
                  </button>
                </div>
              </div>

              {/* 3D Visualizer & Sign Inspector Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-12">
                
                {/* Left Column: 3D Zodiac Compass Wheel */}
                <div className="lg:col-span-6 flex justify-center">
                  <ZodiacWheel 
                    onSelectSign={handleSelectSignFromWheel} 
                    selectedSign={selectedSign} 
                  />
                </div>

                {/* Right Column: Dynamic Interactive Sign inspector card */}
                <div className="lg:col-span-6">
                  {selectedSign ? (
                    <motion.div
                      key={selectedSign.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 sm:p-8 rounded-2xl border-2 border-amber-500/20 bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/10 shadow-[0_0_40px_rgba(245,158,11,0.08)] backdrop-blur-md relative"
                    >
                      <span className="text-[10px] font-mono text-amber-500 block uppercase tracking-widest">
                        Zodiac Intelligence
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-200 mt-1 font-sans flex items-center gap-2">
                        {selectedSign.symbol} {selectedSign.name}
                        <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                          {selectedSign.sanskritName}
                        </span>
                      </h3>
                      
                      <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                        {selectedSign.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-6 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Ruling Node</span>
                          <span className="text-amber-100 font-bold text-sm mt-0.5 block">{selectedSign.rulingPlanet}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Element Shield</span>
                          <span className="text-amber-100 font-bold text-sm mt-0.5 block">{selectedSign.element}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Remedial Gem</span>
                          <span className="text-amber-100 font-bold text-sm mt-0.5 block">{selectedSign.stone}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block">Color Aura</span>
                          <span className="text-amber-100 font-bold text-sm mt-0.5 block">{selectedSign.color}</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                        <button
                          id="inspect-horoscopes-btn"
                          onClick={() => {
                            setActiveTab("horoscope");
                          }}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800/80 text-amber-300 text-xs font-bold uppercase border border-amber-500/20 text-center cursor-pointer transition-colors"
                        >
                          View {selectedSign.name} Horoscopes
                        </button>
                        <a
                          id="whatsapp-direct-sign-query"
                          href={`https://wa.me/${contactWhatsApp}?text=Hare%20Krishna%20Astro%20Sadhguru%20Mantra.%20I%20am%20asking%20about%20my%20sign%20${selectedSign.name}%20(${selectedSign.sanskritName})%20and%20would%20like%20to%20know%20how%20to%20align%20my%20planets.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase text-center cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          Consult on {selectedSign.symbol}
                        </a>
                      </div>

                    </motion.div>
                  ) : (
                    <div className="p-10 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500">
                      Select a zodiac sign from the wheel to inspect your alignment coordinates.
                    </div>
                  )}
                </div>

              </div>

              {/* Bento Grid Features Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
                
                {/* Bento Card 1: Horoscopes */}
                <div 
                  id="bento-card-horoscopes"
                  onClick={() => setActiveTab("horoscope")}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/30 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors">Daily & Monthly Horoscopes</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Access our dynamic, AI-powered Vedic horoscope system. Receive real-time planetary transits, auspicious gems, mantras, and daily guidance for your specific ascendant sign.
                  </p>
                </div>

                {/* Bento Card 2: Life & Love */}
                <div 
                  id="bento-card-love"
                  onClick={() => setActiveTab("love")}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-pink-500/30 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-500/5 border border-pink-500/20 text-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-pink-300 transition-colors">Life & Love Compatibility</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Inspect your 5th and 7th relationship houses. Use our customized Guna Milan simulator to calculate compatibility metrics and receive specialized planetary remediation advice.
                  </p>
                </div>

                {/* Bento Card 3: Wealth & Finance */}
                <div 
                  id="bento-card-wealth"
                  onClick={() => setActiveTab("wealth")}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-yellow-500/30 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-yellow-200 transition-colors">Wealth, Money & Finance</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Analyze your Dhana Yogas in the 2nd, 8th, 9th, and 11th houses. Activate your material abundance gates through Jupiter and Venus spiritual remedies.
                  </p>
                </div>

              </div>

            </motion.section>
          )}

          {/* TAB 2: DYNAMIC HOROSCOPES SECTION */}
          {activeTab === "horoscope" && (
            <motion.section
              key="horoscope-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-4"
            >
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <span className="text-xs text-amber-500 font-mono tracking-widest uppercase block">
                  ✨ Real-time Planetary Transits ✨
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100">Daily & Monthly Horoscopes</h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Toggle between daily celestial projections and deeper monthly astrological matrices. Choose your ascendant sign to query Astro Sadhguru Mantra's live Vedic oracle.
                </p>
              </div>
              
              <HoroscopesSection />
            </motion.section>
          )}

          {/* TAB 3: LIFE & LOVE INDIVIDUAL PAGE */}
          {activeTab === "love" && (
            <motion.section
              key="love-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-4"
            >
              <LifeAndLoveSection />
            </motion.section>
          )}

          {/* TAB 4: WEALTH, MONEY & FINANCE PAGE */}
          {activeTab === "wealth" && (
            <motion.section
              key="wealth-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-4"
            >
              <WealthAndFinanceSection />
            </motion.section>
          )}

          {/* TAB 5: AI ASTRO CONSULTATION CHAT HUB */}
          {activeTab === "consultation" && (
            <motion.section
              key="consultation-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-4"
            >
              <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
                <span className="text-xs text-amber-500 font-mono tracking-widest uppercase block">
                  ✨ Spiritual Dialogue Chamber ✨
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100">Real-Time Astro Consultation</h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Engage in a live, real-time consultation with the Vedic intelligence representing Astro Sadhguru Mantra. Ask about marriage delays, career obstacles, business luck, or Kundalis.
                </p>
              </div>

              <Consultation />
            </motion.section>
          )}

          {/* TAB 6: 3D APPOINTMENT BOOKING FORM */}
          {activeTab === "book" && (
            <motion.section
              key="book-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="px-4"
            >
              <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
                <span className="text-xs text-amber-500 font-mono tracking-widest uppercase block">
                  ✨ Reserve Astrological Transit Alignments ✨
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100">Schedule Deep Natal Chart Session</h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Secure your personalized 1-on-1 spiritual consultation. Provide your exact birth parameters so our team can pre-compute your planetary house strengths.
                </p>
              </div>

              <AppointmentBooking />
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/60 bg-gradient-to-b from-slate-950/90 to-amber-950/20 py-12 px-4 mt-20 relative z-10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.3)] overflow-hidden border border-amber-500/40">
                <img 
                  src={logoImg} 
                  alt="Astro Sadhguru Mantra Logo" 
                  className="w-full h-full object-cover scale-[1.1]" 
                  referrerPolicy="no-referrer" 
                />
              </span>
              <h4 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 uppercase tracking-widest font-sans">
                Astro Sadhguru Mantra
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Combining Vedic cosmic algorithms with AI spiritual intelligence to illuminate paths of happiness, wealth, and divine love.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 bg-slate-900/50 px-2 py-1 rounded border border-slate-800">
                <Phone className="w-3.5 h-3.5 text-amber-500" /> {contactWhatsAppFormatted}
              </span>
              <span className="flex items-center gap-1 bg-slate-900/50 px-2 py-1 rounded border border-slate-800 text-left sm:text-right max-w-[200px] sm:max-w-none">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" /> KS Corporate Tower, Film City, Noida, Uttar Pradesh 201301
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-slate-800/60 text-center">
          <p className="text-[11px] text-slate-500 font-mono tracking-widest">
            © {new Date().getFullYear()} Astro Sadhguru Mantra. All Spiritual Rights Reserved.
          </p>
        </div>
      </footer>

      {/* FLOATING PULSING WHATSAPP LOTUS BUTTON */}
      <a
        id="floating-whatsapp-lotus"
        href={`https://wa.me/${contactWhatsApp}?text=Hare%20Krishna%21%20Astro%20Sadhguru%20Mantra.%20I%20am%20seeking%20urgent%20astrological%20assistance%20and%20remedies.%20Please%20guide%20me.`}
        target="_blank"
        rel="noopener noreferrer"
        title="Direct Astrologer Helpline"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.5)] transition-all transform hover:scale-110 active:scale-95 group animate-[bounce_6s_infinite] select-none cursor-pointer"
      >
        {/* Pulsing rings */}
        <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-60" />
        <span className="absolute -inset-1 rounded-full border border-emerald-500 animate-[pulse_1.5s_infinite] opacity-40" />
        
        {/* Glowing lotus visual (represented by a heart and sparkles) */}
        <div className="relative">
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-slate-950 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1.5 -right-1 text-slate-950 font-bold text-xs">ॐ</span>
        </div>
      </a>
    </div>
  );
}
