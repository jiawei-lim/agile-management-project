import { Component, Input, OnInit, ɵbypassSanitizationTrustStyle } from '@angular/core';

@Component({
  selector: 'app-demo', 
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  @Input() myName = 'Jia Wei';

  constructor() { }

  ngOnInit(): void {
  }

}
