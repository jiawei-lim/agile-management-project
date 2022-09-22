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
    console.log("timelog:",this.timeDataForm.value)
    this.data.total_time = this.timeDataForm.value

    this.submitClicked.emit(this.data)
  }
}
