import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sprint } from '../types';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<sprint>();

  sprintDataForm: any;

  constructor(
    public dialogRef: MatDialogRef<SprintFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: sprint,
    private fb: FormBuilder
  ) {
    this.sprintDataForm = this.fb.group({
      sprint_id: [null],
      sprint_name: [''],
      created_date: [''],
      start_date: [''],
      end_date: [''],
    });
  }

  ngOnInit(): void {
  }

  processData() {
    // creation date
    const date = new Date();
    const today = date.toDateString();
    this.sprintDataForm.controls['created_date'].setValue(today);

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
