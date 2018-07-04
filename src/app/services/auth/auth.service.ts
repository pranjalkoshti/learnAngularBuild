import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

import { user } from '../../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  isLoggedIn:boolean = this.getAdminToken();

 constructor(private http:HttpClient, private router: Router) { }


  login(email:string,password:string):void{

  	this.user = {
      email:email,
      password:password
    }

  	//htttp post request to server
  	this.http.post('http://localhost:8080/api/login/', this.user
  		).subscribe(
  		(data:any)=>{console.log(data)
        if(data.admin == 'success'){
          localStorage.setItem('token', data.password);
          this.isLoggedIn = true;
        }
  		});
  }

  logout(): void {alert()
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  getAdminToken() {
    return !!localStorage.getItem("token");
  }

   signup(fname:string,lname:string,email:string,password:string){

        this.user = {
          fname:fname,
          lname:lname,
          email:email,
          password:password
        }

        //htttp post request to server
        this.http.post('http://localhost:8080/api/register/', this.user)
        
        .subscribe(
          (data:any)=>{
            return data;
            console.log(data);
            if(data.response && data.response == 'success'){
              this.isLoggedIn == true;
              this.router.navigate(['/']);
            }
        });

  }

}
