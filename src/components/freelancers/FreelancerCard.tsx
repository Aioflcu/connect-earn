import { Link } from "react-router-dom";import { Award, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Freelancer } from "@/lib/types";

export function FreelancerCard({ freelancer: f }: { freelancer: Freelancer }) {
  return (
    <Link to={`/freelancers/${f.id}`} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-background ring-offset-2 ring-offset-background">
          <AvatarImage src={f.avatar} alt={f.name} />
          <AvatarFallback>{f.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-primary group-hover:text-brand">{f.name}</h3>
            {f.topRated && <Award className="h-4 w-4 text-brand" />}
          </div>
          <p className="line-clamp-1 text-sm text-muted-foreground">{f.title}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{f.rating} ({f.reviewsCount})</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{f.location.split(",").pop()?.trim()}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">${f.hourlyRate}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">/ hour</div>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{f.bio}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {f.skills.slice(0, 4).map((s) => (
          <Badge key={s} variant="secondary" className="rounded-full font-normal">{s}</Badge>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <span>{f.jobsCompleted} jobs · {f.successRate}% success</span>
        <span className={f.availability === "Available now" ? "text-brand font-medium" : ""}>{f.availability}</span>
      </div>
    </Link>
  );
}
