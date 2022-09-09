import { Component, OnInit,Output,Inject,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from '../types';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();
  isUpdate = false;
  formTitle = "Create new task"
  taskDataForm:any;

  constructor(
    public dialogRef: MatDialogRef<TaskformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private fb:FormBuilder
    ){
      
      this.taskDataForm = this.fb.group({
        task_id:[''],
        name:[''],
        description:[''],
        status:[''],
        priority:[''],
        tag:[''],
        assignee:[''],
        story_point:[''],
        due_date:[''],
        created_date:['']
      });


      if(data){
        this.isUpdate = true;
        this.formTitle = "Update existing task";
        this.taskDataForm.controls['name'].setValue(data.name);
        this.taskDataForm.controls['name'].setValue(data.name);
        this.taskDataForm.controls['name'].setValue(data.name);
        this.taskDataForm.controls['name'].setValue(data.name);
      }

    }

  ngOnInit(): void {
  }


  processData(){
    const date = new Date();
    const today = date.toDateString();
    // taskData.create_date = today;
    // this.submitClicked.emit(taskData);
    this.taskDataForm.controls['created_date'].setValue(today)
    this.submitClicked.emit(this.taskDataForm.value);
  }

}
