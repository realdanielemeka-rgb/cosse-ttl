/*
 * content.ts — single source of truth for the Cossé TTL site.
 *
 * Ported 1:1 from the design prototype's content.js, strongly typed. Pages
 * import from here; nothing is hardcoded in components. All case studies are
 * fictional but plausible for the Nigerian market, and every metric is a
 * PLACEHOLDER (see `note: "placeholder"` on each impact stat).
 */

export interface Positioning {
  eyebrow: string;
  manifesto: string;
  descriptor: string;
  lead: string;
  leadLines: string[];
  totalNote: string;
  totalWord: string;
  location: string;
}

export const positioning: Positioning = {
  eyebrow: "INTEGRATED MARKETING COMMUNICATIONS · LAGOS",
  manifesto: "We turn simple human truths into total brand experiences.",
  descriptor:
    "We turn simple human truths into brand experiences that move people, markets and culture.",
  lead: "Simple human truths. Total brand experiences. Since 1995.",
  leadLines: ["Simple human truths.", "Total brand experiences.", "Since 1995."],
  totalNote:
    "“TTL” once meant through-the-line — a piece of media jargon that has quietly died. We kept only the truth beneath it.",
  totalWord: "Total",
  location: "Integrated Marketing Communications · Lagos, Nigeria",
};

export interface MethodStep {
  n: string;
  name: string;
  line: string;
}

export const method: MethodStep[] = [
  { n: "01", name: "Challenge", line: "Name the business problem in plain language. No jargon, nowhere to hide." },
  { n: "02", name: "Human truth", line: "Find the simple human thing underneath it. The work starts here." },
  { n: "03", name: "Idea", line: "One idea, sharp enough to repeat. If it needs a paragraph, it isn't one." },
  { n: "04", name: "Execution", line: "Make it real, and make it well. Craft is the argument." },
  { n: "05", name: "Channels", line: "Put it where life already happens — not where media is cheapest." },
  { n: "06", name: "Impact", line: "Move people, markets and culture. Then prove it." },
  { n: "07", name: "Legacy", line: "Leave something the brand still owns when the campaign is gone." },
];

export interface Capability {
  name: string;
  scope: string;
  includes: string[];
}

export const capabilities: Capability[] = [
  {
    name: "Brand & Creative",
    scope: "Positioning, identity and the one idea that holds a brand together.",
    includes: ["Brand strategy & positioning", "Identity & design systems", "Campaign platforms", "Naming & verbal identity"],
  },
  {
    name: "Media & Channel Strategy",
    scope: "Planning that buys attention, not just impressions.",
    includes: ["Comms & channel planning", "Paid media & buying", "Performance & analytics", "Partnerships & sponsorship"],
  },
  {
    name: "Experiential & Activation",
    scope: "Brands you can stand inside — streets, stadiums, markets, malls.",
    includes: ["Events & experiences", "Retail & trade activation", "Roadshows & sampling", "Sponsorship activation"],
  },
  {
    name: "Social & Content",
    scope: "Native to the feed, fluent in the culture, built for the scroll.",
    includes: ["Social strategy & always-on", "Content & creators", "Community management", "Influence & advocacy"],
  },
  {
    name: "Public Sector / Cause",
    scope: "Behaviour-change work for institutions and the public good.",
    includes: ["Behaviour-change campaigns", "Public health & advocacy", "Stakeholder & development comms", "Citizen engagement"],
  },
  {
    name: "Production & Storytelling",
    scope: "Film, sound and craft — in-house, end to end.",
    includes: ["Film & photography", "Sound & music", "Animation & motion", "Post-production"],
  },
];

export interface AboutContent {
  lead: string;
  body: string[];
  stats: { figure: string; label: string }[];
}

export const about: AboutContent = {
  lead: "Thirty years turning simple human truths into total brand experiences.",
  body: [
    "We started in Lagos in 1995 as Bates Cossé. Three decades later we still do one thing: find the simple human truth inside a business problem, and build a total brand experience around it.",
    "“TTL” used to mean through-the-line. That jargon is dead. We kept only the truth beneath it — Total — and the conviction that a brand is one experience built whole, not a campaign stitched across channels after the fact.",
    "We are a full house: strategists, creatives, producers, media planners and activators under one roof. Eclectic by design, senior by default, Nigerian to the core — and built to stand beside any global partner.",
  ],
  stats: [
    { figure: "1995", label: "Founded in Lagos" },
    { figure: "30 yrs", label: "Of integrated work" },
    { figure: "6", label: "Practices, one roof" },
    { figure: "40+", label: "Blue-chip & public clients" },
  ],
};

