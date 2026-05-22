export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  initials: string;
  age: number;
  sex: "F" | "M" | "X";
  program: "Longevity" | "Cardio" | "Metabolic" | "Hormone";
  riskScore: number;
  riskLevel: RiskLevel;
  lastVisit: string;
  nextVisit?: string;
  flag?: string;
  pendingLabs?: number;
  trend: number[];
}

export const patients: Patient[] = [
  {
    id: "p-001",
    mrn: "MRN-48201",
    name: "Maya Okafor",
    initials: "MO",
    age: 42,
    sex: "F",
    program: "Longevity",
    riskScore: 18,
    riskLevel: "low",
    lastVisit: "Apr 28, 2026",
    nextVisit: "Jun 12, 2026",
    pendingLabs: 0,
    trend: [62, 60, 59, 58, 57, 56, 55, 54],
  },
  {
    id: "p-002",
    mrn: "MRN-48227",
    name: "Daniel Reyes",
    initials: "DR",
    age: 58,
    sex: "M",
    program: "Cardio",
    riskScore: 64,
    riskLevel: "high",
    lastVisit: "May 14, 2026",
    nextVisit: "May 28, 2026",
    flag: "ApoB ↑ 142 mg/dL",
    pendingLabs: 2,
    trend: [40, 42, 48, 51, 55, 58, 61, 64],
  },
  {
    id: "p-003",
    mrn: "MRN-48244",
    name: "Sasha Linder",
    initials: "SL",
    age: 36,
    sex: "F",
    program: "Hormone",
    riskScore: 32,
    riskLevel: "moderate",
    lastVisit: "May 02, 2026",
    nextVisit: "Jul 02, 2026",
    pendingLabs: 1,
    trend: [25, 26, 28, 30, 31, 31, 32, 32],
  },
  {
    id: "p-004",
    mrn: "MRN-48266",
    name: "Theodore Akiyama",
    initials: "TA",
    age: 71,
    sex: "M",
    program: "Cardio",
    riskScore: 86,
    riskLevel: "critical",
    lastVisit: "May 19, 2026",
    nextVisit: "May 23, 2026",
    flag: "HRV drop 28% · sustained",
    pendingLabs: 3,
    trend: [55, 60, 64, 70, 75, 80, 84, 86],
  },
  {
    id: "p-005",
    mrn: "MRN-48280",
    name: "Iris Vance",
    initials: "IV",
    age: 49,
    sex: "F",
    program: "Metabolic",
    riskScore: 41,
    riskLevel: "moderate",
    lastVisit: "May 11, 2026",
    nextVisit: "Jun 22, 2026",
    flag: "Fasting glucose 108",
    pendingLabs: 1,
    trend: [50, 48, 46, 45, 43, 42, 41, 41],
  },
  {
    id: "p-006",
    mrn: "MRN-48291",
    name: "Marcus Bell",
    initials: "MB",
    age: 33,
    sex: "M",
    program: "Longevity",
    riskScore: 12,
    riskLevel: "low",
    lastVisit: "May 06, 2026",
    pendingLabs: 0,
    trend: [20, 18, 16, 15, 14, 13, 12, 12],
  },
  {
    id: "p-007",
    mrn: "MRN-48302",
    name: "Priya Iyengar",
    initials: "PI",
    age: 54,
    sex: "F",
    program: "Hormone",
    riskScore: 55,
    riskLevel: "high",
    lastVisit: "May 18, 2026",
    nextVisit: "May 30, 2026",
    flag: "Cortisol AM 22 µg/dL",
    pendingLabs: 2,
    trend: [38, 42, 45, 48, 50, 52, 54, 55],
  },
];

export function getPatient(id: string): Patient | undefined {
  return patients.find((p) => p.id === id);
}
