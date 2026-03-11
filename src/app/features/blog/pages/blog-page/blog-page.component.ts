import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlogService } from '../../../../core/services/blog.service';
import { SeoService } from '../../../../core/services/seo.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [SectionTitleComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPageComponent {
  readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Blog | THEHAIRCRAFT',
      description: 'Editorial blog previews and SEO-friendly content architecture for growth.'
    });
  }
}
