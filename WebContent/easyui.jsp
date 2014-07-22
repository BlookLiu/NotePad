<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="GB18030"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>easyui test</title>

 <link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css">
 <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">
 <script type="text/javascript" src="easyui/jquery.min.js"></script>
 <script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
</head>
<body>
	<table id="dg" title="My Users" class="easyui-datagrid" style="width:700px;height:250px"
            url="get_users.php"
            toolbar="#toolbar" pagination="true"
            rownumbers="true" fitColumns="true" singleSelect="true">
        <thead>
            <tr>
                <th field="firstname" width="50">First Name</th>
                <th field="lastname" width="50">Last Name</th>
                <th field="phone" width="50">Phone</th>
                <th field="email" width="50">Email</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newUser()">New User</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editUser()">Edit User</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyUser()">Remove User</a>
    	<div><input id="db" class="easyui-datebox"></input></div>
    </div>
    
    <div id="dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px"
            closed="true" buttons="#dlg-buttons">
        <div class="ftitle">User Information</div>
        <form id="fm" method="post" novalidate>
            <div class="fitem">
                <label>First Name:</label>
                <input name="firstname" class="easyui-validatebox" required="true">
            </div>
            <div class="fitem">
                <label>Last Name:</label>
                <input name="lastname" class="easyui-validatebox" required="true">
            </div>
            <div class="fitem">
                <label>Phone:</label>
                <input name="phone">
            </div>
            <div class="fitem">
                <label>Email:</label>
                <input name="email" class="easyui-validatebox" validType="email">
            </div>
            <div class="fitem">
                <label>时间:</label>
                <input id="starttime" class="easyui-timespinner" style="width:60px;">
                	到
                <input id="endtime" class="easyui-timespinner" style="width:60px;">
            </div>

        </form>
    </div>
    <div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveUser()">Save</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">Cancel</a>
    </div>
    <script type="text/javascript">
        var url;
        function newUser(){
            $('#dlg').dialog('open').dialog('setTitle','New User');
            $('#fm').form('clear');
            url = 'save_user.php';
        }
        function editUser(){
            var row = $('#dg').datagrid('getSelected');
            if (row){
                $('#dlg').dialog('open').dialog('setTitle','Edit User');
                $('#fm').form('load',row);
                url = 'update_user.php?id='+row.id;
            }
        }
        function saveUser(){
        	var starttime = $('#starttime').timespinner('getValue').replace(':','.');
        	var endtime = $('#endtime').timespinner('getValue').replace(':','.');
        	if(starttime-endtime>0){
        		alert("结束时间不能早于开始时间！");
        		return;
        	}
            $('#fm').form('submit',{
                url: url,
                onSubmit: function(){
                    return $(this).form('validate');
                },
                success: function(result){
                    var result = eval('('+result+')');
                    if (result.errorMsg){
                        $.messager.show({
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    } else {
                        $('#dlg').dialog('close');        // close the dialog
                        $('#dg').datagrid('reload');    // reload the user data
                    }
                }
            });
        }
        function destroyUser(){
            var row = $('#dg').datagrid('getSelected');
            if (row){
                $.messager.confirm('Confirm','Are you sure you want to destroy this user?',function(r){
                    if (r){
                        $.post('destroy_user.php',{id:row.id},function(result){
                            if (result.success){
                                $('#dg').datagrid('reload');    // reload the user data
                            } else {
                                $.messager.show({    // show error message
                                    title: 'Error',
                                    msg: result.errorMsg
                                });
                            }
                        },'json');
                    }
                });
            }
        }
        
        
        $(document).ready(function(){
        	//设置datebox缺省时间
        	var date = new Date();
        	var dateStr = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
        	$('#db').datebox('setValue', dateStr);
        	
        	//添加timespinner事件
        	/* $('#starttime').timespinner({
        		//showSeconds: true,
        		//min: '08:30',
        		spin: function(down){
        			var value = $('#starttime').timespinner('getValue');
        			//alert(value);
        			var obj = $('#starttime').timespinner('options');
        			alert(obj);
        			$('#endtime').timespinner({
        				min:value
        			}); 
        		}
        	}); */
        	
        	
        });
        	
    </script>
    <style type="text/css">
        #fm{
            margin:0;
            padding:10px 30px;
        }
        .ftitle{
            font-size:14px;
            font-weight:bold;
            padding:5px 0;
            margin-bottom:10px;
            border-bottom:1px solid #ccc;
        }
        .fitem{
            margin-bottom:5px;
        }
        .fitem label{
            display:inline-block;
            width:80px;
        }
    </style>
</body>
</html>