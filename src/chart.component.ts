import { Input, ElementRef, Component, Output, EventEmitter, ContentChild } from '@angular/core';

import { ChartSeriesComponent } from './chart-series.component';
import { ChartXAxisComponent } from './chart-x-axis.component';
import { ChartYAxisComponent } from './chart-y-axis.component';
import { HighchartsService } from './highcharts.service';
import { ChartEvent } from './chart-event.model';
import { initChart } from './init-chart';
import { createBaseOpts } from './create-base-opts';

@Component({
    selector: 'chart',
    template: '&nbsp;',
    providers: [HighchartsService],
})
export class ChartComponent {
    @ContentChild(ChartSeriesComponent) series: ChartSeriesComponent;
    @ContentChild(ChartXAxisComponent) xAxis: ChartXAxisComponent;
    @ContentChild(ChartYAxisComponent) yAxis: ChartYAxisComponent;
    @Output() create = new EventEmitter<any>();
    @Output() click = new EventEmitter<ChartEvent>();
    @Output() addSeries = new EventEmitter<ChartEvent>();
    @Output() afterPrint = new EventEmitter<ChartEvent>();
    @Output() beforePrint = new EventEmitter<ChartEvent>();
    @Output() drilldown = new EventEmitter<ChartEvent>();
    @Output() drillup = new EventEmitter<ChartEvent>();
    @Output() load = new EventEmitter<ChartEvent>();
    @Output() redraw = new EventEmitter<ChartEvent>();
    @Output() selection = new EventEmitter<ChartEvent>();
    @Input() tooltipFormatter;

    chart: any;
    element: ElementRef;
    highchartsService : HighchartsService;

    private userOpts: any;
    private baseOpts: any;
    @Input() type: string = 'Chart';
    @Input() set options(opts : any) {
        this.userOpts = opts;
        this.init();
    };

    private init() {
        if (this.userOpts && this.baseOpts) {
            this.chart = initChart(this.highchartsService, this.userOpts, this.baseOpts, this.type);
            this.create.emit(this.chart);
        }
    }

    ngAfterViewInit() {
        this.baseOpts = createBaseOpts(this, this.series, this.series ? this.series.point : null, this.xAxis, this.yAxis, this.element.nativeElement);
        this.init();
    }

    constructor(element: ElementRef, highchartsService : HighchartsService) {
        this.element = element;
        this.highchartsService = highchartsService;
    }
}
