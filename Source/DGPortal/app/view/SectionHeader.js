Ext.define('DGPortal.view.SectionHeader', {
    extend: 'Ext.panel.Panel',
    margin: '10 0 0 0',
    height: 30,
    sectionHeader: null,
    layout: {
        type: 'column',
        // columns: 4,
        // rows: 1
    },
    listeners: {
        beforeRender: function () {
            var sectionHeaderLabel = this.down('label');
            sectionHeaderLabel.text = this.sectionHeader;
        }
    },
    //bodyStyle:{'background':'aqua'},
    items: [
        {
            xtype: 'label',
            text: 'OVERALL COVERAGE',
            margin: '0 0 0 20',
            columnWidth: 0.32,
            style: {
                fontFamily: 'montserratregular',
                fontWeight: 'bold',
                //marginLeft: '20px',
                fontSize: '18px',
                color: '#0d2240 '
            }
        },
        {
            xtype: 'panel',
            layout: 'hbox',
            columnWidth: 0.32,
            items: [
                {
                    xtype: 'label',
                    text: 'SHOW',
                    style: {
                        fontFamily: 'montserratregular',
                        fontSize: '15px',
                        marginLeft: '40px',
                        marginTop: '3px',
                        color: '#555555 ',
                        //textAlign: 'right'
                    }

                },
                {
                    xtype: 'combo',
                    value: 'ALL CHARTS',
                    //width: 250,
                    editable: false,
                    store: ['ALL CHARTS', 'CLOUD', 'ON-PREMISE'],
                    style: {
                        fontFamily: 'montserratregular',
                        marginLeft: '20px',                      
                        //paddingTop: '3px',
                        color: '#0071ce',
                        // textAlign: 'left'
                    }
                }
            ]
        }
    ]
});