export interface ApiCategory {
  id: string;
  name: string;
  description?: string | null;
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
  createdAt: string;
  updatedAt?: string | null;
}
