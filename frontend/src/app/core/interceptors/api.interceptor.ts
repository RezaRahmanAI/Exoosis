import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('exoosis_auth_token');
  const isFormData = req.body instanceof FormData;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  if (!isFormData && !req.headers.has('Content-Type')) {
    headers['Content-Type'] = 'application/json';
  }

  return next(req.clone({ setHeaders: headers }));
};
