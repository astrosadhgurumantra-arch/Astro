import { CircleDollarSign, Coins, TrendingUp, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function WealthAndFinanceSection() {
  // Wealth image from generated asset path
  const wealthImgSrc = "/src/assets/images/wealth_celestial_1784593288813.jpg";

  const financialHouses = [
    {
      house: "2nd House: Dhana Bhava",
      title: "Accumulated Assets & Cash",
      desc: "Represents your bank balance, liquid wealth, family assets, jewelry, valuable acquisitions, and speech patterns that attract client prosperity.",
      color: "border-yellow-500/20 hover:border-yellow-500/50"
    },
    {
      house: "5th House: Purva Punya",
      title: "Speculation & Windfalls",
      desc: "Controls fortunes made through the stock market, intellectual properties, lottery, creative ventures, and spiritual merits accumulated in previous lifespans.",
      color: "border-yellow-500/20 hover:border-yellow-500/50"
    },
    {
      house: "8th House: Randhra Bhava",
      title: "Inheritances & Secret Gains",
      desc: "Governs hidden treasures, unearned wealth, sudden inheritances, tax refunds, insurances, or partner assets which arrive unexpectedly.",
      color: "border-yellow-500/20 hover:border-yellow-500/50"
    },
    {
      house: "9th House: Dharma Bhava",
      title: "Divine Fortune & luck",
      desc: "The house of ultimate fortune, destiny, ethics, spiritual gurus, and grandfatherly blessings which smooth out career friction.",
      color: "border-yellow-500/20 hover:border-yellow-500/50"
    },
    {
      house: "11th House: Labha Bhava",
      title: "Incoming Revenues & Goals",
      desc: "The house of massive gains, regular streams of income, networking associations, and complete fulfillment of your material desires.",
      color: "border-yellow-500/20 hover:border-yellow-500/50"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs text-yellow-500 font-mono tracking-widest uppercase flex items-center justify-center gap-1.5">
          <CircleDollarSign className="w-4 h-4" /> Celestial Wealth & Prosperity
        </span>
        <h3 className="text-3xl md:text-4xl font-extrabold font-sans text-amber-100 tracking-tight leading-tight">
          Wealth, Money & Finance in Your Stars
        </h3>
        <p className="text-sm text-slate-400">
          In Vedic astrology, wealth is not merely a product of secular labor, but a divine flow (Dhana-Yoga) written in your birth chart. Learn how your planetary alignment determines your financial path.
        </p>
      </div>

      {/* Grid: 3D Image & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        {/* Left Side: Overview & Core Planets of Wealth */}
        <div className="lg:col-span-7 space-y-6">
          <h4 className="text-lg font-bold text-amber-200 flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500 animate-pulse" /> The Sacred Pillars of Abundance
          </h4>
          
          <p className="text-slate-300 text-sm leading-relaxed">
            Your cosmic capacity for wealth is determined by **Dhana Yogas**—special planetary conjunctions involving the lords of the 2nd (wealth), 5th (speculation), 9th (fortune), and 11th (gains) houses. When these lords interact favorably with **Jupiter (Guru)**, the great expander, or **Venus (Shukra)**, the significator of luxury, life flows with seamless material abundance.
          </p>

          {/* Planetary significators list */}
          <div className="space-y-3.5">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0 font-bold text-xs">
                 बृहस्पति
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Jupiter (Guru): The Great Significator</h5>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  The primary planet for gold, wisdom, long-term assets, financial systems, and spiritual blessings which translate to immense material safety.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0 font-bold text-xs">
                 शुक्र
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Venus (Shukra): Luxury & Comfort</h5>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Governs cash flow, vehicles (Vahana), real estate properties, premium clothing, jewelry, and artistic streams of income.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0 font-bold text-xs">
                 बुध
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Mercury (Budha): Intellect & Trade</h5>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Controls business acumen, trading skills, stock market timing, speech eloquence, and practical calculation systems.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: 3D styled Image Card */}
        <div className="lg:col-span-5 relative group" style={{ perspective: "1200px" }}>
          {/* Neon back aurorall shadow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-500/10 to-amber-500/10 blur-2xl transform scale-105 group-hover:scale-110 transition-transform duration-500" />
          
          <motion.div
            id="wealth-3d-image-card"
            whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative overflow-hidden rounded-2xl border-2 border-yellow-500/30 bg-slate-950 p-2 shadow-[0_15px_40px_rgba(245,158,11,0.15)] transform-gpu"
          >
            <img
              src={wealthImgSrc}
              alt="Wealth Celestial"
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover rounded-xl"
            />
            {/* Overlay gold gradient frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-2 py-0.5 rounded uppercase font-mono font-bold tracking-widest">
                Dhana Yoga Chart
              </span>
              <h4 className="text-lg font-bold text-slate-100 mt-2 font-sans tracking-tight">Ancient Wealth Houses</h4>
              <p className="text-[11px] text-slate-400 mt-1">Planetary alignments governing financial abundance.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section: The Astrological Houses of Prosperity */}
      <div className="space-y-6 mb-16">
        <div className="text-center">
          <h4 className="text-lg font-bold text-slate-200">The Five Financial Gateways</h4>
          <p className="text-xs text-slate-400 mt-1">Every financial aspect of your life is controlled by these five astrological houses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financialHouses.map((item, index) => (
            <motion.div
              key={index}
              id={`wealth-house-card-${index}`}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`p-5 rounded-2xl border bg-slate-950/60 backdrop-blur-sm transition-all shadow-[0_4px_15px_rgba(0,0,0,0.2)] ${item.color} group`}
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500/10 group-hover:scale-105 transition-all">
                <TrendingUp className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] text-yellow-500 font-bold tracking-widest uppercase font-mono">{item.house}</span>
              <h5 className="text-sm font-bold text-slate-200 mt-1">{item.title}</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section: Abundance Remedies */}
      <div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-slate-950 to-amber-950/10 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-bold text-amber-200 flex items-center gap-1.5 justify-center lg:justify-start">
              <Sparkles className="w-5 h-5 text-yellow-500" /> Auspicious Vedic Wealth Remedies
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl text-center lg:text-left">
              If your wealth house is blocked by Shani, Rahu, or Ketu, practicing specialized spiritual remedies can dissolve negative karmic debts (Rina) and activate your stagnant Dhana Yogas:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] font-mono">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-yellow-500 font-bold block mb-0.5">💛 Chanting Shreem Mantra</span>
                Recite "Om Shreem Hreem Shreem Kamale Kamalalaye Praseeda" 108 times at sunrise.
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-yellow-500 font-bold block mb-0.5">🌾 Thursday Fasts & Donations</span>
                Fast on Thursdays to honor Jupiter (Guru) and donate yellow chickpeas or gold-colored grain to seekers.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto text-center lg:text-right">
            <span className="text-[10px] text-slate-500 font-mono">Get Your Custom Financial Astro Blueprint Today</span>
            <a
              id="whatsapp-wealth-remedy-btn"
              href="https://wa.me/918882195832?text=Hare%20Krishna%21%20I%20am%20inquiring%20about%20my%20Wealth%2C%20Money%20%26%20Finance%20houses%20with%20Astro%20Sadhguru%20Mantra.%20Can%20you%20analyze%20my%20Dhana%20Yogas%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-[0_4px_15px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              WhatsApp Abundance Reading
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
