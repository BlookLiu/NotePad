/*
 * Ext.onReady(function(){ Ext.get('myP').on('click',function(){ alert('click
 * click click!');Ext.widget(). }); });
 */
/*
 * Ext.application({ name: 'Hello ExtJs', launch: function(){ Ext.create(), }
 * });
 */

/*
 * Ext.onReady(function(){ var _panel = new Ext.panel.Panel({ title:'��Ա��Ϣ',
 * frame:true, width:400, height:300, renderTo: Ext.getBody() });
 * //_panel.add({text:"ȷ��"}); // _panel.addButton(new
 * Ext.Button({text:"ȡ��",minWidth:200})); _panel.render(Ext.getBody()); }) ;
 */

Ext.application({
			name : 'layout Test',
			launch : function() {
				Ext.create('Ext.panel.Panel', {
							width : 1024,
							height : 720,
							layout : 'border',
							items : [{
										region : 'south',
										xtype : 'panel',
										height : 200,
										split : true,
										html : 'welcome login',
										margins : '0 5 5 5'
									}, {
										title : 'West Region is collapsible',
										region : 'west',
										xtype : 'panel',
										width : 200,
										collapsible : true,
										margins : '5 5 0 5',
										id : 'west-region-collapsible',
										layout : 'fit',
										items : [Ext.create('Ext.panel.Panel',
												{
													// title : 'Accordion
													// Layout',
													defaults : {
														bodyStyle : 'padding:15px'
													},
													layout : {
														type : 'accordion',
														titleCollapse : true,
														animate : true,
														activeOnTop : false
													},
													items : [{
																title : 'Panel 1',
																html : 'Panel content!'
															}, {
																title : 'Panel 2',
																html : 'Panel content!'
															}, {
																title : 'Panel 3',
																html : 'Panel content!'
															}],
													renderTo : Ext.getBody()
												})]
									}, {
										title : 'Center',
										region : 'center',
										xtype : 'panel',
										//layout : 'fit',
										margins : '5 5 5 5',
										html : 'ExtJs �в�',
										items : [{
													xtype : 'component', // ����xtype:
													// 'component',
													width : 50, // ͼƬ���
													height : 50, // ͼƬ�߶�
													autoEl : {
														tag : 'img', // ָ��Ϊimg��ǩ
														src : 'resources/u11.png' // ָ��url·��
													}
												}]
									}],
							renderTo : Ext.getBody()
						});
			}
		});

/*
 * Ext.define('My.sample.Person',{ name: 'Unknown', constructor: function(name){
 * if(name){ this.name=name; } return this; }, eat: function(foodType){
 * alert(this.name+' is eating '+foodType); } }); var
 * blook=Ext.create('My.sample.Person','blook'); blook.eat('apple');
 */

Ext.define('MyApp.foo.Bar', function() {
			var id = 0;

			return {
				nextId : function() {
					return ++id;
				}
			};
		});
var myBar = Ext.create('MyApp.foo.Bar');
alert(myBar.id);