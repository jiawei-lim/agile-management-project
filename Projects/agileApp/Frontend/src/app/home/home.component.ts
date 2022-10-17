import { Component, OnInit } from '@angular/core';
import { sprint } from '../types';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeSprint: sprint[] = [];

  constructor(private db: DbService) { }

  ngOnInit(): void {
    // get active sprints
    this.db.getSprints().subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].sprint_status === 'Active') {
            this.activeSprint.push(res[i]);
          }
        }
      },
      err => { console.log(err) }
    )
  }

}