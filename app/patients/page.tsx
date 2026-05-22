import Link from "next/link";
import { Filter, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { RiskScore } from "@/components/ui/risk-score";
import { Sparkline } from "@/components/ui/sparkline";
import { patients } from "@/lib/data/patients";

export default function PatientsPage() {
  return (
    <>
      <section>
        <PageHeader
          overline="Member panel · 248 active"
          title="Your panel, by signal"
          description="Members ranked by composite AI risk score. Sparklines show the 30-day trajectory across biomarkers, wearable signals, and EHR events."
          actions={
            <>
              <Button variant="secondary" size="md">
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
              <Button variant="primary" size="md">
                <Plus className="h-3.5 w-3.5" /> Enroll member
              </Button>
            </>
          }
        />
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-tertiary" />
            <Input variant="glass" placeholder="Search by name, MRN, marker…" className="pl-10" />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="solid" size="md">All · 248</Badge>
            <Badge variant="neutral" size="md">Critical · 1</Badge>
            <Badge variant="neutral" size="md">High · 4</Badge>
            <Badge variant="neutral" size="md">Watch · 12</Badge>
            <Badge variant="neutral" size="md">Pending labs · 6</Badge>
          </div>
        </div>

        {/* Gallery — not a dense table. Soft floating cards. */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {patients.map((p) => (
            <Card
              key={p.id}
              variant="default"
              radius="2xl"
              padding="lg"
              className="group hover:shadow-float transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar
                    size="xl"
                    initials={p.initials}
                    tone={p.riskLevel === "critical" ? "danger" : p.riskLevel === "high" ? "warning" : "accent"}
                    ring="soft"
                  />
                  <div className="flex flex-col min-w-0">
                    <Link
                      href={`/patients/${p.id}`}
                      className="font-display text-title font-semibold tracking-tight hover:text-accent-strong"
                    >
                      {p.name}
                    </Link>
                    <span className="text-label font-mono text-fg-tertiary">{p.mrn}</span>
                    <span className="text-label text-fg-tertiary">{p.age}{p.sex} · {p.program}</span>
                  </div>
                </div>
                <RiskScore score={p.riskScore} level={p.riskLevel} size="md" />
              </div>

              <div className="mt-5 -mx-2 h-12">
                <Sparkline
                  data={p.trend}
                  tone={p.riskLevel === "critical" ? "danger" : p.riskLevel === "high" ? "warning" : "success"}
                  size="md"
                />
              </div>

              <div className="mt-4 flex items-center flex-wrap gap-2">
                {p.flag ? (
                  <Badge size="sm" variant={p.riskLevel === "critical" ? "danger" : "warning"} dot>
                    {p.flag}
                  </Badge>
                ) : (
                  <Badge size="sm" variant="success" dot>Stable</Badge>
                )}
                {(p.pendingLabs ?? 0) > 0 ? (
                  <Badge size="sm" variant="info">{p.pendingLabs} pending labs</Badge>
                ) : null}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4">
                <div className="flex flex-col">
                  <span className="text-label text-fg-tertiary uppercase tracking-widest font-semibold">Next</span>
                  <span className="text-body-sm">{p.nextVisit ?? "—"}</span>
                </div>
                <Link
                  href={`/patients/${p.id}`}
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                >
                  Open chart →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
