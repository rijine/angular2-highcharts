import { AfterViewInit, Input, ElementRef, Component, Output, OnDestroy, EventEmitter, ContentChild, NgZone } from '@angular/core';

import { ChartSeriesComponent } from './chart-series.component';
import { ChartXAxisComponent } from './chart-x-axis.component';
import { ChartYAxisComponent } from './chart-y-axis.component';
import { HighchartsService } from '../services/highcharts.service';
import { ChartEvent } from '../models/chart-event.model';
import { ChartService } from '../services/chart.service';
import { DeepAssignService } from "../services/deep-assign.service";

@Component({
    selector: 'chart',
    template: '&nbsp;',
    styles: [':host {display: block;}'],
    providers: [ HighchartsService, ChartService, DeepAssignService ],
})
export class ChartComponent implements AfterViewInit, OnDestroy {
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

    zone: NgZone;
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
            this.zone.runOutsideAngular(() => {
                this.chart = this.chartService.init(this.highchartsService, this.userOpts, this.baseOpts, this.type);
                this.create.emit(this.chart);
            });
        }
    }

    public ngAfterViewInit() {
        this.baseOpts = this.chartService.createBaseOpts(this, this.series, this.series ? this.series.point : null, this.xAxis, this.yAxis, this.element.nativeElement);
        this.init();
    }

    public ngOnDestroy() {
        if(this.chart && typeof this.chart.destroy === 'function') this.chart.destroy();
    }

    constructor(element: ElementRef, highchartsService: HighchartsService, zone: NgZone, private chartService: ChartService) {
        this.element = element;
        this.highchartsService = highchartsService;
        this.zone = zone;
    }
}
