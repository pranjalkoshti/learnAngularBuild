import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	pageTitle = 'Pruchha';

  constructor(private title: Title) { }

  ngOnInit() {
  	this.title.setTitle(this.pageTitle);
  }

}
