import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  Code2,
  Coins,
  Gauge,
  LineChart,
  Lock,
  Quote,
  Radio,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/app-shell";
import { SiteFooter } from "@/components/site-footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { kpis, liveVisitors, recentEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ServaMetrics — Web analytics & attribution des revenus" },
      {
        name: "description",
        content:
          "Suivez visiteurs, sources de trafic, conversions et revenus de vos sites web avec un simple script.",
      },
      { property: "og:title", content: "ServaMetrics — Web analytics & attribution des revenus" },
      { property: "og:description", content: "Sachez quelle source de trafic génère vraiment vos revenus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Installation", href: "#installation" },
  { label: "Attribution", href: "#attribution" },
  { label: "Temps réel", href: "#temps-reel" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

const features = [
  {
    icon: Code2,
    title: "Un script, 2 Ko",
    text: "Compatible WordPress, Shopify, React, Vue et HTML. Routage SPA inclus.",
  },
  { icon: Radio, title: "Temps réel", text: "Voyez qui est sur votre site, d'où il vient et ce qu'il fait — maintenant." },
  {
    icon: Coins,
    title: "Attribution des revenus",
    text: "First touch, last touch, last non-direct : chaque euro relié à sa source.",
  },
  {
    icon: RouteIcon,
    title: "Tunnels & objectifs",
    text: "Repérez où vos visiteurs abandonnent et améliorez la conversion.",
  },
  {
    icon: ShieldCheck,
    title: "Sans cookies intrusifs",
    text: "Mesure respectueuse de la vie privée : pas de bandeau, pas d'identifiants publicitaires.",
  },
  {
    icon: Zap,
    title: "Événements illimités",
    text: "Trackez achats, inscriptions, appels de formulaire et n'importe quel clic personnalisé.",
  },
];

const steps = [
  {
    icon: Code2,
    title: "1. Créez un site",
    text: "Ajoutez votre domaine dans ServaMetrics et copiez votre identifiant de site.",
  },
  {
    icon: Lock,
    title: "2. Collez le script",
    text: "Une seule ligne, juste avant la balise de fermeture du body. C'est tout.",
  },
  {
    icon: Gauge,
    title: "3. Lisez vos revenus",
    text: "Les premières arrivées apparaissent en quelques secondes dans le tableau de bord.",
  },
];

const scriptSnippet = `<script src="https://cdn.servametrics.io/s.js"
  data-site="sm_8f3k2q9x" defer></script>

<script>
  analytics.track("Purchase", { amount: 149, currency: "EUR" });
</script>`;

const journey = [
  { channel: "Google Ads", detail: "google / cpc", at: "J-12" },
  { channel: "LinkedIn", detail: "linkedin / social", at: "J-6" },
  { channel: "Newsletter", detail: "email / newsletter", at: "J-2" },
  { channel: "Accès direct", detail: "direct", at: "J-0" },
];

const models = [
  {
    name: "Premier contact",
    winner: "Google Ads",
    text: "Récompense le canal qui a fait découvrir la marque. Utile pour juger l'acquisition.",
  },
  {
    name: "Dernier contact",
    winner: "Accès direct",
    text: "Récompense le dernier point de contact — souvent le direct, donc rarement exploitable.",
  },
  {
    name: "Dernier contact non-direct",
    winner: "Newsletter",
    text: "Ignore le direct et attribue l'achat au véritable déclencheur : le choix par défaut.",
    recommended: true,
  },
];

const platforms = ["WordPress", "Shopify", "React", "Vue", "Next.js", "Webflow", "Wix", "HTML"];

const plans = [
  {
    name: "Découverte",
    price: "0 €",
    period: "pour toujours",
    text: "Pour tester la mesure sur un premier site.",
    features: ["1 site", "10 000 événements / mois", "3 mois d'historique", "Temps réel inclus"],
    cta: "Commencer gratuitement",
  },
  {
    name: "Pro",
    price: "29 €",
    period: "par mois",
    text: "Pour les équipes qui pilotent leur croissance.",
    features: [
      "5 sites",
      "500 000 événements / mois",
      "Attribution des revenus",
      "Tunnels & objectifs",
      "Export CSV",
      "24 mois d'historique",
    ],
    cta: "Essayer 14 jours",
    highlighted: true,
  },
  {
    name: "Business",
    price: "79 €",
    period: "par mois",
    text: "Pour les volumes élevés et les exigences de sécurité.",
    features: [
      "20 sites",
      "5 000 000 événements / mois",
      "API & rapports personnalisés",
      "Accès par équipe & SSO",
      "36 mois d'historique",
      "Support prioritaire",
    ],
    cta: "Parler à l'équipe",
  },
];

const faqs = [
  {
    q: "ServaMetrics utilise-t-il des cookies ?",
    a: "La mesure fonctionne sans cookies publicitaires ni identifiants de suivi. Aucune bannière d'acceptation n'est nécessaire pour un site de démonstration comme celui-ci.",
  },
  {
    q: "Combien de temps prend l'installation ?",
    a: "Deux minutes : créez un site, copiez le script, collez-le avant la balise de fermeture du body. Les premières données arrivent immédiatement.",
  },
  {
    q: "Puis-je suivre mes revenus ?",
    a: "Oui. Envoyez le montant de la commande avec l'événement d'achat, puis choisissez le modèle d'attribution qui vous convient.",
  },
  {
    q: "Mes visiteurs sont-ils identifiés ?",
    a: "Non. ServaMetrics compte des sessions et des appareils, pas des personnes. Aucun nom, e-mail ou adresse n'est stocké.",
  },
  {
    q: "Puis-je exporter mes données ?",
    a: "Les offres payantes incluent l'export CSV et l'accès à l'API pour brancher vos propres outils.",
  },
  {
    q: "Puis-je changer de formule à tout moment ?",
    a: "Oui, sans engagement : vous passez à la formule supérieure ou inférieure quand vous le souhaitez.",
  },
];

const highlights = [
  { icon: Users, label: "Visiteurs uniques", value: kpis[0]?.value ?? "—" },
  { icon: LineChart, label: "Sessions", value: kpis[1]?.value ?? "—" },
  { icon: Target, label: "Conversions", value: kpis[6]?.value ?? "—" },
  { icon: Coins, label: "Revenus attribués", value: kpis[7]?.value ?? "—" },
];

function Section({
  id,
  eyebrow,
  title,
  text,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {text && <p className="mt-4 text-muted-foreground">{text}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="outline">
            <Link to="/dashboard">Voir la démo</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-4xl px-6 pb-20 pt-20 text-center">
        <span className="inline-block rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-primary">
          analytics.track("Purchase", {"{"} amount: 100 {"}"})
        </span>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
          Sachez quelle source <span className="text-primary">rapporte</span> vraiment.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          ServaMetrics relie chaque visiteur, chaque campagne et chaque conversion à vos revenus. Sans cookies
          intrusifs, sans complexité.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="shadow-glow">
            <Link to="/dashboard">
              Explorer le tableau de bord <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/sites">Installer le script</Link>
          </Button>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-primary">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="font-mono text-xl font-semibold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <Section
        id="fonctionnalites"
        eyebrow="Fonctionnalités"
        title="Tout ce qu'il faut pour décider"
        text="Des mesures claires, pas un tableau de bord de 40 graphiques que personne n'ouvre."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card/70 p-6 backdrop-blur transition-colors hover:border-primary/40"
            >
              <Icon className="size-5 text-primary" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Installation */}
      <Section
        id="installation"
        eyebrow="Installation"
        title="En ligne en deux minutes"
        text="Aucune dépendance, aucun tag manager, aucune période de rodage."
      >
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <ol className="space-y-4">
            {steps.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-xl border border-border bg-card/70 p-5 backdrop-blur">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-accent/70" />
              <span className="size-2.5 rounded-full bg-success/70" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">index.html</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted-foreground">
              <code>{scriptSnippet}</code>
            </pre>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {platforms.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-card/70 px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </Section>

      {/* Attribution */}
      <Section
        id="attribution"
        eyebrow="Attribution"
        title="Un achat, quatre canaux, une réponse"
        text="Le même parcours, trois façons de l'interpréter. Choisissez celle qui guide vos décisions."
      >
        <div className="rounded-xl border border-border bg-card/70 p-6 backdrop-blur">
          <p className="font-mono text-xs text-muted-foreground">Parcours d'un client — 149 € d'achat</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {journey.map((j, i) => (
              <div key={j.channel} className="flex items-center gap-3">
                <div className="rounded-lg border border-border bg-background px-3 py-2">
                  <p className="text-sm font-medium">{j.channel}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {j.detail} · {j.at}
                  </p>
                </div>
                {i < journey.length - 1 && <ArrowRight className="size-4 shrink-0 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {models.map((m) => (
            <div
              key={m.name}
              className={`rounded-xl border p-6 backdrop-blur ${
                m.recommended ? "border-primary/50 bg-card shadow-glow" : "border-border bg-card/70"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{m.name}</h3>
                {m.recommended && (
                  <span className="rounded-full border border-primary/40 px-2 py-0.5 font-mono text-[10px] text-primary">
                    par défaut
                  </span>
                )}
              </div>
              <p className="mt-3 font-mono text-2xl text-primary">{m.winner}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Realtime */}
      <Section
        id="temps-reel"
        eyebrow="Temps réel"
        title="Ce qui se passe maintenant"
        text="Pas de rapport du lendemain : la page en cours, la provenance, l'appareil, la conversion."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/70 p-6 backdrop-blur">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Radio className="size-4 text-primary" /> Visiteurs en ligne
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {liveVisitors.map((v, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="font-mono">{v.page}</span>
                  <span className="hidden text-muted-foreground sm:inline">{v.country}</span>
                  <span className="font-mono text-xs text-muted-foreground">{v.device}</span>
                  <span className="text-xs">{v.source}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card/70 p-6 backdrop-blur">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4 text-primary" /> Derniers événements
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {recentEvents.map((e, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <span>{e.country}</span>
                    <span className="font-medium">{e.name}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    {e.amount && <span className="font-mono text-primary">{e.amount}</span>}
                    <span className="font-mono text-xs text-muted-foreground">{e.ago}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/realtime">
              Ouvrir la vue temps réel <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Testimonial */}
      <section className="relative mx-auto max-w-4xl px-6 py-12">
        <figure className="rounded-2xl border border-border bg-card/70 p-8 backdrop-blur">
          <Quote className="size-5 text-primary" />
          <blockquote className="mt-4 text-lg leading-relaxed">
            « Nous avons coupé deux campagnes payantes qui ne rapportaient rien et réalloué le budget sur
            l'e-mailing. Le chiffre d'affaires a suivi trois semaines plus tard. »
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs text-muted-foreground">
            Équipe de démonstration — boutique en ligne
          </figcaption>
        </figure>
      </section>

      {/* Pricing */}
      <Section
        id="tarifs"
        eyebrow="Tarifs"
        title="Des formules lisibles"
        text="Sans engagement, sans frais d'installation, sans facturation par page vue."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-xl border p-6 backdrop-blur ${
                p.highlighted ? "border-primary/50 bg-card shadow-glow" : "border-border bg-card/70"
              }`}
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-4 font-mono text-4xl font-semibold">{p.price}</p>
              <p className="text-xs text-muted-foreground">{p.period}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full" variant={p.highlighted ? "default" : "outline"}>
                <Link to="/sites">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-center font-mono text-xs text-muted-foreground">
          <Clock className="size-3.5" /> Tarifs de démonstration — à valider avant la mise en ligne
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Questions fréquentes">
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card/70 px-6 backdrop-blur">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center">
          <div className="pointer-events-none absolute inset-0 bg-glow" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight">Prêt à voir d'où vient votre chiffre ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Créez un site, collez le script, et regardez vos premières arrivées dans le tableau de bord.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="shadow-glow">
                <Link to="/sites">
                  Installer le script <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">Voir un tableau de bord</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
