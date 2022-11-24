import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authService.currentUserValue;  
      //const currentUrl = route.url.length && route.url[0].path;
      let currentUrl = state.url.split('/');        
        if (currentUser) {
            if(((!currentUser.isAdmin && currentUser.id != +currentUrl[currentUrl.length - 1]) && currentUrl[currentUrl.length - 2] == "edit") ||
                (!currentUser.isAdmin && currentUrl[currentUrl.length - 1] == "users")){
              this.router.navigate([`/users/view/${currentUser.id}`]);
              return false;
            }            
            // authorised so return true            
            return true;
        }

        //redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;    
  }
  
}
