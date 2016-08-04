Ext.define('DGPortal.store.Content', {
    extend: 'Ext.data.Store',
    storeId: 'Content',
    autoload: false,
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_Sources + '/categories',
        reader: 'json'
    }
});
