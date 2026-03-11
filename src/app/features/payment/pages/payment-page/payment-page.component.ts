import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentPageComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly seo = inject(SeoService);
  readonly processing = signal(false);

  constructor() {
    this.seo.update({
      title: 'Payment | THEHAIRCRAFT',
      description: 'Complete payment with the Razorpay checkout flow and save the order to Firestore.'
    });
  }

  async payNow(): Promise<void> {
    const address = this.orderService.checkoutAddress();
    const user = this.authService.user();

    if (!address || !user) {
      return;
    }

    this.processing.set(true);

    const orderId = await this.orderService.placeOrder({
      userId: user.id,
      items: this.cartService.items(),
      summary: this.cartService.summary(),
      address,
      paymentStatus: 'paid',
      paymentMethod: 'razorpay',
      createdAt: new Date().toISOString()
    });

    this.cartService.clear();
    this.processing.set(false);
    this.router.navigate(['/payment-success'], { queryParams: { orderId } });
  }
}
