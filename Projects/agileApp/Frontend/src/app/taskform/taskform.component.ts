import { Component, OnInit,Output,Inject,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task } from '../types';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();
  @Output() updateClicked = new EventEmitter<task>();
  
  isUpdate = false;
  formTitle = "Create new task";
  buttonName = "Create";
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
        created_date:[''],
        sprint_id:[null]
      });


      if(data){
        this.isUpdate = true;
        this.formTitle = "Update existing task";
        this.buttonName = "Update";
        this.taskDataForm.controls['name'].setValue(this.data.name);
        this.taskDataForm.controls['description'].setValue(this.data.description);
        this.taskDataForm.controls['due_date'].setValue(this.data.due_date);

        this.taskDataForm.controls['assignee'].setValue(this.data.assignee);
        this.taskDataForm.controls['priority'].setValue(this.data.priority);
        this.taskDataForm.controls['status'].setValue(this.data.status);
        this.taskDataForm.controls['story_point'].setValue(this.data.story_point);
        this.taskDataForm.controls['tag'].setValue(this.data.tag);
        this.taskDataForm.controls['sprint_id'].setValue(this.data.sprint_id);
      }

    }

  ngOnInit(): void {
  }


  processData(){
    if(this.buttonName==="Create"){
      const date = new Date();
      const today = date.toDateString();

      this.taskDataForm.controls['due_date'].setValue(new DatePipe('en').transform(this.taskDataForm.controls['due_date'].getRawValue(), 'yyyy-MM-dd'));

      // taskData.create_date = today;
      // this.submitClicked.emit(taskData);
      this.taskDataForm.controls['created_date'].setValue(today)
      this.submitClicked.emit(this.taskDataForm.value);
      this.dialogRef.close()
    }
    else{
      this.taskDataForm.controls['task_id'].setValue(this.data.task_id)
      this.taskDataForm.controls['due_date'].setValue(new DatePipe('en').transform(this.taskDataForm.controls['due_date'].getRawValue(), 'yyyy-MM-dd'));
      this.updateClicked.emit(this.taskDataForm.value);
      this.dialogRef.close()
    }
  }
}
