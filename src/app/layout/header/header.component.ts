import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isCollapsed= true;
	isAdmin:boolean = this.authService.isLoggedIn;
	id:string;

  constructor(private http:HttpClient, private authService:AuthService) { 
  	this.isAdmin = this.authService.isLoggedIn; 
    this.getUserId();
  }

  ngOnInit() {
  	
  }

  getAdminToken() {
    return !!localStorage.getItem("token");
  }

  getUserId() {
    if(this.getAdminToken()){
      var token = localStorage.getItem("token");
      if(token){
          return this.http.get('http://localhost:8080/api/check-user-id/',{ headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) })
          .subscribe(
          (data:any) =>{
            this.id = data.response;
          });

          }
       }
    }
    ulClick(){
      this.isCollapsed=true;
    }

  }


