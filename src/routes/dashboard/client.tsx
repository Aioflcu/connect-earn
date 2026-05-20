import { Link, useNavigate } from "react-router-dom";import { useEffect, useState } from "react";
import { Briefcase, DollarSign, Users, TrendingUp, Check, X } from "lucide-react";
import { storage } from "@/lib/storage";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import type { Job, Proposal } from "@/lib/types";

({ component: ClientDashboard });

function ClientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    setJobs(storage.getPostedJobs());
    setProposals(storage.getProposals());
  }, [user, navigate]);

  const updateProposal = (id: string, status: Proposal["status"]) => {
    const next = proposals.map((p) => (p.id === id ? { ...p, status } : p));
    storage.setProposals(next); setProposals(next);
    toast.success(`Proposal ${status}`);
  };

  const stats = [
    { label: "Active jobs", v: jobs.length, icon: Briefcase },
    { label: "Proposals", v: proposals.length, icon: Users },
    { label: "Spent", v: "$12,400", icon: DollarSign },
    { label: "Hire rate", v: "82%", icon: TrendingUp },
  ];

  return (
    <>
      <PageHeader title={`Welcome back, ${user?.name.split(" ")[0] ?? ""}`} description="Manage your jobs, proposals, and contracts.">
        <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/post-job">Post a new job</Link></Button>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
                <s.icon className="h-4 w-4 text-brand" />
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-primary">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-primary">Your posted jobs</h2>
            {jobs.length === 0 ? (
              <EmptyState icon={Briefcase} title="You haven't posted any jobs" description="Post your first job to start receiving proposals from top freelancers." action={<Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/post-job">Post a job</Link></Button>} />
            ) : (
              <div className="space-y-3">
                {jobs.map((j) => (
                  <Link key={j.id} to={`/jobs/${j.id}`} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40">
                    <div>
                      <h3 className="font-semibold text-primary">{j.title}</h3>
                      <p className="text-xs text-muted-foreground">Posted {j.postedAt} · {j.proposalsCount} proposals</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold text-primary">Recent proposals</h2>
            {proposals.length === 0 ? (
              <EmptyState icon={Users} title="No proposals yet" description="Once freelancers apply, they'll show here." />
            ) : (
              <div className="space-y-3">
                {proposals.slice(0, 5).map((p) => (
                  <div key={p.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9"><AvatarImage src={p.freelancerAvatar} /><AvatarFallback>{p.freelancerName[0]}</AvatarFallback></Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-primary">{p.freelancerName}</div>
                        <div className="truncate text-xs text-muted-foreground">{p.jobTitle}</div>
                        <div className="mt-1 text-xs text-primary">${p.bidAmount} · {p.estimatedDuration}</div>
                      </div>
                    </div>
                    {p.status === "pending" ? (
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="h-7 flex-1 bg-brand text-brand-foreground hover:bg-brand/90" onClick={() => updateProposal(p.id, "accepted")}><Check className="h-3 w-3" /> Accept</Button>
                        <Button size="sm" variant="outline" className="h-7 flex-1" onClick={() => updateProposal(p.id, "declined")}><X className="h-3 w-3" /> Decline</Button>
                      </div>
                    ) : (
                      <Badge className="mt-2" variant={p.status === "accepted" ? "default" : "secondary"}>{p.status}</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
