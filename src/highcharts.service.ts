import { Injectable } from '@angular/core';

@Injectable()
export class HighchartsStatic {}

@Injectable()
export class HighchartsService {
    highchartStatic: HighchartsStatic;

    constructor(highchartsStatic: HighchartsStatic) {
        this.highchartStatic = highchartsStatic;
    }

    getHighchartsStatic() {
        return this.highchartStatic;
    }
}
