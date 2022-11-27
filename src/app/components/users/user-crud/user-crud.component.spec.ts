import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { UserCrudComponent } from './user-crud.component';
import { UserService } from '../../../services/user.service' 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('UserCrudComponent', () => {
  let component: UserCrudComponent;
  let fixture: ComponentFixture<UserCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCrudComponent ],
      imports: [ 
        RouterModule.forRoot([]),    
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
