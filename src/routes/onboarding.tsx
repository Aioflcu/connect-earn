import { useNavigate } from "react-router-dom";import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ALL_SKILLS } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const STEPS = ["Profile","Skills","Rate","Portfolio","Done"];

function Onboarding() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(user?.title ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [skills, setSkills] = useState<string[]>(user?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [rate, setRate] = useState(String(user?.hourlyRate ?? 50));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const addSkill = (s: string) => { const v = s.trim(); if (!v || skills.includes(v)) return; setSkills([...skills, v]); setSkillInput(""); };

  const finish = () => {
    updateUser({ title, bio, location, skills, hourlyRate: Number(rate) || 50, onboarded: true });
    toast.success("Profile created!");
    navigate("/dashboard/freelancer");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-primary">Set up your freelancer profile</h1>
      <p className="mt-1 text-muted-foreground">A few quick steps so clients can find and trust you.</p>
      <div className="mt-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${i < step ? "bg-brand text-brand-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-brand" : "bg-border"}`} />}
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-4">
            <div><Label htmlFor="title">Professional title</Label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior Full-Stack Developer" className="mt-1.5" /></div>
            <div><Label htmlFor="loc">Location</Label><Input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" className="mt-1.5" /></div>
            <div><Label htmlFor="bio">Short bio</Label><Textarea id="bio" rows={5} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell clients about your experience and what you do best." className="mt-1.5" /></div>
          </div>
        )}
        {step === 1 && (
          <div>
            <Label>Your top skills</Label>
            <div className="mt-1.5 flex gap-2">
              <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); } }} placeholder="Add a skill" list="sk-list" />
              <datalist id="sk-list">{ALL_SKILLS.map((s) => <option key={s} value={s} />)}</datalist>
              <Button type="button" variant="outline" onClick={() => addSkill(skillInput)}>Add</Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">{skills.map((s) => <Badge key={s} variant="secondary" className="cursor-pointer rounded-full" onClick={() => setSkills(skills.filter((x) => x !== s))}>{s} ×</Badge>)}</div>
            <p className="mt-3 text-xs text-muted-foreground">Popular: {ALL_SKILLS.slice(0, 6).join(", ")}</p>
          </div>
        )}
        {step === 2 && (
          <div>
            <Label htmlFor="rate">Hourly rate ($/hr)</Label>
            <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1.5" />
            <p className="mt-2 text-xs text-muted-foreground">You can change this anytime. Most freelancers in your category charge $40–$120/hr.</p>
          </div>
        )}
        {step === 3 && (
          <div>
            <Label>Add portfolio samples</Label>
            <div className="mt-2 grid place-items-center rounded-xl border-2 border-dashed border-border bg-secondary/30 px-6 py-12 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">Drag & drop images or browse (mock)</p>
              <Button variant="outline" className="mt-3" type="button">Choose files</Button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand"><CheckCircle2 className="h-8 w-8" /></div>
            <h2 className="mt-4 font-display text-2xl font-bold text-primary">You're all set!</h2>
            <p className="mt-2 text-muted-foreground">Your profile is ready to attract clients.</p>
          </div>
        )}
        <div className="mt-8 flex justify-between border-t border-border pt-5">
          <Button variant="outline" onClick={back} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> Back</Button>
          {step < STEPS.length - 1 ? (
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button className="bg-brand text-brand-foreground hover:bg-brand/90" onClick={finish}>Go to dashboard</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
