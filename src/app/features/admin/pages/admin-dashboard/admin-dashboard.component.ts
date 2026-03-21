import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type AdminCard = {
  readonly title: string;
  readonly description: string;
  readonly route: string;
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  readonly adminCards: readonly AdminCard[] = [
    {
      title: 'Manage Products',
      description: 'Create and maintain the product catalog for the storefront.',
      route: '/admin/products'
    },
    {
      title: 'Manage Blogs',
      description: 'Organize editorial content and publishing workflows.',
      route: '/admin/blogs'
    },
    {
      title: 'Manage Testimony',
      description: 'Review and curate customer stories and social proof.',
      route: '/admin/testimony'
    },
    {
      title: 'Manage Payments',
      description: 'Monitor payment settings and future transaction tools.',
      route: '/admin/payments'
    }
  ];
}
