import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";
import { FREELANCERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/types";

export const Route = createFileRoute("/messages")({ component: MessagesPage });

function seed(): Conversation[] {
  return FREELANCERS.slice(0, 5).map((f, i) => ({
    id: `c${i}`, withId: f.id, withName: f.name, withAvatar: f.avatar, online: i % 2 === 0,
    messages: [
      { id: "m1", from: f.id, text: "Hi! Thanks for considering me for the project. Happy to discuss anything.", at: new Date(Date.now() - 1000 * 60 * 60 * (i + 1)).toISOString() },
      { id: "m2", from: "me", text: "Great — could you share a similar project you've worked on?", at: new Date(Date.now() - 1000 * 60 * 30 * (i + 1)).toISOString() },
      { id: "m3", from: f.id, text: "Absolutely, sending over a case study now.", at: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    ],
  }));
}

function MessagesPage() {
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let saved = storage.getConversations();
    if (saved.length === 0) { saved = seed(); storage.setConversations(saved); }
    setConvos(saved); setActiveId(saved[0]?.id ?? "");
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [activeId, convos]);

  const active = convos.find((c) => c.id === activeId);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !active) return;
    const updated = convos.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, { id: `m_${Date.now()}`, from: "me", text: text.trim(), at: new Date().toISOString() }] } : c);
    setConvos(updated); storage.setConversations(updated); setText("");
  };

  return (
    <>
      <PageHeader title="Messages" description="Stay in touch with your collaborators." />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[300px_1fr]">
          <aside className="overflow-y-auto border-r border-border">
            {convos.map((c) => (
              <button key={c.id} onClick={() => setActiveId(c.id)} className={cn("flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-secondary/60", activeId === c.id && "bg-secondary")}>
                <div className="relative">
                  <Avatar className="h-10 w-10"><AvatarImage src={c.withAvatar} /><AvatarFallback>{c.withName[0]}</AvatarFallback></Avatar>
                  {c.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-brand" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-primary">{c.withName}</div>
                  <div className="truncate text-xs text-muted-foreground">{c.messages.at(-1)?.text}</div>
                </div>
              </button>
            ))}
          </aside>
          {active ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-3 border-b border-border p-4">
                <Avatar className="h-9 w-9"><AvatarImage src={active.withAvatar} /><AvatarFallback>{active.withName[0]}</AvatarFallback></Avatar>
                <div>
                  <div className="text-sm font-semibold text-primary">{active.withName}</div>
                  <div className="text-xs text-muted-foreground">{active.online ? "Online now" : "Offline"}</div>
                </div>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto bg-secondary/30 p-4">
                {active.messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] rounded-2xl px-4 py-2 text-sm", m.from === "me" ? "bg-brand text-brand-foreground" : "bg-card text-primary border border-border")}>
                      <div>{m.text}</div>
                      <div className={cn("mt-0.5 text-[10px]", m.from === "me" ? "text-brand-foreground/70" : "text-muted-foreground")}>{new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
                <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90"><Send className="h-4 w-4" /></Button>
              </form>
            </div>
          ) : (
            <div className="grid place-items-center text-sm text-muted-foreground">Select a conversation</div>
          )}
        </div>
      </section>
    </>
  );
}
