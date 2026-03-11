import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { checkoutGuard } from './core/guards/checkout.guard';
import { guestGuard } from './core/guards/guest.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES)
      },
      {
        path: 'products/:slug',
        loadChildren: () =>
          import('./features/product-details/product-details.routes').then(
            (m) => m.PRODUCT_DETAILS_ROUTES
          )
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES)
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes').then((m) => m.CART_ROUTES)
      },
      {
        path: 'checkout',
        canActivate: [authGuard, checkoutGuard],
        loadChildren: () =>
          import('./features/checkout/checkout.routes').then((m) => m.CHECKOUT_ROUTES)
      },
      {
        path: 'payment',
        canActivate: [authGuard, checkoutGuard],
        loadChildren: () => import('./features/payment/payment.routes').then((m) => m.PAYMENT_ROUTES)
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.routes').then((m) => m.BLOG_ROUTES)
      },
      {
        path: 'testimonials',
        loadChildren: () =>
          import('./features/testimonials/testimonials.routes').then((m) => m.TESTIMONIALS_ROUTES)
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivateChild: [guestGuard],
    children: [
      {
        path: 'signin',
        loadChildren: () => import('./features/auth/signin.routes').then((m) => m.SIGNIN_ROUTES)
      },
      {
        path: 'signup',
        loadChildren: () => import('./features/auth/signup.routes').then((m) => m.SIGNUP_ROUTES)
      }
    ]
  },
  {
    path: 'payment-success',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/payment-success/payment-success.routes').then(
            (m) => m.PAYMENT_SUCCESS_ROUTES
          )
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
