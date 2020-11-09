import { Injectable } from '@angular/core';

import { DeepAssignService } from './deep-assign.service';
import { HighchartsService } from "./highcharts.service";
import { ChartEvent } from '../models/chart-event.model';
import { ChartOptions } from '../constants/chart.options';

@Injectable()
export class ChartService {

    constructor(private deepAssignService: DeepAssignService) {
    }

    init(highchartsService: HighchartsService, userOpts, baseOpts, type: string) {
        const Highcharts = highchartsService.getHighchartsStatic();

        if (!Highcharts) {
            throw new Error('Base Highcharts module should be set via ChartModule.init');
        }
        if (!Highcharts[type]) {
            throw new Error(`${type} is unknown chart type.`);
        }

        if (Array.isArray(userOpts.xAxis)) {
            baseOpts.xAxis = [baseOpts.xAxis];
        }
        if (Array.isArray(userOpts.yAxis)) {
            baseOpts.yAxis = [baseOpts.yAxis];
        }

        const opts = this.deepAssignService.deepAssign({}, baseOpts, userOpts);
        return new Highcharts[type](opts);
    }

    createBaseOpts(chartCmp, seriesCmp, pointCmp, xAxisCmp, yAxisCmp, element) {
        let opts: any = {
            chart: {
                renderTo: element,
                events: {}
            },
            plotOptions: {
                series: {
                    events: {},
                    point: {
                        events: {}
                    }
                }
            },
            xAxis: {
                events: {}
            },
            yAxis: {
                events: {}
            }
        };

        ChartOptions.chartEvents.forEach(function (eventName) {
            opts.chart.events[eventName] = opts.chart.events[eventName] || function (event: any) {
                chartCmp[eventName].emit(new ChartEvent(event, this));
            }
        });

        if (typeof chartCmp.tooltipFormatter === 'function') {
            opts.tooltip = Object.assign({}, opts.tooltip, {
                formatter: function () {
                    return chartCmp.tooltipFormatter(this)
                }
            });
        }

        if (seriesCmp) {
            ChartOptions.seriesEvents.forEach(function (eventName) {
                opts.plotOptions.series.events[eventName] = opts.plotOptions.series.events[eventName] || function (event: any) {
                    seriesCmp[eventName].emit(new ChartEvent(event, this));
                }
            });
        }

        if (pointCmp) {
            ChartOptions.pointEvents.forEach(function (eventName) {
                opts.plotOptions.series.point.events[eventName] = opts.plotOptions.series.point.events[eventName] || function (event: any) {
                    pointCmp[eventName].emit(new ChartEvent(event, this));
                }
            });
        }

        if (xAxisCmp) {
            ChartOptions.xAxisEvents.forEach(function (eventName) {
                opts.xAxis.events[eventName] = opts.xAxis.events[eventName] || function (event: any) {
                    xAxisCmp[eventName].emit(new ChartEvent(event, this));
                }
            });
        }

        if (yAxisCmp) {
            ChartOptions.yAxisEvents.forEach(function (eventName) {
                opts.yAxis.events[eventName] = opts.yAxis.events[eventName] || function (event: any) {
                    yAxisCmp[eventName].emit(new ChartEvent(event, this));
                }
            });
        }

        return opts;
    }

}