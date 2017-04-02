import { InfoService } from './../Services/infoservice.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { User } from './../Model/User';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from './../Services/login.service';




@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public data: string;
  user = new User();
  status: number;
  id: number;
  
 

  constructor(private _login:LoginService,private _infoService: InfoService, private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit() {
    
    this.id = +this._login.getUser();

    let observableResponse: Observable<Response> = this._infoService.getInformations(this.id);
    observableResponse.subscribe(
      response => {

        this.user = response.json();

      }
    );
  }

  downloadData() {
    let thirdResponse: Observable<Response> = this._infoService.getAllData();
    thirdResponse.subscribe(
      response => {
        location.replace(response.url);
      }, error => { },
      () => { }
    );

  }

}
