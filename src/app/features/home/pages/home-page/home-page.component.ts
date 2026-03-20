import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
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
  imports: [NgIf, RouterLink, HeroSliderComponent, ProductCardComponent, SectionTitleComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);

  @ViewChild('productVideo') productVideo?: ElementRef<HTMLVideoElement>;

  readonly productService = inject(ProductService);
  readonly blogService = inject(BlogService);
  readonly testimonials = MOCK_TESTIMONIALS;
  flippedCategoryId: string | null = null;
  selectedVideos: string[] = [];
  selectedVideo: string | null = null;
  selectedIndex = 0;
  isVideoOpen = false;
  readonly categories = [
    {
      id: 'c1',
      title: 'Raw Indian Hair',
      description: 'Double-drawn bundles with natural luster, soft movement, and a luxury finish for custom installs.',
      price: 'From $189',
      type: '100% Remy',
      image: 'assets/images/raw_indian_hair.jpg',
      videos: [
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FRaw%20Indian%20single%20donor%20hair.MOV?alt=media&token=0bc77368-d7be-4889-a4ca-70ae081f5642',
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FRaw%20Indian%20single%20donor%20hair2.MOV?alt=media&token=86a7af18-5763-4813-b8eb-8d9bb88ee3ae'
      ]
    },
    {
      id: 'c2',
      title: 'Front Closures',
      description: 'Undetectable closures designed to match premium bundles with breathable construction and natural parting.',
      price: 'From $119',
      type: 'Swiss Lace',
      image: 'assets/images/front-closure.png',
      videos: [
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FFrontalClosure.mp4?alt=media&token=f5148a91-350e-48c4-ab3c-7e73a4d28d52',
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FFrontalClosure1.mp4?alt=media&token=0a7f6f63-6c1c-4206-93e7-9337389eec13'
      ]
    },
    {
      id: 'c3',
      title: 'Long Wavy hair',
      description: 'A beautiful long wave wig with soft, bouncy curls that create a stylish and glamorous appearance. Lightweight, durable, and easy to maintain, making it perfect for both casual and party wear.',
      price: 'From $119',
      type: 'Swiss Lace',
      image: 'assets/images/log_wave.jpg',
      videos: [
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FLong%20wavy%20hair%20bundles.MP4?alt=media&token=773bd204-a4ea-4020-8398-3496c7779878',
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FLong%20wavy%20hair%20bundles1.MP4?alt=media&token=523eca56-1b28-4bf7-900e-95577e713584'
      ]
    },
    {
      id: 'c4',
      title: 'Indian Natural Curly Hair',
      description: 'A beautiful long wave wig with soft, bouncy curls that create a stylish and glamorous appearance. Lightweight, durable, and easy to maintain, making it perfect for both casual and party wear.',
      price: 'From $119',
      type: 'Swiss Lace',
      image: 'assets/images/indian-curly-hair-.jpg',
      videos: [
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FIndian%20Natural%20curly%20hair%20bundles.MOV?alt=media&token=3b3ccbeb-3a42-41f3-98b3-c6c311aa2605',
        'https://firebasestorage.googleapis.com/v0/b/the-haircraft.firebasestorage.app/o/hair-craft-videos%2FIndian%20Natural%20curly%20hair%20bundles2.mp4?alt=media&token=5035a0e2-0dd7-4a9e-b0ae-be44bd091974'
      ]
    }
  ];

  constructor() {
    this.seo.update({
      title: 'HAIRCRAFT | Luxury Hair Extensions & Wigs',
      description:
        'Discover premium hair extensions, virgin wigs, lace closures, and client-first luxury service with HAIRCRAFT.'
    });
  }

  openVideos(videos: string[]): void {
    if (!videos.length) {
      return;
    }

    this.selectedVideos = videos;
    this.selectedIndex = 0;
    this.selectedVideo = videos[0];
    this.isVideoOpen = true;
    this.playSelectedVideo();
  }

  selectVideo(index: number): void {
    const nextVideo = this.selectedVideos[index];
    if (!nextVideo) {
      return;
    }

    this.selectedIndex = index;
    this.selectedVideo = nextVideo;
    this.playSelectedVideo();
  }

  closeVideo(): void {
    const video = this.productVideo?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.load();
    }

    this.selectedVideos = [];
    this.selectedVideo = null;
    this.selectedIndex = 0;
    this.isVideoOpen = false;
  }

  toggleCategoryFlip(categoryId: string): void {
    if (!this.isMobilePointer()) {
      return;
    }

    this.flippedCategoryId = this.flippedCategoryId === categoryId ? null : categoryId;
  }

  private playSelectedVideo(): void {
    queueMicrotask(() => {
      const video = this.productVideo?.nativeElement;
      if (!video) {
        return;
      }

      video.pause();
      video.currentTime = 0;
      video.load();
      void video.play().catch(() => undefined);
    });
  }

  private isMobilePointer(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }
}
