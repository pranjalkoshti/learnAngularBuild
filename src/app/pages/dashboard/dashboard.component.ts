import { Component, OnInit, OnChanges, ViewChild, ContentChild, ElementRef} from '@angular/core';
import { AuthUsersService } from '../../services/auth/auth-users.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { GetDataService } from '../../services/get-data.service';
import { BehaviorSubject } from 'rxjs';
import { NotificationsComponent } from './notifications/notifications.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  userId:string;
  business_title = 'Pruchha';
  business_subtitle = 'Question answer website';
  business_about = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ';
  stat:boolean;
  notifications:boolean;
  page_views:number;
  published:boolean;
  publicUrl:string;

  constructor(
  	private authUserService : AuthUsersService,
  	private router: Router, 
  	private route: ActivatedRoute,
    private http: HttpClient,
    private getDataService:GetDataService ) { 


    this.getBusinessInfo();
  }

  ngOnInit() {

    this.route.params.subscribe( params => { //console.log(params)
      if(params['id']){
        this.userId = params['id']
      }
    });

    this.authUserService.getUserAuthStatus(this.userId);  //check if user is authenticated

     // this.getBusinessStats();

    // this.getUserId(); 

  }

  getAdminToken() {
    return !!localStorage.getItem("token");
  }

  getUserId() {
    // this.getDataService.getUserId().subscribe((data:any)=>{
    //   console.log(data)
    // });

    // if(this.getAdminToken()){
    //   var token = localStorage.getItem("token");
    //   if(token){
    //       return this.http.get('check-user-id/',{ headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) })
    //       .subscribe(
    //       (data:any) =>{
    //         this.id = data.response;
    //       });
    //       }
    //    }
    }

  getBusinessInfo(){
      this.getDataService.getBusinessInfo(null).subscribe((data:any)=>{
        // console.log(data);
        if(data.data){
              if(data.data.pr_business_date_published == 0){
                this.published = false;
              }else if(data.data.pr_business_date_published == 1){
                this.published = true;
              }
        }
      },
      (error)=>{
        console.log(error)
      });
  }


  getBusinessStats(){
      this.getDataService.getBusinessStats().subscribe((data:any)=>{
        // console.log(data);
        if(data.response == 'business not present'){
          this.stat = false;
        }else{
          this.stat = true;
          this.page_views = data.data.page_views;
        }
      });
  }

}
