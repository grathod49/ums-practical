import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';
import { CommonService } from '../../../services/common.service';
import { LoginComponent } from './login.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', []);
const loginServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
const commonServiceSpy = jasmine.createSpyObj('CommonService', []);

const testUserData = { id: 1, name: 'TekLoon'};
const loginErrorMsg = 'Invalid Login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  
  beforeEach(async () => {
    // component = new LoginComponent(routerSpy, new FormBuilder(), loginServiceSpy);
    component = new LoginComponent(new FormBuilder(), activatedRouteSpy, routerSpy, loginServiceSpy, commonServiceSpy)
  })
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
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
});
