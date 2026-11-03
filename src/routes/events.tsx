import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { events, recentEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Événements — ServaMetrics" },
      { name: "description", content: "Achats, inscriptions, formulaires et clics suivis sur vos sites." },
      { property: "og:title", content: "Événements — ServaMetrics" },
      { property: "og:description", content: "Tous les événements suivis sur vos sites." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <AppShell title="Événements">
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>{["Événement", "Total", "Visiteurs uniques", "Évolution"].map((h) => <th key={h} className="px-5 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((e) => (
              <tr key={e.name}>
                <td className="px-5 py-3 font-medium">{e.name}</td>
                <td className="px-5 py-3 font-mono">{e.count.toLocaleString("fr-FR")}</td>
                <td className="px-5 py-3 font-mono text-muted-foreground">{e.uniques.toLocaleString("fr-FR")}</td>
                <td className={`px-5 py-3 ${e.trend >= 0 ? "text-success" : "text-destructive"}`}>
                  <span className="inline-flex items-center gap-1 text-xs">
                    {e.trend >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{Math.abs(e.trend)} %
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Flux en direct</h2>
        <ul className="divide-y divide-border">
          {recentEvents.map((e, i) => (
            <li key={i} className="flex justify-between py-2.5 text-sm">
              <span>{e.country} <span className="font-medium">{e.name}</span> <span className="font-mono text-xs text-muted-foreground">{e.page}</span></span>
              <span className="text-xs text-muted-foreground">{e.amount && <span className="mr-3 font-mono text-primary">{e.amount}</span>}{e.ago}</span>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
