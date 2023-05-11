import {InjectionToken, isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IEnvironment} from '../environments/environment.interface';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {AppComponent} from "./app.component";

export const ENV = new InjectionToken<IEnvironment>('environment')

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: ENV, useValue: environment},
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useValue: 'some interceptor'
    }
  ]
})
export class AppModule { }
