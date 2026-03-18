import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
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
  readonly dropdownOpen = signal(false);
  readonly searchTerm = signal('');
  readonly categories = this.productService.categories;
  readonly cartCount = computed(() => this.cartService.summary().itemCount);
  readonly currentUser = computed(() => this.authService.user());

  runSearch(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/products'], { queryParams: { search: this.searchTerm() || null } });
    this.mobileMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownOpen.update((open) => !open);
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.closeDropdown();
      this.router.navigate(['/auth/signin']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getInitials(name: string | undefined): string {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }
}
