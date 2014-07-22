Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*'
]);
Ext.onReady(function(){
    Ext.create('Ext.container.Viewport', {
        layout : {
            type : 'vbox',
            align : 'center'
        },
        // width : '100%',
        // height : 600,
        //autoScroll : true,
        items : [ {
            xtype : 'panel',
            layout : 'column',
            width : '100%',
            flex : 2,
            items : [ {
                xtype : 'image',
                src : 'resources/u11.png'
            }, {
                xtype : 'image',
                src : 'resources/u3.jpg'
            }, {
                xtype : 'panel',
                layout : {
                    type : 'vbox',
                    align : 'stretch',
                    padding : 5
                },
                items : [ {
                    xtype : 'label',
                    width : 20,
                    text : '�û���¼'
                } ]

            } ]
            }, {
            xtype : 'tabpanel',
            width : '100%',
            activeTab : 0,
            autoScroll : true,
            plain : true,
            flex : 3,
            items : [firstPage ]
        }],
        renderTo : Ext.getBody()
    })
})

var inforStore = Ext.create('Ext.data.Store',{
    fields : ['title','author','date'],
    proxy : {
        type : 'ajax',
        url : 'information.json',
        reader : {
            type : 'json'
        }
    },
    autoLoad : true
});

//inforStore.load();

//tabpanel
var firstPage = Ext.create('Ext.panel.Panel',{
    title : '��ҳ',
    bodyPadding : 5,
    autoScroll : true,
    layout : 'vbox',
    items : [{
        xtype : 'grid',
        width : '100%',
        title : '����֪ͨ����',
        flex : 1,
        store : inforStore,
        frame : true,
        hideHeaders : true,
        autoScroll : true,
        columns : [{
            //columnWidth : '100%',
            width : '100%',
            align : 'center',
            dataIndex : 'title',
            renderer : function(value){
                return Ext.String.format('<a href="success.jsp">{0}</a>',value);
            }
        }],
        dockedItems : [{
            xtype : 'toolbar',
            dock : 'bottom',
            layout : {
                pack : 'end'
            },
            items : [{
                xtype : 'label',
                text : '���͵���'
            },{
                text : '�ֻ�'
            },{
                text : '����'
            }]
        }]
    },{
        xtype : 'panel',
        width : '100%',
        title : '����',
        flex : 1
    },{
        xtype : 'panel',
        width : '100%',
        //height : 400,
        title : '�����ĵ�',
        flex : 1
    }]
})

