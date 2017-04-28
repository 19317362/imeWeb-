/**
 * Created by mashroom on 17/3/13.
 */
var  pageGroupManagement =  pageGroupManagement  || {};

pageGroupManagement.init = function(){
    try{
        imeWeb.initPageBox("systemTools/pageGroupManagement",[1]);
        pageGroupManagement.dataInit();
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }


}
  /*页面重写*/
pageGroupManagement.dataInit = function(){
    pageGroupManagement.contentInit();
}
/*内容加载*/
pageGroupManagement.contentInit = function(){
    //表格取到空数据报错处理
    $.fn.dataTable.ext.errMode = function(s,h,m){};
    //表格初始化
    check_group('','');
}
//查询函数
var check_group = function(a,b){
    var url =g_url_searchGroups;
    $.ajax({
        url:url,
        async:true,
        data: {
            'groupId':a,
            'groupName':b
        },
        context:{
            refreshbutton:$('#check_group'),
            refresharea:$('.refresh_area'),
            clickfunction:search_clickGroupList
        },
        success:function(data,textstatus){
            var res =imeWeb.distinct(data);
            $("#group_one").dataTable({
                searching:false, //去掉搜索框
                bLengthChange:false,//去掉每页多少条框体
                "language": {
                    "url": 'i18n/datatable_'+ $.cookie("appLanguage") +'.json'
                },
                destroy:true,
                "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
                "order": [[ 0, "desc" ]],
                data : res ,
                "columns": [
                    {data: "oId",
                        "createdCell": function (nTd, sData, oData, iRow, iCol){
                            $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' >" +
                                "<input type='checkbox' class='checkboxes' name='item' value="+ sData+"  /><span></span></label>");
                        }

                    },
                    {data: "principalId"},
                    {data: "name"},
                    {data: "desc"}

                ]
            });
        }
    });
}

//查询按钮
 var search_clickGroupList = function(){
     var groupId = $("#groupId").val();
     var groupName = $("#groupName").val();
     check_group(groupId,groupName);
 }


