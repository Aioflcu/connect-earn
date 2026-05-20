import { Link } from "react-router-dom";import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe2, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";

({
  component: AboutPage,
  head: () => ({ meta: [
    { title: "About — Workly" },
    { name: "description", content: "Workly's mission is to connect the world's best independent talent with ambitious teams who ship." },
  ]}),
});

const TEAM = [
  { name: "Amelia Stone", role: "CEO & Co-founder", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces" },
  { name: "Noah Park", role: "CTO & Co-founder", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces" },
  { name: "Priya Sharma", role: "Head of Design", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces" },
  { name: "Diego Alvarez", role: "Head of Trust & Safety", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop&crop=faces" },
];

const VALUES = [
  { icon: Sparkles, title: "Quality first", desc: "Every freelancer is vetted by humans, not algorithms." },
  { icon: ShieldCheck, title: "Trust & safety", desc: "Escrow, identity checks, and dispute resolution baked in." },
  { icon: Globe2, title: "Global by default", desc: "Talent and clients in 180+ countries collaborate daily." },
  { icon: HeartHandshake, title: "Long-term relationships", desc: "We optimise for repeat work, not transactions." },
];

function AboutPage() {
  return (
    <>
      <PageHeader title="About Workly" description="We're building the trusted home for independent work — where ambitious teams meet the world's best talent." />
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Our mission</h2>
            <p className="mt-4 text-muted-foreground">
              Workly exists because the future of work is borderless, flexible, and skill-first. We help startups
              and enterprises move from idea to launch by connecting them with vetted freelance engineers,
              designers, writers, and marketers — in minutes, not weeks.
            </p>
            <p className="mt-3 text-muted-foreground">
              Since 2021 we've enabled over <span className="font-semibold text-primary">$120M in payouts</span> to
              independent professionals across 180+ countries.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/jobs">Find work</Link></Button>
              <Button asChild variant="outline"><Link to="/post-job">Hire talent</Link></Button>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=700&fit=crop" alt="Team collaborating" className="rounded-2xl border border-border object-cover shadow-sm" />
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <v.icon className="h-8 w-8 text-brand" />
              <h3 className="mt-4 font-semibold text-primary">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl font-bold text-primary">Meet the team</h2>
          <p className="mt-2 text-muted-foreground">A small, senior group of operators, engineers, and designers.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6 text-center">
                <Avatar className="mx-auto h-20 w-20"><AvatarImage src={t.avatar} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
                <h3 className="mt-3 font-semibold text-primary">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
