import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-about',
  templateUrl: './template-about.component.html',
  styleUrls: ['./template-about.component.css']
})
export class TemplateAboutComponent implements OnInit {

@Input() about:string;
@Input() templateId:string;

themeOne:boolean;
  constructor() {}

  ngOnInit() {
 		if(this.templateId = '1'){
 			this.themeOne = true;
 		}

  }

}
