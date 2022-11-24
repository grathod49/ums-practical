import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Injectable()
export class UserResolver implements Resolve<Observable<User[]>> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User[]> {
    return this.userService.getUserList();
  }
}