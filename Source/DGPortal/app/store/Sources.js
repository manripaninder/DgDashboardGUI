Ext.define('DGPortal.store.Sources', {
    extend: 'Ext.data.Store',
    requires: 'DGPortal.model.SourceList',
    model: 'DGPortal.model.SourceList',
    storeId: 'Sources',
    autoLoad: false,
    // proxy: {
    //     type: 'ajax',
    //     url: 'data/KM_Data.json',
    //     reader: {
    //         type: 'json',
    //         root: 'results'
    //     }
    // }

    proxy: {
        type: 'rest',
        url: DGPortal.Constants.API_URL_Sources,
        reader: 'json'
    }
});

