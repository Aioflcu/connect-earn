import { Link } from "react-router-dom";import { PageHeader } from "@/components/common/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

({
  component: FaqPage,
  head: () => ({ meta: [
    { title: "FAQ — Workly" },
    { name: "description", content: "Answers to the most common questions about hiring and freelancing on Workly." },
  ]}),
});

const FAQS = [
  { q: "How does Workly vet freelancers?", a: "Every freelancer goes through a multi-step process: portfolio review, skills assessment, identity verification, and a short interview with our talent team. Less than 3% of applicants are accepted." },
  { q: "How does escrow protection work?", a: "When you fund a milestone, money is held safely in escrow. It's only released to the freelancer once you approve the deliverable. If something goes wrong, our dispute team mediates." },
  { q: "What fees does Workly charge?", a: "Freelancers pay nothing. Clients pay a 5% service fee on completed contracts. There are no setup fees, no posting fees, and no hidden costs." },
  { q: "Can I hire long-term?", a: "Absolutely. Many of our top relationships span years. You can hire on hourly, fixed-price, or retainer contracts and renew anytime." },
  { q: "What if I'm not happy with the work?", a: "You only release funds when you're satisfied. If there's a dispute, our team reviews evidence from both sides and issues a fair resolution — including full refunds when warranted." },
  { q: "Do you support teams?", a: "Yes. The Business plan supports up to 5 team seats with shared billing, roles, and analytics. Enterprise customers get SSO, SCIM, and a dedicated success manager." },
  { q: "How fast can I hire?", a: "Most clients receive their first proposals within 30 minutes of posting a job. Many teams hire within 24 hours." },
  { q: "What about taxes and contracts?", a: "We generate compliant contracts in 180+ countries, handle 1099 reporting in the US, and provide invoices for every transaction. Tax forms are downloadable from your dashboard." },
];

function FaqPage() {
  return (
    <>
      <PageHeader title="Frequently asked questions" description="Everything you need to know about hiring and freelancing on Workly." />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4 sm:px-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-primary">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-8 text-center">
          <h3 className="font-display text-xl font-bold text-primary">Still have questions?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Our team replies within a few hours, every day of the week.</p>
          <Button asChild className="mt-4 bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/messages">Contact support</Link></Button>
        </div>
      </section>
    </>
  );
}

export default FaqPage;
