import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { activity } from '../types';

@Component({
  selector: 'app-timeform',
  templateUrl: './timeform.component.html',
  styleUrls: ['./timeform.component.css']
})
export class TimeformComponent implements OnInit {
  buttonName = "Create";
  activityDataForm:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: activity,private fb:FormBuilder) { 
    this.activityDataForm = this.fb.group({
      member_name:[''],
      activity_desc:[''],
      activity_datetime:[''],
      datetime_hour:[''],
      datetime_minutes:[''],
      dur_hour:[''],
      dur_minutes:['']
    });

    if(data){
      this.buttonName = "Update";
    }
  }

  ngOnInit(): void {
  }

  processData(){

  }

}
