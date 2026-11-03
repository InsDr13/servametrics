import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { breakdowns, campaigns, countries, devices, funnel, kpis, recentEvents, sources, topPages, traffic } from "@/lib/mock-data";
import { BreakdownCard } from "@/components/breakdown-card";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — ServaMetrics" },
      { name: "description", content: "Visiteurs, sessions, conversions et revenus de vos sites en un coup d'œil." },
      { property: "og:title", content: "Tableau de bord — ServaMetrics" },
      { property: "og:description", content: "Vue d'ensemble analytique de vos sites web." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const periods = ["Aujourd'hui", "Hier", "7 j", "30 j", "90 j"];
const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
const tip = { contentStyle: { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--foreground)" } };

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Dashboard() {
  const [period, setPeriod] = useState("30 j");
  return (
    <AppShell
      title="Boutique Lumen"
      actions={
        <>
          <div className="flex rounded-lg border border-border p-0.5">
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`rounded-md px-2.5 py-1 text-xs transition-colors ${p === period ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {p}
              </button>
            ))}
          </div>
          <Button size="sm" variant="outline" onClick={() => toast("L'export CSV sera disponible une fois les données connectées.")}>
            <Download /> Export
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => {
          const up = k.delta >= 0;
          return (
            <div key={k.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="mt-2 font-mono text-2xl font-semibold">{k.value}</p>
              <p className={`mt-1 flex items-center gap-1 text-xs ${up ? "text-success" : "text-destructive"}`}>
                {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {Math.abs(k.delta)} % vs période précédente
              </p>
            </div>
          );
        })}
      </div>

      <Card title="Visiteurs — comparaison avec la période précédente">
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={traffic}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip {...tip} />
              <Area dataKey="precedent" name="Période préc." stroke="var(--chart-5)" strokeDasharray="4 4" fill="none" />
              <Area dataKey="visiteurs" name="Visiteurs" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Sources de trafic">
          <Donut data={sources} />
        </Card>
        <Card title="Appareils">
          <Donut data={devices} />
        </Card>
        <Card title="Top pays">
          <ul className="space-y-3">
            {countries.map((c) => (
              <li key={c.name} className="text-sm">
                <div className="flex justify-between"><span>{c.name}</span><span className="font-mono text-muted-foreground">{c.visitors.toLocaleString("fr-FR")}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-chart-3" style={{ width: `${(c.visitors / 18420) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <BreakdownCard title="Sources de trafic" tabs={breakdowns["sources"]!} />
        <BreakdownCard title="Technologie" tabs={breakdowns["tech"]!} />
        <BreakdownCard title="Localisation" tabs={breakdowns["location"]!} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Pages les plus visitées">
          <Table head={["Page", "Vues", "Visiteurs"]} rows={topPages.map((p) => [p.path, p.views.toLocaleString("fr-FR"), p.visitors.toLocaleString("fr-FR")])} />
        </Card>
        <Card title="Campagnes — revenus attribués (last non-direct)">
          <Table head={["Campagne", "Source", "Conv.", "Revenus"]} rows={campaigns.map((c) => [c.name, c.source, String(c.conv), `${c.revenue.toLocaleString("fr-FR")} €`])} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Tunnel de conversion">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={funnel} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="step" width={130} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip {...tip} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="visitors" name="Visiteurs" fill="var(--chart-2)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground">Conversion finale : <span className="font-mono text-foreground">10,4 %</span></p>
        </Card>
        <Card title="Derniers événements">
          <ul className="divide-y divide-border">
            {recentEvents.map((e, i) => (
              <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                <div className="flex items-center gap-3">
                  <span>{e.country}</span>
                  <span className="font-medium">{e.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{e.page}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {e.amount && <span className="font-mono text-primary">{e.amount}</span>}
                  <span className="text-muted-foreground">{e.ago}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}

function Donut({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="flex items-center gap-4">
      <div className="size-36 shrink-0">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={42} outerRadius={64} paddingAngle={3} stroke="none">
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-2 text-sm">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
            {d.name} <span className="font-mono text-muted-foreground">{d.value} %</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs text-muted-foreground">
          {head.map((h, i) => <th key={h} className={`pb-2 font-normal ${i ? "text-right" : ""}`}>{h}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => <td key={j} className={`py-2.5 ${j ? "text-right font-mono text-muted-foreground" : "font-mono"}`}>{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
