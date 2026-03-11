import { Product } from './product.model';

export interface CartItem {
  productId: string;
  quantity: number;
  selectedLength: string;
  product: Product;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}
