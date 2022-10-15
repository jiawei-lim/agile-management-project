import { Component, OnInit, Input } from '@angular/core';
import { TaskdetailComponent } from '../taskdetail/taskdetail.component';
import { task,team } from '../types';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  member_data:team;
  colorMappings = {
    "High":"#d17977",
    "Medium":"#FFDDA2",
    "Low":"#C9FFA2"
  }

  DialogRef!: MatDialogRef<TaskdetailComponent>;

  @Input() taskItem!:task;

  constructor(public dialog:MatDialog,private db:DbService) {
    
   }

  ngOnInit(): void {
    this.db.getMemberName(this.taskItem.member_id).subscribe(
      (res)=>{this.member_data = res[0]},
      (err)=>console.log
    )
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(TaskdetailComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data:this.taskItem,
    });

    

  }

  //delete

}
