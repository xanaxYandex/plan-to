import {bootstrapApplication} from '@angular/platform-browser';
import {
  provideRouter,
} from '@angular/router';
import {AppComponent} from './app/app.component';
import {appRoutes} from './app/app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {importProvidersFrom, InjectionToken, isDevMode} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {environment} from './environments/environment';
import {IEnvironment} from './environments/environment.interface';
import {ServiceWorkerModule} from '@angular/service-worker';
import {tokenInterceptor} from './app/interceptors/token.interceptor';

export const ENV = new InjectionToken<IEnvironment>('environment')

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    ),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })),
    {provide: ENV, useValue: environment},
  ],
}).catch((err) => console.error(err));
