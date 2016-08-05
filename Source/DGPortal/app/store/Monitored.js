Ext.define('DGPortal.store.Monitored', {
    extend: 'Ext.data.Store',
    storeId: 'Monitored',
    autoload: false,
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_OnPremise_Operations + '/monitored',
        reader: 'json'
    }
});
