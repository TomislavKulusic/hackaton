import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }

  setUser(id:string) {
    localStorage.setItem("UserId",id);  
  }

  getUser() {
    return localStorage.getItem("UserId");
  }

}
