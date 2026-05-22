import Link from "next/link";
import { CheckCircle2, FileText, Filter, Plus, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardOverline, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notes, type ClinicalNote } from "@/lib/data/notes";

function NoteCard({ note }: { note: ClinicalNote }) {
  const isDraft = note.status === "ai-draft";

  return (
    <Card
      variant={isDraft ? "float" : "default"}
      radius="2xl"
      padding="lg"
      className="group hover:shadow-float transition-shadow"
    >
      <div className="flex items-start gap-4 flex-wrap">
        <Avatar
          size="lg"
          initials={note.patientInitials}
          tone={isDraft ? "danger" : "accent"}
          ring="soft"
        />

        <div className="flex flex-col gap-2 flex-1 min-w-[260px]">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="overline" size="sm">{note.kind}</Badge>
            {note.aiAssisted ? (
              <Badge variant="accent" size="sm">
                <Sparkles className="h-3 w-3" /> AI-assisted
              </Badge>
            ) : null}
            <Badge
              size="sm"
              variant={note.status === "signed" ? "success" : note.status === "ai-draft" ? "danger" : "warning"}
              dot
            >
              {note.status === "signed" ? "Signed" : note.status === "ai-draft" ? "AI draft" : "In review"}
            </Badge>
          </div>

          <h3 className="font-display text-title-lg font-semibold tracking-tight leading-snug">
            {note.title}
          </h3>

          <p className="text-body text-fg-secondary leading-relaxed line-clamp-3">
            {note.preview}
          </p>

          <div className="flex items-center gap-3 text-label text-fg-tertiary pt-1">
            <Link
              href={`/patients/${note.patientId}`}
              className="hover:text-fg-primary"
            >
              {note.patientName}
            </Link>
            <span className="font-mono">{note.mrn}</span>
            <span>·</span>
            <span>{note.authoredBy}</span>
            <span>·</span>
            <span>{note.drafted}</span>
          </div>

          {note.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {note.tags.map((t) => (
                <Badge key={t} variant="neutral" size="sm">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-border-subtle pt-4">
        <Link
          href={`/patients/${note.patientId}`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          Open chart
        </Link>
        {note.status === "signed" ? (
          <Button variant="secondary" size="sm">View signed note</Button>
        ) : note.status === "in-review" ? (
          <>
            <Button variant="secondary" size="sm">Edit</Button>
            <Button variant="primary" size="sm">
              <CheckCircle2 className="h-3.5 w-3.5" /> Sign
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm">Discard draft</Button>
            <Button variant="primary" size="sm">Review draft</Button>
          </>
        )}
      </div>
    </Card>
  );
}

export default function NotesPage() {
  const drafts = notes.filter((n) => n.status === "ai-draft");
  const inReview = notes.filter((n) => n.status === "in-review");
  const signed = notes.filter((n) => n.status === "signed");

  return (
    <>
      <PageHeader
        overline="Clinical notes"
        title="Your day, in plain language."
        description="AI drafts a note after every visit, lab review, or surveillance event. You edit, sign, and the note lands in the patient chart."
        actions={
          <>
            <Button variant="secondary" size="lg">
              <Filter className="h-3.5 w-3.5" /> Filter
            </Button>
            <Button variant="primary" size="lg">
              <Plus className="h-3.5 w-3.5" /> New note
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 lg:gap-x-12 border-t border-border-subtle pt-8">
        <StatCard label="AI drafts" value={`${drafts.length}`} unit="waiting" delta="needs review" trend="up" tone="danger" layout="hero" surface="bare" />
        <StatCard label="In review" value={`${inReview.length}`} unit="notes" delta="—" trend="flat" tone="warning" layout="hero" surface="bare" />
        <StatCard label="Signed today" value="7" unit="notes" delta="+2 vs yesterday" trend="up" tone="success" layout="hero" surface="bare" />
        <StatCard label="Avg sign time" value="2.1" unit="min" delta="−40s wk/wk" trend="down" tone="success" layout="hero" surface="bare" />
      </section>

      <Tabs defaultValue="drafts">
        <TabsList variant="pill">
          <TabsTrigger value="drafts" variant="pill">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> AI drafts · {drafts.length}
          </TabsTrigger>
          <TabsTrigger value="review" variant="pill">In review · {inReview.length}</TabsTrigger>
          <TabsTrigger value="signed" variant="pill">Signed · {signed.length}</TabsTrigger>
        </TabsList>

        <TabsContent value="drafts">
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between flex-wrap gap-2">
              <div className="flex flex-col gap-1">
                <CardOverline>AI-drafted</CardOverline>
                <CardTitle>Notes waiting on you</CardTitle>
              </div>
              <Badge variant="accent" size="md" dot>
                <Sparkles className="h-3 w-3" /> {drafts.length} new this hour
              </Badge>
            </div>
            <div className="flex flex-col gap-3">
              {drafts.map((n) => <NoteCard key={n.id} note={n} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="review">
          <div className="flex flex-col gap-3">
            <CardTitle>In review</CardTitle>
            <div className="flex flex-col gap-3">
              {inReview.map((n) => <NoteCard key={n.id} note={n} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="signed">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-fg-tertiary" />
              <CardTitle>Recently signed</CardTitle>
            </div>
            <div className="flex flex-col gap-3">
              {signed.map((n) => <NoteCard key={n.id} note={n} />)}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
