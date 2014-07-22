var states = Ext.create('Ext.data.Store', {
	fields : [ 'abbr', 'name' ],
	data : [ {
		"abbr" : "0",
		"name" : "ͨ��ԭ��"
	}, {
		"abbr" : "1",
		"name" : "�����źŴ���"
	}, {
		"abbr" : "2",
		"name" : "����ṹ"
	} ]
});

var jsonStore = Ext.create('Ext.data.Store',{
    fields : ['classid','classname','period'],
    proxy : {
        type : 'ajax',
        url : 'data.json',
        reader : {
            type : 'json'
        }
    },
    autoLoad : true
})
Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout : {
			type : 'vbox',
			align : 'center'
		},
		// width : '100%',
		// height : 600,
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
			activeTab : 2,
			animScroll : true,
			plain : true,
			flex : 3,
			items : [ createCoursePlan, {
				title : '��ѡ�γ�',
				bodyPadding : 10,
				html : 'Another one'
			}, classStatus ]
		}

		],
		renderTo : Ext.getBody()
	});

});
var rowEditing = Ext.create('Ext.grid.plugin.RowEditing',{
    clicksToMoveEditor : 1,
    autoCancel : false,
    saveBtnText : '����',
    cancelBtnText : 'ȡ��'
});
// �γ̱�
var courseTable = Ext.create('Ext.grid.Panel', {
	width : '100%',
	selType : 'checkboxmodel',
	frame : true,
	columnLines : true,
	store : jsonStore,
    plugins: [rowEditing],
	columns : [ {
		header : 'ѡ��',
		sortable : false,
		hideable : false,
		dataIndex : 'classid',
        editor : {
            allowBlank : false
        }
	}, {
		text : '�γ�',
		dataIndex : 'classname',
		flex : 1,
        editor : {
            allowBlank : false
        }
	}, {
		text : '��ʱ',
		dataIndex : 'period'
	}, {
		text : 'ѧ��',
		dataIndex : 'period'
	}, {
		text : '���ʱ��'
	}, {
		text : 'ѡ��'
	}, {
		text : '�γ����ýڵ�'
	}, {
		text : '��ʱ'
	}, {
		text : 'ʱ������'
	}, {
		text : '״̬'
	}, {
		text : '��ע'
	} ],
    tbar : [{
        text : '����',
        handler : function(){
            var store = courseTable.getStore();
            store.insert(0,{
                'classid' : 0,
                'classname' : '����'
            });
        }
    },{
        text : 'ɾ��',
        itemId : 'removeRecord',
        handler : function(){
            var sm = courseTable.getSelectionModel();
            rowEditing.cancelEdit();
            var store = courseTable.getStore();
            store.remove(sm.getSelection());
            if(store.getCount()>0){
                sm.select(0);
            }
        },
        disabled : true
    },{
        text : '����',
        handler : function(){
            rowEditing.completeEidt();
        }
    }],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		// store : store,
		dock : 'bottom',
		displayInfo : true
	} ],
    listeners : {
        'selectionchange' : function(view, records){
            courseTable.down('#removeRecord').setDisabled(!records.length);
        }
    }
});
// ���μƻ�
var createCoursePlan = new Ext.Panel({
	title : '���μƻ�',
	bodyPadding : 5,
	layout : {
		type : 'vbox',
		align : 'center'
	},
	items : [ {
		xtype : 'panel',
		layout : 'column',
		width : '100%',
		bodyPadding : 5,
		items : [ {
			xtype : 'combo',
			fieldLabel : 'ѧУ',
			columnWidth : 0.25,
			store : states,
			queryMode : 'local',
			valueField : 'abbr',
			displayField : 'name'
		}, {
			xtype : 'combo',
			fieldLabel : 'רҵ',
			columnWidth : 0.25,
			store : states,
			queryMode : 'local',
			valueField : 'abbr',
			displayField : 'name'
		}, {
			xtype : 'combo',
			fieldLabel : '�γ�',
			columnWidth : 0.25,
			store : states,
			queryMode : 'local',
			valueField : 'abbr',
			displayField : 'name'
		}, {
			xtype : 'button',
			columnWidth : 0.12,
			text : '����'
		}, {
			xtype : 'button',
			columnWidth : 0.13,
			text : '�γ�˵��'
		} ]
	}, courseTable ]

});
//tree test data
var classTree = Ext.create('Ext.data.TreeStore', {
	root : {
		expanded : true,
		children : [ {
			text : '�༶1',
			leaf : true
		}, {
			text : '�༶2',
			leaf : true
		}, {
			text : '�༶3',
			leaf : true
		} ]
	}
});
//�༶��
var classTable1 = Ext.create('Ext.grid.Panel', {
	//title : '�༶��',
	id : 'class1',
	frame : true,
	columnLines : true,
	store : states,
	//el : 'classStatus',
	//renderTo : Ext.getCmp('classstatus'),
	header : {
		xtype : 'label',
		width : '100%',
		text : '�༶1',
		align : 'center'
	},
	columns : [ {
		text : '���',
		sortable : false,
		hideable : false,
		dataIndex : 'abbr'
	}, {
		text : '����',
		dataIndex : 'abbr',
		flex : 1
	}, {
		text : 'ѧ��',
		dataIndex : 'abbr'
	}, {
		text : '�Ա�',
		dataIndex : 'abbr'
	}, {
		text : '���ʱ��'
	}, {
		text : '��ע'
	}, {
		/*xtype : 'panel',
		layout : 'vbox',
		items : [{
			xtype : 'button',
			text : '�޸�'
		},{
			xtype : 'button',
			text : 'ɾ��'
		}]*/
		text : '����'
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		// store : store,
		dock : 'bottom',
		displayInfo : true
	} ]
});

