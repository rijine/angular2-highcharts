import { ModuleWithProviders } from '@angular/core';
import { ChartComponent } from './chart.component';
import { ChartSeriesComponent } from './chart-series.component';
import { ChartPointComponent } from './chart-point.component';
import { ChartXAxisComponent } from './chart-x-axis.component';
import { ChartYAxisComponent } from './chart-y-axis.component';
import { HighchartsStatic } from './highcharts.service';
export declare class ChartModule {
    static forRoot(highchartsStatic: HighchartsStatic, ...highchartsModules: Array<Function>): ModuleWithProviders;
}
export { ChartComponent, ChartSeriesComponent, ChartPointComponent, ChartXAxisComponent, ChartYAxisComponent };
