import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MemberformComponent } from '../memberform/memberform.component';
import { MemberBarchartComponent } from '../member-barchart/member-barchart.component';
import { DbService } from '../services/db.service';
import { team, MemberView } from '../types';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css'],
})
export class TeamDashboardComponent implements OnInit {
  Highcharts1: typeof Highcharts = Highcharts
  Highcharts2: typeof Highcharts = Highcharts
  chartOptions1: Highcharts.Options = {}
  chartOptions2: Highcharts.Options = {}
  updateFlag1: boolean = false
  updateFlag2: boolean = false
  oneToOneFlag: boolean = true;

  DialogRef!: MatDialogRef<MemberformComponent>;
  DialogRef2!: MatDialogRef<MemberBarchartComponent>;
  teamlist: team[] = [];
  memberviewlist!: MemberView[]

  constructor(public dialog: MatDialog, private db: DbService) { }

  ngOnInit(): void {
    this.getTeam();
    console.log(this.teamlist);
    this.getView(true);

  }

  getView(isupdate: boolean): void {
    this.db.getMemberView().subscribe(res => {
      this.memberviewlist = res;
      // console.log(this.memberviewlist)
      const totaltimedata = this.memberviewlist.map((x) => ({ name: x.member_name, time: x.total_time }))
      const avgtimedata = this.memberviewlist.map((x) => ({ name: x.member_name, time: x.avg_time }))
      // console.log(totaltimedata)
      // console.log(avgtimedata)
      this.chartOptions1 = {
        chart: {
          type: 'bar',
          inverted: true
        }, title: { text: "Total Hours" }, plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        legend: {
          enabled: true,
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          y: 20,
          itemMarginBottom: 10
        }, xAxis: { categories: ['Members'] }, yAxis: { title: { text: 'Hours' }, labels: { overflow: 'justify' } }, series: <Highcharts.SeriesOptionsType[]>this.createBarSeries(totaltimedata, true)
      }


      this.chartOptions2 = {
        chart: {
          type: 'bar',
          inverted: true
        }, title: { text: "Average Hours" }, xAxis: { categories: totaltimedata.map((x) => x.name) }, yAxis: { title: { text: 'Hours' }, labels: { overflow: 'justify' } }, series: <Highcharts.SeriesOptionsType[]>this.createBarSeries(avgtimedata, false)
      }

      console.log(this.chartOptions2)
      if (isupdate) {
        this.updateFlag1 = true;
        this.updateFlag2 = true;
      }
    })
  }

  getTeam(): void {
    this.db.getMembers().subscribe(res => {
      this.teamlist = res;
    })
  }


  createBarSeries<T, U>(lst: { name: string, time: string }[], flag: boolean): { name: string, data: Number[], showInLegend: boolean }[] | { name: string, colorByPoint: boolean, data: Number[], type: string, showInLegend: boolean }[] {

    if (flag) {
      const series = lst.map((res) => ({ name: res.name, data: [this.calculateTime(res.time)], showInLegend: true }))
      // console.log(series)
      return series
    }
    else {
      const timedata = lst.map((x) => this.calculateTime(x.time))
      const series = [{ name: "average time", colorByPoint: true, data: timedata, showInLegend: false }]
      console.log(series)
      return series
    }


  }

  calculateTime(time: string): number {
    const a = time.split(":")
    const hour = Number((Number(a[0]) + Number(a[1]) / 60 + Number(a[2]) / 3600).toPrecision(3))

    return hour
  }

  openForm(): void {
    this.DialogRef = this.dialog.open(MemberformComponent)
    this.DialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log("submit", result)
      this.db.insertMember(result).subscribe(res => {

        this.getTeam();
        this.getView(true);

      }, err => {
        console.log(err)
      })

      this.dialog.closeAll();
    });
  }

  onEdit(member: team): void {
    this.DialogRef = this.dialog.open(MemberformComponent, { data: member })

    this.DialogRef.componentInstance.submitClicked.subscribe(result => {
      this.db.updateMember(result).subscribe(res => {
        console.log("success");
        this.getTeam();
        this.getView(true);

      }, err => {
        console.log(err)
      })

      this.DialogRef.close()
    })
  }

  onDelete(member: team): void {
    // console.log("Delete this:",member)
    this.db.deleteMember(member).subscribe(res => {
      console.log("Success");
      this.getTeam();
      this.getView(true);


    }, err => {

    })
  }

  onChart(member: team): void {
    this.DialogRef2 = this.dialog.open(
      MemberBarchartComponent,
      { data: member }
    )
    console.log(member);
  }

}