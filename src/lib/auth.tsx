import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { storage } from "./storage";
import type { Role, User } from "./types";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string; user?: User };
  signup: (data: { name: string; email: string; password: string; role: Role }) => { ok: boolean; error?: string; user?: User };
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(storage.getUser());
    setLoading(false);
  }, []);

  const login = useCallback((email: string, _password: string) => {
    const users = storage.getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { ok: false, error: "No account found with that email." };
    storage.setUser(found);
    setUser(found);
    return { ok: true, user: found };
  }, []);

  const signup = useCallback((data: { name: string; email: string; password: string; role: Role }) => {
    const users = storage.getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, error: "An account with that email already exists." };
    }
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=0f766e,1d4ed8,4338ca,c2410c,7c3aed`,
      joinedAt: new Date().toISOString(),
      onboarded: data.role === "client",
    };
    storage.setUsers([...users, newUser]);
    storage.setUser(newUser);
    setUser(newUser);
    return { ok: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    storage.setUser(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...patch };
      storage.setUser(updated);
      const all = storage.getUsers().map((u) => (u.id === updated.id ? updated : u));
      storage.setUsers(all);
      return updated;
    });
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
