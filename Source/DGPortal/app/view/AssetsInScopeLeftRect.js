Ext.define('DGPortal.view.AssetsInScopeLeftRect', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.assetsInScopeLeftRect',
    height: 140,
    margin: '0 10 0 10',
    layout: {
        type: 'table',
        columns: 2,
        //rows: 4
    },
    cls: 'innerpanel',
    items: [
        {
            xtype: 'image',
            src: 'resources/images/premise.svg',
            style: {
                fontSize: '40px',
                color: '#0071cd',                
                fontFamily: 'montserratregular',
                width: '16px'
            },
        },
        {
            xtype: 'image',
            src: 'resources/images/cloud.svg',
            style:
            {
                fontSize: '40px',
                color: '#0071cd',               
                fontFamily: 'montserratregular',
                width: '18px'
            },
        },
        {
            xtype: 'label',
            id:'lblOnPremiseTotal',           
            style: {
                fontSize: '42px',
                color: '#0071ce',             
                //fontWeight: 'bold',
                fontFamily: 'montserratregular',
            },

        },
        {
            xtype: 'label',
            id:'lblCloudTotal',           
            style: {
                fontSize: '42px',
                color: '#0071ce',                
                //fontWeight: 'bold',
                fontFamily: 'montserratregular'
            },

        },
        {
            xtype: 'label',
            text: 'On Premise',
            style: {
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#0071ce',               
                fontFamily: 'montserratregular',
                textTransform: 'uppercase'
            },

        },
        {
            xtype: 'label',
            text: 'Cloud',
            style: {
                fontSize: '10px',
                fontWeight: 'bold',
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
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#555555',                
                fontFamily: 'montserratregular',
            }
        }
    ],
}
);