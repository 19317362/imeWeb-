/**
 * Created by mashroom on 17/4/11.
 */
var  pageContainerManagement =  pageContainerManagement  || {};

pageContainerManagement.init = function(){
    try{
        imeWeb.initPageBox("containerManagement/container",[1]);
        pageContainerManagement.dataInit();
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }

}

/*页面重写*/
pageContainerManagement.dataInit = function(){
    pageContainerManagement.contentInit();
    //pageContainerManagement.datatableData();
}

/*内容加载*/
pageContainerManagement.contentInit=function(){
    //表格取到空数据报错处理
    $.fn.dataTable.ext.errMode = function(s,h,m){};
    $('.containerManagement_table').html(Handlebars.templates['containerManagement/datatable_manage']([1]));
    check_containerManagementList();

}
/*获取列表函数*/
var check_containerManagementList = function(){
    var domainId = $.cookie('domainInfo_domainid');
    var url =  g_url_getContainerByDomain;
    $.getJSON(url,{domainid:domainId},function(data){
        $("#containerManagement_table").dataTable({
            "language": {
                "url": 'i18n/datatable_'+ $.cookie("appLanguage") +'.json'
            },
            //搜索框功能关闭
            "searching": false,
            //选择分页的个数功能关闭
            "bLengthChange": false,
            destroy:true,
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
            "order": [[ 0, "desc" ]],
            data : data,
            "columns": [
                {data: "containerid",
                    "createdCell": function (nTd, sData, oData, iRow, iCol){
                        $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' >" +
                            "<input type='checkbox' class='checkboxes' name='item' value="+ sData+"  /><span></span></label>");
                    }

                },
                {data: "containername"},
                {data: "containerdesc"},
                {data: "containerisAvailable"}

            ],
            "fnDrawCallback": function(){
                imeWeb.i18n.init();
            }
        });
    })
}

/*新建存储库*/
$(document).on('click','#create_containerBtn',function(){
    imeWeb.createChildPageHasId("containerManagement/pageCreateContainer","page-content-base","page-content-createContainer","container_addBtn");
})
/*添加按钮*/
$(document).on('click',"#container_addBtn",function(){
         var url = g_url_addContainer;
         var containername = $("#containername").val();
         var containerdesc = $("#containerdesc").val();
         var addWindowdomainid = $.cookie('domainInfo_domainid');
         var addWindowcontainerid = '';
         var container_status = $("input[name='container_status']:checked").val();
    //判断存储库的名称不能为空
    if(containername==""||containername==null){
        msgFail(".container_alert","存储库不能为空");
    }else{
        saveOrUpdateContainer(url,containername,containerdesc,addWindowdomainid,addWindowcontainerid,container_status);
    }

})
/*添加函数*/
var saveOrUpdateContainer = function(url,containername,containerdesc,addWindowdomainid,addWindowcontainerid,container_status){
    $.ajax({
        url: url,
        type: "POST",
        data: {
            'containername':containername,
            'containerdesc':containerdesc,
            'addWindowdomainid':addWindowdomainid,
            'addWindowcontainerid':addWindowcontainerid,
            'container_status':container_status
        },
        dataType: "text",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('连接失败！');
            alert(XMLHttpRequest);
            alert(errorThrown);
        },
        success: function (data, status) {
            var result = JSON.parse(data);
            var success = result.success;
            if (success == true) {
                msgSuccess(".container_alert","操作成功");
                setTimeout(function(){
                  imeWeb.deleteChildPage();
                }, 1000);
            }
            else {
                msgFail(".container_alert",result.msg);

            }

        }
    });
}

/*编辑按钮*/

