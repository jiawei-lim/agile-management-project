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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit,AfterViewInit {

  @Output() submitClicked = new EventEmitter<task>();

  DialogRef!: MatDialogRef<TaskformComponent>;
  DialogRef2!:MatDialogRef<TimelogComponent>;
  TimeDialogRef:MatDialogRef<TimeformComponent>;

  activity_data:activity[];
  displayedColumns: string[] = ['member_name', 'activity_desc', 'activity_datetime', 'activity_dur','actions'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


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
        this.dataSource = new MatTableDataSource<activity>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => console.log(err)
    )
  }

  ngAfterViewInit(): void {
    console.log("AFTERVIEW",this.dataSource.paginator)
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
    this.TimeDialogRef = this.dialog.open(TimeformComponent);
    this.TimeDialogRef.componentInstance.submitClicked.subscribe(
      (res)=>{
        res['task_id'] = this.data.task_id;
        this.db.insertActivity(res).subscribe(
          res => console.log(res),
          err => console.log(err)
        )
      }
    )
  }

  getTotalDuration(){
    let totalDur = "00:00:00";
    if(this.activity_data && this.activity_data.length>0){
      let tmp = this.activity_data.map(x=>this.timestrToSec(x.activity_dur)).reduce((acc,curr)=>acc+curr)
      totalDur = this.formatTime(tmp)
    }
    return totalDur
  }


  //https://stackoverflow.com/questions/26056434/sum-of-time-using-javascript
  timestrToSec(timestr:any):number {
    var parts = timestr.split(":");
    return (parts[0] * 3600) +
           (parts[1] * 60) +
           (+parts[2]);
  }
  
  pad(num:number) {
    if(num < 10) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }
  
  formatTime(seconds:any) {
    return [this.pad(Math.floor(seconds/3600)),
            this.pad(Math.floor(seconds/60)%60),
            this.pad(seconds%60),
            ].join(":");
  }
}