export interface Value {
  word: string;
  line: string;
}

export const values: Value[] = [
  { word: "Heart", line: "We make work that feels something before it sells something." },
  { word: "Can-do", line: "Ambition is the default. We find the way, then make it." },
  { word: "Challenger", line: "We question the brief, the category and the obvious answer." },
  { word: "Eclectic", line: "Many disciplines, one table. Range is the advantage." },
  { word: "Professional", line: "Senior people, on the work, on time." },
  { word: "Integrity", line: "We tell clients the truth — especially when it is hard." },
  { word: "Consumer-deep", line: "We start with people, not platforms. Insight earns the idea." },
];

export interface ThinkingArticle {
  kicker: string;
  title: string;
  dek: string;
  author: string;
  date: string;
  read: string;
}

export const thinking: ThinkingArticle[] = [
  { kicker: "Culture", title: "Don’t sponsor the culture. Build the stage.", dek: "Why brand-as-platform beats brand-as-logo in a feed that can smell a sponsor.", author: "Tunde Familoni", date: "May 2025", read: "6 min" },
  { kicker: "Strategy", title: "The truth is cheaper than the gimmick.", dek: "A simple human truth out-travels a clever idea every time. A field guide.", author: "Ngozi Okafor", date: "Mar 2025", read: "5 min" },
  { kicker: "Media", title: "Buy attention, not impressions.", dek: "What a naira of reach is actually worth in the markets media planners ignore.", author: "Bode Adeyemi", date: "Feb 2025", read: "7 min" },
  { kicker: "Craft", title: "Made well is the argument.", dek: "Why craft is a business case, not a vanity line item.", author: "Tunde Familoni", date: "Dec 2024", read: "4 min" },
  { kicker: "Public good", title: "Behaviour change starts with being remembered.", dek: "Lessons from the street on trust, follow-through and the day after the queue.", author: "Adaeze Cossé-Bello", date: "Oct 2024", read: "8 min" },
  { kicker: "Talent", title: "Range is a competitive advantage.", dek: "The case for the eclectic agency in an age of narrow specialists.", author: "Ngozi Okafor", date: "Aug 2024", read: "5 min" },
];

export interface Careers {
  lead: string;
  culture: { t: string; d: string }[];
  roles: { title: string; team: string; type: string; location: string }[];
}

export const careers: Careers = {
  lead: "Come do the best work of your life — and mean it.",
  culture: [
    { t: "Heart over hierarchy", d: "We hire for heart and range, then back you to go further than your job title." },
    { t: "Seniors on the work", d: "Senior people make the work here, beside you — not above you on a deck." },
    { t: "Lagos is the brief", d: "Our studio and our subject. If you want to make culture, this is the room." },
  ],
  roles: [
    { title: "Senior Art Director", team: "Creative", type: "Full-time", location: "Lagos" },
    { title: "Strategy Lead", team: "Strategy", type: "Full-time", location: "Lagos" },
    { title: "Social & Content Manager", team: "Social", type: "Full-time", location: "Lagos" },
    { title: "Producer", team: "Production", type: "Full-time", location: "Lagos" },
    { title: "Account Director", team: "Client Service", type: "Full-time", location: "Lagos" },
    { title: "Creative Internship", team: "Creative", type: "Internship", location: "Lagos" },
  ],
};

export interface Contact {
  email: string;
  careersEmail: string;
  phone: string;
  address: string[];
  budgets: string[];
  timelines: string[];
  steps: { n: string; t: string; d: string }[];
}

export const contact: Contact = {
  email: "newbusiness@cosse-ttl.example",
  careersEmail: "careers@cosse-ttl.example",
  phone: "+234 (0)1 000 0000",
  address: ["Cossé TTL", "Victoria Island", "Lagos, Nigeria"],
  budgets: ["Under ₦10M", "₦10–50M", "₦50–150M", "₦150M+", "Not sure yet"],
  timelines: ["ASAP", "1–3 months", "3–6 months", "Just exploring"],
  steps: [
    { n: "01", t: "You send the brief", d: "A few lines on the business problem. No formal RFP needed." },
    { n: "02", t: "We reply within 48 hours", d: "A senior team reads it and comes back with a point of view." },
    { n: "03", t: "We scope it together", d: "Approach, team and budget — in plain language." },
  ],
};

