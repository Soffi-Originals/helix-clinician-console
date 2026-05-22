import { MessageSquare, Phone, Video } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardOverline, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { visits, type Visit } from "@/lib/data/visits";

const modalityIcon = {
  Video: Video,
  Phone: Phone,
  Chat: MessageSquare,
} as const;

function VisitCard({ visit }: { visit: Visit }) {
  const Icon = modalityIcon[visit.modality];
  return (
    <Card
      variant={visit.status === "waiting" ? "float" : "default"}
      radius="2xl"
      padding="lg"
      className="group hover:shadow-lift transition-shadow"
    >
      <div className="flex items-start gap-4">
        <Avatar
          size="lg"
          initials={visit.patientInitials}
          tone={visit.priority === "stat" ? "danger" : visit.priority === "urgent" ? "warning" : "accent"}
          ring="soft"
        />
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="font-display text-title font-semibold tracking-tight">{visit.patientName}</span>
          <p className="text-body-sm text-fg-secondary line-clamp-2">{visit.reason}</p>
        </div>
        <Badge
          variant={visit.priority === "stat" ? "danger" : visit.priority === "urgent" ? "warning" : "neutral"}
          size="sm"
          dot
        >
          {visit.priority}
        </Badge>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
        <div className="flex items-center gap-2 text-label text-fg-tertiary">
          <Icon className="h-3.5 w-3.5" />
          <span>{visit.modality}</span>
          <span>·</span>
          <span className="font-mono">
            {visit.status === "waiting" ? `Waiting ${visit.waitSeconds}s` : visit.scheduledFor}
          </span>
        </div>
        <Button variant={visit.status === "waiting" ? "accent" : "secondary"} size="sm">
          {visit.status === "waiting" ? "Join now" : "Open"}
        </Button>
      </div>
    </Card>
  );
}

export default function VisitsPage() {
  const waiting = visits.filter((v) => v.status === "waiting");
  const scheduled = visits.filter((v) => v.status === "scheduled");

  return (
    <>
      <section>
        <PageHeader
          overline="Virtual Care"
          title="See a doctor in under 2 minutes."
          description="Live queue of members waiting, scheduled visits, and completed sessions. Stat priorities are routed to the next available clinician automatically."
          actions={
            <Button variant="primary" size="lg">Open next visit</Button>
          }
        />
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Waiting" value={`${waiting.length}`} delta="2 stat" trend="up" tone="danger" hint="now" layout="hero" />
        <StatCard label="Avg. wait" value="65" unit="sec" delta="−22s" trend="down" tone="success" hint="vs. yesterday" layout="hero" />
        <StatCard label="Today" value="18" unit="visits" delta="3 unconfirmed" trend="flat" hint="next 2:30 PM" layout="hero" />
        <StatCard label="Provider load" value="62" unit="%" delta="3 active" trend="up" tone="warning" hint="SLO 80%" layout="hero" />
      </section>

      <Tabs defaultValue="live">
        <TabsList variant="segmented">
          <TabsTrigger value="live" variant="segmented">Live · {waiting.length}</TabsTrigger>
          <TabsTrigger value="scheduled" variant="segmented">Scheduled · {scheduled.length}</TabsTrigger>
          <TabsTrigger value="completed" variant="segmented">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-1">
                <CardOverline>Live queue</CardOverline>
                <CardTitle>Members waiting now</CardTitle>
              </div>
              <Badge variant="accent" size="md" dot>Auto-routing on</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {waiting.map((v) => <VisitCard key={v.id} visit={v} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="flex flex-col gap-3">
            <CardTitle>Scheduled for today</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {scheduled.map((v) => <VisitCard key={v.id} visit={v} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <Card variant="default" radius="2xl" padding="lg">
            <p className="text-body text-fg-secondary">No completed visits yet today.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
