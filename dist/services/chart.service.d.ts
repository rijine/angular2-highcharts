import { DeepAssignService } from './deep-assign.service';
import { HighchartsService } from "./highcharts.service";
export declare class ChartService {
    private deepAssignService;
    constructor(deepAssignService: DeepAssignService);
    init(highchartsService: HighchartsService, userOpts: any, baseOpts: any, type: string): any;
    createBaseOpts(chartCmp: any, seriesCmp: any, pointCmp: any, xAxisCmp: any, yAxisCmp: any, element: any): any;
}
