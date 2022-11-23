import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UMS';
  currentUser!: User;

  constructor(private authenticationService: AuthenticationService,
    private router: Router){
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);     
  }  
}
