import { MyServiceService } from './../Services/my-service.service';
import { InfoService } from './../Services/infoservice.service';
import { LoginService } from './../Services/login.service';

import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';





@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],

})
export class FeedbackFormComponent implements OnInit {

  public myForm: FormGroup; // our form model
  id: number;
  public locationId: number;
  public userId:number;
  
  constructor(private _event: MyServiceService,
  private _login:LoginService, 
  private _infoService: InfoService, 
  private _fb: FormBuilder, 
  private route: ActivatedRoute, 
  private router: Router) { 

    // console.log(route.url);
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    // });
  }

  ngOnInit() {
    
    // we will initialize our form here
    this.id = +this._login.getUser();
    this.myForm = this._fb.group({
      comment: [null, Validators.required],
      rate: [null]

    });

   
  }


  save(model: any) {
     this.sendFeedback(this.userId,model.rate,model.comment,this.locationId);
     
  }

  sendFeedback(id,stars,comment,location) {
    console.log(location);
    let observableResponse: Observable<Response> = this._infoService.sendFeedback(id,stars,comment,location);
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
