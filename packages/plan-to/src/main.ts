import {bootstrapApplication} from '@angular/platform-browser';
import {
  provideRouter, withDebugTracing, withHashLocation, withInMemoryScrolling,
} from '@angular/router';
import {AppComponent} from './app/app.component';
import {appRoutes} from './app/app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {importProvidersFrom, InjectionToken, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {environment} from './environments/environment';
import {IEnvironment} from './environments/environment.interface';
import {ServiceWorkerModule} from '@angular/service-worker';
import {tokenInterceptor} from './app/interceptors/token.interceptor';
import {TokenInterceptor} from './old-app/interceptors/token.interceptor';

export const ENV = new InjectionToken<IEnvironment>('environment')

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([])
    ),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })),
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useValue: 'some interceptor'
    },
    {provide: ENV, useValue: environment},
  ],
}).catch((err) => console.error(err));