$(document).on('click','#edit_containerBtn',function(){
    //选择一条进行编辑
    var len = 0;
    var containername ='';
    var containerdesc ='';
    var container_status='';
    var addWindowcontainerid ='';
    //如果被选中则添加
    $("[name = item]:checkbox").each(function(){
        if(this.checked) {
            len++;
            //获取到提交参数
             addWindowcontainerid = $(this).val();
            containername=$(this).parents("td").parents("tr").children().eq(1).html();
            containerdesc=$(this).parents("td").parents("tr").children().eq(2).html();
            container_status=$(this).parents("td").parents("tr").children().eq(3).html();
        }
    });
    //alert(addWindowcontainerid+ containername+containerdesc+container_status);
    if(len==0){
        msgFail(".container_listAlert","请选择一条进行编辑");
    }else{
        imeWeb.createChildPageHasId("containerManagement/pageCreateContainer","page-content-base","page-content-createContainer","container_update");
        $("#containername").val(containername);
        $("#containerdesc ").val(containerdesc );
        $.cookie("addWindowcontainerid", addWindowcontainerid ,{ expires: 1 });
        if(container_status=='active'||container_status=='启用'){
            $("#containerStatus_1").prop("checked",true);
        }else{
            $("#containerStatus_2").prop("checked",true);
        }

    }
})

/*更新按钮*/
$(document).on('click','#container_update',function(){
    var url = g_url_updateContainer;
    var containername = $("#containername").val();
    var containerdesc = $("#containerdesc").val();
    var addWindowdomainid = $.cookie('domainInfo_domainid');
    var addWindowcontainerid = $.cookie("addWindowcontainerid");
    //alert(addWindowcontainerid);
    var container_status = $("input[name='container_status']:checked").val();
    saveOrUpdateContainer(url,containername,containerdesc,addWindowdomainid,addWindowcontainerid,container_status);
})

/*删除按钮*/
$(document).on('click','#delete_containerBtn',function(){
    //alert('123');
    var addWindowcontainerid ='';
    var len =0;
    $("[name = item]:checkbox").each(function(){
        if(this.checked) {
            len++;
            //获取到提交参数
            addWindowcontainerid = $(this).val();
        }
    });
    //alert(addWindowcontainerid+ containername+containerdesc+container_status);
    if(len==0){
        msgFail(".container_listAlert","请选择一条进行删除");
    }else{
        $.confirm({
            title: false,
            content: '确认要禁用吗？',
            type: 'red',
            typeAnimated: true,
            buttons: {
                yes: {
                    text: '确认',
                    btnClass: 'btn-blue',
                    action: function(){
                        $.ajax({
                            url:g_url_removeDomainContainer,
                            type: "GET",
                            data: {
                                'domainid':$.cookie('domainInfo_domainid'),
                                'containerid':addWindowcontainerid
                            },
                            catch: false,
                            async: false,
                            dataType: "text",
                            //contentType: "application/json; charset=utf-8",
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert('连接失败！');
                                alert(XMLHttpRequest);
                                alert(errorThrown);

                            },
                            success: function (data, status) {
                                var res=JSON.parse(data);
                                var success = res.success;
                                var msg = res.msg;
                                if (success == true) {
                                    msgSuccess(".container_listAlert","禁用成功!");
                                    location.reload();
                                }
                                else {
                                    msgFail(".container_listAlert",msg);
                                }

                            }
                        });
                    }
                },
                no:{
                    text: '取消'
                }
            }
        });
    }
})

/*复制存储库*/
$(document).on('click','#copy_containerBtn',function(){
    var len =0;
    var containername ='';
    $("[name = item]:checkbox").each(function(){
        if(this.checked) {
            len++;
            //获取到提交参数
            containername=$(this).parents("td").parents("tr").children().eq(1).html();
        }
    });
    if(len==0){
        msgFail(".container_listAlert","请选择对象");
    }else{
        //alert(containername);
        imeWeb.createChildPageHasId("containerManagement/pageCopyContainer","page-content-base","page-content-createContainer","container_copyBtn");
        $("#targetContainer").val(containername);
        $("#targetContainer").attr("readonly","readonly");
    }

})

/*搜索存储库*/
$(document).on('click','.search_container',function(){
    var url = g_url_getContainerByDomain;
    $.getJSON(url,{'domainid': $.cookie('domainInfo_domainid')},function(data){
        $("#container_copyData").html(Handlebars.templates['containerManagement/pageLiData'](data));
    })
})

