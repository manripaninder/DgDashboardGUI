Ext.define('DGPortal.view.AssetsInScopeLeftRect', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.assetsInScopeLeftRect',
    height: 150,
    margin: '0 0 10 10',
    layout: {
        type: 'table',
        columns: 2,
        //rows: 4
    },
    cls: 'innerpanel',
    items: [
        {
            xtype: 'image',
            id: 'leftRectOnPremiseImg',
            src: 'resources/images/premise.png',
            style: {
                //fontSize: '40px',
                color: '#0071cd',
                fontFamily: 'montserratregular',
                width: '18px',
            },
            height: 20
        },
        {
            xtype: 'image',
            id: 'leftRectCloudImg',
            src: 'resources/images/cloud.png',
            style:
            {
                //fontSize: '40px',
                color: '#0071cd',
                fontFamily: 'montserratregular',
                width: '18px',
            },
            height: 14
        },
        {
            xtype: 'label',
            id: 'lblOnPremiseTotal',
            //text:'23',          
            style: {
                fontSize: '40px',
                color: '#0071ce',
                fontWeight: 'normal',
                fontFamily: 'montserratregular',
            },

        },
        {
            xtype: 'label',
            id: 'lblCloudTotal',
            //text:'23',             
            style: {
                fontSize: '40px',
                color: '#0071ce',
                fontWeight: 'normal',
                fontFamily: 'montserratregular'
            },

        },
        {
            xtype: 'label',
            text: 'On-Premises',
            style: {
                fontSize: '11px',
                fontWeight: 'normal',
                color: '#0071ce',
                fontFamily: 'montserratregular',
                textTransform: 'uppercase'
            },

        },
        {
            xtype: 'label',
            text: 'Cloud',
            style: {
                fontSize: '11px',
                fontWeight: 'normal',
                color: '#0071ce',
                fontFamily: 'montserratregular',
                textTransform: 'uppercase'
            },
        },
        {
            xtype: 'label',
            text: 'All ASSETS',
            colspan: 2,
            margin: '10,0,0,0',
            style: {
                fontSize: '11px',
                fontWeight: 'normal',
                color: '#555555',
                fontFamily: 'montserratregular',
            }
        }
    ],
}
);