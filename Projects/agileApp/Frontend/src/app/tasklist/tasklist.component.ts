import { Component, OnInit,Input } from '@angular/core';
import { task,priority } from '../types';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() taskList:task[];
  @Input() listTitle = '';
 
  constructor() { 
    this.taskList = [];
  }


  ngOnInit(): void {
   
  }

  filterByStatus(values:task[]):task[]{
    return values.filter(x=>x.status == this.listTitle)
  }

}
