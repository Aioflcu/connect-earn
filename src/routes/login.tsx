import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email.includes("@")) errs.email = "Enter a valid email.";
    if (password.length < 6) errs.password = "Password must be 6+ characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const r = login(email, password);
    setSubmitting(false);
    if (!r.ok) { toast.error(r.error ?? "Login failed"); return; }
    toast.success(`Welcome back, ${r.user!.name.split(" ")[0]}!`);
    navigate({ to: r.user!.role === "client" ? "/dashboard/client" : "/dashboard/freelancer" });
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-md place-items-center px-4 py-10">
      <div className="w-full">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand text-brand-foreground"><Briefcase className="h-6 w-6" /></div>
          <h1 className="mt-4 font-display text-2xl font-bold text-primary">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Log in to your Workly account</p>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full bg-brand text-brand-foreground hover:bg-brand/90" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New to Workly? <Link to="/signup" className="font-medium text-brand hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
