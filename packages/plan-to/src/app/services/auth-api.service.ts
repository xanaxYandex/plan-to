import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {LoginCredentialsDto, LoginResponse} from '@plan-to-lib';
import {ENV} from '../../main';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENV);
  private readonly urlWithPrefix = `${this.env.api}/users`;

  public login(payload: LoginCredentialsDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlWithPrefix}/login`, payload);
  }
}
