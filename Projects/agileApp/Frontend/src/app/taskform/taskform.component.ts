import { Component, OnInit,Output,Inject,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from '../types';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();

  constructor(public dialogRef: MatDialogRef<TaskformComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }


  createFunc(taskData:any){
    const date = new Date();
    const today = date.toDateString();
    taskData.create_date = today;
    this.submitClicked.emit(taskData);
  }

}
