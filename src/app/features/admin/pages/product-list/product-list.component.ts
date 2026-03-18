import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { getCurrencyLabel } from '../../data/currencies.data';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly getCurrencyLabel = getCurrencyLabel;

  readonly products = signal<Product[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly deleteConfirm = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const data = await this.productService.getProducts();
      this.products.set(data);
    } catch (error: any) {
      const errorMsg = error?.message ?? 'Failed to load products';
      this.errorMessage.set(errorMsg);
      console.error('Product loading error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  confirmDelete(productId: string): void {
    this.deleteConfirm.set(productId);
  }

  cancelDelete(): void {
    this.deleteConfirm.set(null);
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productService.deleteProduct(productId);
      this.products.update(products => products.filter(p => p.id !== productId));
      this.deleteConfirm.set(null);
    } catch (error: any) {
      const errorMsg = error?.message ?? 'Failed to delete product';
      this.errorMessage.set(errorMsg);
      console.error('Delete error:', error);
    }
  }

  editProduct(productId: string): void {
    this.router.navigate(['/admin/products', productId, 'edit']);
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
