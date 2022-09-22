import { Component, OnInit, EventEmitter, Output,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from '../types';
import { DbService } from '../services/db.service';
import { TaskformComponent } from '../taskform/taskform.component';
import { TaskListServicesService } from '../services/task-list-services.service';
import { TimelogComponent } from '../timelog/timelog.component';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();

  DialogRef!: MatDialogRef<TaskformComponent>;
  DialogRef2!:MatDialogRef<TimelogComponent>;
  
  constructor(public dialogRef: MatDialogRef<TaskdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private db:DbService,
    private dialog:MatDialog,
    private notification:TaskListServicesService) { }

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.data.total_time)
  }

  onEdit(){
    this.DialogRef = this.dialog.open(TaskformComponent,{
      data:this.data
    })

    this.DialogRef.componentInstance.updateClicked.subscribe(res=>{
      console.log(res)
      this.db.updateTask(res).subscribe(res=>{
        console.log("Good")
        this.dialogRef.close()
        this.notification.sendNotification(true)
        // location.reload()
      },err=>console.log(err))
    })
    
  }

  onDelete():void{
    this.db.deleteTask(this.data).subscribe(res=>{
      console.log("Success")
      this.dialogRef.close()
      this.notification.sendNotification(true)
      // location.reload()
    },err=>{
      console.log(err)
    })
  }
  
  addTime():void{
    this.DialogRef2 = this.dialog.open(TimelogComponent,{
      data:this.data
    })
    this.DialogRef2.componentInstance.submitClicked.subscribe(result=>{
      this.db.updateTask(result).subscribe(res=>{
        console.log("taskdetail:",result)
        this.DialogRef2.close()
        this.dialogRef.close()
        this.notification.sendNotification(true)
      },err=>console.log(err))
    
      
    })
    

  //   this.DialogRef2.componentInstance.submitClicked.subscribe(result => {

  //     this.db.updateTask(result).subscribe(res=>{
  //       console.log(result)
  //       this.db.getTasks().subscribe(res=>{
  //         this.taskLists = res
  //       })
  //     },err=>{
  //     })
      

  //     this.dialog.closeAll();
  // });
  }
}
