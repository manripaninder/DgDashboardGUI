var columnStore = Ext.create('Ext.data.Store', {
    storeId: 'ColumnStore',
    autoLoad: false,
    fields: ['name', 'EXPOSED', 'MASKED', 'MONITORED', 'CLEANED', 'UNSCANNED'],
    data: [{
        'name': 'RS-LAKE',
        'EXPOSED': 1,
        'MASKED': 2,
        'MONITORED': 3,
        'CLEANED': 4,
        'UNSCANNED': 5
    },
        {
            'name': 'STG',
            'EXPOSED': 6,
            'MASKED': 4,
            'MONITORED': 2,
            'CLEANED': 8,
            'UNSCANNED': 1
        }, {
            'name': 'TDS',
            'EXPOSED': 9,
            'MASKED': 4,
            'MONITORED': 23,
            'CLEANED': 12,
            'UNSCANNED': 32

        }, {
            'name': 'DB2',
            'EXPOSED': 9,
            'MASKED': 5,
            'MONITORED': 23,
            'CLEANED': 12,
            'UNSCANNED': 32

        }, {
            'name': 'DW1',
            'EXPOSED': 11,
            'MASKED': 8,
            'MONITORED': 7,
            'CLEANED': 13,
            'UNSCANNED': 12

        },
        {
            'name': 'APS-HIVE',
            'EXPOSED': 11,
            'MASKED': 8,
            'MONITORED': 7,
            'CLEANED': 13,
            'UNSCANNED': 12

        }, {
            'name': 'SOC-S3',
            'EXPOSED': 11,
            'MASKED': 8,
            'MONITORED': 7,
            'CLEANED': 13,
            'UNSCANNED': 12

        }, {
            'name': 'STM-SS3',
            'EXPOSED': 11,
            'MASKED': 8,
            'MONITORED': 7,
            'CLEANED': 13,
            'UNSCANNED': 12
        }]
});

Ext.define('DGPortal.view.OCSection', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ocSection',
    require: ['DGPortal.view.OCSection'],
    margin: '10 10 0 10',
    padding: 0,
    height: 220,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
}
);