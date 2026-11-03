import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { funnels } from "@/lib/mock-data";

export const Route = createFileRoute("/funnels")({
  head: () => ({
    meta: [
      { title: "Tunnels de conversion — ServaMetrics" },
      { name: "description", content: "Repérez à quelle étape vos visiteurs abandonnent." },
      { property: "og:title", content: "Tunnels de conversion — ServaMetrics" },
      { property: "og:description", content: "Analyse des tunnels de conversion étape par étape." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Funnels,
});

function Funnels() {
  const [idx, setIdx] = useState(0);
  const f = funnels[idx] ?? funnels[0]!;
  const first = f.steps[0]?.visitors ?? 1;
  return (
    <AppShell
      title="Tunnels"
      actions={
        <div className="flex rounded-lg border border-border p-0.5">
          {funnels.map((x, i) => (
            <button key={x.name} onClick={() => setIdx(i)}
              className={`rounded-md px-2.5 py-1 text-xs ${i === idx ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {x.name}
            </button>
          ))}
        </div>
      }
    >
      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        {f.steps.map((s, i) => {
          const prev = f.steps[i - 1]?.visitors;
          const pct = (s.visitors / first) * 100;
          return (
            <div key={s.step}>
              <div className="mb-1 flex justify-between text-sm">
                <span><span className="mr-2 font-mono text-muted-foreground">{i + 1}.</span>{s.step}</span>
                <span className="font-mono">{s.visitors.toLocaleString("fr-FR")} <span className="text-xs text-muted-foreground">· {pct.toFixed(1)} %</span></span>
              </div>
              <div className="h-8 rounded-md bg-muted"><div className="h-full rounded-md bg-chart-2" style={{ width: `${pct}%` }} /></div>
              {prev && <p className="mt-1 text-xs text-destructive">−{Math.round((1 - s.visitors / prev) * 100)} % d'abandon depuis l'étape précédente</p>}
            </div>
          );
        })}
        <p className="border-t border-border pt-3 text-sm text-muted-foreground">
          Conversion globale : <span className="font-mono text-foreground">{(((f.steps.at(-1)?.visitors ?? 0) / first) * 100).toFixed(1)} %</span>
        </p>
      </section>
    </AppShell>
  );
}
