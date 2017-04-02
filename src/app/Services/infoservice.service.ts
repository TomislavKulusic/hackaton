import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class InfoService {

  public url:string = "http://codertest.dbtouch.com/hackathon/main"

  constructor(private _http: Http) { }

  getInformations(id: number): Observable<Response> {
    return this._http.get(this.url+`/getUser?userId=${id}`);
  }

  getUser(user: string, pass: string): Observable<Response> {
    //return this._http.get(`http://localhost:5000/Contact/${id}`);
    return this._http.get(this.url+`/login?username=${user}&password=${pass}`);
  }

  getData(id: number): Observable<Response> {
    return this._http.get(this.url+`/getLocations?userId=${id}`);
  }

  sendInformations(user: string, password: string): Observable<Response> {
    //http://codertest.dbtouch.com/hackathon/main/login?username=user1&password=testing
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+`/login?username=${user}&password=${password}`, user, options);
  }


  sendFeedback(id: number, stars: number, comment: string, locationId: number): Observable<Response> {
    //http://codertest.dbtouch.com/hackathon/main/login?username=user1&password=testing
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+`/addComment?userId=${id}&stars=${stars}&comment=${comment}&locationId=${locationId}`, comment, options);
  }

  getFeedback(id: number): Observable<Response> {
    return this._http.get(this.url+`/getAllComments?userId=${id}`);
  }

  getAvailableItems(): Observable<Response> {
    return this._http.get(this.url+`/getShops`);
  }

  signUp(form: any): Observable<Response> {
    //http://codertest.dbtouch.com/hackathon/main/login?username=user1&password=testing
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+`/createAccount?fname=${form.fname}&lname=${form.lname}&address=${form.address}&number=${form.number}&dob=${form.dob}&username=${form.username}&password=${form.password}`, form, options);
  }

  purchaseItem(userId: string, shopId: number, discountId: number): Observable<Response> {
    //http://codertest.dbtouch.com/hackathon/main/login?username=user1&password=testing
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+`/buyDiscount?userId=${userId}&shopId=${shopId}&discountId=${discountId}`, userId, options);
  }

  getDiscounts(id: string): Observable<Response> {
    return this._http.get(this.url+`/getDiscounts?userId=${id}`);
  }

  getAllData(): Observable<Response> {
    return this._http.get(`http://codertest.dbtouch.com/hackathon/dataDownload/downloadAllComments`);
  }






  //   updateInformations(id:number,info: any): Observable<Response> {

  //     let headers = new Headers({ 'Content-Type': 'application/json' });
  //     let options = new RequestOptions({headers: headers});

  //     return this._http.put(`http://localhost:5000/Contact/${id}`, info, options);
  //   }

  //   delete(id:number) : Observable<Response>{
  //      let headers = new Headers({ 'Content-Type': 'application/json' });
  //      let options = new RequestOptions({headers: headers});

  //     return this._http.delete(`http://localhost:5000/Contact/${id}`,options);
  //   }



}
