import { LoginService } from './../Services/login.service';
import { Item } from './../Model/Item';
import { InfoService } from './../Services/infoservice.service';
import { PurchaseComponent } from './../purchase/purchase.component';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';


@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

  public items:Array<Item> = new Array<Item>();
  public item:Item;
  public id:number;

  constructor(private _login:LoginService,private _infoService: InfoService, public dialog: MdDialog) { }

  ngOnInit() {
    this.id = +this._login.getUser();
    let observableResponse: Observable<Response> = this._infoService.getAvailableItems();
    observableResponse.subscribe(
      response => {
        
      for (var index = 0; index < response.json()["shops"].length; index++) {
      this.item = new Item();
      this.item.discountAmount = response.json()["shops"][index].discountAmount;
      this.item.discountCost = response.json()["shops"][index].discountCost;
      this.item.discountDescription = response.json()["shops"][index].discountDescription;
      this.item.discountId = response.json()["shops"][index].discountId;
      this.item.name = response.json()["shops"][index].name;
      this.item.shopId = response.json()["shops"][index].shopId;

      this.items.push(this.item);

    }
    console.log(this.items);

      }, error => { alert("Cannot recieve items") },
      () => { }
    );
  }

  

  Purchase(cardId:number) {
    let dialogRef = this.dialog.open(PurchaseComponent, {
      height: '500px',
      width: '700px',


    });

    dialogRef.componentInstance.userId = this._login.getUser();
    dialogRef.componentInstance.shopId = this.items[cardId].shopId;
    dialogRef.componentInstance.discountId = this.items[cardId].discountId;
    dialogRef.componentInstance.name = this.items[cardId].name;
    dialogRef.componentInstance.discountCost = this.items[cardId].discountCost;
  }

}
