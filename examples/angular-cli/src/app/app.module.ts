import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from '@rijine/ngx-highcharts';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule.forRoot(require('highcharts/highstock'))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
