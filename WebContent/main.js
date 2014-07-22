var states = Ext.create('Ext.data.Store', {
	fields : [ 'abbr', 'name' ],
	data : [ {
		"abbr" : "0",
		"name" : "通信原理"
	}, {
		"abbr" : "1",
		"name" : "数字信号处理"
	}, {
		"abbr" : "2",
		"name" : "程序结构"
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
					text : '用户登录'
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
				title : '已选课程',
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
    saveBtnText : '保存',
    cancelBtnText : '取消'
});
// 课程表
var courseTable = Ext.create('Ext.grid.Panel', {
	width : '100%',
	selType : 'checkboxmodel',
	frame : true,
	columnLines : true,
	store : jsonStore,
    plugins: [rowEditing],
	columns : [ {
		header : '选择',
		sortable : false,
		hideable : false,
		dataIndex : 'classid',
        editor : {
            allowBlank : false
        }
	}, {
		text : '课程',
		dataIndex : 'classname',
		flex : 1,
        editor : {
            allowBlank : false
        }
	}, {
		text : '课时',
		dataIndex : 'period'
	}, {
		text : '学分',
		dataIndex : 'period'
	}, {
		text : '完成时限'
	}, {
		text : '选择'
	}, {
		text : '课程设置节点'
	}, {
		text : '课时'
	}, {
		text : '时间限制'
	}, {
		text : '状态'
	}, {
		text : '备注'
	} ],
    tbar : [{
        text : '增加',
        handler : function(){
            var store = courseTable.getStore();
            store.insert(0,{
                'classid' : 0,
                'classname' : '待定'
            });
        }
    },{
        text : '删除',
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
        text : '保存',
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
// 开课计划
var createCoursePlan = new Ext.Panel({
	title : '开课计划',
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
			fieldLabel : '学校',
			columnWidth : 0.25,
			store : states,
			queryMode : 'local',
			valueField : 'abbr',
			displayField : 'name'
		}, {
			xtype : 'combo',
			fieldLabel : '专业',
			columnWidth : 0.25,
			store : states,
			queryMode : 'local',
			valueField : 'abbr',
			displayField : 'name'
		}, {
			xtype : 'combo',
			fieldLabel : '课程',
			columnWidth : 0.25,
			store : states,
			queryMode : 'local',
			valueField : 'abbr',
			displayField : 'name'
		}, {
			xtype : 'button',
			columnWidth : 0.12,
			text : '搜索'
		}, {
			xtype : 'button',
			columnWidth : 0.13,
			text : '课程说明'
		} ]
	}, courseTable ]

});
//tree test data
var classTree = Ext.create('Ext.data.TreeStore', {
	root : {
		expanded : true,
		children : [ {
			text : '班级1',
			leaf : true
		}, {
			text : '班级2',
			leaf : true
		}, {
			text : '班级3',
			leaf : true
		} ]
	}
});
//班级表
var classTable1 = Ext.create('Ext.grid.Panel', {
	//title : '班级表',
	id : 'class1',
	frame : true,
	columnLines : true,
	store : states,
	//el : 'classStatus',
	//renderTo : Ext.getCmp('classstatus'),
	header : {
		xtype : 'label',
		width : '100%',
		text : '班级1',
		align : 'center'
	},
	columns : [ {
		text : '编号',
		sortable : false,
		hideable : false,
		dataIndex : 'abbr'
	}, {
		text : '姓名',
		dataIndex : 'abbr',
		flex : 1
	}, {
		text : '学号',
		dataIndex : 'abbr'
	}, {
		text : '性别',
		dataIndex : 'abbr'
	}, {
		text : '完成时限'
	}, {
		text : '备注'
	}, {
		/*xtype : 'panel',
		layout : 'vbox',
		items : [{
			xtype : 'button',
			text : '修改'
		},{
			xtype : 'button',
			text : '删除'
		}]*/
		text : '操作'
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		// store : store,
		dock : 'bottom',
		displayInfo : true
	} ]
});

var classTable2 = Ext.create('Ext.grid.Panel', {
	//title : '班级表',
	id : 'class2',
	frame : true,
	columnLines : true,
	store : states,
	//el : 'classStatus',
	//renderTo : Ext.getCmp('classstatus'),
	header : {
		xtype : 'label',
		width : '100%',
		text : '班级2',
		align : 'center'
	},
	columns : [ {
		text : '编号',
		sortable : false,
		hideable : false,
		dataIndex : 'abbr'
	}, {
		text : '姓名',
		dataIndex : 'abbr',
		flex : 1
	}, {
		text : '学号',
		dataIndex : 'abbr'
	}, {
		text : '性别',
		dataIndex : 'abbr'
	}, {
		text : '完成时限'
	}, {
		text : '备注'
	}, {
		text : '操作'
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		// store : store,
		dock : 'bottom',
		displayInfo : true
	} ]
});
var classTable3 = Ext.create('Ext.grid.Panel', {
	//title : '班级表',
	id : 'class3',
	frame : true,
	columnLines : true,
	store : jsonStore,
	//el : 'classStatus',
	//renderTo : Ext.getCmp('classstatus'),
	header : {
		xtype : 'label',
		width : '100%',
		text : '班级3',
		align : 'center'
	},
	columns : [ {
		text : '编号',
		sortable : false,
		hideable : false,
		dataIndex : 'classid'
	}, {
		text : '姓名',
		dataIndex : 'classname',
		flex : 1
	}, {
		text : '学号',
		dataIndex : 'period'
	}, {
		text : '性别',
		dataIndex : 'period'
	}, {
		text : '完成时限'
	}, {
		text : '备注'
	}, {
		text : '操作'
	} ],
	dockedItems : [ {
		xtype : 'pagingtoolbar',
		// store : store,
		dock : 'bottom',
		displayInfo : true
	} ]
});
var classTableArr = [ classTable1, classTable2, classTable3 ];
//班级列表(tree)
var classTree = Ext.create('Ext.tree.Panel', {
	region : 'west',
	width : 200,
	title : '所有班级列表',
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
// 班级情况
var classStatus = new Ext.Panel({

	title : '班级情况',
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