import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.formBuilder.nonNullable.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async signUp(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const { displayName, email, password } = this.form.getRawValue();
      await this.authService.signUp(displayName, email, password);
      this.router.navigate(['/']);
    } catch (error: any) {
      const errorMsg = error?.message ?? error?.code ?? 'Signup failed';
      this.errorMessage.set(this.formatErrorMessage(errorMsg));
      console.error('Signup error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async signUpWithGoogle(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.signUpWithGoogle();
      this.router.navigate(['/']);
    } catch (error: any) {
      const errorMsg = error?.message ?? error?.code ?? 'Google signup failed';
      this.errorMessage.set(this.formatErrorMessage(errorMsg));
      console.error('Google signup error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async signUpWithFacebook(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.signUpWithFacebook();
      this.router.navigate(['/']);
    } catch (error: any) {
      const errorMsg = error?.message ?? error?.code ?? 'Facebook signup failed';
      this.errorMessage.set(this.formatErrorMessage(errorMsg));
      console.error('Facebook signup error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private formatErrorMessage(error: string): string {
    const errorMap: { [key: string]: string } = {
      'auth/email-already-in-use': 'Email already registered',
      'auth/invalid-email': 'Invalid email address',
      'auth/weak-password': 'Password too weak (min 6 characters)',
      'auth/network-request-failed': 'Network error. Check your connection',
      'auth/popup-closed-by-user': 'Signup cancelled',
      'auth/cancelled-popup-request': 'Popup request cancelled',
      'User save permission denied': 'Unable to save user. Check Firestore rules',
      'Signup cancelled': 'Signup cancelled'
    };

    return errorMap[error] || error || 'An error occurred';
  }
}
