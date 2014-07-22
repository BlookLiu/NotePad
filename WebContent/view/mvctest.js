$(document).ready(function() {
			$('#dg').datagrid({
						columns : [[{
									field : 'code',
									title : 'Code',
									width : 100
								}, {
									field : 'name',
									title : 'Name',
									width : 100
								}, {
									field : 'price',
									title : 'Price',
									width : 100,
									align : 'right'
								}]],
						toolbar : [{
									iconCls : 'icon-edit',
									handler : function() {
										alert('edit')
									}
								}, '-', {
									iconCls : 'icon-help',
									handler : function() {
										alert('help')
									}
								}]
					});
		});