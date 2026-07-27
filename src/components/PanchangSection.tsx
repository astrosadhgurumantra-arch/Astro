import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Sun, 
  Moon, 
  Clock, 
  MapPin, 
  Calendar, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  RefreshCw
} from "lucide-react";
import { PanchangData } from "../types";

export function PanchangSection() {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState<string>("Noida, India");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);

  const fetchPanchang = async (targetDate: string, targetLoc: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/panchang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: targetDate,
          location: targetLoc,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate Vedic Panchang. Please check network or try again.");
      }

      const data = await response.json();
      setPanchangData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while communicating with the planetary coordinates server.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchPanchang(date, location);
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPanchang(date, location);
  };

  return (
    <div className="space-y-12">
      {/* Search & Configuration Header Card */}
      <div 
        id="panchang-calculator-container"
        className="max-w-4xl mx-auto p-6 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Cosmic Date
            </label>
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all cursor-pointer font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Observer Location
            </label>
            <input 
              type="text"
              placeholder="e.g. Noida, Uttar Pradesh"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all font-sans"
            />
          </div>

          <div>
            <button
              id="calculate-panchang-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 text-slate-950 text-sm font-bold uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Aligning Cosmic Spheres...
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  Calculate Muhurtas
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto p-4 rounded-xl border border-red-900/50 bg-red-950/20 text-red-400 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
          <div className="space-y-1">
            <p className="font-bold">Planetary Alignment Interrupted</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {loading && !panchangData && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-amber-500/10 border-t-amber-500 animate-spin" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-amber-500 font-bold animate-pulse">ॐ</span>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 animate-pulse">Reading Hindu Luni-Solar Ephemeris...</p>
        </div>
      )}

      {panchangData && (
        <div className="space-y-12 max-w-5xl mx-auto">
          
          {/* THE FIVE LIMBS OF PANCHANG */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500/50" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-500">The Five Pillars of Time (Pancha Anga)</h3>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Pillar 1: TITHI */}
              <div 
                id="panchang-pillar-tithi"
                className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 relative overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-slate-700 select-none">01</div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/70 block mb-1">Tithi (Lunar Phase)</span>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-tight">
                    {panchangData.tithi.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 italic mt-0.5">{panchangData.tithi.sanskritName}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-900">
                  <p className="text-[11px] text-slate-400 leading-relaxed">{panchangData.tithi.description}</p>
                  <p className="text-[10px] font-mono text-amber-500/60 mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-500" /> Deity: {panchangData.tithi.deityOrPlanet}
                  </p>
                </div>
              </div>

              {/* Pillar 2: NAKSHATRA */}
              <div 
                id="panchang-pillar-nakshatra"
                className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 relative overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-slate-700 select-none">02</div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/70 block mb-1">Nakshatra (Mansion)</span>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-tight">
                    {panchangData.nakshatra.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 italic mt-0.5">{panchangData.nakshatra.sanskritName}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-900">
                  <p className="text-[11px] text-slate-400 leading-relaxed">{panchangData.nakshatra.description}</p>
                  <p className="text-[10px] font-mono text-amber-500/60 mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-500" /> Lord: {panchangData.nakshatra.deityOrPlanet}
                  </p>
                </div>
              </div>

              {/* Pillar 3: YOGA */}
              <div 
                id="panchang-pillar-yoga"
                className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 relative overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-slate-700 select-none">03</div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/70 block mb-1">Yoga (Luni-Solar Angle)</span>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-tight">
                    {panchangData.yoga.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 italic mt-0.5">{panchangData.yoga.sanskritName}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-900">
                  <p className="text-[11px] text-slate-400 leading-relaxed">{panchangData.yoga.description}</p>
                  <p className="text-[10px] font-mono text-amber-500/60 mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-500" /> Ruler: {panchangData.yoga.deityOrPlanet}
                  </p>
                </div>
              </div>

              {/* Pillar 4: KARANA */}
              <div 
                id="panchang-pillar-karana"
                className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 relative overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-slate-700 select-none">04</div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/70 block mb-1">Karana (Half-Tithi)</span>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-tight">
                    {panchangData.karana.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 italic mt-0.5">{panchangData.karana.sanskritName}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-900">
                  <p className="text-[11px] text-slate-400 leading-relaxed">{panchangData.karana.description}</p>
                  <p className="text-[10px] font-mono text-amber-500/60 mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-500" /> Ruler: {panchangData.karana.deityOrPlanet}
                  </p>
                </div>
              </div>

              {/* Pillar 5: VARA */}
              <div 
                id="panchang-pillar-vara"
                className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 relative overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-slate-700 select-none">05</div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/70 block mb-1">Vara (Solar Day)</span>
                  <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-tight">
                    {panchangData.vara.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 italic mt-0.5">{panchangData.vara.sanskritName}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-900">
                  <p className="text-[11px] text-slate-400 leading-relaxed">{panchangData.vara.description}</p>
                  <p className="text-[10px] font-mono text-amber-500/60 mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-500" /> Planet: {panchangData.vara.deityOrPlanet}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* DYNAMIC TIMINGS AND SOLAR INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Sunrise, Sunset, Moonrise, Moonset Card */}
            <div 
              id="panchang-solar-lunar-timings"
              className="p-6 rounded-2xl border border-slate-800 bg-slate-950/50 space-y-6"
            >
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <h4 className="text-base font-bold text-slate-200 font-sans">Astro-Calculated Celestial Transits</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Sunrise</span>
                    <span className="text-sm font-bold text-slate-100">{panchangData.timings.sunrise}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-600">
                    <Sun className="w-5 h-5 opacity-80" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Sunset</span>
                    <span className="text-sm font-bold text-slate-100">{panchangData.timings.sunset}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/5 border border-sky-500/10 flex items-center justify-center text-sky-400">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Moonrise</span>
                    <span className="text-sm font-bold text-slate-100">{panchangData.timings.moonrise}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/5 border border-sky-500/10 flex items-center justify-center text-sky-500 opacity-80">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Moonset</span>
                    <span className="text-sm font-bold text-slate-100">{panchangData.timings.moonset}</span>
                  </div>
                </div>
              </div>

              {/* Informative Note about Latitude and Longitude */}
              <div className="p-3 bg-amber-950/5 border border-amber-500/10 rounded-xl flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  The planetary coordinates are pre-computed relative to local horizon coordinates of <span className="text-slate-200 font-semibold">{panchangData.location}</span>. Minor differences can occur depending on the specific Ayanamsa chosen (Lahiri system applied).
                </p>
              </div>
            </div>

            {/* Auspicious & Inauspicious Muhurtas Card */}
            <div 
              id="panchang-muhurtas-timings"
              className="p-6 rounded-2xl border border-slate-800 bg-slate-950/50 space-y-4"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <h4 className="text-base font-bold text-slate-200 font-sans">Muhurtas & Planetary Horas</h4>
              </div>

              <div className="space-y-3">
                {/* Abhijit Muhurta */}
                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">Abhijit Muhurta</span>
                    <p className="text-xs text-slate-400">Peak beneficial window for new ventures</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 px-2 py-1 rounded">
                    {panchangData.timings.abhijitMuhurta}
                  </span>
                </div>

                {/* Brahma Muhurta */}
                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">Brahma Muhurta</span>
                    <p className="text-xs text-slate-400">Best for meditation, prayers & yoga</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 px-2 py-1 rounded">
                    {panchangData.timings.brahmaMuhurta}
                  </span>
                </div>

                {/* Amrit Kaal */}
                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">Amrit Kaal</span>
                    <p className="text-xs text-slate-400">Divine nectar period for spiritual success</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 px-2 py-1 rounded">
                    {panchangData.timings.amritKaal}
                  </span>
                </div>

                {/* Rahu Kaal (Negative window) */}
                <div className="flex justify-between items-center p-3 rounded-xl bg-red-950/10 border border-red-500/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 block">Rahu Kaal</span>
                    <p className="text-xs text-slate-400">Inauspicious node; avoid major transactions</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-300 bg-red-500/5 border border-red-500/20 px-2 py-1 rounded">
                    {panchangData.timings.rahuKaal}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* SADHGURU MANTRA COSMIC GUIDANCE PANEL */}
          <div 
            id="panchang-cosmic-guidance"
            className="p-8 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-950 via-slate-950 to-amber-950/30 relative overflow-hidden space-y-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center max-w-xl mx-auto space-y-2 relative z-10">
              <span className="text-xs font-mono tracking-widest text-amber-500 uppercase flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Astro Sadhguru Mantra Celestial Guidance
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-amber-100">Spiritual Alignments & remedies</h4>
            </div>

            {/* Sadhguru's Spiritual Overview Summary */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 leading-relaxed text-xs sm:text-sm text-slate-300 space-y-2 relative z-10 font-sans">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500/80 block">Today's Alignment Summary</span>
              <p>{panchangData.cosmicGuidance.summary}</p>
            </div>

            {/* Sacred Mantra of the Day Highlight Container */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/5 to-yellow-600/5 border border-amber-500/30 shadow-[0_4px_30px_rgba(245,158,11,0.05)] text-center space-y-4 relative z-10">
              <div className="inline-flex w-12 h-12 rounded-full border border-amber-500/40 items-center justify-center text-amber-500 text-xl font-extrabold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                ॐ
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 block">Today's Sacred Vedic Remeidal Mantra</span>
                <p className="text-base sm:text-lg font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-300 leading-relaxed font-semibold">
                  {panchangData.cosmicGuidance.sadhguruMantra}
                </p>
              </div>
              <p className="text-xs text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
                Recite this planetary remedy 108 times during Brahma Muhurta or Sunrise to invoke cosmic blessings and bypass transit limitations.
              </p>
            </div>

            {/* Do's and Dont's + Ritual Advice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              
              {/* Do's Card */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Recommended Activities
                </span>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {panchangData.cosmicGuidance.auspiciousActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dont's Card */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Activities to Avoid
                </span>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {panchangData.cosmicGuidance.avoidActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ritual & Remedial Advice */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Sadhguru's Remedial Advice
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {panchangData.cosmicGuidance.ritualAdvice}
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