/*确定复制存储库*/
$(document).on('click','#container_copyBtn',function(){
   var targetContainer = $("#targetContainer").val();
    var modelContainer = $("#modelContainer").val();
    var url =  g_url_copyContainerStruct;
        $.ajax({
            url: url,
            type: "GET",
            data: {
                'modelContainer': modelContainer,
                'targetContainer': targetContainer
            },
            catch: false,
            async: false,
            dataType: "text",
            //contentType: "application/json; charset=utf-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('连接失败！');
                alert(XMLHttpRequest);
                alert(errorThrown);

            },
            success: function (data, status) {
                    var res = JSON.parse(data);
                    if(res.success == true){
                        msgSuccess(".container_alert",res.msg);
                        setTimeout(function(){
                            parent.location.reload();
                        }, 1000);
                    }else{
                        msgFail(".container_alert",res.msg);

                    }
            }
        })
})


/*双击事件*/
$(document).on("dblclick","#containerManagement_table tr:not(tr:eq(0))",function(){
    var containerid = $($($(this).children("td")[0]).children()[0]).children("input").val();
    $.cookie("containerid", containerid ,{ expires: 1 });
    imeWeb.createChildPage("containerManagement/pageContentContainer","page-content-base","page-content-newBuild");
        //获取组内成员信息
    getContainerUser();

})

/*成员获取方法*/
var getContainerUser = function(){
    var url =  g_url_getUserByContainer;
    $.getJSON(url,{'containerid':$.cookie("containerid")},function(data){
        //对获取数据去重
        var res =    imeWeb.distinct(data);
        $("#container_memberList").dataTable({
            searching:false, //去掉搜索框
            bLengthChange:false,//去掉每页多少条框体
            "language": {
                "info": "显示 _START_ 到 _END_ 条,总共 _TOTAL_ 条", // 表格左下角显示的文字
                "paginate": {
                    "previous": "上一页",
                    "next": "下一页"
                }
            },
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
            "order": [[ 0, "desc" ]],
            destroy:true,
            data : res,
            "columns": [
                {data: "oid",
                    "createdCell": function (nTd, sData, oData, iRow, iCol){
                        $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' ><input type='checkbox' class='checkboxes' name='item' value="+ sData+" /><span></span></label>");
                    }

                },
                {data: "usertype"},
                {data: "userid"},
                {data: "username"}
            ]
        });
        DeleteRepeatEl();
    })

}
//去重函数
 var DeleteRepeatEl = function(){
     var res = [];
     $("input[name = item]:checkbox").each(function(){
         //不存在
         if(res.indexOf($(this).val())==-1){
             res.push($(this).val());
         }else{
             $(this).parents("td").parents("tr").remove();
         }
     })
 }

/*添加成员*/
$(document).on('click',"#add_containerMem",function(){
    imeWeb.createChildPageHasId("systemTools/pageSearchMember","page-content-newBuild","page-content-SearchMember","container_saveMem");
})

$(document).on('click',"#container_saveMem",function(){
   var url =  g_url_setContainerUser;
   var containerid = $.cookie("containerid") ;
    var oId = "";
    //获取到oId
    $("tbody [name = item]:checkbox").each(function(){
        if(this.checked){
            var id = $(this).val();
            oId  = id  +";"+oId ;
        }
    })
    //发送请求
        $.ajax({
            url: url,
            type: "GET",
            data: {
                'containerid':containerid ,
                'oids':oId
            },
            catch: false,
            async: false,
            dataType: "text",
            //contentType: "application/json; charset=utf-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('连接失败！');
                alert(XMLHttpRequest);
                alert(errorThrown);

            },
            success: function (data, status) {
                var res=JSON.parse(data);
                var success = res.success;
                var msg = res.msg;
                if (success == true) {
                    imeWeb.closeChildPage();
                    getContainerUser();
                    msgSuccess("#container_listAlert","添加成功!");
                }
                else {
                    imeWeb.closeChildPage();
                    getContainerUser();
                    msgFail("#container_listAlert",msg);
                }

            }
        });
})
/*删除成员*/

