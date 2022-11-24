import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, filter, map, observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserListResponse } from '../models/user';
import { API } from '../shared/constant/constant';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // user User and Null both here because it has both of the value.
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  //public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) { 
    let getStorageValue = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(getStorageValue);
    //this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): User | null {  
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {    
    return this.http.get<User[]>(`${API_URL}${API.LOGIN}`)            
        .pipe(                             
          map((res: User[]) => {            
            //check whether user is exist or not.            
            const user: User = res.filter((data: User) => {
              return data.userName == username && data.password == password
            })[0];   

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
