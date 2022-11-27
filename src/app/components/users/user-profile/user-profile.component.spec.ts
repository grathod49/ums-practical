import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

import { UserService } from './../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { User } from 'src/app/models/user';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;
  let httpMock: HttpTestingController;

  const userList: User[] = [
    {
      id: 3,
      firstName: "grishm",
      lastName: "rathod",
      isAdmin: true,
      userName: "grathod",
      password: "Admin@123"
    },
    {
      id: 2,
      firstName: "tanvesh",
      lastName: "makwana",
      isAdmin: false,
      userName: "tmakwana",
      password: "Test@123"
    }
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
      HttpClientModule,
      ReactiveFormsModule,
      RouterModule.forRoot([]),
      ToastrModule.forRoot(),
      HttpClientTestingModule
    ],
      declarations: [ UserProfileComponent ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not get the user data before ngOnInit', () => {
    const userData: User[] = userList;
    userService.getUserList().subscribe(userList => {
      expect(userList).toBe(userData);
    });
  });  

  it('should get the user data after ngOnInit', async () => {
    fixture.detectChanges();
    const userData: User[] = userList;
    userService.getUserList().subscribe(userList => {
      expect(userList).toEqual(userData);
    });
  });
});
