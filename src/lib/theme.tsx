import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };
const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("workly:theme") as Theme | null;
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const t = stored ?? prefers;
      setThemeState(t);
      document.documentElement.classList.toggle("dark", t === "dark");
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("workly:theme", t); } catch {}
    document.documentElement.classList.toggle("dark", t === "dark");
  };
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: "light" as Theme, toggle: () => {}, setTheme: () => {} };
  return ctx;
};
