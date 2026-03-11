import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async signIn(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    await this.authService.signIn(this.form.getRawValue().email, this.form.getRawValue().password);
    this.router.navigate(['/']);
  }
}
