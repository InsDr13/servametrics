import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { liveVisitors } from "@/lib/mock-data";

export const Route = createFileRoute("/realtime")({
  head: () => ({
    meta: [
      { title: "Temps réel — ServaMetrics" },
      { name: "description", content: "Les visiteurs actuellement actifs sur vos sites, page par page." },
      { property: "og:title", content: "Temps réel — ServaMetrics" },
      { property: "og:description", content: "Visiteurs actifs en direct." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Realtime,
});

function Realtime() {
  const [count, setCount] = useState(37);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => Math.max(20, c + Math.round(Math.random() * 6 - 3))), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <AppShell title="Temps réel">
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <span className="relative flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-primary" />
        </span>
        <p className="font-mono text-5xl font-semibold">{count}</p>
        <p className="text-muted-foreground">visiteurs actifs en ce moment</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>{["Page", "Lieu", "Appareil", "Source"].map((h) => <th key={h} className="px-5 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {liveVisitors.map((v, i) => (
              <tr key={i}>
                <td className="px-5 py-3 font-mono">{v.page}</td>
                <td className="px-5 py-3">{v.country}</td>
                <td className="px-5 py-3 text-muted-foreground">{v.device}</td>
                <td className="px-5 py-3 text-muted-foreground">{v.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
