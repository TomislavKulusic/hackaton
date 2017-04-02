import { LoginService } from './Services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  id: string;
  check:boolean;
  constructor(private _login: LoginService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  if(localStorage.getItem("UserId") === null) {
    this.router.navigate(['login']);
  } else {
    this.id = this._login.getUser();
    if(+this.id === 4) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
  }

  logout() {
    localStorage.removeItem("UserId");
    this.router.navigate(['']);
    location.reload(); 
  }
}
