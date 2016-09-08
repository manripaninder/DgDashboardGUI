


Ext.namespace('DGPortal.factory.ChartDrillIn');

/** 
 * @class DGPortal.factory.ChartDrillIn 
 * @constructor
 * @param {Object} config Configuration options
 */

Ext.define('DGPortal.factory.ChartDrillIn', {
    alias: 'widget.chartDrillIn',
    singleton: true,
    create: function (type, config) {
        var grid;
        switch (type) {
            case DGPortal.Constants.KMGAUGE:
                this.showKMGaugeDrillIn(config);
                break;
            case DGPortal.Constants.C_L_CHART:
                this.showChartDrillIn(config);
                break;
            case DGPortal.Constants.COVTREND_CHART:
                this.showCovTrendDrillIn(config);
                break;
        }
    },
    showChartDrillIn: function (config) {
        var arFields;
        var categoryData;
        var mainSectionName = config.mainSectionName;
        var categoryName = config.categoryName;
        var chartFor = config.chartFor;
        var actualDataMap = config.actualDataMap;
        var sourceLocationKeys = actualDataMap.getKeys();
        var currentSourceLocation, firstGridTypeLblText, firstGridDataObj;

        //adding actual data in hashMap for drill-in
        for (var i = 0; i < sourceLocationKeys.length; i++) {
            var sourceLocationKey = sourceLocationKeys[i];
            var sourceLocationMap = actualDataMap.get(sourceLocationKey);
            if (sourceLocationMap && sourceLocationMap.containsKey(categoryName)) {
                var sourceObj = sourceLocationMap.get(categoryName);

                //take sourceLocation of current object
                currentSourceLocation = sourceObj.arData[0].sourceLocation.toUpperCase();

                firstGridTypeLblText = categoryName + '/' + currentSourceLocation;

                categoryData = sourceObj.arData;
                arFields = Object.keys(categoryData[0]);
                firstGridDataObj = new GridData(categoryData, arFields);
                break;
            }
        }




        var columnStore = Ext.create('Ext.data.Store', {
            storeId: 'ColumnStore',
            autoLoad: false,
            fields: arFields,
            data: categoryData
        });

        //show window
        this.showDrillInWindow(firstGridDataObj, mainSectionName, chartFor, firstGridTypeLblText);

    },
    showKMGaugeDrillIn: function (config) {
        var firstGridDataObj;
        var secondGridDataObj;
        var firstTypeData = [];
        var secondTypeData = [];
        var mainSectionName = config.mainSectionName;
        var categoryName = config.categoryName;
        var chartFor = config.chartFor;
        var selectedFilter = config.selectedFilter;
        var drillIn_DependentChartId = config.drillIn_DependentChartId;
        var actualDataMap = config.actualDataMap;
        var sourceLocationKeys, firstGridTypeLblText, secondGridTypeLblText;

        if (actualDataMap === undefined) {
            var dependentChart = Ext.ComponentQuery.query('#' + drillIn_DependentChartId)[0];
            actualDataMap = dependentChart.actualDataMap;
            if (actualDataMap) sourceLocationKeys = actualDataMap.getKeys();
        }
        else {
            sourceLocationKeys = actualDataMap.getKeys();
        }

        //adding actual data in hashMap for drill-in
        if (selectedFilter == DGPortal.Constants.All) {
            for (var i = 0; i < sourceLocationKeys.length; i++) {
                var sourceLocationKey = sourceLocationKeys[i];
                var sourceLocationMap = actualDataMap.get(sourceLocationKey);
                if (i == 0) {
                    sourceLocationMap.each(function (key, value, length) {
                        var arObjects = value.arData;
                        firstTypeData.push.apply(firstTypeData, arObjects);
                    }, this);
                    var arFields = Object.keys(firstTypeData[0]);
                    firstGridDataObj = new GridData(firstTypeData, arFields);
                    firstGridTypeLblText = sourceLocationKey;
                } else {
                    sourceLocationMap.each(function (key, value, length) {
                        var arObjects = value.arData;
                        secondTypeData.push.apply(secondTypeData, arObjects);
                    }, this);
                    var arFields = Object.keys(secondTypeData[0]);
                    secondGridDataObj = new GridData(secondTypeData, arFields);
                    secondGridTypeLblText = sourceLocationKey;
                }
            }
        } else {
            if (actualDataMap.containsKey(selectedFilter)) {
                var sourceLocationMap = actualDataMap.get(selectedFilter);
                sourceLocationMap.each(function (key, value, length) {
                    var arObjects = value.arData;
                    firstTypeData.push.apply(firstTypeData, arObjects);
                }, this);

                firstGridTypeLblText = firstTypeData[0].sourceLocation.toUpperCase();

                var arFields = Object.keys(firstTypeData[0]);
                firstGridDataObj = new GridData(firstTypeData, arFields);
            }
        }

        //show window
        this.showDrillInWindow(firstGridDataObj, mainSectionName, chartFor, firstGridTypeLblText, secondGridDataObj, secondGridTypeLblText)

    },
    showCovTrendDrillIn: function (config) {
        var firstGridDataObj;
        var secondGridDataObj;
        var firstGridTypeName;
        var firstTypeData = [];
        var secondTypeData = [];
        var mainSectionName = config.mainSectionName;
        var categoryName = config.categoryName;
        var chartFor = config.chartFor;
        var selectedFilter = config.selectedFilter;
        var drillIn_DependentChartId = config.drillIn_DependentChartId;
        var monthData = config.actualDataMap;
        var firstGridTypeLblText, secondGridTypeLblText;

        if (!monthData) {
            return;
        }

        var sourceLocationMap = new Ext.util.MixedCollection();

        monthData.forEach(function (element, index, array) {
            var sourceLoc = element.sourceLocation.toUpperCase();
            //adding unique sourceLocation with respective objects
            if (sourceLocationMap.containsKey(sourceLoc)) {
                var arValues = sourceLocationMap.get(sourceLoc);
                arValues.push(element);
            } else {
                var arValues = [element];
                sourceLocationMap.add(sourceLoc, arValues);
            }
        });

        //debugger;
        //adding actual data in hashMap for drill-in
        if (selectedFilter == DGPortal.Constants.All) {
            sourceLocationMap.eachKey(function (key, items, index, array) {
                if (firstGridTypeName == undefined) {
                    firstGridTypeName = key;
                    var arFields = Object.keys(items[0]);
                    firstGridDataObj = new GridData(items, arFields);
                    firstGridTypeLblText = categoryName + '/' + key;
                } else {
                    var arFields = Object.keys(items[0]);
                    secondGridDataObj = new GridData(items, arFields);
                    secondGridTypeLblText = categoryName + '/' + key;;
                }
            }, this);
        } else if (sourceLocationMap.containsKey(selectedFilter)) {
            var items = sourceLocationMap.get(selectedFilter);

            firstGridTypeLblText = categoryName + '/' + items[0].sourceLocation.toUpperCase();

            var arFields = Object.keys(items[0]);
            firstGridDataObj = new GridData(items, arFields);
        }

        //show window
        this.showDrillInWindow(firstGridDataObj, mainSectionName, chartFor, firstGridTypeLblText, secondGridDataObj, secondGridTypeLblText)
    },
    showDrillInWindow: function (firstGridDataObj, mainSectionName, chartFor, firstGridTypeLblText, secondGridDataObj, secondGridTypeLblText) {
        var windowMaxHeight = Ext.getBody().dom.clientHeight * 0.8;
        var windowMaxWidth = Ext.getBody().dom.clientWidth * 0.8;

        if (firstGridDataObj) {
            var firstTypeStore = Ext.create('Ext.data.Store', {
                storeId: 'firstTypeStore',
                autoLoad: false,
                fields: firstGridDataObj.arFields,
                data: firstGridDataObj.data
            });

            var window = Ext.create('Ext.window.Window', {
                // layout: {
                //     type: 'vbox',
                //     align: 'stretch'
                // }, 
                title: mainSectionName,
                bodyStyle: {
                    background: '#ffffff',
                },
                maxHeight: windowMaxHeight,
                maxWidth: windowMaxWidth,
                minHeight: 100,
                minWidth: 200,
                //autoScroll: true,
                // overflowY: 'auto',
                overflowX: 'auto',
                resizable: false,
                plain: true,
                modal: true,
                bodyPadding: '0 10 0 10',
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        margin: '0 10 10 10',
                        items: [
                            {
                                xtype: 'label',
                                text: chartFor,
                                cls: 'drillDownHeader',
                            },
                            //adding label to identify data in first grid.
                            {
                                xtype: 'label',
                                text: firstGridTypeLblText,
                                cls: 'drillDownLabel',
                                //hidden: !(selectedFilter == DGPortal.Constants.All && secondGridDataObj) //showing only when data for types are present.
                            },
                            {
                                xtype: 'gridpanel',
                                defaultAlign: 'c?',
                                store: firstTypeStore,
                                margin: '0 0 10 0',
                                autoScroll: false,
                                columns: firstGridDataObj.arColumns
                                // bbar: {
                                //     xtype: 'pagingtoolbar',
                                //     store: firstTypeStore,
                                //     displayInfo: true,
                                //     displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
                                //     emptyMsg: "No records to display&nbsp;"
                                // }
                            }
                        ],
                    }
                ],
                listeners: {
                    afterlayout: function (_this, layout, eOpts) {
                        //if (_this.layout.firedTriggers == layout.layoutCount) {                       
                        var x = ((Ext.getBody().dom.clientWidth - _this.getWidth()) / 2);
                        var y = ((Ext.getBody().dom.clientHeight - _this.getHeight()) / 2);
                        _this.setPosition(x, y);
                        //}
                    }
                }
            });

            if (selectedFilter == DGPortal.Constants.All && secondGridDataObj) {
                var secondTypeStore = Ext.create('Ext.data.Store', {
                    storeId: 'secondTypeStore',
                    autoLoad: false,
                    fields: secondGridDataObj.arFields,
                    data: secondGridDataObj.data
                });

                //adding label to identify data in second grid.
                var secondGridTypeLbl = Ext.create('Ext.form.Label', {
                    text: secondGridTypeLblText,
                    cls: 'drillDownLabel',
                });
                window.items.items[0].add(secondGridTypeLbl);

                var secondGrid = Ext.create('Ext.grid.Panel', {
                    store: secondTypeStore,
                    margin: '0 0 10 0',
                    columns: secondGridDataObj.arColumns
                });
                window.items.items[0].add(secondGrid);
                //window.items.add(secondGrid);
            }
            window.show(null);
            var windowDomEl = window.getEl().dom;
            var windowBodyHeight = windowDomEl.offsetHeight + windowDomEl.scrollHeight;
            if (windowBodyHeight > windowMaxHeight) {
                window.setOverflowXY('auto', 'auto');
            }
        }
    }
});



function GridData(data, arFields) {
    this.data = data;
    this.arFields = arFields;
    this.arColumns = getGridColumns(arFields);
}

function getGridColumns(arFields) {
    var arColumns = [];
 
    if (arFields) {
        arFields.forEach(function (element) {
            if (element.toUpperCase() != 'SOURCELOCATION') {
                var val = headerNamesHashMap.get(element);
                arColumns.push({ text: val, dataIndex: element });
            }
        });
    }
    return arColumns;
}


   
   