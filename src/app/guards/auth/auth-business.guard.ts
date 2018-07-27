import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthBusinessService } from '../../services/auth/auth-business.service';



@Injectable({
  providedIn: 'root'
})
export class AuthBusinessGuard implements CanActivate {
 userId:string;
 businessTitle:string;

   constructor(private router:Router, private authBusinessService:AuthBusinessService,private route: ActivatedRoute) { 

    //   this.route.params.subscribe( params => {alert(params['userId'])
    //     if(params['userId']){
    //       this.userId = params['userId']
    //     }
    //     if(params['businessTitle']){
    //       this.businessTitle = params['businessTitle']
    //     }
    // });
  //this.authBusinessService.getBusinessAuthStatus(this.userId,this.businessTitle);  //check if business is published
    }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


  	if (this.authBusinessService.isAutherised) { return true; }

    this.router.navigate(['/login']);
    	return false;
  	}

  }

