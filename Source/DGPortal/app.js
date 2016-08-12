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

    requires: ['DGPortal.Constants', 'Ext.data.Store', 'Ext.layout.container.Table', 'Ext.form.field.ComboBox', 'Ext.form.Label',
        'Ext.data.proxy.Rest', 'Ext.layout.container.Column', 'Ext.grid.Panel','Ext.window.Window'
    ],

    views: [
        'Viewport', 'AssetsInScope', 'AssetsInScopeLeftRect', 'Gauge', 'LineChart', 'OCSection', 'SectionHeader', 'ColumnBar'
    ],

    controllers: [
        'Main', 'Coverage'
    ],

    stores: [
        'Sources', 'Protected', 'Exposed', 'Monitored', 'Unscanned', 'Content'
        // TODO: add stores here
    ],

    models: ['SourceList'],

    autoCreateViewport: true
});

//adding indexOf method for ie 8 version
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

//adding indexOf method for ie 8 version
if (!Array.prototype.isArray) {
    Array.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };
}

//adding forEach method for ie 8 version
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}