Ext.define('DGPortal.view.ColumnBar', {
    extend: 'Ext.Component',
    alias: 'widget.columnBar',
    height: 170,
    margin: '0 0 10 10',
    //padding: '0 0 0 10',
    dataObj: {},
    chartTitle: null,
    chartYAxisVisible: true,
    chartLegendEnable: true,
    /***
    * @property {Boolean} debug
    * Switch on the debug logging to the console
    */
    debug: false,
    /***
    * This method is called by other routines within this extension to output debugging log.
    * This method can be overrided with Ext.emptyFn for product deployment
    * @param {String} msg debug message to the console
    */
    log: function (msg) {
        (typeof console !== 'undefined' && this.debug) && console.log(msg);
    },
    bindStore: function (store, initial) {
        //debugger;
        if (!initial && this.store) {
            if (store !== this.store && this.store.autoDestroy) {
                this.store.destroy();
            } else {
                this.store.un("datachanged", this.onDataChange, this);
                this.store.un("load", this.onLoad, this);
                // this.store.un("add", this.onAdd, this);
                // this.store.un("remove", this.onRemove, this);
                // this.store.un("update", this.onUpdate, this);
                // this.store.un("clear", this.onClear, this);
            }
        }

        if (store) {
            store = Ext.StoreMgr.lookup(store);
            try {
                store.on({
                    scope: this,
                    load: this.onLoad,
                    datachanged: this.onDataChange
                    // add: this.onAdd,
                    // remove: this.onRemove,
                    // update: this.onUpdate,
                    // clear: this.onClear
                });
            } catch (e) {
                this.log(e);
            }
        }

        this.store = store;
        if (store && !initial) {
            this.refresh();
        }
    },

    drawChart: function () {
        
        this.log(this.rendered);
        this.chart = new Highcharts.Chart(
            {
                chart: {
                    type: 'column',
                    borderWidth: 0.8,
                    borderColor: '#cccccc',
                    spacingBottom: 0,
                    spacingLeft: 2,
                    //spacingRight: 10,
                    // height: 176,
                    // width: 410,
                    //marginBottom: 50,
                    renderTo: this.getId(),
                    reflow: true
                    // marginLeft:35

                },

                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0
                    }
                },
                colors: this.dataObj.colors,
                xAxis: {
                    categories: this.dataObj.xAxisCategories,
                    tickWidth: 0,
                    lineWidth: 0,
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: 'transparent',
                    labels: {
                        staggerLines: 0,
                        rotation: 0,
                        style: {
                            fontSize: '8px',
                            fontFamily: 'montserratregular',
                            color: '#646464',
                            //fontWeight: 'bold'
                        },
                    }
                },
                yAxis: {
                    visible: this.chartYAxisVisible,
                    gridLineWidth: 0,
                    endOnTick: false,
                    offset: 10,
                    title: {
                        enabled: false,
                    },
                    labels: {
                        // align: 'right',
                        x: 10,
                        y: -2,
                        // formatter: function () {
                        //     return this.value + "k";
                        // }
                    },
                    //tickInterval: 2,
                    //tickAmount: 4
                },

                credits: {
                    enabled: false
                },
                title: {
                    align: "left",
                    text: this.chartTitle,

                    style: {
                        color: '#0071ce',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        fontFamily: 'montserratregular',
                        textTransform: 'uppercase',

                    }
                },
                legend: {
                    visible: this.chartYAxisVisible,
                    align: 'center',
                    itemMarginBottom: 0,
                    itemStyle: {
                        fontSize: '8px',
                        fontWeight: 'normal',
                        fontFamily: 'montserratregular'

                    },
                    symbolHeight: 10,
                    symbolWidth: 10,
                    itemDistance: 8
                },
                series: this.dataObj.series
            }
        );
    },

    // private
    onLoad: function (_this, records) {
        this.dataObj.colors = ['#e61d27', '#fdbf2d', '#0071ce', '#44b649', '#f5852b'];
        this.dataObj.xAxisCategories = ['RS-LAKE', 'STG-LAKE', 'TDS', 'DB2', 'DW1', 'APS-HIVE', 'SOC-S3', 'STM-SS3'];
        this.dataObj.series = [{
            name: 'Exposed',
            data: [9.9, 7.5, 10.4, 12.2, 14.0, 17.0, 13.6, 14.5]//data: [90009, 75250, 10004, 10152, 15540, 17140, 131216, 14555]// 
        }, {
                name: 'Masked',
                data: [8.6, 7.8, 9.5, 3.4, 10.0, 4.5, 10.0, 10.3]// data: [90009, 75250, 10004, 10152, 15540, 17140, 131216, 14555]//
            }, {
                name: 'Monitored',
                data: [8.9, 38.8, 39.3, 41.4, 47.0, 18.3, 43.0, 29.6]//data: [90009, 75250, 10004, 10152, 15540, 17140, 131216, 14555]//
            }, {
                name: 'Cleaned',
                data: [32.4, 33.2, 34.5, 39.7, 22.6, 45.5, 37.4, 34.4] //data: [90009, 75250, 10004, 10152, 15540, 17140, 131216, 14555]//
            }, {
                name: 'Unscanned',
                data: [42.4, 33.2, 34.5, 39.7, 12.6, 22.5, 27.4, 33.4]//data: [90009, 75250, 10004, 10152, 15540, 17140, 131216, 14555]//
            }];

        this.getStoreData(records);

        this.log(this.store);
        this.log('OnLoad of ' + this.id + " is called.");
        if (!this.chart) {
            this.log("Call refresh from onLoad for initAnim");
            //this.buildInitData();
            //this.chart = new Highcharts.Chart(_this.chartConfig, this.afterChartRendered);
            this.drawChart();
            if (this.afterGaugeRendered) (this.afterGaugeRendered());
            return;
        }

        this.log("Call refresh from onLoad of " + this.id);
        //this.refreshOnLoad && this.refresh();
        this.refresh();
    },

    onDataChange: function (_this, eOpts) {
        if (this.chart) {
            console.log(_this.dataType);
            //console.log(eOpts);
            // this.store.clearFilter(true);
            // console.log(this.id + "  after ClearFilter");
            // console.log(this.store);
        }

    },

    refresh: function () {
        //apply logic for updating values from store
        this.chart.redraw();
    },



    listeners: {
        resize: function () {
            if (this.rendered && this.chart) {
                this.chart.reflow();
            }
        }
    },

    getStoreData: function (records) {
        XAxisData.prototype.addSeriesData = addSeriesData;
        if (this.store && this.store.first()) {
            var arData = this.store.first().data.sourceList;
            if (arData && Array.isArray(arData)) {
                switch (this.id) {
                    case 'cas':
                        this.populateCASData(arData);
                        break;
                    case 'protected':
                        this.populateProtectedData(arData);
                        break;
                    case 'exposed':
                        this.populateExposedData(arData);
                        break;
                    case 'unscanned':
                        this.populateUnscannedData(arData);
                        break;
                    case 'monitored':
                        this.populateMonitoredData(arData);
                        break;
                    default:
                        break;
                }
            }
        }
    },


    populateCASData: function (arData) {
        var exposed = { name: 'EXPOSED', data: [] };
        var masked = { name: 'MASKED', data: [] };
        var monitored = { name: 'MONITORED', data: [] };
        var cleaned = { name: 'CLEANED', data: [] };
        var unscanned = { name: 'UNSCANNED', data: [] };
        var arXAxisCatgs = [];
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            var source = objValue.source;
            var url = DGPortal.Constants.API_URL_Sources + '/' + source;

            var operation = new Ext.data.Operation({
                action: 'read',
            });

            req = Ext.create('Ext.data.proxy.Rest', {
                url: url,
                reader: 'json',
                action: 'read',
                requires: 'DGPortal.model.SourceList',
                model: 'DGPortal.model.SourceList',
            });
            // req.read(operation);

            this.req.doRequest(operation, function () {

            }, this);

            console.log(req.reader.jsonData);
            if (req.reader && req.reader.jsonData && req.reader.jsonData.sourceList) {
                console.log(req.reader.jsonData.sourceList);
                var val = req.reader.jsonData.sourceList[0].value;
                var objValue = JSON.parse(val);

                arXAxisCatgs.push(objValue.source)
                if (objValue.exposed) { exposed.push(objValue.exposed) };
                if (objValue.maskedEncryted) { masked.push(objValue.maskedEncryted) };
                if (objValue.monitored) { monitored.push(objValue.monitored) };
                if (objValue.clean) { cleaned.push(objValue.clean) };
                if (objValue.unscanned) { unscanned.push(objValue.unscanned) };
            }
        });

        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = [exposed, masked, monitored, cleaned, unscanned];
    },



    //method for populating protected chart data
    populateProtectedData: function (arData) {
        this.log(this.store);
        this.dataObj.colors = ['#f5852b', '#fdbf2d', '#0071ce'];
        var arXAxisCatgs = [];
        var masked = { name: 'MASKED', data: [] };
        var encrypted = { name: 'ENCRYPTED', data: [] };
        var monitored = { name: 'MONITORED', data: [] };
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            masked.data.push(objValue.masked);
            encrypted.data.push(objValue.encrytionDone);
            monitored.data.push(objValue.protectedCount);
            arXAxisCatgs.push(objValue.source.toUpperCase());
        }, this);
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = [masked, encrypted, monitored];
    },


    //method for populating unscanned chart data
    populateUnscannedData: function (arData) {      

        this.dataObj.colors = ['#e61b27', '#45b549', '#fdbf2d', '#0071ce'];
        var arXAxisCatgs = [], seriesData = [];
        var xAxisCatgsMap = new Ext.util.HashMap();
        var sdMap = new Ext.util.HashMap();

        sourceList.forEach(function (element, index, array) {
            //var objValue = JSON.parse(element.value);
            var objValue = element.value;
            var source = objValue.source.toUpperCase();
            var contentType = objValue.contentType.toUpperCase();
            var serverType = objValue.contentType.toUpperCase();
            var unscannedVal = objValue.unscanned;
            if (xAxisCatgsMap.containsKey(source)) {
                var xAxisData = xAxisCatgsMap.get(source);
                xAxisData.addSeriesData(contentType, unscannedVal);
            } else {
                var xAxisData = new XAxisData(source);
                xAxisData.addSeriesData(contentType, serverType, unscannedVal);
                xAxisCatgsMap.add(source, xAxisData);
            }

            //adding unique policyName to hashMap
            if (!sdMap.containsKey(contentType)) {
                sdMap.add(contentType, { name: contentType, data: [] });
            }

        }, this);

        xAxisCatgsMap.each(function (key, value, length) {
            arXAxisCatgs.push(key);
            var seriesData = value.seriesData;
            sdMap.each(function (key, value, length) {
                if (seriesData.containsKey(key)) {
                    var dataVal = seriesData.get(key).data[0];
                    value.data.push(dataVal);
                }
                else {
                    value.data.push(0);
                }
            });
        });
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = sdMap.getValues();
    },


    //method for populating exposed chart data
    populateExposedData: function (arData) {        

        this.dataObj.colors = ['#ec297b', '#fdbf2d', '#0071ce', '#f5852b', '#44b649'];
        var arXAxisCatgs = [], seriesData = [];
        var xAxisCatgsMap = new Ext.util.HashMap();
        var sdMap = new Ext.util.HashMap();

        //looping on data read from restApi
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            //var objValue = element.value;
            var source = objValue.source.toUpperCase();
            var policyName = objValue.policyName.toUpperCase();
            var exposedVal = objValue.exposed;

            //adding unique sources to hashMap
            if (xAxisCatgsMap.containsKey(source)) {
                var xAxisData = xAxisCatgsMap.get(source);
                xAxisData.addSeriesData(policyName, exposedVal);
            } else {
                var xAxisData = new XAxisData(source);
                xAxisData.addSeriesData(policyName, exposedVal);
                xAxisCatgsMap.add(source, xAxisData);
            }

            //adding unique policyName to hashMap
            if (!sdMap.containsKey(policyName)) {
                sdMap.add(policyName, { name: policyName, data: [] });
            }

        }, this);

        xAxisCatgsMap.each(function (key, value, length) {
            arXAxisCatgs.push(key);
            var seriesData = value.seriesData;
            sdMap.each(function (key, value, length) {
                if (seriesData.containsKey(key)) {
                    var dataVal = seriesData.get(key).data[0];
                    value.data.push(dataVal);
                }
                else {
                    value.data.push(0);
                }
            });
        });
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = sdMap.getValues();
    },


    //method for populating monitored chart data
    populateMonitoredData: function (arData) {
        
        this.dataObj.colors = ['#ec297b', '#fdbf2d', '#0071ce', '#f5852b', '#44b649'];
        var arXAxisCatgs = [], seriesData = [];
        var xAxisCatgsMap = new Ext.util.HashMap();
        var sdMap = new Ext.util.HashMap();

        //looping on data read from restApi
        sourceList.forEach(function (element, index, array) {
            //  var objValue = JSON.parse(element.value);
            var objValue = element.value;
            var source = objValue.source.toUpperCase();
            var policyName = objValue.policyName.toUpperCase();
            var monitoredVal = objValue.monitored;

            //adding unique sources to hashMap
            if (xAxisCatgsMap.containsKey(source)) {
                var xAxisData = xAxisCatgsMap.get(source);
                xAxisData.addSeriesData(policyName, monitoredVal);
            } else {
                var xAxisData = new XAxisData(source);
                xAxisData.addSeriesData(policyName, monitoredVal);
                xAxisCatgsMap.add(source, xAxisData);
            }

            //adding unique policyName to hashMap
            if (!sdMap.containsKey(policyName)) {
                sdMap.add(policyName, { name: policyName, data: [] });
            }

        }, this);

        xAxisCatgsMap.each(function (key, value, length) {
            arXAxisCatgs.push(key);
            var seriesData = value.seriesData;
            sdMap.each(function (key, value, length) {
                if (seriesData.containsKey(key)) {
                    var dataVal = seriesData.get(key).data[0];
                    value.data.push(dataVal);
                }
                else {
                    value.data.push(0);
                }
            });
        });
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = sdMap.getValues();
    },

});



