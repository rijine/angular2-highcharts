"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var chart_component_1 = require("./chart.component");
var chart_point_component_1 = require("./chart-point.component");
var chart_series_component_1 = require("./chart-series.component");
var chart_x_axis_component_1 = require("./chart-x-axis.component");
var chart_y_axis_component_1 = require("./chart-y-axis.component");
var highcharts_service_1 = require("../services/highcharts.service");
var chart_service_1 = require("../services/chart.service");
var mocks_1 = require("../mocks");
function main() {
    describe('ChartComponent', function () {
        var highchartsServiceMock;
        var chartServiceMock;
        var TestComponent = (function () {
            function TestComponent() {
            }
            TestComponent = __decorate([
                core_1.Component({
                    selector: 'test-component',
                    template: ''
                })
            ], TestComponent);
            return TestComponent;
        }());
        beforeEach(function () {
            highchartsServiceMock = new mocks_1.HighchartsServiceMock();
            chartServiceMock = new mocks_1.ChartServiceMock();
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    chart_component_1.ChartComponent,
                    chart_point_component_1.ChartPointComponent,
                    chart_series_component_1.ChartSeriesComponent,
                    chart_x_axis_component_1.ChartXAxisComponent,
                    chart_y_axis_component_1.ChartYAxisComponent,
                ],
                schemas: [
                    core_1.CUSTOM_ELEMENTS_SCHEMA,
                ],
            });
        });
        var create = function (template) {
            return testing_1.TestBed.overrideComponent(TestComponent, {
                set: {
                    template: template
                }
            }).overrideComponent(chart_component_1.ChartComponent, {
                set: {
                    providers: [
                        { provide: highcharts_service_1.HighchartsService, useValue: highchartsServiceMock },
                        { provide: chart_service_1.ChartService, useValue: chartServiceMock }
                    ]
                }
            }).compileComponents().then(function () {
                return testing_1.TestBed.createComponent(TestComponent);
            });
        };
        it('should create/destroy simple chart object', function (done) {
            create('<chart [options]="options"></chart>').then(function (fixture) {
                fixture.componentInstance.options = ['options'];
                var RealChart = highchartsServiceMock.getHighchartsStatic().Chart;
                var destroySpy;
                var chartSpy = spyOn(highchartsServiceMock.getHighchartsStatic(), 'Chart')
                    .and.callFake(function (opts) {
                    var chart = new RealChart(opts);
                    destroySpy = spyOn(chart, 'destroy');
                    return chart;
                });
                fixture.detectChanges();
                expect(chartSpy).toHaveBeenCalled();
                fixture.destroy();
                expect(destroySpy).toHaveBeenCalled();
                done();
            });
        });
        it('should emit the "create" event with HighchartsChartObject', function (done) {
            create('<chart [options]="options" (create)="onCreated($event)"></chart>').then(function (fixture) {
                fixture.componentInstance.onCreated = function (e) {
                    expect(e.constructor).toBe(mocks_1.HighchartsChartObjectMock);
                    done();
                };
                fixture.componentInstance.options = ['options'];
                fixture.detectChanges();
            });
        });
        it('should create chart asynchronously', function (done) {
            create('<chart [options]="options" (create)="onCreated($event)"></chart>').then(function (fixture) {
                fixture.componentInstance.onCreated = function (e) {
                    expect(e.constructor).toBe(mocks_1.HighchartsChartObjectMock);
                    done();
                };
                setTimeout(function () {
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                });
            });
        });
        describe('should emit Highcharts chart event', function () {
            it('"load"', function (done) {
                create('<chart [options]="options" (load)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('load');
                });
            });
            it('"addSeries"', function (done) {
                create('<chart [options]="options" (addSeries)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('addSeries');
                });
            });
            it('"afterPrint"', function (done) {
                create('<chart [options]="options" (afterPrint)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('afterPrint');
                });
            });
            it('"beforePrint"', function (done) {
                create('<chart [options]="options" (beforePrint)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('beforePrint');
                });
            });
            it('"drilldown"', function (done) {
                create('<chart [options]="options" (drilldown)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('drilldown');
                });
            });
            it('"drillup"', function (done) {
                create('<chart [options]="options" (drillup)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('drillup');
                });
            });
            it('"load"', function (done) {
                create('<chart [options]="options" (load)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('load');
                });
            });
            it('"redraw"', function (done) {
                create('<chart [options]="options" (redraw)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('redraw');
                });
            });
            it('"selection"', function (done) {
                create('<chart [options]="options" (selection)="onEvent()"></chart>').then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitChartEvent('selection');
                });
            });
        });
        describe('should emit Highcharts series event', function () {
            it('"afterAnimate"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (afterAnimate)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('afterAnimate');
                });
            });
            it('"checkboxClick"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (checkboxClick)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('checkboxClick');
                });
            });
            it('"click"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (click)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('click');
                });
            });
            it('"hide"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (hide)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('hide');
                });
            });
            it('"legendItemClick"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (legendItemClick)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('legendItemClick');
                });
            });
            it('"mouseOut"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (mouseOut)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('mouseOut');
                });
            });
            it('"mouseOver"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (mouseOver)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('mouseOver');
                });
            });
            it('"show"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series (show)=\"onEvent()\"></series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitSeriesEvent('show');
                });
            });
        });
        describe('should emit Highcharts point event', function () {
            it('"click"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series>\n                        <point (click)=\"onEvent()\">\n                        </point>\n                    </series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitPointEvent('click');
                });
            });
            it('"mouseOut"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series>\n                        <point (mouseOut)=\"onEvent()\">\n                        </point>\n                    </series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitPointEvent('mouseOut');
                });
            });
            it('"mouseOver"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series>\n                        <point (mouseOver)=\"onEvent()\">\n                        </point>\n                    </series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitPointEvent('mouseOver');
                });
            });
            it('"remove"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series>\n                        <point (remove)=\"onEvent()\">\n                        </point>\n                    </series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitPointEvent('remove');
                });
            });
            it('"select"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series>\n                        <point (select)=\"onEvent()\">\n                        </point>\n                    </series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitPointEvent('select');
                });
            });
            it('"unselect"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series>\n                        <point (unselect)=\"onEvent()\">\n                        </point>\n                    </series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitPointEvent('unselect');
                });
            });
            it('"update"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <series>\n                        <point (update)=\"onEvent()\">\n                        </point>\n                    </series>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitPointEvent('update');
                });
            });
        });
        describe('should emit Highcharts xAxis event', function () {
            it('"afterBreaks"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <xAxis (afterBreaks)=\"onEvent()\">\n                    </xAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitXAxisEvent('afterBreaks');
                });
            });
            it('"afterSetExtremes"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <xAxis (afterSetExtremes)=\"onEvent()\">\n                    </xAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitXAxisEvent('afterSetExtremes');
                });
            });
            it('"pointBreak"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <xAxis (pointBreak)=\"onEvent()\">\n                    </xAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitXAxisEvent('pointBreak');
                });
            });
            it('"pointInBreak"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <xAxis (pointInBreak)=\"onEvent()\">\n                    </xAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitXAxisEvent('pointInBreak');
                });
            });
            it('"setExtremes"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <xAxis (setExtremes)=\"onEvent()\">\n                    </xAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitXAxisEvent('setExtremes');
                });
            });
        });
        describe('should emit Highcharts yAxis event', function () {
            it('"afterBreaks"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <yAxis (afterBreaks)=\"onEvent()\">\n                    </yAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitYAxisEvent('afterBreaks');
                });
            });
            it('"afterSetExtremes"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <yAxis (afterSetExtremes)=\"onEvent()\">\n                    </yAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitYAxisEvent('afterSetExtremes');
                });
            });
            it('"pointBreak"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <yAxis (pointBreak)=\"onEvent()\">\n                    </yAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitYAxisEvent('pointBreak');
                });
            });
            it('"pointInBreak"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <yAxis (pointInBreak)=\"onEvent()\">\n                    </yAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitYAxisEvent('pointInBreak');
                });
            });
            it('"setExtremes"', function (done) {
                create("\n                <chart [options]=\"options\">\n                    <yAxis (setExtremes)=\"onEvent()\">\n                    </yAxis>\n                </chart>\n            ").then(function (fixture) {
                    fixture.componentInstance.onEvent = function () { return done(); };
                    fixture.componentInstance.options = ['options'];
                    fixture.detectChanges();
                    mocks_1.ChartEventEmitter.emitYAxisEvent('setExtremes');
                });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=chart.component.spec.js.map