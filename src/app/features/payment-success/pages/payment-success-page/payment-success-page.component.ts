import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment-success-page.component.html',
  styleUrl: './payment-success-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSuccessPageComponent {
  readonly orderId = inject(ActivatedRoute).snapshot.queryParamMap.get('orderId');
}
