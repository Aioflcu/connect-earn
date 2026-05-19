import { Link } from "@tanstack/react-router";
import { Briefcase, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground">
                <Briefcase className="h-4 w-4" />
              </span>
              Workly
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              The marketplace where ambitious teams hire the world's best independent talent — fast.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "For clients", links: [["Post a job","/post-job"],["Browse talent","/freelancers"],["How it works","/"]]},
            { title: "For talent", links: [["Find work","/jobs"],["My proposals","/proposals"],["Onboarding","/onboarding"]]},
            { title: "Company", links: [["About","/about"],["Pricing","/pricing"],["FAQ","/faq"]]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-primary">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map(([label, href]) => (
                  <li key={label}><Link to={href as string} className="hover:text-primary">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Workly Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
