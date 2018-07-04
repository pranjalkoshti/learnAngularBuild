import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-about',
  templateUrl: './template-about.component.html',
  styleUrls: ['./template-about.component.css']
})
export class TemplateAboutComponent implements OnInit {

@Input() about:string = "Hello!! Please add description about your business and other relevent information in maximum 400 characters. Use this space effectively to add information about services, features and other information about your business as this space plays key role in increasing conversion rate.";

  constructor() { }

  ngOnInit() {
  }

}
