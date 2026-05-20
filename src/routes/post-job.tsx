import { useNavigate } from "react-router-dom";import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { CATEGORIES, ALL_SKILLS } from "@/lib/mock-data";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

const STEPS = ["Basics","Category & skills","Budget","Review"] as const;

function PostJobPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    skills: [] as string[],
    skillInput: "",
    budgetType: "fixed" as "fixed" | "hourly",
    budgetMin: "",
    budgetMax: "",
    experienceLevel: "Intermediate" as "Entry"|"Intermediate"|"Expert",
    projectLength: "1 to 3 months" as const,
  });

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm((p) => ({ ...p, [k]: v }));

  const validate = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (form.title.trim().length < 10) e.title = "Title must be at least 10 characters.";
      if (form.description.trim().length < 50) e.description = "Description must be at least 50 characters.";
    }
    if (s === 1) {
      if (!form.category) e.category = "Pick a category.";
      if (form.skills.length === 0) e.skills = "Add at least one skill.";
    }
    if (s === 2) {
      const mn = Number(form.budgetMin), mx = Number(form.budgetMax);
      if (!mn || mn < 1) e.budgetMin = "Required.";
      if (!mx || mx < mn) e.budgetMax = "Max must be ≥ min.";
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const addSkill = (s: string) => {
    const v = s.trim();
    if (!v || form.skills.includes(v)) return;
    set("skills", [...form.skills, v]);
    set("skillInput", "");
  };

  const submit = () => {
    const job = {
      id: `j_${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      skills: form.skills,
      budgetType: form.budgetType,
      budgetMin: Number(form.budgetMin),
      budgetMax: Number(form.budgetMax),
      experienceLevel: form.experienceLevel,
      projectLength: form.projectLength,
      proposalsCount: 0,
      postedAt: "just now",
      client: {
        id: user?.id ?? "c_self",
        name: user?.name ?? "You",
        avatar: user?.avatar ?? "",
        rating: 5, jobsPosted: 1, hireRate: 100,
        location: user?.location ?? "Remote",
        totalSpent: "$0",
        memberSince: new Date().getFullYear().toString(),
        verified: true,
      },
    };
    storage.addPostedJob(job);
    toast.success("Job posted!", { description: "Freelancers can now find and apply to your job." });
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand"><CheckCircle2 className="h-8 w-8" /></div>
        <h1 className="mt-6 font-display text-3xl font-bold text-primary">Your job is live!</h1>
        <p className="mt-2 text-muted-foreground">We'll start surfacing it to qualified freelancers right away.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate("/jobs")}>Browse jobs</Button>
          <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={() => navigate("/dashboard/client")}>Go to dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-primary">Post a job</h1>
      <p className="mt-1 text-muted-foreground">Tell us about your project — we'll match you with the right talent.</p>

      <div className="mt-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-colors ${i < step ? "bg-brand text-brand-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`hidden text-sm sm:inline ${i === step ? "font-medium text-primary" : "text-muted-foreground"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-brand" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <Label htmlFor="title">Job title</Label>
              <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Senior React developer for SaaS dashboard" className="mt-1.5" />
              {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={8} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe your project, goals, deliverables, and what success looks like..." className="mt-1.5" />
              {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Pick a category" /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <div className="mt-1.5 flex gap-2">
                <Input id="skills" value={form.skillInput} onChange={(e) => set("skillInput", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(form.skillInput); } }} placeholder="Type a skill and press Enter" list="skills-list" />
                <datalist id="skills-list">{ALL_SKILLS.map((s) => <option key={s} value={s} />)}</datalist>
                <Button type="button" variant="outline" onClick={() => addSkill(form.skillInput)}>Add</Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {form.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full cursor-pointer" onClick={() => set("skills", form.skills.filter((x) => x !== s))}>
                    {s} ×
                  </Badge>
                ))}
              </div>
              {errors.skills && <p className="mt-1 text-xs text-destructive">{errors.skills}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Experience level</Label>
                <Select value={form.experienceLevel} onValueChange={(v) => set("experienceLevel", v as typeof form.experienceLevel)}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{["Entry","Intermediate","Expert"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Project length</Label>
                <Select value={form.projectLength} onValueChange={(v) => set("projectLength", v as typeof form.projectLength)}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{["Less than 1 month","1 to 3 months","3 to 6 months","More than 6 months"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <Label>Budget type</Label>
              <RadioGroup value={form.budgetType} onValueChange={(v) => set("budgetType", v as typeof form.budgetType)} className="mt-2 grid grid-cols-2 gap-3">
                {[["fixed","Fixed price","Best for well-defined projects"],["hourly","Hourly rate","Best for ongoing work"]].map(([v,l,d]) => (
                  <label key={v} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${form.budgetType === v ? "border-brand bg-brand/5" : "border-border"}`}>
                    <RadioGroupItem value={v} className="mt-1" />
                    <div><div className="font-medium text-primary">{l}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="min">{form.budgetType === "hourly" ? "Min rate ($/hr)" : "Min budget ($)"}</Label>
                <Input id="min" type="number" value={form.budgetMin} onChange={(e) => set("budgetMin", e.target.value)} className="mt-1.5" />
                {errors.budgetMin && <p className="mt-1 text-xs text-destructive">{errors.budgetMin}</p>}
              </div>
              <div>
                <Label htmlFor="max">{form.budgetType === "hourly" ? "Max rate ($/hr)" : "Max budget ($)"}</Label>
                <Input id="max" type="number" value={form.budgetMax} onChange={(e) => set("budgetMax", e.target.value)} className="mt-1.5" />
                {errors.budgetMax && <p className="mt-1 text-xs text-destructive">{errors.budgetMax}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-semibold text-primary">Review your job</h3>
            <dl className="divide-y divide-border rounded-xl border border-border">
              {[
                ["Title", form.title],
                ["Category", CATEGORIES.find((c) => c.slug === form.category)?.name ?? "—"],
                ["Skills", form.skills.join(", ")],
                ["Experience", form.experienceLevel],
                ["Length", form.projectLength],
                ["Budget", form.budgetType === "hourly" ? `$${form.budgetMin}–$${form.budgetMax}/hr` : `$${form.budgetMin}–$${form.budgetMax}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium text-primary">{v as string}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-muted-foreground">{form.description}</p>
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-border pt-5">
          <Button variant="outline" onClick={back} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> Back</Button>
          {step < STEPS.length - 1 ? (
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={submit}>Post job</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostJobPage;
