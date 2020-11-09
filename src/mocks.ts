import { Injectable } from '@angular/core';

let opts;

export class ChartEventEmitter {
    static emitChartEvent(eventName) {
        opts.chart.events[eventName]();
    }

    static emitSeriesEvent(eventName) {
        opts.plotOptions.series.events[eventName]();
    }

    static emitPointEvent(eventName) {
        opts.plotOptions.series.point.events[eventName]();
    }

    static emitXAxisEvent(eventName) {
        opts.xAxis.events[eventName]();
    }

    static emitYAxisEvent(eventName) {
        opts.yAxis.events[eventName]();
    }
}

export class HighchartsChartObjectMock {
    constructor (_opts) {
        opts = _opts;
    }

    public destroy() {}
}
const highchartsStatic =  {
    Chart : HighchartsChartObjectMock,
    StockChart : HighchartsChartObjectMock
};

@Injectable()
export class HighchartsServiceMock {
    getHighchartsStatic() {
        return highchartsStatic;
    }
}

@Injectable()
export class ChartServiceMock {
    init() {
        return {};
    }
}