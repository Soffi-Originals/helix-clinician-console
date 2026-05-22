export type LabStatus = "pending" | "in-lab" | "ready" | "signed-off";
export type LabPriority = "routine" | "stat";

export interface LabOrder {
  id: string;
  patientName: string;
  patientInitials: string;
  patientId: string;
  mrn: string;
  panel: string;
  modality: "Blood draw" | "Self-collect" | "Urine" | "Saliva";
  status: LabStatus;
  priority: LabPriority;
  ordered: string;
  due: string;
  flaggedMarkers?: string[];
  turnaround?: string;
}

export const labOrders: LabOrder[] = [
  {
    id: "l-2401",
    patientName: "Theodore Akiyama",
    patientInitials: "TA",
    patientId: "p-004",
    mrn: "MRN-48266",
    panel: "Cardio Plus + ApoB · Lp(a)",
    modality: "Blood draw",
    status: "ready",
    priority: "stat",
    ordered: "May 21, 6:14 PM",
    due: "Sign-off due in 1h",
    flaggedMarkers: ["ApoB 142", "LDL-C 168", "Lp(a) 138"],
    turnaround: "28h",
  },
  {
    id: "l-2402",
    patientName: "Daniel Reyes",
    patientInitials: "DR",
    patientId: "p-002",
    mrn: "MRN-48227",
    panel: "Lipid follow-up",
    modality: "Blood draw",
    status: "ready",
    priority: "stat",
    ordered: "May 21, 7:02 PM",
    due: "Sign-off due in 3h",
    flaggedMarkers: ["ApoB 142"],
    turnaround: "24h",
  },
  {
    id: "l-2403",
    patientName: "Iris Vance",
    patientInitials: "IV",
    patientId: "p-005",
    mrn: "MRN-48280",
    panel: "Metabolic + HbA1c",
    modality: "Blood draw",
    status: "ready",
    priority: "routine",
    ordered: "May 19, 9:14 AM",
    due: "Sign-off due tomorrow",
    flaggedMarkers: ["Fasting glucose 108"],
    turnaround: "31h",
  },
  {
    id: "l-2404",
    patientName: "Priya Iyengar",
    patientInitials: "PI",
    patientId: "p-007",
    mrn: "MRN-48302",
    panel: "Hormone panel · diurnal cortisol",
    modality: "Saliva",
    status: "in-lab",
    priority: "routine",
    ordered: "May 20, 11:32 AM",
    due: "Result expected today",
    turnaround: "26h",
  },
  {
    id: "l-2405",
    patientName: "Sasha Linder",
    patientInitials: "SL",
    patientId: "p-003",
    mrn: "MRN-48244",
    panel: "Hormone full · TSH · Vitamin D",
    modality: "Blood draw",
    status: "pending",
    priority: "routine",
    ordered: "May 22, 9:01 AM",
    due: "Phlebotomy scheduled May 24",
    turnaround: "—",
  },
  {
    id: "l-2406",
    patientName: "Maya Okafor",
    patientInitials: "MO",
    patientId: "p-001",
    mrn: "MRN-48201",
    panel: "Quarterly comprehensive",
    modality: "Self-collect",
    status: "signed-off",
    priority: "routine",
    ordered: "May 12, 2:10 PM",
    due: "Signed by Dr. Patel",
    turnaround: "24h",
  },
  {
    id: "l-2407",
    patientName: "Marcus Bell",
    patientInitials: "MB",
    patientId: "p-006",
    mrn: "MRN-48291",
    panel: "Longevity baseline",
    modality: "Blood draw",
    status: "signed-off",
    priority: "routine",
    ordered: "May 06, 4:50 PM",
    due: "Signed by Dr. Sato",
    turnaround: "22h",
  },
];
