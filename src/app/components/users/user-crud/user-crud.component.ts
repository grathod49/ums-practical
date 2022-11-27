import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogData } from 'src/app/models/dialoge';
import { UsersComponent } from '../user-grid/users.component';
import { first, Subscription, filter } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  userId!: string;
  currentPath!: string;
  getUserListSubscription$: Subscription | undefined;
  userListSubscription$: Subscription | undefined;
  submitted: boolean = false;
  currentUser!: User | null;
  userList!: User[];

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonService: CommonService) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.currentPath = this.route.snapshot.url[0]?.path;    
    this.currentUser = this.authenticationService.currentUserValue;
  }

  get isReadOnly(): boolean {
    return this.currentPath == 'add';
  }

  ngOnInit(): void {
    this.onInitForm();
    if (this.userId) this.setValues();
  }

  onInitForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isAdmin: [false, []]
    })
  }

  setValues() {
    try {
      this.getUserListSubscription$ = this.userService.getUserList()
        .pipe(
          first()
        )
        .subscribe(
          data => {
            // this.userList = data;
            let userData = data.filter(x => x.id == +this.userId)[0]
            this.setFormValues(userData);
          },
          error => {
            this.commonService.showErrorToastr(error);
          })
    }
    catch (err) {
      this.commonService.showErrorToastr("error");
     }
  }

  setFormValues(data: User) {
    this.userForm.get('userName')?.setValue(data.userName);
    this.userForm.get('firstName')?.setValue(data.firstName);
    this.userForm.get('lastName')?.setValue(data.lastName);
    this.userForm.get('password')?.setValue(data.password);
    this.userForm.get('isAdmin')?.setValue(data.isAdmin);
  }

  // isUserNameExist(data: User[]): boolean{
  //   let isExist = data.filter(x => x.userName === this.userForm.get('userName')?.value)
  //   return isExist.length > 0 ? true : false
  // }

  onSubmit(): void {
    try {      
      if (this.userForm.invalid) return;
      //for checking user is exist
      // if(this.isUserNameExist(this.userList)){
      //   this.commonService.showWarningToastr("User is already exist.");
      // }

      this.submitted = true;
      const data = {
        ...this.userForm.value,
      };

      let apiRequest = null;
      if (this.userId) {
        apiRequest = this.userService.updateUser(this.userId, data);
      } else {
        apiRequest = this.userService.addUser(data);
      }
      this.userListSubscription$ = apiRequest
        .pipe(first())
        .subscribe(
          res => {
            this.commonService.showSuccessToastr(`User ${this.userId ? ' Updated.' : ' Added.'}`);
            this.router.navigate(['/']);
          },
          error => {
            this.submitted = false;
            this.commonService.showErrorToastr(error);
          }
        );
      this.submitted = false;
    } catch (err) {
      this.submitted = false;
      this.commonService.showErrorToastr("error");
    }
  }  

  ngOnDestroy(): void{
    if (this.getUserListSubscription$) {
      this.getUserListSubscription$.unsubscribe();
    }
    if (this.userListSubscription$) {
      this.userListSubscription$.unsubscribe();
    }
  }
}
