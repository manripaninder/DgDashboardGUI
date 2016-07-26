// var dropDownStore = Ext.create('Ext.data.ArrayStore', {
//     fields: ['Id', 'Name'],
//     data: [
//         [1, 'All'],
//         [2, 'Cloud'],
//         [3, 'On-Premise']
//     ]
// });

Ext.define('DGPortal.controller.Coverage', {
    extend: 'Ext.app.Controller',
    require: ['Ext.Ajax'],
    stores: ['Sources'],
    views: ['Viewport'],
    refs: [

    ],
    init: function () {
        this.control({
            '#btnOnPremise': {
                click: function () {
                    var kmStore = Ext.data.StoreManager.lookup('Sources');
                    kmStore.fireEvent('datachanged', { dataType: 'OnPremise' });
                    //kmStore.filter('sourceList', 'Hadoo');
                    // kmStore.filter([
                    //     Ext.create('Ext.util.Filter', { property: "sourceList", value: 'sourceList', root: 'data' })]);
                    //console.log(kmStore.isFiltered());
                }
            },
            '#btnCloud': {
                click: function () {
                    var kmStore = Ext.data.StoreManager.lookup('Sources');
                    kmStore.fireEvent('datachanged', { dataType: 'OnCloud' });
                }
            }
        });
    },
    onLaunch: function () {

        //adding charts to Overall Coverage
        var overallCoveragePanel = Ext.ComponentQuery.query('#overallCoverage');

        var sourcesDataStore = Ext.create('Ext.data.Store', {
            model: 'DGPortal.model.SourceList',
            storeId: 'SourcesData',
            autoLoad: false,
            proxy: {
                type: 'rest',
                reader: 'json',
                url: DGPortal.Constants.API_URL_Sources + "/Hadoop",
            }
        }
        );

        var operation = new Ext.data.Operation({
            action: 'read',
        });
        // var proxy = new Ext.data.proxy.Ajax({
        //       url: DGPortal.Constants.API_URL + "/Hadoop"
        // });
        // proxy.read(operation); //GET /users?start=50&limit;=25
        //console.log(proxy);

        var req = Ext.create('Ext.data.proxy.Rest', {
            url: DGPortal.Constants.API_URL_Sources + "/Hadoop",
            reader: 'json',
            action: 'read'
        });
        req.read(operation);
        //console.log(req);

        sourcesDataStore.getProxy().url = DGPortal.Constants.API_URL_Sources + '/' + 'Hadoop';

        if (overallCoveragePanel[0]) {
            var oc_firstChild = Ext.create('DGPortal.view.SectionHeader', { sectionHeader: 'OVERALL COVERAGE' });

            overallCoveragePanel[0].add(oc_firstChild);

            var oc_secondChild = Ext.create('Ext.panel.Panel', {
                layout: 'column',
            });

            var columnBar_OC1 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'COVERAGE ACROSS SOURCES' });
            columnBar_OC1.columnWidth = 0.25;
            columnBar_OC1.bindStore(sourcesDataStore, true);

            var lineChart_OC = Ext.create('DGPortal.view.LineChart', { chartTitle: 'COVERAGE TREND' });
            lineChart_OC.columnWidth = 0.25;
            lineChart_OC.bindStore(sourcesDataStore, true);

            var oc_columnBar1 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'CONTENT', margin: '0 0 0 10' });
            oc_columnBar1.bindStore(sourcesDataStore, true);
            oc_columnBar1.columnWidth = 0.5;

            var oc_columnBar2 = Ext.create('DGPortal.view.ColumnBar', { margin: '0 0 0 0', chartYAxisVisible: false });//, { chartYAxisVisible: false, chartLegendEnable = false });
            oc_columnBar2.bindStore(sourcesDataStore, true);
            oc_columnBar2.columnWidth = 0.5;

            var columnBar_OC2_panel = Ext.create('Ext.panel.Panel', {
                layout: 'column',
                listeners: {
                    resize: function () {
                        //resizing child components on resize 
                        if (this.rendered) {
                            var parentWidth = this.getWidth();
                            Ext.each(this.items.items, function (item, index, array) {
                                widthVal = (parentWidth / array.length);
                                item.setWidth(widthVal);
                            });
                        }
                    }
                }
            });
            columnBar_OC2_panel.add(oc_columnBar1);
            columnBar_OC2_panel.add(oc_columnBar2);

            columnBar_OC2_panel.columnWidth = 0.25;

            var columnBar_OC3 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'USERS', margin: '0 10 10 10' });
            columnBar_OC3.columnWidth = 0.25;
            columnBar_OC3.bindStore(sourcesDataStore, true);

            oc_secondChild.add(columnBar_OC1);
            oc_secondChild.add(lineChart_OC);
            oc_secondChild.add(columnBar_OC2_panel);
            oc_secondChild.add(columnBar_OC3);

            overallCoveragePanel[0].add(oc_secondChild);
        }
        //adding charts to Exposure & Protection
        var epPanel = Ext.ComponentQuery.query('#exposureAndProtection');

        if (epPanel[0]) {
            var ep_firstChild = Ext.create('DGPortal.view.SectionHeader', { sectionHeader: 'EXPOSURE AND PROTECTION' });

            epPanel[0].add(ep_firstChild);

            var ep_secondChild = Ext.create('Ext.panel.Panel', {
                layout: 'column',
                listeners: {
                    resize: function () {
                        //resizing child components on resize 
                        if (this.rendered) {
                            var parentWidth = this.getWidth();
                            Ext.each(this.items.items, function (item, index, array) {
                                widthVal = (parentWidth / array.length);
                                item.setWidth(widthVal);
                            });
                        }
                    }
                }
            });

            var protectedStore = Ext.create('DGPortal.store.Protected');

            var columnBar_EP1 = Ext.create('DGPortal.view.ColumnBar', { id: 'protected', chartTitle: 'Protected' });
            columnBar_EP1.columnWidth = 0.25;
            columnBar_EP1.bindStore(protectedStore, true);

            var columnBar_EP2 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'Exposed' });
            columnBar_EP2.columnWidth = 0.25;
            columnBar_EP2.bindStore(sourcesDataStore, true);

            var columnBar_EP3 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'Unscanned' });
            columnBar_EP3.columnWidth = 0.25;
            columnBar_EP3.bindStore(sourcesDataStore, true);

            var columnBar_EP4 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'Monitored', margin: '0 10 10 10' });
            columnBar_EP4.columnWidth = 0.25;
            columnBar_EP4.bindStore(sourcesDataStore, true);

            ep_secondChild.add(columnBar_EP1);
            ep_secondChild.add(columnBar_EP2);
            ep_secondChild.add(columnBar_EP3);
            ep_secondChild.add(columnBar_EP4);

            epPanel[0].add(ep_secondChild);
        }
        sourcesDataStore.load(function (_this, records, operation, success) {
            // console.log('Loaded source store with params.');
            // console.log(_this);
        });

        protectedStore.load();

        // var columnBar_OC1 = Ext.create('DGPortal.view.ColumnBar');
        // var lineChart_OC = Ext.create('DGPortal.view.LineChart');
    }

});