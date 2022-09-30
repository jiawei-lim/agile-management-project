import { Component, OnInit,Input } from '@angular/core';
import { task,priority } from '../types';

@Component({
  selector: 'app-sprintlist',
  templateUrl: './sprintlist.component.html',
  styleUrls: ['./sprintlist.component.css']
})
export class SprintlistComponent implements OnInit {
  @Input() sprintList:task[];

  constructor() {
    this.sprintList = []
   }

  ngOnInit(): void {
  }

  filterByStatus(values:task[]):task[]{
    return values.filter(x=>x.status != "Completed")
  }
}
