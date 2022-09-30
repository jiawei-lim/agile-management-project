import { Time } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from '../types';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.css']
})
export class TimelogComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<task>();
  timeDataForm:any;


  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: task,) {
    // form field for adding time
    this.timeDataForm = this.fb.group({
      hour:[''],
      minutes:['']
    })
  }

  ngOnInit(): void {
  }


  logTime(name:string):void{
    var index = this.data.total_time.indexOf(":")
    // h is the hour allocated for this task
    var h = this.data.total_time.substring(0,index)
    // m is the minutes allocated for this task
    var m = this.data.total_time.substring(index+1,5)
    

    // console.log(h,m)
    // console.log("timelog:",this.timeDataForm.value)
    // console.log(Number(h)+(this.timeDataForm.controls['hour'].value))
    // console.log(this.data.total_time)
    
    // if the button is add
    if(name==="add"){
      //check if the h + allocated value < 10 if so add a '0' in front, otherwise no need.
      if((Number(h)+this.timeDataForm.controls['hour'].value)<10){
        h = '0' + String(Number(h)+this.timeDataForm.controls['hour'].value);
      }
      else{
        h = String(Number(h)+this.timeDataForm.controls['hour'].value);
      }

      //check if the m + allocated value < 10 if so add a '0' in front, otherwise no need
      if(Number(m)+this.timeDataForm.controls['minutes'].value<10){
        m = '0' +String(Number(m)+this.timeDataForm.controls['minutes'].value);
      }
      else{
        m = String(Number(m)+this.timeDataForm.controls['minutes'].value);
      }
    }
    else{
      // if its remove: 
        // if the removed time is more than the allocated time of the task raise an alert
      if(h<this.timeDataForm.controls['hour'].value || m<this.timeDataForm.controls['minutes'].value){
        alert("Time removed more than allocated")
        return
      }
      // check if the hour - removed hour < 10 if so add a '0' in front, otherwise no need
      if((Number(h)-this.timeDataForm.controls['hour'].value)<10){
        h = '0' + String(Number(h)-this.timeDataForm.controls['hour'].value);
      }
      else{
        h = String(Number(h)-this.timeDataForm.controls['hour'].value);
      }
      
      // check if the minute - removed minute < 10 if so add a '0' in front, otherwise no need
      if(Number(m)-this.timeDataForm.controls['minutes'].value<10){
        m = '0' +String(Number(m)-this.timeDataForm.controls['minutes'].value);
      }
      else{
        m = String(Number(m)-this.timeDataForm.controls['minutes'].value);
      }
    }
    
    // set the time spent on the task 
    this.data.total_time = h+":"+m+":00"

    // emit the task data back to task detail component
    this.submitClicked.emit(this.data)
  }
}
