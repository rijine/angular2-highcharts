import { ModuleWithProviders } from '@angular/core';
import { HighchartsStatic } from './highcharts.service';
export declare class ChartModule {
    static forRoot(highchartsStatic: HighchartsStatic, ...highchartsModules: Array<Function>): ModuleWithProviders;
}
