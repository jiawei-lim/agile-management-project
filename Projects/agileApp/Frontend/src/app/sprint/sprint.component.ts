import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DbService } from '../services/db.service';
import { sprint, task } from '../types';
import { SprintFormComponent } from '../sprint-form/sprint-form.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  @Input() sprint_id!: number;
  @Output() submitClicked = new EventEmitter<sprint>();
  sprint_list: task[] = [];
  sprint_data!: sprint;
  DialogRef!: MatDialogRef<SprintFormComponent>;

  constructor(
    private db: DbService,
    private dialog: MatDialog,) {

  }

  ngOnInit(): void {
    this.db.getTasks(this.sprint_id).subscribe((res) => {
      this.sprint_list = res;
    }, (err) => {
      console.log(err)
    })

    this.db.getSprints().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].sprint_id == this.sprint_id) {
          this.sprint_data = res[i];
        }
      }
    }, (err) => {
      console.log(err)
    })
  }

  // manually start sprint
  onStart(): void {
    this.sprint_data.sprint_status = 'Active';
    this.db.updateSprint(this.sprint_data).subscribe(
      res => { console.log(res) },
      err => console.log(err))
  }

  // manually end sprint
  onEnd(): void {
    this.sprint_data.sprint_status = 'Inactive';
    this.db.updateSprint(this.sprint_data).subscribe(
      res => { console.log(res) },
      err => { console.log(err) })
  }

  // edit sprint
  onEdit(): void {
    this.DialogRef = this.dialog.open(SprintFormComponent, { data: this.sprint_data });

    // update sprint info
    this.DialogRef.componentInstance.updateClicked.subscribe(res => {
      this.sprint_data = res;
      this.db.updateSprint(this.sprint_data).subscribe(
        res => { console.log(res) },
        err => { console.log(err) }
      )
    })
  }
}
