import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// import { ModalModule } from 'ngx-bootstrap/modal';

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


//guards
import { AuthGuard } from './services/auth/auth.guard';
import { RedirectGuard } from './services/auth/redirect.guard';

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

// const appRoutes: Routes = [
//   { path: '', redirectTo:'/home', pathMatch:'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'login', canActivate: [RedirectGuard], component: LoginComponent },
//   { path: 'signup', canActivate: [RedirectGuard], component: SignupComponent },
//   { path: 'list', component: ListComponent },
//   { path: 'edit-business-info', canActivate: [AuthGuard], component: BusinessInfoFormComponent },
//   { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
//   { path: '**', redirectTo:'/home', pathMatch:'full' },
// ]

const appRoutes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', canActivate: [RedirectGuard], component: LoginComponent },
  { path: 'signup', canActivate: [RedirectGuard], component: SignupComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit-business-info', component: BusinessInfoFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'template1', component: Template1Component },
  { path: 'template2', component: Template2Component },
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
    HowItWorksComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    AuthService,
    AuthGuard,
    RedirectGuard,
    GetDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
