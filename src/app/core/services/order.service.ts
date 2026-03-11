import { computed, inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { CheckoutAddress, Order } from '../../shared/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly firestore = inject(Firestore);
  private readonly ordersCollection = collection(this.firestore, 'orders');
  private readonly checkoutAddressState = signal<CheckoutAddress | null>(null);
  private readonly latestOrderState = signal<Order | null>(null);

  readonly checkoutAddress = this.checkoutAddressState.asReadonly();
  readonly latestOrder = this.latestOrderState.asReadonly();
  readonly hasCheckoutAddress = computed(() => !!this.checkoutAddress());

  saveCheckoutAddress(address: CheckoutAddress): void {
    this.checkoutAddressState.set(address);
  }

  async placeOrder(order: Order): Promise<string> {
    const reference = await addDoc(this.ordersCollection, order);
    this.latestOrderState.set({ ...order, id: reference.id });
    return reference.id;
  }
}
