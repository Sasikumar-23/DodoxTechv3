/**
 * Single source of truth for all site copy, contact details and structured
 * content. Pages, JSON-LD schema, the sitemap and llms.txt all read from here,
 * so NAP (name / address / phone) stays identical everywhere — a core local-SEO
 * signal.
 */
import aiExtraction from "@/assets/work/ai-product-extraction.webp";
import aiExtraction2 from "@/assets/work/ai-product-extraction-2.webp";
import vagai from "@/assets/work/vagai-silambam-app.webp";
import vagai2 from "@/assets/work/vagai-silambam-app-2.webp";
import n8n from "@/assets/work/n8n-ai-document-automation.webp";
import n8n2 from "@/assets/work/n8n-ai-document-automation-2.webp";
import textile from "@/assets/work/erpnext-textile-manufacturing.webp";
import textile2 from "@/assets/work/erpnext-textile-manufacturing-2.webp";
import school from "@/assets/work/erpnext-school-management.webp";
import school2 from "@/assets/work/erpnext-school-management-2.webp";

/* ─── Company / NAP ─────────────────────────────────────────────────────── */

/** Canonical origin. Change here only — every canonical, OG URL and sitemap entry uses it. */
export const SITE_URL = "https://dodoxtechs.in";

export const company = {
  name: "DodoX Tech",
  legalName: "DodoXtechs Studio",
  tagline: "Build Smarter. Grow Faster.",
  description:
    "DodoX Tech is a software and AI automation studio in Coimbatore, India. We build AI automation, custom software, web and mobile apps — plus ERP and cloud systems — for growing businesses.",
  email: "dodoxtechstudio@gmail.com",
  phone: "+91 75488 72118",
  phoneE164: "+917548872118",
  supportPhone: "+91 90257 53273",
  supportPhoneE164: "+919025753273",
  whatsappSales: "https://wa.me/917548872118",
  whatsappSupport: "https://wa.me/919025753273",
  city: "Coimbatore",
  region: "Tamil Nadu",
  regionCode: "TN",
  country: "India",
  countryCode: "IN",
  // City centre — used only as an approximate service-area marker.
  geo: { lat: 11.0168, lng: 76.9558 },
  areaServed: ["Coimbatore", "Tamil Nadu", "India", "Worldwide (remote)"],
  languages: ["English", "Tamil"],
  responseTime: "within 24 hours",
  socials: {
    instagram: "https://www.instagram.com/dodox_tech",
    linkedin: "https://www.linkedin.com/in/dodox-tech-692a55411/",
  },
} as const;

