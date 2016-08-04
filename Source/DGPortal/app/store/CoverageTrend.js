Ext.define('DGPortal.store.CoverageTrend', {
    extend: 'Ext.data.Store',
    storeId: 'CoverageTrend',
    autoload: false,
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_Sources + '?toDate' + '?fromDate',
        reader: 'json'
    }
});