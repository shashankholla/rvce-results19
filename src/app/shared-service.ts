import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
@Injectable({
  providedIn: 'root'
})
export class SharedService {
 
    private data = new BehaviorSubject<any>("");
    currentData = this.data.asObservable();

    private avg = new BehaviorSubject<any>("");
    avgData = this.avg.asObservable();

    private gpaData = new BehaviorSubject<any>("");
    gpaDatas = this.gpaData.asObservable();
    constructor(){

    }

    
    changeGPA(m:any)
    {
      this.gpaData.next(m);
    }

    changeAvg(m:any)
    {
      this.avg.next(m);
    }

    changeM(m : any)
    {
      this.data.next(m)
    }
}
