import type { Freelancer, Job, JobClient } from "./types";

export const CATEGORIES = [
  { slug: "web-dev", name: "Web Development", icon: "Code2", count: 1240, color: "bg-blue-500/10 text-blue-600" },
  { slug: "design", name: "Design & Creative", icon: "Palette", count: 890, color: "bg-fuchsia-500/10 text-fuchsia-600" },
  { slug: "writing", name: "Writing & Translation", icon: "PenLine", count: 612, color: "bg-amber-500/10 text-amber-600" },
  { slug: "marketing", name: "Sales & Marketing", icon: "Megaphone", count: 524, color: "bg-rose-500/10 text-rose-600" },
  { slug: "data-science", name: "Data Science & AI", icon: "BrainCircuit", count: 318, color: "bg-emerald-500/10 text-emerald-600" },
  { slug: "video", name: "Video & Animation", icon: "Film", count: 274, color: "bg-violet-500/10 text-violet-600" },
];

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=400&q=80&auto=format&fit=crop",
];

const PORTFOLIO_IMAGES = [
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80&auto=format&fit=crop",
];

const FREELANCER_DATA = [
  { name: "Sarah Chen", title: "Senior Full-Stack Engineer", category: "web-dev", skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"], rate: 95, location: "San Francisco, USA" },
  { name: "Marcus Bennett", title: "Product Designer & UX Lead", category: "design", skills: ["Figma", "UI/UX", "Design Systems", "Webflow", "Prototyping"], rate: 85, location: "London, UK" },
  { name: "Aisha Okonkwo", title: "Brand Identity Designer", category: "design", skills: ["Branding", "Illustrator", "Logo Design", "Typography"], rate: 70, location: "Lagos, Nigeria" },
  { name: "Diego Hernandez", title: "Conversion Copywriter", category: "writing", skills: ["Copywriting", "SEO", "Landing Pages", "Email"], rate: 80, location: "Barcelona, Spain" },
  { name: "Priya Sharma", title: "Data Scientist & ML Engineer", category: "data-science", skills: ["Python", "TensorFlow", "PyTorch", "SQL", "MLOps"], rate: 110, location: "Bangalore, India" },
  { name: "Liam O'Connor", title: "Motion Graphics Designer", category: "video", skills: ["After Effects", "Cinema 4D", "Animation", "Premiere"], rate: 75, location: "Dublin, Ireland" },
  { name: "Yuki Tanaka", title: "iOS & Swift Developer", category: "web-dev", skills: ["Swift", "SwiftUI", "iOS", "Combine"], rate: 100, location: "Tokyo, Japan" },
  { name: "Olivia Bergström", title: "Growth Marketing Strategist", category: "marketing", skills: ["SEO", "Google Ads", "Analytics", "CRO"], rate: 90, location: "Stockholm, Sweden" },
  { name: "Carlos Mendez", title: "Frontend Engineer", category: "web-dev", skills: ["React", "Next.js", "Tailwind", "Framer Motion"], rate: 72, location: "Mexico City, Mexico" },
  { name: "Hannah Wright", title: "Technical Writer", category: "writing", skills: ["Docs", "API Reference", "Markdown", "Developer Content"], rate: 65, location: "Austin, USA" },
  { name: "Rahim Hassan", title: "DevOps & Cloud Architect", category: "web-dev", skills: ["AWS", "Kubernetes", "Terraform", "Docker"], rate: 120, location: "Dubai, UAE" },
  { name: "Emilie Laurent", title: "Illustrator & Concept Artist", category: "design", skills: ["Procreate", "Illustration", "Character Design"], rate: 68, location: "Paris, France" },
  { name: "Noah Kim", title: "Video Editor & Colorist", category: "video", skills: ["DaVinci Resolve", "Premiere", "Color Grading"], rate: 60, location: "Seoul, South Korea" },
  { name: "Isabella Rossi", title: "Social Media Strategist", category: "marketing", skills: ["Instagram", "TikTok", "Content Strategy", "Analytics"], rate: 55, location: "Milan, Italy" },
  { name: "James Whitmore", title: "AI / LLM Engineer", category: "data-science", skills: ["LangChain", "OpenAI", "RAG", "Vector DBs", "Python"], rate: 130, location: "Toronto, Canada" },
  { name: "Fatima Al-Zahra", title: "Arabic Translator & Editor", category: "writing", skills: ["Translation", "Editing", "Localization"], rate: 45, location: "Cairo, Egypt" },
  { name: "Erik Johansson", title: "Webflow & No-Code Expert", category: "web-dev", skills: ["Webflow", "Zapier", "CMS", "JavaScript"], rate: 78, location: "Berlin, Germany" },
  { name: "Maya Patel", title: "Email Marketing Specialist", category: "marketing", skills: ["Klaviyo", "Mailchimp", "Automation", "Copy"], rate: 62, location: "Mumbai, India" },
  { name: "Sebastian Cruz", title: "3D Artist & Animator", category: "video", skills: ["Blender", "Cinema 4D", "3D Modeling", "Rendering"], rate: 82, location: "Buenos Aires, Argentina" },
  { name: "Chloe Anderson", title: "Product Designer (SaaS)", category: "design", skills: ["Figma", "SaaS", "Dashboards", "User Research"], rate: 95, location: "Melbourne, Australia" },
];

function rand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const FREELANCERS: Freelancer[] = FREELANCER_DATA.map((f, i) => {
  const r = rand(i + 1);
  return {
    id: `f${i + 1}`,
    name: f.name,
    title: f.title,
    avatar: AVATARS[i % AVATARS.length],
    hourlyRate: f.rate,
    rating: Math.round((4.5 + r * 0.5) * 100) / 100,
    reviewsCount: Math.floor(20 + r * 180),
    successRate: Math.floor(92 + r * 8),
    jobsCompleted: Math.floor(30 + r * 250),
    earned: `$${Math.floor(50 + r * 450)}K+`,
    availability: i % 5 === 0 ? "Busy" : i % 3 === 0 ? "Available in 1 week" : "Available now",
    location: f.location,
    skills: f.skills,
    category: f.category,
    topRated: i % 3 !== 2,
    bio: `${f.title} with ${Math.floor(5 + r * 10)}+ years of experience helping startups and enterprises ship beautiful, performant products. I focus on clear communication, rigorous quality, and measurable outcomes. Recent work includes scaling platforms, launching new product lines, and mentoring teams.`,
    portfolio: Array.from({ length: 4 }).map((_, j) => ({
      id: `p${i}-${j}`,
      title: `${f.skills[j % f.skills.length]} Project ${j + 1}`,
      image: PORTFOLIO_IMAGES[(i + j) % PORTFOLIO_IMAGES.length],
      tag: f.skills[j % f.skills.length],
    })),
    workHistory: Array.from({ length: 3 }).map((_, j) => ({
      id: `w${i}-${j}`,
      title: ["Built MVP from scratch", "Redesigned marketing site", "Migrated legacy stack", "Launched new feature suite"][(i + j) % 4],
      client: ["Acme Inc.", "Northwind", "Globex", "Initech", "Umbrella"][((i + j) % 5)],
      rating: 5,
      review: "Outstanding work. Delivered ahead of schedule with exceptional attention to detail. Communication was crisp and proactive throughout the project.",
      date: `${2024 - j} · ${["Jan","Mar","Jun","Sep","Nov"][j % 5]}`,
    })),
    education: [
      { school: ["MIT", "Stanford", "Oxford", "ETH Zurich", "Tsinghua"][i % 5], degree: "B.Sc. Computer Science", year: `${2010 + (i % 8)}` },
    ],
    certifications: [
      { name: ["AWS Certified Solutions Architect","Google UX Design","Meta Frontend","Adobe Certified Expert"][i % 4], issuer: "Coursera", year: "2023" },
    ],
    languages: [
      { name: "English", level: "Fluent" },
      { name: ["Spanish","French","Mandarin","Arabic","Japanese","Hindi"][i % 6], level: "Conversational" },
    ],
  };
});

const CLIENT_NAMES = ["NovaLabs","Pixelhaus","Lumen Studios","Northwind","Acme Co.","Stratus","BrightFold","Vertex","Helios","Orbital","Atlas Group","Hearth & Co","Mintwave","Foundry","Quanta","Beacon"];

function makeClient(i: number): JobClient {
  const r = rand(i * 7 + 3);
  return {
    id: `c${i}`,
    name: CLIENT_NAMES[i % CLIENT_NAMES.length],
    avatar: AVATARS[(i + 5) % AVATARS.length],
    rating: Math.round((4.4 + r * 0.6) * 100) / 100,
    jobsPosted: Math.floor(5 + r * 80),
    hireRate: Math.floor(60 + r * 40),
    location: ["United States","United Kingdom","Germany","Canada","Australia","Singapore","Netherlands"][i % 7],
    totalSpent: `$${Math.floor(10 + r * 500)}K+`,
    memberSince: `${2018 + (i % 7)}`,
    verified: true,
  };
}

const JOB_TEMPLATES = [
  { title: "Build a modern SaaS dashboard in React", desc: "Looking for a senior React engineer to build a polished analytics dashboard with charts, filters, and a clean component library. The MVP exists in Figma. We value typography, motion, and an obsessive attention to detail.", category: "web-dev", skills: ["React","TypeScript","Tailwind","Recharts"], type: "fixed" as const, min: 4000, max: 8000 },
  { title: "Redesign marketing website for B2B SaaS", desc: "Our site looks dated. We need a designer who can craft a high-converting marketing site — hero, features, pricing, and case studies — in Figma, ready to hand off to engineering.", category: "design", skills: ["Figma","Webflow","Branding"], type: "fixed" as const, min: 3500, max: 7000 },
  { title: "iOS app for a fitness startup", desc: "Build a native iOS app (SwiftUI) for our coaching product. HealthKit integration, workout flows, and a clean onboarding experience.", category: "web-dev", skills: ["Swift","SwiftUI","iOS","HealthKit"], type: "hourly" as const, min: 80, max: 120 },
  { title: "Brand identity for a coffee startup", desc: "We're launching a specialty coffee brand and need a full identity system: logo, palette, packaging direction, and brand guidelines.", category: "design", skills: ["Branding","Illustrator","Packaging"], type: "fixed" as const, min: 2500, max: 5000 },
  { title: "Long-form blog writer (technical, AI focus)", desc: "Looking for a writer who can publish 4 deeply researched, 2000-word posts per month on LLMs, agents, and developer tooling.", category: "writing", skills: ["Long-form","Technical","SEO"], type: "fixed" as const, min: 1500, max: 3000 },
  { title: "Performance marketing manager (paid ads)", desc: "Manage and scale paid acquisition across Meta and Google. Monthly ad budget of $40K. Looking for someone who lives in the data.", category: "marketing", skills: ["Meta Ads","Google Ads","Analytics"], type: "hourly" as const, min: 60, max: 100 },
  { title: "Build a RAG chatbot over company docs", desc: "Need an AI engineer to build a retrieval-augmented chatbot over our internal knowledge base. Vector DB, embeddings, and a slick chat UI.", category: "data-science", skills: ["LangChain","OpenAI","Pinecone","Python"], type: "fixed" as const, min: 6000, max: 12000 },
  { title: "Explainer animation for product launch", desc: "60-second motion graphics piece for our YC demo day. Voiceover provided. Style: modern, restrained, character-led.", category: "video", skills: ["After Effects","Motion Design","Storyboarding"], type: "fixed" as const, min: 2000, max: 4500 },
  { title: "Webflow site for a creative agency", desc: "Pixel-perfect Webflow build from Figma designs. CMS-driven case studies. Polished interactions and page transitions.", category: "web-dev", skills: ["Webflow","CMS","Interactions"], type: "fixed" as const, min: 3000, max: 6000 },
  { title: "Email marketing automation in Klaviyo", desc: "Set up welcome, abandoned cart, and post-purchase flows for our DTC brand. Copy and design included.", category: "marketing", skills: ["Klaviyo","Email","Automation"], type: "fixed" as const, min: 1800, max: 3500 },
  { title: "Senior Next.js developer for e-commerce", desc: "Build a high-performance Next.js storefront on Shopify Hydrogen. We care about Lighthouse scores and pixel polish.", category: "web-dev", skills: ["Next.js","Shopify","Hydrogen","TypeScript"], type: "hourly" as const, min: 70, max: 110 },
  { title: "Pitch deck designer (Series A)", desc: "Designer to take our messy Series A deck and turn it into something investor-worthy. 18-22 slides.", category: "design", skills: ["Keynote","Pitch Decks","Information Design"], type: "fixed" as const, min: 1500, max: 3500 },
  { title: "Product video for a hardware launch", desc: "Cinematic 90-second product film. We have the product and a small studio. Need a director/editor team.", category: "video", skills: ["Cinematography","Editing","Color"], type: "fixed" as const, min: 5000, max: 10000 },
  { title: "SEO content strategist", desc: "Audit our content, build a 6-month editorial calendar, and execute on top-of-funnel posts targeting high-intent keywords.", category: "marketing", skills: ["SEO","Content Strategy","Editorial"], type: "hourly" as const, min: 50, max: 90 },
  { title: "Data engineer to build our warehouse", desc: "Set up dbt + Snowflake. Pipe in product, marketing, and finance data. Build clean models the team can self-serve on.", category: "data-science", skills: ["dbt","Snowflake","SQL","Airbyte"], type: "hourly" as const, min: 90, max: 140 },
  { title: "Logo and visual identity for fintech app", desc: "Modern, trustworthy fintech brand. Looking for a designer with proven fintech work.", category: "design", skills: ["Logo","Identity","Fintech"], type: "fixed" as const, min: 2000, max: 4500 },
  { title: "Whitepaper writer (B2B fintech)", desc: "Research and write a 12-page whitepaper on stablecoin payments for enterprise.", category: "writing", skills: ["Whitepapers","B2B","Fintech"], type: "fixed" as const, min: 2500, max: 5000 },
  { title: "React Native developer for marketplace app", desc: "Add new features and improve performance of an existing React Native marketplace app.", category: "web-dev", skills: ["React Native","Expo","TypeScript"], type: "hourly" as const, min: 65, max: 100 },
  { title: "Notion + Make.com automations expert", desc: "Build operational automations across Notion, Make.com, and Slack for our ops team.", category: "marketing", skills: ["Notion","Make","Automation","Slack"], type: "hourly" as const, min: 45, max: 80 },
  { title: "Illustrator for children's book series", desc: "Illustrate a 32-page children's book. Whimsical, warm style. Looking at a 3-book series if it goes well.", category: "design", skills: ["Illustration","Children's Books","Procreate"], type: "fixed" as const, min: 3000, max: 6000 },
];

const TIME_AGO = ["2 minutes ago","18 minutes ago","an hour ago","3 hours ago","5 hours ago","9 hours ago","yesterday","2 days ago","3 days ago","4 days ago","5 days ago","a week ago","2 weeks ago"];
const EXP: ("Entry"|"Intermediate"|"Expert")[] = ["Entry","Intermediate","Expert"];
const LEN: Job["projectLength"][] = ["Less than 1 month","1 to 3 months","3 to 6 months","More than 6 months"];

export const JOBS: Job[] = Array.from({ length: 42 }).map((_, i) => {
  const t = JOB_TEMPLATES[i % JOB_TEMPLATES.length];
  const r = rand(i * 11 + 5);
  return {
    id: `j${i + 1}`,
    title: i < JOB_TEMPLATES.length ? t.title : `${t.title} (#${Math.floor(r * 99) + 1})`,
    description: t.desc,
    category: t.category,
    skills: t.skills,
    budgetType: t.type,
    budgetMin: t.min,
    budgetMax: t.max,
    experienceLevel: EXP[i % 3],
    projectLength: LEN[i % LEN.length],
    proposalsCount: Math.floor(3 + r * 50),
    postedAt: TIME_AGO[i % TIME_AGO.length],
    client: makeClient(i),
    featured: i < 4,
  };
});

export const ALL_SKILLS = Array.from(new Set(FREELANCERS.flatMap((f) => f.skills))).sort();

export const TESTIMONIALS = [
  { name: "Emma Watson", role: "CEO, Lumen Studios", avatar: AVATARS[1], quote: "We hired three engineers through Workly in under two weeks. The quality of talent and the platform itself is genuinely top tier." },
  { name: "Daniel Park", role: "Founder, Stratus", avatar: AVATARS[6], quote: "Posted a job on a Tuesday, had a designer working with us by Friday. The proposals were thoughtful, not spammy." },
  { name: "Lina Schmidt", role: "Head of Product, Vertex", avatar: AVATARS[0], quote: "Workly is now our default for any specialized work. The freelancers we've worked with are top 1% — and the platform stays out of the way." },
];

export const STATS = [
  { label: "Jobs posted", value: "184K+" },
  { label: "Active freelancers", value: "92K" },
  { label: "Countries", value: "164" },
  { label: "Paid out to talent", value: "$420M+" },
];
