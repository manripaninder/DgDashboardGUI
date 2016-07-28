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
        this.log("Called refresh of " + this.id);
        var point = this.chart.series[0].points[0];
        point.update(25);
        var title = this.chart.title;
        this.chart.setTitle({
            text: 'NEW TITLE '
        }, { text: '4' });
        this.chart.redraw();
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
                },
                exporting: {
                    enabled: false
                },
                title: {
                    text: this.dataObj.title,
                    style: {
                        fontSize: '11px',
                        color: '#555555',
                        fontFamily: 'montserratregular',
                        fontWeight: 'bold',
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
                        fontWeight: 'bold',
                        fontSize: '32px',
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
                        stickyTracking: false
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

        var imgHeight = this.symbolPath.includes('lock') ? 16 : 13;
        var imgWidth = 12;
        var xVal = (this.getWidth() / 2) - (imgWidth / 2);
        this.renderedImage = this.chart.renderer.image(this.symbolPath, xVal, 22, imgWidth, imgHeight).add();
    },

    getStoreData: function (records) {
        //console.log(records);
        if (this.store && this.store.first()) {
            var arData = this.store.first().data.sourceList;
            if (arData && Array.isArray(arData)) {
                //console.log(arData);
                switch (this.id) {
                    case "Gauge_KM1":
                        this.dataObj.yVal = 100;
                        this.dataObj.subtitle = arData.length;
                        this.dataObj.title = (arData.length > 1) ? arData.length + ' SOURCES' : arData.length + ' SOURCE';
                        break;
                    case "Gauge_KM2":
                        this.dataObj.yVal = 100;
                        var totalFiles_Tables;
                        arData.forEach(function (element, index, array) {
                            objSource = JSON.parse(element.value);
                            totalFiles_Tables = objSource.totalFileCount + objSource.totalTableCount;
                        }, this);
                        this.dataObj.subtitle = totalFiles_Tables;
                        this.dataObj.title = totalFiles_Tables + " FILES/TABLES";
                        break;
                    case "Gauge_KM3":

                        break;
                    case "Gauge_KM4":
                        var totalFiles_Tables, totalProtected, protectedFiles, protectedTables;
                        arData.forEach(function (element, index, array) {
                            objSource = JSON.parse(element.value);
                            totalFiles_Tables = objSource.totalFileCount + objSource.totalTableCount;
                            protectedFiles = objSource.protectionTableCount;
                            protectedTables = objSource.protectionFileCount;
                        }, this);
                        totalProtected = protectedFiles + protectedTables;
                        var protectedPercent = (totalProtected / totalFiles_Tables) * 100;
                        this.dataObj.yVal = +protectedPercent.toFixed(1); //parseFloat(protectedPercent.toPrecision(3));
                        this.dataObj.subtitle = Math.round(protectedPercent) + '%';
                        var fileText = DGPortal.Constants.getFileText(protectedFiles);
                        var tableText = DGPortal.Constants.getTableText(protectedTables);

                        this.dataObj.title = 'PROTECTED ' + protectedFiles + ' ' + fileText + '/' +
                            protectedTables + ' ' + tableText;
                        break;
                    case "Gauge_KM5":
                        break;
                    case "Gauge_KM6":
                        var totalFiles_Tables, totalUnscanned, unscannedFiles, unscannedTables;
                        arData.forEach(function (element, index, array) {
                            objSource = JSON.parse(element.value);
                            totalFiles_Tables = objSource.totalFileCount + objSource.totalTableCount;
                            unscannedFiles = objSource.unscannedFileCount;
                            unscannedTables = objSource.unscannedTableCount;
                        }, this);
                        totalUnscanned = unscannedFiles + unscannedTables;
                        var unscannedPercent = ((unscannedFiles + unscannedTables) / totalFiles_Tables) * 100;

                        var fileText = DGPortal.Constants.getFileText(unscannedFiles);
                        var tableText = DGPortal.Constants.getTableText(unscannedTables);

                        this.dataObj.yVal = +unscannedPercent.toFixed(1);
                        this.dataObj.subtitle = Math.round(unscannedPercent) + '%';
                        this.dataObj.title = 'UNSCANNED ' + unscannedFiles + ' ' + fileText + '/' +
                            unscannedTables + ' ' + tableText;
                        break;
                }
            }

        }
    }

});