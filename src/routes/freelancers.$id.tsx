import { Link, useNavigate, useParams } from "react-router-dom";import { useEffect, useState } from "react";
import { Award, ArrowLeft, MapPin, MessageSquare, Star, CheckCircle2, Briefcase } from "lucide-react";
import { FREELANCERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { Freelancer } from "@/lib/types";

({ component: FreelancerProfilePage });

function FreelancerProfilePage() {
  const { id } = useParams() as Record<string, string>;
  const navigate = useNavigate();
  const [f, setF] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setF(FREELANCERS.find((x) => x.id === id) ?? null); setLoading(false); }, 300);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-10"><Skeleton className="h-40 w-full rounded-2xl" /></div>;
  }
  if (!f) return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-primary">Freelancer not found</h1>
      <Button asChild className="mt-6"><Link to="/freelancers">Browse all talent</Link></Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/freelancers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to talent</Link>

      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="h-32 bg-gradient-to-r from-primary to-brand" />
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="-mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 ring-4 ring-card"><AvatarImage src={f.avatar} /><AvatarFallback>{f.name[0]}</AvatarFallback></Avatar>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold text-primary">{f.name}</h1>
                  {f.topRated && <Badge className="bg-brand text-brand-foreground hover:bg-brand"><Award className="mr-1 h-3 w-3" /> Top rated</Badge>}
                </div>
                <p className="mt-0.5 text-muted-foreground">{f.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{f.location}</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{f.rating} ({f.reviewsCount})</span>
                  <span className={f.availability === "Available now" ? "text-brand" : ""}>● {f.availability}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { toast.success("Conversation started"); navigate("/messages"); }}>
                <MessageSquare className="h-4 w-4" /> Message
              </Button>
              <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={() => toast.success(`Hired ${f.name}!`, { description: "Contract draft sent." })}>
                <Briefcase className="h-4 w-4" /> Hire {f.name.split(" ")[0]}
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Hourly rate", v: `$${f.hourlyRate}` },
              { label: "Jobs completed", v: f.jobsCompleted },
              { label: "Success rate", v: `${f.successRate}%` },
              { label: "Earned", v: f.earned },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-secondary/60 p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-lg font-bold text-primary">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6 space-y-6">
              <Section title="Bio"><p className="leading-relaxed text-muted-foreground">{f.bio}</p></Section>
              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">{f.skills.map((s) => <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>)}</div>
              </Section>
              <Section title="Languages">
                <ul className="space-y-1.5">{f.languages.map((l) => (<li key={l.name} className="flex items-center justify-between text-sm"><span className="text-primary">{l.name}</span><span className="text-muted-foreground">{l.level}</span></li>))}</ul>
              </Section>
            </TabsContent>
            <TabsContent value="portfolio" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {f.portfolio.map((p) => (
                  <div key={p.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="aspect-video overflow-hidden"><img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" /></div>
                    <div className="p-4">
                      <Badge variant="secondary" className="font-normal">{p.tag}</Badge>
                      <h4 className="mt-2 font-semibold text-primary">{p.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {f.workHistory.map((w) => (
                <div key={w.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-primary">{w.title}</h4>
                      <p className="text-xs text-muted-foreground">for {w.client} · {w.date}</p>
                    </div>
                    <div className="flex gap-0.5 text-warning">{Array.from({ length: w.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-warning" />)}</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">"{w.review}"</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="education" className="mt-6 space-y-6">
              <Section title="Education">
                <ul className="space-y-3">{f.education.map((e) => (<li key={e.school} className="flex items-start gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-brand"><Award className="h-5 w-5" /></div><div><div className="font-medium text-primary">{e.school}</div><div className="text-sm text-muted-foreground">{e.degree} · {e.year}</div></div></li>))}</ul>
              </Section>
              <Section title="Certifications">
                <ul className="space-y-3">{f.certifications.map((c) => (<li key={c.name} className="flex items-start gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-brand"><CheckCircle2 className="h-5 w-5" /></div><div><div className="font-medium text-primary">{c.name}</div><div className="text-sm text-muted-foreground">{c.issuer} · {c.year}</div></div></li>))}</ul>
              </Section>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-primary">Hire {f.name.split(" ")[0]}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Send a contract or invite to a job.</p>
            <Button className="mt-4 w-full bg-brand text-brand-foreground hover:bg-brand/90">Send invite</Button>
            <Button variant="outline" className="mt-2 w-full">Save profile</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-primary">{title}</h3>
      {children}
    </div>
  );
}

export default FreelancerProfilePage;
