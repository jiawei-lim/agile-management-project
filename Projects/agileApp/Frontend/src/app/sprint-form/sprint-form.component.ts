import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sprint } from '../types';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<sprint>();

  sprintDataForm: any;
  formTitle = 'Create new sprint';
  buttonName = 'Create';
  isUpdate = false;

  constructor(
    public dialogRef: MatDialogRef<SprintFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sprint,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private db: DbService
  ) {
    this.sprintDataForm = this.fb.group({
      sprint_id: [null],
      sprint_name: [""],
      start_date: [''],
      end_date: [''],
      sprint_status: [null],
    });

    if (data) {
      console.log(data);
      this.isUpdate = true;
      // change form element
      this.formTitle = "Update sprint";
      this.buttonName = "Update";
      // pre fill form inputs
      this.sprintDataForm.controls['sprint_name'].setValue(this.data.sprint_name);
      this.sprintDataForm.controls['start_date'].setValue(this.data.start_date);
      this.sprintDataForm.controls['end_date'].setValue(this.data.end_date);
    }
  }

  ngOnInit(): void {
  }

  processData() {
    // creation date
    // const date = new Date();
    // const today = date.toDateString();
    // this.sprintDataForm.controls['created_date'].setValue(today);


    // start and end dates
    this.sprintDataForm.controls['start_date'].setValue(
      new DatePipe('en').transform(
        this.sprintDataForm.controls['start_date'].getRawValue(), 'yyyy-MM-dd'
      )
    );
    this.sprintDataForm.controls['end_date'].setValue(
      new DatePipe('en').transform(
        this.sprintDataForm.controls['end_date'].getRawValue(), 'yyyy-MM-dd'
      )
    );


    // save to DB
    this.submitClicked.emit(this.sprintDataForm.value);


    // close dialog
    this.dialogRef.close();
  }

}
