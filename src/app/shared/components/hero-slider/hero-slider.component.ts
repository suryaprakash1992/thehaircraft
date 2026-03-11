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

  readonly activeIndex = signal(0);
  readonly activeSlide = computed(() => this.slides[this.activeIndex()]);

  select(index: number): void {
    this.activeIndex.set(index);
  }
}
