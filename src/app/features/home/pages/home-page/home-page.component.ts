import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { ProductService } from '../../../../core/services/product.service';
import { SeoService } from '../../../../core/services/seo.service';
import { HeroSliderComponent } from '../../../../shared/components/hero-slider/hero-slider.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { MOCK_TESTIMONIALS } from '../../../../shared/data/mock-data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, HeroSliderComponent, ProductCardComponent, SectionTitleComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);
  readonly productService = inject(ProductService);
  readonly blogService = inject(BlogService);
  readonly testimonials = MOCK_TESTIMONIALS;
  readonly categories = [
    {
      id: 'c1',
      title: 'Raw Indian Hair',
      image:
        'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'c2',
      title: 'Virgin Wigs',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'c3',
      title: 'Lace Closures',
      image:
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80'
    }
  ];

  constructor() {
    this.seo.update({
      title: 'THEHAIRCRAFT | Luxury Hair Extensions & Wigs',
      description:
        'Discover premium hair extensions, virgin wigs, lace closures, and client-first luxury service with THEHAIRCRAFT.'
    });
  }
}
