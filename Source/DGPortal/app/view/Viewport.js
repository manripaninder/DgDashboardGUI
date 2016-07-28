
Ext.define('DGPortal.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    id: 'myViewPort',
    //minWidth:1280,
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'DGPortal.view.AssetsInScope',
        'DGPortal.view.OCSection'
    ],
    initComponent: function () {
        this.callParent();
    },
    layout: {
        type: 'border'
    },
    items: [{
        region: 'center',
        xtype: 'panel',
        title: '.',
        layout: 'fit',
        // layout: 'vbox',
        // align: 'stretch',
        cls: 'mainPageGroupPanel',
        //baseCls:'background',
        bodyStyle: { "background-color": "#0c213e" },
        //bodyPadding: '10',
        items: [
            {
                region: 'center',
                xtype: 'tabpanel',
                layout: 'fit',
                items: [{
                    title: 'DASHBOARD',
                    xtype: 'tabpanel',
                    layout: 'fit',
                    items: [{
                        title: 'COVERAGE',
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        autoScroll: true,
                        bodyStyle: { "background-color": "#0c213e" },
                        items: [
                            {
                                xtype: 'assetsInScope',
                                id: 'assetsInScope'
                            },
                            {
                                xtype: 'ocSection',
                                id: 'overallCoverage',
                            }
                            ,
                            {
                                xtype: 'ocSection',
                                id: 'exposureAndProtection'
                            },

                        ]
                    }, {
                            title: 'EXPOSURE',
                        }, {
                            title: 'PROTECTION'
                        }, {
                            title: 'ALERTS'
                        }]
                }, {
                        title: 'POLICIES & RULES'
                    },
                    {
                        title: 'DETECT & PROTECT'
                    }, {
                        title: 'MONITOR'
                    }]
            }]
    }]
});
