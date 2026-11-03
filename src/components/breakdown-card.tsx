import { useState } from "react";
import type { Row } from "@/lib/mock-data";

export function BreakdownCard({ title, tabs }: { title: string; tabs: Record<string, Row[]> }) {
  const keys = Object.keys(tabs);
  const [tab, setTab] = useState(keys[0] ?? "");
  const rows = tabs[tab] ?? [];
  const total = rows.reduce((s, r) => s + r.value, 0) || 1;
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        <div className="flex flex-wrap rounded-lg border border-border p-0.5">
          {keys.map((k) => (
            <button key={k} onClick={() => setTab(k)}
              className={`rounded-md px-2 py-1 text-xs transition-colors ${k === tab ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-2 flex justify-between text-xs text-muted-foreground"><span>{tab}</span><span>Visiteurs</span></div>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.name} className="relative overflow-hidden rounded-md px-3 py-2 text-sm">
            <div className="absolute inset-y-0 left-0 rounded-md bg-primary/12" style={{ width: `${(r.value / max) * 100}%` }} />
            <div className="relative flex justify-between gap-3">
              <span className="truncate">{r.name}</span>
              <span className="shrink-0 font-mono text-muted-foreground">
                {r.value.toLocaleString("fr-FR")} <span className="text-xs">· {Math.round((r.value / total) * 100)} %</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
