import { CartItem, CartSummary } from './cart.model';

export interface CheckoutAddress {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  summary: CartSummary;
  address: CheckoutAddress;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'razorpay';
  createdAt: string;
}
