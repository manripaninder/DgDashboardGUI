Ext.define('DGPortal.store.SourcesData', {
    extend: 'Ext.data.Store',
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    storeId: 'SourcesData',
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_Sources,
        extraParams: { sourceName: '' },
        reader: 'json',
    }
});

