import { Directive, Output, EventEmitter, ContentChild } from '@angular/core';
import { ChartPointComponent } from './chart-point.component';
import { ChartEvent } from '../models/chart-event.model';

@Directive({
    selector: 'series'
})
export class ChartSeriesComponent {
    @ContentChild(ChartPointComponent) point: ChartPointComponent;
    @Output() click = new EventEmitter<ChartEvent>();
    @Output() afterAnimate = new EventEmitter<ChartEvent>();
    @Output() checkboxClick = new EventEmitter<ChartEvent>();
    @Output() hide = new EventEmitter<ChartEvent>();
    @Output() legendItemClick = new EventEmitter<ChartEvent>();
    @Output() mouseOver = new EventEmitter<ChartEvent>();
    @Output() mouseOut = new EventEmitter<ChartEvent>();
    @Output() show = new EventEmitter<ChartEvent>();
}