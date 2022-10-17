import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DbService } from '../services/db.service';
import { sprint, task } from '../types';
import { SprintFormComponent } from '../sprint-form/sprint-form.component';
import { TaskListServicesService } from '../services/task-list-services.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  @Input() sprint_id!: number;
  @Output() submitClicked = new EventEmitter<sprint>();
  sprint_tasks: task[] = [];
  sprint_data!: sprint;
  DialogRef!: MatDialogRef<SprintFormComponent>;

  // used for buttons (disabling/hiding)
  ongoing = false;
  canStart = true;
  canEnd = false;
  editTitle = 'Edit sprint';
  deleteTitle = 'Remove sprint';

  constructor(
    private db: DbService,
    private dialog: MatDialog,
    private notification:TaskListServicesService) {

  }

  ngOnInit(): void {
    this.db.getTasks(this.sprint_id).subscribe((res) => {
      this.sprint_tasks = res;
    }, (err) => {
      console.log(err)
    })

    this.db.getSprints().subscribe((res) => {
      let today = new Date();

      for (let i = 0; i < res.length; i++) {
        // hiding / disabling buttons
        if (res[i].sprint_status === "Active") {
          this.canStart = false;
        }
        if (res[i].sprint_id == this.sprint_id) {
          this.sprint_data = res[i];
        }
        // automatically starting sprint
        let start = new Date(res[i].start_date);
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        let end = new Date(res[i].end_date);
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);

        if (start <= today) {
          if (res[i].sprint_status === "Inactive") {
            res[i].sprint_status = "Active";
            this.db.updateSprint(res[i]).subscribe(
              res => { console.log(res) },
              err => { console.log(err) }
            )
            window.alert(res[i].sprint_name + " has been started automatically. ")
          }
        } else if (end < today) {
          if (res[i].sprint_status != "Completed") {
            res[i].sprint_status = "Completed";
            this.db.updateSprint(res[i]).subscribe(
              res => { console.log(res) },
              err => { console.log(err) }
            )
            window.alert(res[i].sprint_name + " has been ended automatically . ")
          }
        }
      }
      // disable editing ongoing sprints
      if (this.sprint_data.sprint_status === "Active") {
        this.ongoing = true;
        this.canStart = false;
        this.canEnd = true;
        this.editTitle = 'Cannot make changes to ongoing sprints';
        this.deleteTitle = 'Cannot remove ongoing sprints';
      }
    }, (err) => {
      console.log(err)
    })
  }

  // manually start sprint
  onStart(): void {
    this.sprint_data.sprint_status = 'Active';
    this.db.updateSprint(this.sprint_data).subscribe(
      res => { console.log(res); this.notification.sendNotification(true) },
      err => { console.log(err) }
    )
  }

  // manually end sprint
  onEnd(): void {
    this.sprint_data.sprint_status = 'Completed';
    this.db.updateSprint(this.sprint_data).subscribe(
      res => { console.log(res); this.notification.sendNotification(true) },
      err => { console.log(err) }
    )
  }

  // edit sprint
  onEdit(): void {
    // open sprint form
    this.DialogRef = this.dialog.open(SprintFormComponent, { data: this.sprint_data });

    // update sprint info
    this.DialogRef.componentInstance.updateClicked.subscribe(res => {
      console.log(res);
      this.db.updateSprint(res).subscribe(
        res => { console.log(res); this.notification.sendNotification(true) },
        err => { console.log(err) }
      )
    })
  }

  // remove sprint
  onDelete(): void {
    if (window.confirm("Are you sure you want to remove this sprint?")) {
      // reset the tasks' sprint id
      for (let i = 0; i < this.sprint_tasks.length; i++) {
        this.sprint_tasks[i].sprint_id = null;
      }
      // remove from DB
      this.db.deleteSprint(this.sprint_data).subscribe(
        res => { console.log(res); this.notification.sendNotification(true) },
        err => { console.log(err) }
      )
    }
  }
}