$(document).on('click',"#delete_containerMem",function(){
    var userid ='';
    $("tbody [name = item]:checkbox").each(function(){
        if(this.checked){
            var id = $(this).val();
            userid = id ;
        }
    })
    //发送请求
    $.ajax({
        url: g_url_removeContainerUser,
        type: "GET",
        data: {
            'containerid':$.cookie("containerid") ,
            'userid':userid
        },
        catch: false,
        async: false,
        dataType: "text",
        //contentType: "application/json; charset=utf-8",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('连接失败！');
            alert(XMLHttpRequest);
            alert(errorThrown);

        },
        success: function (data, status) {
            var res=JSON.parse(data);
            var success = res.success;
            var msg = res.msg;
            if (success == true) {
                getContainerUser();
                msgSuccess("#container_listAlert","删除成功!");
            }
            else {
                getContainerUser();
                msgFail("#container_listAlert",msg);
            }

        }
    });
})


$(document).on('click',"#containerNext-btn",function(){
    $('#tab1').removeClass('active');
    $('#tab2').addClass('active');
    $('#nav_tab1').removeClass('active');
    $('#nav_tab2').addClass('active');
    //载入权限信息
    getContainerRight();
})
//权限信息函数
var getContainerRight = function(){
    var url = g_url_getPermissionByContainer;
    $.getJSON(url,{'containerid':$.cookie("containerid")},function(data){
        //console.log(data);
        //对获取数据去重
        var res =    imeWeb.distinct(data);
        $("#container_rightList").dataTable({
            searching:false, //去掉搜索框
            bLengthChange:false,//去掉每页多少条框体
            "language": {
                "info": "显示 _START_ 到 _END_ 条,总共 _TOTAL_ 条", // 表格左下角显示的文字
                "paginate": {
                    "previous": "上一页",
                    "next": "下一页"
                }
            },
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
            "order": [[ 0, "desc" ]],
            destroy:true,
            data : res,
            "columns": [
                {data: "id",
                    "createdCell": function (nTd, sData, oData, iRow, iCol){
                        $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' ><input type='checkbox' class='checkboxes' name='item' value="+ sData+" /><span></span></label>");
                    }

                },
                {data: "id"},
                {data: "principaloid"},
                {data: "type"},
                {data: "softtype"},
                {data: "lifecycle"},
                {data: "read"},
                {data: "write"},
                {data: "add"},
                {data: "download"},
                {data: "print"},
                {data: "delete"},
                {data: "mag"},
                {data: "all"},
                {data: "created"},
                {data: "createrId"},
                {data: "modifierId"},
                {data: "modified"}
            ]
        });
        DeleteRepeatEl();
    })

}

$(document).on('click',"#add_containerRight",function(){
    imeWeb.createChildPage("containerManagement/pageAddRightContainer","page-content-newBuild","page-content-addRightContainer");

    //获取leftTable中的数据
    var url = g_url_getsofttypeLifecycle;
    $.getJSON(url,{'containerid':$.cookie("containerid")},function(data){
        $("#container_leftTb").dataTable({
            searching:false, //去掉搜索框
            bLengthChange:false,//去掉每页多少条框体
            "bPaginate" : false,//去掉分页
            "scrollY":"400px",
            "info": false,
            destroy:true,
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
            "order": [[ 0, "asc" ]],
            createdRow: function (row, data, dataIndex) {
                $(row).attr({"data": JSON.stringify(data)});
            },
            data : data,
            "columns": [
                {data: "number",
                    "createdCell": function (nTd, sData, oData, iRow, iCol){
                        $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' >" +
                            "<input type='checkbox' class='checkboxes container_item1' name='item' value="+ sData+"  /><span></span></label>");
                    }

                },
                {data: "softType"},
                {data: "state"}

            ]
        });
        //全选按钮
        imeWeb.tools.H_allChecked($(".container_leftItem_check"),$(".container_item1"));
    })
      //权限全选
    imeWeb.tools.H_allChecked($(".container_allItem_check"),$("input[name=item1]"));
})

