import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Router } from "@angular/router";

import { user } from '../../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  isLoggedIn:boolean = this.getAdminToken();

 constructor(private http:HttpClient, private router: Router) { }


  login(email:string,password:string){

  	this.user = {
      email:email,
      password:password
    }


  	return this.http.post('http://localhost:8080/api/login/', this.user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
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

      return this.http.post('http://localhost:8080/api/register/', this.user);
  }

  signupWithGoogle() {
    return this.http.get('http://localhost:8080/auth/google/',{ headers:  new HttpHeaders().set('Access-Control-Allow-Origin', '*')});
  }

}
