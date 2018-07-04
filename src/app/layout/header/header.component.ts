import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	isAdmin:boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  	this.isAdmin = this.authService.isLoggedIn;
  }

}
