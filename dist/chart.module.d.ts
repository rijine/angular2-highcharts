import { ModuleWithProviders } from '@angular/core';
import { HighchartsStatic } from './services/highcharts.service';
export declare class ChartModule {
    static forRoot(highchartsStatic: HighchartsStatic, ...highchartsModules: Array<Function>): ModuleWithProviders;
}
