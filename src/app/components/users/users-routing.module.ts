import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserResolver } from 'src/app/resolvers/user.resolver';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { UsersComponent } from './user-grid/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,    
    resolve: { users: UserResolver },
    canActivate: [AuthGuard]   
  },
  {
    path: 'add',
    component: UserCrudComponent,
    canActivate: [AuthGuard]   
  },
  {
    path: 'edit/:id',
    component: UserCrudComponent,
    canActivate: [AuthGuard]   
  },
  {
    path: 'view/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ UserResolver ]
})
export class UsersRoutingModule { }
