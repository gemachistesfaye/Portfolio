export interface Project {
  name: string;
  category: string;
  problem: string;
  approach: string;
  outcome: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
  featured?: boolean;
  gradient?: string;
}

export interface Service {
  title: string;
  desc: string;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface Certificate {
  name: string;
  issuer: string;
  file: string;
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
  type: "Training" | "Degree";
  color: string;
  points: string[];
  tags: string[];
}

export interface FAQ {
  q: string;
  a: string;
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
