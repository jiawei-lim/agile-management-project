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
    this.timeDataForm = this.fb.group({
      hour:[''],
      minutes:['']
    })
  }

  ngOnInit(): void {
  }

  logTime(name:string):void{
    var index = this.data.total_time.indexOf(":")
    var h = this.data.total_time.substring(0,index)
    var m = this.data.total_time.substring(index+1,5)
    console.log(name)
    

    // console.log(h,m)
    // console.log("timelog:",this.timeDataForm.value)
    // console.log(Number(h)+(this.timeDataForm.controls['hour'].value))
    // console.log(this.data.total_time)
    
    if(name==="add"){
      if((Number(h)+this.timeDataForm.controls['hour'].value)<10){
        h = '0' + String(Number(h)+this.timeDataForm.controls['hour'].value);
      }
      else{
        h = String(Number(h)+this.timeDataForm.controls['hour'].value);
      }

      if(Number(m)+this.timeDataForm.controls['minutes'].value<10){
        m = '0' +String(Number(m)+this.timeDataForm.controls['minutes'].value);
      }
      else{
        m = String(Number(m)+this.timeDataForm.controls['minutes'].value);
      }
    }
    else{
      if(h<this.timeDataForm.controls['hour'].value || m<this.timeDataForm.controls['minutes'].value){
        alert("Time removed more than allocated")
        return
      }
      if((Number(h)-this.timeDataForm.controls['hour'].value)<10){
        h = '0' + String(Number(h)-this.timeDataForm.controls['hour'].value);
      }
      else{
        h = String(Number(h)-this.timeDataForm.controls['hour'].value);
      }

      if(Number(m)-this.timeDataForm.controls['minutes'].value<10){
        m = '0' +String(Number(m)-this.timeDataForm.controls['minutes'].value);
      }
      else{
        m = String(Number(m)-this.timeDataForm.controls['minutes'].value);
      }
    }
    
    this.data.total_time = h+":"+m

    this.submitClicked.emit(this.data)
  }
}
