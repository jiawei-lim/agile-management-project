import { Component, Input, OnInit } from '@angular/core';
import { task, priority } from '../types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskformComponent } from '../taskform/taskform.component';
import { DbService } from '../services/db.service';
import { TaskListServicesService } from '../services/task-list-services.service';
import { filter } from "rxjs"


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {


  taskLists: task[] = [];

  DialogRef!: MatDialogRef<TaskformComponent>;

  // for filtering
  // filter = {
  //   filterTag: '',
  //   filterPriority: ''
  // }
  filterTag = '';
  canReset = false;

  constructor(public dialog: MatDialog, private db: DbService, private notification: TaskListServicesService) {
  }

  ngOnInit(): void {
    this.db.getTasks().subscribe(res => {
      this.taskLists = res
    })
    this.notification.notificationSubject.pipe(filter((s) => s == true)).subscribe((_) => {
      this.db.getTasks().subscribe(res => { this.taskLists = res })
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(TaskformComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.DialogRef.componentInstance.submitClicked.subscribe(result => {

      this.db.insertTask(result).subscribe(res => {
        console.log(result)
        this.db.getTasks().subscribe(res => {
          this.taskLists = res
        })
      }, err => {
      })


      this.dialog.closeAll();
    });
  }


  // for filtering task
  onSelectTag(value: any): void {
    this.filterTag = value;
  }

  // onSelectPriority(value: any): void {
  //   this.filter.filterPriority = value;
  // }

  onFilter(): void {
    this.canReset = true;
    // filter task based on tag and priority
    this.db.filterTask(this.filterTag).subscribe(
      res => {
        console.log(res)
        this.taskLists = res
      },
      err => { console.log(err) }
    )
  }

  onReset(): void {
    this.canReset = false;
  }

}
