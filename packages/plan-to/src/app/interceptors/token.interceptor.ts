import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, EMPTY, filter, switchMap} from 'rxjs';
import {inject} from '@angular/core';
import {AuthStateService} from '../services/auth-state.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStateService);

  return auth.token$.pipe(
    filter((token) => !!token || !req.url.includes('login')),
    switchMap((token) => {
      req = req.clone({headers: req.headers.append('Authorization', `Bearer ${token}`)})
      return next(req).pipe(
        catchError((err) => {
          return EMPTY;
        })
      );
    }),
  );
};
