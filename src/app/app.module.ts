import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from './shared/layout/header/header.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HttpErrorInterceptor } from './helpers/error.interceptor';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    // HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    MatTabsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // HttpClient      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
