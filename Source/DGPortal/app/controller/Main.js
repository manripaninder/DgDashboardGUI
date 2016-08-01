Ext.define('DGPortal.controller.Main', {
    extend: 'Ext.app.Controller',
    require: ['Ext.Ajax', 'DGPortal.Constants'],
    stores: ['Sources'],
    views: ['Gauge'],
    // refs: [
    //     {
    //         ref: 'activityGauge',
    //         selector:'activityGauge'
    //     }],
    init: function () {
        //console.log('Init of Main Controller');
    },
    onLaunch: function () {
        // var assetsInScope = Ext.getCmp();
        var sources = Ext.data.StoreManager.lookup('Sources'); //this.getSourcesStore();
        sources.load({
            callback: this.onSourcesLoad,
            scope: this
        });
        console.log("Main Controller init is called  dsfgdsgsd.");
        // Ext.Ajax.request({
        //     url: DGPortal.Constants.API_URL,
        //     //url: 'http://112.196.4.62:8080/dgDashboardRest/metadata/sources/clusters/clouderaCluster',
        //     method: 'GET',
        //     cors: true,
        //     // useDefaultXhrHeader: false,
        //     defaultHeaders: {
        //         'Access-Control-Allow-Origin': 'http://localhost:1841',
        //     },
        //     success: function (response) {
        //         var text = response.responseText;
        //         console.log(response.responseText);
        //     }
        // });
    },
    onSourcesLoad: function (_this, records, successful, eOpts) {
        // console.log(_this);
        // console.log(records);
    }

});
