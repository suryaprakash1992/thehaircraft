import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTitleComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly description = input('');
  readonly align = input<'left' | 'center'>('left');
}
