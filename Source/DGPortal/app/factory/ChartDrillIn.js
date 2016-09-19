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
        var locationKeys = actualDataMap.getKeys();
        var currentLocation, firstGridTypeLblText, firstGridDataObj;

        //adding actual data in hashMap for drill-in
        for (var i = 0; i < locationKeys.length; i++) {
            var locationKey = locationKeys[i];
            var locationMap = actualDataMap.get(locationKey);
            if (locationMap && locationMap.containsKey(categoryName)) {
                var sourceObj = locationMap.get(categoryName);

                //take location of current object
                currentLocation = sourceObj.arData[0].location.toUpperCase();

                firstGridTypeLblText = categoryName + '/' + currentLocation;

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
        var locationKeys, firstGridTypeLblText, secondGridTypeLblText;

        if (actualDataMap === undefined) {
            var dependentChart = Ext.ComponentQuery.query('#' + drillIn_DependentChartId)[0];
            if (dependentChart && dependentChart.actualDataMap) {
                actualDataMap = dependentChart.actualDataMap;
                locationKeys = actualDataMap.getKeys().sort();
            }
        }
        else {
            locationKeys = actualDataMap.getKeys().sort();
        }

        //return if locationKeys doesn't have value, that means data is not present.
        if (!locationKeys) {
            return;
        }

        //adding actual data in hashMap for drill-in
        if (selectedFilter == DGPortal.Constants.All) {
            for (var i = 0; i < locationKeys.length; i++) {
                var locationKey = locationKeys[i];
                var locationMap = actualDataMap.get(locationKey);
                if (i == 0) {
                    locationMap.each(function (key, value, length) {
                        var arObjects = value.arData;
                        firstTypeData.push.apply(firstTypeData, arObjects);
                    }, this);
                    var arFields = Object.keys(firstTypeData[0]);
                    firstGridDataObj = new GridData(firstTypeData, arFields);
                    firstGridTypeLblText = locationKey;
                } else {
                    locationMap.each(function (key, value, length) {
                        var arObjects = value.arData;
                        secondTypeData.push.apply(secondTypeData, arObjects);
                    }, this);
                    var arFields = Object.keys(secondTypeData[0]);
                    secondGridDataObj = new GridData(secondTypeData, arFields);
                    secondGridTypeLblText = locationKey;
                }
            }
        } else {
            if (actualDataMap.containsKey(selectedFilter)) {
                var locationMap = actualDataMap.get(selectedFilter);
                locationMap.each(function (key, value, length) {
                    var arObjects = value.arData;
                    firstTypeData.push.apply(firstTypeData, arObjects);
                }, this);

                firstGridTypeLblText = firstTypeData[0].location.toUpperCase();

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

        var locationMap = new Ext.util.MixedCollection();

        monthData.forEach(function (element, index, array) {
            var sourceLoc = element.location.toUpperCase();
            //adding unique location with respective objects
            if (locationMap.containsKey(sourceLoc)) {
                var arValues = locationMap.get(sourceLoc);
                arValues.push(element);
            } else {
                var arValues = [element];
                locationMap.add(sourceLoc, arValues);
            }
        });

        //debugger;
        //adding actual data in hashMap for drill-in
        if (selectedFilter == DGPortal.Constants.All) {
            locationMap.eachKey(function (key, items, index, array) {
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
        } else if (locationMap.containsKey(selectedFilter)) {
            var items = locationMap.get(selectedFilter);

            firstGridTypeLblText = categoryName + '/' + items[0].location.toUpperCase();

            var arFields = Object.keys(items[0]);
            firstGridDataObj = new GridData(items, arFields);
        }

        //show window
        this.showDrillInWindow(firstGridDataObj, mainSectionName, chartFor, firstGridTypeLblText, secondGridDataObj, secondGridTypeLblText)
    },
    showDrillInWindow: function (firstGridDataObj, mainSectionName, chartFor, firstGridTypeLblText, secondGridDataObj, secondGridTypeLblText) {
        var windowMaxHeight = Math.round(Ext.getBody().dom.clientHeight * 0.8);
        var windowMaxWidth = Math.round(Ext.getBody().dom.clientWidth * 0.8);

        if (firstGridDataObj) {
            var firstTypeStore = Ext.create('Ext.data.Store', {
                storeId: 'firstTypeStore',
                autoLoad: false,
                fields: firstGridDataObj.arFields,
                data: firstGridDataObj.data
            });

            var windowObj = Ext.create('Ext.window.Window', {
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
                minWidth: 150,
                //autoScroll: true,
                // overflowY: 'auto',
                overflowX: 'auto',
                resizable: false,
                plain: true,
                modal: true,
                bodyPadding: '0 0 0 0',
                closeAction: 'destroy',
                items: [
                    {
                        xtype: 'panel',
                        // layout: {
                        //     type: 'vbox',
                        //     align: 'stretch'
                        // },
                        margin: '0 0 10 0',
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
                                store: firstTypeStore,
                                margin: '0 20 10 20',
                                autoScroll: false,
                                columns: firstGridDataObj.arColumns,
                                // bbar: {
                                //     xtype: 'pagingtoolbar',
                                //     store: firstTypeStore,
                                //     displayInfo: true,
                                //     displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
                                //     emptyMsg: "No records to display&nbsp;"
                                // }
                            },
                        ],
                    }
                ],
                // listeners: {
                //     afterlayout: function (_this, layout, eOpts) {
                //         // // var dom = window.getEl().dom;                        
                //         // // //if (_this.layout.firedTriggers == layout.layoutCount) {
                //         // var x = ((Ext.getBody().dom.clientWidth - _this.getWidth()) / 2);
                //         // var y = ((Ext.getBody().dom.clientHeight - _this.getHeight()) / 2);
                //         // _this.setPosition(x, y);
                //         //}
                //     }
                // }
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
                windowObj.items.items[0].add(secondGridTypeLbl);

                var secondGrid = Ext.create('Ext.grid.Panel', {
                    store: secondTypeStore,
                    margin: '0 20 10 20',
                    columns: secondGridDataObj.arColumns
                });
                windowObj.items.items[0].add(secondGrid);
                //window.items.add(secondGrid);
            }
            windowObj.show(Ext.getBody(), function () {
                var x = Math.round(((Ext.getBody().getWidth() - this.getWidth()) / 2));
                var y = Math.round(((Ext.getBody().getHeight() - this.getHeight()) / 2));
                this.setPosition(x, y);
            });
            var windowDomEl = windowObj.getEl().dom;
            var windowBodyHeight = windowDomEl.offsetHeight + windowDomEl.scrollHeight;
            if (windowBodyHeight > windowMaxHeight) {
                windowObj.setOverflowXY('auto', 'auto');
            }
        }
    }
});

//class to collect grid data.
function GridData(data, arFields) {
    this.data = data;
    this.arFields = arFields;
    this.arColumns = getGridColumns(arFields);;
}

//function to create columns for grid. It omits 'location' property. 
function getGridColumns(arFields) {
    var arColumns = [];
    if (arFields) {
        arFields.forEach(function (element) {
            if (element.toUpperCase() !== 'LOCATION' && element.toUpperCase() !== 'SOURCETYPE') {
                var val = DGPortal.Constants.HeaderNamesHashMap.get(element);
                arColumns.push({
                    text: val, dataIndex: element,
                    //appending unit as 'Files' or 'Tables' if sourceType is present.                    
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        if (record.data.sourceType) {
                            var propName = this.columns[colIndex].dataIndex;
                            var newVal = DGPortal.Constants.appendUnit(record.data.sourceType, propName, value);
                            return newVal;
                        }
                        return value;
                    },
                    listeners: {
                        boxready: function (_this, defaultWidth) {
                            //setting new width as per the header text of the column                    
                            var textWidth = Ext.util.TextMetrics.measure(_this.getEl().dom, _this.text).width;
                            if ((textWidth + 10) > defaultWidth) {
                                _this.setWidth(textWidth + 10);
                            }
                        }
                    }
                });
            }
        });
    }
    return arColumns;
}