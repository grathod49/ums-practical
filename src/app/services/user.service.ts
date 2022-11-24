import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserListResponse } from '../models/user';
import { API } from '../shared/constant/constant';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // get user list
  getUserList(): Observable<User[]> {
    return this.http
      .get<User[]>(`${API_URL}${API.LOGIN}`)    
      .pipe(  
        // delay(5000),      
        map((res: User[]) => {        
          return res;
        })        
      );
  }

  // add user
  addUser(data: User): Observable<User> {
    return this.http
      .post<User>(`${API_URL}${API.LOGIN}`, {
        ...data
      })
      .pipe(
        map((res: User) => {          
          return res;
        })
      );
  }

  // update user
  updateUser(userId: string, data: User): Observable<User> {
    return this.http
    .put<User>(`${API_URL}${API.LOGIN}/${userId}`,{
      ...data 
    })
    .pipe(
      map((res: User) => {        
        return res;
      })
    );
  }

  // delete user
  deleteUser(userId: number): Observable<User> {    
    return this.http
    .delete<User>(`${API_URL}${API.LOGIN}/${userId}`)
    .pipe(
      map((res: User) => {
        return res;
      })
    );
  }
}
