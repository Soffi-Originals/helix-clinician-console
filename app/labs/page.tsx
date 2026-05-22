import Link from "next/link";
import { Beaker, CheckCircle2, Droplet, FlaskConical, Plus, ScanLine } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardOverline, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { labOrders, type LabOrder } from "@/lib/data/labs";

const modalityIcon = {
  "Blood draw": Droplet,
  "Self-collect": ScanLine,
  Urine: Beaker,
  Saliva: FlaskConical,
} as const;

function LabRow({ order }: { order: LabOrder }) {
  const Icon = modalityIcon[order.modality];
  const ready = order.status === "ready";
  return (
    <Card
      variant="default"
      radius="2xl"
      padding="lg"
      className="group hover:shadow-float transition-shadow"
    >
      <div className="flex items-start gap-4 flex-wrap">
        <Avatar
          size="lg"
          initials={order.patientInitials}
          tone={order.priority === "stat" ? "danger" : "accent"}
          ring="soft"
        />
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/patients/${order.patientId}`}
              className="font-display text-title font-semibold tracking-tight hover:text-accent-strong"
            >
              {order.patientName}
            </Link>
            <span className="text-label font-mono text-fg-tertiary">{order.mrn}</span>
            {order.priority === "stat" ? (
              <Badge variant="danger" size="sm" dot>STAT</Badge>
            ) : null}
          </div>
          <span className="text-body text-fg-primary">{order.panel}</span>
          <div className="flex items-center gap-2 text-label text-fg-tertiary">
            <Icon className="h-3.5 w-3.5" />
            <span>{order.modality}</span>
            <span>·</span>
            <span className="font-mono">Ordered {order.ordered}</span>
            {order.turnaround && order.turnaround !== "—" ? (
              <>
                <span>·</span>
                <span className="font-mono">TAT {order.turnaround}</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 min-w-[180px]">
          <Badge
            size="md"
            variant={
              order.status === "signed-off"
                ? "success"
                : order.status === "ready"
                ? "warning"
                : order.status === "in-lab"
                ? "info"
                : "neutral"
            }
            dot
          >
            {order.status === "signed-off"
              ? "Signed off"
              : order.status === "ready"
              ? "Ready for review"
              : order.status === "in-lab"
              ? "In lab"
              : "Pending draw"}
          </Badge>
          <span className="text-label text-fg-tertiary">{order.due}</span>
        </div>
      </div>

      {order.flaggedMarkers && order.flaggedMarkers.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border-subtle pt-4">
          <span className="text-overline uppercase tracking-widest text-fg-tertiary font-semibold">
            Flagged
          </span>
          {order.flaggedMarkers.map((m) => (
            <Badge key={m} variant="danger" size="sm">
              {m}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-end gap-2">
        {ready ? (
          <>
            <Link
              href={`/patients/${order.patientId}`}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Open chart
            </Link>
            <Button variant="primary" size="sm">
              <CheckCircle2 className="h-3.5 w-3.5" /> Sign off
            </Button>
          </>
        ) : (
          <Link
            href={`/patients/${order.patientId}`}
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Open chart
          </Link>
        )}
      </div>
    </Card>
  );
}

export default function LabsPage() {
  const ready = labOrders.filter((o) => o.status === "ready");
  const inLab = labOrders.filter((o) => o.status === "in-lab");
  const pending = labOrders.filter((o) => o.status === "pending");
  const signedOff = labOrders.filter((o) => o.status === "signed-off");
  const statReady = ready.filter((o) => o.priority === "stat");

  return (
    <>
      <PageHeader
        overline="Lab operations"
        title="Clinical-grade labs. Your couch."
        description="Orders, in-lab samples, and panels awaiting clinician sign-off. STAT priorities are routed to the next available reviewer automatically."
        actions={
          <>
            <Button variant="secondary" size="lg">Phlebotomy schedule</Button>
            <Button variant="primary" size="lg">
              <Plus className="h-3.5 w-3.5" /> Order panel
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 lg:gap-x-12 border-t border-border-subtle pt-8">
        <StatCard label="Ready for sign-off" value={`${ready.length}`} unit="panels" delta={`${statReady.length} STAT`} trend="up" tone="warning" layout="hero" surface="bare" />
        <StatCard label="In lab" value={`${inLab.length}`} unit="samples" delta="results today" trend="flat" tone="neutral" layout="hero" surface="bare" />
        <StatCard label="Pending draw" value={`${pending.length}`} unit="orders" delta="scheduled" trend="flat" tone="neutral" layout="hero" surface="bare" />
        <StatCard label="Avg TAT" value="26" unit="hours" delta="−4h vs Q1" trend="down" tone="success" layout="hero" surface="bare" />
      </section>

      <Tabs defaultValue="ready">
        <TabsList variant="segmented">
          <TabsTrigger value="ready" variant="segmented">Ready · {ready.length}</TabsTrigger>
          <TabsTrigger value="in-lab" variant="segmented">In lab · {inLab.length}</TabsTrigger>
          <TabsTrigger value="pending" variant="segmented">Pending · {pending.length}</TabsTrigger>
          <TabsTrigger value="signed" variant="segmented">Signed · {signedOff.length}</TabsTrigger>
        </TabsList>

        <TabsContent value="ready">
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between flex-wrap gap-2">
              <div className="flex flex-col gap-1">
                <CardOverline>Awaiting sign-off</CardOverline>
                <CardTitle>{ready.length} panels released in the last 6 hours</CardTitle>
              </div>
              <Badge variant="accent" size="md" dot>Auto-routing on</Badge>
            </div>
            <div className="flex flex-col gap-3">
              {ready.map((o) => <LabRow key={o.id} order={o} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="in-lab">
          <div className="flex flex-col gap-3">
            <CardTitle>In lab</CardTitle>
            <div className="flex flex-col gap-3">
              {inLab.map((o) => <LabRow key={o.id} order={o} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="flex flex-col gap-3">
            <CardTitle>Pending phlebotomy</CardTitle>
            <div className="flex flex-col gap-3">
              {pending.map((o) => <LabRow key={o.id} order={o} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="signed">
          <div className="flex flex-col gap-3">
            <CardTitle>Recently signed off</CardTitle>
            <div className="flex flex-col gap-3">
              {signedOff.map((o) => <LabRow key={o.id} order={o} />)}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
