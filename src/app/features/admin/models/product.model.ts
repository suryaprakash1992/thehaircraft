import { Timestamp } from '@angular/fire/firestore';

export interface Product {
  id?: string;
  productName: string;
  quality: number;
  productImage: string;
  productDescription: string;
  amount: number;
  currency: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ProductFormData {
  productName: string;
  quality: number;
  productImage: File | null;
  productDescription: string;
  amount: number;
  currency: string;
}
