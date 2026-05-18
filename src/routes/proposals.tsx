import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import { storage } from "@/lib/storage";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import type { Proposal } from "@/lib/types";

export const Route = createFileRoute("/proposals")({ component: ProposalsPage });

function ProposalsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!user) { navigate({ to: "/login" }); return; }
    setProposals(storage.getProposals().filter((p) => p.freelancerId === user.id));
  }, [user, navigate]);

  const withdraw = (id: string) => {
    const next = proposals.map((p) => p.id === id ? { ...p, status: "withdrawn" as const } : p);
    storage.setProposals(next); setProposals(next);
    toast.success("Proposal withdrawn");
  };

  const tabs: { v: string; label: string; filter: (p: Proposal) => boolean }[] = [
    { v: "all", label: "All", filter: () => true },
    { v: "pending", label: "Pending", filter: (p) => p.status === "pending" },
    { v: "accepted", label: "Accepted", filter: (p) => p.status === "accepted" },
    { v: "declined", label: "Declined", filter: (p) => p.status === "declined" },
  ];

  return (
    <>
      <PageHeader title="My proposals" description="Track the status of every proposal you've submitted." />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Tabs defaultValue="all">
          <TabsList>{tabs.map((t) => <TabsTrigger key={t.v} value={t.v}>{t.label}</TabsTrigger>)}</TabsList>
          {tabs.map((t) => {
            const list = proposals.filter(t.filter);
            return (
              <TabsContent key={t.v} value={t.v} className="mt-6">
                {list.length === 0 ? (
                  <EmptyState icon={Briefcase} title="No proposals" description="Browse open jobs and start applying." action={<Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/jobs">Find jobs</Link></Button>} />
                ) : (
                  <div className="space-y-3">
                    {list.map((p) => (
                      <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <Link to="/jobs/$jobId" params={{ jobId: p.jobId }} className="font-semibold text-primary hover:text-brand">{p.jobTitle}</Link>
                            <p className="mt-1 text-sm text-muted-foreground">Submitted {new Date(p.submittedAt).toLocaleDateString()} · ${p.bidAmount} · {p.estimatedDuration}</p>
                            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.coverLetter}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant={p.status === "accepted" ? "default" : p.status === "declined" ? "destructive" : "secondary"} className="capitalize">{p.status}</Badge>
                            {p.status === "pending" && <Button size="sm" variant="ghost" onClick={() => withdraw(p.id)}>Withdraw</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </section>
    </>
  );
}
