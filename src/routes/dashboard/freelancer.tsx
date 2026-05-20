import { Link, useNavigate } from "react-router-dom";import { useEffect, useState } from "react";
import { Briefcase, DollarSign, Star, TrendingUp } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { storage } from "@/lib/storage";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/jobs/JobCard";
import type { Proposal } from "@/lib/types";

const EARNINGS = [
  { m: "Jan", v: 1200 },{ m: "Feb", v: 1800 },{ m: "Mar", v: 2400 },
  { m: "Apr", v: 2100 },{ m: "May", v: 3200 },{ m: "Jun", v: 3800 },
  { m: "Jul", v: 3400 },{ m: "Aug", v: 4100 },{ m: "Sep", v: 4600 },
];

function FreelancerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    setProposals(storage.getProposals().filter((p) => p.freelancerId === user.id));
  }, [user, navigate]);

  const completion = [user?.title, user?.bio, user?.skills?.length, user?.hourlyRate].filter(Boolean).length * 25;

  const stats = [
    { label: "Active proposals", v: proposals.filter((p) => p.status === "pending").length, icon: Briefcase },
    { label: "Accepted", v: proposals.filter((p) => p.status === "accepted").length, icon: Star },
    { label: "Earned (YTD)", v: "$26,600", icon: DollarSign },
    { label: "Success rate", v: "94%", icon: TrendingUp },
  ];

  return (
    <>
      <PageHeader title={`Hi ${user?.name.split(" ")[0] ?? ""}, here's your dashboard`} description="Track proposals, earnings, and new opportunities.">
        <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/jobs">Find work</Link></Button>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
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

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-primary">Earnings</h2>
            <p className="text-xs text-muted-foreground">Last 9 months</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <LineChart data={EARNINGS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" />
                  <XAxis dataKey="m" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="v" stroke="oklch(0.62 0.16 158)" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-primary">Profile completeness</h2>
            <Progress value={completion} className="mt-4" />
            <p className="mt-2 text-sm text-muted-foreground">{completion}% complete — a strong profile gets 3× more invites.</p>
            <Button asChild variant="outline" className="mt-4 w-full"><Link to="/settings">Complete profile</Link></Button>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-primary">Recommended jobs</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {JOBS.slice(0, 4).map((j) => <JobCard key={j.id} job={j} />)}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-primary">Your proposals</h2>
          {proposals.length === 0 ? (
            <EmptyState icon={Briefcase} title="No proposals yet" action={<Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/jobs">Browse jobs</Link></Button>} />
          ) : (
            <div className="grid gap-3">
              {proposals.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
                  <div>
                    <div className="font-medium text-primary">{p.jobTitle}</div>
                    <div className="text-xs text-muted-foreground">${p.bidAmount} · {p.estimatedDuration}</div>
                  </div>
                  <Badge variant={p.status === "accepted" ? "default" : p.status === "declined" ? "destructive" : "secondary"}>{p.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default FreelancerDashboard;
