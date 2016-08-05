Ext.define('DGPortal.store.Unscanned', {
    extend: 'Ext.data.Store',
    storeId: 'Unscanned',
    autoload: false,
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_OnPremise_Operations + '/unscanned',
        reader: 'json'
    }
});
