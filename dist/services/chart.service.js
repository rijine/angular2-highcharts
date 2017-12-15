"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var deep_assign_service_1 = require("./deep-assign.service");
var chart_event_model_1 = require("../models/chart-event.model");
var chart_options_1 = require("../constants/chart.options");
var ChartService = (function () {
    function ChartService(deepAssignService) {
        this.deepAssignService = deepAssignService;
    }
    ChartService.prototype.init = function (highchartsService, userOpts, baseOpts, type) {
        var Highcharts = highchartsService.getHighchartsStatic();
        if (!Highcharts) {
            throw new Error('Base Highcharts module should be set via ChartModule.init');
        }
        if (!Highcharts[type]) {
            throw new Error(type + " is unknown chart type.");
        }
        if (Array.isArray(userOpts.xAxis)) {
            baseOpts.xAxis = [baseOpts.xAxis];
        }
        if (Array.isArray(userOpts.yAxis)) {
            baseOpts.yAxis = [baseOpts.yAxis];
        }
        var opts = this.deepAssignService.deepAssign({}, baseOpts, userOpts);
        return new Highcharts[type](opts);
    };
    ChartService.prototype.createBaseOpts = function (chartCmp, seriesCmp, pointCmp, xAxisCmp, yAxisCmp, element) {
        var opts = {
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
        chart_options_1.ChartOptions.chartEvents.forEach(function (eventName) {
            opts.chart.events[eventName] = opts.chart.events[eventName] || function (event) {
                chartCmp[eventName].emit(new chart_event_model_1.ChartEvent(event, this));
            };
        });
        if (typeof chartCmp.tooltipFormatter === 'function') {
            opts.tooltip = Object.assign({}, opts.tooltip, {
                formatter: function () {
                    return chartCmp.tooltipFormatter(this);
                }
            });
        }
        if (seriesCmp) {
            chart_options_1.ChartOptions.seriesEvents.forEach(function (eventName) {
                opts.plotOptions.series.events[eventName] = opts.plotOptions.series.events[eventName] || function (event) {
                    seriesCmp[eventName].emit(new chart_event_model_1.ChartEvent(event, this));
                };
            });
        }
        if (pointCmp) {
            chart_options_1.ChartOptions.pointEvents.forEach(function (eventName) {
                opts.plotOptions.series.point.events[eventName] = opts.plotOptions.series.point.events[eventName] || function (event) {
                    pointCmp[eventName].emit(new chart_event_model_1.ChartEvent(event, this));
                };
            });
        }
        if (xAxisCmp) {
            chart_options_1.ChartOptions.xAxisEvents.forEach(function (eventName) {
                opts.xAxis.events[eventName] = opts.xAxis.events[eventName] || function (event) {
                    xAxisCmp[eventName].emit(new chart_event_model_1.ChartEvent(event, this));
                };
            });
        }
        if (yAxisCmp) {
            chart_options_1.ChartOptions.yAxisEvents.forEach(function (eventName) {
                opts.yAxis.events[eventName] = opts.yAxis.events[eventName] || function (event) {
                    yAxisCmp[eventName].emit(new chart_event_model_1.ChartEvent(event, this));
                };
            });
        }
        return opts;
    };
    ChartService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [deep_assign_service_1.DeepAssignService])
    ], ChartService);
    return ChartService;
}());
exports.ChartService = ChartService;
//# sourceMappingURL=chart.service.js.map