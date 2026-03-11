import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { ProductService } from '../../../../core/services/product.service';
import { SeoService } from '../../../../core/services/seo.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CurrencyPipe, ProductCardComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly seo = inject(SeoService);

  readonly slug = this.route.snapshot.paramMap.get('slug') ?? '';
  readonly product = this.productService.getBySlug(this.slug);
  readonly activeImage = signal(this.product?.images[0] ?? '');
  readonly selectedLength = signal(this.product?.lengthOptions[0] ?? '18"');
  readonly relatedProducts = computed(() =>
    this.product ? this.productService.getRelatedProducts(this.product.category, this.product.id) : []
  );

  constructor() {
    if (this.product) {
      this.seo.update({
        title: `${this.product.name} | THEHAIRCRAFT`,
        description: this.product.shortDescription
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product, this.selectedLength());
    }
  }
}
