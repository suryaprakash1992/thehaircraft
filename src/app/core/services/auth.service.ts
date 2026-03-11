import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { catchError, map, of } from 'rxjs';
import { AppUser } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly authUser = toSignal(
    authState(this.auth).pipe(
      map(
        (user): AppUser | null =>
          user
            ? {
                id: user.uid,
                displayName: user.displayName ?? 'THEHAIRCRAFT Client',
                email: user.email ?? ''
              }
            : null
      ),
      catchError(() => of(null))
    ),
    { initialValue: null }
  );

  readonly user = computed(() => this.authUser());
  readonly isAuthenticated = computed(() => !!this.user());

  async signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(displayName: string, email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credential.user, { displayName });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
