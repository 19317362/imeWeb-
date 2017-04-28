/**
 * Created by mashroom on 17/3/13.
 */
var  pageGroupManagement =  pageGroupManagement  || {};

pageGroupManagement.init = function(){
    imeWeb.initPageBox();
    pageCommon.init();
    $('.page-content-wrapper').prepend(Handlebars.templates['systemTools/pageGroupManagement']([1]));
    imeWeb.i18n.init();
}

$(document).ready(function() {

    //表格取到空数据报错处理
    $.fn.dataTable.ext.errMode = function(s,h,m){};

    //查询函数
    var check_group = function(a,b){
        var url =g_url_searchGroups;
        $.getJSON(url,{ groupId: a, groupName:b },function(data){

            $("#group_one").dataTable({
                searching:false, //去掉搜索框
                bLengthChange:false,//去掉每页多少条框体
                "language": {
                    "info": "显示 _START_ 到 _END_ 条,总共 _TOTAL_ 条", // 表格左下角显示的文字
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
        });
    }
    //表格初始化
    check_group('','');
    //查询按钮
    $("#check_group").click(function(){
        var groupId = $("#groupId").val();
        var groupName = $("#groupName").val();
        check_group(groupId,groupName);
    })

    //删除按钮

    $("#deleteGroup").click(function(){
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
            layer.msg('请选择要删除对象');
        }else{

            //alert(principalId +" " +oIdRecords);
            layer.confirm('确认要删除吗？',{icon:5,title:false},
                function(index) {
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
                            //释放
                            principalId="";
                            oIdRecords="";
                            var success = data.split(':')[1].split('}')[0];
                            if (success == "true") {
                                layerMsg('删除成功!');
                                location.reload();
                            }
                            else {
                                layerMsg('组下存在人员，不能删除');
                            }

                        }
                    });

                    layer.closeAll('dialog');

                })
        }

    });

//modal close
    $("#myModal .close").click(function(){
        //modal框初始化
        ($("#myModalGroupForm"))[0].reset();
        $("#memberId").attr("readonly",false);
        $('#tab2').removeClass('active');
        $('#tab1').addClass('active');
        $('#nav_tab1').removeClass('done').addClass('active');
        $('#nav_tab2').removeClass('active').removeClass('done');
        //内容初始化
        $("#tbMain").empty();
    })
//    创建中的下一步
    $('button.next-btn').click(function(){
        if($("#memberId").val()==""||$("#name").val()==""){
            layer.msg('ID跟名称都必须填写');
        }else {
            $('#tab1').removeClass('active');
            $('#tab2').addClass('active');
            $('#nav_tab1').removeClass('active').addClass('done');
            $('#nav_tab2').removeClass('done').addClass('active');
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
                            layerMsg('组已存在，请重新创建');
                            $('#tab2').removeClass('active');
                            $('#tab1').addClass('active');
                            $('#nav_tab1').removeClass('done').addClass('active');
                            $('#nav_tab2').removeClass('active').removeClass('done');
                        }

                    }
                });

            }
        }
    });

