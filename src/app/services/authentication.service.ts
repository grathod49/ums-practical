import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { API } from '../shared/constant/constant';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') as any));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): any {  
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {    
    return this.http.get<User>(`${API_URL}${API.LOGIN}`)            
        .pipe(    
          // delay(5000),                
          map((res: any) => {
            //login successful if there's a jwt token in the response            
            const user = res.find((data: User) => {
              return data.userName == username && data.password == password
            })            
            if (user) {              
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);                
            }
            return user;
        }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

isLoggedIn(): boolean {
  const isLogIn = localStorage.getItem('currentUser');
  return isLogIn ? true : false;
}
}
