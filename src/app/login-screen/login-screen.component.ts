import { SignupComponent } from './../signup/signup.component';
import { LoginService } from './../Services/login.service';
import { UserLogin } from './../Model/UserLogin';
import { User } from './../Model/User';
import { Router } from '@angular/router';
import { InfoService } from './../Services/infoservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  userId: number;
  status: number;


  userLogin = new UserLogin();
  myForm: FormGroup;
  id:number;

  constructor(private _login: LoginService,
  private _fb: FormBuilder,
  private _infoService: InfoService,
  private router: Router,
  public dialog: MdDialog) { }

  ngOnInit() {

    this.myForm = this._fb.group({
      username: [null],
      password: [null]

    });

  }

  onSubmit(form) {
    this.sendInformations(form.username, form.password);


    let observableResponse: Observable<Response> = this._infoService.getUser(form.username, form.password);
    observableResponse.subscribe(
      response => {

        this.userId = response.json().userId;

        this._login.setUser("" + this.userId);


        this.status = response.json().status;
        console.log(this.status);
        if (this.status === 0) {


        } else {

          this.router.navigate(['info/' + this._login.getUser() + '']);
        }

      }


    );



  }

  sendInformations(user: string, password: string) {
    let observableResponse: Observable<Response> = this._infoService.sendInformations(user, password);
    observableResponse.subscribe(
      response => {
        let info: any = <any>response.json();
        //this.infos.push(info);
      },
      error => {
        console.log(error)
      },
      () => {
        console.log("finally")
      }
    );
  }

  signUpModal() {
    this.dialog.open(SignupComponent, {
      height: '600px',
      width: '700px',


    });
  }

}
