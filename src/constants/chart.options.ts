export const ChartOptions = {
    chartEvents: [
        'addSeries',
        'afterPrint',
        'beforePrint',
        'drilldown',
        'drillup',
        'load',
        'redraw',
        'selection'
    ],
    seriesEvents: [
        'click',
        'afterAnimate',
        'checkboxClick',
        'hide',
        'legendItemClick',
        'mouseOut',
        'mouseOver',
        'show'
    ],
    pointEvents: [
        'click',
        'remove',
        'select',
        'unselect',
        'mouseOut',
        'mouseOver',
        'update'
    ],
    xAxisEvents: [
        'afterBreaks',
        'afterSetExtremes',
        'pointBreak',
        'pointInBreak',
        'setExtremes'
    ],
    yAxisEvents: [
        'afterBreaks',
        'afterSetExtremes',
        'pointBreak',
        'pointInBreak',
        'setExtremes'
    ],
    tooltipEvents: [
        'formatter'
    ]
};