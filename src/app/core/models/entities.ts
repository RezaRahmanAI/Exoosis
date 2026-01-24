export interface Solution {
  id: number;
  title: string;
  desc: string;
  icon: string;
  category: string;
  brands: string[];
  image: string;
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
