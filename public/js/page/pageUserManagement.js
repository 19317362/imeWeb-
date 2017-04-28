/**
 * Created by mashroom on 17/3/29.
 */
var  pageUserManagement =   pageUserManagement  || {};

pageUserManagement.init = function(){
    try{
        imeWeb.initPageBox("systemTools/pageUserManagement",[1]);
        pageUserManagement.dataInit();
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }


}
/*页面重写*/
pageUserManagement.dataInit = function(){
    pageUserManagement.contentInit();
}

/*表单内容初始化*/
pageUserManagement.contentInit =  function(){
    $.fn.dataTable.ext.errMode = function(s,h,m){};
    check_userList('','');

}
/*定义用户函数*/
var check_userList = function(principalId,name){
    var url = g_url_listUsers;
    $.ajax({
        url:url,
        async:true,
        data: {
            'principalId':principalId,
            'name':name,
            'start':0,
            'limit':50
        },
        context:{
            refreshbutton:$('#usersListSearch'),
            refresharea:$('.refresh_area')
        },
        success:function(data,textstatus){
            //console.log(data);
            var result = data.records;
            //console.log(result);
            $("#usersList").dataTable({
                searching:false, //去掉搜索框
                bLengthChange:false,//去掉每页多少条框体
                "language": {
                    "info": "显示 _START_ 到 _END_ 条,总共 _TOTAL_ 条", // 表格左下角显示的文字
                },
                destroy:true,
                //"aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
                "order": [[ 0, "principalId" ]],
                data :result,
                "columns": [
                    {data: "principalId"},
                    {data: "name"},
                    {data: "status"},
                    {data: "reportTo"},
                    {data: "email"},
                    {data: "tel"}

                ]
            });
        }
    });
}

/*查询check_userList*/
$(document).on("click","#usersListSearch",function() {
    var principalId = $("#userPrincipalId").val();
    var name = $("#userName").val();
    check_userList(principalId,name);
})

/*表单验证信息*/
$(document).on("blur","form#userModalInfoForm :input",function(){
    $('#user_listAlert').removeClass('onError');
   //登录ID验证
    if($(this).is('#registerId')){
        var reg = /^([a-zA-Z0-9]|[._]){4,19}$/;
        if(this.value==""||!reg.test(this.value)){
            var errMsg = '登录id 由4-19个英文字母、数字、下划线组成，不能包含空格、特殊字符';
            $('#user_listAlert').addClass('onError');
            msgFail('#user_listAlert',errMsg);
            $(this).focus();
        }else{
            //查询是否已经注册过了
            var url ="/imeWeb/Services/principal/checkPrincipalIdUnique";
            var principalId = $('#registerId').val();
            $.ajax({
                url: url,
                type: "POST",
                data: {
                    'principalId':principalId
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
                        msgSuccess("#user_listAlert","ID可以使用");
                    }else{
                        $('#user_listAlert').addClass('onError');
                        msgFail("#user_listAlert","ID已经注册过了");
                        $('#registerId').focus();
                    }

                }
            });
        }
    }
   //密码验证
    if($(this).is('#registerPwd')){
        if(this.value==""||this.value.length<6){
            var errMsg = '请输入至少6位密码';
            msgFail('#user_listAlert',errMsg);
            $('#user_listAlert').addClass('onError');
            $(this).focus();
        }
    }
    //确认密码验证
    if($(this).is('#registerCheckPwd')){
        if(this.value!=$('#registerPwd').val()){
            var errMsg = '密码不一致';
            msgFail('#user_listAlert',errMsg);
            $('#user_listAlert').addClass('onError');

        }
    }
    //邮箱验证
    if($(this).is('#registerEmail')){
        if(this.value==""|| !/.+@.+\.[a-zA-Z]{2,4}$/.test($("#registerEmail").val()) ){
            var errMsg = '请输入正确的邮箱格式';
            msgFail('#user_listAlert',errMsg);
            $('#user_listAlert').addClass('onError');
            $(this).focus();
        }
    }

})


/*下一步*/
$(document).on("click","#userNext-btn",function() {
    //先判断id是否可以编辑
    if ($("#registerId").attr("readonly") == "readonly") {
        //进行验证
        if($("#registerId").val()==""|| $("#registerName").val()==""||$("#registerEmail").val()==""){
            msgFail("#user_listAlert","带*项必须填写");
        }else{
            $('#tab1').removeClass('active');
            $('#tab2').addClass('active');
            $('#nav_tab1').removeClass('active');
            $('#nav_tab2').addClass('active');
            //条件判断成功，载入数据
            var principalId = $('#registerId').val();
            var url = g_url_loadUserGroup;
            check_userGroupMember(url,principalId);
        }
    }else{
        if($("#registerId").val()==""|| $("#registerName").val()==""||$("#registerPwd").val()==""||$("#registerCheckPwd").val()==""||$("#registerEmail").val()==""){
            msgFail("#user_listAlert","带*项必须填写");
        } else if($("#registerPwd").val()!=$("#registerCheckPwd").val()){
            msgFail("#user_listAlert","确认密码与密码不匹配");
        }else{
            //成功
            $('#tab1').removeClass('active');
            $('#tab2').addClass('active');
            $('#nav_tab1').removeClass('active');
            $('#nav_tab2').addClass('active');
        }
    }

})
/*组内成员查看函数*/
var check_userGroupMember = function(url,principalId){
    $.getJSON(url,{ principalId: principalId },function(data){
        $("#userGroupList").dataTable({
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
                {data: "status"},
                {data: "desc"}

            ]
        });
    });
}
//创建用户
$(document).on("click","#createUser",function() {
    imeWeb.createChildPageHasId("systemTools/pageCreateUser","page-content-base","page-content-createUser","userCreate-btn");
})

