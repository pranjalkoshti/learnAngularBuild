import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  fname:string;
  lname:string;
  email:string;
  password:string;
  data : any;

  errorAlert:string = "Please fill up details";

  loggedIn:boolean = false;

  public form: FormGroup; 

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router: Router) {


    this.form = this.formBuilder.group({
      control: this.formBuilder.group({
        'fname': ['', Validators.required],
        'lname': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.required],
        'password': ['', Validators.compose([Validators.required])]
      })
    });
 }

  ngOnInit() {
  }

 signup() {
    if(this.form.valid){
      this.fname = this.form.value.control['fname'];
      this.lname = this.form.value.control['lname'];
      this.email = this.form.value.control['email'];
      this.password = this.form.value.control['password'];
      console.log(this.email,this.password);
      this.data = this.authService.signup(this.fname, this.lname,this.email,this.password)
      console.log(this.data)
    }
  }

}
