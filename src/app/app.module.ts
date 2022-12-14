import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InfiniteTypeDeleteModule } from "ngx-sbz-type-delete";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './navbar/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { AboutDialogComponent } from './components/aboutme/about-dialog/about-dialog.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ExpDialogComponent } from './components/experience/exp-dialog/exp-dialog.component';
import { EducationComponent } from './components/education/education.component';
import { EduDialogComponent } from './components/education/edu-dialog/edu-dialog.component';
import { ProjectComponent } from './components/project/project.component';
import { ProDialogComponent } from './components/project/pro-dialog/pro-dialog.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ConfirmComponent,
    AboutmeComponent,
    AboutDialogComponent,
    ExperienceComponent,
    ExpDialogComponent,
    EducationComponent,
    EduDialogComponent,
    ProjectComponent,
    ProDialogComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    InfiniteTypeDeleteModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
