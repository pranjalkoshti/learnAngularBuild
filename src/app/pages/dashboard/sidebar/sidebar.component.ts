import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	user_id;
	business_title;
  isCollapsed = false;

  constructor(private getDataService:GetDataService,
  private route: ActivatedRoute ) { }

  ngOnInit() {      
    if (window.screen.width < 600) { // 768px portrait
      this.isCollapsed = true;
    }

    this.route.params.subscribe( params => { //console.log(params)
      if(params['id']){
        this.user_id = params['id']
      }
    });
  	this.getBusinessInfo();
  }

  getBusinessInfo(){
      this.getDataService.getBusinessInfo(null).subscribe((data:any)=>{
        //console.log(data);
        if(data.data){
           this.user_id = data.data.uid;
          this.business_title= data.data.pr_business_title;
        }
       
        
         // if(data.data.pr_business_date_published == 0){
         //        this.published = false;
         //      }else if(data.data.pr_business_date_published == 1){
         //        this.published = true;
         //      }
      },
      (error)=>{
        console.log(error)
      });
  }



}
