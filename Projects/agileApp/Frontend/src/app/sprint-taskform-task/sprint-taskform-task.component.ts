import { Component, OnInit, Input } from '@angular/core';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';
import { task } from '../types';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sprint-taskform-task',
  templateUrl: './sprint-taskform-task.component.html',
  styleUrls: ['./sprint-taskform-task.component.css']
})
export class SprintTaskformTaskComponent implements OnInit {

  DialogRef!: MatDialogRef<TaskdetailComponent>;

  @Input() sprintTaskItem!:task;

  constructor(public dialog:MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(TaskdetailComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data:this.sprintTaskItem,
    });

  }
}