import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$.pipe(
    take(1),
    map(user => {
      if (!user) {
        return router.createUrlTree(['/auth/login']);
      }
      if (user.role !== 'Admin') {
        return router.createUrlTree(['/']);
      }
      return true;
    })
  );
};
