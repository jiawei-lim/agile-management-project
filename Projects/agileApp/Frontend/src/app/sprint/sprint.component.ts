import { Component, Input, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { task } from '../types';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  @Input() sprint_id:number;
  sprint_list:task[] = [];

  constructor(private db:DbService) {
    
  }

  ngOnInit(): void {
    this.db.getTasks(this.sprint_id).subscribe((res)=>{
      this.sprint_list = res;
    },(err)=>{
      console.log(err)
    })
  }

}
