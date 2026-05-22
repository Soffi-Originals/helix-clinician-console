export type VisitStatus = "waiting" | "in-visit" | "scheduled" | "completed";
export type VisitPriority = "routine" | "urgent" | "stat";

export interface Visit {
  id: string;
  patientName: string;
  patientInitials: string;
  patientId: string;
  reason: string;
  status: VisitStatus;
  priority: VisitPriority;
  scheduledFor: string;
  waitSeconds?: number;
  modality: "Video" | "Phone" | "Chat";
}

export const visits: Visit[] = [
  {
    id: "v-1001",
    patientName: "Theodore Akiyama",
    patientInitials: "TA",
    patientId: "p-004",
    reason: "Sustained HRV anomaly — AI flagged",
    status: "waiting",
    priority: "stat",
    scheduledFor: "Now",
    waitSeconds: 38,
    modality: "Video",
  },
  {
    id: "v-1002",
    patientName: "Daniel Reyes",
    patientInitials: "DR",
    patientId: "p-002",
    reason: "ApoB review · lipid panel follow-up",
    status: "waiting",
    priority: "urgent",
    scheduledFor: "Now",
    waitSeconds: 92,
    modality: "Video",
  },
  {
    id: "v-1003",
    patientName: "Priya Iyengar",
    patientInitials: "PI",
    patientId: "p-007",
    reason: "Cortisol elevation · sleep questionnaire",
    status: "scheduled",
    priority: "routine",
    scheduledFor: "2:30 PM",
    modality: "Video",
  },
  {
    id: "v-1004",
    patientName: "Iris Vance",
    patientInitials: "IV",
    patientId: "p-005",
    reason: "Glucose trend check-in",
    status: "scheduled",
    priority: "routine",
    scheduledFor: "3:15 PM",
    modality: "Phone",
  },
  {
    id: "v-1005",
    patientName: "Sasha Linder",
    patientInitials: "SL",
    patientId: "p-003",
    reason: "Hormone panel review",
    status: "scheduled",
    priority: "routine",
    scheduledFor: "4:00 PM",
    modality: "Chat",
  },
];
