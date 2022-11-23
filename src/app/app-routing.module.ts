import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '' , redirectTo: 'users', pathMatch: 'full'
  },
  {
    path: 'login', 
    loadChildren: () => import('./components/authentication/authentication.module').then(m => m.LoginModule)
  },
  {
    path: 'header', 
    loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]    
  },
  {
    path: 'users', 
    loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]    
  },
  // redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