//删除按钮
$(document).on('click','#deleteGroup',function(){
    var len = 0;
    var principalId="";
    var oIdRecords="";
    $("[name = item]:checkbox").each(function(){
        if(this.checked) {
            len++;
            //获取到principalId跟oIdRecords
            var id=$(this).parents("td").parents("tr").children().eq(1).html();
            var oId = $(this).val();
            principalId = principalId +";"+id+";";
            oIdRecords = oIdRecords +";"+oId+";";
        }
    });
    if(len==0){
        msgFail("#group_baseList","请选择要删除对象!");
    }else{
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
                                url: g_url_deleteGroup,
                                type: "POST",
                                data: {
                                    'principalId':principalId,
                                    'oId':oIdRecords
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
                                var res=eval("("+data+")");
                                    var success = res.success;
                                    var msg = res.msg;
                                    if (success == true) {
                                       msgSuccess("#group_baseList","删除成功!");
                                        location.reload();
                                    }
                                    else {
                                       msgFail("#group_baseList",msg);
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

});


//    创建中的下一步
$(document).on('click','#groupNext-btn',function(){
    if($("#memberId").val()==""||$("#name").val()==""){
        msgFail("#group_listAlert","ID跟名称都必须填写!");
    }else {
        $('#tab1').removeClass('active');
        $('#tab2').addClass('active');
        $('#nav_tab1').removeClass('active');
        $('#nav_tab2').addClass('active');
        //检查id是否可以编辑
        if ($("#memberId").attr("readonly") == "readonly") {
            //id不可以编辑，更新组
            var url = "/imeWeb/Services/principal/loadMembers";
            var principalId = $("#memberId").val();
            $.ajax({
                url: " /imeWeb/Services/principal/updateGroup",
                type: "POST",
                data: {
                    'principalId': principalId
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
                    var success = data.split(':')[1].split('}')[0];
                    if (success == "true") {
                        //获取组内成员
                        check_groupMember(url, principalId);
                    }else{
                        alert('false');
                    }

                }
            });

        } else {
            //id可以编辑，则创建一个组
            //先判断组是否存在
            var principalId = $("#memberId").val();
            $.ajax({
                url: "/imeWeb/Services/principal/createGroup",
                type: "POST",
                data: {
                    'principalId': principalId
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
                    //释放
                    principalId = "";
                    var result = JSON.parse(data);
                    var success = result.success;
                    if (success == true) {
                        //获取组内成员
                        //check_groupMember(url, principalId);
                        return '';
                    }
                    else {
                        msgFail("#group_listAlert","组已存在，请重新创建组!");
                        $('#tab2').removeClass('active');
                        $('#tab1').addClass('active');
                        $('#nav_tab1').addClass('active');
                        $('#nav_tab2').removeClass('active');
                    }

                }
            });

        }
    }
})




//      上一步
$(document).on('click','.up-btn',function(){
    $('#tab2').removeClass('active');
    $('#tab1').addClass('active');
    $('#nav_tab1').addClass('active');
    $('#nav_tab2').removeClass('active');
})

/*组内成员查看函数*/
var check_groupMember = function(url,principalId){
    $.getJSON(url,{ principalId: principalId },function(data){
        $("#Memberlist").dataTable({
            searching:false, //去掉搜索框
            bLengthChange:false,//去掉每页多少条框体
            "bPaginate" : false,//去掉分页
            "language": {
                "info": "", // 表格左下角显示的文字
                "paginate": {
                    "previous": "上一页",
                    "next": "下一页"
                }
            },
            destroy:true,
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
            "order": [[ 0, "desc" ]],
            data : data,
            "columns": [
                {data: "oid",
                    "createdCell": function (nTd, sData, oData, iRow, iCol){
                        $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' >" +
                            "<input type='checkbox' class='checkboxes' name='item' value="+ sData+"  /><span></span></label>");
                    }

                },
                {data: "principalId"},
                {data: "name"},
                {data: "desc"}

            ]
        });
    });
}


/*保存组以及成员*/
$(document).on('click','.saveGroupMem',function(){
    var url = "/imeWeb/Services/principal/saveMembers";
    var principalId = $("#memberId").val();
    var name = $("#name").val();
    var desc= $("#desc").val();
    //获取组内成员编号
    var oId = "";
    //获取到oId
    $("#tbMain [name = item]:checkbox").each(function(){
        var id = $(this).val();
        oId  = oId  +";"+id+";";
    })
    var pOId="";
    save_groupMember(url,principalId,name,desc,oId,pOId);
})

/*组内成员保存函数*/
var save_groupMember = function(url,principalId,name,desc,oId,pOId){
    $.ajax({
        url: url,
        type: "POST",
        data: {
            'principalId':principalId,
            'name':name,
            'desc':desc,
            'oId':oId,
            'pOId':pOId
        },
        catch: false,
        async: false,
        dataType: "text",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('连接失败！');
            alert(XMLHttpRequest);
            alert(errorThrown);

        },
        success: function (data, status) {
            var result = JSON.parse(data);
            if (result.success == true) {
               msgSuccess("#group_listAlert","操作成功!");
                $('#nav_tab3').addClass('active');
                $('#nav_tab2').removeClass('active');
                setTimeout('imeWeb.deleteChildPage()',1000);
            }
            else {
                msgFail("#group_listAlert",result.msg);
            }

        }
    });
}
/*双击事件*/
$(document).on("dblclick","#group_one tr:not(tr:eq(0))",function(){
    //var id = $(this).children("td").eq(0).find("input").val();

    var memberId =  $(this).children("td").eq(1).html();
    var name =  $(this).children("td").eq(2).html();
    var desc = $(this).children("td").eq(3).html();
    //alert(memberId+name+desc);
    imeWeb.createChildPage("systemTools/createGroup","page-content-base","page-content-createGroup");
    $("#memberId").val(memberId );
    $("#name").val(name );
    $("#desc").val(desc );
    //id设置为只读事件
    $("#memberId").attr("readonly","readonly");

});
//创建组按钮
$(document).on("click","#createGroup",function(){
    imeWeb.createChildPage("systemTools/createGroup","page-content-base","page-content-createGroup");
})
//添加组按钮
$(document).on("click","#addMemberToGroup",function(){
    imeWeb.createChildPage("systemTools/pageSearchGroup","page-content-base","page-content-groupSearchGroup");
})

//添加成员按钮
$(document).on("click","#addMem",function(){
    imeWeb.createChildPageHasId("systemTools/pageSearchMember","page-content-createGroup","page-content-searchMember","saveMem");
})

//删除人员
$(document).on("click","#deleteMem",function(){
    $("input[name = item]:checkbox").each(function() {
        if(this.checked) {
            $(this).parents("td").parents("tr").remove();
        }
    })
})
//写这儿


//下拉框change事件
$(document).on("click","ul.dropdown-menu li",function(){
    var str = $(this).text();
    var re = str.replace(/\s+/g,"");//删除所有空格;
   $(this).parent().parent().prev("input").val(re);
});


//选择框
$(document).on("click",".item_check",function(){
    //当是选中状态
    if(this.checked){
        $("[name = item]:checkbox").each(function(){
            $(this).prop("checked", true);
        });
    }
    //当不是选中状态,取消全部选中
    else{
        $("[name = item]:checkbox").each(function(){
            $(this).prop("checked", false);
        });
    }
})



//组搜索
var searchGroup = function(){
    var url = "/imeWeb//Services/principal/searchPrincipal";
    var type = "Groups";
    var principalId=$("#principalId").val();
    var name=$("#name").val();
    $.ajax({
        url:url,
        async:true,
        data: {
            'type':type,
            'principalId':principalId,
            'name':name,
            'pool':"ALL"
        },
        context:{
            refreshbutton:$('#searchGroup'),
            refresharea:$('.refresh_area'),
            clickfunction:searchGroup
        },
        success:function(data,textstatus){
            $("#Rembers").dataTable({
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
                data : data,
                "columns": [
                    {data: "oid",
                        "createdCell": function (nTd, sData, oData, iRow, iCol){
                            $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' ><input type='checkbox' class='checkboxes' name='item' value="+ sData+" /><span></span></label>");
                        }

                    },
                    {data: "principalId"},
                    {data: "name"},
                    {data: "desc"},
                    {data: "domain"}
                ]
            });
        }
    });
}
$(document).on("click","#searchGroup",function(){
    searchGroup();
})

//添加已有组事件
$(document).on("click","#page-content-groupSearchGroup",function(){

        var domainid ="";
        //获取到domainId
        var url = "/imeWeb/Services/domain/getSessionDomain";
        $.ajaxSettings.async = false;
        $.getJSON(url,{},function(data) {
            domainid = data.domainid;
            console.log(domainid);
        })
        var oids ="";
        var len = 0;
        //如果被选中则添加
        $("[name = item]:checkbox").each(function(){
            if(this.checked) {
                len++;
                //获取到提交参数
                //var domain=$(this).parents("td").parents("tr").children().eq(4).html();
                var id = $(this).val();
                oids = id +";"+oids;
            }
        });
        //alert(domainid+"    "+oids );
        if(len==0){
            msgFail("#group_searchGroupListAlert","请选择添加对象!");
        }else {
            //alert(domainid+oids);
            //添加对象
            $.ajax({
                url: "/imeWeb/Services/domain/setDomainUser",
                type: "POST",
                data: {
                    'domainid':domainid,
                    'oids':oids
                },
                dataType: "text",
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('连接失败！');
                    alert(XMLHttpRequest);
                    alert(errorThrown);
                },
                success: function (data, status) {
                    //释放
                    domainid ="";
                    oids ="";
                    len = 0;
                    var success = data.split(':')[1].split('}')[0];
                    if (success == "true") {
                        msgSuccess("#group_searchGroupListAlert","添加成功!");
                        setTimeout(function(){
                            parent.location.reload();
                        }, 1000);
                    }
                    else {
                        msgFail("#group_searchGroupListAlert","添加失败!");

                    }

                }
            });
        }




})

