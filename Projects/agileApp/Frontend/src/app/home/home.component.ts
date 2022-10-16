import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StackedbarchartComponent } from '../stackedbarchart/stackedbarchart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  DialogRef!: MatDialogRef<StackedbarchartComponent>
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.DialogRef = this.dialog.open(StackedbarchartComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
