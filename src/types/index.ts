export interface Project {
  name: string;
  category: string;
  role: string;
  problem: string;
  approach: string;
  outcome: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
  featured?: boolean;
  gradient?: string;
  slug?: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  tagline: string;
  description: string;
  heroImage: string;
  github: string;
  demo: string;
  featured: boolean;

  overview: {
    problem: string;
    users: string;
    role: string;
    timeline: string;
    status: string;
  };

  motivation: {
    problem: string;
    whoAffected: string;
    whyExistingInsufficient: string;
    whyMatters: string;
  };

  solution: {
    approach: string;
    keyWorkflows: string[];
    features: { name: string; why: string }[];
  };

  architecture: {
    layers: { name: string; tech: string }[];
    diagram: string;
  };

  database?: {
    overview: string;
    entities: { name: string; description: string }[];
    relationships: string;
    rationale: string;
  };

  implementation: {
    frontend: string[];
    backend: string[];
    database?: string[];
    deployment: string[];
  };

  security?: {
    measures: { name: string; implementation: string }[];
  };

  ai?: {
    purpose: string;
    architecture: string;
    model: string;
    promptDesign?: string;
    fallback: string;
    limitations: string;
    futureImprovements: string[];
  };

  ux: {
    userFlows: { role: string; steps: string[] }[];
    keyScreens: string[];
    decisions: string[];
  };

  challenges: {
    challenge: string;
    difficulty: string;
    solution: string;
  }[];

  performance: {
    optimizations: string[];
    errorHandling: string[];
    testing: string;
  };

  roadmap: string[];

  media: {
    screenshots: { src: string; alt: string; caption: string }[];
    videoUrl?: string;
  };
}

export interface Service {
  title: string;
  desc: string;
  examples: string[];
  color: string;
}

export interface SkillCategory {
  label: string;
  color: string;
  items: string[];
}

export interface Experience {
  role: string;
  org: string;
  date: string;
  type: "Internship" | "Training" | "Degree";
  color: string;
  points: string[];
  tags: string[];
}

export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content?: string;
  coverImage?: SanityImage;
  tags?: string[];
  publishedAt: string;
  views?: number;
  likes?: number;
  shares?: number;
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  telegram: string;
  telegramCommunity: string;
  github: string;
}

export interface Config {
  formbladeContact: string;
  formbladeHireMe: string;
  phone: string;
  phoneHref: string;
  email: string;
  socials: SocialLinks;
  cvDownload: string;
  cvView: string;
}
