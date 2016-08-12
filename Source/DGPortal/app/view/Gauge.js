Ext.define('DGPortal.view.Gauge', {
    extend: 'Ext.Component',
    alias: 'widget.activityGauge',
    chart: null,
    dataObj: new Object,
    cls: { "background-color": "#0c213e" },
    height: 150,
    symbolPath: null,
    kmType: null,
    initComponent: function () {
    },
    listeners: {
        // beforerender: function () {
        //     console.log('Gauge added');
        // },
        render: function () {
            //console.log('Gauge render');
            Highcharts.setOptions({
                colors: ['#0071cd ', '#CBBB9B ', '#efefef '],
            });
        },
        // boxready: function () {
        //     // var height = this.symbolPath.includes('lock') ? 16 : 13;
        //     // this.chart.renderer.image(this.symbolPath, 82, 22, 12, height).add();
        // },

        resize: function () {
            //console.log('Gauge resize');
            // console.log("Gauge resize + chart reflow value " + this.chart.reflow);
            if (this.rendered && this.chart) {
                if (this.afterGaugeRendered) this.afterGaugeRendered();
                this.chart.reflow();
            }
        }
    },
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

        // if (this.loadMask !== false) {
        //     if (this.loadMask === true) {
        //         this.loadMask = new Ext.LoadMask({ target: this, store: this.store });
        //     } else {
        //         this.loadMask.bindStore(this.store);
        //     }
        // }

        if (store && !initial) {
            this.refresh();
        }
    },
    // private
    onLoad: function (_this, records, succesfull, eOpts) {
        this.getStoreData(records);
        this.log('OnLoad of ' + this.id + " is called.");
        if (!this.chart) {
            this.log("Call refresh from onLoad for initAnim");
            //this.buildInitData();
            //this.chart = new Highcharts.Chart(_this.chartConfig, this.afterChartRendered);
            this.drawChart();
            if (this.afterGaugeRendered) this.afterGaugeRendered();
            return;
        }

        this.log("Call refresh from onLoad of " + this.id);
        this.refresh();
    },

    refresh: function () {
        //console.log("Called refresh of " + this.id + this.dataObj.yVal + " Title " + this.dataObj.title + " Subtitle " + this.dataObj.subtitle);
        var point = this.chart.series[0].points[0];
        point.update(this.dataObj.yVal);
        this.chart.setTitle({
            text: this.dataObj.title
        }, { text: this.dataObj.subtitle });
        this.chart.redraw();
    },

    onDataChange: function (_this, eOpts) {
        if (this.chart) {
            this.populateData(this.readData, _this.dataType);
            this.refresh();
            //console.log(_this.dataType);
            //console.log(eOpts);
            // this.store.clearFilter(true);
            // console.log(this.id + "  after ClearFilter");
            // console.log(this.store);
        }

    },

    drawChart: function () {
        this.log(this.rendered);
        this.chart = new Highcharts.Chart(
            {
                chart: {
                    type: 'solidgauge',
                    // plotBackgroundColor: 'orange',
                    marginTop: -35,
                    spacing: [0, 0, 0, 0],
                    renderTo: this.el.dom,
                    reflow: true,
                    events: {
                        click: function (e) {
                            var gaugeId = this.renderTo.id;
                            var gaugeObj = Ext.ComponentQuery.query('#' + gaugeId)[0];
                            gaugeObj.showDrillDown(gaugeId);
                        }
                    }
                },
                exporting: {
                    enabled: false
                },
                title: {
                    text: this.dataObj.title,
                    style: {
                        fontSize: '12px',
                        color: '#555555',
                        fontFamily: 'montserratregular',
                        fontWeight: 'normal',
                    },
                    verticalAlign: 'bottom',
                    y: -25,
                },
                subtitle: {
                    text: this.dataObj.subtitle,
                    x: 0,
                    y: 70,
                    style: {
                        color: '#0071ce',
                        fontWeight: 'normal',
                        fontSize: '34px',
                        fontFamily: 'montserratregular'
                    }
                },

                credits: {
                    enabled: false
                },
                tooltip: { enabled: false },

                pane: {
                    size: '55%',
                    startAngle: 0,
                    endAngle: 360,
                    background: [{
                        outerRadius: '100%',
                        innerRadius: '100%',
                        backgroundColor: '#d2d2d2',
                        borderWidth: '6px'
                    }]
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    tickPositions: []
                },
                plotOptions: {
                    solidgauge: {
                        borderWidth: '6px',
                        dataLabels: {
                            enabled: false,
                            borderWidth: 0,
                            y: -16,
                            style: {
                                fontWeight: 'bold',
                                color: 'blue',
                                fontSize: "18px"
                            },
                            format: '{y} %'
                        },
                        linecap: 'square',
                        stickyTracking: false,
                    }
                },
                series: [
                    {
                        //name: 'Move',
                        borderColor: Highcharts.getOptions().colors[0],
                        data: [{
                            color: Highcharts.getOptions().colors[0],
                            radius: '100%',
                            innerRadius: '100%',
                            y: this.dataObj.yVal
                        }]
                    }]

            }
        );
    },

    afterGaugeRendered: function () {
        //console.log(this.renderedImage);
        if (this.renderedImage) this.renderedImage.destroy();

        var imgHeight = (this.symbolPath.indexOf('lock') != -1) ? 16 : 13;
        var imgWidth = 12;
        var xVal = (this.getWidth() / 2) - (imgWidth / 2);
        this.renderedImage = this.chart.renderer.image(this.symbolPath, xVal, 22, imgWidth, imgHeight).add();
    },

    getStoreData: function (records) {
        this.readData = [];
        //console.log(records);
        if (this.store && this.store.first()) {
            var arData = this.store.first().data.sourceList;
            if (arData && arData.length > 0) {
                arData.forEach(function (element, index, array) {
                    var objSource = JSON.parse(element.value);
                    this.readData.push(objSource);
                }, this);

                // arData.forEach(function (element, index, array) {
                //     var objSource = JSON.parse(element.value);
                //     this.readData.push(objSource);
                // }, this);

                this.populateData(this.readData, DGPortal.Constants.All);
            }

        }
    },

    populateData: function (readData, filterType) {
        this.dataObj.yVal = 0;
        this.dataObj.subtitle = "0";
        this.dataObj.title = "No data";
        if (readData && readData.length > 0) {
            switch (this.id) {
                case "Gauge_KM2":
                    var totalFiles_Tables = 0;
                    readData.forEach(function (item, index, array) {
                        if (filterType == DGPortal.Constants.All || item.sourceLocation.toUpperCase() == filterType) {
                            totalFiles_Tables += item.totalFileCount + item.totalTableCount;
                        }
                    }, this);
                    this.dataObj.yVal = totalFiles_Tables > 0 ? 100 : 0;

                    //converting long numbers to text with "B", "M" or "K"
                    totalFiles_Tables = DGPortal.Constants.getNumberUnit(totalFiles_Tables);

                    this.dataObj.subtitle = totalFiles_Tables.toString();
                    this.dataObj.title = totalFiles_Tables + " FILES/TABLES";
                    break;
                case "Gauge_KM3":
                    var totalFiles_Tables = 0, totalOperation = 0, operationFiles = 0, operationTables = 0;
                    readData.forEach(function (item, index, array) {
                        if (filterType == DGPortal.Constants.All || item.sourceLocation.toUpperCase() == filterType) {
                            totalFiles_Tables += item.totalFileCount + item.totalTableCount;
                            operationFiles += item.operationFileCount;
                            operationTables += item.operationTableCount;
                        }
                    }, this);
                    totalOperation = operationFiles + operationTables;
                    var operationPercent = (totalOperation / totalFiles_Tables) * 100;

                    this.dataObj.yVal = operationPercent ? +operationPercent.toFixed(1) : 0; //parseFloat(operationPercent.toPrecision(3));
                    this.dataObj.subtitle = operationPercent ? Math.round(operationPercent) + '%' : '0%';

                    var fileText = DGPortal.Constants.getFileText(operationFiles);
                    var tableText = DGPortal.Constants.getTableText(operationTables);

                    //converting long numbers to text with "B", "M" or "K"
                    operationFiles = DGPortal.Constants.getNumberUnit(operationFiles);
                    operationTables = DGPortal.Constants.getNumberUnit(operationTables);

                    this.dataObj.title = "DETECTED DATA " + operationFiles + ' ' + fileText + '/' +
                        operationTables + ' ' + tableText;
                    break;
                case "Gauge_KM4":
                    var totalFiles_Tables = 0, totalProtected = 0, protectedFiles = 0, protectedTables = 0;
                    readData.forEach(function (item, index, array) {
                        if (filterType == DGPortal.Constants.All || item.sourceLocation.toUpperCase() == filterType) {
                            totalFiles_Tables += item.totalFileCount + item.totalTableCount;
                            protectedFiles += item.protectionTableCount;
                            protectedTables += item.protectionFileCount;
                        }
                    }, this);
                    totalProtected = protectedFiles + protectedTables;

                    var protectedPercent = (totalProtected / totalFiles_Tables) * 100;

                    this.dataObj.yVal = protectedPercent ? +protectedPercent.toFixed(1) : 0; //parseFloat(protectedPercent.toPrecision(3));
                    this.dataObj.subtitle = protectedPercent ? Math.round(protectedPercent) + '%' : '0%';

                    var fileText = DGPortal.Constants.getFileText(protectedFiles);
                    var tableText = DGPortal.Constants.getTableText(protectedTables);

                    //converting long numbers to text with "B", "M" or "K"
                    protectedFiles = DGPortal.Constants.getNumberUnit(protectedFiles);
                    protectedTables = DGPortal.Constants.getNumberUnit(protectedTables);

                    this.dataObj.title = 'PROTECTED ' + protectedFiles + ' ' + fileText + '/' +
                        protectedTables + ' ' + tableText;
                    break;
                case "Gauge_KM5":
                    var totalFiles_Tables = 0, totalMonitored = 0, monitoredFiles = 0, monitoredTables = 0;
                    readData.forEach(function (item, index, array) {
                        if (filterType == DGPortal.Constants.All || item.sourceLocation.toUpperCase() == filterType) {
                            totalFiles_Tables += item.totalFileCount + item.totalTableCount;
                            monitoredFiles += item.monitoredFileCount;
                            monitoredTables += item.monitoredTableCount;
                            //totalMonitored += (item.monitoredFileCount + item.monitoredTableCount);
                        }
                    }, this);

                    // totalMonitored = DGPortal.Constants.getNumberUnit(totalMonitored);
                    // var monitoredPercent = (totalMonitored / totalFiles_Tables) * 100;
                    // var fileText = DGPortal.Constants.getFileText(totalMonitored);
                    // this.dataObj.yVal = monitoredPercent ? +monitoredPercent.toFixed(1) : 0;
                    // this.dataObj.subtitle = monitoredPercent ? Math.round(monitoredPercent) + '%' : '0%';
                    // this.dataObj.title = 'ALERTED IN LAST 24HRS ' + totalMonitored + ' ' + fileText;


                    var fileText = DGPortal.Constants.getFileText(monitoredFiles);
                    var tableText = DGPortal.Constants.getTableText(monitoredTables);

                    var totalFiles_Tables = monitoredFiles + monitoredTables;

                    //converting long numbers to text with "B", "M" or "K"
                    totalFiles_Tables = DGPortal.Constants.getNumberUnit(totalFiles_Tables);
                    monitoredFiles = DGPortal.Constants.getNumberUnit(monitoredFiles);
                    monitoredTables = DGPortal.Constants.getNumberUnit(monitoredTables);

                    this.dataObj.yVal = 100;
                    this.dataObj.subtitle = totalFiles_Tables ? totalFiles_Tables : '0';
                    this.dataObj.title = 'ALERTED IN LAST 24HRS ' + monitoredFiles + ' ' + fileText + '/'
                        + monitoredTables + ' ' + tableText;

                    break;
                case "Gauge_KM6":
                    var totalFiles_Tables = 0, totalUnscanned = 0, unscannedFiles = 0, unscannedTables = 0;
                    readData.forEach(function (item, index, array) {
                        if (filterType == DGPortal.Constants.All || item.sourceLocation.toUpperCase() == filterType) {
                            totalFiles_Tables += item.totalFileCount + item.totalTableCount;
                            unscannedFiles += item.unscannedFileCount;
                            unscannedTables += item.unscannedTableCount;
                        }
                    }, this);
                    totalUnscanned = unscannedFiles + unscannedTables;
                    var unscannedPercent = ((unscannedFiles + unscannedTables) / totalFiles_Tables) * 100;

                    var fileText = DGPortal.Constants.getFileText(unscannedFiles);
                    var tableText = DGPortal.Constants.getTableText(unscannedTables);

                    unscannedFiles = DGPortal.Constants.getNumberUnit(unscannedFiles);
                    unscannedTables = DGPortal.Constants.getNumberUnit(unscannedTables);

                    this.dataObj.yVal = unscannedPercent ? +unscannedPercent.toFixed(1) : 0;
                    this.dataObj.subtitle = unscannedPercent ? Math.round(unscannedPercent) + '%' : '0%';
                    this.dataObj.title = 'UNSCANNED ' + unscannedFiles + ' ' + fileText + '/' +
                        unscannedTables + ' ' + tableText;
                    break;
            }
        }
    },

    showDrillDown: function (categoryName) {
        var columnStore = Ext.create('Ext.data.Store', {
            storeId: 'ColumnStore',
            autoLoad: false,
            fields: ['name', 'EXPOSED', 'MASKED', 'MONITORED', 'CLEANED', 'UNSCANNED'],
            data: [{
                'name': 'RS-LAKE',
                'EXPOSED': 1,
                'MASKED': 2,
                'MONITORED': 3,
                'CLEANED': 4,
                'UNSCANNED': 5
            },
                {
                    'name': 'STG',
                    'EXPOSED': 6,
                    'MASKED': 4,
                    'MONITORED': 2,
                    'CLEANED': 8,
                    'UNSCANNED': 1
                }, {
                    'name': 'TDS',
                    'EXPOSED': 9,
                    'MASKED': 4,
                    'MONITORED': 23,
                    'CLEANED': 12,
                    'UNSCANNED': 32

                }, {
                    'name': 'DB2',
                    'EXPOSED': 9,
                    'MASKED': 5,
                    'MONITORED': 23,
                    'CLEANED': 12,
                    'UNSCANNED': 32

                }, {
                    'name': 'DW1',
                    'EXPOSED': 11,
                    'MASKED': 8,
                    'MONITORED': 7,
                    'CLEANED': 13,
                    'UNSCANNED': 12

                },
                {
                    'name': 'APS-HIVE',
                    'EXPOSED': 11,
                    'MASKED': 8,
                    'MONITORED': 7,
                    'CLEANED': 13,
                    'UNSCANNED': 12

                }, {
                    'name': 'SOC-S3',
                    'EXPOSED': 11,
                    'MASKED': 8,
                    'MONITORED': 7,
                    'CLEANED': 13,
                    'UNSCANNED': 12

                }, {
                    'name': 'STM-SS3',
                    'EXPOSED': 11,
                    'MASKED': 8,
                    'MONITORED': 7,
                    'CLEANED': 13,
                    'UNSCANNED': 12
                }]
        });

        var window = Ext.create('Ext.window.Window', {
            layout: 'fit',
            title: 'DG Dashboard - ' + categoryName,
            width: 615,
            items: [{
                xtype: 'gridpanel',
                defaultAlign: 'c?',
                store: columnStore,
                modal: true,
                columns: [
                    { text: 'NAME', dataIndex: 'name' },
                    { text: 'EXPOSED', dataIndex: 'EXPOSED' },
                    { text: 'MASKED', dataIndex: 'MASKED' },
                    { text: 'MONITORED', dataIndex: 'MONITORED' },
                    { text: 'CLEANED', dataIndex: 'CLEANED' },
                    { text: 'UNSCANNED', dataIndex: 'UNSCANNED' },
                ]
            }]
        });

        window.show(null, function () {
            var x = ((Ext.getBody().dom.clientWidth - this.getWidth()) / 2);          
            this.setPosition(x);
        });
    }

});