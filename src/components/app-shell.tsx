import { Link } from "@tanstack/react-router";
import { Activity, BarChart3, Filter, Globe, Radio, Users, Zap } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Vue d'ensemble", icon: BarChart3 },
  { to: "/realtime", label: "Temps réel", icon: Radio },
  { to: "/visitors", label: "Visiteurs", icon: Users },
  { to: "/events", label: "Événements", icon: Zap },
  { to: "/funnels", label: "Tunnels", icon: Filter },
  { to: "/sites", label: "Sites web", icon: Globe },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
        <Activity className="size-4" />
      </span>
      ServaMetrics
    </Link>
  );
}

export function AppShell({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col gap-8 border-r border-sidebar-border bg-sidebar p-5 md:flex">
        <Logo />
        <nav className="flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{ className: "bg-sidebar-accent !text-sidebar-primary" }}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-sidebar-border p-3 text-xs text-muted-foreground">
          Données de démonstration
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <div className="md:hidden"><Logo /></div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="flex items-center gap-2">{actions}</div>
        </header>
        <div className="space-y-6 p-6">{children}</div>
      </main>
    </div>
  );
}
