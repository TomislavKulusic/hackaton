import { LoginService } from './../Services/login.service';
import { UserLogin } from './../Model/UserLogin';
import { User } from './../Model/User';
import { Router } from '@angular/router';
import { InfoService } from './../Services/infoservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public myForm: FormGroup;
  constructor(private _fb: FormBuilder, private _infoService: InfoService, private router: Router) { }

  ngOnInit() {
      this.myForm = this._fb.group({
      username: [null],
      password: [null],
      fname:[null],
      lname:[null],
      address:[null],
      number:[null],
      dob:[null]

    });
  }

  onSubmit(form: any) {
    console.log(form);
    this.signUp(form);
  }

  signUp(form:any) {
    let observableResponse: Observable<Response> = this._infoService.signUp(form);
    observableResponse.subscribe(
      response => {
        let info: any = <any>response.json();
      
      },
      error => {
        console.log(error)
      },
      () => {
        console.log("finally")
      }
    );
  }

}
