import { Component, EventEmitter, Inject, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder,FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { activity, barChartData, barChartDates } from '../types';
import { DbService } from '../services/db.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-stackedbarchart',
  templateUrl: './stackedbarchart.component.html',
  styleUrls: ['./stackedbarchart.component.css']
})
export class StackedbarchartComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<barChartData>();
  barChartDatesForm:any
  buttonName:string = "Confirm"
  activityList!: activity[]
  barChartDataList!: barChartData[]
  chart:any

  constructor(public dialogRef: MatDialogRef<StackedbarchartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: barChartDates,
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
    data: [{
      type: "stackedBar",
      name: "Product A",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: this.getRandomColor(),
      dataPoints: [
        {  y: 42, label: "Q1"},
        {  y: 53, label: "Q2" },
        {  y: 47, label: "Q3" },
        {  y: 60, label: "Q4" }
      ]
    },{
      type: "stackedBar",
      name: "Product A",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: this.getRandomColor(),
      dataPoints: [
        {  y: 42, label: "Q1"},
        {  y: 53, label: "Q2" },
        {  y: 47, label: "Q3" },
        {  y: 60, label: "Q4" }
      ]
    },{
      type: "stackedBar",
      name: "Product A",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: this.getRandomColor(),
      dataPoints: [
        {  y: 42, label: "Q1"},
        {  y: 53, label: "Q2" },
        {  y: 47, label: "Q3" },
        {  y: 60, label: "Q4" }
      ]
    }]
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
      },
      (err)=>console.log
    )
  }

  ngOnChanges(changes: SimpleChange): void{
    
  }

  processData():void{
    this.submitClicked.emit(this.barChartDatesForm.value);
    const date = new Date();
    this.barChartDatesForm.controls['start_date'].setValue(new DatePipe('en').transform(this.barChartDatesForm.controls['start_date'].getRawValue(), 'yyyy-MM-dd'));
    this.barChartDatesForm.controls['end_date'].setValue(new DatePipe('en').transform(this.barChartDatesForm.controls['end_date'].getRawValue(), 'yyyy-MM-dd'));
    // this.activityList.filter(x => x.activity_datetime >  && x.activity_datetime < )
    this.barChartDataList = this.outputChartData()
    // this.getChartInstance()
  }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateChart();
  }

  outputChartData():barChartData[]{
    // let activity:activity = this.activityList[0]
    // let barChartDataList:barChartData[]=[]
    // let dataPoints1:{y:number, label:string}[]=[]
    // console.log(this.activityList)
    // dataPoints1.concat([{y:10, label:"Q1"}])
    // console.log(dataPoints1)
    // barChartDataList.concat([{
    //   type: "stackedBar",
    //   name: "Q1",
    //   showInLegend: "true",
    //   yValueFormatString: "#,###k",
    //   color: this.getRandomColor(),
    //   dataPoints: dataPoints1
    // }])
    
    
    return [{
      type: "stackedBar",
      name: "Product A",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: this.getRandomColor(),
      dataPoints: [
        {  y: 42, label: "Q1"},
        {  y: 53, label: "Q2" },
        {  y: 47, label: "Q3" },
        {  y: 60, label: "Q4" }
      ]
    },{
      type: "stackedBar",
      name: "Product A",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: this.getRandomColor(),
      dataPoints: [
        {  y: 42, label: "Q1"},
        {  y: 53, label: "Q2" },
        {  y: 47, label: "Q3" },
        {  y: 60, label: "Q4" }
      ]
    },{
      type: "stackedBar",
      name: "Product A",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: this.getRandomColor(),
      dataPoints: [
        {  y: 42, label: "Q1"},
        {  y: 53, label: "Q2" },
        {  y: 47, label: "Q3" },
        {  y: 60, label: "Q4" }
      ]
    }]
  }

  updateChart(){
    this.chart.render()
  }
}




// [{
//   type: "stackedBar",
//   name: "Product A",
//   showInLegend: "true",
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
//   color: this.getRandomColor(),
//   dataPoints: [
//     {  y: 42, label: "Q1"},
//     {  y: 53, label: "Q2" },
//     {  y: 47, label: "Q3" },
//     {  y: 60, label: "Q4" }
//   ]
// }]
