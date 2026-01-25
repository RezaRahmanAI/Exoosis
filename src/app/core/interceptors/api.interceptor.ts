import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('exoosis_auth_token');
  const apiReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  return next(apiReq);
};
