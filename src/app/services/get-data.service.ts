import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  users:any = [];
  data;

  constructor(private http:HttpClient) { }

  getUsers() {

    var token = localStorage.getItem("token");
  	this.http.get('/api/user/',{ headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) }).subscribe(
  		(res:any[])=>{
        	this.users = res;
         // console.log(res)
  		});

  	return this.users;
  }

  getuidFromToken() {

    var token = localStorage.getItem("token");
    return this.http.post('/api/get_uid_from_token/',{ headers:  new HttpHeaders().set('Authorization', 'JWT '+token) });
  }

  getBusinessInfo(uid):Observable<any> { 

   var token = localStorage.getItem("token");
   if(token){
     this.data = {
       uid:null
     }
     return this.http.post('/api/fetch_business_info/',this.data, { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) });
   }else{
     this.data = {
       uid:uid
     }
     return this.http.post('/api/fetch_business_info/', this.data);
   }
    
  }

  getAdditionalBusinessInfo(business_id):Observable<any> { 

   var token = localStorage.getItem("token");
   var info = {
     business_id:business_id
   };
   // if(token){
     return this.http.post<any>('/api/fetch_additional_business_info/', info, { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) });
   // }else{
   //   this.data = {
   //     uid:uid
   //   }
   //   return this.http.post('fetch_business_info/', this.data);
   // }
    
  }

  getBusinessStats():Observable<any> { 
    var token = localStorage.getItem("token");
    return this.http.get<any>('/api/fetch_business_stats/', { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) });
  }

  getNotifications():Observable<any> {
    var token = localStorage.getItem("token");
    return this.http.get('/api/fetch_notifications/',{ headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) });
  }

  getBusinessVisitorsInfo(business_id){
    var token = localStorage.getItem("token");
    let info = {
      business_id: business_id
    }
    return this.http.post('/api/fetch_visitor_info/', info, { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) });
  }

   getBusinessContacts(business_id){
    var token = localStorage.getItem("token");
    let info = {
      business_id: business_id
    }
    return this.http.post('/api/fetch_clients_contacts/', info, { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) });
  }
  

}