//右移按钮
$(document).on('click',"#container_moveRight",function(){
    //获取打钩的元素
    var len = 0;
    var softType ='';
    var state ='';
    var param = '';
    var id = '';
    var data = '';
    //如果被选中则添加
    $("#container_leftTb [name = item]:checkbox").each(function(){
        if(this.checked) {
            len++;
            //获取到提交参数
            id = $(this).val();
            data = $(this).parents("td").parents("tr").attr("data");
            softType = $(this).parents("td").parents("tr").children().eq(1).html();
            state = $(this).parents("td").parents("tr").children().eq(2).html();
            //放入到字符串中
            param = param+"<tr data="+data+"><td><label class='mt-checkbox mt-checkbox-single mt-checkbox-outline'><input type='checkbox' class='checkboxes container_item2' name='item' value="+id+"><span></span></label></td><td>"
                +softType+"</td> <td>"+state+"</td></tr>";
    }
    });
    if(len==0){
        msgFail("#container_rightListAlert","请选择对象");
    }else{
        $("#container_tbRightList").append(param);
        //去重
        //去除重复的行
        var res = [];
        $("#container_tbRightList input[name = item]:checkbox").each(function(){
            //不存在
            if(res.indexOf($(this).val())==-1){
                res.push($(this).val());
            }else{
                $(this).parents("td").parents("tr").remove();
            }
        })
        $("#container_rightTb").dataTable({
            searching:false, //去掉搜索框
            bLengthChange:false,//去掉每页多少条框体
            "bPaginate" : false,//去掉分页
            "sEmptyTable":false,
            "scrollY":"400px",
            "info": false,
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
            "order": [[ 0, "asc" ]],
        });
     }
    //全选按钮
    imeWeb.tools.H_allChecked($(".container_rightItem_check"),$(".container_item2"));
})
/*左移按钮*/
$(document).on('click',"#container_moverLeft",function() {
    $("#container_rightTb [name = item]:checkbox").each(function() {
        if(this.checked) {
            $(this).parents("td").parents("tr").remove();
        }
    })
})

/*选择数据*/
$(document).on('click',"#container_typeBtn li",function() {
        var type = $("#container_type").val();
    if(type==""){
        msgFail("#container_formAlert","请先选取数据类型");
    }else{
        if(type=="组"||type=="group"){
            $("#container_role").attr("disabled","disabled");
            $("#check_containerAllUser").attr("disabled","disabled");
            $("#containerSelect_type").attr("disabled",false);
            $("#container_SelectData").attr("disabled",false);
        }else if(type=="用户"||type=="user"){
            $("#container_role").attr("disabled","disabled");
            $("#check_containerAllUser").attr("disabled",false);
            $("#containerSelect_type").attr("disabled",false);
            $("#container_SelectData").attr("disabled",false);
        }else{
            $("#container_role").attr("disabled",false);
            $("#check_containerAllUser").attr("disabled","disabled");
            $("#containerSelect_type").attr("disabled","disabled");
            $("#container_SelectData").attr("disabled","disabled");
        }
    }
})

/*获取数据按钮*/
$(document).on('click',"#containerSelect_type",function() {
    var type = $("#container_type").val();
    if(type==""){
        msgFail("#container_formAlert","请先选取数据类型");
    }else{
        if(type=="组"||type=="group"){
            imeWeb.createChildPage("systemTools/pageSearchGroup","page-content-addRightContainer","page-content-containerAddGroup");
        }else if(type=="用户"||type=="user"){
            imeWeb.createChildPageHasId("systemTools/pageSearchUser","page-content-addRightContainer","page-content-containerAddUser","container_addUser");

        }else{
            console.msg("错误数据");
        }
    }
})

$(document).on('click',"#page-content-containerAddGroup,#container_addUser",function() {
    //如果被选中则添加
    var len = 0;
    var param="";
    var id = "";
    $("[name = item]:checkbox").each(function() {
        if (this.checked) {
            param = $(this).parents("td").parents("tr").children().eq(1).html();
            id = $(this).val();
            len++;
        }
    })
    if(len==0){
        msgFail("#user_searchUserListAlert","必须选择一个对象!");
    }else{
        if($("#type").val()=="组"||$("#type").val()=="Group"){
            $("#container_SelectData").prop("Pgroupid",id);

        }else if($("#type").val()=="用户"||$("#type").val()=="User"){
            $("#container_SelectData").prop("Puserid",id);
        }
        //关闭窗口
        imeWeb.closeChildPage();
        $("#container_SelectData").val(param);
    }

})


