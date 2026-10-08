import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(
            (m) => m.LoginComponent
          )
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (m) => m.ProductComponent
          )
      }
];