//成员搜索方法
var search = function(type,principalId,name,pool,url){
    $.ajax({
        url:url,
        async:true,
        data: {
            'type':type,
            'principalId':principalId,
            'name':name,
            'pool':pool
        },
        context:{
            refreshbutton:$('#groupSearchMemOrGroup'),
            refresharea:$('.refresh_area'),
            clickfunction:action_search
        },
        success:function(data,textstatus){
            $("#search").dataTable({
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
                data : data,
                "columns": [
                    {data: "oid",
                        "createdCell": function (nTd, sData, oData, iRow, iCol){
                            $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' ><input type='checkbox' class='checkboxes' name='item' value="+ sData+" /><span></span></label>");
                        }

                    },
                    {data: "type"},
                    {data: "principalId"},
                    {data: "name"},
                    {data: "desc"},
                    {data: "domain"}
                ]
            });
        }
    });
}

//使用成员搜索方法
$(document).on("click","#groupSearchMemOrGroup",function(){
    action_search();
})
 var action_search = function(){
     var url = "/imeWeb//Services/principal/searchPrincipal";
     var type = $("#input").val();
     var principalId=$("#groupPrincipalId").val();
     var name=$("#groupName").val();
     if(type==""||type==null){
         search(type,principalId,name,"",url);
     }else{
         if(type=="组"||type=="group"){
             search("Groups",principalId,name,"",url);
         }else{
             search("Users",principalId,name,"",url);
         }

     }
 }
