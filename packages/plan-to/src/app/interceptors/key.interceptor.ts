import {HttpInterceptorFn} from '@angular/common/http';


export const keyInterceptor: HttpInterceptorFn = (req, next) => {

  req = req.clone({headers: req.headers.append('Key', `some-key`)})
  return next(req);
};
