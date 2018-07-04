import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

	info:any;
  constructor(private http:HttpClient) { }


   sendBusinessInfo(title:string,description:string,type:string,url:string): void{alert(title)

  	this.info = {
      title:title,
      description:description,
      type:type,
      url:url
    }

  	//htttp post request to server
  	this.http.post('http://localhost:8080/api/send_business_info/', this.info
  		).subscribe(
  		(data:any)=>{console.log(data)
        // if(data.admin == 'success'){
        //   localStorage.setItem('token', data.password);
        //   this.isLoggedIn = true;
        // }
  		});
  }


}
