import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  readonly authService = inject(AuthService);

  readonly mobileMenuOpen = signal(false);
  readonly searchTerm = signal('');
  readonly categories = this.productService.categories;
  readonly cartCount = computed(() => this.cartService.summary().itemCount);

  runSearch(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/products'], { queryParams: { search: this.searchTerm() || null } });
    this.mobileMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }
}
