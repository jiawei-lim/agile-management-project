import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { sprint } from '../types';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.css']
})
export class SprintBacklogComponent implements OnInit {
  panelOpenState = false;
  sprintList:sprint[];
  exp_sprintList:any;

  constructor(private db:DbService) { }

  ngOnInit(): void {
    this.db.getSprints().subscribe((res)=>{
      this.sprintList = res
      this.exp_sprintList = res.map((x:any)=>({...x,expanded:false}));
    },(err)=>console.log(err))
  }

}
