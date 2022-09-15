import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListServicesService {

  public notificationSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  sendNotification(data:boolean):void{
    this.notificationSubject.next(data)
  }

}