/*更新用户按钮*/

$(document).on("click","#updateUser",function() {
    //判断选中哪一条
    var len = 0;
    var registerId,registerName,status,registerEmail,registerTel,registerReporter;
    $("#usersList tr").each(function(){
        if($(this).hasClass('tr-dark')) {
             registerId = $(this).children("td").eq(0).html();
             registerName = $(this).children("td").eq(1).html();
             status = $(this).children("td").eq(2).html();
             registerEmail = $(this).children("td").eq(4).html();
             registerTel = $(this).children("td").eq(5).html();
             registerReporter = $(this).children("td").eq(3).html();
             len++;
        }

    })
    if(len==1){
        //弹出窗
        imeWeb.createChildPageHasId("systemTools/pageCreateUser","page-content-base","page-content-createUser","userUpdate-btn");
        $("#registerId").val(registerId );
        $("#registerName").val(registerName );
        $("#registerEmail").val(registerEmail );
        $("#registerTel").val(registerTel );
        $("#registerReporter ").val(registerReporter  );
        //id设置为只读事件
        $("#registerId").attr("readonly","readonly");
        //单选按钮
        if(status=="active"||status=="启用"){
            $("#userStatus_1").prop("checked",true);
        }else{

            $("#userStatus_2").prop("checked",true);
        }
        //将密码隐藏
        $(".needToHide").hide();
    }else{
        msgFail("#user_ListAlert","必须选择一条要修改的信息");
    }
})
/*usersList双击事件*/
$(document).on("dblclick","#usersList tr:not(tr:eq(0))",function(){
    var registerId =  $(this).children("td").eq(0).html();
    var registerName =  $(this).children("td").eq(1).html();
    var status =  $(this).children("td").eq(2).html();
    var registerEmail = $(this).children("td").eq(4).html();
    var registerTel = $(this).children("td").eq(5).html();
    var registerReporter = $(this).children("td").eq(3).html();

    //alert(status);

    //弹出窗
    imeWeb.createChildPageHasId("systemTools/pageCreateUser","page-content-base","page-content-createUser","userUpdate-btn");
    $("#registerId").val(registerId );
    $("#registerName").val(registerName );
    $("#registerEmail").val(registerEmail );
    $("#registerTel").val(registerTel );
    $("#registerReporter ").val(registerReporter  );
    //id设置为只读事件
    $("#registerId").attr("readonly","readonly");
    //单选按钮
    if(status=="active"){
        $("#userStatus_1").prop("checked",true);
    }else{

        $("#userStatus_2").prop("checked",true);
    }
    //将密码隐藏
    $(".needToHide").hide();
});

/*usersList点击事件*/
$(document).on("click","#usersList tr:not(tr:eq(0))",function() {
    $(this).addClass('tr-dark').siblings().removeClass('tr-dark');
    $(this).children('td:eq(0)').removeClass('sorting_1');
})



//选择汇报人事件
$(document).on("click","#userSelect_reporter",function(){
    imeWeb.createChildPageHasId("systemTools/pageSearchUser","page-content-createUser","page-content-searchUser","searchUser_btn");
})

