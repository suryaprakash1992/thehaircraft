import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({ providedIn: 'root' })
class AdminGuardService {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(): boolean {
    const user = this.authService.user();
    
    // TODO: Implement admin role check in AuthService
    // For now, check if user is authenticated
    if (!user) {
      this.router.navigate(['/auth/signin']);
      return false;
    }

    // TODO: Check user role from Firestore (admin field)
    // const isAdmin = await this.checkAdminRole(user.id);
    // if (!isAdmin) {
    //   this.router.navigate(['/']);
    //   return false;
    // }

    return true;
  }
}

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AdminGuardService).canActivate();
};
