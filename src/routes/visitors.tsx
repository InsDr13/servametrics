import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { visitors } from "@/lib/mock-data";

export const Route = createFileRoute("/visitors")({
  head: () => ({
    meta: [
      { title: "Visiteurs anonymes — ServaMetrics" },
      { name: "description", content: "Parcourez vos visiteurs de façon anonyme : provenance, appareil, sessions et revenus." },
      { property: "og:title", content: "Visiteurs anonymes — ServaMetrics" },
      { property: "og:description", content: "Liste anonyme des visiteurs de vos sites." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Visitors,
});

function Visitors() {
  const [q, setQ] = useState("");
  const list = visitors.filter((v) => JSON.stringify(v).toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell title="Visiteurs" actions={<Input placeholder="Filtrer (ville, source…)" value={q} onChange={(e) => setQ(e.target.value)} className="w-56" />}>
      <p className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <ShieldCheck className="size-4 text-primary" /> Visiteurs anonymes : aucun nom, e-mail ni adresse IP n'est stocké.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>{["Visiteur", "Lieu", "Source", "Navigateur", "OS", "Appareil", "Sessions", "Pages", "Revenus", "Vu"].map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((v) => (
              <tr key={v.id} className="hover:bg-muted">
                <td className="px-4 py-3 font-mono text-xs">{v.id}</td>
                <td className="px-4 py-3">{v.location}</td>
                <td className="px-4 py-3">{v.source}</td>
                <td className="px-4 py-3 text-muted-foreground">{v.browser}</td>
                <td className="px-4 py-3 text-muted-foreground">{v.os}</td>
                <td className="px-4 py-3 text-muted-foreground">{v.device}</td>
                <td className="px-4 py-3 font-mono">{v.sessions}</td>
                <td className="px-4 py-3 font-mono">{v.pages}</td>
                <td className="px-4 py-3 font-mono text-primary">{v.revenue ? `${v.revenue} €` : "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{v.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
