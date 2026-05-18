import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bookmark, BookmarkCheck, Briefcase, CheckCircle2, Clock, MapPin, Shield, Star, Users } from "lucide-react";
import { JOBS } from "@/lib/mock-data";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { CardSkeleton } from "@/components/common/LoadingSkeleton";
import type { Job } from "@/lib/types";

export const Route = createFileRoute("/jobs/$jobId")({ component: JobDetailPage });

function JobDetailPage() {
  const { jobId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const all = [...storage.getPostedJobs(), ...JOBS];
      setJob(all.find((j) => j.id === jobId) ?? null);
      setSaved(storage.getSaved().includes(jobId));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [jobId]);

  const onSave = () => {
    const next = storage.toggleSaved(jobId);
    const s = next.includes(jobId);
    setSaved(s);
    toast.success(s ? "Job saved" : "Removed from saved");
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"><CardSkeleton /></div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">Job not found</h1>
        <p className="mt-2 text-muted-foreground">This job may have been removed or never existed.</p>
        <Button asChild className="mt-6"><Link to="/jobs">Browse all jobs</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to jobs</Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <article>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Posted {job.postedAt} · {job.category}</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-primary">{job.title}</h1>
            </div>
            <Button variant="outline" size="icon" onClick={onSave}>
              {saved ? <BookmarkCheck className="h-5 w-5 text-brand" /> : <Bookmark className="h-5 w-5" />}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-4">
            <Stat label="Budget" value={job.budgetType === "hourly" ? `$${job.budgetMin}–$${job.budgetMax}/hr` : `$${job.budgetMin.toLocaleString()}–$${job.budgetMax.toLocaleString()}`} />
            <Stat label="Type" value={job.budgetType === "hourly" ? "Hourly" : "Fixed price"} />
            <Stat label="Experience" value={job.experienceLevel} />
            <Stat label="Length" value={job.projectLength} />
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-primary">About this project</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{job.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-primary">Skills required</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((s) => <Badge key={s} variant="secondary" className="rounded-full px-3 py-1">{s}</Badge>)}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {job.proposalsCount} proposals</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Posted {job.postedAt}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.client.location}</span>
            </div>
          </section>
        </article>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <ApplyButton job={job} user={user} onLoginNeeded={() => navigate({ to: "/login" })} />
            <Button variant="outline" className="mt-3 w-full" onClick={onSave}>
              {saved ? "Saved" : "Save job"}
            </Button>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4 text-brand" /> Payment protected by Workly Escrow
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-primary">About the client</h3>
            <div className="mt-4 flex items-center gap-3">
              <Avatar><AvatarImage src={job.client.avatar} /><AvatarFallback>{job.client.name[0]}</AvatarFallback></Avatar>
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  {job.client.name}
                  {job.client.verified && <CheckCircle2 className="h-4 w-4 text-brand" />}
                </div>
                <div className="text-xs text-muted-foreground">{job.client.location}</div>
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Rating" value={<span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{job.client.rating}</span>} />
              <Row label="Jobs posted" value={job.client.jobsPosted} />
              <Row label="Hire rate" value={`${job.client.hireRate}%`} />
              <Row label="Total spent" value={job.client.totalSpent} />
              <Row label="Member since" value={job.client.memberSince} />
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-primary">{value}</div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-primary">{value}</dd>
    </div>
  );
}

function ApplyButton({ job, user, onLoginNeeded }: { job: Job; user: ReturnType<typeof useAuth>["user"]; onLoginNeeded: () => void }) {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState("");
  const [bid, setBid] = useState(String(Math.round((job.budgetMin + job.budgetMax) / 2)));
  const [duration, setDuration] = useState("2 weeks");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handle = () => {
    if (!user) { onLoginNeeded(); return; }
    if (user.role !== "freelancer") {
      toast.error("Only freelancer accounts can submit proposals.");
      return;
    }
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (cover.trim().length < 40) errs.cover = "Cover letter must be at least 40 characters.";
    const bidNum = Number(bid);
    if (!bidNum || bidNum < 1) errs.bid = "Enter a valid bid amount.";
    if (!duration.trim()) errs.duration = "Required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    storage.addProposal({
      id: `p_${Date.now()}`,
      jobId: job.id, jobTitle: job.title,
      freelancerId: user!.id, freelancerName: user!.name, freelancerAvatar: user!.avatar,
      coverLetter: cover, bidAmount: bidNum, estimatedDuration: duration,
      status: "pending", submittedAt: new Date().toISOString(),
    });
    setSubmitting(false); setOpen(false);
    toast.success("Proposal submitted!", { description: "The client has been notified. Track status in My Proposals." });
    setCover(""); setBid(String(Math.round((job.budgetMin + job.budgetMax) / 2)));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="w-full bg-brand text-brand-foreground hover:bg-brand/90" onClick={handle}>
        <Briefcase className="h-4 w-4" /> Apply now
      </Button>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit a proposal</DialogTitle>
          <DialogDescription>For: <span className="font-medium text-primary">{job.title}</span></DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="cover">Cover letter</Label>
            <Textarea id="cover" rows={6} value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Introduce yourself, explain why you're a great fit, and outline your approach..." className="mt-1.5" />
            <div className="mt-1 flex justify-between text-xs">
              <span className={errors.cover ? "text-destructive" : "text-muted-foreground"}>{errors.cover ?? `${cover.length} / 1000`}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="bid">{job.budgetType === "hourly" ? "Hourly rate ($)" : "Bid amount ($)"}</Label>
              <Input id="bid" type="number" value={bid} onChange={(e) => setBid(e.target.value)} className="mt-1.5" />
              {errors.bid && <p className="mt-1 text-xs text-destructive">{errors.bid}</p>}
            </div>
            <div>
              <Label htmlFor="duration">Estimated duration</Label>
              <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-1.5" />
              {errors.duration && <p className="mt-1 text-xs text-destructive">{errors.duration}</p>}
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
            📎 Attach files (mock) — drag &amp; drop or browse
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit proposal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
