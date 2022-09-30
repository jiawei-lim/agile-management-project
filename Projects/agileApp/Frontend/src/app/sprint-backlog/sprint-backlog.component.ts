import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DbService } from '../services/db.service';
import { SprintFormComponent } from '../sprint-form/sprint-form.component';
import { SprintTaskformComponent } from '../sprint-taskform/sprint-taskform.component';
import { sprint } from '../types';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.css']
})
export class SprintBacklogComponent implements OnInit {
  panelOpenState = false;
  sprintList!: sprint[];
  exp_sprintList: any;

  DialogRef!: MatDialogRef<SprintFormComponent> | MatDialogRef<SprintTaskformComponent> ;

  constructor(
    public dialog: MatDialog,
    private db: DbService
  ) { }

  ngOnInit(): void {
    this.db.getSprints().subscribe((res) => {
      this.sprintList = res
      this.exp_sprintList = res.map((x: any) => ({ ...x, expanded: false }));
    }, (err) => console.log(err))
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(
      SprintFormComponent,
      {
        enterAnimationDuration,
        exitAnimationDuration,
      }
    );
  }
  openDialog2(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(
      SprintTaskformComponent,
      {
        enterAnimationDuration,
        exitAnimationDuration,
      }
    );
  }

}
