import { useState } from "react";
import { zodiacSigns } from "../data/zodiacs";
import { ZodiacSign } from "../types";
import { Sparkles, Calendar, Heart, CircleDollarSign, Loader2, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function HoroscopesSection() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(zodiacSigns[0]);
  const [timeframe, setTimeframe] = useState<"daily" | "monthly">("daily");
  const [aspect, setAspect] = useState<"general" | "love" | "wealth">("general");
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string>("");

  const handleGenerateHoroscope = async () => {
    setLoading(true);
    setReading("");
    try {
      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sign: selectedSign.name,
          timeframe: timeframe,
          aspect: aspect
        })
      });

      if (!response.ok) {
        throw new Error("Astral lines crossed. Planetary servers offline.");
      }

      const data = await response.json();
      setReading(data.text);
    } catch (error) {
      console.error(error);
      setReading(`Hare Krishna. We were unable to fetch the dynamic reading at this exact moment due to astronomical static. Here is a general outline for ${selectedSign.name}:\n\nYour ruling planet ${selectedSign.rulingPlanet} is influencing your houses. Focus on spiritual chanting and connect directly with Astro Sadhguru Mantra via WhatsApp at +91 88821 95832 for your specific planetary remediation chart.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Horoscopes Hub Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Zodiac Grid Selector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 backdrop-blur-sm">
            <h4 className="text-amber-100 font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" /> Select Ascendant Sign
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
              {zodiacSigns.map((sign) => {
                const isSelected = selectedSign.id === sign.id;
                return (
                  <button
                    key={sign.id}
                    id={`horoscope-selector-btn-${sign.id}`}
                    onClick={() => {
                      setSelectedSign(sign);
                      setReading(""); // clear current reading
                    }}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer group select-none
                      ${
                        isSelected
                          ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/20 border-amber-500 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)] scale-105"
                          : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                  >
                    <span className="text-xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform">
                      {sign.symbol}
                    </span>
                    <span className="text-[10px] font-semibold mt-1 max-w-full truncate">{sign.name}</span>
                    <span className="text-[8px] font-mono opacity-50 block">{sign.sanskritName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats of selected Sign with 3D look */}
          <motion.div
            key={selectedSign.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md relative overflow-hidden"
          >
            {/* Elegant 3D background shadow sign */}
            <div className="absolute right-2 bottom-2 text-7xl font-bold opacity-5 text-slate-100 pointer-events-none select-none">
              {selectedSign.symbol}
            </div>

            <h4 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <span>{selectedSign.name}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-500">{selectedSign.sanskritName}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {selectedSign.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4 text-[11px] font-mono">
              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 block uppercase">Ruling Planet</span>
                <span className="text-amber-100 font-semibold">{selectedSign.rulingPlanet}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 block uppercase">Element Aura</span>
                <span className="text-amber-100 font-semibold">{selectedSign.element}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 block uppercase">Spiritual Stone</span>
                <span className="text-amber-100 font-semibold">{selectedSign.stone}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
                <span className="text-slate-500 block uppercase">Date Window</span>
                <span className="text-amber-100 font-semibold">{selectedSign.dateRange}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Oracle Reading display and options */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Timeframe selector (Daily vs Monthly) */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 w-full md:w-auto">
              <button
                id="timeframe-daily-btn"
                onClick={() => {
                  setTimeframe("daily");
                  setReading("");
                }}
                className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5
                  ${
                    timeframe === "daily"
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Daily Horoscopes
              </button>
              <button
                id="timeframe-monthly-btn"
                onClick={() => {
                  setTimeframe("monthly");
                  setReading("");
                }}
                className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5
                  ${
                    timeframe === "monthly"
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Monthly Horoscopes
              </button>
            </div>

            {/* Aspect selector (General, Love, Wealth) */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 w-full md:w-auto">
              <button
                id="aspect-general-btn"
                onClick={() => {
                  setAspect("general");
                  setReading("");
                }}
                className={`flex-1 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer
                  ${aspect === "general" ? "bg-slate-800 text-amber-300 border border-amber-500/30" : "text-slate-400"}`}
              >
                General Life
              </button>
              <button
                id="aspect-love-btn"
                onClick={() => {
                  setAspect("love");
                  setReading("");
                }}
                className={`flex-1 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1
                  ${aspect === "love" ? "bg-slate-800 text-pink-400 border border-pink-500/30" : "text-slate-400"}`}
              >
                <Heart className="w-3 h-3 fill-current" />
                Love
              </button>
              <button
                id="aspect-wealth-btn"
                onClick={() => {
                  setAspect("wealth");
                  setReading("");
                }}
                className={`flex-1 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1
                  ${aspect === "wealth" ? "bg-slate-800 text-yellow-400 border border-yellow-500/30" : "text-slate-400"}`}
              >
                <CircleDollarSign className="w-3 h-3" />
                Wealth
              </button>
            </div>
          </div>

          {/* Reading Display Card */}
          <div className="min-h-[350px] rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/10 p-6 backdrop-blur-md flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              {loading ? (
                // Astro-loading spinner
                <div id="horoscope-reading-loading" className="flex flex-col items-center justify-center flex-1 py-12">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                  <span className="text-sm font-semibold font-sans text-amber-100 tracking-wide">
                    Summoning Astro Sadhguru Mantra Predictions...
                  </span>
                  <span className="text-xs text-slate-500 mt-1 font-mono">
                    Interpreting house positions for {selectedSign.name}
                  </span>
                </div>
              ) : reading ? (
                // Output reading with 3D slide animation
                <motion.div
                  id="horoscope-reading-text-wrapper"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs text-amber-500 font-mono tracking-widest uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Divine Horoscope Oracle
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded uppercase">
                      {timeframe} • {aspect}
                    </span>
                  </div>

                  <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap space-y-3 font-sans">
                    {reading}
                  </div>
                </motion.div>
              ) : (
                // Prompt to select sign and get reading
                <div id="horoscope-reading-prompt-box" className="flex flex-col items-center justify-center flex-1 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-amber-500/70" />
                  </div>
                  <h5 className="text-base font-bold text-slate-200">
                    Sacred predictions for {selectedSign.name} are ready to manifest
                  </h5>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-sm">
                    Choose daily or monthly insights, configure your focal aspect (Destiny, Love or Wealth), and click the button below to retrieve your spiritual chart.
                  </p>
                </div>
              )}
            </AnimatePresence>

            {/* Read button */}
            {!loading && (
              <div className="border-t border-slate-800 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-slate-500 font-mono text-center sm:text-left">
                  Predictions synchronized dynamically with real-time solar orbits.
                </span>
                <button
                  id="generate-horoscope-btn"
                  onClick={handleGenerateHoroscope}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-[0_2px_15px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  {reading ? "Regenerate Oracle Chart" : "Consult Cosmic Oracle"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
