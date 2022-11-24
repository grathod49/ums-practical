import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { DialogData } from 'src/app/models/dialoge';
import { ColumnConfig, GridConfig } from 'src/app/models/gridconfig';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { CommonGridComponent } from 'src/app/shared/common-grid/common-grid.component';
import { UserCrudComponent } from '../user-crud/user-crud.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  search: string = ''
  userList: User[] = [];
  gridConfig!: GridConfig;
  columnConfig: ColumnConfig[] = [
    { key: 'select', value: '' },
    { key: 'firstName', value: 'First Name' },
    { key: 'lastName', value: 'Last Name' },
    { key: 'userName', value: 'User Name' }
  ]
  userListSubscription$: Subscription | undefined;
  deleteUserSubscription$: Subscription | undefined;
  currentUser!: User | null;
  @ViewChild(CommonGridComponent) public gridComp!: CommonGridComponent;

  constructor(private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService) {
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userList = this.route.snapshot.data['users'];
    this.setGridConfig(this.userList);
  }

  setGridConfig(userData: User[]) {
    const isToolBarAccess = this.currentUser?.isAdmin;
    this.gridConfig = {
      columnConfig: this.columnConfig,
      operation: {
        add: isToolBarAccess,
        view: isToolBarAccess,
        edit: isToolBarAccess,
        delete: isToolBarAccess
      },
      data: userData
    }
  }

  gridOperation(operation: string) {
    switch (operation) {
      case 'Refresh':
        this.refreshUserData();
        break;
      case 'Add':
        this.onAdd();
        break;
      case 'Edit':
        if (this.gridComp.selection.selected.length > 1 ||
          this.gridComp.selection.selected.length < 1) {
            this.commonService.showWarningToastr("Please select only one row for edit.");
          return;
        }
        this.onEdit(this.gridComp.selection.selected[0].id);
        break;
      case 'View':
        if (this.gridComp.selection.selected.length > 1 ||
          this.gridComp.selection.selected.length < 1) {
            this.commonService.showWarningToastr("Please select only one row for view.");
          return;
        }
        this.onView(this.gridComp.selection.selected[0].id);
        break;
      case 'Delete':
        if (this.gridComp.selection.selected.length > 1 ||
          this.gridComp.selection.selected.length < 1) {
          this.commonService.showWarningToastr("Please select only one row for delete.");
          return;
        }
        //for checking delete user is system loggedin user
        if ((this.gridComp.selection.selected.length > 0 &&
          this.currentUser?.id == this.gridComp.selection.selected[0].id)) {
          this.commonService.showWarningToastr("logged in user.");
          return;
        }
        this.onDelete(this.gridComp.selection.selected[0].id);
        break;
    }
  }

  //crud operations
  onAdd(): void {
    this.router.navigate(['/users/add']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/users/edit', id])
  }

  onView(id: number): void {
    this.router.navigate(['/users/view', id])
  }

  onDelete(userId: number | undefined) {
    try {
      if (!userId) return;

      this.deleteUserSubscription$ = this.userService.deleteUser(userId)
        .pipe((first()))
        .subscribe(
          res => {
            this.commonService.showSuccessToastr("User deleted succesfully.");
            this.refreshUserData();
          },
          error => {
            this.commonService.showErrorToastr(error);
          }
        )
    } catch (err) {
    }
  }

  refreshUserData() {
    try {
      this.userListSubscription$ = this.userService.getUserList()
        .pipe(first())
        .subscribe(
          data => {
            this.setGridConfig(data)
          },
          error => {
            this.commonService.showErrorToastr(error);
          })
    }
    catch (err) { }
  }

  ngOnDestroy(): void {
    if (this.userListSubscription$) {
      this.userListSubscription$.unsubscribe();
    }
    if (this.deleteUserSubscription$) {
      this.deleteUserSubscription$.unsubscribe();
    }
  }

}
