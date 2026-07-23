import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardDescription, CardOverline, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { RiskScore } from "@/components/ui/risk-score";
import { Sparkline } from "@/components/ui/sparkline";
import { patients } from "@/lib/data/patients";
import { visits } from "@/lib/data/visits";

export default function OverviewPage() {
  const flagged = patients.filter((p) => p.riskLevel === "high" || p.riskLevel === "critical");
  const waiting = visits.filter((v) => v.status === "waiting");

  return (
    <>
      {/* Hero — editorial header */}
      <section className="flex flex-col gap-10 pt-2">
        <PageHeader
          overline="Friday · May 22, 2026"
          title="Health isn't reactive. It's predictive!"
          description="14 active members on your panel today. 3 anomalies the AI surfaced overnight. 2 of them need a clinician in the next four hours."
          meta={
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="accent" size="md" dot>3 AI-flagged</Badge>
              <Badge variant="warning" size="md" dot>14 labs pending</Badge>
              <Badge variant="success" size="md" dot>87s avg response</Badge>
            </div>
          }
          actions={
            <>
              <Button variant="primary" size="lg">Open visit queue</Button>
              <Button variant="secondary" size="lg">Daily brief</Button>
            </>
          }
        />

        {/* Stat row — naked editorial blocks separated by dividers, no cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 lg:gap-x-12 border-t border-border-subtle pt-8">
          <StatCard
            label="Active panel"
            value="248"
            unit="members"
            delta="+6 wk/wk"
            trend="up"
            tone="neutral"
            hint="vs. 242 last week"
            layout="hero"
            surface="bare"
          />
          <StatCard
            label="AI-flagged"
            value="3"
            unit="open"
            delta="2 critical"
            trend="up"
            tone="danger"
            hint="last 24h"
            layout="hero"
            surface="bare"
          />
          <StatCard
            label="Avg. response"
            value="87"
            unit="sec"
            delta="−12s"
            trend="down"
            tone="success"
            hint="SLO 120s"
            layout="hero"
            surface="bare"
          />
          <StatCard
            label="Labs pending"
            value="14"
            unit="panels"
            delta="6 stat"
            trend="flat"
            tone="warning"
            hint="oldest 2h"
            layout="hero"
            surface="bare"
          />
        </div>
      </section>

      {/* Flagged events */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-col gap-1">
            <CardOverline>AI Diagnostics</CardOverline>
            <h2 className="font-display text-display-sm font-semibold tracking-tighter">
              Anomalies surfaced overnight
            </h2>
          </div>
          <Link
            href="/patients"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View all {patients.length} members <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {flagged.map((p) => (
            <Card
              key={p.id}
              variant="default"
              radius="2xl"
              padding="lg"
              className="group hover:shadow-float transition-shadow"
            >
              <div className="flex items-start gap-3">
                <Avatar
                  size="lg"
                  initials={p.initials}
                  tone={p.riskLevel === "critical" ? "danger" : "accent"}
                  ring="soft"
                />
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <Link
                    href={`/patients/${p.id}`}
                    className="font-display text-title font-semibold tracking-tight hover:text-accent-strong"
                  >
                    {p.name}
                  </Link>
                  <span className="text-label font-mono text-fg-tertiary">{p.mrn}</span>
                </div>
                <RiskScore score={p.riskScore} level={p.riskLevel} size="sm" />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-accent-strong" />
                <span className="text-body-sm text-fg-secondary line-clamp-2">{p.flag ?? "Routine surveillance"}</span>
              </div>

              <div className="mt-4 h-16 -mx-2">
                <Sparkline
                  data={p.trend}
                  tone={p.riskLevel === "critical" ? "danger" : "warning"}
                  size="lg"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-label text-fg-tertiary">
                <span>{p.program} · {p.age}{p.sex}</span>
                <Link
                  href={`/patients/${p.id}`}
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                >
                  Open chart
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Live queue + critical alerts split */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card variant="default" radius="2xl" padding="lg" className="lg:col-span-3">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex flex-col gap-1">
              <CardOverline>Virtual Care</CardOverline>
              <CardTitle>Live queue · {waiting.length} waiting</CardTitle>
            </div>
            <Link href="/visits" className="text-body-sm font-medium hover:underline">
              All visits →
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {visits.slice(0, 4).map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-bg-canvas/60 hover:bg-bg-canvas transition-colors"
              >
                <Avatar
                  size="md"
                  initials={v.patientInitials}
                  tone={v.priority === "stat" ? "danger" : "neutral"}
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-medium text-body">{v.patientName}</span>
                    <Badge
                      size="sm"
                      variant={
                        v.priority === "stat" ? "danger" : v.priority === "urgent" ? "warning" : "neutral"
                      }
                      dot
                    >
                      {v.priority}
                    </Badge>
                  </div>
                  <p className="text-body-sm text-fg-secondary line-clamp-1">{v.reason}</p>
                  <div className="flex items-center gap-2 text-label text-fg-tertiary">
                    <span>{v.modality}</span>
                    <span>·</span>
                    <span>
                      {v.status === "waiting" ? `Waiting ${v.waitSeconds}s` : v.scheduledFor}
                    </span>
                  </div>
                </div>
                <Button variant={v.status === "waiting" ? "accent" : "secondary"} size="sm">
                  {v.status === "waiting" ? "Join" : "Open"}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="default" radius="2xl" padding="lg" tone="danger" className="lg:col-span-2">
          <div className="flex flex-col gap-1 mb-6">
            <CardOverline>Critical surveillance</CardOverline>
            <CardTitle>Intervene within 4 hours</CardTitle>
            <CardDescription>2 members with cascading risk signals</CardDescription>
          </div>

          <div className="flex flex-col gap-3">
            {flagged
              .filter((p) => p.riskLevel === "critical")
              .map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col gap-2 p-4 rounded-xl bg-bg-surface"
                >
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" initials={p.initials} tone="danger" />
                    <span className="font-display font-medium">{p.name}</span>
                  </div>
                  <span className="text-body-sm text-danger-fg">{p.flag}</span>
                  <div className="flex items-center gap-2 pt-1">
                    <Button variant="danger" size="sm">Escalate</Button>
                    <Link
                      href={`/patients/${p.id}`}
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                    >
                      Open chart
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </section>
    </>
  );
}
