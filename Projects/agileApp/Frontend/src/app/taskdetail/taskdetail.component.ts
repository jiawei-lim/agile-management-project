import { Component, OnInit, EventEmitter, Output,Inject,ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task,activity } from '../types';
import { DbService } from '../services/db.service';
import { TaskformComponent } from '../taskform/taskform.component';
import { TaskListServicesService } from '../services/task-list-services.service';
import { TimelogComponent } from '../timelog/timelog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TimeformComponent } from '../timeform/timeform.component';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();

  DialogRef!: MatDialogRef<TaskformComponent>;
  DialogRef2!:MatDialogRef<TimelogComponent>;
  TimeDialogRef:MatDialogRef<TimeformComponent>;

  activity_data:activity[];
  displayedColumns: string[] = ['member_name', 'activity_desc', 'activity_datetime', 'activity_dur','actions'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<TaskdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private db:DbService,
    private dialog:MatDialog,
    private notification:TaskListServicesService) { 
      
    }
  

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.data.total_time)
    this.db.searchActivityByTask(this.data.task_id).subscribe(
      (res) => {
        this.activity_data = res
        this.dataSource = new MatTableDataSource<activity>(this.activity_data);
        this.dataSource.paginator = this.paginator;
      },
      (err) => console.log(err)
    )
  }
  
  // check if the task has been added to the sprint
  isSprint():boolean{
    if (this.data.sprint_id !== null){
      return true
    }
    else{
      return false
    }
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
    // open the time log dialog
    this.DialogRef2 = this.dialog.open(TimelogComponent,{
      data:this.data
    })

    //once the add/remove task button is added update the task in the db and then close the dialogues and update the display
    this.DialogRef2.componentInstance.submitClicked.subscribe(result=>{
      this.db.updateTask(result).subscribe(res=>{
        // console.log("taskdetail:",result)

        //close the timelog component dialog
        this.DialogRef2.close()
        //close the task detail dialog
        this.dialogRef.close()
        this.notification.sendNotification(true)
      },err=>console.log(err))
    
      
    })
    
  }

  deleteActivity(activity:activity){
    console.log(activity)
    this.db.deleteActivity(activity).subscribe(
      res => {console.log(res)},
      err => {console.log(err)}
    )
  }

  editActivity(activity:activity){
    this.TimeDialogRef = this.dialog.open(TimeformComponent,{
      data:activity
    })

  }

  addActivity(){
    this.TimeDialogRef = this.dialog.open(TimeformComponent)
  }
}
