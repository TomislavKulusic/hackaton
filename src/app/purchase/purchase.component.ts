import { InfoService } from './../Services/infoservice.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from './../Services/login.service';



@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  public userId: string;
  public shopId: number;
  public discountId: number;
  public name: string;
  public discountCost: number;
  public check: boolean;
  public id:number;

  constructor(private _login: LoginService,private _infoService: InfoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = +this._login.getUser();
  }

  purchase() {
    this.purchaseItem(this.userId, this.shopId, this.discountId);
  }

  no() {
    this.router.navigate(['spend']);

  }

  purchaseItem(userId, shopId, discountId) {
    let observableResponse: Observable<Response> = this._infoService.purchaseItem(userId, shopId, discountId);
    observableResponse.subscribe(
      response => {
        let info: any = <any>response.json();
        this.check = true;
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
