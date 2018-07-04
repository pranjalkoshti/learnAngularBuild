import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  users = [];
  constructor(private http:HttpClient) { }

  getUsers() { 
  	//htttp post request to server
  	this.http.get('http://localhost:8080/api/user/').subscribe(
  		(res:any)=>{
        	this.users = res;
  		});

  	return this.http.get('http://localhost:8080/api/user/');
  }

  getBusinessInfo() { 
    //htttp post request to server
    // this.http.get('http://localhost:8080/api/fetch_business_info/').subscribe(
    //   (res:any)=>{
    //       this.users = res;
    //   });

    return this.http.get('http://localhost:8080/api/fetch_business_info/');
  }
}
