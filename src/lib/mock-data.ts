// Demo data used until the real database & tracking API are connected.
export const kpis = [
  { label: "Visiteurs uniques", value: "48 213", delta: 12.4 },
  { label: "Sessions", value: "63 905", delta: 9.1 },
  { label: "Pages vues", value: "182 440", delta: 6.8 },
  { label: "Pages / session", value: "2,85", delta: -1.2 },
  { label: "Durée moy.", value: "2m 41s", delta: 4.3 },
  { label: "Taux de rebond", value: "38,2 %", delta: -2.7 },
  { label: "Conversions", value: "1 284", delta: 18.6 },
  { label: "Revenus", value: "92 470 €", delta: 22.1 },
];

export const traffic = Array.from({ length: 30 }, (_, i) => {
  const base = 1400 + Math.round(Math.sin(i / 3) * 300 + i * 18);
  return {
    day: `${i + 1}`,
    visiteurs: base,
    precedent: Math.round(base * 0.86 + Math.cos(i) * 90),
    revenus: Math.round(base * 1.9 + Math.sin(i / 2) * 500),
  };
});

export const sources = [
  { name: "Google", value: 41 },
  { name: "Direct", value: 22 },
  { name: "LinkedIn", value: 13 },
  { name: "Facebook", value: 9 },
  { name: "Autres", value: 15 },
];

export const devices = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 36 },
  { name: "Tablet", value: 6 },
];

export const countries = [
  { name: "🇫🇷 France", visitors: 18420 },
  { name: "🇧🇪 Belgique", visitors: 6210 },
  { name: "🇨🇦 Canada", visitors: 5130 },
  { name: "🇨🇭 Suisse", visitors: 3980 },
  { name: "🇲🇦 Maroc", visitors: 3110 },
];

export const topPages = [
  { path: "/", views: 52310, visitors: 31200 },
  { path: "/pricing", views: 21840, visitors: 14900 },
  { path: "/blog/attribution-revenus", views: 12030, visitors: 9800 },
  { path: "/features", views: 9870, visitors: 7400 },
  { path: "/signup", views: 7640, visitors: 6900 },
];

export const campaigns = [
  { name: "black-friday-2026", source: "google / cpc", revenue: 28400, conv: 312 },
  { name: "newsletter-oct", source: "email / newsletter", revenue: 14200, conv: 188 },
  { name: "linkedin-b2b", source: "linkedin / social", revenue: 11800, conv: 96 },
  { name: "retargeting", source: "facebook / paid", revenue: 7300, conv: 121 },
];

export const recentEvents = [
  { name: "Purchase", page: "/checkout", country: "🇫🇷", ago: "il y a 12 s", amount: "149 €" },
  { name: "Sign Up", page: "/signup", country: "🇧🇪", ago: "il y a 40 s" },
  { name: "Pageview", page: "/pricing", country: "🇨🇦", ago: "il y a 1 min" },
  { name: "Contact Form Submitted", page: "/contact", country: "🇨🇭", ago: "il y a 2 min" },
  { name: "Purchase", page: "/checkout", country: "🇫🇷", ago: "il y a 3 min", amount: "89 €" },
];

export const funnel = [
  { step: "Visite page produit", visitors: 12400 },
  { step: "Ajout au panier", visitors: 4380 },
  { step: "Checkout", visitors: 2110 },
  { step: "Achat", visitors: 1284 },
];

export const sites = [
  { id: "sm_8f3k2q9x", name: "Boutique Lumen", domain: "lumen-shop.fr", status: "actif", last: "il y a 8 s", added: "12/03/2026" },
  { id: "sm_p1z7r4mv", name: "Blog Nordic", domain: "nordic.blog", status: "actif", last: "il y a 3 min", added: "02/06/2026" },
  { id: "sm_w9c0t6ld", name: "Landing Atlas", domain: "atlas.io", status: "en attente", last: "—", added: "28/10/2026" },
];

export const liveVisitors = [
  { page: "/pricing", country: "🇫🇷 Paris", device: "Desktop", source: "Google" },
  { page: "/", country: "🇧🇪 Bruxelles", device: "Mobile", source: "Direct" },
  { page: "/checkout", country: "🇨🇦 Montréal", device: "Desktop", source: "LinkedIn" },
  { page: "/blog/attribution-revenus", country: "🇫🇷 Lyon", device: "Tablet", source: "Facebook" },
  { page: "/features", country: "🇨🇭 Genève", device: "Mobile", source: "Google" },
  { page: "/signup", country: "🇲🇦 Casablanca", device: "Desktop", source: "X" },
];

