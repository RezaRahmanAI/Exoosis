import { PartnerCategory } from './entities';

export interface ApiCategory {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ApiBrand {
  id: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  isActive: boolean;
  category: PartnerCategory;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ApiProduct {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  categoryId: string;
  categoryName?: string | null;
  brandId: string;
  brandName?: string | null;
  stockQuantity: number;
  imageUrls: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface HeroContent {
  id: string;
  badgeText: string;
  title: string;
  subText: string;
  image1Url: string;
  image2Url: string;
  image3Url: string;
  isActive: boolean;
  createdAt: string;
}
