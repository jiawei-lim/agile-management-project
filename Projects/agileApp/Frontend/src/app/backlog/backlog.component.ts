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

  
  taskLists:task[] = [];

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
          this.db.getTasks().subscribe(res=>{
            this.taskLists = res
          })
        },err=>{
        })
        

        this.dialog.closeAll();
    });
  }

}
