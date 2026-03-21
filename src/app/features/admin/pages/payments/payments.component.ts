import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent {}
