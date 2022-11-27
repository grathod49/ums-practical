import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { UserCrudComponent } from './user-crud.component';
import { UserService } from '../../../services/user.service' 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/app/models/user';

describe('UserCrudComponent', () => {
  let component: UserCrudComponent;
  let fixture: ComponentFixture<UserCrudComponent>;
  let userService: UserService;
  let commonService: CommonService;
  let httpMock: HttpTestingController;

  const userList: User[] = [
    {
        "userName": "grathod",
        "firstName": "grishm",
        "lastName": "rathod",
        "password": "Admin@123",
        "isAdmin": true,
        "id": 3
    },
    {
        "userName": "admin",
        "firstName": "admin",
        "lastName": "admin",
        "password": "Admin@123",
        "isAdmin": false,
        "id": 5
    },
    {
        "userName": "tmakwana",
        "firstName": "tanvesh",
        "lastName": "makwana",
        "password": "Admin@123",
        "isAdmin": false,
        "id": 6
    },
    {
        "userName": "daad",
        "firstName": "ders",
        "lastName": "aesriiiiii",
        "password": "Admin@123",
        "isAdmin": false,
        "id": 7
    },
    {
        "userName": "nrahate",
        "firstName": "Nimesh",
        "lastName": "Rahate",
        "password": "Admin@123",
        "isAdmin": false,
        "id": 8
    }
  ]

  function setFormValue(data: User) {
    component.userForm.get('userName')?.setValue(data.userName);
    component.userForm.get('firstName')?.setValue(data.firstName);
    component.userForm.get('lastName')?.setValue(data.lastName);
    component.userForm.get('password')?.setValue(data.password);
    component.userForm.get('isAdmin')?.setValue(data.isAdmin);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCrudComponent ],
      imports: [ 
        RouterModule.forRoot([]),    
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [UserService, CommonService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrudComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    commonService = TestBed.get(CommonService);
    httpMock = TestBed.get(HttpTestingController);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user data: when user id exist', async () => {
    // const userId = userList[0].id;
    setFormValue(userList[0]);
    const { firstName, lastName, userName, isAdmin, password } = userList[0];
    const expectedRes = {
      firstName,
      lastName,
      userName,
      isAdmin,
      password
    }
    component.userId = userList[0].id.toString();
    await component.setValues();    
    expect(component.userForm.value).toEqual(expectedRes)
  })

  it('should add user if user id not exist', async () => {
    setFormValue({ ...userList[0]});
    component.onSubmit();
    await userService.getUserList().subscribe(data => {      
      expect(userList[0]).toEqual(component.userForm.value)
    })
  })

  it('should update user if userId exist', async() => {
    setFormValue({ ...userList[0]});
    component.userId = userList[0].id.toString();
    component.onSubmit();
    await userService.getUserList().subscribe(data => {
      expect(userList[0]).toEqual(component.userForm.value)
    })
  })
});