//      上一步
    $('.up-btn').click(function(){
        $('#tab2').removeClass('active');
        $('#tab1').addClass('active');
        $('#nav_tab1').removeClass('done').addClass('active');
        $('#nav_tab2').removeClass('active').addClass('done');
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
    $(".saveGroupMem").click(function(){
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
                var success = data.split(':')[1].split('}')[0];
                if (success == "true") {
                    layerMsg('操作成功!');
                    $("#myModal").modal('hide');
                    location.reload();
                }
                else {
                    layerMsg('操作失败');
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
        $("#memberId").val(memberId );
        $("#name").val(name );
        $("#desc").val(desc );
        //模态窗弹出
        $("#myModal").modal('show');
        //id设置为只读事件
        $("#memberId").attr("readonly","readonly");
    });

/*弹出框内容加载插件*/
    var layerContent  = function(url){
        layer.open({
            type: 2,
            title: '美嘉林',
            maxmin: true,
            shadeClose: true, //点击遮罩关闭层
            area : ['80%' , '70%'],
            content: url,
            skin: 'layui-layer-molv',
            shade: [0.8, '#393D49'],
            zIndex: layer.zIndex, //重点1
            success: function(layero,index){
                layer.setTop(layero); //重点2
                layer.iframeAuto(index);
            }

        });


    }

//添加组按钮
    $("#addMemberToGroup").click(function(){
        //var url = "/imeWeb/searchGroup.html";
        var url = " /imeWeb/SearchGroup";
        layerContent(url);
    })

//添加成员按钮
    $("#addMem").click(function(){
        //var url = "searchMember.html";
        var url = " /imeWeb/SearchMember";
        layerContent(url);
    })

//删除人员
    $("#deleteMem").click(function(){
        $("input[name = item]:checkbox").each(function() {
            if(this.checked) {
                $(this).parents("td").parents("tr").remove();
            }
        })
    })

});
//加载页面内容写出ready事件
//下拉框change事件
$(document).on("click","ul.dropdown-menu li",function(){
    var str = $(this).text();
    //javascript 没有replaceAll（）这个方法，只有replace();
    var re = str.replace(/\s+/g,"");//删除所有空格;
    $("input#input").val(re);

});
//定义ajax中的弹出框方法
var layerMsg = function(msg){
    layer.open({
        type: 1 //Page层类型
        ,anim: 1 //0-6的动画形式，-1不开启
        ,content: '<div style="padding:100px;">'+msg+'</div>'
        ,skin: 'layui-layer-molv'
        ,shade: [0.8, '#393D49']
        ,btn:[],yes:function(index ,layero){
            var closeLayer = function(){
                var pIndex = parent.layer.getFrameIndex(window.name);
                parent.layer.close(pIndex); //执行关闭
                layer.close(index);
            }
            setTimeout("closeLayer()", 2000);
        }
    });
}
//特定选择框
$(document).on("click",".item_check_one",function(){
    //当是选中状态
    if(this.checked){
        $("#tbMain input[name = item]:checkbox").each(function(){
            $(this).prop("checked", true);
        });
    }
    //当不是选中状态,取消全部选中
    else{
        $("#tbMain input[name = item]:checkbox").each(function(){
            $(this).prop("checked", false);
        });
    }
})
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
$(document).on("click","#searchGroup",function(){
    var url = "/imeWeb//Services/principal/searchPrincipal";
    var type = "Groups";
    var principalId=$("#principalId").val();
    var name=$("#name").val();
    //alert(principalId+name);
    //获取成员数据
    $.getJSON(url,{ type:type, principalId:principalId,name:name,pool:"ALL" },function(data){
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
    });
})
//添加已有组事件
$(document).on("click","#addGroup",function(){
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
        layer.msg('请选择添加对象');
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
                    layerMsg('添加成功!');
                    parent.location.reload();
                }
                else {
                    alert('添加失败');

                }

            }
        });
    }


})

//成员搜索方法
var search = function(type,principalId,name,pool,url){
    $.getJSON(url,{type:type, principalId:principalId,name:name,pool:pool },function(data){
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
    });
}

//使用成员搜索方法
var check = function(){
    var url = "/imeWeb//Services/principal/searchPrincipal";
    var type = $("#input").val();
    var principalId=$("#principalId").val();
    var name=$("#name").val();
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
    var pIndex = parent.layer.getFrameIndex(window.name);
    parent.layer.close(pIndex); //执行关闭
    $("#tbMain",parent.document).append(param);

    //去除重复的行
    var res = [];
    $("#tbMain input[name = item]:checkbox",parent.document).each(function(){
        //不存在
        if(res.indexOf($(this).val())==-1){
            res.push($(this).val());
        }else{
            $(this).parents("td").parents("tr").remove();
        }
    })

})