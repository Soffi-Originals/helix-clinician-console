import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageSquare, Phone, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardOverline, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { RiskScore } from "@/components/ui/risk-score";
import { Sparkline } from "@/components/ui/sparkline";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPatient, patients } from "@/lib/data/patients";
import { biomarkers } from "@/lib/data/biomarkers";

export function generateStaticParams() {
  return patients.map((p) => ({ id: p.id }));
}

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = getPatient(id);
  if (!patient) notFound();

  const outOfRange = biomarkers.filter((b) => b.status === "out-of-range");
  const watch = biomarkers.filter((b) => b.status === "watch");

  return (
    <>
      {/* Patient hero — wide, editorial */}
      <section className="flex flex-col gap-8">
        <Link href="/patients" className="inline-flex items-center gap-1.5 text-body-sm text-fg-secondary hover:text-fg-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to panel
        </Link>

        <div className="flex flex-col md:flex-row md:items-end gap-8">
          <Avatar size="2xl" initials={patient.initials} tone="accent" ring="accent" />

          <div className="flex flex-col gap-3 flex-1">
            <span className="text-overline uppercase tracking-widest text-accent-strong font-semibold">
              {patient.program} · {patient.mrn}
            </span>
            <h1 className="font-display text-display font-semibold tracking-tighter text-balance">
              {patient.name}
            </h1>
            <div className="flex items-center flex-wrap gap-3">
              <Badge variant="neutral" size="md">{patient.age}{patient.sex}</Badge>
              <Badge variant="neutral" size="md">Last visit · {patient.lastVisit}</Badge>
              {patient.nextVisit ? <Badge variant="accent" size="md">Next · {patient.nextVisit}</Badge> : null}
              {patient.flag ? <Badge variant="danger" size="md" dot>{patient.flag}</Badge> : null}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <span className="text-overline uppercase tracking-widest text-fg-tertiary font-semibold">
              Composite risk
            </span>
            <RiskScore score={patient.riskScore} level={patient.riskLevel} size="lg" showBar />
            <div className="flex items-center gap-2">
              <Button variant="primary" size="md"><Video className="h-3.5 w-3.5" /> Start visit</Button>
              <Button variant="secondary" size="md"><Phone className="h-3.5 w-3.5" /> Call</Button>
              <Button variant="ghost" size="icon" aria-label="Message"><MessageSquare className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="overview">
        <TabsList variant="pill">
          <TabsTrigger value="overview" variant="pill">Overview</TabsTrigger>
          <TabsTrigger value="biomarkers" variant="pill">Biomarkers</TabsTrigger>
          <TabsTrigger value="visits" variant="pill">Visits</TabsTrigger>
          <TabsTrigger value="prescriptions" variant="pill">Prescriptions</TabsTrigger>
          <TabsTrigger value="notes" variant="pill">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Big trajectory card */}
            <Card variant="float" radius="2xl" padding="lg" className="lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div className="flex flex-col gap-1">
                  <CardOverline>30-day trajectory</CardOverline>
                  <CardTitle>Composite risk climbing</CardTitle>
                  <CardDescription>
                    Synthesized from ApoB, HRV, glucose, and inflammation signals.
                  </CardDescription>
                </div>
                <span className="font-mono text-metric-sm font-semibold tracking-tighter">{patient.riskScore}</span>
              </div>
              <div className="h-32 -mx-2">
                <Sparkline
                  data={patient.trend}
                  tone={patient.riskLevel === "critical" ? "danger" : patient.riskLevel === "high" ? "warning" : "success"}
                  size="lg"
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-label text-fg-tertiary">
                <span>Apr 22</span><span>May 22</span>
              </div>
            </Card>

            {/* Adherence */}
            <Card variant="default" radius="2xl" padding="lg">
              <CardOverline>Care plan adherence</CardOverline>
              <CardTitle className="mb-6">Last 14 days</CardTitle>
              <CardContent>
                {[
                  { label: "Medication", value: 94, tone: "success" as const },
                  { label: "Wearable sync", value: 87, tone: "accent" as const },
                  { label: "Logged meals", value: 52, tone: "warning" as const },
                  { label: "Activity goal", value: 71, tone: "accent" as const },
                ].map((r) => (
                  <div key={r.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-body-sm">
                      <span>{r.label}</span>
                      <span className="font-mono text-fg-secondary">{r.value}%</span>
                    </div>
                    <Progress value={r.value} tone={r.tone} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Out of range — full width */}
            <Card variant="default" tone="warning" radius="2xl" padding="lg" className="lg:col-span-3">
              <div className="flex items-start justify-between mb-6 gap-3 flex-wrap">
                <div className="flex flex-col gap-1">
                  <CardOverline>Out-of-range biomarkers · {outOfRange.length}</CardOverline>
                  <CardTitle>Most recent panel · drawn May 14, 2026</CardTitle>
                </div>
                <Button variant="ghost" size="sm">Order re-draw</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {outOfRange.map((b) => (
                  <div key={b.id} className="flex items-center gap-4 p-4 rounded-xl bg-bg-surface shadow-card">
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-overline uppercase tracking-widest text-accent-strong font-semibold">{b.group}</span>
                      <span className="font-display text-title font-semibold">{b.name}</span>
                      <span className="text-label font-mono text-fg-tertiary">Range {b.range[0]}–{b.range[1]} {b.unit}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-metric-sm font-semibold text-danger-fg leading-none">{b.value}</span>
                      <span className="text-label text-fg-tertiary mt-1">{b.unit}</span>
                    </div>
                    <div className="w-20 shrink-0">
                      <Sparkline data={b.trend} tone="danger" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="biomarkers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {biomarkers.map((b) => (
              <Card key={b.id} variant="default" radius="2xl" padding="md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-overline uppercase tracking-widest text-fg-tertiary font-semibold">{b.group}</span>
                    <span className="font-display text-title font-semibold">{b.name}</span>
                  </div>
                  <Badge
                    size="sm"
                    variant={b.status === "out-of-range" ? "danger" : b.status === "watch" ? "warning" : "success"}
                    dot
                  >
                    {b.status === "out-of-range" ? "Out of range" : b.status === "watch" ? "Watch" : "Optimal"}
                  </Badge>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-mono text-metric-sm font-semibold tracking-tighter">{b.value}</span>
                  <span className="text-body text-fg-tertiary">{b.unit}</span>
                </div>
                <span className="text-label font-mono text-fg-tertiary">Range {b.range[0]}–{b.range[1]}</span>
                <div className="mt-4 h-10 -mx-2">
                  <Sparkline
                    data={b.trend}
                    tone={b.status === "out-of-range" ? "danger" : b.status === "watch" ? "warning" : "success"}
                    size="md"
                  />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="visits">
          <div className="flex flex-col gap-3">
            {[
              { date: "May 14, 2026", reason: "Lipid panel review", clinician: "Dr. Patel" },
              { date: "Apr 28, 2026", reason: "Quarterly comprehensive", clinician: "Dr. Patel" },
              { date: "Mar 12, 2026", reason: "Wearable anomaly review", clinician: "Dr. Sato" },
            ].map((v, i) => (
              <Card key={i} variant="default" radius="xl" padding="md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-subtle text-accent-strong">
                    <Video className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-display text-body font-medium">{v.reason}</span>
                    <span className="text-body-sm text-fg-secondary">{v.date} · {v.clinician}</span>
                  </div>
                  <Button variant="ghost" size="sm">View note</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions">
          <div className="flex flex-col gap-3">
            {[
              { name: "Rosuvastatin", dose: "10mg PO daily", started: "Feb 2026", refills: 3 },
              { name: "Metformin ER", dose: "500mg PO BID", started: "Jan 2026", refills: 5 },
              { name: "Vitamin D3", dose: "5,000 IU daily", started: "Dec 2025", refills: 11 },
            ].map((rx, i) => (
              <Card key={i} variant="default" radius="xl" padding="md">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex flex-col flex-1 min-w-[200px]">
                    <span className="font-display text-body-lg font-semibold">{rx.name}</span>
                    <span className="text-body-sm text-fg-secondary">{rx.dose}</span>
                    <span className="text-label font-mono text-fg-tertiary">Started {rx.started}</span>
                  </div>
                  <Badge variant="success" size="md" dot>Active</Badge>
                  <span className="font-mono text-body-sm text-fg-tertiary">{rx.refills} refills</span>
                  <Button variant="ghost" size="sm">Renew</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <Card variant="default" radius="2xl" padding="lg">
            <CardContent>
              <p className="text-body-lg text-fg-secondary leading-relaxed">
                {watch.length} biomarkers in watch range; recommend re-draw in 4 weeks if dietary intervention
                fails to bring fasting glucose below 100 mg/dL. Patient reports adherence to evening walk
                protocol — wearable data confirms ≥7,500 steps on 12 of last 14 days.
              </p>
              <hr className="border-border-subtle" />
              <p className="text-body-lg text-fg-secondary leading-relaxed">
                AI summary suggests escalating lipid-lowering therapy given sustained ApoB elevation despite
                statin titration. Schedule cardiology consult.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
