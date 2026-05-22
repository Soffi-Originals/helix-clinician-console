export type NoteStatus = "ai-draft" | "in-review" | "signed";
export type NoteKind = "Visit" | "Lab review" | "Care plan" | "Escalation";

export interface ClinicalNote {
  id: string;
  patientName: string;
  patientInitials: string;
  patientId: string;
  mrn: string;
  kind: NoteKind;
  title: string;
  preview: string;
  status: NoteStatus;
  drafted: string;
  authoredBy: string;
  aiAssisted: boolean;
  tags: string[];
}

export const notes: ClinicalNote[] = [
  {
    id: "n-7001",
    patientName: "Theodore Akiyama",
    patientInitials: "TA",
    patientId: "p-004",
    mrn: "MRN-48266",
    kind: "Escalation",
    title: "Sustained HRV anomaly · cardiology consult recommended",
    preview:
      "AI surveillance flagged a 28% HRV drop sustained over 72 hours, coinciding with ApoB rising to 142 mg/dL. Recommend same-day cardiology referral and expedited holter monitor placement.",
    status: "ai-draft",
    drafted: "8 min ago",
    authoredBy: "Helix AI · awaiting Dr. Patel",
    aiAssisted: true,
    tags: ["AI summary", "Cardiology", "Same-day"],
  },
  {
    id: "n-7002",
    patientName: "Daniel Reyes",
    patientInitials: "DR",
    patientId: "p-002",
    mrn: "MRN-48227",
    kind: "Lab review",
    title: "Lipid panel · escalating lipid-lowering therapy",
    preview:
      "ApoB unchanged at 142 mg/dL after 12 weeks on rosuvastatin 10 mg. AI recommends titration to 20 mg with bempedoic acid add-on if Lp(a) confirmed elevated.",
    status: "in-review",
    drafted: "32 min ago",
    authoredBy: "Drafted by Dr. Patel",
    aiAssisted: true,
    tags: ["Lipids", "Medication change"],
  },
  {
    id: "n-7003",
    patientName: "Priya Iyengar",
    patientInitials: "PI",
    patientId: "p-007",
    mrn: "MRN-48302",
    kind: "Visit",
    title: "Cortisol elevation · sleep hygiene plan",
    preview:
      "AM cortisol 22 µg/dL, consistent with reported insomnia onset 6 weeks ago. Discussed evening light hygiene, no-screens-after-9 protocol, and trial of magnesium glycinate.",
    status: "in-review",
    drafted: "2 hours ago",
    authoredBy: "Drafted by Dr. Sato",
    aiAssisted: false,
    tags: ["Hormone", "Sleep"],
  },
  {
    id: "n-7004",
    patientName: "Iris Vance",
    patientInitials: "IV",
    patientId: "p-005",
    mrn: "MRN-48280",
    kind: "Care plan",
    title: "Glucose trend · 14-day dietary intervention",
    preview:
      "Fasting glucose 102 mg/dL with HbA1c 5.8%. Patient enrolled in time-restricted feeding protocol; redraw in 4 weeks. Continue metformin 500 mg BID.",
    status: "signed",
    drafted: "Yesterday",
    authoredBy: "Signed by Dr. Patel",
    aiAssisted: true,
    tags: ["Metabolic", "Dietary"],
  },
  {
    id: "n-7005",
    patientName: "Maya Okafor",
    patientInitials: "MO",
    patientId: "p-001",
    mrn: "MRN-48201",
    kind: "Visit",
    title: "Quarterly comprehensive · longevity program",
    preview:
      "All biomarkers within optimal range. VO2max 47 mL/kg/min, grip strength 38 kg. Continue current protocol; reassess in 90 days.",
    status: "signed",
    drafted: "Apr 28, 2026",
    authoredBy: "Signed by Dr. Patel",
    aiAssisted: false,
    tags: ["Longevity", "Quarterly"],
  },
  {
    id: "n-7006",
    patientName: "Sasha Linder",
    patientInitials: "SL",
    patientId: "p-003",
    mrn: "MRN-48244",
    kind: "Lab review",
    title: "Vitamin D repletion · 8-week recheck",
    preview:
      "Vitamin D rose from 22 to 28 ng/mL on 5,000 IU daily. Continue current dose; recheck at 12-week mark to confirm trajectory.",
    status: "signed",
    drafted: "May 02, 2026",
    authoredBy: "Signed by Dr. Sato",
    aiAssisted: true,
    tags: ["Vitamin D", "Recheck"],
  },
];
