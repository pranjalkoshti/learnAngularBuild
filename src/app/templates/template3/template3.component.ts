import { Component, OnInit, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { SendDataService } from '../../services/send-data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthBusinessService } from '../../services/auth/auth-business.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
  styleUrls: ['./template3.component.css']
})
export class Template3Component implements OnInit {

  modalRef: BsModalRef;  //bootstrap modal

  colorTheme:string = 'black';  //color theme

  pr_business_id:number;
  uid:number;
  pr_business_title:string = "TITLE";
  pr_business_subtitle:string = "SUBTITLE";
  pr_business_about:string= "Hello!! Please add description about your business and other relevent information in maximum 400 characters. Use this space effectively to add information about services, features and other information about your business as this space plays key role in increasing conversion rate.";
  pr_business_logo_path:string;
  pr_business_city:string;
  pr_business_address:string;
  pr_business_external_url:string;
  pr_business_social_links:string = "";
  pr_business_facebook_link:string;
  pr_business_google_link:string;
  pr_business_template_theme_no:number;
  pr_business_template_no:number;
  pr_business_published_status:boolean = true;

  pr_features_title:any[];
  pr_features_details:any[];
  pr_gallery_url:any[];


  features_titles = "Features - Title";
  features_details = "Add short description about features. Make this description short but effective";

  feature1_t:string = "";
  feature1_d:string = "";
  feature2_t:string = "";
  feature2_d:string = "";
  feature3_t:string = "";
  feature3_d:string = "";

  features_t:string;
  features_d:string;

  templateId:string;
  templateOne:boolean=false;
  templateTwo:boolean=false;

  // content:string;  //modal content
  // value:string='fadf';

  modalTitle:string='Additional information';  //modal title

  userId:string;
  businessTitle:string;

  isAutherized:boolean = this.getAdminToken();
  // isAutherized:boolean;

  uploaded_gallery_images;

  contact_name;
  contact_email;
  contact_details;
  msg ="";

  customer_reviews;

  gallery_images:any[];

  public form: FormGroup; 
  public contactForm: FormGroup; 
  public galleryForm: FormGroup; 
 