export interface Studio {
  lead: string;
  intro: string;
  ways: { t: string; d: string }[];
  place: { city: string; line: string };
}

export const studio: Studio = {
  lead: "One room. Every discipline at the same table.",
  intro:
    "Strategy, creative, media, production and activation build together from day one — no silos to hand a brief across, no idea diluted in translation. That is what “total” means in practice.",
  ways: [
    { t: "One table", d: "Strategists, creatives, producers and planners in the same room from the first insight — so the idea stays whole." },
    { t: "Seniors on the work", d: "The people you meet are the people who make it. No bait-and-switch between pitch and delivery." },
    { t: "Made in-house", d: "Film, sound, design and activation under one roof — craft you can see and hear, controlled end to end." },
    { t: "Close to the street", d: "We pressure-test ideas where life happens — markets, motor parks, timelines — not just the boardroom." },
  ],
  place: {
    city: "Victoria Island, Lagos",
    line: "Our studio and our subject: the most demanding consumer culture on the continent, and the best brief a brand can have.",
  },
};

export interface TimelineEntry {
  year: string;
  line: string;
}

export const timeline: TimelineEntry[] = [
  { year: "1995", line: "Founded in Lagos as Bates Cossé." },
  { year: "2002", line: "Builds an in-house production arm. (placeholder)" },
  { year: "2009", line: "Opens the experiential practice. (placeholder)" },
  { year: "2015", line: "Goes integrated across paid, owned and earned. (placeholder)" },
  { year: "2021", line: "Formalises the public-sector and cause practice. (placeholder)" },
  { year: "2024", line: "Becomes Cossé TTL — Total brand experiences." },
  { year: "Now", line: "Thirty years in. Just getting loud." },
];

export interface Leader {
  name: string;
  role: string;
  initials: string;
}

export const leadership: Leader[] = [
  { name: "Adaeze Cossé-Bello", role: "Chief Executive", initials: "AC" },
  { name: "Tunde Familoni", role: "Executive Creative Director", initials: "TF" },
  { name: "Ngozi Okafor", role: "Head of Strategy", initials: "NO" },
  { name: "Bode Adeyemi", role: "Managing Director", initials: "BA" },
];

export const disciplines: string[] = [
  "Brand",
  "Media",
  "Experiential",
  "Social",
  "Public Sector",
  "Production",
];

export interface ExecutionBlock {
  label: string;
  caption: string;
}
export interface ImpactStat {
  stat: string;
  label: string;
  note: string;
}
export interface CaseSpine {
  challenge: string;
  truth: string;
  idea: string;
  execution: ExecutionBlock[];
  channels: string[];
  impact: ImpactStat[];
  legacy: string;
}
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  keyword: string;
  idea: string;
  discipline: string;
  tags: string[];
  featured?: boolean;
  spine: CaseSpine;
}

