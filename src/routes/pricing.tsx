import { Link } from "react-router-dom";import { useState } from "react";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

({
  component: PricingPage,
  head: () => ({ meta: [
    { title: "Pricing — Workly" },
    { name: "description", content: "Simple, transparent pricing for clients and freelancers. Pay only for the work you love." },
  ]}),
});

const PLANS = [
  {
    name: "Starter", monthly: 0, yearly: 0,
    desc: "Perfect for trying out Workly.",
    features: ["Post unlimited jobs", "Browse all freelancers", "Basic messaging", "Standard escrow"],
    cta: "Get started", highlight: false,
  },
  {
    name: "Business", monthly: 49, yearly: 39,
    desc: "Built for teams hiring regularly.",
    features: ["Everything in Starter", "Priority support", "Team seats (up to 5)", "Advanced analytics", "Custom contracts"],
    cta: "Start free trial", highlight: true,
  },
  {
    name: "Enterprise", monthly: 199, yearly: 159,
    desc: "For organisations at scale.",
    features: ["Everything in Business", "Dedicated success manager", "SSO & SCIM", "Custom invoicing", "SLA & compliance"],
    cta: "Contact sales", highlight: false,
  },
];

function PricingPage() {
  const [yearly, setYearly] = useState(true);

  return (
    <>
      <PageHeader title="Pricing" description="Simple, transparent pricing. No setup fees. Cancel anytime." />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className={cn("text-sm", !yearly && "font-semibold text-primary")}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} />
          <span className={cn("text-sm", yearly && "font-semibold text-primary")}>Yearly</span>
          <Badge className="bg-brand/10 text-brand hover:bg-brand/15">Save 20%</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={cn(
              "relative rounded-2xl border bg-card p-8 transition-all hover:shadow-lg",
              p.highlight ? "border-brand shadow-md ring-1 ring-brand/30" : "border-border"
            )}>
              {p.highlight && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-brand-foreground hover:bg-brand">Most popular</Badge>}
              <h3 className="font-display text-xl font-bold text-primary">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-primary">${yearly ? p.yearly : p.monthly}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <Button asChild className={cn("mt-6 w-full", p.highlight ? "bg-brand text-brand-foreground hover:bg-brand/90" : "")} variant={p.highlight ? "default" : "outline"}>
                <Link to="/signup">{p.cta}</Link>
              </Button>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-primary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-secondary/30 p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-primary">Freelancers always pay 0%</h3>
          <p className="mt-2 text-muted-foreground">We charge clients a transparent 5% service fee on completed contracts. No hidden charges.</p>
        </div>
      </section>
    </>
  );
}

export default PricingPage;
