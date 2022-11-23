import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  loginSubscription$: Subscription | undefined;

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {
            // redirect to home if already logged in
            if (this.authenticationService.currentUserValue) { 
              this.router.navigate(['/']);
            }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['grathod', [Validators.required]],
      password: ['Admin@123', [Validators.required]]
    })  
  }

  // convenience getter for easy access to form fields
  get formControl() { return this.loginForm.controls; } 

  onSubmit() {    
    try {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }      

      this.loginSubscription$ = this.authenticationService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)            
        .subscribe(
          data => {                    
            this.router.navigate(['/']);
          },
          error => {

          })        
      } 
    catch(err) {} 
  } 
  
  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }
}
