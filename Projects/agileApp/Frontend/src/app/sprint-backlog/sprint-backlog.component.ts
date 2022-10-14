import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { DbService } from '../services/db.service';
import { SprintFormComponent } from '../sprint-form/sprint-form.component';
import { sprint } from '../types';
import { TaskListServicesService } from '../services/task-list-services.service';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.css']
})
export class SprintBacklogComponent implements OnInit {
  panelOpenState = false;
  sprintList!: sprint[];
  exp_sprintList: any;
  

  DialogRef!: MatDialogRef<SprintFormComponent>;

  constructor(
    public dialog: MatDialog,
    private db: DbService,
    private notification:TaskListServicesService
  ) { }

  ngOnInit(): void {
    this.db.getSprints().subscribe((res) => {
      this.sprintList = res
      this.exp_sprintList = res.map((x: any) => ({ ...x, expanded: false }));
    }, (err) => console.log(err))

    this.notification.notificationSubject.pipe(filter((s)=>s==true)).subscribe((_)=>{
      this.db.getSprints().subscribe(res=>{this.sprintList=res})
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(
      SprintFormComponent,
      {
        enterAnimationDuration,
        exitAnimationDuration,
      }
    );

    this.DialogRef.componentInstance.submitClicked.subscribe(res=>{
      console.log(res)
      this.db.insertSprints(res).subscribe(res=>{
        console.log(res)
        this.notification.sendNotification(true);
      },err=>console.log(err))
    })
  }

  colorPicker(){
    return "red"
  }

}
