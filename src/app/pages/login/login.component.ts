import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

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

  public form: FormGroup; 

  constructor(private authService:AuthService, private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      control: this.formBuilder.group({
        'Email': ['', Validators.required],
        'Password': ['', Validators.compose([Validators.required])]
      })
    });

  }

  ngOnInit() {
    this.form.valueChanges.subscribe((data)=>{
      if(data.control.Email == ""){
        this.errorAlert = "Email is required";
      }
      if(data.control.Email !== "" && data.control.Password == ""){
        this.errorAlert = "Password is required";
      }
    });
  }

  login() {
    if(this.form.valid){console.log()
      this.email = this.form.value.control['Email'];
      this.password = this.form.value.control['Password'];
      // console.log(this.email,this.password);
      this.authService.login(this.email,this.password);
    }
  }

}