  constructor(
  	private formBuilder: FormBuilder, 
    private getDataService:GetDataService,
    private modalService: BsModalService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authBusinessService: AuthBusinessService,
    private sendDataService:SendDataService,
    private http:HttpClient ) { 

	    //this.authBusinessService.getBusinessAuthStatus(this.userId,this.businessTitle);  //check if business is published

	    this.form = new FormGroup({
	          'feature_1_title': new FormControl('', [Validators.minLength(4),Validators.maxLength(100)]),
	          'feature_1_details': new FormControl('', [Validators.minLength(4),Validators.maxLength(200)]),
	          'feature_2_title': new FormControl('', [Validators.minLength(4),Validators.maxLength(100)]),
	          'feature_2_details': new FormControl('', [Validators.minLength(4),Validators.maxLength(200)]),
	          'feature_3_title': new FormControl('', [Validators.minLength(4),Validators.maxLength(100)]),
	          'feature_3_details': new FormControl('', [Validators.minLength(4),Validators.maxLength(200)])
	     });


 		this.contactForm = new FormGroup({
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


      	this.galleryForm = new FormGroup({
          'gallery_images': new FormControl('')
      	});


	    if(this.templateId == '1'){
	      this.templateOne = true;
	    }

	    if(this.templateId == '2'){
	      this.templateTwo = true;
	    }
	}

  ngOnInit() {
  	// this.isAutherized = false;

  	 this.route.params.subscribe( params => { //console.log(params);

      if(params['templateId']){
        this.templateId = params['templateId']
      }

      if(params['userId']){
        this.userId = params['userId']
      }

      if(params['businessTitle']){
        this.businessTitle = params['businessTitle'];
        this.isAutherized = false;
      }

      this.authBusinessService.getBusinessAuthStatus(this.userId,this.businessTitle)
	      .subscribe(
	      (data:any)=>{ 
	        //console.log(data)
	        if(data.error == 'wrong url'){
	            this.router.navigate(['/']);
	        }
	        if(data.status == 'not published'){
	            this.router.navigate(['/']);
	        }else if(data.success == 'user present' && data.status == 'published'){
              if(this.isAutherized == false){
                this.sendDataService.updatePageView(this.userId);
              };
	        }
      }
      );

    });

   

    this.getDataService.getBusinessInfo(this.userId).subscribe((res:any)=>{//console.log(res)
      if(res.response != 'business not present'){
        if(res.data['uid']){
          this.uid = res.data['uid'];
        }
        if(res.data['business_id']){
          this.pr_business_id = res.data['business_id'];
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
        if(res.data['pr_business_template_theme']){
          this.colorTheme = res.data['pr_business_template_theme'];
        }
        if(res.data['pr_business_template_theme_no']){
          this.pr_business_template_theme_no = res.data['pr_business_template_theme_no'];
        }
        if(res.data['pr_business_published_status'] == 0){
            this.pr_business_published_status = false;
        }
        if(res.data['pr_business_published_status'] == 1){
            this.pr_business_published_status = true;
        }
    }

    this.getDataService.getAdditionalBusinessInfo(this.pr_business_id).subscribe((res:any)=>{//console.log(res)
       if(res){

        if(res.data['features_title']){
          this.features_titles = res.data['features_title'];
          var features_titles_array = res.data['features_title'].split(',');
          this.feature1_t = features_titles_array[0];
          this.feature2_t = features_titles_array[1];
          this.feature3_t = features_titles_array[2];
        }

        if(res.data['features_details']){
          this.features_details = res.data['features_details'];
          var features_details_array = res.data['features_details'].split(',');
          this.feature1_d = features_details_array[0];
          this.feature2_d = features_details_array[1];
          this.feature3_d = features_details_array[2];
        }

        if(res.data['gallary_url']){
          var features_details = res.data['gallary_url'].split(',');
        }

       }

     });
    });
  }


  getAdminToken() {
    return !!localStorage.getItem("token");
  }


  @HostListener('click',['$event.target']) 
  	onCTSelect(e) {
  		if(e.classList.contains('pr-ct-select')){
  			this.colorTheme = e.getAttribute('id');
  			console.log(this.colorTheme);
  		}
  	}


  openModal(template: TemplateRef<any>, templatelong: TemplateRef<any>, e, modalTitle1) {  

      this.modalRef = this.modalService.show(template);

  }

  onSave(template: TemplateRef<any>){
    ///console.log(this.form.value);

    if(this.form.valid){
      this.features_t = this.form.value['feature_1_title'] + ',' + this.form.value['feature_2_title'] +',' + this.form.value['feature_3_title'];
      this.features_d = this.form.value['feature_1_details'] +','+ this.form.value['feature_2_details'] +','+ this.form.value['feature_3_details'];
    }
    console.log(this.features_d, this.features_t, this.colorTheme);
    this.sendDataService.sendAdditionalInfo(this.pr_business_id, this.features_t, this.features_d, this.colorTheme).subscribe(
      (data:any)=>{
        //console.log(data)
         if(data.response == 'successfully updated'){

             // this.modalRef = this.modalService.hide(template);
         }
      });;

  }

  onPublish(){
    this.sendDataService.publishBusinessPage(this.uid,this.pr_business_id,this.pr_business_title,this.pr_business_title,this.colorTheme);
  }

  setBgColor() {

	  	if(!this.colorTheme){
	  		return 'green-cr-bg';
	  	}
	  	if(this.colorTheme == 'red'){
	  		return 'red-cr-bg'
	  	}else if(this.colorTheme == 'green'){
	  		return 'green-cr-bg'
	  	}else if(this.colorTheme == 'blue'){
	  		return 'blue-cr-bg';
	  	}else if(this.colorTheme == 'black'){
	  		return 'black-cr-bg';
	  	}
  }

	openContactFormSubmit(template: TemplateRef<any>){
		this.modalRef = this.modalService.show(template);
	}

	onContactFormSubmit(){
		if(this.userId){
			if(this.contactForm.valid){
			  	this.contact_name = this.contactForm.value['contact_name'];
		    	this.contact_email = this.contactForm.value['contact_name'];
		    	this.contact_details = this.contactForm.value['contact_details'];
			}

			this.sendDataService.clientContactSubmit(this.userId,this.contact_name,this.contact_email,this.contact_details).subscribe(
		    (data:any)=>{
		      //console.log(data.success);
		      if(data.success == 'successfully added'){
		      	this.msg = 'Your message is successfully submitted'
		      }  
		    }); 
		}
	}

	onGalleryImagesSelect(e){

	    //console.dir(e.target.files)
		document.getElementById('pr-t3-images-uploaded-number').innerText = e.target.files.length + ' images are selected';

	    this.uploaded_gallery_images = e.target.files;
	     var reader = new FileReader();

	    reader.onload = function(e) {
	    	// console.log(e.target.result)
	      // $('#blah').attr('src', e.target.result);
	    }

	    reader.readAsDataURL(e.target.files[0]);
	  }

	uploadGalleryImages(){
		// if(this.userId){
			const formData = new FormData();
			formData.append('gallery_images', this.uploaded_gallery_images);

			var token = localStorage.getItem("token");
		this.http.post('upload-gallery-images/',
			formData,
			{ headers:  new HttpHeaders().set('Authorization', 'JWT '+token) }
			).subscribe(
		    (data:any)=>{
		     // console.log(data.success);
		      if(data.success == 'successfully added'){
		      	this.msg = 'Your message is successfully submitted'
		      }  
		    }); 
		

	}
}
