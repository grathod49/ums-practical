import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {                
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            request = request.clone({
                setHeaders: { 
                    userName: `${currentUser.userName}`
                }
            });
        }

        return next.handle(request);
    }
}