//添加成员到新建的组中
$(document).on("click","#saveMem",function(){
    //如果被选中则添加
    var len = 0;
    var param="";
    $("[name = item]:checkbox").each(function(){
        if(this.checked) {
            len++;
            //获取到提交参数
            var id = $(this).val();
            var param1=$(this).parents("td").parents("tr").children().eq(2).html();
            var param2=$(this).parents("td").parents("tr").children().eq(3).html();
            var param3=$(this).parents("td").parents("tr").children().eq(4).html();
            //放入到字符串中
            param = param+'<tr><td><label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" class="checkboxes" name="item" value='+id+'><span></span></label></td><td>'
                +param1+'</td> <td>'+param2+'</td><td>'+param3+'</td></tr>';

        }

    });
    //alert(param);
    //关闭当前页面
    var thisPage = $('.page-content:visible');
    var parentPage = null;
    var parentPageName = "";
    $.each(thisPage.attr('class').split(' '),function(index,value){
        if(value.indexOf('parent-') === 0){
            parentPageName = value.split('parent-')[1].split('-')[2];
            parentPage = $('.'+value.split('parent-')[1]);
        }
    });
    if(parentPage === null){
        return;
    }else{
        thisPage.remove();
        parentPage.removeClass('hidden');
        $('html, body').scrollTop(0);
    }
    $("#tbMain").append(param);
    //去除重复的行
    var res = [];
    $("#tbMain input[name = item]:checkbox").each(function(){
        //不存在
        if(res.indexOf($(this).val())==-1){
            res.push($(this).val());
        }else{
            $(this).parents("td").parents("tr").remove();
        }
    })

})

//提示框成功方法
var msgSuccess = function(containerId,msg){
    App.alert({container: containerId,
        place: 'append',
        type: 'success',
        message: msg,
        close: true,
        reset: true,
        focus: true,
        closeInSeconds: 3,
        icon: 'fa fa-check'
    });
}
//提示框失败方法
var msgFail = function(containerId,msg){
    App.alert({container: containerId,
        place: 'append',
        type: 'danger',
        message: msg,
        close: true,
        reset: true,
        focus: true,
        closeInSeconds: 6,
        icon: 'fa fa-close'
    });
}