import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {NonAuthGuard} from './shared/guards/non-auth.guard';


const routes: Routes = [
  {
    path: 'records',
    loadChildren: () => import('./components/records/records.module').then(m => m.RecordsModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    canMatch: [NonAuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'records'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
