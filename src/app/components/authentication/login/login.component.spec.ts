import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { LoginComponent } from './login.component';
const loginServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userEmail: string, userPassword: string) {
    fixture.componentInstance.loginForm.controls['username'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientModule, ReactiveFormsModule, RouterModule.forRoot([]), ToastrModule.forRoot()],
      providers: [AuthenticationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`Reactive form validation - username check`, () => {
  //  let username = component.loginForm.controls['username'];
  //   expect(username.valid).toBeTruthy();
  //   expect(username.errors?.['required']).toBeFalsy();
  // });

  // it(`Reactive form validation - password check`, () => {
  //   let password = component.loginForm.controls['password'];
  //    expect(password.valid).toBeTruthy();
  //    expect(password.errors?.['required']).toBeFalsy();
  //  });
   
  it(`username and password is in required state`, () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {

    })
  });
});
