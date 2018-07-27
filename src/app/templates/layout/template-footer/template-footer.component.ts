import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SendDataService } from '../../../services/send-data.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-template-footer',
  templateUrl: './template-footer.component.html',
  styleUrls: ['./template-footer.component.css']
})
export class TemplateFooterComponent implements OnInit {

@Input() templateId:string;
@Input() city:string;
@Input() address:string;
@Input() social_links="";
@Input() external_url:string;

contact_name;
contact_email;
contact_details;
userId;
msg ="";

 public form: FormGroup; 

  constructor(private formBuilder: FormBuilder, private SendDataService: SendDataService, private route: ActivatedRoute) { 

  this.form = new FormGroup({
          'contact_name': new FormControl('', [
                Validators.required,
                Validators.maxLength(45)
          ]),
          'contact_email': new FormControl('', [
                Validators.required, 
                Validators.maxLength(80)]),
          'contact_details': new FormControl('', [
                Validators.required, 
                Validators.maxLength(445)])
      });

}

  ngOnInit() {

  	this.route.params.subscribe( params => { console.log(params);
  		if(params['userId']){
        this.userId = params['userId']
      }
  	});
  }


  onSubmit(){
  	if(this.userId){
  	if(this.form.valid){
  	  this.contact_name = this.form.value['contact_name'];
      this.contact_email = this.form.value['contact_name'];
      this.contact_details = this.form.value['contact_details'];
  	}

  	this.SendDataService.clientContactSubmit(this.userId,this.contact_name,this.contact_email,this.contact_details).subscribe(
      (data:any)=>{
        console.log(data.success);
        if(data.success == 'successfully added'){
        	this.msg = 'Your message is successfully submitted'
        }  
      }); 
  	}
  }
}
