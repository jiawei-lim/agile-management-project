import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MemberformComponent } from '../memberform/memberform.component';
import { DbService } from '../services/db.service';
import { team } from '../types';
import { filter } from 'rxjs';


@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css'],
})
export class TeamDashboardComponent implements OnInit {
  DialogRef!: MatDialogRef<MemberformComponent>;
  teamlist:team[] = [];
  

  constructor(public dialog: MatDialog,private db:DbService) { }

  ngOnInit(): void {
    this.db.getMembers().subscribe(res=>{
      this.teamlist=res;
      console.log(res)
    })
   
  }

  openForm():void{
    this.DialogRef = this.dialog.open(MemberformComponent)
    this.DialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log("submit",result)
      this.db.insertMember(result).subscribe(res=>{
        
      },err=>{
        console.log(err)
      })

      this.dialog.closeAll();
  });
  }

}
