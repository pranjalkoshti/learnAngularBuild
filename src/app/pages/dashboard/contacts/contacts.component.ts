import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  statPresent;
  business_id

  constructor(private getDataService:GetDataService) { }

  ngOnInit() {
  	this.getBusinessInfo();
  }

   getBusinessInfo(){
      this.getDataService.getBusinessInfo(null).subscribe((data:any)=>{
        // console.log(data);
        if(data.response == 'business not present'){
        	this.statPresent = false;
        }
        if(data.data){
           this.business_id = data.data.business_id;
           this.statPresent = true;
           this.getContactsInfo(this.business_id);
        }
      },
      (error)=>{
        console.log(error)
      });
  }

  getContactsInfo(business_id){
  	this.getDataService.getBusinessVisitorsInfo(business_id).subscribe((data:any)=>{
  		console.log(data)
  	});
  }

}
