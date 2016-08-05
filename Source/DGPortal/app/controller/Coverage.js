Ext.define('DGPortal.controller.Coverage', {
    extend: 'Ext.app.Controller',
    require: ['Ext.Ajax'],
    stores: ['Sources'],
    views: ['Viewport'],
    refs: [

    ],
    init: function () {

        this.control({
            '#btnAll': {
                toggle: function (_this, pressed, eOpts) {
                    if (pressed) {
                        var filterVal = DGPortal.Constants.All;
                        this.showAISRectBoxAsPerSrcLoc(filterVal);
                        this.arStores.forEach(function (storeItem) {
                            storeItem.fireEvent('datachanged', { dataType: filterVal });
                        }, this);
                    }
                }
            },
            '#btnOnPremise': {
                toggle: function (_this, pressed, eOpts) {
                    if (pressed) {
                        var filterVal = DGPortal.Constants.OnPremise;
                        this.showAISRectBoxAsPerSrcLoc(filterVal);
                        this.arStores.forEach(function (storeItem) {
                            storeItem.fireEvent('datachanged', { dataType: filterVal });
                        }, this);
                        // var sourcesStore = Ext.data.StoreManager.lookup('Sources');
                        // var protectedStore = Ext.data.StoreManager.lookup('Protected');
                        // var exposedStore = Ext.data.StoreManager.lookup('Exposed');
                        // var monitoredStore = Ext.data.StoreManager.lookup('Monitored');
                        // var unscannedStore = Ext.data.StoreManager.lookup('Unscanned');
                        // sourcesStore.fireEvent('datachanged', { dataType: filterVal });
                        // protectedStore.fireEvent('datachanged', { dataType: filterVal });
                        // exposedStore.fireEvent('datachanged', { dataType: filterVal });
                        // monitoredStore.fireEvent('datachanged', { dataType: filterVal });
                        // unscannedStore.fireEvent('datachanged', { dataType: filterVal });
                    }
                }
            },
            '#btnCloud': {
                toggle: function (_this, pressed, eOpts) {
                    if (pressed) {
                        var filterVal = DGPortal.Constants.Cloud;
                        this.showAISRectBoxAsPerSrcLoc(filterVal);
                        this.arStores.forEach(function (storeItem) {
                            storeItem.fireEvent('datachanged', { dataType: filterVal });
                        }, this);
                    }
                }
            }
        });
    },
    onLaunch: function () {

        //collecting all the stores in an array
        this.arStores = [];

        //adding charts to Overall Coverage
        var overallCoveragePanel = Ext.ComponentQuery.query('#overallCoverage');

        //getting sources store
        var sourcesStore = Ext.data.StoreManager.lookup('Sources');
        this.arStores.push(sourcesStore);

        //adding charts to Overall Coverage Section
        if (overallCoveragePanel[0]) {
            var oc_firstChild = Ext.create('DGPortal.view.SectionHeader', { sectionHeader: 'OVERALL COVERAGE' });

            overallCoveragePanel[0].add(oc_firstChild);

            var oc_secondChild = Ext.create('Ext.panel.Panel', {
                layout: 'column',
            });

            var columnBar_OC1 = Ext.create('DGPortal.view.ColumnBar', { id: 'cas', chartTitle: 'COVERAGE ACROSS SOURCES' });
            columnBar_OC1.columnWidth = 0.33;
            columnBar_OC1.bindStore(sourcesStore, true);

            var d = new Date();
            var currentMonth = d.getMonth() + 1;

            var covTrendToDate = d.getFullYear() + DGPortal.Constants.getTwoDigitNum(currentMonth);
            var covTrendFromDate = d.getFullYear() + '01';

            var coverageTrendStore = Ext.create(DGPortal.store.Sources);
            coverageTrendStore.getProxy().extraParams = { toDate: covTrendToDate, fromDate: covTrendFromDate };

            var lineChart_OC = Ext.create('DGPortal.view.LineChart', { id: 'covTrend', chartTitle: 'COVERAGE TREND' });
            lineChart_OC.columnWidth = 0.34;
            lineChart_OC.bindStore(coverageTrendStore, true);

            var contentStore = Ext.create('DGPortal.store.Content');
            this.arStores.push(contentStore);

            var columnBar_OC2 = Ext.create('DGPortal.view.ColumnBar', { id: 'content', chartTitle: 'CONTENT', margin: '0 10 0 10' });
            columnBar_OC2.bindStore(contentStore, true);
            columnBar_OC2.columnWidth = 0.33;


            // var oc_columnBar1 = Ext.create('DGPortal.view.ColumnBar', { chartTitle: 'CONTENT', margin: '0 0 0 10' });
            // oc_columnBar1.bindStore(sourcesStore, true);
            // oc_columnBar1.columnWidth = 0.5;

            // var oc_columnBar2 = Ext.create('DGPortal.view.ColumnBar', { margin: '0 0 0 0', chartYAxisVisible: false });//, { chartYAxisVisible: false, chartLegendEnable = false });
            // oc_columnBar2.bindStore(sourcesStore, true);
            // oc_columnBar2.columnWidth = 0.5;

            // var columnBar_OC2_panel = Ext.create('Ext.panel.Panel', {
            //     layout: 'column',
            //     listeners: {
            //         resize: function () {
            //             //resizing child components on resize 
            //             if (this.rendered) {
            //                 var parentWidth = this.getWidth();
            //                 Ext.each(this.items.items, function (item, index, array) {
            //                     widthVal = (parentWidth / array.length);
            //                     item.setWidth(widthVal);
            //                 });
            //             }
            //         }
            //     }
            // });
            // columnBar_OC2_panel.add(oc_columnBar1);
            // columnBar_OC2_panel.add(oc_columnBar2);

            // columnBar_OC2_panel.columnWidth = 0.25;

            //Users chart
            // var columnBar_OC3 = Ext.create('DGPortal.view.ColumnBar', { id: 'users', chartTitle: 'USERS', margin: '0 10 10 10' });
            // columnBar_OC3.columnWidth = 0.25;
            // columnBar_OC3.bindStore(sourcesStore, true);

            oc_secondChild.add(columnBar_OC1);
            oc_secondChild.add(lineChart_OC);
            oc_secondChild.add(columnBar_OC2);
            //oc_secondChild.add(columnBar_OC3);

            overallCoveragePanel[0].add(oc_secondChild);
        }


        //adding charts to Exposure & Protection section
        var epPanel = Ext.ComponentQuery.query('#exposureAndProtection');

        if (epPanel[0]) {

            //adding section header
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
            this.arStores.push(protectedStore);

            var columnBar_EP1 = Ext.create('DGPortal.view.ColumnBar', { id: 'protected', chartTitle: 'Protected' });
            columnBar_EP1.columnWidth = 0.25;
            columnBar_EP1.bindStore(protectedStore, true);

            var exposedStore = Ext.create('DGPortal.store.Exposed');
            this.arStores.push(exposedStore);

            var columnBar_EP2 = Ext.create('DGPortal.view.ColumnBar', { id: 'exposed', chartTitle: 'Exposed' });
            columnBar_EP2.columnWidth = 0.25;
            columnBar_EP2.bindStore(exposedStore, true);

            var unscannedStore = Ext.create('DGPortal.store.Unscanned');
            this.arStores.push(unscannedStore);

            var columnBar_EP3 = Ext.create('DGPortal.view.ColumnBar', { id: 'unscanned', chartTitle: 'Unscanned' });
            columnBar_EP3.columnWidth = 0.25;
            columnBar_EP3.bindStore(unscannedStore, true);

            var monitoredStore = Ext.create('DGPortal.store.Monitored');
            this.arStores.push(monitoredStore);

            var columnBar_EP4 = Ext.create('DGPortal.view.ColumnBar', { id: 'monitored', chartTitle: 'Monitored', margin: '0 10 10 10', });
            columnBar_EP4.columnWidth = 0.25;
            columnBar_EP4.bindStore(monitoredStore, true);

            ep_secondChild.add(columnBar_EP1);
            ep_secondChild.add(columnBar_EP2);
            ep_secondChild.add(columnBar_EP3);
            ep_secondChild.add(columnBar_EP4);

            epPanel[0].add(ep_secondChild);
        }

        sourcesStore.load({
            scope: this,
            callback: this.updateDataInAISRectBox
        });
        coverageTrendStore.load();
        contentStore.load();
        protectedStore.load();
        exposedStore.load();
        monitoredStore.load();
        unscannedStore.load();
    },

    showAISRectBoxAsPerSrcLoc: function (filterVal) {
        var aisRectBox = Ext.ComponentQuery.query('#aisRectBox')[0];
        if (filterVal == DGPortal.Constants.All) {
            aisRectBox.items.items[aisRectBox.items.items.length - 1].getEl().dom.hidden = false;
            aisRectBox.items.items.forEach(function (item, index, array) {
                if (index == array.length - 1) { return }
                item.getEl().dom.parentElement.style.display = "table-cell";
            });
        }
        else if (filterVal == DGPortal.Constants.OnPremise) {
            aisRectBox.items.items[aisRectBox.items.items.length - 1].getEl().dom.hidden = true;
            aisRectBox.items.items.forEach(function (item, index, array) {
                if (index == array.length - 1) { return }
                if (index % 2 != 0) {
                    item.getEl().dom.parentElement.style.display = "none";
                } else {
                    item.getEl().dom.parentElement.style.display = "table-cell";
                }
            });
        }
        else if (filterVal == DGPortal.Constants.Cloud) {
            aisRectBox.items.items[aisRectBox.items.items.length - 1].getEl().dom.hidden = true;
            aisRectBox.items.items.forEach(function (item, index, array) {
                if (index == array.length - 1) { return }
                if (index % 2 == 0) {
                    item.getEl().dom.parentElement.style.display = "none";
                } else {
                    item.getEl().dom.parentElement.style.display = "table-cell";
                }
            });
        }
    },

    //method to add total no of On-Premise and Cloud files in AssetsInScopeLeftRect.
    updateDataInAISRectBox: function (records, operation, success) {
        if (success && records) {
            var arData = records[0].data.sourceList;
            var onPremiseCount = 0;
            var cloudCount = 0;
            arData.forEach(function (item, index, array) {
                var objSource = JSON.parse(item.value);
                var sourceLoc = objSource.sourceLocation.toUpperCase();
                if (sourceLoc == DGPortal.Constants.OnPremise) {
                    onPremiseCount += objSource.totalFileCount + objSource.totalTableCount;
                } else if (sourceLoc == DGPortal.Constants.Cloud) {
                    cloudCount += objSource.totalFileCount + objSource.totalTableCount;
                }
            });
            var lblOnPremiseTotal = Ext.ComponentQuery.query('#lblOnPremiseTotal')[0];
            lblOnPremiseTotal.setText(onPremiseCount);
            var lblCloudTotal = Ext.ComponentQuery.query('#lblCloudTotal')[0];
            lblCloudTotal.setText(cloudCount);
        }
    }

});