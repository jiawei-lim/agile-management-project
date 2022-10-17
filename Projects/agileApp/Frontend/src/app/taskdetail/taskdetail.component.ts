import { Component, OnInit, EventEmitter, Output,Inject,ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task,activity,team } from '../types';
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

  sprintName = "";

  DialogRef!: MatDialogRef<TaskformComponent>;
  DialogRef2!:MatDialogRef<TimelogComponent>;
  TimeDialogRef!:MatDialogRef<TimeformComponent>;

  activity_data!:activity[];
  displayedColumns: string[] = ['member_id', 'activity_desc', 'activity_datetime', 'activity_dur','actions'];
  dataSource!:MatTableDataSource<activity>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort!: MatSort;
  member_arr!:team[];
  assignee = '';


  constructor(public dialogRef: MatDialogRef<TaskdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private db:DbService,
    private dialog:MatDialog,
    private notification:TaskListServicesService) { 
      
    }

  ngOnInit(): void {
    console.log(this.data)
    this.db.getAllActivity().subscribe(
      (res)=>{
        this.activity_data = res.filter((x:activity)=>x.task_id==this.data.task_id)
        this.dataSource = new MatTableDataSource<activity>(this.activity_data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err)=>console.log
    )
    this.db.getSprints().subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].sprint_id == this.data.sprint_id) {
            this.sprintName = res[i].sprint_name
            break;
          }
        }
      },
      err => { console.log(err) }
    )
    this.db.getMembers().subscribe(
      res => {
        this.member_arr = res;
        for (let i = 0; i < res.length; i++) {
          if (res[i].member_id == this.data.member_id) {
            this.assignee = res[i].member_name;
            break;
          }
        }
      }
    )
    console.log(this.data);
  }

  ngAfterViewInit(): void {
    
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
      res => {
        console.log(res)
        this.activity_data = res.filter(x=>x.task_id==this.data.task_id)
        this.dataSource.data = this.activity_data;
        this.dataSource.paginator = this.paginator
      },
      err => {

      }
    )
  }

  editActivity(activity:activity){
    this.TimeDialogRef = this.dialog.open(TimeformComponent,{
      data:activity
    })
    
    this.TimeDialogRef.componentInstance.updateClicked.subscribe(
      (res)=>{
        this.db.updateActivity(res).subscribe(
          res=>{
            this.activity_data = res.filter((x:activity)=>x.task_id==this.data.task_id)
            this.dataSource.data = this.activity_data;
            this.dataSource.paginator = this.paginator
          },
          err => console.log(err)
        )
      }
    )

  }

  addActivity(){
    this.TimeDialogRef = this.dialog.open(TimeformComponent);
    this.TimeDialogRef.componentInstance.submitClicked.subscribe(
      (res)=>{
        res['task_id'] = this.data.task_id;
        this.db.insertActivity(res).subscribe(
          res => {
            this.activity_data = res.filter(x=>x.task_id==this.data.task_id)
            this.dataSource.data = this.activity_data;
            this.dataSource.paginator = this.paginator
          },
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

  mapIdtoName(member_id:number){
    return this.member_arr.filter(x=>x.member_id==member_id)[0].member_name;
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

  timeToReadable(timeStr:string){
    return new Date(timeStr).toLocaleString('en-GB', { timeZone: 'UTC' })
  }
}
