import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-features',
  templateUrl: './template-features.component.html',
  styleUrls: ['./template-features.component.css']
})
export class TemplateFeaturesComponent implements OnInit {
@Input() templateId:string;
@Input() features_titles;
@Input() features_details;


themeOne:boolean=true;
// themeTwo:boolean=false;

  constructor() { }

  ngOnInit() {
  	if(this.templateId == '1'){
     this.themeOne = true;
     }
     if(this.templateId == '2'){
     // this.themeTwo = true;
     }
  }

}
