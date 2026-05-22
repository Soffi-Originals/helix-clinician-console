export type BiomarkerStatus = "optimal" | "watch" | "out-of-range";

export interface Biomarker {
  id: string;
  name: string;
  group: "Cardio" | "Metabolic" | "Hormone" | "Inflammation" | "Renal";
  value: number;
  unit: string;
  range: [number, number];
  status: BiomarkerStatus;
  trend: number[];
  lastDrawn: string;
}

export const biomarkers: Biomarker[] = [
  {
    id: "apo-b",
    name: "ApoB",
    group: "Cardio",
    value: 142,
    unit: "mg/dL",
    range: [40, 90],
    status: "out-of-range",
    trend: [88, 95, 102, 115, 124, 132, 138, 142],
    lastDrawn: "May 14, 2026",
  },
  {
    id: "ldl-c",
    name: "LDL-C",
    group: "Cardio",
    value: 168,
    unit: "mg/dL",
    range: [0, 100],
    status: "out-of-range",
    trend: [105, 118, 128, 140, 152, 158, 164, 168],
    lastDrawn: "May 14, 2026",
  },
  {
    id: "hba1c",
    name: "HbA1c",
    group: "Metabolic",
    value: 5.8,
    unit: "%",
    range: [4.0, 5.6],
    status: "watch",
    trend: [5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.8],
    lastDrawn: "May 14, 2026",
  },
  {
    id: "fasting-glucose",
    name: "Fasting Glucose",
    group: "Metabolic",
    value: 102,
    unit: "mg/dL",
    range: [70, 99],
    status: "watch",
    trend: [88, 90, 92, 95, 98, 100, 102, 102],
    lastDrawn: "May 14, 2026",
  },
  {
    id: "hs-crp",
    name: "hs-CRP",
    group: "Inflammation",
    value: 1.2,
    unit: "mg/L",
    range: [0, 1.0],
    status: "watch",
    trend: [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2],
    lastDrawn: "May 14, 2026",
  },
  {
    id: "egfr",
    name: "eGFR",
    group: "Renal",
    value: 92,
    unit: "mL/min",
    range: [90, 120],
    status: "optimal",
    trend: [98, 96, 95, 94, 93, 93, 92, 92],
    lastDrawn: "May 14, 2026",
  },
  {
    id: "tsh",
    name: "TSH",
    group: "Hormone",
    value: 2.1,
    unit: "mIU/L",
    range: [0.4, 4.0],
    status: "optimal",
    trend: [1.8, 1.9, 2.0, 2.1, 2.0, 2.1, 2.1, 2.1],
    lastDrawn: "May 14, 2026",
  },
  {
    id: "vit-d",
    name: "Vitamin D",
    group: "Metabolic",
    value: 28,
    unit: "ng/mL",
    range: [30, 100],
    status: "out-of-range",
    trend: [38, 36, 34, 32, 30, 29, 28, 28],
    lastDrawn: "May 14, 2026",
  },
];
