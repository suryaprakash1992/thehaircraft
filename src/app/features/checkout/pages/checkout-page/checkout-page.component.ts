import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  private readonly seo = inject(SeoService);

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['India', Validators.required],
    pincode: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor() {
    this.seo.update({
      title: 'Checkout | THEHAIRCRAFT',
      description: 'Complete your checkout details to continue to secure payment.'
    });
  }

  continueToPayment(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.orderService.saveCheckoutAddress(this.form.getRawValue());
    this.router.navigate(['/payment']);
  }
}
