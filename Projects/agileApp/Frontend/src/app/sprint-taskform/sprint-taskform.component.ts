import { Component, OnInit, Input, Output,Inject,EventEmitter } from '@angular/core';
import { task,priority } from '../types';
import { DbService } from '../services/db.service';
import { TaskListServicesService } from '../services/task-list-services.service';
import {filter} from "rxjs"

@Component({
  selector: 'app-sprint-taskform',
  templateUrl: './sprint-taskform.component.html',
  styleUrls: ['./sprint-taskform.component.css']
})
export class SprintTaskformComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();

  sprintLists:task[] = [];
  formTitle = "Add Task";
  buttonName = "Add";
  sprintTaskDataForm:any;

  constructor(private db:DbService,private notification:TaskListServicesService) {
  }

  ngOnInit(): void {
    this.db.getTasks().subscribe(res=>{
      this.sprintLists = res
    })
    this.notification.notificationSubject.pipe(filter((s)=>s==true)).subscribe((_)=>{
      this.db.getTasks().subscribe(res=>{this.sprintLists=res})
    })
  }
  
}
