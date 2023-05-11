import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {AuthApiService} from './auth-api.service';
import {LoginCredentialsDto} from '@plan-to-lib';
import {SubscriptionService} from './subscription.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly subscription = inject(SubscriptionService);
  private readonly _token = new BehaviorSubject<string | null>('tut');

  public token$: Observable<string | null> = this._token.asObservable();
  public isAuthorized$: Observable<boolean> = this.token$.pipe(map((token) => !!token))

  constructor() {
    // this.setToken(localStorage.getItem('plan-to-token'))
  }

  public setToken(token: string | null): void {
    token && localStorage.setItem('plan-to-token', token)
    token && this._token.next(token);
  }

  public resetToken(): void {
    localStorage.removeItem('plan-to-token');
    this._token.next(null);
  }

  public loginAndSetAuthToken(payload: LoginCredentialsDto): void {
    this.authApi.login(payload).subscribe(({token}) => {
      this.setToken(token);
      this.router.navigateByUrl('/records');
      this.subscription.requestSubscription();
    });
  }
}
