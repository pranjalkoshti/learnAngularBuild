import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService {
userId:string;
info;
isAutherised:boolean = true;


  constructor(
  	private http:HttpClient, 
  	private router: Router, 
  	private route: ActivatedRoute ) { 


    // this.route.paramMap.subscribe( params => { console.log(params);

    //   if(params['id']){
    //     this.userId = params['id']
    //   }

    // });

    // this.getUserAuthStatus(this.userId);  //check if business is published

}

getUserAuthStatus(userId){

  	this.info = {
      userId:userId,
    }

    var token = localStorage.getItem("token");


  	this.http.post('http://localhost:8080/api/check-user-auth-status/', this.info, { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) }
  		).subscribe(
  		(data:any)=>{ //console.log(data.response);alert()
  		
  		if(data.response == 'user not authenticated'){
  			this.router.navigate(['/login']);
  		}
	  	
  		}
  		);
}

}
