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
  flippedCategoryId: string | null = null;
  readonly categories = [
    {
      id: 'c1',
      title: 'Raw Indian Hair',
      description: 'Double-drawn bundles with natural luster, soft movement, and a luxury finish for custom installs.',
      price: 'From $189',
      type: '100% Remy',
      image: 'assets/images/raw_indian_hair.jpg'
    },
    {
      id: 'c2',
      title: 'Front Closures',
      description: 'Undetectable closures designed to match premium bundles with breathable construction and natural parting.',
      price: 'From $119',
      type: 'Swiss Lace',
      image:
        'assets/images/front-closure.png'
    },
     {
      id: 'c3',
      title: 'Long Wavy hair',
      description: 'A beautiful long wave wig with soft, bouncy curls that create a stylish and glamorous appearance. Lightweight, durable, and easy to maintain, making it perfect for both casual and party wear.',
      price: 'From $119',
      type: 'Swiss Lace',
      image:
        'assets/images/log_wave.jpg'
    },
    {
      id: 'c4',
      title: 'Indian Natural Curly Hair',
      description: 'A beautiful long wave wig with soft, bouncy curls that create a stylish and glamorous appearance. Lightweight, durable, and easy to maintain, making it perfect for both casual and party wear.',
      price: 'From $119',
      type: 'Swiss Lace',
      image:
        'assets/images/indian-curly-hair-.jpg'
    }
  ];

  constructor() {
    this.seo.update({
      title: 'HAIRCRAFT | Luxury Hair Extensions & Wigs',
      description:
        'Discover premium hair extensions, virgin wigs, lace closures, and client-first luxury service with HAIRCRAFT.'
    });
  }

  toggleCategoryFlip(categoryId: string): void {
    if (!this.isMobilePointer()) {
      return;
    }

    this.flippedCategoryId = this.flippedCategoryId === categoryId ? null : categoryId;
  }

  private isMobilePointer(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }
}