//class for saving xAxis data for Exposed chart.
function XAxisData(sourceName) {
    this.source = sourceName;
    this.seriesData = new Ext.util.HashMap();
}


// //class for saving xAxis data for Monitored chart.
// function monitoredXAxisData(sourceName) {
//     this.source = sourceName;
//     this.seriesData = new Ext.util.HashMap();
// }



// //class for saving xAxis data for Unscanned chart.
// function unscannedXAxisData(sourceName) {
//     this.source = sourceName;
//     this.seriesData = new Ext.util.HashMap();
// }

//method to add series data in XAxisData object.
function addSeriesData(series, value) {
    var seriesName = series;
    if (this.seriesData.containsKey(seriesName)) {
        var series = this.seriesData.get(seriesName);
        series.data.push(value);
    }
    else {
        var series = { name: seriesName, data: [value] };
        this.seriesData.add(seriesName, series);
    }
}


sourceList = [
    {
        name: 'MongoDb',
        value: {
            source: 'Mongodb',
            policyId: 3,
            policyName: 'PII_DBMS',
            exposed: 2,
            monitored: 2,
            unscanned: 2,
            contentType: 'NoSQL'
        }
    },
    {
        name: 'MongoDb',
        value: {
            source: 'mongoDb',
            policyId: 3,
            policyName: 'pci_dbms',
            exposed: 4,
            monitored: 2,
            unscanned: 2,
            contentType: 'SQL'
        }
    },
    {
        name: 'MongoDb',
        value: {
            source: 'MongoDb',
            policyId: 3,
            policyName: 'HIPAA_DBMS',
            exposed: 6,
            monitored: 2,
            unscanned: 2,
            contentType: 'structured'
        }
    },
    {
        name: 'SQL Server',
        value: {
            source: 'SQL Server',
            policyId: 3,
            policyName: 'PCI_DBMS',
            exposed: 15,
            monitored: 2,
            unscanned: 2,
            contentType: 'Unstructured'
        }
    },
    {
        name: 'SQL Server',
        value: {
            source: 'SQL Server',
            policyId: 3,
            policyName: 'HIPAA_DBMS',
            exposed: 20,
            monitored: 2,
            unscanned: 2,
            contentType: 'Unstructured'
        }
    },
    {
        name: 'Hadoop',
        value: {
            source: 'Hadoop',
            policyId: 3,
            policyName: 'r_policy',
            exposed: 30,
            monitored: 2,
            unscanned: 2,
            contentType: 'Unstructured'
        }
    },
    {
        name: 'Hadoop',
        value: {
            source: 'Hadoop',
            policyId: 3,
            policyName: '',
            exposed: 50,
            monitored: 2,
            unscanned: 2,
            contentType: 'CSV'
        }
    },
    {
        name: 'SQL Server',
        value: {
            source: 'SQL Server',
            policyId: 3,
            policyName: 'PII_DBMS',
            exposed: 100,
            monitored: 2,
            unscanned: 2,
            contentType: 'CSV'
        }
    }
];

