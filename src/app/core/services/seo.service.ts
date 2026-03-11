import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(config: { title: string; description: string }): void {
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
  }
}
