import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder,FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { activity, barChartData, barChartDates, team} from '../types';
import { DbService } from '../services/db.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-stackedbarchart',
  templateUrl: './stackedbarchart.component.html',
  styleUrls: ['./stackedbarchart.component.css']
})
export class StackedbarchartComponent implements OnInit{
  @Output() submitClicked = new EventEmitter<barChartData>();
  barChartDatesForm:any
  buttonName:string = "Confirm"
  activityList!: activity[]
  chart:any
  timeout:any = null

  constructor(public dialogRef: MatDialogRef<StackedbarchartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: team,
    private fb:FormBuilder,
    public dialog: MatDialog,
    private db: DbService) 
    {  
      this.barChartDatesForm = this.fb.group({
        start_date:[''],
        end_date:[''],
    });
  }

  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Title",
      fontFamily: "Calibri, Arial, sans-serif"
    },
    axisX:{
      title: "X",
      reversed: true
    },
    axisY:{
      title: "Y",
      includeZero: true
    },
    toolTip:  {
      shared: true
    },
    data: [{}]
  }	

  getRandomColor():string {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
        }

  ngOnInit(): void { 
    this.db.getAllActivity().subscribe(
      (res)=>{
        this.activityList = res
        console.log(res)
      },
      (err)=>console.log
    )
  }

  processData():void{
    // this.submitClicked.emit(this.barChartDatesForm.value);
    // const date = new Date();
    // const start_date = this.barChartDatesForm.controls['start_date'].setValue(new DatePipe('en').transform(this.barChartDatesForm.controls['start_date'].getRawValue(), 'yyyy-MM-dd'));
    // const end_date = this.barChartDatesForm.controls['end_date'].setValue(new DatePipe('en').transform(this.barChartDatesForm.controls['end_date'].getRawValue(), 'yyyy-MM-dd'));
    // this.activityList.filter(x => x.activity_datetime > start_date.getTime()  && x.activity_datetime < end_date.getTime())
  }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateChart();
  }

  outputChartData(list:activity[]):barChartData[]{
    let originalDataList = JSON.parse(JSON.stringify([{activity_id: 75, member_id: 16, activity_desc: 'Fix Mistake', activity_dur: '02:00:00', activity_datetime: '2022-10-21T12:00:00.000Z'},
    {activity_id: 76, member_id: 17, activity_desc: 'wdwdw', activity_dur: '03:00:00', activity_datetime: '2022-10-16T01:11:00.000Z'},
    {activity_id: 77, member_id: 16, activity_desc: 'Fix Mistake', activity_dur: '10:00:00', activity_datetime: '2022-10-28T10:00:00.000Z'},
    {activity_id: 78, member_id: 17, activity_desc: 'wdwdw', activity_dur: '10:00:00', activity_datetime: '2022-10-21T10:00:00.000Z'}]))
    let numList:number[] = []
    let dataPointsRef: {y:number, label:"String"}[]= []
    let dataList:barChartData[] = []
    let i = 0
    while(originalDataList.length != 0){
      let i = 0
      while(i < originalDataList.length){
        console.log(i)
        if (originalDataList[i].activity_desc == originalDataList[0].activity_desc){
          const series = dataPointsRef.concat([{y:this.dateConversion(originalDataList[i].activity_dur), label:originalDataList[i].activity_datetime.split(' ')[0]}])
          numList.concat([i])
          i++
        }
        else {
          i++
        }
      }
      dataList.concat([{
        type: "stackedBar",
        name: originalDataList[0].activity_desc,
        showInLegend: "true",
        yValueFormatString: "#,###k",
        color: this.getRandomColor(),
        dataPoints: dataPointsRef
        }])
      console.log(dataList)
      for (let j = 0; j < numList.length; i++){
          originalDataList.splice(numList[j], 1)
        }
      numList = []
      dataPointsRef = []
    }
    return dataList
    
  }


  updateChart(){
    this.chartOptions.data = this.outputChartData([])
    this.chart.render()
    this.timeout = setTimeout(this.updateChart, 1000)
  }

  dateConversion(x:string):number{
    let d = x.split(":")[0]
    let e = x.split(":")[1]
    let f = Number(e)/60
    return Number(d) + f
  }
}  

// const a = [{
//   type: "stackedBar",
//   name: "Product A",
//   showInLegend: "true",
//   yValueFormatString: "#,###k",
//   color: this.getRandomColor(),
//   dataPoints: [
//     {  y: 42, label: "Q1"},
//     {  y: 53, label: "Q2" },
//     {  y: 47, label: "Q3" },
//     {  y: 60, label: "Q4" }
//   ]
// },{
//   type: "stackedBar",
//   name: "Product A",
//   showInLegend: "true",
//   yValueFormatString: "#,###k",
//   color: this.getRandomColor(),
//   dataPoints: [
//     {  y: 42, label: "Q1"},
//     {  y: 53, label: "Q2" },
//     {  y: 47, label: "Q3" },
//     {  y: 60, label: "Q4" }
//   ]
// },{
//   type: "stackedBar",
//   name: "Product A",
//   showInLegend: "true",
//   yValueFormatString: "#,###k",
//   color: this.getRandomColor(),
//   dataPoints: [
//     {  y: 42, label: "Q1"},
//     {  y: 53, label: "Q2" },
//     {  y: 47, label: "Q3" },
//     {  y: 60, label: "Q4" }
//   ]
// }]
// return a

// var d = '12/12/1955 12:00:00 AM';
// d = d.split(' ')[0]


// let originalDataList = JSON.parse(JSON.stringify(this.activityList))
//     let numList:number[] = []
//     let dataPointsRef: {y:number, label:"String"}[]= []
//     let dataList:barChartData[] = []
//     let i:number = 0;
//     while(originalDataList < 0){
//       while(i < originalDataList.length)
//         if (originalDataList[i].activity_desc == originalDataList[0].activity_desc){
//           dataPointsRef.concat([{y:this.dateConversion(originalDataList[i].activity_dur), label:originalDataList[i].activity_datetime.split(' ')[0]}])
//           numList.concat([i])
//         }
//       dataList.concat([{
//         type: "stackedBar",
//         name: originalDataList[0].activity_desc,
//         showInLegend: "true",
//         yValueFormatString: "#,###k",
//         color: this.getRandomColor(),
//         dataPoints: dataPointsRef
//         }])
//       for (let j = 0; j < numList.length; i++){
//           originalDataList.splice(numList[j], 1)
//         }
//       numList = []
//       dataPointsRef = []
//       i -= i
//     }
    // return dataList
[{activity_id: 75, member_id: 16, activity_desc: 'Fix Mistake', activity_dur: '02:00:00', activity_datetime: '2022-10-21T12:00:00.000Z'},
{activity_id: 76, member_id: 17, activity_desc: 'wdwdw', activity_dur: '03:00:00', activity_datetime: '2022-10-16T01:11:00.000Z'},
{activity_id: 77, member_id: 16, activity_desc: 'Fix Mistake', activity_dur: '10:00:00', activity_datetime: '2022-10-28T10:00:00.000Z'},
{activity_id: 78, member_id: 17, activity_desc: 'wdwdw', activity_dur: '10:00:00', activity_datetime: '2022-10-21T10:00:00.000Z'}]