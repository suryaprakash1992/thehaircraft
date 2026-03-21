import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductsComponent } from './pages/products/products.component';
import { TestimonyComponent } from './pages/testimony/testimony.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: '',
            component: ProductListComponent
          },
          {
            path: 'create',
            component: ProductCreateComponent
          },
          {
            path: 'edit/:id',
            component: ProductEditComponent
          }
        ]
      },
      {
        path: 'blogs',
        component: BlogsComponent
      },
      {
        path: 'testimony',
        component: TestimonyComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
