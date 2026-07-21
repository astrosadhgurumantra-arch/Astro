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
