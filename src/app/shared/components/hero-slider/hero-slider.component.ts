import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  copy: string;
  image: string;
}

interface SocialLink {
  id: string;
  label: string;
  href: string;
  iconPath: string;
}

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSliderComponent {
  readonly slides: HeroSlide[] = [
    {
      id: 's1',
      eyebrow: 'Spring Collection 2026',
      title: 'Luxury',
      emphasis: 'Redefined.',
      copy:
        'Experience premium hair extensions, handmade wigs, and refined finishes built for a modern luxury client.',
      image:
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80'
    },
    {
      id: 's2',
      eyebrow: 'Temple Sourced',
      title: 'Crafted for',
      emphasis: 'Confidence.',
      copy:
        'Ethically sourced raw Indian hair with dense cuticles, elevated packaging, and salon-grade longevity.',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80'
    }
  ];

  readonly socialLinks: SocialLink[] = [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://instagram.com/',
      iconPath:
        'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.95 2.25a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z'
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://facebook.com/',
      iconPath:
        'M13.5 22v-8h2.7l.4-3.2h-3.1V8.76c0-.93.25-1.56 1.58-1.56H16.7V4.33c-.29-.04-1.27-.13-2.42-.13-2.39 0-4.03 1.46-4.03 4.15v2.45H7.5V14h2.75v8h3.25Z'
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      href: 'https://tiktok.com/',
      iconPath:
        'M14.7 3c.18 1.55 1.05 3.1 2.33 4.05 1 .75 2.15 1.14 3.47 1.2v2.93a8.5 8.5 0 0 1-3.96-1.1v5.45a6.53 6.53 0 1 1-6.5-6.53c.34 0 .67.03.99.08v3.03a3.72 3.72 0 0 0-1-.14 3.55 3.55 0 1 0 3.55 3.56V3h3.15Z'
    }
  ];

  readonly activeIndex = signal(0);
  readonly activeSlide = computed(() => this.slides[this.activeIndex()]);

  select(index: number): void {
    this.activeIndex.set(index);
  }
}