var classTable2 = Ext.create('Ext.grid.Panel', {
	//title : '�༶��',
	id : 'class2',
	frame : true,
	columnLines : true,
	store : states,
	//el : 'classStatus',
	//renderTo : Ext.getCmp('classstatus'),
	header : {
		xtype : 'label',
		width : '100%',
		text : '�༶2',
		align : 'center'
	},
	columns : [ {
		text : '���',
		sortable : false,
		hideable : false,
		dataIndex : 'abbr'
	}, {
		text : '����',
		dataIndex : 'abbr',
		flex : 1
	}, {
		text : 'ѧ��',
		dataIndex : 'abbr'
	}, {
		text : '�Ա�',
		dataIndex : 'abbr'
	}, {
		text : '���ʱ��'
	}, {
		text : '��ע'
	}, {
		text : '����'
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		// store : store,
		dock : 'bottom',
		displayInfo : true
	} ]
});
var classTable3 = Ext.create('Ext.grid.Panel', {
	//title : '�༶��',
	id : 'class3',
	frame : true,
	columnLines : true,
	store : jsonStore,
	//el : 'classStatus',
	//renderTo : Ext.getCmp('classstatus'),
	header : {
		xtype : 'label',
		width : '100%',
		text : '�༶3',
		align : 'center'
	},
	columns : [ {
		text : '���',
		sortable : false,
		hideable : false,
		dataIndex : 'classid'
	}, {
		text : '����',
		dataIndex : 'classname',
		flex : 1
	}, {
		text : 'ѧ��',
		dataIndex : 'period'
	}, {
		text : '�Ա�',
		dataIndex : 'period'
	}, {
		text : '���ʱ��'
	}, {
		text : '��ע'
	}, {
		text : '����'
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		// store : store,
		dock : 'bottom',
		displayInfo : true
	} ]
});
var classTableArr = [ classTable1, classTable2, classTable3 ];
//�༶�б�(tree)
var classTree = Ext.create('Ext.tree.Panel', {
	region : 'west',
	width : 200,
	title : '���а༶�б�',
	rootVisible : false,
	store : classTree,
	activeItem : 1,
	listeners : {
		'itemclick' : function(view, record, item, index, e, eobj) {
			var sibling = this.nextSibling();
			sibling.removeAll(false);
			sibling.add(classTableArr[index]);
			//sibling.doLayout();
		}
	}
});
//classTree.addListener('item')
// �༶���
var classStatus = new Ext.Panel({

	title : '�༶���',
	bodyPadding : 10,
	layout : 'border',
	items : [ classTree, {
		xtype : 'panel',
		id : 'classstatus',
		region : 'center',
		layout : 'fit',
		items : [ classTable1 ]
	} ]
});