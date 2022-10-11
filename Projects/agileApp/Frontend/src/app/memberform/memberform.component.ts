import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { team } from '../types';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormControl } from '@angular/forms';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.css']
})
export class MemberformComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<team>();
  teamDataForm:any

  constructor(
    public dialogRef: MatDialogRef<MemberformComponent>,
    @Inject(MAT_DIALOG_DATA)public data:team,
    private fb:FormBuilder) { 
      this.teamDataForm = this.fb.group({
        member_id:[''],
        member_name:[''],
        member_email:['']
      })   }

  ngOnInit(): void {
  }


  addMember():void{
    this.submitClicked.emit(this.teamDataForm.value);
    this.dialogRef.close();
  }
}
