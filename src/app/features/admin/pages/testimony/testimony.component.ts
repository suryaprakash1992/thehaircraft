import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-testimony',
  standalone: true,
  templateUrl: './testimony.component.html',
  styleUrl: './testimony.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonyComponent {}
