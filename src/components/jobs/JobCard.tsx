import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/types";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { toast } from "sonner";

export function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => { setSaved(storage.getSaved().includes(job.id)); }, [job.id]);

  const onSave = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const next = storage.toggleSaved(job.id);
    const nowSaved = next.includes(job.id);
    setSaved(nowSaved);
    toast.success(nowSaved ? "Job saved" : "Removed from saved");
  };

  return (
    <Link to="/jobs/$jobId" params={{ jobId: job.id }} className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Posted {job.postedAt}</span>
            {job.featured && <Badge className="bg-accent text-accent-foreground hover:bg-accent">Featured</Badge>}
          </div>
          <h3 className="mt-1 truncate text-lg font-semibold text-primary group-hover:text-brand">{job.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="capitalize">{job.budgetType === "hourly" ? `$${job.budgetMin}–$${job.budgetMax}/hr` : `$${job.budgetMin.toLocaleString()}–$${job.budgetMax.toLocaleString()}`}</span>
            <span>·</span>
            <span>{job.experienceLevel}</span>
            <span>·</span>
            <span>{job.projectLength}</span>
          </div>
        </div>
        <button onClick={onSave} className="shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-brand" aria-label="Save job">
          {saved ? <BookmarkCheck className="h-4 w-4 text-brand" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 5).map((s) => (
          <Badge key={s} variant="secondary" className="rounded-full font-normal">{s}</Badge>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{job.proposalsCount} proposals</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{job.client.location}</span>
        </div>
        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{job.postedAt}</span>
      </div>
    </Link>
  );
}
