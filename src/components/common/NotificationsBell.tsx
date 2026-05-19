import { useState } from "react";
import { Bell, Briefcase, MessageSquare, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Notif = { id: string; icon: any; title: string; desc: string; time: string; unread: boolean };

const INITIAL: Notif[] = [
  { id: "1", icon: Briefcase, title: "New job match", desc: "“Senior React Engineer” fits your profile", time: "2m ago", unread: true },
  { id: "2", icon: MessageSquare, title: "New message", desc: "Sarah Chen sent you a message", time: "1h ago", unread: true },
  { id: "3", icon: CheckCircle2, title: "Proposal shortlisted", desc: "Your proposal for Acme has been shortlisted", time: "3h ago", unread: true },
  { id: "4", icon: Star, title: "New 5-star review", desc: "Great work on the landing page redesign", time: "1d ago", unread: false },
];

export function NotificationsBell() {
  const [items, setItems] = useState<Notif[]>(INITIAL);
  const unread = items.filter((n) => n.unread).length;

  const markAll = () => setItems((xs) => xs.map((n) => ({ ...n, unread: false })));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-sm font-semibold text-primary">Notifications</div>
          {unread > 0 && <button onClick={markAll} className="text-xs font-medium text-brand hover:underline">Mark all read</button>}
        </div>
        <ul className="max-h-96 overflow-auto">
          {items.map((n) => (
            <li key={n.id} className={cn("flex items-start gap-3 border-b border-border/60 px-4 py-3 last:border-b-0", n.unread && "bg-brand/[0.04]")}>
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-brand">
                <n.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-primary">{n.title}</div>
                <div className="truncate text-xs text-muted-foreground">{n.desc}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</div>
              </div>
              {n.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />}
            </li>
          ))}
        </ul>
        <div className="border-t border-border px-4 py-2 text-center">
          <button className="text-xs font-medium text-muted-foreground hover:text-primary">View all activity</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
