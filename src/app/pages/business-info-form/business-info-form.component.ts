import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SendDataService } from '../../services/send-data.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-business-info-form',
  templateUrl: './business-info-form.component.html',
  styleUrls: ['./business-info-form.component.css']
})


export class BusinessInfoFormComponent implements OnInit {

  title:string;
  description:string;
  type:string;
  url:string;

  public form: FormGroup; 
  constructor(private formBuilder: FormBuilder, private SendDataService:SendDataService) { 
      this.form = new FormGroup({
         control: this.formBuilder.group({
          'businessTitle': new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.max(100)
          ]),
          'businessType': new FormControl('', Validators.required,),
          'businessDescription': new FormControl('', Validators.required,),
          'url': new FormControl('')
        })
      });
  }


  ngOnInit() {
  	
  }

   updateBusinessInfo() {alert()

    if(this.form.valid){
      this.title = this.form.value.control['businessTitle'];
      this.description = this.form.value.control['businessDescription'];
      this.type = this.form.value.control['businessType'];
      this.url = this.form.value.control['url'];
      console.log(this.title,this.description,this.type,this.url);

      this.SendDataService.sendBusinessInfo(this.title,this.description,this.type,this.url);
    }
  }

}
