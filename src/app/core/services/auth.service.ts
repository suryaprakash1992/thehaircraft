import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { catchError, map, of, switchMap, from } from 'rxjs';
import { AppUser } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  private readonly authUser = toSignal(
    authState(this.auth).pipe(
      switchMap((authUser) => {
        if (!authUser) return of(null);
        
        // Fetch user data from Firestore
        return from(this.getUserFromFirestore(authUser.uid)).pipe(
          map((firestoreUser) => firestoreUser || {
            id: authUser.uid,
            displayName: authUser.displayName ?? 'HAIRCRAFT Client',
            email: authUser.email ?? '',
            photoUrl: authUser.photoURL ?? undefined
          } as AppUser),
          catchError(() => of({
            id: authUser.uid,
            displayName: authUser.displayName ?? 'HAIRCRAFT Client',
            email: authUser.email ?? '',
            photoUrl: authUser.photoURL ?? undefined
          } as AppUser))
        );
      }),
      catchError(() => of(null))
    ),
    { initialValue: null }
  );

  readonly user = computed(() => this.authUser());
  readonly isAuthenticated = computed(() => !!this.user());

  private async getUserFromFirestore(uid: string): Promise<AppUser | null> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid);
      const userSnapshot = await getDoc(userDocRef);
      
      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        return {
          id: uid,
          displayName: data['name'] || 'THEHAIRCRAFT Client',
          email: data['email'] || '',
          photoUrl: data['photoUrl'] || undefined,
          provider: data['provider'] || 'email'
        };
      }
    } catch (error) {
      console.error('Error fetching user from Firestore:', error);
    }
    return null;
  }

  async signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(displayName: string, email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credential.user, { displayName });
    await this.saveUserToFirestore(credential.user.uid, {
      displayName,
      email,
      photoUrl: credential.user.photoURL ?? undefined,
      provider: 'email'
    });
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const credential = await signInWithPopup(this.auth, provider);
      await this.handleSocialSignIn(credential.user.uid, {
        displayName: credential.user.displayName ?? 'Google User',
        email: credential.user.email ?? '',
        photoUrl: credential.user.photoURL ?? undefined,
        provider: 'google'
      });
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Signin cancelled');
      }
      throw error;
    }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      const credential = await signInWithPopup(this.auth, provider);
      await this.handleSocialSignIn(credential.user.uid, {
        displayName: credential.user.displayName ?? 'Facebook User',
        email: credential.user.email ?? '',
        photoUrl: credential.user.photoURL ?? undefined,
        provider: 'facebook'
      });
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Signin cancelled');
      }
      throw error;
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const credential = await signInWithPopup(this.auth, provider);
      await this.saveUserToFirestore(credential.user.uid, {
        displayName: credential.user.displayName ?? 'Google User',
        email: credential.user.email ?? '',
        photoUrl: credential.user.photoURL ?? undefined,
        provider: 'google'
      });
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Signup cancelled');
      }
      throw error;
    }
  }

  async signUpWithFacebook(): Promise<void> {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      const credential = await signInWithPopup(this.auth, provider);
      await this.saveUserToFirestore(credential.user.uid, {
        displayName: credential.user.displayName ?? 'Facebook User',
        email: credential.user.email ?? '',
        photoUrl: credential.user.photoURL ?? undefined,
        provider: 'facebook'
      });
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Signup cancelled');
      }
      throw error;
    }
  }

  private async handleSocialSignIn(
    uid: string,
    userData: {
      displayName: string;
      email: string;
      photoUrl?: string;
      provider: 'google' | 'facebook';
    }
  ): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          uid,
          name: userData.displayName,
          email: userData.email,
          photoUrl: userData.photoUrl || null,
          provider: userData.provider,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } else {
        await updateDoc(userRef, {
          lastLogin: serverTimestamp()
        });
      }
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error('User save permission denied');
      }
      throw error;
    }
  }

  private async saveUserToFirestore(
    uid: string,
    userData: {
      displayName: string;
      email: string;
      photoUrl?: string;
      provider: 'email' | 'google' | 'facebook';
    }
  ): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', uid);
      const userSnapshot = await getDoc(userRef);
      
      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          uid,
          name: userData.displayName,
          email: userData.email,
          photoUrl: userData.photoUrl || null,
          provider: userData.provider,
          createdAt: serverTimestamp()
        });
      }
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        throw new Error('User save permission denied');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
