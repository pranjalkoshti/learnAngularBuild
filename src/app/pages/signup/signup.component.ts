import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router";
import * as $ from 'jquery';

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
  msg;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errorAlert:string = "Please fill up details";

  loggedIn:boolean = false;

  public form: FormGroup; 

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router: Router) {


    // this.form = this.formBuilder.group({
    //   control: this.formBuilder.group({
    //     'fname': ['', Validators.required],
    //     'lname': ['', Validators.compose([Validators.required])],
    //     'email': ['', Validators.required],
    //     'password': ['', Validators.compose([Validators.required])]
    //   })
    // });

    this.form = this.formBuilder.group({
        'fname': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'lname': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
 }

  ngOnInit() {
  }

 signup() {
    if(this.form.valid){
      this.fname = this.form.value['fname'];
      this.lname = this.form.value['lname'];
      this.email = this.form.value['email'];
      this.password = this.form.value['password'];
      this.data = this.authService.signup(this.fname, this.lname,this.email,this.password).subscribe(
          (data:any)=>{
           //console.log(data);
            //  localStorage.setItem('token', data.token);
            // this.router.navigate(['/']);

             if(data.error){
                this.msg = data.error.error
              }else{
                localStorage.setItem('token', data.token);
                this.router.navigate(['/'+data.id+'/dashboard']);
              }
           
        });
      // console.log(this.data)
    }
  }

  signupWithGoogle() {
    window.location.href="auth/google/";
    // this.authService.signupWithGoogle();
    // this.router.navigate(['/auth/google/']);
  }

}
