import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './user-grid/users.component';
import { CommonGridComponent } from 'src/app/shared/common-grid/common-grid.component';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [UsersComponent, CommonGridComponent, UserCrudComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatPaginatorModule    
  ],
  entryComponents: []
})
export class UsersModule { }
