Ext.define('DGPortal.store.Exposed', {
    extend: 'Ext.data.Store',
    storeId: 'Exposed',
    autoload: false,
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_Operations + '/exposed',
        reader: 'json'
    }
});