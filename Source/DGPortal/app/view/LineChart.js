Ext.define('DGPortal.view.LineChart', {
    extend: 'Ext.Component',
    alias: 'widget.lineChart',
    height: 170,
    margin: '0 0 10 10',
    dataObj: {},
    //padding: '0,5,0,5',
    chartTitle: null,
    mainSectionName: null,
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

    drawChart: function () {
        //hide mask  
        this.removeCls('customLoadMask');

        this.log(this.rendered);

        Highcharts.setOptions(
            {
                lang:
                {
                    noData: "No data to display",
                    //maximizeTooltip='Maximize', //for tooltip on context button
                    contextButtonTitle: 'Maximize' //for tooltip on context button
                }
            }
        );

        this.chart = new Highcharts.Chart(
            {
                chart: {
                    type: 'line',
                    borderWidth: 0.8,
                    borderColor: '#cccccc',
                    renderTo: this.getId(),
                    spacingBottom: 5
                    //marginTop: 2,
                    // spacingLeft: 2,
                    // spacingRight: 10,
                    // height: 176,
                    // width: 410,
                    // marginBottom: 50,
                    // marginLeft:35

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
                        style: {
                            fontSize: '8px',
                            fontFamily: 'montserratregular',
                            color: '#646464'
                            //fontWeight: 'bold'
                        }
                    }
                },
                yAxis: {
                    gridLineDashStyle: 'solid',
                    offset: 10,
                    min: 0,
                    minRange: 1,
                    title: {
                        enabled: false
                    },
                    labels: {
                        align: 'right',
                        x: 10,
                        y: -2
                        // tickInterval: 2,
                        // tickAmount: 4
                    }
                },
                // tooltip: {
                //     valueSuffix: '?C'
                // },
                title: {
                    align: "left",
                    text: this.chartTitle,
                    style: {
                        color: '#0071ce',
                        fontSize: '14px',
                        fontWeight: 'normal',
                        fontFamily: 'montserratregular',
                        textTransform: 'uppercase'
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            enabled: true,
                            menuItems: null,
                            onclick: function () {
                                createGraph(this);
                            },
                            //_titleKey: 'maximizeTooltip', //for tooltip on button
                            symbol: 'url(resources/images/max.png)',
                            symbolX: 12,
                            symbolY: 11,
                            theme: {
                                'stroke-width': 0,
                                //r: 0,
                                states: {
                                    hover: {
                                        fill: '#cccccc'
                                    }
                                }
                            }
                        }
                    }
                },
                legend: {
                    align: 'center',
                    itemMarginBottom: 0,
                    itemStyle: {
                        fontSize: '8px',
                        fontWeight: 'normal',
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
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    var categoryName = this.category;
                                    var compId = this.series.chart.renderTo.id;

                                    //if compId is not present that means click event is from highSlide window so taking originalRenderTo_Id from it.
                                    if (!compId) {
                                        compId = this.series.chart.options.chart.originalRenderTo_Id;
                                    }

                                    var compObj = Ext.ComponentQuery.query('#' + compId)[0];
                                    compObj.showDrillDown(compObj.mainSectionName, compObj.chartTitle, categoryName);
                                }
                            }
                        }
                    }
                },
                series: this.dataObj.series
            }
        );

    },

    // private
    onLoad: function (_this, records, successful, eOpts) {
        this.dataObj.colors = [];
        this.dataObj.xAxisCategories = [];
        this.dataObj.series = [];

        //if no records are present then return with creating empty chart.  
        if (!successful || records[0].data.sourceList.length < 1) {
            this.drawChart();
            return;
        }


        // this.dataObj.xAxisCategories = ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'];
        // this.dataObj.series = [{
        //     name: 'Exposed',
        //     data: [50, 150, 200, 100, 60, 290],
        //     marker: {
        //         symbol: 'circle'
        //     }

        // }, {
        //         name: 'Masked',
        //         data: [100, 100, 50, 200, 300, 180],
        //         marker: {
        //             symbol: 'circle'
        //         }

        //     }, {
        //         name: 'Monitored',
        //         data: [150, 50, 150, 220, 250, 320],
        //         marker: {
        //             symbol: 'circle'
        //         }

        //     }, {
        //         name: 'Cleaned',
        //         data: [220, 200, 250, 280, 130, 80],
        //         marker: {
        //             symbol: 'circle'
        //         }

        //     }, {
        //         name: 'Unscanned',
        //         data: [250, 270, 300, 350, 390, 380],
        //         marker: {
        //             symbol: 'circle'
        //         }
        //     }];


        this.log(this.store);
        this.log('OnLoad of ' + this.id + " is called.");

        this.getStoreData(records);

        if (!this.chart) {
            this.log("Call refresh from onLoad for initAnim");
            //this.buildInitData();
            //this.chart = new Highcharts.Chart(_this.chartConfig, this.afterChartRendered);
            this.drawChart();
            if (this.afterGaugeRendered) (this.afterGaugeRendered());
            return;
        }

        // this.log("Call refresh from onLoad of " + this.id);
        // //this.refreshOnLoad && this.refresh();
        // this.refresh();
    },

    onDataChange: function (_this, eOpts) {
        if (this.chart) {

            //when no data is present draw chart with empty colors so that legends doesn't appear and return.
            if (this.readData === undefined || this.readData.length < 1) {
                this.dataObj.colors = [];
                this.drawChart();
                return;
            }

            this.populateData(this.readData, _this.dataType);
            this.drawChart();
            //console.log(eOpts);
            // this.store.clearFilter(true);
            // console.log(this.id + "  after ClearFilter");
            // console.log(this.store);
        }

    },

    listeners: {
        resize: function () {
            if (this.rendered && this.chart) {
                this.chart.reflow();
            }
        },
        render: function () {
            //show loading gif with css style         
            this.addCls('customLoadMask');
        }
    },

    getStoreData: function (records) {
        //console.log(records);
        if (this.store && this.store.first()) {
            var arData = this.store.first().data.sourceList;
            if (arData && Array.isArray(arData)) {
                this.fetchData(arData);
            }
        }
    },

    //method for fetching and saving data
    fetchData: function (arData) {
        //adding readData property to collect data when class is instantiated for Protected chart
        var arReadData = [];
        arData.forEach(function (element, index, array) {
            var objValue = JSON.parse(element.value);
            arReadData.push(objValue);
        }, this);

        //sorting the months
        var allMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        arReadData.sort(function (a, b) {
            var a_MonthVal = a.trendMonth.split('-')[0].toUpperCase();
            var b_MonthVal = b.trendMonth.split('-')[0].toUpperCase();
            var result = allMonths.indexOf(a_MonthVal) > allMonths.indexOf(b_MonthVal);
            var i = result ? 1 : -1;
            return i;
        });

        this.readData = new Ext.util.MixedCollection();
        arReadData.forEach(function (element, index, array) {
            var splitVal = element.trendMonth.split('-');

            var month = splitVal[0].toUpperCase();
            var year = splitVal[1].substr(2, 2);
            var reqFormatVal = month + '-' + year;

            //adding unique months to hashMap
            if (this.readData.containsKey(reqFormatVal)) {
                var arValues = this.readData.get(reqFormatVal);
                arValues.push(element);
            } else {
                var arValues = [element];
                this.readData.add(reqFormatVal, arValues);
            }
        }, this);
        this.populateData(this.readData, DGPortal.Constants.All);
    },

    //method for populating data
    populateData: function (readData, location) {
        var arXAxisCatgs = [];
        var exposed = { name: 'EXPOSED', data: [], marker: { symbol: 'circle' } };
        var masked = { name: 'MASKED/ENCRYPTED', data: [], marker: { symbol: 'circle' } };
        var monitored = { name: 'MONITORED', data: [], marker: { symbol: 'circle' } };
        var clean = { name: 'CLEANED', data: [], marker: { symbol: 'circle' } };
        var unscanned = { name: 'UNSCANNED', data: [], marker: { symbol: 'circle' } };

        if (readData && readData.length > 0) {
            readData.eachKey(function (monthKey, arValues, index, length) {
                var eligibleElement = false;
                var exposedVal = 0, maskedEncrytedVal = 0, monitoredVal = 0, cleanVal = 0, unscannedVal = 0;

                if (arValues && arValues.length > 0) {
                    arValues.forEach(function (element, index, array) {
                        if (location == DGPortal.Constants.All || location == element.location.toUpperCase()) {
                            //if location criteria qualifies then setting eligibleElement equals to true.
                            eligibleElement = true;
                            exposedVal += element.exposed;
                            maskedEncrytedVal += element.maskedEncryted;
                            monitoredVal += element.monitored;
                            cleanVal += element.cleaned;
                            unscannedVal += element.unscanned;
                        }
                    }, this);
                }

                //adding data only when eligibleElement is true.
                if (eligibleElement) {
                    arXAxisCatgs.push(monthKey);
                    exposed.data.push(exposedVal);
                    masked.data.push(maskedEncrytedVal);
                    monitored.data.push(monitoredVal);
                    clean.data.push(cleanVal);
                    unscanned.data.push(unscannedVal);
                }
            }, this);
        }

        this.dataObj.colors = ['#e61d27', '#fdbf2d', '#0071cd', '#44b649', '#f6852a']
        this.dataObj.xAxisCategories = arXAxisCatgs;
        this.dataObj.series = [exposed, masked, monitored, clean, unscanned];

    },

    showDrillDown: function (mainSectionName, chartFor, categoryName) {
        var config = {
            mainSectionName: mainSectionName,
            chartFor: chartFor,
            categoryName: categoryName,
            drillIn_DependentChartId: undefined,
            actualDataMap: this.readData.getByKey(categoryName),
            selectedFilter: selectedFilter  //selectedFilter is a global variable to know the currently selected filter out All, On-Premise and Cloud,
        };
        var chartDrillIn = DGPortal.factory.ChartDrillIn.create(DGPortal.Constants.COVTREND_CHART, config);
    }
});