export const cases: CaseStudy[] = [
  {
    slug: "first-withdrawal",
    title: "The First Withdrawal",
    client: "Paystream",
    sector: "Fintech · Agent Banking",
    year: "2024",
    keyword: "TRUST",
    idea: "We made a town's first cash-out a rite of passage, not a transaction.",
    discipline: "Brand",
    tags: ["Brand & Creative", "Production & Storytelling", "Out-of-home"],
    featured: true,
    spine: {
      challenge:
        "Paystream had the widest agent network in the North and no warmth to show for it. To most people it was a grey box on a table — useful, forgettable, replaceable by the next box.",
      truth:
        "The first time real money reaches your own hands, in your own town, something shifts. You are counted.",
      idea: "Make every agent a doorway, not a device. Your money. Your town. Your hands.",
      execution: [
        { label: "Anthem film", caption: "One naira note's first journey home, North to coast." },
        { label: "Agent murals", caption: "Hand-painted doorways at 4,000 agent points." },
        { label: "Radio drama", caption: "A six-part serial in Hausa, aired at market hours." },
      ],
      channels: ["Radio", "Out-of-home", "Agent activation", "Social", "Community"],
      impact: [
        { stat: "+38%", label: "Agent sign-ups", note: "placeholder" },
        { stat: "2.1M", label: "First-time cash-outs", note: "placeholder" },
        { stat: "+22pts", label: "Brand trust score", note: "placeholder" },
      ],
      legacy:
        "A hardware rollout became a trust brand. The doorway idea now frames how Paystream hires, trains and paints every new agent point.",
    },
  },
  {
    slug: "brewed-for-the-bend",
    title: "Brewed for the Bend",
    client: "Iron Stout",
    sector: "Beverage · FMCG",
    year: "2023",
    keyword: "5AM",
    idea: "We toasted the drivers who hold a city together before it wakes.",
    discipline: "Experiential",
    tags: ["Experiential & Activation", "Brand & Creative", "Social"],
    featured: true,
    spine: {
      challenge:
        "Iron Stout was losing the after-work occasion to lighter, louder lagers. It needed a reason to be chosen, not just a discount.",
      truth:
        "The hardest shift in Lagos starts at 5am and ends in the dark. Strength isn't a flavour note here — it's a way of life.",
      idea: "Brewed for the bend. A stout for people who take the hard road on purpose.",
      execution: [
        { label: "Roadside reveals", caption: "Bars built at the city's toughest junctions, dusk to dawn." },
        { label: "Driver portraits", caption: "A film series shot from inside the danfo at first light." },
        { label: "Bottle etch", caption: "Routes, not slogans, embossed on the glass." },
      ],
      channels: ["Experiential", "Out-of-home", "Social", "On-trade"],
      impact: [
        { stat: "+19%", label: "On-trade volume", note: "placeholder" },
        { stat: "11M", label: "Film views", note: "placeholder" },
        { stat: "#1", label: "Share of the after-work occasion", note: "placeholder" },
      ],
      legacy:
        "Iron Stout stopped competing on price and started owning grit. The roadside bar returns every year by demand.",
    },
  },
  {
    slug: "count-me-in",
    title: "Count Me In",
    client: "Swift Mobile",
    sector: "Telecom",
    year: "2022",
    keyword: "HUSTLE",
    idea: "A data plan that priced the hustle in, not out.",
    discipline: "Media",
    tags: ["Media & Channel Strategy", "Social & Content", "Brand & Creative"],
    featured: true,
    spine: {
      challenge:
        "Swift Mobile's prepaid base churned the moment a rival shaved a few naira off a bundle. Loyalty was a coupon, not a relationship.",
      truth:
        "Nobody buys data to use data. They buy it to chase something — a customer, a class, a way out.",
      idea: "Count me in. Bundles built around what people are working toward, not gigabytes.",
      execution: [
        { label: "Hustle bundles", caption: "Plans named for the goal: the apprentice, the trader, the grad." },
        { label: "Creator partners", caption: "Real side-hustles documented, week to week." },
        { label: "USSD redesign", caption: "A menu that speaks plainly, in five languages." },
      ],
      channels: ["Mobile / USSD", "Social", "Influencer", "Radio"],
      impact: [
        { stat: "-31%", label: "Monthly churn", note: "placeholder" },
        { stat: "+12%", label: "ARPU", note: "placeholder" },
        { stat: "4.6M", label: "Bundle activations", note: "placeholder" },
      ],
      legacy:
        "Swift stopped selling data and started backing ambition. The bundle naming system is still in market.",
    },
  },
  {
    slug: "the-long-season",
    title: "The Long Season",
    client: "Harvestfield",
    sector: "Agritech",
    year: "2023",
    keyword: "PATIENCE",
    idea: "We sold patience to farmers who had run out of it.",
    discipline: "Brand",
    tags: ["Brand & Creative", "Public Sector / Cause", "Production & Storytelling"],
    spine: {
      challenge:
        "Harvestfield's input loans worked, but adoption stalled. Farmers had been promised miracles by too many before.",
      truth:
        "A farmer doesn't gamble on a season. They protect it. Trust is earned in harvests, not pitches.",
      idea: "The long season. We don't sell a good year — we help you survive the bad one.",
      execution: [
        { label: "Field films", caption: "One cooperative, three seasons, no shortcuts." },
        { label: "Market radio", caption: "Plain-spoken advice between the prices and the news." },
        { label: "Agent toolkits", caption: "Flip-charts for low-literacy, high-trust conversations." },
      ],
      channels: ["Radio", "Field activation", "Cooperative networks", "SMS"],
      impact: [
        { stat: "+44%", label: "Loan uptake", note: "placeholder" },
        { stat: "92%", label: "Repayment rate", note: "placeholder" },
        { stat: "26", label: "States reached", note: "placeholder" },
      ],
      legacy:
        "Harvestfield became the name farmers say to other farmers. The long-season promise is now the company's operating principle.",
    },
  },
  {
    slug: "show-up",
    title: "Show Up",
    client: "Lagos Wellness",
    sector: "Public Sector · Cause",
    year: "2024",
    keyword: "PRESENT",
    idea: "We turned a routine immunisation drive into a neighbourhood promise.",
    discipline: "Public Sector",
    tags: ["Public Sector / Cause", "Experiential & Activation", "Social & Content"],
    spine: {
      challenge:
        "Turnout for the state immunisation programme kept missing target. Information wasn't the gap — belief was.",
      truth:
        "A mother doesn't distrust the vaccine. She distrusts being forgotten the day after the queue.",
      idea: "Show up. A promise from the system to the street, kept in both directions.",
      execution: [
        { label: "Street pledges", caption: "Health workers and parents signing the same wall." },
        { label: "Follow-up by name", caption: "Reminders that used the child's name, not a case number." },
        { label: "Local heroes", caption: "Community champions fronting the campaign, ward by ward." },
      ],
      channels: ["Community activation", "Radio", "Social", "Out-of-home"],
      impact: [
        { stat: "+27%", label: "Clinic turnout", note: "placeholder" },
        { stat: "180", label: "Wards covered", note: "placeholder" },
        { stat: "+33pts", label: "Programme trust", note: "placeholder" },
      ],
      legacy:
        "“Show up” outlived the drive — it became the standing language for how the agency speaks to the public.",
    },
  },
  {
    slug: "homecoming",
    title: "Homecoming",
    client: "SendHome",
    sector: "Remittance · Diaspora",
    year: "2021",
    keyword: "HOME",
    idea: "We made sending money feel like coming through the door.",
    discipline: "Production",
    tags: ["Production & Storytelling", "Brand & Creative", "Social"],
    spine: {
      challenge:
        "SendHome competed on fees in a category that all looked, sounded and felt the same. Rational, cold, interchangeable.",
      truth:
        "Money sent home is never just money. It's presence — a way of being in the room from five thousand miles away.",
      idea: "Homecoming. Every transfer is an arrival.",
      execution: [
        { label: "Anthem film", caption: "A daughter abroad, a Sunday table in Enugu, one transfer between them." },
        { label: "Diaspora portraits", caption: "Documentary shorts across London, Houston and Toronto." },
        { label: "Arrival sound", caption: "A sonic signature played the moment money lands." },
      ],
      channels: ["Film", "Social", "Diaspora media", "App"],
      impact: [
        { stat: "+41%", label: "New senders", note: "placeholder" },
        { stat: "18M", label: "Film views", note: "placeholder" },
        { stat: "+9pts", label: "Brand preference", note: "placeholder" },
      ],
      legacy:
        "SendHome stopped selling low fees and started selling presence. The arrival sound is now part of the product.",
    },
  },
  {
    slug: "dudu",
    title: "Dudu",
    client: "Dudu Beauty",
    sector: "Beauty · Personal Care",
    year: "2022",
    keyword: "HEIRLOOM",
    idea: "We took black soap off the market floor and put it on the dresser.",
    discipline: "Social",
    tags: ["Social & Content", "Brand & Creative", "Experiential & Activation"],
    spine: {
      challenge:
        "Black soap was everywhere and worth nothing — a cheap commodity sold by weight. Dudu wanted a premium brand without erasing the heritage.",
      truth:
        "The best beauty advice most women ever got came from their grandmother, not a brand.",
      idea: "Heirloom, not commodity. The recipe your grandmother trusted, made worthy of your shelf.",
      execution: [
        { label: "Recipe films", caption: "Three generations, one bar, told in close-up." },
        { label: "Packaging redesign", caption: "Object you'd display, not hide." },
        { label: "Creator rituals", caption: "Morning routines, no filters, real skin." },
      ],
      channels: ["Social", "Retail", "Influencer", "Experiential"],
      impact: [
        { stat: "3.4x", label: "Price premium held", note: "placeholder" },
        { stat: "+58%", label: "Retail listings", note: "placeholder" },
        { stat: "9M", label: "Organic reach", note: "placeholder" },
      ],
      legacy:
        "Dudu proved heritage could command a premium. The heirloom idea now governs the whole product range.",
    },
  },
  {
    slug: "lagos-loud",
    title: "Lagos Loud",
    client: "Range",
    sector: "Music · Culture",
    year: "2023",
    keyword: "STAGE",
    idea: "We didn't sponsor the culture. We built the stage it stood on.",
    discipline: "Experiential",
    tags: ["Experiential & Activation", "Production & Storytelling", "Social"],
    spine: {
      challenge:
        "Range, a drinks brand, kept buying logo placement at festivals and getting nothing back but a banner in someone else's photos.",
      truth:
        "Culture doesn't want a sponsor. It wants someone to hand it the mic and step back.",
      idea: "Lagos Loud. Don't sponsor the stage — be the reason it exists.",
      execution: [
        { label: "The stage", caption: "A free, brand-built platform for unsigned acts across four cities." },
        { label: "Live films", caption: "Performances captured and released within the hour." },
        { label: "Open call", caption: "Anyone could apply by voice note." },
      ],
      channels: ["Experiential", "Social", "Music platforms", "Out-of-home"],
      impact: [
        { stat: "+2.8M", label: "Social reach per night", note: "placeholder" },
        { stat: "120", label: "Artists platformed", note: "placeholder" },
        { stat: "+15%", label: "Brand affinity, 18–24", note: "placeholder" },
      ],
      legacy:
        "Range went from logo on a banner to name on the stage. Lagos Loud is now an owned property, not a sponsorship line.",
    },
  },
  {
    slug: "hold-steady",
    title: "Hold Steady",
    client: "Anchor Pensions",
    sector: "Insurance · Pensions",
    year: "2024",
    keyword: "BRAVE",
    idea: "We made the long game feel like the brave one.",
    discipline: "Brand",
    tags: ["Brand & Creative", "Media & Channel Strategy", "Social & Content"],
    spine: {
      challenge:
        "Anchor sold pensions to a young workforce that saw saving as surrender — proof you'd given up on the big swing.",
      truth:
        "Everyone admires the gamble. Nobody tells you that staying the course is the harder, braver thing.",
      idea: "Hold steady. Patience is not the safe choice. It's the bold one.",
      execution: [
        { label: "Manifesto film", caption: "The quiet discipline behind every overnight success." },
        { label: "Founder series", caption: "Builders who held on when it was unfashionable." },
        { label: "Calculator, reframed", caption: "A tool that shows courage compounding, not just naira." },
      ],
      channels: ["Social", "Digital", "Podcast", "Out-of-home"],
      impact: [
        { stat: "+36%", label: "Sign-ups, under-35", note: "placeholder" },
        { stat: "+21%", label: "Contribution rate", note: "placeholder" },
        { stat: "12M", label: "Campaign reach", note: "placeholder" },
      ],
      legacy:
        "Anchor reframed patience as courage for a whole generation. The line now anchors the brand outright.",
    },
  },
];

