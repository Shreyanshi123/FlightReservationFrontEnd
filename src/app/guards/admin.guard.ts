

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    console.log("User not authenticated. Redirecting to login...");
    router.navigate(["/dashboard/login"]);
    return false;
  }

  const role = authService.getUserRole();
  console.log("User Role:", role);

  if (role === "Admin") {
    console.log("Admin access granted.");
    return true;
  }

  console.log("Access denied. Redirecting to login...");
  router.navigate(["/dashboard/login"]);
  return false;
};