import { Component, OnInit,Inject,EventEmitter,Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { activity } from '../types';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-timeform',
  templateUrl: './timeform.component.html',
  styleUrls: ['./timeform.component.css']
})
export class TimeformComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<activity>();
  @Output() updateClicked = new EventEmitter<activity>();

  buttonName = "Create";
  activityDataForm:any;
  memberOptions:any;

  constructor(
    public dialogRef: MatDialogRef<TimeformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: activity,private fb:FormBuilder,
    private db:DbService) { 
    this.activityDataForm = this.fb.group({
      member_id:[''],
      activity_desc:[''],
      activity_datetime:[''],
      datetime_hour:[''],
      datetime_minutes:[''],
      dur_hour:[''],
      dur_minutes:['']
    });

    if(data){
      this.buttonName = "Update";
      this.activityDataForm.patchValue(data)
      let act_date = new Date(this.data.activity_datetime)

      this.activityDataForm.controls['datetime_hour'].setValue(act_date.getUTCHours())
      this.activityDataForm.controls['datetime_minutes'].setValue(act_date.getUTCMinutes())

      this.activityDataForm.controls['dur_hour'].setValue(this.data.activity_dur.substring(0,2))
      this.activityDataForm.controls['dur_minutes'].setValue(this.data.activity_dur.substring(3,5))
    }
  }

  ngOnInit(): void {
    this.db.getMembers().subscribe(
      (res)=>{
        this.memberOptions = res;
      },
      (err)=>console.log
    )
  }

  processData(){
    if(this.data){
      let tempData = this.activityDataForm.value
      let actJson:activity = {
        activity_id:this.data.activity_id,
        member_id:tempData.member_id,
        activity_dur:this.formatTimeStr(this.activityDataForm),
        activity_datetime:this.formatDatetimeStr(this.activityDataForm),
        activity_desc:tempData.activity_desc,
        task_id:this.data.task_id
      }
      this.updateClicked.emit(actJson) 
    }else{
      let tempData = this.activityDataForm.value
      let actJson:activity = {
      activity_id:null,
      member_id:tempData.member_id,
      activity_dur:this.formatTimeStr(this.activityDataForm),
      activity_datetime:this.formatDatetimeStr(this.activityDataForm),
      activity_desc:tempData.activity_desc,
      task_id:null
    }
      this.submitClicked.emit(actJson);
    }
    this.dialogRef.close()
  }

  formatDatetimeStr(dataForm:any):string{
    let date = new Date(dataForm.value.activity_datetime)
    let dateStr = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getDate()).slice(-2)
      
    let timeStr = String(dataForm.value.datetime_hour).padStart(2,'0') +":" + String(dataForm.value.datetime_minutes).padStart(2,'0') +":00"
    return dateStr + "T" +timeStr+"Z"
  }

  formatTimeStr(dataForm:any):string{
    let hour = dataForm.value.dur_hour
    let minute = dataForm.value.dur_minutes
    return String(hour).padStart(2,'0') + ":" + String(minute).padStart(2,'0')+":00"
  }
}
