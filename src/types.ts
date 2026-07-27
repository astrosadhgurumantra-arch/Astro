export interface ZodiacSign {
  id: string;
  name: string;
  sanskritName: string;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  rulingPlanet: string;
  stone: string;
  dateRange: string;
  color: string;
  accentColor: string;
  description: string;
}

export interface Appointment {
  name: string;
  email: string;
  phone: string;
  dob: string;
  tob: string;
  pob: string; // Place of birth
  gender: string;
  sign: string;
  consultationType: string; // e.g., Love, Career, Wealth, Kundali Matching
  date: string;
  timeSlot: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface PanchangElement {
  name: string;
  sanskritName: string;
  deityOrPlanet: string;
  description: string;
}

export interface PanchangData {
  date: string;
  location: string;
  tithi: PanchangElement;
  nakshatra: PanchangElement;
  yoga: PanchangElement;
  karana: PanchangElement;
  vara: PanchangElement;
  timings: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    abhijitMuhurta: string;
    rahuKaal: string;
    amritKaal: string;
    brahmaMuhurta: string;
  };
  cosmicGuidance: {
    summary: string;
    auspiciousActivities: string[];
    avoidActivities: string[];
    sadhguruMantra: string;
    ritualAdvice: string;
  };
}
