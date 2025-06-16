import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
 const router = inject(Router);

if(authService.getToken()!=undefined){
  if(authService.getUserRole()=="Admin"){
    router.navigateByUrl("/dashboard/admin-layout");
    console.log("url",state.url);
    return true;
  }
  else{
    router.navigateByUrl("/login");
    console.log("url",state.url);
    return false;
  }
}
else{
    router.navigateByUrl("/login");
    console.log("url",state.url);
    return false;
}
};
