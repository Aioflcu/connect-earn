import { Link, useNavigate } from "react-router-dom";import { Search, Code2, Palette, PenLine, Megaphone, BrainCircuit, Film, ArrowRight, CheckCircle2, Star, Sparkles, Briefcase, Users, Shield } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, FREELANCERS, STATS, TESTIMONIALS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ICONS = { Code2, Palette, PenLine, Megaphone, BrainCircuit, Film };


function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && q.trim()) {
      sessionStorage.setItem("workly:search", q.trim());
    }
    navigate("/jobs");
  };

  const topFreelancers = FREELANCERS.filter((f) => f.topRated).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,oklch(0.62_0.16_158_/_0.18),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 rounded-full border-brand/40 bg-brand/5 px-3 py-1 text-brand">
              <Sparkles className="mr-1.5 h-3 w-3" /> Trusted by 50,000+ teams
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Hire the world's best <span className="text-brand">independent talent</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              From an idea to launch — Workly connects you with vetted freelancers across 600+ skills.
              Post a job in minutes and start collaborating the same day.
            </p>

            <form onSubmit={onSearch} className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <Input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Try 'React developer', 'brand designer', 'AI engineer'"
                className="h-10 flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
              />
              <Button type="submit" className="h-10 rounded-full bg-brand px-6 text-brand-foreground hover:bg-brand/90">
                Search
              </Button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Popular:</span>
              {["React Developer", "UI Designer", "Copywriter", "Data Scientist", "Video Editor"].map((t) => (
                <Link key={t} to="/jobs" className="rounded-full border border-border bg-card px-3 py-1 hover:border-brand/40 hover:text-brand">{t}</Link>
              ))}
            </div>
          </div>

          {/* stats */}
          <div className="mt-16 grid gap-6 rounded-2xl border border-border bg-card/70 p-8 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Browse by category</h2>
            <p className="mt-2 text-muted-foreground">Find talent in the disciplines that move your business forward.</p>
          </div>
          <Link to="/jobs" className="text-sm font-medium text-brand hover:underline">All categories →</Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon as keyof typeof ICONS];
            return (
              <Link key={c.slug} to="/jobs" className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${c.color}`}><Icon className="h-6 w-6" /></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary group-hover:text-brand">{c.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{c.count.toLocaleString()} active jobs</p>
                </div>
                <ArrowRight className="h-5 w-5 self-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary">How Workly works</h2>
            <p className="mt-2 text-muted-foreground">Three steps from idea to delivery.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Briefcase, title: "Post a job", desc: "Tell us what you need done. We'll match you with vetted talent in minutes." },
              { icon: Users, title: "Review proposals", desc: "Compare freelancers, chat with shortlisted candidates, and hire with confidence." },
              { icon: Shield, title: "Pay safely", desc: "Funds held in escrow until you approve the work. Refunds available if needed." },
            ].map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-border bg-card p-8">
                <div className="absolute -top-3 left-6 grid h-6 w-6 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">{i + 1}</div>
                <s.icon className="h-8 w-8 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top freelancers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Top-rated freelancers</h2>
            <p className="mt-2 text-muted-foreground">A glimpse of the talent waiting to work on your next project.</p>
          </div>
          <Link to="/freelancers" className="text-sm font-medium text-brand hover:underline">View all talent →</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topFreelancers.map((f) => (
            <Link key={f.id} to={`/freelancers/${f.id}`} className="group rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg">
              <Avatar className="mx-auto h-20 w-20"><AvatarImage src={f.avatar} /><AvatarFallback>{f.name[0]}</AvatarFallback></Avatar>
              <h3 className="mt-3 font-semibold text-primary group-hover:text-brand">{f.name}</h3>
              <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{f.title}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />{f.rating} · ${f.hourlyRate}/hr
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {f.skills.slice(0, 2).map((s) => <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold">Loved by ambitious teams</h2>
            <p className="mt-2 text-primary-foreground/70">From early-stage startups to public companies.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl bg-primary-foreground/[0.06] p-6 ring-1 ring-primary-foreground/10">
                <div className="flex gap-1 text-warning">{Array.from({length:5}).map((_,i)=> <Star key={i} className="h-4 w-4 fill-warning" />)}</div>
                <p className="mt-4 text-primary-foreground/90">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar><AvatarImage src={t.avatar} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-primary-foreground/60">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 p-10 md:grid-cols-2 md:p-14">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Ready to ship faster?</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Post your first job in under 2 minutes. No credit card required.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/post-job">Post a job</Link></Button>
              <Button asChild variant="outline"><Link to="/freelancers">Browse talent</Link></Button>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {["Free to post jobs","Vetted talent only","Escrow protection","24/7 support","No long-term contracts","Cancel anytime"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-primary"><CheckCircle2 className="h-4 w-4 text-brand" />{f}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomePage;
