import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  loginSubscription$: Subscription | undefined;
  returnUrl: string | undefined;
  successMsg!: string;

  constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private commonService: CommonService) {
            // redirect to home if already logged in
            if (this.authenticationService.currentUserValue) { 
              this.router.navigate(['/']);
            }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })  

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
            if(data){
              this.successMsg = "Login Succesfull";
              this.commonService.showSuccessToastr(this.successMsg);
            }
            else{
              this.successMsg = "Please Enter valid username and password";
              this.commonService.showWarningToastr(this.successMsg)
              return;
            }
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.commonService.showErrorToastr(error);
          })        
      } 
    catch(err) {     
      this.commonService.showErrorToastr("error"); 
    } 
  } 
  
  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }
}
