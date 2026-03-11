export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  type: 'bundle' | 'wig' | 'closure' | 'frontal';
  price: number;
  salePrice?: number;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[];
  heroImage: string;
  tags: string[];
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  rating: number;
  reviewCount: number;
  lengthOptions: string[];
  texture: string;
  reviews: ProductReview[];
}
