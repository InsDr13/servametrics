import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sites as initialSites } from "@/lib/mock-data";

export const Route = createFileRoute("/sites")({
  head: () => ({
    meta: [
      { title: "Sites web — ServaMetrics" },
      { name: "description", content: "Ajoutez vos sites et copiez leur script de tracking ServaMetrics." },
      { property: "og:title", content: "Sites web — ServaMetrics" },
      { property: "og:description", content: "Gérez vos sites et installez le script de tracking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Sites,
});

const snippet = (id: string) =>
  `<script\n  defer\n  src="https://cdn.servametrics.com/tracker.js"\n  data-website-id="${id}">\n</script>`;

function Sites() {
  const [list, setList] = useState(initialSites);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [selected, setSelected] = useState(initialSites[0]?.id ?? "");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const d = domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!name.trim() || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(d)) { toast.error("Nom ou domaine invalide"); return; }
    const id = "sm_" + Math.random().toString(36).slice(2, 10);
    setList([...list, { id, name: name.trim(), domain: d, status: "en attente", last: "—", added: new Date().toLocaleDateString("fr-FR") }]);
    setSelected(id);
    setName(""); setDomain("");
    toast.success("Site ajouté — installez le script ci-dessous");
  };

  return (
    <AppShell title="Sites web">
      <form onSubmit={add} className="flex flex-wrap gap-3 rounded-xl border border-border bg-card p-5">
        <Input placeholder="Nom du site" value={name} onChange={(e) => setName(e.target.value)} className="max-w-xs" />
        <Input placeholder="exemple.com" value={domain} onChange={(e) => setDomain(e.target.value)} className="max-w-xs" />
        <Button type="submit"><Plus /> Ajouter</Button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>{["Site", "Domaine", "Identifiant", "Statut", "Dernière activité", "Ajouté le"].map((h) => <th key={h} className="px-5 py-3 font-normal">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((s) => (
              <tr key={s.id} onClick={() => setSelected(s.id)} className={`cursor-pointer transition-colors hover:bg-muted ${s.id === selected ? "bg-muted" : ""}`}>
                <td className="px-5 py-3 font-medium">{s.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.domain}</td>
                <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${s.status === "actif" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>{s.status}</span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{s.last}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.added}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Script d'installation — à coller dans le &lt;head&gt;</h2>
          <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(snippet(selected)); toast.success("Script copié"); }}>
            <Copy /> Copier
          </Button>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-background p-4 font-mono text-sm text-primary">{snippet(selected)}</pre>
      </section>
    </AppShell>
  );
}
