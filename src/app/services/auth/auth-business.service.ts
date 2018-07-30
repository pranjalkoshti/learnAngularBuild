import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthBusinessService {

	isAutherised:boolean;

	info:any;

	userId:string;
  businessTitle:string;


  constructor( 
  	private http:HttpClient, 
  	private router: Router, 
  	private route: ActivatedRoute) { }


  getBusinessAuthStatus(userId, businessTitle):Observable<any>{

  	this.info = {
      userId:userId,
      businessTitle:businessTitle
    }

  	return this.http.post('/api/check-business-published-status/', this.info
  		);

  }

}
