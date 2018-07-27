import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

	info:any;
  addiInfo:any;
  constructor(private http:HttpClient, private router: Router) { }


   sendBusinessInfo( title:string, subtitle:string, about:string, logo:File, url:string, city:string, address:string, social_links:string): void {
     // title:string, subtitle:string, about:string, logo, url:string, city:string, address:string, social_links:string

  	this.info = {
      title:title,
      subtitle:subtitle,
      about:about,
      logo:logo,
      url:url,
      city:city,
      address:address,
      social_links:social_links
    }
// console.log(logo)
    var token = localStorage.getItem("token");
// console.log(fd)
  	this.http.post('send_business_info/', 
      logo,
      { headers:  new HttpHeaders().set('Content-Type','none').set('Authorization', 'JWT '+token) }
  		).subscribe(
  		(data:any)=>{//console.log(data)
         if(data.response.response == 'successfully updated'){
             this.router.navigate(['/'+data.id+'/dashboard']);
         }
  		});
  }



  sendAdditionalInfo(business_id, features_t, features_d, colorTheme){
    this.addiInfo = {
      business_id:business_id,
      features_t:features_t,
      features_d:features_d,
      colorTheme:colorTheme
    }
    // console.log(this.addiInfo);

    var token = localStorage.getItem("token");

    return this.http.post('send-additional-info/', this.addiInfo,
      { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) }
      );
  }

  sendGalleryImages(){
    this.addiInfo = {
   
    }

    var token = localStorage.getItem("token");

    return this.http.post('upload-gallery-images/', this.addiInfo,
      { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) }
      );
  }

  publishBusinessPage(uid,business_id,business_title, business_subtitle, colorTheme){

    let info = {
      colorTheme : colorTheme
    }
    var token = localStorage.getItem("token");

    this.http.post('publish_business_page/', 
      info,
      { headers:  new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT '+token) }
      ).subscribe(
      (data:any)=>{
        //console.log(data)
         if(data.response.response == 'successfully published'){
           let url = '/pages/2/fsgfs';
           console.log(url);
             this.router.navigate(['/pages/'+uid+'/'+business_title+'/'])
         }
      });
  }

  updatePageView(uid) {
    this.info = {
      uid:uid
    }
    this.http.post('update_page_views/', 
      this.info,
      ).subscribe(
      (data:any)=>{
        //console.log(data)
         // if(data.response == 'successfully updated'){
             // var url = this.router.url;console.log("'"+url+"'")
             // this.router.navigate(["/2/templates/1"])
         // }
      });
  }

  clientContactSubmit(uid,contact_name,contact_email,contact_details) {
    this.info = {
      uid:uid,
      contact_name:contact_name,
      contact_email:contact_email,
      contact_details:contact_details
    }
    return this.http.post('client_contact_submit/', 
      this.info,
      );
  }
}
