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
    

        var req = Ext.create('Ext.data.proxy.Rest', {
            url: DGPortal.Constants.API_URL_Sources + "/Hadoop",
            reader: 'json',
            action: 'read'
        });
        req.read(operation);
       
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

            var columnBar_OC2 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'CONTENT' });
           columnBar_OC2.bindStore(sourcesDataStore, true);
           columnBar_OC2.columnWidth = 0.25;

            var columnBar_OC3 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'USERS' });
            columnBar_OC3.columnWidth = 0.25;
            columnBar_OC3.bindStore(sourcesDataStore, true);

            oc_secondChild.add(columnBar_OC1);
            oc_secondChild.add(lineChart_OC);
            oc_secondChild.add(columnBar_OC2);
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

            var exposedStore = Ext.create('DGPortal.store.Exposed');
            var columnBar_EP2 = Ext.create('DGPortal.view.ColumnBar', {id: 'exposed', chartTitle: 'Exposed' });
            columnBar_EP2.columnWidth = 0.25;
            columnBar_EP2.bindStore(exposedStore, true);

            var unscannedStore = Ext.create('DGPortal.store.Unscanned');
            var columnBar_EP3 = Ext.create('DGPortal.view.ColumnBar', { id:'unscanned', chartTitle: 'Unscanned' });
            columnBar_EP3.columnWidth = 0.25;
            columnBar_EP3.bindStore(unscannedStore, true);
 
            var monitoredStore = Ext.create('DGPortal.store.Monitored');
            var columnBar_EP4 = Ext.create('DGPortal.view.ColumnBar', {  id:'monitored', chartTitle: 'Monitored'});
            columnBar_EP4.columnWidth = 0.25;
            columnBar_EP4.bindStore(monitoredStore, true);

            ep_secondChild.add(columnBar_EP1);
            ep_secondChild.add(columnBar_EP2);
            ep_secondChild.add(columnBar_EP3);
            ep_secondChild.add(columnBar_EP4);

            epPanel[0].add(ep_secondChild);
        }
        sourcesDataStore.load(function (_this, records, operation, success) {
           
        });

        protectedStore.load();
        exposedStore.load();
        monitoredStore.load();
        unscannedStore.load();
    }

});