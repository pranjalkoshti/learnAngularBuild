import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

business_id;
chart :any;
statPresent:boolean;

  constructor( private getDataService:GetDataService, private http: HttpClient ) { }

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
           this.getVisitorsInfo(this.business_id);
        }
      },
      (error)=>{
        console.log(error)
      });
  }

  getVisitorsInfo(business_id){
  	this.getDataService.getBusinessVisitorsInfo(business_id).subscribe((data:any)=>{

		// console.log(data)

        let visitor_date = [];
        let total_visitors = [];
        let a = [];
        let b = [];

        let i;
        for(i in data){
        	for(let x = 0; x<data[i].length; x++){

        		let date = new Date(data[i][x]['visitor_date']).toDateString();

        		// if(visitor_date.indexOf(date) === -1){
        		// 	visitor_date.push(date);
        		// 		b.push(a.length);
        		// 		a.length = 0;
        		// }
        		// if(visitor_date.indexOf(date) != -1){
        			a.push(date);
        		// }

        	}
		}

		var counts = {};

		for (var m = 0; m < a.length; m++) {
		  var num = a[m];

		  counts[num] = counts[num] ? counts[num] + 1 : 1;
		}

		console.log(counts);

		let date_array = [];
		let visitor_count = [];

		for(i in counts){
			date_array.push(i);
			visitor_count.push(counts[i])
		}

		// console.log(date_array)
		// console.log(visitor_count)
		let sliced_date = date_array.slice(date_array.length-8,date_array.length)
		let sliced_visitor_count = visitor_count.slice(visitor_count.length-8,visitor_count.length)

		this.chart = new Chart('chart', {
	  		type: 'line',
			    data: {
			        labels: sliced_date,
			            
			            datasets: [
			            {
			            	data:sliced_visitor_count,
			            	borderColor: 'rgba(255,99,132,1)',
			            	borderWidth: 1,
			            	fill:true
			            }
			            ],
			           
			           
			    },
			    options: {
			    	legend:{
			    		display:false
			    	},
			        scales: {
			        	xAxes: [{
			                
			            }],
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        }
			    }
			  	})
	 // console.log(this.chart)

      },
      (error)=>{
        console.log(error)
      });
  }


}
