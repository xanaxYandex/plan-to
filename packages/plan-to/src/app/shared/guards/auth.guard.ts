import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStateService} from '../../services/auth-state.service';
import {map} from 'rxjs';

export const authGuard: CanMatchFn = () => {
  const [router, authService] = [inject(Router), inject(AuthStateService)];

  return authService.isAuthorized$.pipe(map(auth => auth || router.parseUrl('/login')));
};
