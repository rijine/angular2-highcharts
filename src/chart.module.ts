import { NgModule, ModuleWithProviders } from '@angular/core';

import { ChartComponent } from './components/chart.component';
import { ChartSeriesComponent } from './components/chart-series.component';
import { ChartPointComponent } from './components/chart-point.component';
import { ChartXAxisComponent } from './components/chart-x-axis.component';
import { ChartYAxisComponent } from './components/chart-y-axis.component';
import { HighchartsStatic } from './services/highcharts.service'

const CHART_DIRECTIVES: any[] = [
    ChartComponent,
    ChartSeriesComponent,
    ChartPointComponent,
    ChartXAxisComponent,
    ChartYAxisComponent
];

@NgModule({
    declarations: [CHART_DIRECTIVES],
    exports: [CHART_DIRECTIVES]
})
export class ChartModule {
    static forRoot(highchartsStatic: HighchartsStatic, ...highchartsModules: Array<Function>): ModuleWithProviders {
        // Plug highcharts modules
        highchartsModules.forEach((module) => {
            module(highchartsStatic)
        });

        return {
            ngModule: ChartModule,
            providers: [
                { provide: HighchartsStatic, useValue: highchartsStatic }
            ]
        }
    }
}