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

  logTime():void{
    var h;
    var m;

    console.log("timelog:",this.timeDataForm.value)
    console.log(String(this.timeDataForm.controls['hour'].value));
    if(this.timeDataForm.controls['hour'].value<10){
      h = '0' + String(this.timeDataForm.controls['hour'].value);
    }
    else{
      h = String(this.timeDataForm.controls['hour'].value);
    }

    if(this.timeDataForm.controls['minutes'].value<10){
      m = '0' +String(this.timeDataForm.controls['minutes'].value);
    }
    else{
      m = String(this.timeDataForm.controls['minutes'].value);
    }
    this.data.total_time = h+":"+m

    this.submitClicked.emit(this.data)
  }
}
