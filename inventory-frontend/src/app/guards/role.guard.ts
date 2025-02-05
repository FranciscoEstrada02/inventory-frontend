import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];
  const user = authService.getUser();

  if (!user || !user.roles) {
    router.navigate(['/products']);
    return false;
  }

  const hasRequiredRole = requiredRoles.some(role => 
    user.roles.includes(role)
  );

  return hasRequiredRole || router.createUrlTree(['/products']);
};
