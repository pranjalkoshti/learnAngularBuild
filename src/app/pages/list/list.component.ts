import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	users:any;

  constructor(private getDataService:GetDataService) { 

  	this.getDataService.getUsers().subscribe((res:any[])=>{
  		this.users =  res;console.log(res)
  	});
  	

  }

  ngOnInit() {
  	
  }

  getUsers() {
  	
  }
}
