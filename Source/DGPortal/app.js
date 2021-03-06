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
        'Ext.data.proxy.Rest', 'Ext.layout.container.Column', 'Ext.grid.Panel', 'Ext.window.Window', 'DGPortal.factory.ChartDrillIn'
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

//adding Object.keys method for ie 8 version From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    } ());
}

//adding array.map for ie 8 version
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}