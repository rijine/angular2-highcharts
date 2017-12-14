import {Component, AfterViewInit, DoCheck} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'app';
  counter = 0;
  options: Object;

  constructor() {
    this.options = {
      title: {text: 'simple chart'},
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }

  ngDoCheck() {
    this.counter++;
  }
}
