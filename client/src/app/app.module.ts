import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SessionService } from './services/auth/session.service';
import { ActivitiesService } from './services/activities/activities.service';
import { AuthCreateEventsService } from './services/guards/auth-create-events.service';
import { RouterModule,Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { AlertModule } from 'ng2-bootstrap';
import { ActivityCreationComponent } from './activity-creation/activity-creation.component';
import { ActivitySingleComponent } from './activity-single/activity-single.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';

const routes: Routes = [
  { path: '',  component: LandingComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  {path: 'activity', component: ActivityCreationComponent},
  {path: 'activity/:id', component: ActivitySingleComponent},
  {path: 'activity/edit/:id', component: ActivityEditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    ActivityCreationComponent,
    ActivitySingleComponent,
    ActivityEditComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot()
  ],
  providers: [SessionService, ActivitiesService, AuthCreateEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
