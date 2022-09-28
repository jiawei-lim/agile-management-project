import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sprint } from '../types';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {

  sprintDataForm: any;

  constructor(
    public dialogRef: MatDialogRef<SprintFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sprint,
    private fb: FormBuilder
  ) { 
    this.sprintDataForm = this.fb.group({
      sprint_id:[null],
      sprint_name: [''],
      created_date: [''],
      end_date: ['']
    });
  }

  ngOnInit(): void {
  }

}
