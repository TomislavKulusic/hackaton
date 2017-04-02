import { Injectable } from '@angular/core';
import { EventEmitter} from '@angular/core';
import * as Rx from 'rx';


@Injectable()
export class MyServiceService {

  constructor() { }

  myevent: EventEmitter<number> = new EventEmitter<number>();

  emitNavChangeEvent(number) {
    this.myevent.emit(number);
  }
  getNavChangeEmitter() {
    return this.myevent;
  }

  

}
