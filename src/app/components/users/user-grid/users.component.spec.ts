import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;
  let commonService: CommonService;
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
      declarations: [ UsersComponent ],
      imports: [
      RouterModule.forRoot([]),
      HttpClientModule,
      ToastrModule.forRoot(),
      HttpClientTestingModule
    ],
      providers: [AuthenticationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
    commonService = TestBed.get(CommonService);
    httpMock = TestBed.get(HttpTestingController);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete user data', async() => {
    component.onDelete(userList[0].id);
    await userService.getUserList().subscribe(res => {
      expect(res).toEqual(userList.splice(0, 1))
    })
  })
  
});
