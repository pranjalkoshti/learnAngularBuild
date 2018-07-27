import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  errorAlert:string = "Please fill up details";
  loggedIn:boolean = false;
  msg;

  // llocation;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public form: FormGroup; 

  constructor(private authService:AuthService, 
  private formBuilder: FormBuilder, 
  location : Location,
  private router: Router) { //this.llocation = location;

    // this.form = this.formBuilder.group({
    //   control: this.formBuilder.group({
    //     'Email': ['', Validators.required],
    //     'Password': ['', Validators.compose([Validators.required])]
    //   })
    // });

    //  this.form = this.formBuilder.group({
    //     'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
    //     'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    // });

     this.form = this.formBuilder.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });

  }

  ngOnInit() {
    // this.form.valueChanges.subscribe((data)=>{
    //   if(data.control.Email == ""){
    //     this.errorAlert = "Email is required";
    //   }
    //   if(data.control.Email !== "" && data.control.Password == ""){
    //     this.errorAlert = "Password is required";
    //   }
    // });
  }

  login() {
    if(this.form.valid){
      this.email = this.form.value['email'];
      this.password = this.form.value['password'];
      // console.log(this.email,this.password);
      this.authService.login(this.email,this.password).subscribe(
      (data:any)=>{ //console.log(data.error)
        if(data.error){
          this.msg = data.error
        }else{
          localStorage.setItem('token', data.token);
          this.router.navigate(['/'+data.id+'/dashboard']);
        }
        
      });;
    }
  }

  signupWithGoogle() {
    window.location.href="http://localhost:8080/auth/google/";
    // this.authService.signupWithGoogle();
    // this.router.navigate(['/auth/google/']);
  }

}
