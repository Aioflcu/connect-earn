import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FREELANCERS, CATEGORIES } from "@/lib/mock-data";
import { FreelancerCard } from "@/components/freelancers/FreelancerCard";
import { SkeletonGrid } from "@/components/common/LoadingSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


function FreelancersPage() {
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [rate, setRate] = useState<[number, number]>([0, 200]);
  const [topRatedOnly, setTopRatedOnly] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t); }, []);

  const filtered = useMemo(() => FREELANCERS.filter((f) => {
    if (q && !`${f.name} ${f.title} ${f.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (category !== "all" && f.category !== category) return false;
    if (Number(minRating) > 0 && f.rating < Number(minRating)) return false;
    if (f.hourlyRate < rate[0] || f.hourlyRate > rate[1]) return false;
    if (topRatedOnly && !f.topRated) return false;
    return true;
  }), [q, category, minRating, rate, topRatedOnly]);

  return (
    <>
      <PageHeader title="Find your next collaborator" description={`${filtered.length} freelancers ready to work on your project.`} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5">
              <Label htmlFor="search">Search</Label>
              <div className="relative mt-1.5">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, skill, title..." className="pl-9" />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {CATEGORIES.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Minimum rating</Label>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["0","4","4.5","4.8"].map((v) => <SelectItem key={v} value={v}>{v === "0" ? "Any" : `${v}+`}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Hourly rate: ${rate[0]} – ${rate[1]}</Label>
                <Slider min={0} max={200} step={5} value={rate} onValueChange={(v) => setRate(v as [number, number])} className="mt-3" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Checkbox id="tro" checked={topRatedOnly} onCheckedChange={(v) => setTopRatedOnly(!!v)} />
                <Label htmlFor="tro" className="cursor-pointer text-sm font-normal text-muted-foreground">Top-rated only</Label>
              </div>
            </div>
          </aside>

          <div>
            {loading ? <SkeletonGrid count={6} /> : filtered.length === 0 ? (
              <EmptyState title="No freelancers found" description="Try widening your search filters." />
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {filtered.map((f) => <FreelancerCard key={f.id} freelancer={f} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default FreelancersPage;
