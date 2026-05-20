import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Briefcase, Users, PlusCircle, LayoutDashboard, MessageSquare, Settings, Home, Sun, Moon, HelpCircle, DollarSign, Info } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string) => { setOpen(false); navigate(to); };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}><Home className="mr-2 h-4 w-4" />Home</CommandItem>
          <CommandItem onSelect={() => go("/jobs")}><Briefcase className="mr-2 h-4 w-4" />Find Work</CommandItem>
          <CommandItem onSelect={() => go("/freelancers")}><Users className="mr-2 h-4 w-4" />Find Talent</CommandItem>
          <CommandItem onSelect={() => go("/messages")}><MessageSquare className="mr-2 h-4 w-4" />Messages</CommandItem>
          <CommandItem onSelect={() => go("/settings")}><Settings className="mr-2 h-4 w-4" />Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => go("/post-job")}><PlusCircle className="mr-2 h-4 w-4" />Post a Job</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/client")}><LayoutDashboard className="mr-2 h-4 w-4" />Client Dashboard</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/freelancer")}><LayoutDashboard className="mr-2 h-4 w-4" />Freelancer Dashboard</CommandItem>
          <CommandItem onSelect={() => { setOpen(false); toggle(); }}>
            {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            Toggle {theme === "dark" ? "light" : "dark"} mode
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Company">
          <CommandItem onSelect={() => go("/about")}><Info className="mr-2 h-4 w-4" />About</CommandItem>
          <CommandItem onSelect={() => go("/pricing")}><DollarSign className="mr-2 h-4 w-4" />Pricing</CommandItem>
          <CommandItem onSelect={() => go("/faq")}><HelpCircle className="mr-2 h-4 w-4" />FAQ</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
