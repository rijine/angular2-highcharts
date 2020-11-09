"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chart_component_1 = require("./components/chart.component");
var chart_series_component_1 = require("./components/chart-series.component");
var chart_point_component_1 = require("./components/chart-point.component");
var chart_x_axis_component_1 = require("./components/chart-x-axis.component");
var chart_y_axis_component_1 = require("./components/chart-y-axis.component");
var highcharts_service_1 = require("./services/highcharts.service");
var CHART_DIRECTIVES = [
    chart_component_1.ChartComponent,
    chart_series_component_1.ChartSeriesComponent,
    chart_point_component_1.ChartPointComponent,
    chart_x_axis_component_1.ChartXAxisComponent,
    chart_y_axis_component_1.ChartYAxisComponent
];
var ChartModule = (function () {
    function ChartModule() {
    }
    ChartModule_1 = ChartModule;
    ChartModule.forRoot = function (highchartsStatic) {
        var highchartsModules = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            highchartsModules[_i - 1] = arguments[_i];
        }
        highchartsModules.forEach(function (module) {
            module(highchartsStatic);
        });
        return {
            ngModule: ChartModule_1,
            providers: [
                { provide: highcharts_service_1.HighchartsStatic, useValue: highchartsStatic }
            ]
        };
    };
    ChartModule = ChartModule_1 = __decorate([
        core_1.NgModule({
            declarations: [CHART_DIRECTIVES],
            exports: [CHART_DIRECTIVES],
            providers: []
        })
    ], ChartModule);
    return ChartModule;
    var ChartModule_1;
}());
exports.ChartModule = ChartModule;
//# sourceMappingURL=chart.module.js.map