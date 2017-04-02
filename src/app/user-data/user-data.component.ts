import { MyServiceService } from './../Services/my-service.service';
import { FeedbackFormComponent } from './../feedback-form/feedback-form.component';
import { VisitedLocation } from './../Model/VisitedLocation';
import { UserLogin } from './../Model/UserLogin';
import { User } from './../Model/User';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InfoService } from './../Services/infoservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginService } from './../Services/login.service';



@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private _login: LoginService, private _infoService: InfoService, public dialog: MdDialog, private route: ActivatedRoute, private router: Router) { }

  locations = new Array<VisitedLocation>();
  location: VisitedLocation;
  id: number;
  a: boolean = false;

  ngOnInit() {
    this.id = +this._login.getUser();

    let observableResponse: Observable<Response> = this._infoService.getData(this.id);
    observableResponse.subscribe(
      response => {
        console.log(response.json());
        for (var index = 0; index < response.json()["locations"].length; index++) {
          this.location = new VisitedLocation();
          this.location.locationId = response.json()["locations"][index].locationId;
          this.location.date = response.json()["locations"][index].date;
          this.location.name = response.json()["locations"][index].name;
          this.location.type = response.json()["locations"][index].type;
          this.location.hasComment = response.json()["locations"][index].hasComment;

          if(this.location.hasComment === false) {
            this.locations.push(this.location);
          }


          
        }

      }
    );
  }

  Feedback(id: number, userId: number) {


    let dialogRef = this.dialog.open(FeedbackFormComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.componentInstance.locationId = this.locations[id].locationId;
    dialogRef.componentInstance.userId = this.id;
  }

  getId() {
    this.id = +this.route.snapshot.params['id'];
    console.log(this.id);
    return this.id;
  }

}
