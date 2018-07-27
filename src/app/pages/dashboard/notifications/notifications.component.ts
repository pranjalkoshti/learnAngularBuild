import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

notifications:boolean;

  constructor(
  	private getDataService:GetDataService ) { }

  ngOnInit() {
  	this.getNotifications();
  }

 getNotifications(){
     this.getDataService.getNotifications().subscribe((data:any)=>{
        //console.log(data)
        if(data.response){
          if(data.response = 'user not present'){
            this.notifications = false;
          }  
        }
      });
  }


}
