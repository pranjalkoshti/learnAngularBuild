import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { SendDataService } from '../../services/send-data.service';
import { Router } from "@angular/router";
import { GetDataService } from '../../services/get-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-business-info-form',
  templateUrl: './business-info-form.component.html',
  styleUrls: ['./business-info-form.component.css']
})


export class BusinessInfoFormComponent implements OnInit {

  title:string;
  subtitle:string;
  about:string;
  logo;
  url:string;
  city:string;
  address:string;
  social_links;

  pr_business_id:number;
  uid:number;
  pr_business_title:string="";
  pr_business_subtitle:string="";
  pr_business_about:string="";
  pr_business_logo_path:string="";
  pr_business_city:string="";
  pr_business_address:string="";
  pr_business_external_url:string="";
  pr_business_social_links:string;
  pr_business_facebook_link:string;
  pr_business_google_link:string;
  pr_business_template_theme_no:number;
  pr_business_template_no:number;

  uploaded_logo;

  public form: FormGroup; 
  
  constructor(private http:HttpClient, 
    private formBuilder: FormBuilder, 
    private SendDataService:SendDataService, 
    private getDataService:GetDataService,
    private router: Router) { 
      // this.form = new FormGroup({
      //    control: this.formBuilder.group({
      //     'businessTitle': new FormControl('', [
      //           Validators.required,
      //           Validators.minLength(5),
      //           Validators.max(45)
      //     ]),
      //     'businessSubtitle': new FormControl('', [Validators.required, Validators.minLength(30),Validators.maxLength(80)]),
      //     'businessAbout': new FormControl('', [Validators.required, Validators.minLength(100),Validators.maxLength(445)]),
      //     'external_url': new FormControl('',[Validators.minLength(4),Validators.maxLength(445)]),
      //     'city': new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(45)]),
      //     'address': new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(445)])
      //   }),
      //     'facebook_link': new FormControl('', [Validators.minLength(4),Validators.maxLength(200)]),
      //     'google_link': new FormControl('', [Validators.minLength(4),Validators.maxLength(200)])
      // });

      this.form = new FormGroup({
          'businessTitle': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(45)
          ]),
          'businessSubtitle': new FormControl('', [
                Validators.required, 
                Validators.minLength(30),
                Validators.maxLength(80)]),
          'businessAbout': new FormControl('', [
                Validators.required, 
                Validators.minLength(100),
                Validators.maxLength(445)]),
          'businessLogo':new FormControl(''),
          // 'external_url': new FormControl('',[
          //       // Validators.minLength(4),
          //       // Validators.maxLength(445)
          //       ]),
          'city': new FormControl('', [
                Validators.required, 
                Validators.minLength(4),
                Validators.maxLength(45)
            ]),
          'address': new FormControl('', [
                Validators.required, 
                Validators.minLength(4),
                Validators.maxLength(445)
            ]),
          'facebook_link': new FormControl('', [
                // Validators.minLength(4),
                // Validators.maxLength(200)
            ]),
          'google_link': new FormControl('', [
                // Validators.minLength(4),
                // Validators.maxLength(200)
                ])
      });

  }


  ngOnInit() {

     this.getDataService.getBusinessInfo(null).subscribe((res:any)=>{ //console.log(res)
      if(res.response != 'business not present'){
        if(res.data['pr_business_id']){
          this.pr_business_id = res.data['pr_business_id'];
        }
        if(res.data['pr_business_title']){
          this.pr_business_title = res.data['pr_business_title'];
        }
        if(res.data['pr_business_subtitle']){
          this.pr_business_subtitle = res.data['pr_business_subtitle'];
        }
        if(res.data['pr_business_about']){
          this.pr_business_about = res.data['pr_business_about'];
        }
        if(res.data['pr_business_logo_path']){
          this.pr_business_logo_path = res.data['pr_business_logo_path'];
        }
        if(res.data['pr_business_city']){
          this.pr_business_city = res.data['pr_business_city'];
        }
        if(res.data['pr_business_address']){
          this.pr_business_address = res.data['pr_business_address'];
        } 
        if(res.data['pr_business_external_url']){
          this.pr_business_external_url = res.data['pr_business_external_url'];
        }
        if(res.data['pr_business_social_links']){
          this.pr_business_social_links = res.data['pr_business_social_links'];
          this.pr_business_facebook_link = this.pr_business_social_links.split(',')[0];
          this.pr_business_google_link = this.pr_business_social_links.split(',')[1];
        }
        if(res.data['pr_business_template_no']){
          this.pr_business_template_no = res.data['pr_business_template_no'];
        }
        if(res.data['pr_business_template_theme_no']){
          this.pr_business_template_theme_no = res.data['pr_business_template_theme_no'];
        }
    }
    }, (error:any) => {
      console.log(error)
    });
  }

  updateBusinessInfo() {

    if(this.form.valid){
      const formData = new FormData();
      // formData.append('logo', this.uploaded_logo, this.uploaded_logo.name);
      // console.log(this.uploaded_logo);
      // console.log(formData)
      formData.append('title', this.form.value['businessTitle']);
      formData.append('subtitle', this.form.value['businessSubtitle']);
      formData.append('about', this.form.value['businessAbout']);
      formData.append('city', this.form.value['city']);
      formData.append('address', this.form.value['address']);
      formData.append('logo', this.uploaded_logo);
      // formData.append('external_url', this.form.value['external_url']);
      this.social_links = [ this.form.value['facebook_link'], this.form.value['google_link'] ] ;
      formData.append('social_links', this.social_links);
      // this.title = this.form.value['businessTitle'];
      // this.subtitle = this.form.value['businessSubtitle'];
      // this.about = this.form.value['businessAbout'];
      // this.logo = formData;
      // this.url = this.form.value['external_url'];
      // this.city = this.form.value['city'];
      // this.address = this.form.value['address'];

      // this.social_links = [
      // {
      //   'facebook' : this.form.value['facebook_link'],
      //   'google' : this.form.value['google_link']
      // }] ;

      

      // console.log(this.title,this.subtitle,this.about,this.url, this.city,this.address,this.social_links);

      //this.SendDataService.sendBusinessInfo(this.title,this.subtitle,this.about,this.logo,this.url,this.city,this.address,this.social_links);
      // this.SendDataService.sendBusinessInfo(formData);
      var token = localStorage.getItem("token");

      this.http.post('send_business_info/', 
      formData,
      { headers:  new HttpHeaders().set('Authorization', 'JWT '+token) }
      ).subscribe(
      (data:any)=>{ //console.log(data)
         if(data.response.response == 'successfully updated'){
             this.router.navigate(['/'+data.id+'/dashboard']);
         }
      });
    }
  }

  onLogoSelect(e){
    // console.dir(e.target)
    // console.dir(e.target.classList)
    // console.dir(e.target.files[0])
    this.uploaded_logo = e.target.files[0];
  }

}
