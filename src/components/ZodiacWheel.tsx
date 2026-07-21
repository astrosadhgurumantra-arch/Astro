import { useState, useEffect } from "react";
import { zodiacSigns } from "../data/zodiacs";
import { ZodiacSign } from "../types";
import { motion } from "motion/react";
import { RotateCw, Compass } from "lucide-react";

interface ZodiacWheelProps {
  onSelectSign: (sign: ZodiacSign) => void;
  selectedSign: ZodiacSign | null;
}

export default function ZodiacWheel({ onSelectSign, selectedSign }: ZodiacWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  // Auto slow rotation of the wheel
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.15) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isRotating]);

  const handleManualSpin = () => {
    setIsRotating(false);
    const addedRotation = 360 + Math.random() * 360;
    setRotation((prev) => prev + addedRotation);
    setTimeout(() => {
      setIsRotating(true);
    }, 5000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* 3D Wheel Container */}
      <div 
        id="zodiac-wheel-wrapper"
        className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full flex items-center justify-center border-2 border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.1)] bg-slate-950/40 backdrop-blur-md"
        style={{ perspective: "1000px" }}
        onMouseEnter={() => setIsRotating(false)}
        onMouseLeave={() => setIsRotating(true)}
      >
        {/* Outer compass rim */}
        <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/30 animate-[spin_120s_linear_infinite]" />
        
        {/* Celestial ring */}
        <div 
          className="absolute inset-6 rounded-full border-2 border-amber-500/10 flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isRotating ? "none" : "transform 4s cubic-bezier(0.1, 0.8, 0.3, 1)"
          }}
        >
          {/* Inner radial lines */}
          <div className="absolute w-full h-[1px] bg-amber-500/5" />
          <div className="absolute w-full h-[1px] bg-amber-500/5 rotate-30" />
          <div className="absolute w-full h-[1px] bg-amber-500/5 rotate-60" />
          <div className="absolute w-full h-[1px] bg-amber-500/5 rotate-90" />
          <div className="absolute w-full h-[1px] bg-amber-500/5 rotate-120" />
          <div className="absolute w-full h-[1px] bg-amber-500/5 rotate-150" />

          {/* Place 12 zodiac symbols along the perimeter of the wheel using CSS-3D placement */}
          {zodiacSigns.map((sign, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 110 : 160; // responsive radius
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            // Compute correct angle of the text to align radially or keep upright
            const isSelected = selectedSign?.id === sign.id;

            return (
              <button
                key={sign.id}
                id={`wheel-btn-${sign.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSign(sign);
                }}
                className={`absolute w-10 h-10 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group select-none
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-amber-400 to-yellow-600 border-2 border-amber-300 text-slate-950 scale-125 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-20"
                      : "bg-slate-900/90 border border-amber-500/20 text-amber-100/80 hover:text-white hover:border-amber-400/80 hover:scale-110 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  }`}
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                  transformStyle: "preserve-3d"
                }}
                title={`${sign.name} (${sign.sanskritName})`}
              >
                {/* 3D layered hover effect */}
                <span className="text-xl sm:text-2xl font-semibold filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                  {sign.symbol}
                </span>
                <span className="text-[8px] sm:text-[9px] font-medium tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200 uppercase -mt-0.5 max-w-[45px] truncate text-center">
                  {sign.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center sun hub button */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-500/40 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-md group select-none">
          <motion.button
            id="center-wheel-spin-btn"
            onClick={handleManualSpin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] cursor-pointer transition-shadow"
          >
            <Compass className="w-6 h-6 text-slate-950 animate-[spin_20s_linear_infinite]" />
            <span className="text-[10px] font-bold tracking-widest text-slate-950 uppercase mt-1">SPIN</span>
          </motion.button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-amber-500/60 font-mono">
        <RotateCw className="w-3.5 h-3.5 animate-spin" />
        <span>Hover to halt • Click sign to inspect cosmic alignment</span>
      </div>
    </div>
  );
}