export interface Client {
  file: string;
  name: string;
}

// Logos sliced from the supplied client sheet onto uniform white tiles.
// Production: swap each for the brand's official vector (white-knockout preferred).
export const clients: Client[] = [
  { file: "/clients/00.png", name: "Federal Inland Revenue Service" },
  { file: "/clients/01.png", name: "Ecobank" },
  { file: "/clients/02.png", name: "Nigerian Breweries" },
  { file: "/clients/03.png", name: "Promasidor" },
  { file: "/clients/04.png", name: "British American Tobacco" },
  { file: "/clients/05.png", name: "Lagos State Government" },
  { file: "/clients/06.png", name: "MTN" },
  { file: "/clients/07.png", name: "PZ Cussons" },
  { file: "/clients/08.png", name: "UAC" },
  { file: "/clients/09.png", name: "UBA — United Bank for Africa" },
  { file: "/clients/10.png", name: "Unilever" },
  { file: "/clients/11.png", name: "Intel" },
  { file: "/clients/12.png", name: "MainOne" },
  { file: "/clients/13.png", name: "Wema Bank" },
  { file: "/clients/14.png", name: "Interswitch" },
  { file: "/clients/15.png", name: "National Blood Service Agency" },
  { file: "/clients/16.png", name: "National Malaria Control Programme" },
  { file: "/clients/17.png", name: "Nordica Fertility Centre" },
  { file: "/clients/18.png", name: "Munro" },
  { file: "/clients/19.png", name: "NACA" },
  { file: "/clients/20.png", name: "CFAO Motors" },
];

export const flagshipSlug = "first-withdrawal";

export function getCase(slug: string | null | undefined): CaseStudy {
  return cases.find((c) => c.slug === slug) || cases[0];
}

export function nextCase(slug: string): CaseStudy {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length];
}

const content = {
  positioning,
  method,
  capabilities,
  timeline,
  leadership,
  disciplines,
  clients,
  about,
  values,
  thinking,
  careers,
  contact,
  studio,
  cases,
  flagshipSlug,
  getCase,
  nextCase,
};

export default content;
