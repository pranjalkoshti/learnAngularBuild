import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
@Input() data:any[];

stat:boolean;
business_title = 'title';
business_subtitle = 'subtitle';
business_about = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ';
business_logo_url;
page_views;
upvotes;
publicUrl;
published_date;
uid = null;

  constructor( private getDataService:GetDataService, private http: HttpClient ) { }

  ngOnInit() {
  	// this.stat = this.data[0];
  	// this.business_title = this.data[1];
  	// this.business_subtitle = this.data[2];
  	// this.business_about = this.data[3];
    // this.page_views = this.data[4];

    this.getBusinessStats();
    this.getBusinessInfo()
  }

  getBusinessStats(){
      this.getDataService.getBusinessStats().subscribe((data:any)=>{
        console.log(data);
        if(data.response == 'business not present'){
          this.stat = false;
        }else{
          this.stat = true;
          this.page_views = data.data.page_views;
          this.upvotes = data.data.votes;
        }
      });
  }

  getBusinessInfo(){
      this.getDataService.getBusinessInfo(this.uid).subscribe((data:any)=>{
        if(data.response != 'business not present'){
            this.business_title = data.data.pr_business_title;
            this.business_subtitle = data.data.pr_business_subtitle;
            this.business_about = data.data.pr_business_about;
            this.business_logo_url = data.data.pr_business_logo_path;

            this.publicUrl = '/pages/'+data.data.uid+'/'+data.data.pr_business_title+'/';
            this.published_date = data.data.pr_business_date_published;
         }
       },
      (error)=>{
          console.log(error)
      });
  }
}
