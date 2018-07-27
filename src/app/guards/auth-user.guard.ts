import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUsersService } from '../services/auth/auth-users.service'

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

	  constructor(private router:Router, private authUsersService:AuthUsersService) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

if (this.authUsersService.isAutherised) { return true; }

    this.router.navigate(['/login']);
    	return false;
  	}
  }

