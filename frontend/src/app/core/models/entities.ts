export enum SolutionCategory {
  Industrial = 0,
  Corporate = 1,
  Banking = 2,
}

export enum PartnerCategory {
  ComputingHardware = 0,
  Network = 1,
  Security = 2,
}

export interface Solution {
  id: string;
  name: string;
  summary?: string;
  description?: string;
  category: SolutionCategory;
  imageUrl?: string;
  technologyStack: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Job {
  id: string;
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
  id: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  quote?: string;
  bio?: string | null;
  isLeadership: boolean;
  linkedInUrl?: string;
  isActive: boolean;
}

export interface Partner {
  id: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  isActive: boolean;
  category: PartnerCategory;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company?: string;
  image: string;
}

export interface RespectedClient {
  id: string;
  name: string;
  logoUrl?: string | null;
  isActive: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  summary: string;
  price: number;
  priceUnit: string;
  brand: string;
  isActive: boolean;
  isFeatured: boolean;
  highlights: string[];
  integrations: string[];
  specs: { label: string; value: string }[];
  pricingTiers: { name: string; description: string; monthlyCost: string }[];
  image: string;
}

export interface CartItem {
  id: number;
  productId: string;
  name: string;
  category: string;
  price: number;
  priceUnit: string;
  quantity: number;
  image: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber?: string;
  profilePhotoUrl?: string;
  address?: Address;
  dateOfBirth?: string;
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  emailVerified?: boolean;
}

export interface UserApi {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber?: string;
  profilePhotoUrl?: string;
  addressStreet?: string;
  addressCity?: string;
  addressState?: string;
  addressPostalCode?: string;
  addressCountry?: string;
  dateOfBirth?: string;
  gender?: string;
  lastLoginAt?: string;
  emailVerified?: boolean;
}

export interface AuthResponse {
  token: string;
  user: UserApi;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface WebsiteSettings {
  general: {
    websiteName: string;
    tagline: string;
    logoUrl: string;
    footerLogoUrl: string;
    faviconUrl: string;
    defaultLanguage: string;
    currency: string;
    timezone: string;
  };
  contact: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    primaryPhone: string;
    secondaryPhone: string;
    supportPhone: string;
    generalEmail: string;
    salesEmail: string;
    supportEmail: string;
  };
  social: {
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
  };
  business: {
    description: string;
    foundedYear: number;
    registrationNumber: string;
    taxId: string;
    workingHours: string;
    paymentMethods: string[];
  };
  seo: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    metaKeywords: string;
    googleAnalyticsId: string;
    facebookPixelId: string;
    googleTagManagerId: string;
  };
}

export interface OrderPayload {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  placedAt: string;
  status?: string;
  total: number;
  items: CartItem[];
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
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  resumeUrl: string;
  coverLetter: string;
}
