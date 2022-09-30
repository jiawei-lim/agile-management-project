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
    this.db.getSprints().subscribe((res) => {
      // look for corresponding sprint ID
      for (let i = 0; i < res.length; i++) {
        if (res[i].sprint_id == this.sprint_id) {
          res[i].sprint_status = "active";
          console.log(res[i])
          // update in DB
          this.db.updateSprintStatus(res[i]);
        }
      }
    })
  }

  // manually end sprint
  onEnd(): void {
    this.db.getSprints().subscribe((res) => {
      // look for corresponding sprint ID
      for (let i = 0; i < res.length; i++) {
        if (res[i].sprint_id == this.sprint_id) {
          res[i].sprint_status = "ended";
          console.log(res[i])
          // update in DB
          this.db.updateSprintStatus(res[i]);
        }
      }
    })
  }

}
