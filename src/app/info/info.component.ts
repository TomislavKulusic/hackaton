import { Discount } from './../Model/Discount';
import { LoginService } from './../Services/login.service';
import { ChartsModule } from 'ng2-charts';
import { VisitedLocation } from './../Model/VisitedLocation';
import { Item } from './../Model/Item';
import { Feedback } from './../Model/Feedback';
import { User } from './../Model/User';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InfoService } from './../Services/infoservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  user = new User();
  status: number;
  id: number;
  feedback: Feedback;
  feedbacks: Array<Feedback> = new Array<Feedback>();
  item: Item;
  items: Array<Item> = new Array<Item>();
  locations: Array<VisitedLocation> = new Array<VisitedLocation>();
  location: VisitedLocation;
  buses: Array<string> = new Array<string>();
  labels: Array<string> = new Array<string>();
  data: Array<number> = new Array<number>();
  doughnutChartLabels: string[] = this.labels;
  doughnutChartData: number[] = this.data;
  doughnutChartType: string = 'doughnut';
  loading: boolean = false;
  discounts: Array<Discount> = new Array<Discount>();
  discount: Discount;

  constructor(private _login: LoginService, private _infoService: InfoService, private route: ActivatedRoute, private router: Router, ) {

   }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];

    let observableResponse: Observable<Response> = this._infoService.getInformations(this.id);
    observableResponse.subscribe(
      response => {

        this.user = response.json();

      }

    );
    
    let secondResponse: Observable<Response> = this._infoService.getFeedback(this.id);
    secondResponse.subscribe(
      response => {
        for (var index = 0; index < response.json()["comments"].length; index++) {
          this.feedback = new Feedback();
          this.feedback.name = response.json()["comments"][index].name;
          this.feedback.stars = response.json()["comments"][index].stars;
          this.feedback.comment = response.json()["comments"][index].comment;
          this.feedbacks.push(this.feedback);
        }
      }
    );

    let thirdResponse: Observable<Response> = this._infoService.getAvailableItems();
    thirdResponse.subscribe(
      response => {
        console.log(response.json());
        for (var index = 0; index < response.json()["shops"].length; index++) {
          this.item = new Item();
          this.item.name = response.json()["shops"][index].name;
          this.item.discountAmount = response.json()["shops"][index].discount;

          this.items.push(this.item);
        }
      }
    );

    this.loading = true;
    let dataResponse: Observable<Response> = this._infoService.getData(this.id);
    dataResponse.subscribe(
      response => {
        for (var index = 0; index < response.json()["locations"].length; index++) {
          this.location = new VisitedLocation();
          this.location.locationId = response.json()["locations"][index].locationId;
          this.location.date = response.json()["locations"][index].date;
          this.location.name = response.json()["locations"][index].name;
          this.location.type = response.json()["locations"][index].type;
          this.location.hasComment = response.json()["locations"][index].hasComment;

          if (this.labels.indexOf((response.json()["locations"][index].name)) === -1) {
            this.labels.push(response.json()["locations"][index].name);
          }
          this.buses.push(response.json()["locations"][index].name);
          this.locations.push(this.location);
        }

        for (var index = 0; index < this.labels.length; index++) {
          let count: number = 0;
          for (var counter = 0; counter < this.buses.length; counter++) {
            if (this.labels[index] === this.buses[counter]) {
              count++;
            }
          }
          this.data.push(count);
        }
      },
      error => { alert("error") },
      () => { this.loading = false }
    );

    let discountResponse: Observable<Response> = this._infoService.getDiscounts(this._login.getUser());
    discountResponse.subscribe(
      response => {
        for (var index = 0; index < response.json()["discounts"].length; index++) {

          this.discount = new Discount();
          this.discount.for = response.json()["discounts"][index].for;
          this.discount.shopId = response.json()["discounts"][index].shopId;
          this.discount.active = response.json()["discounts"][index].active;
          this.discount.code = response.json()["discounts"][index].code;
          this.discount.discount = response.json()["discounts"][index].discount;
          this.discount.discountId = response.json()["discounts"][index].discountId;

          if (this.discount.active === true) {
            this.discounts.push(this.discount);
          }
        }
      }, error => { alert("Cannot Load discounts") },
      () => { }

    );

  }

  sendShoping() {
    this.router.navigate(['spend']);
  }






}
