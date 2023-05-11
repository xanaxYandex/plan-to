import {Route} from '@angular/router';
import {authGuard} from './shared/guards/auth.guard';
import {nonAuthGuard} from './shared/guards/non-auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'records',
    loadChildren: () => import('./components/records/records.routes'),
    canMatch: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((c) => c.LoginComponent),
    canMatch: [nonAuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'records'
  }
];
