import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { SeoService } from '../../../../core/services/seo.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, ProductCardComponent, SectionTitleComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly productService = inject(ProductService);

  readonly search = signal(this.route.snapshot.queryParamMap.get('search') ?? '');
  readonly category = signal(this.route.snapshot.queryParamMap.get('category') ?? 'All');
  readonly sort = signal<'featured' | 'price-asc' | 'price-desc'>('featured');
  readonly maxPrice = signal(500);
  readonly page = signal(1);
  readonly pageSize = 6;

  readonly filteredProducts = computed(() => {
    const term = this.search().toLowerCase();
    const products = this.productService.products()
      .filter((product) => this.category() === 'All' || product.category === this.category())
      .filter((product) => (product.salePrice ?? product.price) <= this.maxPrice())
      .filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.tags.some((tag) => tag.toLowerCase().includes(term))
      );

    switch (this.sort()) {
      case 'price-asc':
        return [...products].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case 'price-desc':
        return [...products].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      default:
        return products;
    }
  });

  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize))
  );
  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_value, index) => index + 1)
  );

  constructor() {
    this.seo.update({
      title: 'Products | THEHAIRCRAFT',
      description: 'Browse luxury bundles, wigs, closures, and curated premium hair essentials.'
    });
  }

  setPage(page: number): void {
    this.page.set(page);
  }
}
