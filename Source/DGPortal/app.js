/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setConfig({
    enabled: true,
    //disableCaching : true, // For debug only
    paths: {
        //'Chart' : '/highcharts_extjs4'     // For website
        //'Chart' : '.'
    }
});


// Ext.require('Chart.ux.Highcharts');
// Ext.require('Chart.ux.Highcharts.Serie');
// Ext.require('Chart.ux.Highcharts.AreaRangeSerie');
// Ext.require('Chart.ux.Highcharts.AreaSerie');
// Ext.require('Chart.ux.Highcharts.AreaSplineRangeSerie');
// Ext.require('Chart.ux.Highcharts.AreaSplineSerie');
// Ext.require('Chart.ux.Highcharts.BarSerie');
// Ext.require('Chart.ux.Highcharts.BoxPlotSerie');
// Ext.require('Chart.ux.Highcharts.BubbleSerie');
// Ext.require('Chart.ux.Highcharts.ColumnRangeSerie');
// Ext.require('Chart.ux.Highcharts.ColumnSerie');
// Ext.require('Chart.ux.Highcharts.ErrorBarSerie');
// Ext.require('Chart.ux.Highcharts.FunnelSerie');
// Ext.require('Chart.ux.Highcharts.GaugeSerie');
// Ext.require('Chart.ux.Highcharts.LineSerie');
// Ext.require('Chart.ux.Highcharts.PieSerie');
// Ext.require('Chart.ux.Highcharts.RangeSerie');
// Ext.require('Chart.ux.Highcharts.ScatterSerie');
// Ext.require('Chart.ux.Highcharts.SplineSerie');
// Ext.require('Chart.ux.Highcharts.WaterfallSerie');
// Ext.require('Chart.ux.Highcharts.PyramidSerie');


Ext.application({
    name: 'DGPortal',

    requires: ['DGPortal.Constants', 'Ext.data.Store'],

    views: [
        'Viewport'
    ],

    controllers: [
        'Main', 'Coverage'
    ],

    stores: [
        'Sources','Protected'
        // TODO: add stores here
    ],

    models: ['SourceList', 'Source'],

    autoCreateViewport: true
});
