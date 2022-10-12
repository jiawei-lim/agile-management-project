import { Component, Input, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { DbService } from '../services/db.service';
import { task } from '../types';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  @Input() sprint_id!: number;
  sprint_list: task[] = [];

  constructor(private db: DbService) {

  }

  ngOnInit(): void {
    this.db.getTasks(this.sprint_id).subscribe((res) => {
      this.sprint_list = res;
    }, (err) => {
      console.log(err)
    })
  }

  // manually start sprint
  onStart(): void {
    this.db.updateSprintStatus({ "sprint_id": this.sprint_id, "sprint_status": "Active" }).subscribe(
      res => { res.status=="Error"?alert(res.message):console.log(res)},
      err => console.log(err))
  }

  // manually end sprint
  onEnd(): void {
    this.db.updateSprintStatus({ "sprint_id": this.sprint_id, "sprint_status": "Inactive" }).subscribe(
      res => { console.log(res) },
      err => { console.log(err) })
  }

}
