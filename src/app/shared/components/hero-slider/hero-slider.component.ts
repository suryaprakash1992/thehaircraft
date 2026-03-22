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
      href: 'https://www.instagram.com/haircraft.india?igsh=MXEzY3E5MnRpbjg0eA%3D%3D&utm_source=qr',
      iconPath:
        'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.95 2.25a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z'
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1GgompN5qW/?mibextid=wwXIfr',
      iconPath:
        'M13.5 22v-8h2.7l.4-3.2h-3.1V8.76c0-.93.25-1.56 1.58-1.56H16.7V4.33c-.29-.04-1.27-.13-2.42-.13-2.39 0-4.03 1.46-4.03 4.15v2.45H7.5V14h2.75v8h3.25Z'
    },
    {
      id: 'pinterest',
      label: 'Pinterest',
      href: 'https://pin.it/4sIwKase5',
      iconPath:
        'M12 2a10 10 0 0 0-3.64 19.31c-.05-1.64-.01-3.61.42-5.45.31-1.31 2.1-8.9 2.1-8.9s-.53-1.06-.53-2.63c0-2.46 1.42-4.3 3.18-4.3 1.5 0 2.23 1.12 2.23 2.47 0 1.51-.96 3.77-1.46 5.86-.42 1.75.88 3.18 2.61 3.18 3.14 0 5.24-4.03 5.24-8.8 0-3.63-2.44-6.35-6.88-6.35-5.01 0-8.14 3.74-8.14 7.91 0 1.44.43 2.46 1.1 3.24.31.37.35.52.24.94-.08.31-.26 1.05-.34 1.34-.11.42-.46.57-.85.41-2.37-.97-3.48-3.57-3.48-6.51C3.8 6.98 7.21 2 12 2Z'
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://www.youtube.com/@haircraftindia2023',
      iconPath:
        'M21.8 8.02a3 3 0 0 0-2.11-2.13C17.83 5.4 12 5.4 12 5.4s-5.83 0-7.69.49A3 3 0 0 0 2.2 8.02 31.3 31.3 0 0 0 1.7 12c0 1.34.17 2.67.5 3.98a3 3 0 0 0 2.11 2.13c1.86.49 7.69.49 7.69.49s5.83 0 7.69-.49a3 3 0 0 0 2.11-2.13c.33-1.31.5-2.64.5-3.98 0-1.34-.17-2.67-.5-3.98ZM10 15.5v-7l6 3.5-6 3.5Z'
    },
    {
      id: 'twitter',
      label: 'Twitter',
      href: 'https://x.com/haircraft_india?s=21',
      iconPath:
        'M18.9 2H22l-6.77 7.74L23.2 22h-6.26l-4.9-6.41L6.43 22H3.3l7.24-8.28L.8 2h6.36l4.43 5.85L18.9 2Zm-1.1 18h1.73L6.26 3.9H4.4L17.8 20Z'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/918939929944',
      iconPath:
        'M12 2a10 10 0 0 0-8.66 15L2 22l5.2-1.31A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.09.78.83-3.01-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.96-.14.17-.29.19-.54.07-.25-.13-1.04-.38-1.98-1.2-.73-.66-1.23-1.46-1.37-1.71-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.17.04-.31-.02-.44-.07-.12-.56-1.34-.77-1.84-.2-.48-.4-.41-.56-.42h-.48c-.17 0-.44.06-.66.31-.23.25-.87.84-.87 2.04 0 1.2.89 2.36 1.01 2.52.12.17 1.74 2.66 4.21 3.73.59.25 1.05.4 1.4.5.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.46-.29Z'
    }
  ];

  readonly activeIndex = signal(0);
  readonly activeSlide = computed(() => this.slides[this.activeIndex()]);

  select(index: number): void {
    this.activeIndex.set(index);
  }
}
