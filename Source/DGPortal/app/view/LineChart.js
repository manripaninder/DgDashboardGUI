Ext.define('DGPortal.view.LineChart', {
    extend: 'Ext.Component',
    alias: 'widget.lineChart',
    height: 170,
    margin: '0 0 10 10',
    //padding: '0,5,0,5',
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
                    //datachanged: this.onDataChange
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

    drawChart: function () {
        this.log(this.rendered);
        this.chart = new Highcharts.Chart(
            {
                chart: {
                    type: 'line',
                    borderWidth: 0.8,
                    borderColor: '#cccccc',
                    renderTo: this.getId(),
                    spacingBottom: 0,
                    //marginTop: 2,
                    // spacingLeft: 2,
                    // spacingRight: 10,
                    // height: 176,
                    // width: 410,
                    // marginBottom: 50,
                    // marginLeft:35

                },
                colors: ['#e61d27', '#fdbf2d', '#0071cd', '#44b649', '#f6852a'],
                xAxis: {
                    categories: ['JAN', 'MAR', 'MAY',
                        'JUL', 'SEP', 'NOV'],
                    tickWidth: 0,
                    lineWidth: 0,
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    lineColor: 'transparent',
                    labels: {
                        style: {
                            fontSize: '8px',
                            fontFamily: 'montserratregular',
                            color: '#646464',
                            //fontWeight: 'bold'
                        }
                    },
                },
                yAxis: {
                    gridLineDashStyle: 'solid',
                    offset: 10,
                    endOnTick:false,
                    title: {
                        enabled: false,
                    },
                    labels: {
                        align: 'right',
                        x: 10,
                        y: -2,
                        // tickInterval: 2,
                        // tickAmount: 4
                    }
                },
                // tooltip: {
                //     valueSuffix: '�C'
                // },
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
                credits: {
                    enabled: false
                },
                exports: {
                    button: 'null'
                },
                legend: {
                    align: 'center',
                    itemMarginBottom: 0,
                    itemStyle: {
                        fontSize: '8px',
                        //fontWeight: 'bold',
                        fontFamily: 'montserratregular',
                        color: '#646464'
                    },
                    symbolHeight: 10,
                    symbolWidth: 10,
                    itemDistance: 8
                },
                plotOptions: {
                    series: {
                        marker: {
                            fillColor: '#FFFFFF',
                            lineWidth: 2,
                            lineColor: null // inherit from series
                        }
                    }
                },
                series: [{
                    name: 'Exposed',
                    data: [50, 150, 200, 100, 60, 290],
                    marker: {
                        symbol: 'circle'
                    }

                }, {
                        name: 'Masked',
                        data: [100, 100, 50, 200, 300, 180],
                        marker: {
                            symbol: 'circle'
                        }

                    }, {
                        name: 'Monitored',
                        data: [150, 50, 150, 220, 250, 320],
                        marker: {
                            symbol: 'circle'
                        }

                    }, {
                        name: 'Cleaned',
                        data: [220, 200, 250, 280, 130, 80],
                        marker: {
                            symbol: 'circle'
                        }

                    }, {
                        name: 'Unscanned',
                        data: [250, 270, 300, 350, 390, 380],
                        marker: {
                            symbol: 'circle'
                        }
                    }]
            }
        );
    },

    // private
    onLoad: function () {
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
    }

});