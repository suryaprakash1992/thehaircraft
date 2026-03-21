import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {}
