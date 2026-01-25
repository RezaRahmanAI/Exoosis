export interface Solution {
  id: number;
  title: string;
  desc: string;
  icon: string;
  category: string;
  brands: string[];
  image: string;
}

export interface PeripheralCategory {
  id: number;
  icon: string;
  name: string;
  desc: string;
}

export interface LaptopProduct {
  id: number;
  title: string;
  desc: string;
  image: string;
  tag: string;
  features: string[];
}

export interface OfficeSolution {
  id: number;
  title: string;
  icon: string;
  desc: string;
}

export interface ConsumableItem {
  id: number;
  name: string;
  image: string;
}

export interface Insight {
  id: number;
  category: string;
  title: string;
  desc: string;
  image: string;
  author: string;
  role: string;
  date: string;
}

export interface MissionStatement {
  id: number;
  quote: string;
  text1: string;
  text2: string;
}

export interface CompanyValue {
  id: number;
  title: string;
  icon: string;
  desc: string;
}

export interface ClientLogo {
  id: number;
  name: string;
  logo: string;
}

export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  typeIcon: string;
  category: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  team: string;
  salary?: string;
  datePosted?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  bio: string;
  isLeadership: boolean;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company?: string;
  image: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  summary: string;
  highlights: string[];
  integrations: string[];
  specs: { label: string; value: string }[];
  pricingTiers: { name: string; description: string; monthlyCost: string }[];
  image: string;
}

export interface EnterpriseSoftware {
  id: string;
  name: string;
  tagline: string;
  description: string;
  modules: { name: string; summary: string; capabilities: string[] }[];
  security: string[];
  deploymentOptions: string[];
  metrics: { label: string; value: string }[];
  roadmap: string[];
  image: string;
}

export interface JobApplicationPayload {
  jobId: number;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  resumeUrl: string;
  coverLetter: string;
}
