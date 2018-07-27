import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

	@Input() name: string;
	@Input() type: string;
	@Input() control: AbstractControl;
	@Input() value;

  constructor() { }

  ngOnInit() {
  }

}
