import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/common/PageHeader";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: "", title: "", location: "", bio: "", hourlyRate: 0, skills: [] as string[], skillInput: "" });
  const [notifs, setNotifs] = useState({ email: true, proposals: true, messages: true, marketing: false });

  useEffect(() => {
    if (!user) { navigate({ to: "/login" }); return; }
    setForm({
      name: user.name, title: user.title ?? "", location: user.location ?? "",
      bio: user.bio ?? "", hourlyRate: user.hourlyRate ?? 0, skills: user.skills ?? [], skillInput: "",
    });
  }, [user, navigate]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: form.name, title: form.title, location: form.location,
      bio: form.bio, hourlyRate: Number(form.hourlyRate), skills: form.skills,
    });
    toast.success("Profile updated");
  };

  const addSkill = () => { const v = form.skillInput.trim(); if (!v || form.skills.includes(v)) return; setForm({ ...form, skills: [...form.skills, v], skillInput: "" }); };

  if (!user) return null;

  return (
    <>
      <PageHeader title="Settings" description="Manage your profile, rates, and notifications." />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <form onSubmit={save} className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16"><AvatarImage src={user.avatar} /><AvatarFallback>{user.name[0]}</AvatarFallback></Avatar>
            <div>
              <h2 className="font-semibold text-primary">{user.name}</h2>
              <p className="text-sm text-muted-foreground capitalize">{user.role} · joined {new Date(user.joinedAt).getFullYear()}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="name">Full name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" /></div>
            <div><Label htmlFor="loc">Location</Label><Input id="loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1.5" /></div>
          </div>
          {user.role === "freelancer" && (
            <>
              <div><Label htmlFor="t">Professional title</Label><Input id="t" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="b">Bio</Label><Textarea id="b" rows={5} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-1.5" /></div>
              <div><Label htmlFor="rate">Hourly rate ($/hr)</Label><Input id="rate" type="number" value={form.hourlyRate} onChange={(e) => setForm({ ...form, hourlyRate: Number(e.target.value) })} className="mt-1.5" /></div>
              <div>
                <Label>Skills</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input value={form.skillInput} onChange={(e) => setForm({ ...form, skillInput: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Add a skill" />
                  <Button type="button" variant="outline" onClick={addSkill}>Add</Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {form.skills.map((s) => <Badge key={s} variant="secondary" className="cursor-pointer rounded-full" onClick={() => setForm({ ...form, skills: form.skills.filter((x) => x !== s) })}>{s} ×</Badge>)}
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end"><Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">Save changes</Button></div>
        </form>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-primary">Notifications</h2>
          {([
            ["email","Email notifications"],
            ["proposals","New proposal updates"],
            ["messages","New messages"],
            ["marketing","Marketing & product news"],
          ] as const).map(([k, l]) => (
            <div key={k} className="flex items-center justify-between border-t border-border pt-4 first:border-t-0 first:pt-0">
              <span className="text-sm text-primary">{l}</span>
              <Switch checked={notifs[k]} onCheckedChange={(v) => { setNotifs({ ...notifs, [k]: v }); toast.success("Preference saved"); }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
