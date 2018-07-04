import { Component, OnInit, HostListener } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {

	colorTheme:string;
  businessDetails:any;
  pr_business_description:string;
  pr_business_logo_path:string;
  pr_business_title:string;


  constructor(private getDataService:GetDataService) { 

    this.getDataService.getBusinessInfo().subscribe((res:any[])=>{
      this.businessDetails =  res;
      if(res['0'].pr_business_title){
        this.pr_business_title = res['0'].pr_business_title;
      }
      if(res['0'].pr_business_description){
        this.pr_business_description = res['0'].pr_business_description;
      }
      if(res['0'].pr_business_logo_path){
        this.pr_business_logo_path = res['0'].pr_business_logo_path;
      }
      console.log(res['0'])
    });

    // this.getDataService.getBusinessInfo().subscribe().map();
  }

  ngOnInit() {
  }

  @HostListener('click',['$event.target']) 
  	onCTSelect(e) {
  		if(e.classList.contains('pr-ct-select')){
  			// console.log(e.getAttribute('id'))

  			this.colorTheme = e.getAttribute('id');
  			console.log(this.colorTheme);
  		}
  	}
  	
}
