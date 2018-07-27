import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-social-redirect',
  templateUrl: './social-redirect.component.html',
  styleUrls: ['./social-redirect.component.css']
})
export class SocialRedirectComponent implements OnInit {
token;
  constructor(
  	private router: Router, 
  	private route: ActivatedRoute,
    private getDataService:GetDataService) { }

  ngOnInit() {
  	 this.route.params.subscribe( params => { //console.log(params)
      if(params['token']){
        this.token = params['token'];
        this.setAdminToken(this.token);
        if(this.getAdminToken()){
          this.getDataService.getuidFromToken().subscribe(res=>{
              //console.log(res);
              var uid = res['uid'];
                this.router.navigate(['/'+uid+'/dashboard']);
          });
        
        }
      }
    });
  }


  setAdminToken(token) {
    localStorage.setItem('token', token);
  }



   getAdminToken() {
    return !!localStorage.getItem("token");
  }
}
