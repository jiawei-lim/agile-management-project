import { Component, OnInit,Output,Inject,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task,sprint } from '../types';
import { DbService } from '../services/db.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css']
})
export class TaskformComponent implements OnInit {

  @Output() submitClicked = new EventEmitter<task>();
  @Output() updateClicked = new EventEmitter<task>();
  
  sprintList!: sprint[];
  isUpdate = false;
  formTitle = "Create new task";
  buttonName = "Create";
  taskDataForm:any;
  options:string[] = ['Story','Task','Bug','UI/UX','Maintanence']
  filteredOptions!: Observable<String[]>;
  sprintOptions:any = [{"sprint_id":null,"sprint_name":"Unassigned","start_date":"","end_date":"","sprint_status":""}];
  memberOptions:any = [{"member_id":null,"member_name":"Unassigned"}];

  constructor(
    public dialogRef: MatDialogRef<TaskformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: task,
    private fb:FormBuilder,
    public dialog: MatDialog,
    private db: DbService
    ){
      
      this.taskDataForm = this.fb.group({
        task_id:[''],
        name:[''],
        description:[''],
        status:[''],
        priority:[''],
        tag:[''],
        member_id:[null],
        story_point:[''],
        due_date:[''],
        created_date:[''],
        sprint_id:[null],
        total_time:['00:00:00']
      });


      if(data){
        this.isUpdate = true;
        this.formTitle = "Update existing task";
        this.buttonName = "Update";
        this.taskDataForm.patchValue(data)
      }

    }

  ngOnInit(): void {
    this.filteredOptions = this.taskDataForm.controls['tag'].valueChanges.pipe(
      startWith(''),map(value => this.filter(String(value))));
      this.db.getSprints().subscribe((res) => {
        this.sprintList = res
        this.sprintOptions = this.sprintOptions.concat(res);
      }, (err) => console.log(err))
    
    this.db.getMembers().subscribe(
      (res)=>{
        this.memberOptions = this.memberOptions.concat(res)
        
      },
      (err)=>console.log
    )
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

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
