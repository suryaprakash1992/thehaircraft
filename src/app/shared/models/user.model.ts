export interface AppUser {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  provider?: 'email' | 'google' | 'facebook';
}