export function whatsappLink(message?: string, support = false) {
  const base = support ? company.whatsappSupport : company.whatsappSales;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const stats = [
  { value: "10+", label: "Projects delivered" },
  { value: "12+", label: "Industries served" },
  { value: "98%", label: "Client retention" },
  { value: "24h", label: "Response time" },
];

export const outcomes = [
  {
    value: 72,
    suffix: "%",
    label: "Less manual work",
    desc: "Typical reduction in repetitive data entry once workflows are automated.",
  },
  {
    value: 3,
    suffix: "x",
    label: "Team productivity",
    desc: "People stop copy-pasting and focus on customers and decisions.",
  },
  {
    value: 45,
    suffix: "%",
    label: "Lower running costs",
    desc: "Lean stacks, fewer tools and right-sized cloud infrastructure.",
  },
  {
    value: 10,
    suffix: "x",
    label: "Room to scale",
    desc: "Systems architected to handle growth without a rebuild.",
  },
];

/* ─── Services ──────────────────────────────────────────────────────────── */

export type ServiceSlug =
  | "ai-automation"
  | "erpnext"
  | "custom-software-development"
  | "mobile-app-development"
  | "devops-cloud";

export type Service = {
  slug: ServiceSlug;
  icon: "brain" | "database" | "globe" | "smartphone" | "server";
  name: string;
  /** short noun used in sentences, e.g. "your ERPNext project" */
  label: string;
  short: string;
  /** <title> — kept under ~60 chars */
  metaTitle: string;
  /** meta description — kept under ~155 chars */
  metaDescription: string;
  h1: string;
  intro: string;
  problems: string[];
  deliverables: { title: string; desc: string }[];
  tech: string[];
  idealFor: string[];
  workSlugs: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    label: "automation",
    icon: "brain",
    name: "AI & Workflow Automation",
    short: "AI agents, OCR and n8n / Python / UiPath bots that take repetitive work off your team.",
    metaTitle: "AI Automation Company in Coimbatore | DodoX Tech",
    metaDescription:
      "AI automation services in Coimbatore: n8n workflows, OCR document processing, AI classification and Python / UiPath RPA bots that cut manual work.",
    h1: "AI & workflow automation that removes manual work",
    intro:
      "We find the repetitive, error-prone work in your business — re-typing invoices, copying data between tools, chasing approvals — and hand it to reliable automations. You keep control; the busywork disappears.",
    problems: [
      "Staff re-type invoices, POs and quotations into your ERP or spreadsheets",
      "Data lives in email, WhatsApp, Excel and three different tools that don't talk",
      "Reports take days to compile because someone has to collect everything by hand",
      "Simple approvals and follow-ups slip because nobody owns them",
    ],
    deliverables: [
      {
        title: "Document processing (OCR + AI)",
        desc: "Read invoices, POs, RFQs and quotations, classify them and push clean data into your ERP.",
      },
      {
        title: "n8n workflow automation",
        desc: "Visual, maintainable pipelines that connect your apps, APIs, databases and inboxes.",
      },
      {
        title: "Python & UiPath RPA bots",
        desc: "Bots for legacy portals and desktop apps that have no API.",
      },
      {
        title: "AI assistants & agents",
        desc: "Classification, extraction, routing and summarisation built on modern LLMs, with human review where it matters.",
      },
      {
        title: "Browser extensions",
        desc: "Chrome extensions that pull structured data from websites straight into your systems.",
      },
      {
        title: "Monitoring & alerts",
        desc: "Every automation is logged, monitored and alerts a human when something needs attention.",
      },
    ],
    tech: [
      "n8n",
      "Python",
      "UiPath",
      "OCR",
      "OpenAI / Claude APIs",
      "MongoDB",
      "Chrome APIs",
      "Webhooks",
    ],
    idealFor: [
      "Manufacturers & traders",
      "E-commerce teams",
      "Finance & back-office",
      "Any team drowning in documents",
    ],
    workSlugs: ["n8n-ai-document-automation", "ai-product-extraction"],
    faqs: [
      {
        q: "What kind of work can you automate?",
        a: "Anything rule-based and repetitive: reading documents, moving data between systems, generating reports, sending follow-ups and routing approvals. We start by mapping your workflow and pick the automations with the highest time savings first.",
      },
      {
        q: "Do I need to replace my current software?",
        a: "Usually not. We connect the tools you already use — ERPNext, Google Sheets, email, WhatsApp, CRMs and APIs — and automate the work between them.",
      },
      {
        q: "Is my data safe with AI automation?",
        a: "We design automations so sensitive data stays in your systems, use access-controlled credentials, and add human review steps for decisions that matter. We can self-host n8n on your own server if needed.",
      },
      {
        q: "How fast will I see results?",
        a: "Most clients see their first automation running in production within a few weeks of the discovery call. We agree a timeline in writing before we start.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    label: "software",
    icon: "globe",
    name: "Custom Software & Web Development",
    short: "Custom web apps, dashboards, portals and fast, SEO-ready business websites.",
    metaTitle: "Custom Software & Web Development in Coimbatore | DodoX Tech",
    metaDescription:
      "Custom software and web development in Coimbatore: web apps, admin dashboards, client portals, SaaS products and fast, SEO-ready business websites.",
    h1: "Custom software & web development",
    intro:
      "When off-the-shelf tools don't fit, we build software that does — web apps, dashboards, portals and SaaS products shaped around how your business actually works, plus fast, search-friendly websites that bring in enquiries.",
    problems: [
      "Your team runs operations on spreadsheets and WhatsApp instead of a proper system",
      "Off-the-shelf software forces you to change how you work — or doesn't do what you need",
      "Your website looks outdated, loads slowly and doesn't generate enquiries",
      "You have a product idea but no in-house tech team to build it",
    ],
    deliverables: [
      {
        title: "Custom web applications",
        desc: "Internal tools, portals, booking systems and workflows built around your process.",
      },
      {
        title: "Admin dashboards",
        desc: "Real-time analytics and management panels your team will actually enjoy using.",
      },
      {
        title: "SaaS products & MVPs",
        desc: "From idea to launched product — architecture, build, billing and scaling.",
      },
      {
        title: "Business websites",
        desc: "Conversion-focused, SEO-ready sites that load fast on every device.",
      },
      {
        title: "API & integrations",
        desc: "Connect your software to CRMs, ERPs, payment gateways and WhatsApp.",
      },
      {
        title: "Hosting & maintenance",
        desc: "Secure deployment, backups and updates so everything keeps performing.",
      },
    ],
    tech: ["React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "MongoDB", "Cloudflare"],
    idealFor: [
      "Teams replacing spreadsheets",
      "Startups & founders",
      "Small & medium businesses",
      "Institutions",
    ],
    workSlugs: ["erpnext-school-management", "ai-product-extraction"],
    faqs: [
      {
        q: "Do you build custom software, not just websites?",
        a: "Yes — custom software is most of our work. We build internal tools, dashboards, client portals and full SaaS products with React, Node.js and modern databases, designed around your exact workflow.",
      },
      {
        q: "Will my website be SEO-friendly?",
        a: "Yes. Every site we build has server-rendered pages, structured data, a sitemap, fast load times and proper meta tags, so search engines can understand and rank it.",
      },
      {
        q: "Can I update the content myself?",
        a: "Yes. Where you need to edit content regularly, we set up an easy admin panel or CMS.",
      },
      {
        q: "Do you redesign existing websites?",
        a: "Yes. We can redesign and rebuild your current site to load faster, rank better and convert more visitors into enquiries.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    label: "mobile app",
    icon: "smartphone",
    name: "Mobile App Development",
    short: "Cross-platform iOS & Android apps with real-time data and admin dashboards.",
    metaTitle: "Mobile App Development Company in Coimbatore | DodoX Tech",
    metaDescription:
      "Mobile app development in Coimbatore. Cross-platform iOS and Android apps built with React Native, with real-time data, admin dashboards and backend.",
    h1: "Mobile app development for iOS & Android",
    intro:
      "We build cross-platform mobile apps that feel native on both iOS and Android — from one codebase, with the backend and admin dashboard to run them.",
    problems: [
      "Attendance, bookings or field data are still tracked on paper",
      "Customers or members expect an app, but native development for two platforms is too expensive",
      "Your team needs real-time updates in the field, not end-of-day reports",
    ],
    deliverables: [
      {
        title: "Cross-platform apps",
        desc: "One React Native codebase for iOS and Android, with a native look and feel.",
      },
      {
        title: "Backend & APIs",
        desc: "Secure APIs, authentication and databases to power the app.",
      },
      {
        title: "Admin dashboards",
        desc: "Web dashboards to manage users, content and reports behind the app.",
      },
      {
        title: "Real-time features",
        desc: "Live updates, notifications, attendance and tracking.",
      },
      { title: "Store publishing", desc: "We handle Play Store and App Store submission." },
      { title: "Maintenance", desc: "OS updates, bug fixes and new features after launch." },
    ],
    tech: ["React Native", "TypeScript", "Node.js", "Firebase", "PostgreSQL", "REST APIs"],
    idealFor: ["Academies & institutions", "Field teams", "Service businesses", "Startups"],
    workSlugs: ["vagai-silambam-app", "erpnext-school-management"],
    faqs: [
      {
        q: "Do you build for both iOS and Android?",
        a: "Yes. We use React Native to build one codebase that runs on both platforms, which keeps cost and maintenance lower than two separate native apps.",
      },
      {
        q: "Will you publish the app to the stores?",
        a: "Yes. We prepare the store listings and handle submission to Google Play and the Apple App Store.",
      },
      {
        q: "Can the app work with my existing system?",
        a: "Yes. We can connect the app to ERPNext, your website backend or any system with an API.",
      },
    ],
  },
  {
    slug: "erpnext",
    label: "ERPNext",
    icon: "database",
    name: "ERPNext Implementation & Customization",
    short:
      "ERPNext setup, custom modules, workflows, reports and integrations for how your business really runs.",
    metaTitle: "ERPNext Implementation & Customization | DodoX Tech",
    metaDescription:
      "ERPNext implementation partner in Coimbatore. Setup, custom modules, workflows, reports and integrations for manufacturing, textile, education and trading.",
    h1: "ERPNext implementation & customization",
    intro:
      "ERPNext is powerful, open-source and affordable — when it's configured for the way your business actually works. We implement, customise and integrate ERPNext so purchase, sales, inventory, production and accounts run from one system.",
    problems: [
      "Stock, sales and accounts live in separate spreadsheets that never match",
      "Off-the-shelf ERP doesn't fit your production or approval process",
      "Your current ERP setup is half-finished and the team has stopped using it",
      "Owners can't see real-time numbers without asking three people",
    ],
    deliverables: [
      {
        title: "ERPNext setup & migration",
        desc: "Installation, configuration, master data and opening balance migration.",
      },
      {
        title: "Custom modules & doctypes",
        desc: "Fields, forms and modules for processes unique to your industry.",
      },
      {
        title: "Workflows & approvals",
        desc: "Role-based approval flows for purchase, sales, payments and production.",
      },
      {
        title: "Reports & dashboards",
        desc: "Custom print formats, script reports and live dashboards for owners and managers.",
      },
      {
        title: "Integrations",
        desc: "Connect ERPNext with e-commerce, payment gateways, WhatsApp, email and other systems via API.",
      },
      {
        title: "Training & support",
        desc: "Hands-on team training and ongoing support so adoption actually sticks.",
      },
    ],
    tech: ["ERPNext", "Frappe Framework", "Python", "JavaScript", "MariaDB", "REST API"],
    idealFor: [
      "Textile & manufacturing",
      "Schools & institutions",
      "Trading & distribution",
      "Service businesses",
    ],
    workSlugs: ["erpnext-textile-manufacturing", "erpnext-school-management"],
    faqs: [
      {
        q: "Why choose ERPNext over other ERPs?",
        a: "ERPNext is open-source, so there are no per-user licence fees, and it covers accounting, inventory, manufacturing, HR, CRM and more in one system. It can be customised deeply without vendor lock-in.",
      },
      {
        q: "Can you customise ERPNext for my industry?",
        a: "Yes. We have built ERPNext solutions for textile manufacturing and school management, adding custom modules, workflows and reports where the standard product doesn't fit.",
      },
      {
        q: "Can you fix an existing ERPNext setup?",
        a: "Yes. We audit your current configuration, clean up data and customisations, and get the team using it properly again.",
      },
      {
        q: "Do you provide training and support after go-live?",
        a: "Yes. Every implementation includes team training, and we offer ongoing support and enhancement plans.",
      },
    ],
  },
  {
    slug: "devops-cloud",
    label: "DevOps & cloud",
    icon: "server",
    name: "DevOps, Cloud & Linux",
    short: "CI/CD, Docker, cloud infrastructure, server hardening and monitoring.",
    metaTitle: "DevOps & Cloud Services | DodoX Tech, Coimbatore",
    metaDescription:
      "DevOps and cloud services: CI/CD pipelines, Docker, cloud infrastructure, Linux server administration, hardening, backups and monitoring.",
    h1: "DevOps, cloud infrastructure & Linux administration",
    intro:
      "Reliable software needs reliable infrastructure. We set up deployment pipelines, containerise applications, harden Linux servers and monitor everything so your systems stay fast, secure and online.",
    problems: [
      "Deployments are manual, risky and only one person knows how",
      "Your server is slow, unpatched or has never been backed up properly",
      "Cloud bills keep growing without anyone knowing why",
    ],
    deliverables: [
      {
        title: "CI/CD pipelines",
        desc: "Automated build, test and deploy so releases are safe and repeatable.",
      },
      { title: "Docker & containers", desc: "Containerised apps that run the same everywhere." },
      {
        title: "Cloud setup",
        desc: "Right-sized infrastructure on AWS, DigitalOcean, Cloudflare or your own servers.",
      },
      {
        title: "Linux administration",
        desc: "Server hardening, patching, users, firewalls and SSL.",
      },
      {
        title: "Backups & recovery",
        desc: "Automated, tested backups with a clear recovery plan.",
      },
      {
        title: "Monitoring & uptime",
        desc: "Alerts and dashboards so issues are caught before customers notice.",
      },
    ],
    tech: ["Linux", "Docker", "GitHub Actions", "Nginx", "AWS", "Cloudflare", "PM2"],
    idealFor: ["Teams self-hosting ERPNext", "SaaS products", "Businesses with in-house servers"],
    workSlugs: ["n8n-ai-document-automation", "erpnext-textile-manufacturing"],
    faqs: [
      {
        q: "Can you host and manage ERPNext for us?",
        a: "Yes. We deploy ERPNext on a secured server or cloud instance with backups, SSL and monitoring, and keep it updated.",
      },
      {
        q: "Can you reduce our cloud costs?",
        a: "Often, yes. We review your infrastructure, remove unused resources and right-size servers to match real usage.",
      },
      {
        q: "Do you offer ongoing server maintenance?",
        a: "Yes. We offer monthly maintenance covering patching, backups, monitoring and incident response.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/* ─── Case studies ──────────────────────────────────────────────────────── */

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  type: string;
  year: string;
  cover: string;
  gallery: string[];
  summary: string;
  metaDescription: string;
  challenge: string;
  solution: string;
  features: string[];
  results: string[];
  tech: string[];
  services: ServiceSlug[];
  quote?: { text: string; author: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "n8n-ai-document-automation",
    title: "AI-Powered n8n Document Automation",
    client: "Manufacturing & trading client",
    industry: "Manufacturing",
    type: "AI Automation · n8n",
    year: "2025",
    cover: n8n,
    gallery: [n8n2],
    summary:
      "Automated ERP document processing with n8n, OCR and AI classification — invoices, POs, RFQs and quotations flow into the ERP without re-typing.",
    metaDescription:
      "Case study: automated ERP document processing with n8n, OCR and AI classification for invoices, purchase orders, RFQs and quotations.",
    challenge:
      "Purchase and sales documents arrived as PDFs and images by email. Staff opened each one, read it, and re-typed the details into the ERP — slow, repetitive work with a steady stream of typing errors.",
    solution:
      "We built an n8n pipeline that picks up incoming documents, extracts text with OCR, uses AI to classify each document (invoice, PO, RFQ or quotation) and pull out the key fields, validates the data, and stores it in MongoDB ready for the ERP — alerting a person only when something needs review.",
    features: [
      "Automatic intake of documents from email and uploads",
      "OCR text extraction from PDFs and scanned images",
      "AI classification into invoices, POs, RFQs and quotations",
      "Field validation with human review for low-confidence results",
      "Structured storage and export for the ERP and reporting",
    ],
    results: [
      "Manual data entry for routine documents removed",
      "Faster turnaround from document received to ERP entry",
      "Fewer typing errors in purchase and sales records",
    ],
    tech: ["n8n", "OCR", "AI classification", "MongoDB", "Webhooks"],
    services: ["ai-automation", "devops-cloud"],
  },
  {
    slug: "ai-product-extraction",
    title: "AI Product Data Extraction Extension",
    client: "E-commerce team",
    industry: "E-commerce",
    type: "Chrome Extension · AI",
    year: "2025",
    cover: aiExtraction,
    gallery: [aiExtraction2],
    summary:
      "A Chrome extension that extracts product data from websites using AI-powered attribute matching and schema-based processing, exporting clean data to Excel and JSON.",
    metaDescription:
      "Case study: a Chrome extension that automates product data extraction with AI attribute matching, saving an e-commerce team 40+ hours a week.",
    challenge:
      "The team onboarded products by copying names, prices, attributes and descriptions from supplier and marketplace pages into spreadsheets — hours of repetitive work every week.",
    solution:
      "We built a Chrome extension that reads product pages, uses AI-powered attribute matching to map the data to the team's own product schema, and exports structured results to Excel and JSON with a dashboard to track extraction jobs.",
    features: [
      "One-click extraction from product pages",
      "AI attribute matching to a custom product schema",
      "Export to Excel, CSV and JSON",
      "Extraction history and project dashboard",
    ],
    results: [
      "40+ hours a week saved on product onboarding (client-reported)",
      "Consistent, structured product data across sources",
    ],
    tech: ["Chrome APIs", "JavaScript", "AI", "JSON", "Excel"],
    services: ["ai-automation", "custom-software-development"],
    quote: {
      text: "The AI extension saved us 40+ hours a week on product onboarding.",
      author: "Daniel V.",
      role: "E-commerce Lead",
    },
  },
  {
    slug: "vagai-silambam-app",
    title: "Vagai Silambam Management App",
    client: "Vagai Silambam academy",
    industry: "Sports & Academies",
    type: "Mobile App",
    year: "2025",
    cover: vagai,
    gallery: [vagai2],
    summary:
      "A mobile app for managing student attendance, records and training workflows for a martial arts academy.",
    metaDescription:
      "Case study: Vagai Silambam mobile app for martial arts student management — attendance tracking, records, training schedules and dashboards.",
    challenge:
      "Instructors tracked students, attendance and training batches on paper across multiple classes, which made it hard to follow progress or spot students who had stopped attending.",
    solution:
      "We built a mobile app that lets instructors mark attendance in seconds, manage student records and batches, follow training schedules and see analytics on a dashboard — all in real time.",
    features: [
      "Student management",
      "One-tap attendance tracking",
      "Records and training schedules",
      "Real-time dashboard analytics",
    ],
    results: [
      "Paper registers replaced with a real-time app",
      "Instructors can see attendance and progress at a glance",
    ],
    tech: ["React Native", "Realtime", "Dashboard", "Backend API"],
    services: ["mobile-app-development"],
  },
  {
    slug: "erpnext-school-management",
    title: "ERPNext School Management System",
    client: "Educational institution",
    industry: "Education",
    type: "ERPNext · Education",
    year: "2024",
    cover: school,
    gallery: [school2],
    summary:
      "A customised ERPNext platform for admissions, fees, attendance, timetables, exams and staff management, with a mobile-friendly student view.",
    metaDescription:
      "Case study: customised ERPNext school management system — admissions, fees, attendance, timetables, exams and staff management.",
    challenge:
      "Admissions, fee collection, attendance and exam records were handled in registers and spreadsheets, making it hard to track dues, report to management or give parents timely updates.",
    solution:
      "We customised ERPNext's education features into a complete school management system with admission workflows, fee schedules and reminders, attendance, timetables, exam and grade management, and staff records.",
    features: [
      "Admissions workflow",
      "Fee schedules, collection and reminders",
      "Attendance and timetables",
      "Exams, grades and report cards",
      "Staff management and reports",
    ],
    results: [
      "Administrative records moved from registers into one system",
      "Clear, real-time view of fees, attendance and performance",
    ],
    tech: ["ERPNext", "Workflows", "Reports", "Dashboards"],
    services: ["erpnext", "custom-software-development"],
    quote: {
      text: "Their ERPNext customization was surgical — exactly what our school needed.",
      author: "Meera S.",
      role: "Principal",
    },
  },
  {
    slug: "erpnext-textile-manufacturing",
    title: "ERPNext Textile & Manufacturing Solution",
    client: "Textile group",
    industry: "Textile & Manufacturing",
    type: "ERPNext",
    year: "2024",
    cover: textile,
    gallery: [textile2],
    summary:
      "A customised ERPNext implementation covering purchase, sales, inventory, invoicing, payments and production workflows for a textile manufacturer.",
    metaDescription:
      "Case study: customised ERPNext implementation for a textile manufacturer — purchase, sales, inventory, invoicing, payments and production workflows.",
    challenge:
      "Orders, yarn and fabric stock, production stages and payments were tracked across spreadsheets and paper. Owners had no real-time view, and processing an order took days of back-and-forth.",
    solution:
      "We implemented ERPNext with custom modules for the textile production flow — spinning, weaving, dyeing, finishing and packing — linked to purchase, sales, inventory, invoicing and payments, with dashboards for production and stock.",
    features: [
      "Production workflow tracking by stage",
      "Raw material and finished goods inventory",
      "Purchase, sales, invoicing and payments in one system",
      "Custom modules and API integrations",
      "Owner dashboards for orders, output and stock",
    ],
    results: [
      "Order processing reduced from days to minutes (client-reported)",
      "One real-time source of truth for stock and production",
    ],
    tech: ["ERPNext", "Frappe", "Custom Modules", "REST API"],
    services: ["erpnext", "devops-cloud"],
    quote: {
      text: "DodoX rebuilt our entire order pipeline. What used to take days now happens in minutes.",
      author: "Rajesh K.",
      role: "Operations Head, Textile Group",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/* ─── Social proof ──────────────────────────────────────────────────────── */

export const testimonials = [
  {
    q: "DodoX rebuilt our entire order pipeline. What used to take days now happens in minutes.",
    a: "Rajesh K.",
    r: "Operations Head, Textile Group",
  },
  {
    q: "Their ERPNext customization was surgical — exactly what our school needed.",
    a: "Meera S.",
    r: "Principal, Vagai Institute",
  },
  {
    q: "The AI extension saved us 40+ hours a week on product onboarding.",
    a: "Daniel V.",
    r: "E-commerce Lead",
  },
  {
    q: "Beautifully designed, brutally efficient. A rare combination.",
    a: "Aishwarya N.",
    r: "CTO, Retail SaaS",
  },
];

export const industries = [
  { name: "Textile & Manufacturing", desc: "Automation, production tracking and inventory." },
  { name: "Education", desc: "Admissions, fees, attendance and exams." },
  { name: "E-commerce & Retail", desc: "Product data, orders and automation." },
  { name: "Sports & Academies", desc: "Student, batch and attendance apps." },
  { name: "Trading & Distribution", desc: "Purchase, sales and stock in one place." },
  { name: "Professional Services", desc: "Workflows, dashboards and client portals." },
];

export const techStack = [
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "Python",
  "n8n",
  "UiPath",
  "OpenAI",
  "ERPNext",
  "Claude",
  "Docker",
  "Linux",
  "AWS",
  "Cloudflare",
  "MongoDB",
  "PostgreSQL",
];

export const process = [
  {
    n: "01",
    title: "Discover",
    desc: "A free call to understand your operations, pain points and goals. You get honest advice — even if that's 'you don't need custom software'.",
  },
  {
    n: "02",
    title: "Plan",
    desc: "A written scope, fixed timeline and clear quote. No surprises.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Production-grade code in short iterations. You see progress every week.",
  },
  {
    n: "04",
    title: "Launch",
    desc: "Careful deployment, data migration and hands-on team training.",
  },
  { n: "05", title: "Grow", desc: "Support, monitoring and improvements as your business scales." },
];

export const engagementModels = [
  {
    name: "Fixed-scope project",
    desc: "A clearly defined build — automation, web app, mobile app or website — with a fixed quote and timeline.",
    best: "Best for: new builds with clear goals",
  },
  {
    name: "Monthly retainer",
    desc: "A dedicated slice of our team each month for continuous improvements, new features and automations.",
    best: "Best for: growing businesses with ongoing needs",
  },
  {
    name: "Support & maintenance",
    desc: "Monitoring, backups, updates and fixes for systems we built — or ones someone else built.",
    best: "Best for: keeping existing systems healthy",
  },
];

export const homeFaqs = [
  {
    q: "What does DodoX Tech do?",
    a: "DodoX Tech is a software studio in Coimbatore, India. We build AI and workflow automation, custom software, web apps and mobile apps — and integrate them with business systems like ERPNext and the cloud they run on.",
  },
  {
    q: "Do you work with clients outside Coimbatore?",
    a: "Yes. We work with businesses across Tamil Nadu and India, and with international clients remotely. Discovery calls and project updates happen over video, phone or WhatsApp.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on scope. After a free discovery call we send a written proposal with a fixed quote and timeline, so you know the cost before any work starts.",
  },
  {
    q: "How long does a typical project take?",
    a: "Small automations and websites usually take a few weeks; larger apps and system rollouts take longer. We agree a timeline in writing during planning.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Every project includes a support period, and we offer ongoing maintenance and retainer plans.",
  },
  {
    q: "How quickly will you reply to my enquiry?",
    a: "We reply to every enquiry within 24 hours. For a faster answer, message us on WhatsApp at +91 75488 72118.",
  },
];

export const budgets = ["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹5L", "₹5L+", "Not sure yet"];
