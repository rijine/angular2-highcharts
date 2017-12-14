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
var chart_series_component_1 = require("./chart-series.component");
var chart_x_axis_component_1 = require("./chart-x-axis.component");
var chart_y_axis_component_1 = require("./chart-y-axis.component");
var highcharts_service_1 = require("./highcharts.service");
var init_chart_1 = require("./init-chart");
var create_base_opts_1 = require("./create-base-opts");
var ChartComponent = (function () {
    function ChartComponent(element, highchartsService, zone) {
        this.create = new core_1.EventEmitter();
        this.click = new core_1.EventEmitter();
        this.addSeries = new core_1.EventEmitter();
        this.afterPrint = new core_1.EventEmitter();
        this.beforePrint = new core_1.EventEmitter();
        this.drilldown = new core_1.EventEmitter();
        this.drillup = new core_1.EventEmitter();
        this.load = new core_1.EventEmitter();
        this.redraw = new core_1.EventEmitter();
        this.selection = new core_1.EventEmitter();
        this.type = 'Chart';
        this.element = element;
        this.highchartsService = highchartsService;
        this.zone = zone;
    }
    Object.defineProperty(ChartComponent.prototype, "options", {
        set: function (opts) {
            this.userOpts = opts;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    ;
    ChartComponent.prototype.init = function () {
        var _this = this;
        if (this.userOpts && this.baseOpts) {
            this.zone.runOutsideAngular(function () {
                _this.chart = init_chart_1.initChart(_this.highchartsService, _this.userOpts, _this.baseOpts, _this.type);
                _this.create.emit(_this.chart);
            });
        }
    };
    ChartComponent.prototype.ngAfterViewInit = function () {
        this.baseOpts = create_base_opts_1.createBaseOpts(this, this.series, this.series ? this.series.point : null, this.xAxis, this.yAxis, this.element.nativeElement);
        this.init();
    };
    ChartComponent.prototype.ngOnDestroy = function () {
        if (this.chart && typeof this.chart.destroy === 'function')
            this.chart.destroy();
    };
    __decorate([
        core_1.ContentChild(chart_series_component_1.ChartSeriesComponent),
        __metadata("design:type", chart_series_component_1.ChartSeriesComponent)
    ], ChartComponent.prototype, "series", void 0);
    __decorate([
        core_1.ContentChild(chart_x_axis_component_1.ChartXAxisComponent),
        __metadata("design:type", chart_x_axis_component_1.ChartXAxisComponent)
    ], ChartComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.ContentChild(chart_y_axis_component_1.ChartYAxisComponent),
        __metadata("design:type", chart_y_axis_component_1.ChartYAxisComponent)
    ], ChartComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "create", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "click", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "addSeries", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "afterPrint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "beforePrint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "drilldown", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "drillup", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "load", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "redraw", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "selection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "tooltipFormatter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChartComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ChartComponent.prototype, "options", null);
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            template: '&nbsp;',
            providers: [highcharts_service_1.HighchartsService],
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, highcharts_service_1.HighchartsService, core_1.NgZone])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map