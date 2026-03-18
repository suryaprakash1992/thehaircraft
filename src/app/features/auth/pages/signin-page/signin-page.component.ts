import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
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

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async signIn(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const { email, password } = this.form.getRawValue();
      await this.authService.signIn(email, password);
      this.router.navigate(['/']);
    } catch (error: any) {
      const errorMsg = error?.message ?? error?.code ?? 'Signin failed';
      this.errorMessage.set(this.formatErrorMessage(errorMsg));
      console.error('Signin error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/']);
    } catch (error: any) {
      const errorMsg = error?.message ?? error?.code ?? 'Google signin failed';
      this.errorMessage.set(this.formatErrorMessage(errorMsg));
      console.error('Google signin error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async signInWithFacebook(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.signInWithFacebook();
      this.router.navigate(['/']);
    } catch (error: any) {
      const errorMsg = error?.message ?? error?.code ?? 'Facebook signin failed';
      this.errorMessage.set(this.formatErrorMessage(errorMsg));
      console.error('Facebook signin error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private formatErrorMessage(error: string): string {
    const errorMap: { [key: string]: string } = {
      'auth/user-not-found': 'Email not registered',
      'auth/wrong-password': 'Incorrect password',
      'auth/invalid-email': 'Invalid email address',
      'auth/user-disabled': 'This account is disabled',
      'auth/network-request-failed': 'Network error. Check your connection',
      'auth/popup-closed-by-user': 'Signin cancelled',
      'auth/cancelled-popup-request': 'Popup request cancelled',
      'User save permission denied': 'Unable to save user. Check Firestore rules',
      'Signin cancelled': 'Signin cancelled'
    };

    return errorMap[error] || error || 'An error occurred';
  }
}
