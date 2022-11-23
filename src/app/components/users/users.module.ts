import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { MatTableModule } from '@angular/material/table';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { UsersComponent } from './user-grid/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule    
  ]
})
export class UsersModule { }