export type Row = { name: string; value: number };
export const breakdowns: Record<string, Record<string, Row[]>> = {
  sources: {
    Referrers: [
      { name: "google.com", value: 19800 }, { name: "linkedin.com", value: 6270 }, { name: "facebook.com", value: 4340 },
      { name: "news.ycombinator.com", value: 2210 }, { name: "bing.com", value: 1460 },
    ],
    Canaux: [
      { name: "Recherche organique", value: 17200 }, { name: "Direct", value: 10600 }, { name: "Social", value: 8900 },
      { name: "Payant (CPC)", value: 6400 }, { name: "E-mail", value: 5100 },
    ],
    Campagnes: [
      { name: "black-friday-2026", value: 8200 }, { name: "newsletter-oct", value: 5100 },
      { name: "linkedin-b2b", value: 3400 }, { name: "retargeting", value: 2900 },
    ],
    "Mots-clés": [
      { name: "outil analytics", value: 3900 }, { name: "attribution revenus", value: 2700 },
      { name: "alternative google analytics", value: 2100 }, { name: "tracking sans cookies", value: 1500 },
    ],
  },
  tech: {
    Navigateurs: [
      { name: "Chrome", value: 27900 }, { name: "Safari", value: 11200 }, { name: "Firefox", value: 4300 },
      { name: "Edge", value: 3600 }, { name: "Samsung Internet", value: 1200 },
    ],
    OS: [
      { name: "Windows", value: 17800 }, { name: "iOS", value: 11600 }, { name: "macOS", value: 9100 },
      { name: "Android", value: 7900 }, { name: "Linux", value: 1800 },
    ],
    Appareils: [{ name: "Desktop", value: 27960 }, { name: "Mobile", value: 17360 }, { name: "Tablette", value: 2890 }],
  },
  location: {
    Pays: countries.map((c) => ({ name: c.name, value: c.visitors })),
    Régions: [
      { name: "Île-de-France", value: 7900 }, { name: "Bruxelles-Capitale", value: 3400 }, { name: "Québec", value: 3900 },
      { name: "Auvergne-Rhône-Alpes", value: 3100 }, { name: "Genève", value: 1900 },
    ],
    Villes: [
      { name: "Paris", value: 6800 }, { name: "Montréal", value: 3300 }, { name: "Bruxelles", value: 3200 },
      { name: "Lyon", value: 2100 }, { name: "Casablanca", value: 1800 },
    ],
  },
};

export const visitors = Array.from({ length: 14 }, (_, i) => {
  const c = ["🇫🇷 Paris", "🇧🇪 Bruxelles", "🇨🇦 Montréal", "🇨🇭 Genève", "🇲🇦 Casablanca", "🇫🇷 Lyon"];
  const b = ["Chrome", "Safari", "Firefox", "Edge"];
  const o = ["Windows", "iOS", "macOS", "Android"];
  const s = ["Google", "Direct", "LinkedIn", "Newsletter", "Facebook"];
  return {
    id: `Visiteur #${(48213 - i * 37).toString(36).toUpperCase()}`,
    location: c[i % c.length]!, browser: b[i % b.length]!, os: o[(i * 3) % o.length]!,
    device: i % 3 === 0 ? "Mobile" : "Desktop", source: s[i % s.length]!,
    sessions: 1 + (i * 7) % 6, pages: 2 + (i * 5) % 11, lastSeen: `il y a ${1 + i * 4} min`,
    revenue: i % 4 === 0 ? 49 + i * 10 : 0,
  };
});

export const events = [
  { name: "Pageview", count: 182440, uniques: 48213, trend: 6.8 },
  { name: "Purchase", count: 1284, uniques: 1190, trend: 18.6 },
  { name: "Sign Up", count: 2310, uniques: 2280, trend: 11.2 },
  { name: "Add to Cart", count: 4380, uniques: 3910, trend: 4.1 },
  { name: "Contact Form Submitted", count: 642, uniques: 610, trend: -3.4 },
  { name: "Newsletter Subscribed", count: 1120, uniques: 1102, trend: 7.9 },
  { name: "Outbound Link Click", count: 3870, uniques: 2950, trend: 2.2 },
];

export const funnels = [
  { name: "Achat", steps: funnel },
  { name: "Inscription", steps: [
    { step: "Visite page d'accueil", visitors: 31200 }, { step: "Page tarifs", visitors: 14900 },
    { step: "Formulaire d'inscription", visitors: 6900 }, { step: "Compte créé", visitors: 2310 },
  ] },
];
