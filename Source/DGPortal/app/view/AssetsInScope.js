//'resources/images/sources.svg', //detected-data.png

var km_symbolData = ['resources/images/files.png', 'resources/images/detected-data.png',
    'resources/images/lock.png', 'resources/images/info.png', 'resources/images/unlock.png']

Ext.define('DGPortal.view.AssetsInScope', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.assetsInScope',
    require: ['DGPortal.view.Gauge', 'DGPortal.view.AssetsInScopeLeftRect'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    margin: '10 10 0 10',   
    items: [
        {
            xtype: 'panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'label',
                    text: "Assets In Scope",
                    cls: 'assetsInScopeLabel'
                },
                {
                    xtype: 'button',
                    id: 'btnAll',
                    text: 'ALL',
                    margin: '10 5 0 30',
                    cls: 'btnAstsInScp',
                    toggleGroup: 'sources',
                    allowDepress: false,
                    pressed: true,
                    frame: false
                },
                {
                    xtype: 'button',
                    id: 'btnOnPremise',
                    text: 'ON-PREMISES',
                    margin: '10 5 0 10',
                    cls: 'btnAstsInScp',
                    toggleGroup: 'sources',
                    allowDepress: false,
                    frame: false
                },
                {
                    xtype: 'button',
                    id: 'btnCloud',
                    text: 'CLOUD',
                    margin: '10 5 0 10',
                    cls: 'btnAstsInScp',
                    toggleGroup: 'sources',
                    allowDepress: false,
                    frame: false
                }
            ]
        }, {
            xtype: 'panel',
            id: 'panelKM',
            layout: 'column',
            listeners: {
                render: function () {
                    var store = Ext.create('DGPortal.store.Sources', { id: 'Sources' });
                    //console.log("Hi from render of AssetsInScope");

                    var rectBox = Ext.create('DGPortal.view.AssetsInScopeLeftRect', { id: 'aisRectBox' });
                    rectBox.columnWidth = 0.20;
                    this.items.add(rectBox);

                    tempItems = [];

                    // var actGauge_KM1 = Ext.create('DGPortal.view.Gauge', {
                    //     id: "Gauge_KM1",
                    //     //kmType: 'KM1',
                    //     dataObj: {
                    //         yVal: 100,
                    //         title: '6 SOURCES',
                    //         subtitle: '6'
                    //     }
                    // });
                    // tempItems.push(actGauge_KM1);
                    var actGauge_KM2 = Ext.create('DGPortal.view.Gauge', {
                        id: "Gauge_KM2",
                        kmType: 'TOTAL FILES',
                        margin: '0 4 4 6',                        
                        // dataObj: {
                        //     yVal: 100,
                        //     title: '5 MILLION FILES/TABLES',
                        //     subtitle: '5M'
                        // }
                    });
                    tempItems.push(actGauge_KM2);
                    var actGauge_KM3 = Ext.create('DGPortal.view.Gauge', {
                        id: "Gauge_KM3",
                        kmType: 'DETECTED DATA',
                        margin: '0 4 4 0',
                        drillIn_DependentChartId: 'exposed'
                        // dataObj: {
                        //     yVal: 20,
                        //     title: 'DETECTED DATA 1M FILES/3400 TABLES',
                        //     subtitle: '20%'
                        // }
                    });
                    tempItems.push(actGauge_KM3);
                    var actGauge_KM4 = Ext.create('DGPortal.view.Gauge', {
                        id: "Gauge_KM4",
                        kmType: 'PROTECTED',
                        margin: '0 4 4 0',
                        drillIn_DependentChartId: 'protected'
                        // dataObj: {
                        //     yVal: 16,
                        //     title: 'PROTECTED 800K FILES/1650 TABLES',
                        //     subtitle: '16%'
                        // }
                    });
                    tempItems.push(actGauge_KM4);
                    var actGauge_KM5 = Ext.create('DGPortal.view.Gauge', {
                        id: "Gauge_KM5",
                        kmType: 'ALERTED',
                        margin: '0 4 4 0',
                        drillIn_DependentChartId: 'monitored'
                        // dataObj: {
                        //     yVal: 0.2,
                        //     title: 'ALERTED IN LAST 24 HRS 10K FILES',
                        //     subtitle: '0.2%'
                        // }
                    });
                    tempItems.push(actGauge_KM5);
                    var actGauge_KM6 = Ext.create('DGPortal.view.Gauge', {
                        id: "Gauge_KM6",
                        kmType: 'UNSCANNED',
                        margin: '0 4 4 0',
                        drillIn_DependentChartId: 'unscanned'
                        // dataObj: {
                        //     yVal: 40,
                        //     title: 'UNSCANNED 2M FILES/50K TABLES',
                        //     subtitle: '40%'
                        // }
                    });
                    tempItems.push(actGauge_KM6);

                    // jQuery.each(tempItems, function (index, item, array) {
                    //     console.log(item);
                    //     item.symbolPath = km_symbolData[index];
                    //     item.columnWidth = 0.16;
                    //     item.bindStore(store, true);
                    // });

                    var gaugeColWidth = (1 - rectBox.columnWidth) / tempItems.length;
                    Ext.each(tempItems, function (item, index, array) {
                        item.symbolPath = km_symbolData[index];
                        item.columnWidth = gaugeColWidth;
                        item.bindStore(store, true);
                    }, this);

                    //this.items.add(actGauge_KM1);
                    this.items.add(actGauge_KM2);
                    this.items.add(actGauge_KM3);
                    this.items.add(actGauge_KM4);
                    this.items.add(actGauge_KM5);
                    this.items.add(actGauge_KM6);
                },
                // boxready: function () {
                //     // Ext.each(tempItems, function (item, index) {
                //     //     item.chart.reflow();
                //     // });
                // },
                resize: function () {
                    //resizing child components again                   
                    if (this.rendered) {
                        var parentWidth = this.getWidth();
                        Ext.each(this.items.items[1], function (item, index, array) {
                            var widthVal = 0;
                            if (index == 0) {
                                widthVal = parentWidth * 0.2
                            }
                            else {
                                widthVal = ((parentWidth * 0.8) / array.length - 1);
                            }
                            item.setWidth(widthVal);
                        });
                    }
                }
            }
        }
    ],
});