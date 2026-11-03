import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Logo } from "@/components/app-shell";

type Item = { label: string; to?: string; href?: string };

const columns: { title: string; items: Item[] }[] = [
  {
    title: "Produit",
    items: [
      { label: "Fonctionnalités", href: "#fonctionnalites" },
      { label: "Attribution des revenus", href: "#attribution" },
      { label: "Temps réel", to: "/realtime" },
      { label: "Tarifs", href: "#tarifs" },
    ],
  },
  {
    title: "Ressources",
    items: [
      { label: "Installer le script", to: "/sites" },
      { label: "Tableau de bord", to: "/dashboard" },
      { label: "Questions fréquentes", href: "#faq" },
      { label: "Guide d'attribution", href: "#attribution" },
    ],
  },
  {
    title: "Légal",
    items: [
      { label: "Mentions légales", href: "#" },
      { label: "Confidentialité", href: "#" },
      { label: "Cookies & mesure", href: "#" },
      { label: "Conditions d'utilisation", href: "#" },
    ],
  },
];

function ItemLink({ item }: { item: Item }) {
  const cls = "text-sm text-muted-foreground transition-colors hover:text-foreground";
  if (item.to) {
    return (
      <Link to={item.to} className={cls}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={cls}>
      {item.label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-sidebar">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            L'analytics qui relie chaque visiteur, chaque campagne et chaque conversion à vos revenus.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" />
            Tous les systèmes opérationnels
          </p>
          <div className="flex items-center gap-2 pt-1">
            {[
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Twitter, label: "X", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Mail, label: "E-mail", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="space-y-3">
            <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <ItemLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ServaMetrics — Tous droits réservés.</p>
          <p className="font-mono">Données de démonstration · Aucune donnée réelle collectée</p>
        </div>
      </div>
    </footer>
  );
}
