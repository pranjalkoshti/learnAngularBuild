import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-gallery',
  templateUrl: './template-gallery.component.html',
  styleUrls: ['./template-gallery.component.css']
})
export class TemplateGalleryComponent implements OnInit {
@Input() templateId:string;

  constructor() { }

  ngOnInit() {
  }

}
