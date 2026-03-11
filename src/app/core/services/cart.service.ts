import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem, CartSummary } from '../../shared/models/cart.model';
import { Product } from '../../shared/models/product.model';

const CART_STORAGE_KEY = 'thehaircraft-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsState = signal<CartItem[]>(this.readCart());
  readonly items = this.itemsState.asReadonly();

  readonly summary = computed<CartSummary>(() => {
    const subtotal = this.items().reduce(
      (total, item) => total + (item.product.salePrice ?? item.product.price) * item.quantity,
      0
    );
    const shipping = subtotal > 400 ? 0 : subtotal > 0 ? 18 : 0;
    const tax = subtotal * 0.05;

    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
      itemCount: this.items().reduce((count, item) => count + item.quantity, 0)
    };
  });

  constructor() {
    effect(() => localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items())));
  }

  addItem(product: Product, selectedLength: string, quantity = 1): void {
    this.itemsState.update((items) => {
      const existingItem = items.find(
        (item) => item.productId === product.id && item.selectedLength === selectedLength
      );

      if (existingItem) {
        return items.map((item) =>
          item.productId === product.id && item.selectedLength === selectedLength
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...items, { productId: product.id, quantity, selectedLength, product }];
    });
  }

  updateQuantity(productId: string, selectedLength: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId, selectedLength);
      return;
    }

    this.itemsState.update((items) =>
      items.map((item) =>
        item.productId === productId && item.selectedLength === selectedLength
          ? { ...item, quantity }
          : item
      )
    );
  }

  removeItem(productId: string, selectedLength: string): void {
    this.itemsState.update((items) =>
      items.filter(
        (item) => !(item.productId === productId && item.selectedLength === selectedLength)
      )
    );
  }

  clear(): void {
    this.itemsState.set([]);
  }

  private readCart(): CartItem[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? (JSON.parse(cart) as CartItem[]) : [];
  }
}
