import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Location, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';


//services
import { AuthService } from './services/auth/auth.service';
import { GetDataService } from './services/get-data.service';
import { AuthBusinessService } from './services/auth/auth-business.service';
import { AuthUsersService } from './services/auth/auth-users.service';


//guards
import { AuthGuard } from './services/auth/auth.guard';
import { RedirectGuard } from './services/auth/redirect.guard';
import { AuthBusinessGuard } from './guards/auth/auth-business.guard';
import { AuthUserGuard } from './guards/auth-user.guard';


import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './pages/list/list.component';
import { BusinessInfoFormComponent } from './pages/business-info-form/business-info-form.component';
import { SidebarComponent } from './pages/dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InputComponent } from './form/input/input.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { ButtonComponent } from './form/button/button.component';
import { Template1Component } from './templates/template1/template1.component';
import { TemplateHeaderComponent } from './templates/layout/template-header/template-header.component';
import { TemplateFooterComponent } from './templates/layout/template-footer/template-footer.component';
import { TemplateAboutComponent } from './templates/layout/template-about/template-about.component';
import { TemplateFeaturesComponent } from './templates/layout/template-features/template-features.component';
import { TemplateGalleryComponent } from './templates/layout/template-gallery/template-gallery.component';
import { Template2Component } from './templates/template2/template2.component';
import { NotificationsComponent } from './pages/dashboard/notifications/notifications.component';
import { StatsComponent } from './pages/dashboard/stats/stats.component';
import { CurrentSelectionsComponent } from './pages/dashboard/current-selections/current-selections.component';
import { RecentNotificationsComponent } from './pages/dashboard/recent-notifications/recent-notifications.component';
import { TemplatesComponent } from './templates/templates.component';
import { HowItWorksComponent } from './pages/home/how-it-works/how-it-works.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ModalComponent } from './pages/dashboard/modal/modal.component';
import { TemplateContactUsComponent } from './templates/layout/template-contact-us/template-contact-us.component';
import { ContactsComponent } from './pages/dashboard/contacts/contacts.component';
import { DetailsComponent } from './pages/dashboard/details/details.component';
import { SocialRedirectComponent } from './social-redirect/social-redirect.component';
import { Template3Component } from './templates/template3/template3.component';
import { IndexComponent } from './pages/index/index.component';


const appRoutes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', component: IndexComponent },
  { path: 'login', canActivate: [RedirectGuard], component: LoginComponent },
  { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent },
  { path: 'signup', canActivate: [RedirectGuard], component: SignupComponent },
  { path: 'list', component: ListComponent },
  { path: 'pages/:userId/:businessTitle',  component: Template3Component },
  { path: 'social_login_success/:token',  component: SocialRedirectComponent },
  // { path: ':userId', 
  //       children: [
  //       { path:'', redirectTo:'dashboard', pathMatch:'full' },
  //       { path:'dashboard', canActivate: [AuthUserGuard], component: DashboardComponent },
  //       { path:'edit-business-info', component: BusinessInfoFormComponent },
  //       { path:'templates', component: TemplatesComponent },
  //       { path:'templates/:templateId', component: Template1Component }
  //    ]},  
  { path : 'demo-template', component: Template3Component },
  { path: ':id', redirectTo:'/dashboard', pathMatch:'full' },
  { path:':id/dashboard', canActivate: [AuthUserGuard], component: DashboardComponent },
  { path:':id/edit-business-info', canActivate: [AuthUserGuard], component: BusinessInfoFormComponent },
  { path:':id/templates', canActivate: [AuthUserGuard], component: TemplatesComponent },
  { path:':id/templates/:templateId', canActivate: [AuthUserGuard], component: Template3Component },
  { path:':id/page', component: Template1Component },
  { path: '**', redirectTo:'/home', pathMatch:'full' }
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    ListComponent,
    BusinessInfoFormComponent,
    SidebarComponent,
    DashboardComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    Template1Component,
    TemplateHeaderComponent,
    TemplateFooterComponent,
    TemplateAboutComponent,
    TemplateFeaturesComponent,
    TemplateGalleryComponent,
    Template2Component,
    NotificationsComponent,
    StatsComponent,
    CurrentSelectionsComponent,
    RecentNotificationsComponent,
    TemplatesComponent,
    HowItWorksComponent,
    LogoutComponent,
    ModalComponent,
    TemplateContactUsComponent,
    ContactsComponent,
    DetailsComponent,
    SocialRedirectComponent,
    Template3Component,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {useHash:true}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  providers: [
    Title,
    AuthService,
    AuthGuard,
    RedirectGuard,
    GetDataService,
    AuthBusinessGuard,
    AuthBusinessService,
    AuthUsersService,
    AuthUserGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
