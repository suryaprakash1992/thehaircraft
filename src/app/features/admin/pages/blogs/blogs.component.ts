import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsComponent {}
