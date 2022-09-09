import { Component, OnInit, EventEmitter, Output,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from '../types';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();
  
  constructor(public dialogRef: MatDialogRef<TaskdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private db:DbService) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onDelete():void{
    this.db.deleteTask(this.data).subscribe(res=>{
          
    },err=>{
      
    })
  }

}
