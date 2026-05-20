import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { JOBS, CATEGORIES } from "@/lib/mock-data";
import { storage } from "@/lib/storage";
import { JobCard } from "@/components/jobs/JobCard";
import { SkeletonGrid } from "@/components/common/LoadingSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

({
  component: JobsPage,
  head: () => ({ meta: [
    { title: "Browse jobs — Workly" },
    { name: "description", content: "Browse thousands of freelance jobs across web development, design, writing, marketing, data science, and more." },
  ]}),
});

const PAGE_SIZE = 8;

function JobsPage() {
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState(JOBS);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [budgetTypes, setBudgetTypes] = useState<string[]>([]);
  const [exp, setExp] = useState<string[]>([]);
  const [length, setLength] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    setAllJobs([...storage.getPostedJobs(), ...JOBS]);
    if (typeof window !== "undefined") {
      const s = sessionStorage.getItem("workly:search");
      if (s) { setQ(s); sessionStorage.removeItem("workly:search"); }
    }
    return () => clearTimeout(t);
  }, []);

  const toggle = (list: string[], v: string, setter: (l: string[]) => void) =>
    setter(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    let r = allJobs.filter((j) => {
      if (q && !`${j.title} ${j.description} ${j.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (category !== "all" && j.category !== category) return false;
      if (budgetTypes.length && !budgetTypes.includes(j.budgetType)) return false;
      if (exp.length && !exp.includes(j.experienceLevel)) return false;
      if (length.length && !length.includes(j.projectLength)) return false;
      return true;
    });
    if (sort === "budget-high") r = [...r].sort((a, b) => b.budgetMax - a.budgetMax);
    if (sort === "budget-low") r = [...r].sort((a, b) => a.budgetMin - b.budgetMin);
    if (sort === "proposals") r = [...r].sort((a, b) => a.proposalsCount - b.proposalsCount);
    return r;
  }, [allJobs, q, category, budgetTypes, exp, length, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [q, category, budgetTypes, exp, length, sort]);

  const activeFilters = (budgetTypes.length + exp.length + length.length) + (category !== "all" ? 1 : 0);

  const clearAll = () => { setQ(""); setCategory("all"); setBudgetTypes([]); setExp([]); setLength([]); };

  return (
    <>
      <PageHeader title="Find your next project" description={`${filtered.length.toLocaleString()} jobs matching your criteria.`}>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs" className="w-64 pl-9" />
          </div>
          <Button variant="outline" className="md:hidden" onClick={() => setFiltersOpen(!filtersOpen)}>
            <SlidersHorizontal className="h-4 w-4" /> Filters {activeFilters > 0 && `(${activeFilters})`}
          </Button>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className={`${filtersOpen ? "block" : "hidden"} space-y-6 lg:block`}>
            <FilterBlock title="Category">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {CATEGORIES.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </FilterBlock>

            <FilterBlock title="Budget type">
              {[["fixed","Fixed price"],["hourly","Hourly rate"]].map(([v,l]) => (
                <CheckboxRow key={v} id={`bt-${v}`} label={l} checked={budgetTypes.includes(v)} onChange={() => toggle(budgetTypes, v, setBudgetTypes)} />
              ))}
            </FilterBlock>

            <FilterBlock title="Experience level">
              {["Entry","Intermediate","Expert"].map((v) => (
                <CheckboxRow key={v} id={`ex-${v}`} label={v} checked={exp.includes(v)} onChange={() => toggle(exp, v, setExp)} />
              ))}
            </FilterBlock>

            <FilterBlock title="Project length">
              {["Less than 1 month","1 to 3 months","3 to 6 months","More than 6 months"].map((v) => (
                <CheckboxRow key={v} id={`l-${v}`} label={v} checked={length.includes(v)} onChange={() => toggle(length, v, setLength)} />
              ))}
            </FilterBlock>

            {activeFilters > 0 && (
              <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={clearAll}>
                <X className="h-4 w-4" /> Clear all filters
              </Button>
            )}
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{filtered.length} results</p>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="budget-high">Budget: high to low</SelectItem>
                  <SelectItem value="budget-low">Budget: low to high</SelectItem>
                  <SelectItem value="proposals">Fewest proposals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <SkeletonGrid count={6} />
            ) : pageItems.length === 0 ? (
              <EmptyState title="No jobs match your filters" description="Try adjusting your filters or search terms." action={<Button onClick={clearAll} variant="outline">Reset filters</Button>} />
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {pageItems.map((j) => <JobCard key={j.id} job={j} />)}
              </div>
            )}

            {pageCount > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                {Array.from({ length: pageCount }).map((_, i) => (
                  <Button key={i} size="sm" variant={page === i + 1 ? "default" : "outline"} className={page === i + 1 ? "bg-brand text-brand-foreground hover:bg-brand/90" : ""} onClick={() => setPage(i + 1)}>{i + 1}</Button>
                ))}
                <Button variant="outline" size="sm" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-3 text-sm font-semibold text-primary">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckboxRow({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-muted-foreground">{label}</Label>
    </div>
  );
}

export default JobsPage;
