Ext.define('DGPortal.view.ColumnBar', {
    extend: 'Ext.Component',
    alias: 'widget.columnBar',
    height: 170,
    margin: '0 0 10 10',
    //padding: '0 0 0 10',
    dataObj: {},
    chartTitle: null,
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

                });
            } catch (e) {
                this.log(e);
            }
        }

        this.store = store;

        // if (this.loadMask !== false) {
        //     if (this.loadMask === true) {
        //         this.loadMask = new Ext.LoadMask({ target: this, store: this.store });
        //     } else {
        //         this.loadMask.bindStore(this.store);
        //     }
        // }

        // if (store && !initial) {
        //     this.refresh();
        // }

    },

    drawChart: function () {

        this.log(this.rendered);
        this.chartConfig = {
            chart: {
                type: 'column',
                borderWidth: 0.8,
                borderColor: '#cccccc',
                spacingBottom: 5,
                //spacingLeft: 10,
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
                //visible: this.chartYAxisVisible,
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

            exporting: {
                buttons: {
                    contextButton: {
                        enabled: true,
                        menuItems: null,
                        onclick: function () {
                            createGraph(this);
                        }
                    }
                }
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
                // visible: this.chartYAxisVisible,
                align: 'center',
                itemMarginBottom: 0,
                itemStyle: {
                    fontSize: '8px',
                    fontWeight: 'normal',
                    fontFamily: 'montserratregular',
                    color: '#646464',
                    textTransform: 'uppercase'
                },
                symbolHeight: 10,
                symbolWidth: 10,
                itemDistance: 8,
                margin: 15
            },
            series: this.dataObj.series,
        };

        this.chart = new Highcharts.Chart(
            this.chartConfig
        );
    },

    // private
    onLoad: function (_this, records, successful, eOpts) {
        this.dataObj.colors = ['#e61d27', '#fdbf2d', '#0071ce', '#44b649', '#f5852b'];
        this.dataObj.xAxisCategories = ['RS-LAKE', 'STG-LAKE', 'TDS', 'DB2', 'DW1', 'APS-HIVE', 'SOC-S3', 'STM-SS3'];
        this.dataObj.series = [
            {
                name: 'Exposed',
                data: [90009, 75250, 10004, 10152, 15540, 17140, 131216, 14555]
            }, {
                name: 'Masked',
                data: [54009, 84621, 121004, 10152, 15540, 84562, 41236, 52148]
            }, {
                name: 'Monitored',
                data: [45009, 75321, 32004, 10152, 15540, 46325, 68523, 36521]
            }, {
                name: 'Cleaned',
                data: [86009, 95123, 54004, 10152, 15540, 26548, 131216, 85412]
            }, {
                name: 'Unscanned',
                data: [92009, 35789, 65004, 41152, 15540, 68425, 62547, 32145]
            }];


        this.getStoreData(records, successful);

        this.log(this.store);
        this.log('OnLoad of ' + this.id + " is called.");
        // if (!this.chart) {
        //     this.log("Creating chart of " + this.id);
        //     //this.buildInitData();
        //     //this.chart = new Highcharts.Chart(_this.chartConfig, this.afterChartRendered);
        //     this.drawChart();
        //     if (this.afterGaugeRendered) (this.afterGaugeRendered());
        //     return;
        // }

        this.log("Call refresh from onLoad of " + this.id);
        //this.refreshOnLoad && this.refresh();
        //this.refresh();
    },

    onDataChange: function (_this, eOpts) {
        if (this.chart) {
            //console.log("OnDataChange for " + this.id);
            switch (this.id) {
                case 'cas':
                    this.populateCASData(this.readData, _this.dataType);
                    break;
                case 'protected':
                    this.populateProtectedData(this.readData, _this.dataType);
                    break;
                case 'exposed':
                case 'monitored':
                    this.dataObj.colors = ['#ec297b', '#fdbf2d', '#0071ce', '#f5852b', '#44b649'];
                    this.populateData(this.readData, _this.dataType);
                    break;
                case 'unscanned':
                    this.dataObj.colors = ['#e61b27', '#45b549', '#fdbf2d', '#0071ce'];
                    this.populateData(this.readData, _this.dataType);
                    break;
                case 'content':
                    this.populateContentData(this.readData, _this.dataType);
                    break;
                default:
                    break;
            }

        }

    },

    listeners: {
        resize: function () {
            if (this.rendered && this.chart) {
                this.chart.reflow();
                if (this.id == 'content') {
                    this.removePlotLineToContent();
                    this.addPlotLineToContent(DGPortal.Constants.All, this.cloudCount);
                }
            }
        }
    },

    getStoreData: function (records, successful) {
        XAxisData.prototype.addSeriesData = addSeriesData;
        if (this.store && this.store.first()) {
            var arData = this.store.first().data.sourceList;
            if (arData && arData.length > 0) {
                switch (this.id) {
                    case 'cas':
                        this.fetchCASData(arData);
                        break;
                    case 'protected':
                    case 'exposed':
                    case 'monitored':
                    case 'unscanned':
                        this.loadDataFromOtherUrl(successful);
                        break;
                    case 'content':
                        this.fetchContentData(arData);
                        break;
                    default:
                        break;
                }
            }
        }
    },

    loadDataFromOtherUrl: function (successful) {
        if (successful && this.store) {
            this.store.un('load', this.onLoad, this);
            this.store.getProxy().url = DGPortal.Constants.API_URL_Cloud_Operations + '/' + this.id;
            this.store.load({
                scope: Ext.ComponentQuery.query('#' + this.id)[0],
                addRecords: true,
                lastReadOperationDone: true,
                callback: function (records, operation, success) {
                    if (success) {
                        if (records) {
                            var records = records[0];
                            if (records.store.data && records.store.data.items.length > 0) {
                                var arData = [];
                                var items = records.store.data.items;
                                items.forEach(function (item, index, array) {
                                    if (item.data && item.data.sourceList) {
                                        item.data.sourceList.forEach(function (item, index, array) {
                                            arData.push(item);
                                        });
                                    }
                                });
                                switch (this.id) {
                                    case "protected":
                                        this.fetchProtectedData(arData);
                                        break;
                                    case "exposed":
                                        this.fetchExposedData(arData);
                                        break;
                                    case "monitored":
                                        this.fetchMonitoredData(arData);
                                        break;
                                    case "unscanned":
                                        this.fetchUnscannedData(arData);
                                        break;
                                }
                            }
                        }
                    }
                }
            });
        }
    },

    fetchCASData: function (arData) {
        //adding readData property to collect data when class is instantiated for CAS chart
        this.readData = [];
        var lastReadOperationDone = false;
        var storeObj = Ext.create('DGPortal.store.Sources');
        arData.forEach(function (element, index, array) {
            // debugger;
            var objValue = JSON.parse(element.value);
            var source = objValue.source;
            var url = DGPortal.Constants.API_URL_Sources + '/' + source;
            storeObj.getProxy().url = url;
            storeObj.load({
                scope: Ext.ComponentQuery.query('#cas')[0],
                addRecords: true,
                lastReadOperationDone: (index == array.length - 1),
                callback: function (records, operation, success) {
                    if (success && Array.isArray(records) && records[0].data) {
                        var sourceList = records[0].data.sourceList;
                        if (Array.isArray(sourceList) && sourceList[0].value) {
                            var objValue = JSON.parse(sourceList[0].value);
                            this.readData.push(objValue);
                            if (operation.lastReadOperationDone) {
                                //console.log('fetchCASData data is => ');
                                //console.log(this.readData);
                                this.populateCASData(this.readData, DGPortal.Constants.All);
                            }
                        }
                    }
                }
            });
        });
    },

    populateCASData: function (readData, sourceLocation) {
        this.dataObj.colors = ['#e61d27', '#fdbf2d', '#0071ce', '#44b649', '#f5852b'];
        // console.log("Colors of " + this.id + " " + this.dataObj.colors);
        var exposed = { name: 'EXPOSED', data: [] };
        var masked = { name: 'MASKED', data: [] };
        var monitored = { name: 'MONITORED', data: [] };
        var cleaned = { name: 'CLEANED', data: [] };
        var unscanned = { name: 'UNSCANNED', data: [] };
        var arXAxisCatgs = [];
        if (readData && Array.isArray(readData)) {
            readData.forEach(function (element, index, array) {
                if (sourceLocation == DGPortal.Constants.All || sourceLocation == element.sourceLocation.toUpperCase()) {
                    arXAxisCatgs.push(element.source.toUpperCase());
                    exposed.data.push(element.exposed);
                    masked.data.push(element.maskedEncryted);
                    monitored.data.push(element.monitored);
                    cleaned.data.push(element.clean);
                    unscanned.data.push(element.unscanned);
                }
            });
        }
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = [exposed, masked, monitored, cleaned, unscanned];
        this.drawChart();
    },


    //method for fetching protected chart data
    fetchProtectedData: function (arData) {
        //adding readData property to collect data.
        this.readData = [];
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            this.readData.push(objValue);
        }, this);
        this.populateProtectedData(this.readData);
    },

    populateProtectedData: function (readData, sourceLocation) {
        this.dataObj.colors = ['#f5852b', '#fdbf2d', '#0071ce'];
        // console.log("Colors of " + this.id + " " + this.dataObj.colors);
        var arXAxisCatgs = [];
        var masked = { name: 'MASKED', data: [] };
        var encrypted = { name: 'ENCRYPTED', data: [] };
        var monitored = { name: 'MONITORED', data: [] };
        if (readData && Array.isArray(readData)) {
            readData.forEach(function (element, index, array) {
                if (sourceLocation == DGPortal.Constants.All || element.sourceLocation.toUpperCase() == sourceLocation) {
                    masked.data.push(element.masked);
                    encrypted.data.push(element.encrytionDone);
                    monitored.data.push(element.protectedCount);
                    arXAxisCatgs.push(element.source.toUpperCase());
                }
            });
        }
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = [masked, encrypted, monitored];
        this.drawChart();
    },

    //method for populating exposed chart data
    fetchExposedData: function (arData) {
        //console.log('ran for ' + this.id);
        this.dataObj.colors = ['#ec297b', '#fdbf2d', '#0071ce', '#f5852b', '#44b649'];
        var arXAxisCatgs = [];
        var xAxisCatgsMap = new Ext.util.HashMap();
        this.arSeriesLegends = [];

        //looping on data read from restApi
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            //var objValue = element.value;
            var source = objValue.source.toUpperCase();
            var policyName = objValue.policyName.toUpperCase();
            var sourceLocation = objValue.sourceLocation.toUpperCase();
            var exposedVal = objValue.exposed;

            //adding unique sources to hashMap
            if (xAxisCatgsMap.containsKey(source)) {
                var xAxisData = xAxisCatgsMap.get(source);
                xAxisData.addSeriesData(policyName, exposedVal);
            } else {
                var xAxisData = new XAxisData(source, sourceLocation);
                xAxisData.addSeriesData(policyName, exposedVal);
                xAxisCatgsMap.add(source, xAxisData);
            }

            //adding unique policyName to legends array
            if (!this.arSeriesLegends.includes(policyName)) {
                this.arSeriesLegends.push(policyName);
            }

        }, this);

        this.readData = xAxisCatgsMap.getValues();
        this.populateData(this.readData, DGPortal.Constants.All);

    },

    //method for populating unscanned chart data
    fetchUnscannedData: function (arData) {
        this.dataObj.colors = ['#e61b27', '#45b549', '#fdbf2d', '#0071ce'];
        var arXAxisCatgs = [], seriesData = [];
        var xAxisCatgsMap = new Ext.util.HashMap();
        this.arSeriesLegends = [];

        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            //var objValue = element.value;
            var source = objValue.source.toUpperCase();
            var contentType = objValue.contentType.toUpperCase();
            var sourceLocation = objValue.sourceLocation.toUpperCase();
            var unscannedVal = objValue.unscanned;
            if (xAxisCatgsMap.containsKey(source)) {
                var xAxisData = xAxisCatgsMap.get(source);
                xAxisData.addSeriesData(contentType, unscannedVal);
            } else {
                var xAxisData = new XAxisData(source, sourceLocation);
                xAxisData.addSeriesData(contentType, unscannedVal);
                xAxisCatgsMap.add(source, xAxisData);
            }

            //adding unique contentType to legends array
            if (!this.arSeriesLegends.includes(contentType)) {
                this.arSeriesLegends.push(contentType);
            }

        }, this);

        this.readData = xAxisCatgsMap.getValues();;
        this.populateData(this.readData, DGPortal.Constants.All);
    },

    //method for populating monitored chart data
    fetchMonitoredData: function (arData) {
        this.dataObj.colors = ['#ec297b', '#fdbf2d', '#0071ce', '#f5852b', '#44b649'];
        var arXAxisCatgs = [], seriesData = [];
        var xAxisCatgsMap = new Ext.util.HashMap();
        this.arSeriesLegends = [];

        //looping on data read from restApi
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            //var objValue = element.value;
            var source = objValue.source.toUpperCase();
            var policyName = objValue.policyName.toUpperCase();
            var monitoredVal = objValue.monitored;
            var sourceLocation = objValue.sourceLocation.toUpperCase();

            //adding unique sources to hashMap
            if (xAxisCatgsMap.containsKey(source)) {
                var xAxisData = xAxisCatgsMap.get(source);
                xAxisData.addSeriesData(policyName, monitoredVal);
            } else {
                var xAxisData = new XAxisData(source, sourceLocation);
                xAxisData.addSeriesData(policyName, monitoredVal);
                xAxisCatgsMap.add(source, xAxisData);
            }

            //adding unique policyName to legends array
            if (!this.arSeriesLegends.includes(policyName)) {
                this.arSeriesLegends.push(policyName);
            }

        }, this);
        this.readData = xAxisCatgsMap.getValues();;
        this.populateData(this.readData, DGPortal.Constants.All);

    },

    populateData: function (readData, sourceLocation) {
        // console.log("Colors of " + this.id + " " + this.dataObj.colors);
        var arXAxisCatgs = [];
        var sdMap = new Ext.util.HashMap();
        // console.log('populateData of ' + this.id + ' is called with readData => ');        
        this.arSeriesLegends.forEach(function (item, index, array) {
            sdMap.add(item, { name: item, data: [] });
        });
        if (readData && Array.isArray(readData)) {
            readData.forEach(function (xAxisCatObj, index, array) {
                if (sourceLocation == DGPortal.Constants.All || xAxisCatObj.sourceLocation == sourceLocation) {
                    arXAxisCatgs.push(xAxisCatObj.source);
                    var seriesData = xAxisCatObj.seriesData;
                    sdMap.each(function (key, value, length) {
                        if (seriesData.containsKey(key)) {
                            var dataVal = seriesData.get(key).data[0];
                            value.data.push(dataVal);
                        }
                        else {
                            value.data.push(0);
                        }
                    }, this);
                }

            });
        }
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = sdMap.getValues();
        this.drawChart();
    },

    //method for populating content chart data
    fetchContentData: function (arData) {
        var xAxisCatgsMap = new Ext.util.HashMap();
       	this.arSeriesLegends = [];

        //looping on data read from restApi
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            //var objValue = element.value;           
            var source = objValue.source.toUpperCase();
            var sourceLocation = objValue.sourceLocation.toUpperCase();
            var contentType = objValue.contentType.toUpperCase();
            var fileTableCount = objValue.fileTableCount;
            //adding unique sources to hashMap
            if (xAxisCatgsMap.containsKey(source)) {
                var xAxisData = xAxisCatgsMap.get(source);
                xAxisData.addSeriesData(contentType, fileTableCount);
            } else {
                var xAxisData = new XAxisData(source, sourceLocation);
                xAxisData.addSeriesData(contentType, fileTableCount);
                xAxisCatgsMap.add(source, xAxisData);
            }
            //adding unique policyName to legends array
            if (!this.arSeriesLegends.includes(contentType)) {
                this.arSeriesLegends.push(contentType);
            }
        }, this);
        this.readData = xAxisCatgsMap.getValues();
        this.populateContentData(this.readData, DGPortal.Constants.All);

        //this.dataObj.xAxisCategories = arXAxisCatgs;
        // this.dataObj.series = sdMap.getValues();
    },

    populateContentData: function (readData, sourceLocation) {
        // console.log("Colors of " + this.id + " " + this.dataObj.colors);
        this.dataObj.colors = ['#ec297b', '#fdbf2d', '#0071ce', '#f5852b', '#44b649'];
        var arXAxisCatgs = [];
        var arCloud = [];
        var arOnPremises = [];

        var sdMap = new Ext.util.HashMap();
        this.arSeriesLegends.forEach(function (item, index, array) {
            sdMap.add(item, { name: item, data: [] });
        });

        readData.forEach(function (item, index, array) {
            if (item.sourceLocation == DGPortal.Constants.OnPremise) {
                arOnPremises.push(item);
            }
            else if (item.sourceLocation == DGPortal.Constants.Cloud) {
                arCloud.push(item);
            }
        });
      
        //creating property to know how many CLOUD units are present for showing labels below x-axis.         
        this.cloudCount = arCloud.length;

        if (sourceLocation == DGPortal.Constants.All || sourceLocation == DGPortal.Constants.Cloud) {
            arCloud.forEach(function (item, index, array) {
                arXAxisCatgs.push(item.source);
                var seriesData = item.seriesData;
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
        }

        if (sourceLocation == DGPortal.Constants.All || sourceLocation == DGPortal.Constants.OnPremise) {
            arOnPremises.forEach(function (item, index, array) {
                arXAxisCatgs.push(item.source);
                var seriesData = item.seriesData;
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
        }

        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = sdMap.getValues();
        this.drawChart();
        this.addPlotLineToContent(sourceLocation, this.cloudCount)
    },

    //method to add plot lines which for Content chart.
    addPlotLineToContent: function (sourceLocation, countVal) {
        // alert(this.cloudCount);
        if (this.chart) {
            if (sourceLocation == DGPortal.Constants.All && countVal > 0) {
                var pixels = ((this.chart.xAxis[0].toPixels(countVal)) / 4) - 10;
                this.chart.xAxis[0].addPlotLine({
                    value: countVal - 0.5,
                    color: 'lightGray',
                    width: 2,
                    id: 'cloudPlotLine',
                    label: {
                        text: 'CLOUD',
                        align: 'right',
                        verticalAlign: 'bottom',
                        rotation: 0,
                        x: -pixels,
                        y: 30,
                        style: {
                            fontSize: '11px',
                            fontWeight: 'normal',
                            fontFamily: 'montserratregular',
                            color: '#646464',
                            textTransform: 'uppercase'
                        }
                    },
                });
                this.chart.xAxis[0].addPlotLine({
                    value: countVal - 0.5,
                    color: 'lightGray',
                    width: 2,
                    id: 'onPremisePlotLine',
                    label: {
                        text: 'ON-PREMISE',
                        align: 'left',
                        verticalAlign: 'bottom',
                        rotation: 0,
                        x: pixels,
                        y: 30,
                        style: {
                            fontSize: '11px',
                            fontWeight: 'normal',
                            fontFamily: 'montserratregular',
                            color: '#646464',
                            textTransform: 'uppercase'
                        }
                    },
                });

            } else {
                this.removePlotLineToContent();
            }
        }
    },

    //method to remove plot lines which added for Content chart.
    removePlotLineToContent: function () {
        if (this.chart) {
            this.chart.xAxis[0].removePlotLine('cloudPlotLine');
            this.chart.xAxis[0].removePlotLine('onPremisePlotLine');
        }
    },
});

hs.Expander.prototype.onAfterExpand = function () {
    if (this.custom.chartOptions) {
        var chartOptions = this.custom.chartOptions;

        if (!this.hasChart) {
            chartOptions.chart.renderTo = $('.highslide-body')[0];
            chartOptions.exporting.buttons.contextButton.enabled = false;
            var hsChart = new Highcharts.Chart(chartOptions);
        }
        this.hasChart = true;
    }
};

function createGraph(obj) {
    //alert(obj);
    // set the click event for the parent chart      
    hs.htmlExpand(document.getElementById(obj.renderTo), {
        width: 9999,
        height: 9999,
        allowWidthReduction: true,
        preserveContent: false
    }, {
            chartOptions: obj.options
        });
    //var chart = new Highcharts.Chart(obj.options);
    // Create a new chart on Highslide popup open

}

//class for saving xAxis data for chart.
function XAxisData(sourceName, sourceLocation) {
    this.source = sourceName;
    this.sourceLocation = sourceLocation;
    this.seriesData = new Ext.util.HashMap();
}

//method to add series data in XAxisData object.
function addSeriesData(seriesName, value) {
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
            contentType: 'NoSQL',
            sourceLocation: 'On-Premise',
            fileTableCount: 4
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
            contentType: 'SQL',
            sourceLocation: 'On-Premise',
            fileTableCount: 7
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
            contentType: 'structured',
            sourceLocation: 'Cloud',
            fileTableCount: 9
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
            contentType: 'Unstructured',
            sourceLocation: 'Cloud',
            fileTableCount: 3

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
            contentType: 'Unstructured',
            sourceLocation: 'Cloud',
            fileTableCount: 1
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
            contentType: 'Unstructured',
            sourceLocation: 'On-Premise',
            fileTableCount: 17
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
            contentType: 'CSV',
            sourceLocation: 'Cloud',
            fileTableCount: 10
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
            contentType: 'CSV',
            sourceLocation: 'On-Premise',
            fileTableCount: 4
        }
    }
];

