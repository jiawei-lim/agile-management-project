import { Component, OnInit } from '@angular/core';
import { task,priority } from '../types';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TaskformComponent } from '../taskform/taskform.component';
import { DbService } from '../services/db.service';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  
  taskLists:task[] = [
    {
      name: "Name",
      description:"Desc",
      status:"To do",
      priority: "High",
      tag: "Technical",
      assignee:"LJW",
      storypoint:"testing",
      create_date:"testing",
      due_date:"testing"
  },
  {
    name: "To do somehting",
    description:"Lorem ipsum si dolar amet wodmwdwd",
    status:"Completed",
    priority: "High",
    tag: "Technical",
    assignee:"LJW",
    storypoint:"testing",
    create_date:"3/8/2022",
    due_date:"testing"
  }
]

DialogRef: MatDialogRef<TaskformComponent>;

  constructor(public dialog: MatDialog,private db:DbService) { 
  }

  ngOnInit(): void {
    this.db.getTasks().subscribe(res=>{
      this.taskLists = res
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(TaskformComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.DialogRef.componentInstance.submitClicked.subscribe(result => {

        this.db.insertTask(result).subscribe(res=>{
          
        },err=>{
          this.db.getTasks().subscribe(res=>{
            this.taskLists = res
          })
        })
        

        this.dialog.closeAll();
    });
  }


}
