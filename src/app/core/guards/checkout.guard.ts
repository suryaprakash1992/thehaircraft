import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const checkoutGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);
  return cartService.summary().itemCount > 0 ? true : router.createUrlTree(['/cart']);
};
