import { LoginService } from './Services/login.service';
import { MyServiceService } from './Services/my-service.service';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { InfoService } from './Services/infoservice.service';
import { MaterialModule } from '@angular/material';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { UserDataComponent } from './user-data/user-data.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { ChartsModule } from 'ng2-charts';
import { SpendComponent } from './spend/spend.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';



const appRoutes: Routes = [
  { path: 'info/:id', component: InfoComponent },
  { path: '', component: LoginScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  { path: 'user/:id', component: UserDataComponent },
  { path: 'spend', component: SpendComponent },
  { path: 'admin', component: AdminPanelComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    LoginScreenComponent,
    UserDataComponent,
    FeedbackFormComponent,
    SpendComponent,
    PurchaseComponent,
    SignupComponent,
    AdminPanelComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    Angular2FontAwesomeModule,
    ChartsModule
  ],
  providers: [InfoService, MyServiceService, LoginService],
  bootstrap: [AppComponent],
  entryComponents: [FeedbackFormComponent, PurchaseComponent, SignupComponent]
})
export class AppModule { }
