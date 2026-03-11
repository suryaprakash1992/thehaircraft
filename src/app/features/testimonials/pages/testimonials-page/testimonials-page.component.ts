import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { MOCK_TESTIMONIALS } from '../../../../shared/data/mock-data';

@Component({
  selector: 'app-testimonials-page',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './testimonials-page.component.html',
  styleUrl: './testimonials-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsPageComponent {
  private readonly seo = inject(SeoService);
  readonly testimonials = MOCK_TESTIMONIALS;

  constructor() {
    this.seo.update({
      title: 'Testimonials | THEHAIRCRAFT',
      description: 'Social proof and customer story architecture for premium ecommerce growth.'
    });
  }
}
