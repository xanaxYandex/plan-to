import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, EMPTY, filter, map, Observable, switchMap} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthStateService} from '../services/auth-state.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthStateService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.token$.pipe(
      filter((token) => !!token || req.url.includes('login')),
      switchMap((token) => {
        req = req.clone({headers: req.headers.append('Authorization', `Bearer ${token}`)})
        return next.handle(req).pipe(
          catchError((err) => EMPTY)
        );
      }),
    );
  }
}
