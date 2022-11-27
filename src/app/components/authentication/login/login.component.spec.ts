import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, ReactiveFormsModule, RouterModule.forRoot([]), ToastrModule.forRoot()],
      providers: [AuthenticationService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   //fixture.detectChanges();
  // });

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

  xit(`username and password is in required state`, () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // const usernameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#username');
      // usernameElement.value = 'grathod';
      // usernameElement.dispatchEvent(new Event('input'))

      component.loginForm.controls['username'].setValue('grathod');
      component.loginForm.controls['password'].setValue('Admin@123');

      // const passwordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#password');
      // passwordElement.value = 'Admin@123';
      // passwordElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button');
        expect(buttonElement.disabled).toBeFalsy();
        expect(component.loginForm.get('username')?.value).toEqual('grathod');
        expect(component.loginForm.get('password')?.value).toEqual('Admin@123');
        expect(component.loginForm.valid).toBeTruthy();
      });
    })
  });

  xit(`username and password is in required state`, () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const usernameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#username');
      usernameElement.value = 'grathod';
      usernameElement.dispatchEvent(new Event('input'))

      const passwordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#password');
      passwordElement.value = 'Admin@123';
      passwordElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button');
        expect(buttonElement.disabled).toBeTruthy();
        expect(component.loginForm.get('username')?.value).toEqual('grathod');
        expect(component.loginForm.get('password')?.value).toEqual('Admin@123');
        expect(component.loginForm.valid).toBeFalsy();
      });
    })
  });


  fit(`on submit`, () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      component.loginForm.controls['username'].setValue('grathod');
      component.loginForm.controls['password'].setValue('Admin@123');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mockFun = spyOn<LoginComponent, any>(component, 'onSubmit').and.callThrough();
        // const buttonElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button');
        // buttonElement.click();  
        component.onSubmit();                
        expect(mockFun).toHaveBeenCalledTimes(1);
        // fixture.detectChanges();
        // fixture.whenStable().then(() => {
        //   expect(component.successMsg).toEqual("Login Succesfull");
        // })
      })
    })
  });
});
