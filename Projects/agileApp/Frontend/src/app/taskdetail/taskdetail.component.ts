import { Component, OnInit, EventEmitter, Output,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from '../types';
import { DbService } from '../services/db.service';
import { TaskformComponent } from '../taskform/taskform.component';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();

  DialogRef!: MatDialogRef<TaskformComponent>;
  
  constructor(public dialogRef: MatDialogRef<TaskdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private db:DbService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onEdit(){
    this.DialogRef = this.dialog.open(TaskformComponent,{
      data:this.data
    })

    this.DialogRef.componentInstance.updateClicked.subscribe(res=>{
      console.log(res)
      this.db.updateTask(res).subscribe(res=>{
        console.log("Good")
        location.reload()
      },err=>console.log(err))
    })
  }

  onDelete():void{
    this.db.deleteTask(this.data).subscribe(res=>{
      console.log("Success")
      this.dialogRef.close()
      location.reload()
    },err=>{
      console.log(err)
    })
  }

}
