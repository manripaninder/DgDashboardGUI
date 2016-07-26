Ext.define('DGPortal.view.ColumnBar', {
    extend: 'Ext.Component',
    alias: 'widget.columnBar',
    height: 170,
    margin: '0 0 10 10',
    //padding: '0 0 0 10',
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
    onLoad: function (_this, records) {
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

    drawChart: function () {
        this.log(this.rendered);
        this.chart = new Highcharts.Chart(
            {
                chart: {
                    type: 'column',
                    borderWidth: 0.8,
                    borderColor: '#cccccc',
                    spacingBottom: 0,
                    //spacingLeft: 2,
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
                colors: ['#e61d27', '#fdbf2d', '#0071cd', '#44b649', '#f6852a'],
                xAxis: {
                    categories: ['RS-LAKE', 'STG-LAKE', 'TDS', 'DB2', 'DW1', 'APS-HIVE', 'SOC-S3', 'STM-SS3'],
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
                            fontFamily: 'helvetica',
                            color: '#717171'
                        },
                    }
                },
                yAxis: {
                    visible: this.chartYAxisVisible,
                    gridLineWidth: 0,
                    offset: 10,
                    title: {
                        enabled: false,
                    },
                    labels: {
                        align: 'right',
                        x: 10,
                        y: -2,
                        formatter: function () {
                            return this.value + "k";
                        }
                    },
                    tickInterval: 2,
                    tickAmount: 4
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
                        textTransform: 'uppercase'
                    }
                },
                legend: {
                    visible: this.chartYAxisVisible,
                    align: 'left',
                    itemMarginBottom: 0,
                    itemStyle: {
                        fontSize: '8px',
                        fontWeight: 'normal',
                        fontFamily: 'helvetica'

                    },
                    symbolHeight: 10,
                    symbolWidth: 10,
                    itemDistance: 8
                },
                series: [{
                    name: 'Exposed',
                    data: [9.9, 7.5, 10.4, 12.2, 14.0, 17.0, 13.6, 14.5]
                }, {
                        name: 'Masked',
                        data: [8.6, 7.8, 9.5, 3.4, 10.0, 4.5, 10.0, 10.3]
                    }, {
                        name: 'Monitored',
                        data: [8.9, 38.8, 39.3, 41.4, 47.0, 18.3, 43.0, 29.6]
                    }, {
                        name: 'Cleaned',
                        data: [32.4, 33.2, 34.5, 39.7, 22.6, 45.5, 37.4, 34.4]
                    }, {
                        name: 'Unscanned',
                        data: [42.4, 33.2, 34.5, 39.7, 12.6, 22.5, 27.4, 33.4]
                    }]
            }
        );
    },

    listeners: {
        resize: function () {
            if (this.rendered && this.chart) {
                this.chart.reflow();
            }
        }
    },

    getStoreData: function (records) {
        if (this.store && this.store.first()) {
            var arData = this.store.first().data.sourceList;
            if (arData && Array.isArray(arData)) {
                switch (this.id) {
                    case 'protected':
                }
            }
        }
    }
});