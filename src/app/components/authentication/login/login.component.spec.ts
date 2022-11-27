import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
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

  function setLoginForm(userName: string, password: string) {
    component.loginForm.get('userName')?.setValue(userName);
    component.loginForm.get('password')?.setValue(password);
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),    
        HttpClientModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.get(AuthenticationService);
    commonService = TestBed.get(CommonService);
    httpMock = TestBed.get(HttpTestingController);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`username and password is in required state`, () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    
      component.loginForm.controls['username'].setValue('grathod');
      component.loginForm.controls['password'].setValue('Admin@123');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        //const buttonElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button');        
        expect(component.loginForm.get('username')?.value).toEqual('grathod');
        expect(component.loginForm.get('password')?.value).toEqual('Admin@123');
        expect(component.loginForm.valid).toBeTruthy();
      });
    })
  });

  it('should login successfully', async() => {
    const expectedRes = 'Login Succesfull';
    setLoginForm(userList[0].userName, userList[0].password);
    await component.onSubmit();
    await authenticationService.login(userList[0].userName, userList[0].password).subscribe(data => {
      expect(component.successMsg).toBe(expectedRes);
    })
  })  

  it('should login return error: Please Enter valid username and password', async() => {
    const expectedRes = 'Please Enter valid username and password';
    setLoginForm(userList[0].userName, 'test@abc');
    await component.onSubmit();
    await authenticationService.login(userList[0].userName, userList[0].password).subscribe(data => {
      expect(component.successMsg).toBe(expectedRes);
    })
  })
});