/*保存权限*/
$(document).on('click',"#container_saveRight",function() {
       //获取jsonData
    var jsonData =[];
    $("#container_rightTb [name = item]:checkbox").each(function() {
        var obj =JSON.parse($(this).parents("td").parents("tr").attr("data"));
        jsonData.push(obj);
    })
    var Pcontainerid = $.cookie("containerid");
    var Pdomainid =$.cookie("domainInfo_domainid");
    //console.log(jsonData);
    //获取权限
    $("input[name=item1]").each(function(){
        if(this.checked){
            $(this).val("Y");
        }else{
            $(this).val("");
        }
    })
    var read = $("#container_read").val();
    var write = $("#container_write").val();
    var add = $("#container_add").val();
    var container_delete = $("#container_delete").val();
    var download = $("#container_load").val();
    var print = $("#container_print").val();
    var all = $("#container_all").val();
    var mag = $("#container_mag").val();
    var Pprincipalid = $("#container_SelectData").val();
    var permission_type = $("#container_type").val();
     if(permission_type=="组"){
         permission_type = "group";
     }else if(permission_type=="用户"){
         permission_type = "user";
     }else if(permission_type=="角色"){
         permission_type = "role";
     }
   var permission_softtype = $(this).parents("td").parents("tr").children().eq(1).html();
   var permission_lifecycle = "";
   var permission_groupid = "";
   var Puserid = "com.imecms.principal.User:534";
   var Pgroupid = $("#container_SelectData").prop("Pgroupid");
   var Puserid =  $("#container_SelectData").prop("Puserid");
    //获取所有用户
    var allusers = '';
    if($("#check_containerAllUser").prop("checked")){
        allusers = "Y";
    }
    //alert(allusers);
    //ajax提交参数
    var url = g_url_addPermissions;
    $.ajax({
        url: url,
        type: "POST",
        data: {
            'Pcontainerid':Pcontainerid,
            'jsonData':JSON.stringify(jsonData),
            'Pdomainid':Pdomainid,
            'read':read,
            'write':write,
            'add':add,
            'delete':container_delete,
            'download':download,
            'print':print,
            'all':all,
            'mag':mag,
            'Pprincipalid':Pprincipalid,
            'permission_type':permission_type,
            'permission_softtype':'',
            'permission_lifecycle':'',
            'permission_groupid':'',
            'Puserid':Puserid,
            'Pgroupid': Pgroupid,
            'allusers':allusers

        },
        dataType: "text",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('连接失败！');
            alert(XMLHttpRequest);
            alert(errorThrown);
        },
        success: function (data, status) {
            var result = eval("("+data+")");
            var success = result.success;
            if (success == true) {
                msgSuccess("#container_rightListAlert","操作成功");
                setTimeout(function(){
                    imeWeb.deleteChildPage();
                }, 1000);
                getContainerRight();
            }
            else {
                msgFail("#container_rightListAlert",result.msg);

            }

        }
    });
})


/*删除权限*/
$(document).on('click',"#delete_containerRight",function() {
    //选择删除的对象
    var len = 0;
    var id =[];
    $("#container_rightList [name = item]:checkbox").each(function() {
        if (this.checked) {
            var obj = {};
            var param = $(this).parents("td").parents("tr").children().eq(1).html();
            obj["id"] = param;
            id.push(obj);
            len++;
        }
    })
    if(len==0){
        msgFail("#container_listAlert","必须选择对象!");
    }else{
        var containerid = $.cookie("containerid");
        var url = g_url_deletePermissions;
        //发送请求
        $.confirm({
            title: false,
            content: '确认要删除吗？',
            type: 'red',
            typeAnimated: true,
            buttons: {
                yes: {
                    text: '确认',
                    btnClass: 'btn-blue',
                    action: function(){
                        $.ajax({
                            url: url,
                            type: "POST",
                            data: {
                                'containerid':containerid,
                                'id':JSON.stringify(id),
                            },
                            dataType: "text",
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert('连接失败！');
                                //alert(XMLHttpRequest);
                                //alert(errorThrown);
                            },
                            success: function (data, status) {
                                var result = JSON.parse(data);
                                var success = result.success;
                                if (success == true) {
                                    msgSuccess("#container_listAlert","操作成功");
                                    getContainerRight();
                                }
                                else {
                                    msgFail("#container_listAlert",result.msg);

                                }

                            }
                        });
                    }
                },
                no:{
                    text: '取消'
                }
            }
        });

    }
})
