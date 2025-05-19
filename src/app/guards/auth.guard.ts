import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {inject} from '@angular/core';


export const authGuard: CanActivateFn = () => {
  const authService=inject(AuthService);
  const router=inject(Router);

  if (!authService.isLoggedIn()){
    router.navigate(['/login']);
    return false
  }
  return true;
};
