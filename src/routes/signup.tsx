import { Link, useNavigate } from "react-router-dom";import { useState } from "react";
import { Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import type { Role } from "@/lib/types";

({ component: SignupPage });

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!role) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-center font-display text-3xl font-bold text-primary">Join Workly</h1>
        <p className="mt-2 text-center text-muted-foreground">How do you plan to use Workly?</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            { r: "client", icon: Briefcase, title: "I'm a client", desc: "Hire freelancers for projects." },
            { r: "freelancer", icon: Users, title: "I'm a freelancer", desc: "Find work and grow your career." },
          ].map((o) => (
            <button key={o.r} onClick={() => setRole(o.r as Role)} className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand"><o.icon className="h-6 w-6" /></div>
              <div>
                <h3 className="font-semibold text-primary">{o.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
              </div>
              <span className="mt-auto text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">Continue →</span>
            </button>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-medium text-brand hover:underline">Log in</Link></p>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Enter your full name.";
    if (!form.email.includes("@")) errs.email = "Enter a valid email.";
    if (form.password.length < 6) errs.password = "Use 6+ characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const r = signup({ ...form, role });
    setSubmitting(false);
    if (!r.ok) { toast.error(r.error ?? "Signup failed"); return; }
    toast.success(`Welcome to Workly, ${form.name.split(" ")[0]}!`);
    navigate({ to: role === "freelancer" ? "/onboarding" : "/dashboard/client" });
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-md place-items-center px-4 py-10">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-primary">Create your account</h1>
          <p className="text-sm text-muted-foreground">Joining as a <span className="font-medium text-brand capitalize">{role}</span> · <button className="underline" onClick={() => setRole(null)}>change</button></p>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="pw">Password</Label>
            <Input id="pw" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1.5" />
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full bg-brand text-brand-foreground hover:bg-brand/90" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">By signing up you agree to our Terms & Privacy.</p>
        </form>
      </div>
    </div>
  );
}
