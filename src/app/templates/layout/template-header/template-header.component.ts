import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.css']
})
export class TemplateHeaderComponent implements OnInit {

@Input() theme:string;
@Input() title:string = "ADD TITLE";
@Input() logoPath:string;

  constructor() { }

  ngOnInit() {
  }

  setBgColor() {

  	if(!this.theme){
  		return 'black-cr-bg';
  	}

  	if(this.theme == 'red'){
  		return 'red-cr-bg'
  	}else if(this.theme == 'green'){
  		return 'green-cr-bg'
  	}else if(this.theme == 'blue'){
  		return 'blue-cr-bg';
  	}else if(this.theme == 'black'){
  		return 'black-cr-bg';
  	}
  }

  setHeaderColor() {
  	if(!this.theme){
  		return 'black-cr-heading-color';
  	}

  	if(this.theme == 'red'){
  		return 'red-cr-heading-color'
  	}else if(this.theme == 'green'){
  		return 'green-cr-heading-color'
  	}else if(this.theme == 'blue'){
  		return 'blue-cr-heading-color';
  	}else if(this.theme == 'black'){
  		return 'black-cr-heading-color';
  	}

  }

}