//用户搜索
var searchUser = function(){
    var url = "/imeWeb//Services/principal/searchPrincipal";
    var type = "Users";
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
            refreshbutton:$('#searchUser'),
            refresharea:$('.refresh_area'),
            clickfunction:searchUser
        },
        success:function(data,textstatus){
            $("#user_list").dataTable({
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

$(document).on("click","#searchUser",function(){
    searchUser();
})

$(document).on("click","#searchUser_btn",function(){

        var len = 0;
        var param="";
        $("[name = item]:checkbox").each(function() {
            if (this.checked) {
                param = $(this).parents("td").parents("tr").children().eq(2).html();
                len++;
            }
        })
        if(len==0){
            msgFail("#user_searchUserListAlert","必须选择一个对象!");
        }else{
            //关闭窗口
          imeWeb.closeChildPage();
            $("#registerReporter").val(param);
        }


})


/*成员内添加组*/
$(document).on("click","#userAddGroup",function() {
    imeWeb.createChildPage("systemTools/pageSearchGroup","page-content-createUser","page-content-userSearchGroup");
});


/*组内成员添加按钮*/
$(document).on("click","#page-content-userSearchGroup",function() {
    //如果被选中则添加
    var len = 0;
    var param="";
    $("[name = item]:checkbox").each(function(){
        if(this.checked) {
            len++;
            //获取到提交参数
            var id = $(this).val();
            var param1=$(this).parents("td").parents("tr").children().eq(1).html();
            var param2=$(this).parents("td").parents("tr").children().eq(2).html();
            var param3=$(this).parents("td").parents("tr").children().eq(3).html();
            //放入到字符串中
            param = param+'<tr><td><label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" class="checkboxes" name="item" value='+id+'><span></span></label></td><td>'
                +param1+'</td> <td>'+param2+'</td><td>启用</td><td>'+param3+'</td></tr>';

        }

    });
    imeWeb.closeChildPage();
    $("#userGroupList").append(param);
    //去除重复的行
    var res = [];
    $("#userGroupList input[name = item]:checkbox").each(function(){
        //不存在
        if(res.indexOf($(this).val())==-1){
            res.push($(this).val());
        }else{
            $(this).parents("td").parents("tr").remove();
        }
    })
})


/*删除组内成员按钮*/
$(document).on("click","#userDeleteGroup",function() {
    $("input[name = item]:checkbox").each(function() {
        if(this.checked) {
            $(this).parents("td").parents("tr").remove();
        }
    })
})
/* 保存按钮*/
$(document).on("click","#userCreate-btn",function() {
       var url = g_url_createUser;
    userCreateOrUpdate(url);
})

/*更新保存按钮*/
$(document).on("click","#userUpdate-btn",function() {
   var url = g_url_saveUser;
    userCreateOrUpdate(url);
})
  /*更新或者创建函数*/
var userCreateOrUpdate = function(url){
    //获取成员组Id
    var groups = '';
    $("#userGroupList [name = item]:checkbox").each(function(){
        var oid = $(this).val();
        var id = oid.split(":")[1];
        groups= ";"+id+";"+groups;
    })
    //alert(groups);
    //获取成员信息
    var principalId = $('#registerId').val();
    var userInfo_name = $('#registerName').val();
    var UserInfo_password = $('#registerPwd').val();
    var password = $("#registerCheckPwd").val();
    var UserInfo_email = $('#registerEmail').val();
    var UserInfo_tel = $('#registerTel').val();
    var UserInfo_reportTo = $('#registerReporter').val();
    var UserInfo_status = $("input[name = optionsRadios]:checked").val();
    //更新数据库
    $.ajax({
        url: url,
        type: "POST",
        data: {
            'groups':groups,
            'principalId':principalId,
            'userInfo_name':userInfo_name,
            'UserInfo_password':UserInfo_password,
            'password':password,
            'UserInfo_email':UserInfo_email,
            'UserInfo_tel':UserInfo_tel,
            'UserInfo_reportTo':UserInfo_reportTo,
            'UserInfo_status':UserInfo_status
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
                msgSuccess("#user_createListAlert",res.msg);
                $('#nav_tab3').addClass('active');
                $('#nav_tab2').removeClass('active');
                setTimeout('imeWeb.deleteChildPage()',1000);
            }else{
                msgFail("#user_createListAlert",res.msg);
            }

        }
    });
}
/*解锁用户*/
$(document).on("click","#unlockUser",function() {
    var len = 0;
    var principalId ='';
    var status = '';
    $("#usersList tr").each(function(){
        if($(this).hasClass('tr-dark')) {
            principalId = $(this).children("td").eq(0).html();
            status = $(this).children("td").eq(2).html();
            len++;
        }
    })
    //alert(status);
    if(len==1){
           if(status=="锁定"||status=="lock"){
               layer.confirm('确认要解锁吗？',{icon:5,title:false},
                   function(index) {
                       $.ajax({
                           url:g_url_adminUnlockAccount,
                           type: "GET",
                           data: {
                               'principalId':principalId
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
                                   msgSuccess("#user_ListAlert",res.msg);
                               }else{
                                   msgFail("#user_ListAlert",res.msg);
                               }
                           }
                       });

                       layer.closeAll('dialog');

                   })
           }else{
               msgFail("#user_ListAlert","该用户无需解锁");
           }
    }else{
        msgFail("#user_ListAlert","必须选择一条要解锁的用户");
    }
})

 /* 重置密码*/
$(document).on("click","#resetPasswordUser",function() {
    var len = 0;
    var principalId ='';
    $("#usersList tr").each(function(){
        if($(this).hasClass('tr-dark')) {
            principalId = $(this).children("td").eq(0).html();
            len++;
        }
    })
    if(len==1){
        layer.confirm('确认要重置吗？',{icon:5,title:false},
            function(index) {
                $.ajax({
                    url:g_url_adminResetPassword,
                    type: "GET",
                    data: {
                        'principalId':principalId
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
                            msgSuccess("#user_ListAlert",res.msg);
                        }else{
                            msgFail("#user_ListAlert",res.msg);
                        }
                    }
                });

                layer.closeAll('dialog');

            })
    }else{
        msgFail("#user_ListAlert","必须选择一条要重置的信息");
    }


})