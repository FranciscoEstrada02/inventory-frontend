import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
