import type { Conversation, Job, Proposal, User } from "./types";

const K = {
  user: "workly:user",
  users: "workly:users",
  saved: "workly:saved-jobs",
  proposals: "workly:proposals",
  jobs: "workly:posted-jobs",
  convos: "workly:conversations",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export const storage = {
  getUser: () => read<User | null>(K.user, null),
  setUser: (u: User | null) => write(K.user, u),

  getUsers: () => read<User[]>(K.users, []),
  setUsers: (u: User[]) => write(K.users, u),

  getSaved: () => read<string[]>(K.saved, []),
  setSaved: (s: string[]) => write(K.saved, s),
  toggleSaved: (id: string) => {
    const cur = read<string[]>(K.saved, []);
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    write(K.saved, next);
    return next;
  },

  getProposals: () => read<Proposal[]>(K.proposals, []),
  setProposals: (p: Proposal[]) => write(K.proposals, p),
  addProposal: (p: Proposal) => {
    const list = [p, ...read<Proposal[]>(K.proposals, [])];
    write(K.proposals, list);
    return list;
  },

  getPostedJobs: () => read<Job[]>(K.jobs, []),
  addPostedJob: (j: Job) => {
    const list = [j, ...read<Job[]>(K.jobs, [])];
    write(K.jobs, list);
    return list;
  },

  getConversations: () => read<Conversation[]>(K.convos, []),
  setConversations: (c: Conversation[]) => write(K.convos, c),
};

export const KEYS = K;
