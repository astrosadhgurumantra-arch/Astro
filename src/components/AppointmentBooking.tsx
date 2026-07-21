import { useState, ChangeEvent, FormEvent } from "react";
import { Appointment } from "../types";
import { zodiacSigns } from "../data/zodiacs";
import { Calendar, Clock, User, Mail, Phone, MapPin, Sparkles, MessageCircle, Heart, Star, Compass } from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabase";

export default function AppointmentBooking() {
  const [formData, setFormData] = useState<Partial<Appointment>>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    tob: "",
    pob: "",
    gender: "male",
    sign: "aries",
    consultationType: "General Destiny & Life",
    date: "",
    timeSlot: "10:00 AM - 11:30 AM",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<Appointment | null>(null);
  const [alignmentStep, setAlignmentStep] = useState(0);

  const consultationTypes = [
    { value: "General Destiny & Life", label: "Destiny & Spiritual Life Path", icon: Sparkles },
    { value: "Love & Marriage", label: "Life & Love / Synastry Compatibility", icon: Heart },
    { value: "Wealth & Finance", label: "Wealth, Money & Career Growth", icon: Star },
    { value: "Kundali Matching", label: "Vedic Kundali Milan (Birthchart Matching)", icon: Compass },
    { value: "Planetary Remedy & Shani", label: "Planetary Dosha / Shani Sade Sati Remedies", icon: Sparkles }
  ];

  const timeSlots = [
    "09:00 AM - 10:30 AM (Brahma Muhurta Flow)",
    "10:45 AM - 12:15 PM (Surya Peak Devotion)",
    "02:00 PM - 03:30 PM (Mercury Mind Harmony)",
    "04:00 PM - 05:30 PM (Venus Aura Twilight)",
    "07:00 PM - 08:30 PM (Guru Spiritual Connection)"
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.dob) {
      alert("Please fill in the core required fields (Name, Email, Phone, Birthdate) to calculate your astrological path.");
      return;
    }

    setIsSubmitting(true);
    setAlignmentStep(1);

    try {
      // Insert into Supabase table "appointments"
      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            dob: formData.dob,
            tob: formData.tob,
            pob: formData.pob,
            gender: formData.gender,
            sign: formData.sign,
            consultation_type: formData.consultationType,
            date: formData.date,
            time_slot: formData.timeSlot,
            notes: formData.notes
          }
        ]);

      if (error) {
        console.error('Error saving appointment:', error);
        alert('There was a cosmic disturbance while saving your appointment. Please try again or contact via WhatsApp directly.');
        setIsSubmitting(false);
        return;
      }

      // Astro-calculations simulation sequence for UX
      setTimeout(() => {
        setAlignmentStep(2);
        setTimeout(() => {
          setAlignmentStep(3);
          setTimeout(() => {
            setIsSubmitting(false);
            setSubmittedData(formData as Appointment);
          }, 1500);
        }, 1500);
      }, 1500);
    } catch (err) {
      console.error('Supabase connection error:', err);
      alert('Could not connect to the cosmic registry. Please verify your connection.');
      setIsSubmitting(false);
    }
  };

  const handleBookNew = () => {
    setSubmittedData(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      tob: "",
      pob: "",
      gender: "male",
      sign: "aries",
      consultationType: "General Destiny & Life",
      date: "",
      timeSlot: "10:00 AM - 11:30 AM",
      notes: ""
    });
  };

  const selectedZodiac = zodiacSigns.find(z => z.id === formData.sign) || zodiacSigns[0];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {isSubmitting ? (
        // Planetary Alignment loading Screen
        <div id="booking-alignment-loading" className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative w-32 h-32 mb-8">
            {/* Spinning orbital rings */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-500/10 border-t-amber-500 border-r-amber-400 animate-spin" />
            <div className="absolute inset-3 rounded-full border-4 border-purple-500/10 border-b-purple-500 border-l-indigo-400 animate-[spin_10s_linear_infinite_reverse]" />
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-yellow-500/20 animate-spin" />
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xl shadow-[0_0_20px_rgba(245,158,11,0.6)]">
              ॐ
            </div>
          </div>
          
          <h3 className="text-2xl font-bold font-sans text-amber-100 tracking-wide mb-3">
            {alignmentStep === 1 && "Aligning Astrological Houses..."}
            {alignmentStep === 2 && "Calculating Lagna & Planetary Transits..."}
            {alignmentStep === 3 && "Sadhguru Blessing Integration..."}
          </h3>
          
          <p className="text-slate-400 max-w-md text-sm font-mono leading-relaxed">
            {alignmentStep === 1 && "Scanning Vedic Nakshatras and configuring natal coordinate vectors."}
            {alignmentStep === 2 && "Constructing detailed houses and matching transit nodes with current planetary velocities."}
            {alignmentStep === 3 && "Vocalizing Astro Sadhguru sacred mantras to unlock prosperity and divine love remedies."}
          </p>
        </div>
      ) : submittedData ? (
        // Successful booking confirmation receipt
        <motion.div 
          id="booking-receipt-card"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 p-6 md:p-10 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-xl"
        >
          {/* Decorative backdrop elements */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl" />

          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono tracking-widest uppercase mb-4">
              ✨ Appointment Alignment Secured ✨
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-amber-100 font-sans tracking-tight">
              Astro Sadhguru Consultation Booked
            </h3>
            <p className="text-slate-400 mt-2 text-sm max-w-lg mx-auto">
              Your personalized celestial session has been mapped in the cosmic calendar. Sadhguru Mantra blessings are active.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Consultation Summary */}
            <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-950/80">
              <h4 className="text-amber-400 font-bold text-sm tracking-wider uppercase border-b border-slate-800/80 pb-2 mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4" /> Reading Coordinates
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Seeker:</span> <span className="text-amber-100 font-semibold">{submittedData.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Aura Sign:</span> <span className="text-amber-100 font-semibold uppercase">{submittedData.sign} ({selectedZodiac.sanskritName})</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Consultation:</span> <span className="text-amber-100 font-semibold text-right">{submittedData.consultationType}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Scheduled:</span> <span className="text-amber-100 font-semibold">{submittedData.date}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Time Slot:</span> <span className="text-amber-400 font-semibold text-right">{submittedData.timeSlot}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Birth Time:</span> <span className="text-slate-300">{submittedData.tob || "Not Specified"}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Birth Place:</span> <span className="text-slate-300 max-w-[150px] truncate text-right">{submittedData.pob || "Not Specified"}</span></div>
              </div>
            </div>

            {/* Personalized Astral Remedy */}
            <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-950/5">
              <h4 className="text-amber-400 font-bold text-sm tracking-wider uppercase border-b border-amber-500/10 pb-2 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Vedic Aura Safeguard
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Based on your selected sign <span className="text-amber-400 font-bold">{selectedZodiac.name}</span>, recite this mantra daily to clear negative planetary nodes (Doshas):
              </p>
              
              <div className="p-4 rounded bg-slate-950/90 border border-amber-500/30 text-center mb-4">
                <p className="text-amber-400 italic font-semibold text-sm">
                  {selectedZodiac.id === "aries" || selectedZodiac.id === "scorpio" ? "ॐ मङ्गलाय नमः (Om Mangalaya Namah)" :
                   selectedZodiac.id === "taurus" || selectedZodiac.id === "libra" ? "ॐ शुक्राय नमः (Om Shukraya Namah)" :
                   selectedZodiac.id === "gemini" || selectedZodiac.id === "virgo" ? "ॐ बुधाय नमः (Om Budhaya Namah)" :
                   selectedZodiac.id === "cancer" ? "ॐ चन्द्रमसे नमः (Om Chandramase Namah)" :
                   selectedZodiac.id === "leo" ? "ॐ सूर्याय नमः (Om Suryaya Namah)" :
                   selectedZodiac.id === "sagittarius" || selectedZodiac.id === "pisces" ? "ॐ गुरुवे नमः (Om Gurave Namah)" :
                   "ॐ शनैश्चराय नमः (Om Sham Shanaishcharaya Namah)"}
                </p>
                <span className="text-[10px] text-slate-500 block mt-1">Chant 108 times at Sunrise</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase font-mono">Lucky Gemstone</span>
                  <span className="text-amber-100 font-semibold font-sans">{selectedZodiac.stone}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block uppercase font-mono">Lucky Color</span>
                  <span className="text-amber-100 font-semibold font-sans">{selectedZodiac.color}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Call for WhatsApp Acceleration */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h5 className="text-emerald-400 font-bold text-base flex items-center justify-center md:justify-start gap-1.5">
                <MessageCircle className="w-5 h-5" /> Fast-Track Your Reading via WhatsApp
              </h5>
              <p className="text-xs text-slate-300 mt-1">
                Instantly send your booking receipt to Astro Sadhguru Mantra at **+91 88821 95832** to begin your preparation and join the priority live queue.
              </p>
            </div>
            
            <a
              id="whatsapp-booking-confirm-btn"
              href={`https://wa.me/918882195832?text=Hare%20Krishna%21%20I%20have%20booked%20an%20appointment%20with%20Astro%20Sadhguru%20Mantra.%0A%0ASeeker%3A%20${encodeURIComponent(submittedData.name)}%0AEmail%3A%20${encodeURIComponent(submittedData.email)}%0APhone%3A%20${encodeURIComponent(submittedData.phone)}%0AZodiac%20Sign%3A%20${encodeURIComponent(submittedData.sign)}%0ADOB%3A%20${encodeURIComponent(submittedData.dob)}%0ATime%3A%20${encodeURIComponent(submittedData.tob || "Not Specified")}%0AConsultation%20Type%3A%20${encodeURIComponent(submittedData.consultationType)}%0AScheduled%20Date%3A%20${encodeURIComponent(submittedData.date)}%0ASelected%20Slot%3A%20${encodeURIComponent(submittedData.timeSlot)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 text-sm cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-current" />
              Connect & Send Chart
            </a>
          </div>

          <div className="mt-8 text-center">
            <button
              id="book-another-appointment-btn"
              onClick={handleBookNew}
              className="text-xs text-amber-500/60 hover:text-amber-400 font-mono underline transition-colors cursor-pointer"
            >
              Book another astrological reading
            </button>
          </div>
        </motion.div>
      ) : (
        // Appointment Form with 3D design
        <motion.form 
          id="appointment-booking-form"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Subtle cosmic circle borders */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-dashed border-amber-500/5 -mr-40 -mt-40 animate-[spin_180s_linear_infinite]" />
          
          <div className="mb-6 pb-4 border-b border-slate-800">
            <h3 className="text-xl md:text-2xl font-bold font-sans text-amber-100 tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-500 animate-pulse" /> Book Your Cosmic Natal Chart Session
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your birth coordinates and choose a sacred slot. Our spiritual servers will map planetary orbits relative to your timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seeker Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500/70" /> Seeker Name *
              </label>
              <input
                id="booking-name-input"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-500/70" /> Email Address *
              </label>
              <input
                id="booking-email-input"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500/70" /> WhatsApp Number *
              </label>
              <input
                id="booking-phone-input"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +91 88821 95832"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
            </div>

            {/* Birthdate */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500/70" /> Date of Birth *
              </label>
              <input
                id="booking-dob-input"
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Time of Birth */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500/70" /> Time of Birth
              </label>
              <input
                id="booking-tob-input"
                type="time"
                name="tob"
                value={formData.tob}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Place of Birth */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500/70" /> Place of Birth (City, Country)
              </label>
              <input
                id="booking-pob-input"
                type="text"
                name="pob"
                value={formData.pob}
                onChange={handleInputChange}
                placeholder="e.g. New Delhi, India"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Gender</label>
              <select
                id="booking-gender-select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other / Spiritual Presence</option>
              </select>
            </div>

            {/* Aura Sign selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Known Zodiac Sign</label>
              <select
                id="booking-sign-select"
                name="sign"
                value={formData.sign}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors uppercase"
              >
                {zodiacSigns.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.symbol} {z.name} ({z.sanskritName})
                  </option>
                ))}
              </select>
            </div>

            {/* Consultation Type */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block">Select Consultation Domain</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                {consultationTypes.map((type) => {
                  const IconComponent = type.icon;
                  const isSelected = formData.consultationType === type.value;
                  return (
                    <button
                      key={type.value}
                      id={`booking-domain-${type.value.toLowerCase().replace(/[^a-z]/g, '-')}`}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, consultationType: type.value }))}
                      className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all cursor-pointer select-none
                        ${isSelected 
                          ? "bg-amber-500/10 border-amber-500 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.15)]" 
                          : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                    >
                      <IconComponent className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? "text-amber-500" : "text-slate-500"}`} />
                      <div>
                        <span className="text-xs font-semibold block">{type.label}</span>
                        <span className="text-[10px] opacity-70 block mt-0.5">Deep 1-on-1 analysis of planets</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Reading Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500/70" /> Preferred Session Date *
              </label>
              <input
                id="booking-date-input"
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Preferred Time Slot */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Celestial Time Window</label>
              <select
                id="booking-slot-select"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Special spiritual inquiries */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block">Personal Intent / Core Life Questions</label>
              <textarea
                id="booking-notes-input"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Share any specific problems, e.g., delaying marriage, debt struggles, continuous failures, or health obstacles for direct Sadhguru Mantra remedies."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500/80 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
            <span className="text-[11px] text-slate-400 max-w-sm text-center sm:text-left font-mono">
              * Required coordinate parameters. All data encrypted and shared only during divine consultations.
            </span>
            <button
              id="submit-booking-form-btn"
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-slate-950 font-extrabold text-sm tracking-wide uppercase shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
            >
              Align Planets & Register
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
