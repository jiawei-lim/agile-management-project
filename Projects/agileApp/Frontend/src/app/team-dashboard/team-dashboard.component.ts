import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MemberformComponent } from '../memberform/memberform.component';
import { DbService } from '../services/db.service';
import { team } from '../types';


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
    this.getTeam()
    
   
  }

  getTeam():void{
    this.db.getMembers().subscribe(res=>{
      this.teamlist=res;
    })
  }

  openForm():void{
    this.DialogRef = this.dialog.open(MemberformComponent)
    this.DialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log("submit",result)
      this.db.insertMember(result).subscribe(res=>{
        this.db.getMembers().subscribe(res=>{
          this.teamlist = res
        })
        
      },err=>{
        console.log(err)
      })
      
      this.dialog.closeAll();
  });
  }

  onEdit(member:team):void{
    this.DialogRef= this.dialog.open(MemberformComponent,{data:member})

    this.DialogRef.componentInstance.submitClicked.subscribe(result=>{
      this.db.updateMember(result).subscribe(res=>{
          console.log("success");
          this.getTeam()
      },err=>{
        console.log(err)
      })
      
      this.DialogRef.close()
    })
  } 

  onDelete(member:team):void{
    console.log("Delete this:",member)
    this.db.deleteMember(member).subscribe(res=>{
      console.log("Success");
      this.getTeam();
      console.log(this.teamlist)
      
    },err=>{

    })
  }

}
