import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from '../services/db.service';
import { team, activity } from '../types';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-member-barchart',
  templateUrl: './member-barchart.component.html',
  styleUrls: ['./member-barchart.component.css']
})
export class MemberBarchartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {}
  oneToOneFlag: boolean = true;

  activityList: activity[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: team,
    private db: DbService
  ) { }

  ngOnInit(): void {
    this.getData();
    // this.getSeries(this.activityList);
  }

  getData(): void {
    // this.data stores the member info [team]
    // this.activityList stores the activities of the member [activity]
    this.db.getAllActivity().subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          if (this.data.member_id == res[i].member_id) {
            this.activityList.push(res[i]);
          }
        }
        this.getSeries(this.activityList);
      },
      err => { console.log(err) }
    )
  }

  calculateTime(time: string): number {
    const a = time.split(":")
    const hour = Number((Number(a[0]) + Number(a[1]) / 60 + Number(a[2]) / 3600).toPrecision(3))

    return hour
  }

  getSeries(activityList: activity[]): void {
    console.log(activityList);

    let unique_days: String[] = [];
    for (let i = 0; i < activityList.length; i++) {
      let unique = true;
      for (let j = 0; j < unique_days.length; j++) {
        if (activityList[i].activity_datetime == unique_days[j]) {
          unique = false;
        }
      }
      if (unique) {
        unique_days.push(activityList[i].activity_datetime);
      }
    }

    let unique_tasks: Number[] = [];
    for (let i = 0; i < activityList.length; i++) {
      let unique = true;
      for (let j = 0; j < unique_tasks.length; j++) {
        if (activityList[i].task_id == unique_tasks[j]) {
          unique = false;
        }
      }
      if (unique) {
        unique_tasks.push(activityList[i].task_id);
      }
    }

    let series = [];

    for (let i = 0; i < unique_tasks.length; i++) {

      let name = '';
      for (let j = 0; j < activityList.length; j++) {
        if (unique_tasks[i] == activityList[j].task_id) {
          name = activityList[j].activity_desc;
          break;
        }
      }

      let data: Number[] = [];
      let date: String[] = [];
      for (let j = 0; j < unique_days.length; j++) {
        for (let k = 0; k < activityList.length; k++) {
          if (unique_days[j] == activityList[k].activity_datetime && name == activityList[k].activity_desc) {
            data.push(this.calculateTime(activityList[k].activity_dur));
            date.push(activityList[k].activity_datetime)
          } else if (name == activityList[k].activity_desc) {
            data.push(0);
            date.push(activityList[k].activity_datetime)
          }
        }
      }

      let temp = {
        name: name,
        data: data,
        date: date
      }
      series.push(temp);
    }

    console.log("series",series);
    this.processChartData(series);
  }

  processChartData(data: any): void {
    let dates = [];
    let series = [];
    for (let i = 0; i < data.length; i++) {
      let temp = {
        name: data[i].name,
        data: data[i].data,
        showInLegend: true
      }
      series.push(temp);
    }
    
    for (let i = 0; i < data[0].date.length; i++) {
      dates.push(data[0].date[i]);
    }

    this.getChart(dates, series)
  }

  getChart(dates: any, series: any): void {
    // make the chart based on the days and tasks
    this.chartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: this.data.member_name + "'s Effort"
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        y: 20,
        itemMarginBottom: 10
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        title: {
          text: 'Hours'
        },
        labels: {
          overflow: 'justify'
        }
      },
      series: <Highcharts.SeriesOptionsType[]>series
    }

    console.log(this.chartOptions);
  }

}