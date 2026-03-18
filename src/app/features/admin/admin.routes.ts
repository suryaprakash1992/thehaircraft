import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'products',
    // canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: 'create',
        component: ProductCreateComponent,
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
      },
    ],
  },
];
