import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  isLoggedIn:boolean;

  redirectUrl: string;

 constructor(private router:Router, private authService:AuthService) { }

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	// let url: string = state.url;

   //  return this.checkLogin(url);

    if (this.authService.isLoggedIn) { return true; }

    this.router.navigate(['/login']);
    return false;
  }

  // checkLogin(url: string): boolean {alert(this.authService.isLoggedIn)
  //   if (this.authService.isLoggedIn) { return true; }

  //   // Store the attempted URL for redirecting
  //   // this.authService.redirectUrl = url;

  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}
