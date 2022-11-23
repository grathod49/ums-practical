import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  search: string = ''
  userList: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'userName'];  

  UserSubscription$: Subscription | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.getUserData();
  }

  getUserData(){    
    this.userList = this.route.snapshot.data['users'];    
  }  

  ngOnDestroy(): void {
    // if (this.UserSubscription$) {
    //   this.UserSubscription$.unsubscribe();
    // }    
  }

}
