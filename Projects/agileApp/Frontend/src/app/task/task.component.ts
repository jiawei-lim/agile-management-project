import { Component, OnInit, Input } from '@angular/core';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';
import { task } from '../types';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  colorMappings = {
    "High":"#d17977",
    "Medium":"#FFDDA2",
    "Low":"#C9FFA2"
  }

  DialogRef!: MatDialogRef<TaskdetailComponent>;

  @Input() taskItem!:task;

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(TaskdetailComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data:this.taskItem,
    });

  }

  //delete

}
