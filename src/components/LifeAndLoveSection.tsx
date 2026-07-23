import { useState } from "react";
import { Heart, Sparkles, Compass, MessageCircle, HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { zodiacSigns } from "../data/zodiacs";
import loveImgSrc from "../assets/images/love_celestial_1784593277976.jpg";

export default function LifeAndLoveSection() {
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [partner1, setPartner1] = useState("aries");
  const [partner2, setPartner2] = useState("libra");
  const [gunaScore, setGunaScore] = useState<number | null>(null);
  const [gunaFeedback, setGunaFeedback] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  // Simulate Vedic Ashtakoot (Guna Milan) calculations
  const handleCalculateGuna = () => {
    setIsCalculating(true);
    setGunaScore(null);
    
    setTimeout(() => {
      // Create a deterministic but realistic score based on sign ids
      const charCodeSum = partner1.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) +
                         partner2.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const score = 16 + (charCodeSum % 20); // range 16 to 35 out of 36 Gunas
      setGunaScore(score);
      setIsCalculating(false);

      if (score < 18) {
        setGunaFeedback("Mridu Milan (18 is minimum required): Potential friction in temperaments. Planetary remediation like chanting Shukra mantras can neutralize doshas and create a smooth bonding aura.");
      } else if (score < 25) {
        setGunaFeedback("Uttam Milan (Good Match): Strong emotional resonance and shared core spiritual principles. Highly auspicious for marital longevity and family sync.");
      } else {
        setGunaFeedback("Ati-Uttam Milan (Excellent Divine Match): Exceptional karmic harmony. Your planetary souls are tightly aligned in the 5th and 7th houses of divine union.");
      }
    }, 1500);
  };

  const p1Details = zodiacSigns.find(z => z.id === partner1) || zodiacSigns[0];
  const p2Details = zodiacSigns.find(z => z.id === partner2) || zodiacSigns[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* 3D Visual Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        
        {/* Left Side: Premium 3D-feeling Image Container */}
        <div className="lg:col-span-5 relative group" style={{ perspective: "1000px" }}>
          {/* Glowing back aurorall effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500/10 to-violet-500/10 blur-2xl transform scale-105 group-hover:scale-110 transition-transform duration-500" />
          
          {/* Custom 3D tilt frame */}
          <motion.div
            id="love-3d-image-card"
            whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative overflow-hidden rounded-2xl border-2 border-pink-500/30 bg-slate-950 p-2 shadow-[0_15px_40px_rgba(236,72,153,0.15)] transform-gpu"
          >
            <img
              src={loveImgSrc}
              alt="Love Celestial"
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover rounded-xl"
            />
            {/* Overlay gold gradient frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/40 px-2 py-0.5 rounded uppercase font-mono font-bold tracking-widest">
                Karmic Synastry
              </span>
              <h4 className="text-lg font-bold text-slate-100 mt-2 font-sans tracking-tight">The Stars of Soul Union</h4>
              <p className="text-[11px] text-slate-400 mt-1">Vedic principles of cosmic matching (Gunamilan).</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Description and Intro to Love Houses */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-pink-500 font-mono tracking-widest uppercase flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-current" /> Sacred Union & Relationships
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold font-sans text-amber-100 tracking-tight leading-tight">
              Life & Love: Astrological Bonds of Fate
            </h3>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            In Vedic astrology, your emotional landscape and long-term marital bliss are governed by specific planetary positions and houses. Rather than simple coincidence, love is an exquisite cosmic synastry of previous life karmas (Purva-Punya) echoing in your current incarnation.
          </p>

          {/* 3D Bento Grid Elements for Love Houses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-pink-500/30 transition-colors">
              <h5 className="text-pink-400 font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 5th House: The Spark
              </h5>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Rules creative self-expression, romantic attraction, mutual infatuation, and past-life meritorious love bonds (Purvapunya).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-pink-500/30 transition-colors">
              <h5 className="text-pink-400 font-bold text-sm flex items-center gap-2">
                <Compass className="w-4 h-4" /> 7th House: Marriage
              </h5>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Rules the sacred bond of Vivaha, long-term business partnerships, public relations, and marital support synergy.
              </p>
            </div>
          </div>

          {/* Action triggers */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              id="love-learn-more-btn"
              onClick={() => setShowDeepDive(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-pink-600 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_15px_rgba(236,72,153,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
            >
              Learn More & Calculate Guna Milan
            </button>
            <a
              id="whatsapp-love-consultation-btn"
              href="https://wa.me/918882195832?text=Hare%20Krishna%21%20I%20am%20seeking%20guidance%20on%20my%20Life%2C%20Love%20and%20Relationship%20astrology.%20Can%20you%20analyze%20my%207th%20House%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-pink-500/30 text-pink-400 hover:bg-pink-950/10 hover:text-pink-300 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              WhatsApp Love Remediation
            </a>
          </div>
        </div>
      </div>

      {/* Deep-Dive modal when "Learn More" is clicked */}
      <AnimatePresence>
        {showDeepDive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              id="love-deep-dive-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-3xl bg-slate-900 border border-pink-500/30 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.2)] max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40 sticky top-0 z-10 backdrop-blur">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500 fill-current" />
                  <h4 className="text-amber-100 font-bold text-base sm:text-lg">Sacred Guna Milan & Relationship Secrets</h4>
                </div>
                <button
                  id="close-love-modal-btn"
                  onClick={() => setShowDeepDive(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-8">
                
                {/* Ashtakoot System explanation */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-pink-400 tracking-wider uppercase">The Ashtakoot (8-Aspect) Matching System</h5>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Vedic Synastry compares the couple's birth charts using 8 dynamic classifications (Kootas) adding up to a total of 36 points (Gunas). A successful compatibility reading provides calculations on:
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono mt-2">
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">1. Varna (1 Pt)</span> Spiritual capacity & alignment of goals.
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">2. Vashya (2 Pts)</span> Mutual control, magnetism, and dominance.
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">3. Tara (3 Pts)</span> Destiny path, safety, and longevity resonance.
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">4. Yoni (4 Pts)</span> Physical harmony and intimate biological attraction.
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">5. Graha Maitri (5 Pts)</span> Intellectual friendship of ruling planets.
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">6. Gana (6 Pts)</span> Temperament mapping (Deva, Manushya, Rakshasa).
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">7. Bhakoot (7 Pts)</span> Mutual luck, emotional sync, and prosperity.
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                      <span className="text-pink-400 font-bold block">8. Nadi (8 Pts)</span> Genetic health, lineage compatibility, and children.
                    </div>
                  </div>
                </div>

                {/* Simulated Guna Milan Calculator */}
                <div className="p-5 rounded-xl border border-pink-500/20 bg-slate-950/60 space-y-4">
                  <div className="text-center">
                    <h5 className="text-sm font-bold text-amber-200 flex items-center justify-center gap-1">
                      <Heart className="w-4.5 h-4.5 text-pink-500 fill-current" /> Guna Milan Alignment Simulator
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">Select both zodiac signs to calculate your Guna count and remedial guidance.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Partner 1 Sign */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 block font-mono">Your Zodiac Sign</label>
                      <select
                        id="partner-1-sign-select"
                        value={partner1}
                        onChange={(e) => {
                          setPartner1(e.target.value);
                          setGunaScore(null);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 uppercase"
                      >
                        {zodiacSigns.map(z => (
                          <option key={z.id} value={z.id}>{z.symbol} {z.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Partner 2 Sign */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 block font-mono">Partner's Zodiac Sign</label>
                      <select
                        id="partner-2-sign-select"
                        value={partner2}
                        onChange={(e) => {
                          setPartner2(e.target.value);
                          setGunaScore(null);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 uppercase"
                      >
                        {zodiacSigns.map(z => (
                          <option key={z.id} value={z.id}>{z.symbol} {z.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      id="guna-milan-calculate-btn"
                      onClick={handleCalculateGuna}
                      disabled={isCalculating}
                      className="px-6 py-2 rounded-lg bg-pink-500 text-white font-bold text-xs tracking-wider uppercase hover:bg-pink-600 transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto disabled:opacity-50"
                    >
                      {isCalculating ? "Consulting Ashtakoot Lines..." : "Calculate Compatibility Score"}
                    </button>
                  </div>

                  {/* Calculated Results */}
                  <AnimatePresence>
                    {gunaScore !== null && (
                      <motion.div
                        id="guna-score-results"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-center space-y-3"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl font-bold font-sans text-pink-400">{gunaScore}</span>
                          <span className="text-xs text-slate-400">/ 36 Gunas Aligned</span>
                        </div>

                        {/* Custom visual horizontal meter */}
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-gradient-to-r from-pink-500 to-violet-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${(gunaScore / 36) * 100}%` }}
                          />
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
                          {gunaFeedback}
                        </p>

                        <div className="pt-2">
                          <a
                            id="whatsapp-guna-remedy-msg"
                            href={`https://wa.me/918882195832?text=Hare%20Krishna%20Astro%20Sadhguru%20Mantra.%20We%20ran%20a%20Guna%20Milan%20synastry%20between%20${encodeURIComponent(p1Details.name)}%20and%20${encodeURIComponent(p2Details.name)}%20and%20received%20a%20score%20of%20${gunaScore}%2F36.%20Can%20you%20provide%20remedies%20for%20our%20union%3F`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            Discuss this score directly with Sadhguru Mantra
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/20 text-xs text-slate-400 leading-relaxed flex gap-2">
                  <HelpCircle className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-300">Spiritual Remediation Warning</span>
                    <span>No matter how low or high a compatibility score is, ancient Vedic rituals, customized fasts, and chanting specific planetary mantras can completely dissolve matching imperfections (Doshas) to bring divine harmony. Always seek Astro Sadhguru Mantra's direct analysis for highly accurate remedies.</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
