export interface AppUser {
  id: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  phone?: string;
  photoUrl?: string;
  provider?: 'email' | 'google' | 'facebook';
}
