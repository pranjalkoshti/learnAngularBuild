import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  idParam;

  constructor( private router: Router,  private route: ActivatedRoute ) {
  this.route.params.subscribe( params => this.idParam = params['id']); }

  ngOnInit() {
  }


  onClickSelectTemplate(e) {
      var route = this.idParam +'/templates/'+ e.target.getAttribute('id');
      var id = e.target.getAttribute('id');
      //console.log(route)
  		this.router.navigate([route]);
  }

}
