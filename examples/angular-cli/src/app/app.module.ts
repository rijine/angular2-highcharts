import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from '@rijine/ngx-highcharts';

import * as Highcharts from 'highcharts'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule.forRoot(Highcharts)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
