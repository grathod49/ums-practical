import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription, filter } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  getUserListSubscription$: Subscription | undefined;
  userId!: string;
  userData!: User;
  currentUser!: User | null;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authenticationService: AuthenticationService) { 
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.currentUser = this.authenticationService.currentUserValue;
  }
  
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    try {
      this.getUserListSubscription$ = this.userService.getUserList()
        .pipe(
          first()
        )
        .subscribe(
          data => {
            this.userData = data.filter(x => x.id == +this.userId)[0];            
          },
          error => {
            this.commonService.showErrorToastr(error);
          })
    }
    catch (err) {
      this.commonService.showErrorToastr("error");
     }
  }  

  ngOnDestroy(){
    if (this.getUserListSubscription$) {
      this.getUserListSubscription$.unsubscribe();
    }
  }
}
