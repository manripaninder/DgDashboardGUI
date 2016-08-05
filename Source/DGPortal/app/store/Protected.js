Ext.define('DGPortal.store.Protected', {
    extend: 'Ext.data.Store',
    storeId: 'Protected',
    autoload: false,
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_OnPremise_Operations + '/protected',
        reader: 'json'
    }
});