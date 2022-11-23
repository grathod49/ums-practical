import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from 'src/app/resolvers/user.resolver';
import { UsersComponent } from './user-grid/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,    
    resolve: { users: UserResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ UserResolver ]
})
export class UsersRoutingModule { }
