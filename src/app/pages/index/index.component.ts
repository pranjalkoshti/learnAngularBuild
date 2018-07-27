import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
 animations: [
  trigger('flyInOut1', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(500)
    ]),
    transition('* => void', [
      animate(150, style({transform: 'translateX(100%)'}))
    ])
  ]),
  // trigger('flyInOut2', [
  //   state('in', style({transform: 'translateX(0)'})),
  //   transition('void => *', [
  //     style({transform: 'translateX(-100%)'}),
  //     animate(600)
  //   ]),
  //   transition('* => void', [
  //     animate(200, style({transform: 'translateX(100%)'}))
  //   ])
  // ])
]
})
export class IndexComponent implements OnInit {

	visible = 1;

  constructor() { }

  ngOnInit() {
     setInterval(() => { this.toggle(); }, 3000);
  }

  toggle(){
  	// this.visible = (this.visible === 1 ? 2 :1)

    if(this.visible == 1){
      this.visible = 2
    }else if(this.visible == 2){
      this.visible = 3
    }else if(this.visible == 3){
      this.visible = 4
    }else if(this.visible == 4){
      this.visible = 1
    }
  }

}
