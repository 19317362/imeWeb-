/**
 * Created by mashroom on 17/4/14.
 */
var  pageTask=  pageTask || {};

pageTask.init = function(docInfo){
    try{
        imeWeb.initPageBox("task/taskContainer",[1]);
        pageTask.dataInit(JSON.parse($.cookie("task_docInfo")));
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }
}

/*页面重写*/
pageTask.dataInit = function(docInfo){
    pageTask.tableInit(docInfo.view);
    pageTask.routesInit(docInfo.routes);
    /*日期插件*/
    $('.date-picker').datepicker({
        format: 'yyyy/mm/dd',
        orientation: 'bottom'
    });
    //pageTask.datatableData();
}

/*表单加载*/
pageTask.tableInit=function(view){
    //表格取到空数据报错处理
    $.fn.dataTable.ext.errMode = function(s,h,m){};
    var view = view;
    var status = "open";
    var obj = $("#refresh_task");
    check_task(status,view,obj);
}


//task表格函数
var check_task = function(status,view,obj){
    var url =g_url_queryMyTasks;
    $.ajax({
        url:url,
        async:true,
        data: {
            'status':status,
            'view':view,
            "_dc": new Date().getTime(),
            "start": "0",
            "limit": "25",
            "page": "1",
            'sort':'[{"property":"assignTime","direction":"DESC"}]'
        },
        context:{
            refreshbutton:obj,
            refresharea:$('.refresh_area')
            //clickfunction:pageTask.tableInit
        },
        success:function(data,textstatus){
            $("#task_baseList").dataTable({
                searching:false, //去掉搜索框
                bLengthChange:false,//去掉每页多少条框体
                "language": {
                    "url": 'i18n/datatable_'+ $.cookie("appLanguage") +'.json'
                },
                destroy:true,
                "pageLength":25,
                "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
                "order": [[ 8, "desc" ]],
                createdRow: function (row, data, dataIndex) {
                    $(row).attr({"assignmentId": data.id,"pboId": data.pboId,"processId":data.processId,"updateRoles":data.updateRoles});
                },
                data : data.records,
                "columns": [
                    {data: "pboId",
                        "createdCell": function (nTd, sData, oData, iRow, iCol){
                            $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' >" +
                                "<input type='checkbox' class='checkboxes' name='item' value="+ sData+"  /><span></span></label>");
                        }

                    },
                    {data: "instancy",
                        "createdCell": function (nTd, sData, oData, iRow, iCol){
                            $(nTd).css({
                                'max-width' : '50px',
                                'text-align': 'center'

                            })
                        }
                    },
                    {data: "softtype"},
                    {data: "name"},
                    {data: "theme",
                        "createdCell": function (nTd, sData, oData, iRow, iCol){
                                $(nTd).css({
                                    'max-width' : '180px',
                                    'text-overflow' :'ellipsis',
                                    'overflow' : 'hidden'
                                })
                        }
                    },
                    {data: "softtype"},
                    {data: "assigner"},
                    {data: "assigner"},
                    {data: "created",
                        "createdCell": function (nTd, sData, oData, iRow, iCol){
                            $(nTd).html('<div class="modifiedBox" style="position:relative;"> <div class="actionTools" load="0"></div>' +
                                ' <div class="floatTools toolShow" load="0" ><i class="fa fa-list toolsMore" title="more" ></i></div> <div class="modifiedDate">'+sData+'</div></div>');
                        }
                    },
                    {data: "deadline"},
                    {data: "taskStatus"},
                    {data: ""}
                ],
                responsive: {
                    responsive: true,
                    details: {
                        renderer: function (api, rowIdx, columns,row) {
                            var trNode = $('#task_baseList  tbody > tr[role="row"]').eq(rowIdx);
                            var oid = trNode.find('> td:first input').attr("value");
                            var obj = $('#task_baseList tbody > tr[role="row"]').eq(rowIdx).children();
                            var docInfo = imeWeb.queryDocInfo(oid);
                            var childrenTabData = [];
                            childrenTabData[0] = {"title":"<font key='i18n.name'>名称</font>","data":obj.eq(3).html()};
                            childrenTabData[1] = {"title":"<font key='i18n.version'>文档对象</font>","data":docInfo.name};
                            childrenTabData[2] = {"title":"<font key='i18n.softtype'>工作负责人</font>","data":docInfo.creatorName};
                            childrenTabData[3] = {"title":"<font key='i18n.created'>类型</font>","data":docInfo.softtypeTitle};
                            childrenTabData[4] = {"title":"<font key='i18n.number'>创建时间</font>","data":docInfo.created};
                            childrenTabData[5] = {"title":"<font key='i18n.checkoutStatus'>修改时间</font>","data":docInfo.modified};
                            childrenTabData[6] = {"title":"<font key='i18n.container'>截止日期</font>","data":obj.eq(9).html()};

                            var id = $('#task_baseList  tbody > tr[role="row"]').eq(rowIdx).attr("assignmentid");
                            var pboId = $('#task_baseList  tbody > tr[role="row"]').eq(rowIdx).attr("pboid");
                            var processId = $('#task_baseList  tbody > tr[role="row"]').eq(rowIdx).attr("processId");
                            $.cookie("task_pboId",pboId,{ expires: 1 });
                            $.cookie("task_processId",processId,{ expires: 1 });
                             pageTask.queryTaskPages(trNode,oid,id);
                            //console.log(btn);
                            var tab = Handlebars.templates['task/childTableTab']([{'data':childrenTabData}]);
                            //加载模板
                            return tab ?
                                $(tab).append() :
                                false;
                        }
                    }

                },
                buttons: [],
                "fnDrawCallback": function(){
                    imeWeb.i18n.init();
                },
                "fnInitComplete": function(){
                    $('td[tabindex="0"]').click(function(){
                        $(this).parent().siblings(".parent").children('td[tabindex="0"]').click();
                        // $("html,body").animate({scrollTop:$(this).offset().top - 100},0);
                        imeWeb.i18n.init();
                    });
                }
            });

            //$(document).on('click','#task_baseList td[tabindex="0"]',function(){
            //
            //})

        }
    });
}

/* 面包屑导航加载*/
pageTask.routesInit  = function(routes){
    for(var i = routes.length-1; i >= 0; i--){
        if( i == 1){
            $('.page-task.page-breadcrumb.breadcrumb').html('<li><span class="active">'+ routes[i] +'</span><i class="fa fa-circle"></i></li>');
        } else if( i == 0){
            $('.page-task.page-breadcrumb.breadcrumb').append('<li><span class="active">'+ routes[i] +'</span></li>');
        }
    }

}
/*刷新按钮*/
$(document).on('click',"#refresh_task",function(){
    var docInfo =JSON.parse($.cookie("task_docInfo"));
    pageTask.init(docInfo);
});

/*单击表格事件*/
$(document).on("click","#task_baseList tr:not(tr:eq(0))",function() {
    $(this).addClass('tr-dark').siblings().removeClass('tr-dark');
    $(this).children('td:eq(8)').removeClass('sorting_1');
    var checkBox =  $(this).find("td:first input");
    $(checkBox).prop("checked",!checkBox.prop("checked"));
})

/* 表格每一行双击打开详细子表格 */
$(document).on("dblclick","#task_baseList  tbody tr",function(){
    $(this).find('td:first').click();
});
/* 每次打开子表格都加载一次语言*/
$(document).on("click","#task_baseList td[tabindex='0']",function(){
    imeWeb.i18n.init();
});

/* 浮动工具 */
$(document).on("click","#repository .modifiedBox .floatTools i",function(){
    var oid = $(this).parents("td").siblings("[tabindex='0']").find("input").attr("value");
    if($(this).hasClass("openInImeEditor")){
        pageEditor.init(oid);
    }
    if($(this).hasClass("checkoutToEdit")){
        var checkOutInfo = imeWeb.checkOut(oid);
        if(checkOutInfo.success == "true"){
            pageEditor.init(oid);
        }else{
            toastr["error"]("检出失败,不能编辑", "收藏文档编辑");
        }
    }
    if($(this).hasClass("toolsMore")){

    }
});

/* 动态加载浮动菜单和Actions */
$(document).on("mouseover mouseout","#task_baseList tbody tr",function(event){
    if(event.type == "mouseover"){
        if($(this).find(".floatTools").attr("load") == "0" ){
            $(this).find(".floatTools").attr("load","1");
            imeWeb.getFloatMenuByOid($(this),$(this).find("td:first input").attr("value"));
        }
        // if($(this).attr("actionsLoad") == undefined ){
        //     $(this).attr("actionsLoad","1");
        //     imeWeb.getActionsByOid($(this),$(this).find("td:first input").attr("value"));
        // }
    }
})

/* 浮动工具 */
//$(document).on("click","#task_baseList .modifiedBox .floatTools i",function(){
//    var oid = $(this).parents("td").siblings("[tabindex='0']").find("input").attr("value");
//    //alert(oid);
//    if(this.title="openInImeEditor"){
//        pageEditor.init(oid);
//    }
//    if(this.title="checkoutToEdit"){
//        var checkOutInfo = imeWeb.checkOut(oid);
//        if(checkOutInfo.success == "true"){
//            pageEditor.init(oid);
//        }else{
//            toastr["error"]("检出失败,不能编辑", "收藏文档编辑");
//        }
//    }
//    if($(this).hasClass("toolsMore")){
//
//    }
//});

/* 通过oid获取按钮 */
pageTask.queryTaskPages = function(node,oid,assignmentId){
    $.ajax({
        url: g_url_taskinfoPages,
        type: 'get',
        async: true,
        data: {
            "oid": oid,
            "assignmentId":assignmentId,
            "_dc": new Date().getTime(),
        },
        success:function(data,textStatus){
            var html = '';
                $.each(data.actions,function(index,element){
                    html += '<i class="'+ element.image +'" title="'+ element.title +'" url="'+ element.url +'" type="'+ element.type +'"></i>'
                });
                //动态加载子表格工具栏
                //console.log(node);
                if(node.hasClass("parent")){
                    if(node.next().hasClass("child")){
                        node.next().find('.actionTools').css('display','block').css('position','relative').css('background','none').html(html);
                    }
                }
        }
    });

};


/* 对工具栏按钮动态执行相应方法 */
$(document).on("click",".actionTools > i,.floatTools > i",function(){
    var node = $(this);
    var oid = node.parent().attr("oid");
    if( node.attr("type") == "jsFunction" ){
        eval(node.attr("url") + '(\"' + oid + '\")');
    }

});


$(document).on("click","#task_baseList tbody tr .toolsMore",function(){
    var node = $(this).parents(".modifiedBox");
    var trNode =  $(this).parents('#task_baseList tbody tr');

    //把其余行的工具栏关闭
    var otherTrNode = $('#task_baseList tbody tr').not(trNode);
    otherTrNode.find(".floatTools").addClass("toolShow");
    otherTrNode.find(".actionTools").removeClass("toolShow");

    //点击的行数据工具栏切换
    node.find(".floatTools").toggleClass("toolShow");
    node.find(".actionTools").toggleClass("toolShow");

    //请求获取actions
    if(node.find(".actionTools").attr("load") == "0" ){
        node.find(".actionTools").attr("load","1");
        //显示加载动画
        node.find(".actionTools").html('<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
        imeWeb.getActionsByOid(trNode,trNode.find("td:first input").attr("value"));
    }

});

$(document).on("click","#task_baseList tbody tr .toolsLess",function(){
    var node = $(this).parents(".modifiedBox");
    node.find(".actionTools").toggleClass("toolShow");
    node.find(".floatTools").toggleClass("toolShow");
});

/*打开重新分配任务页面*/
$(document).on('click',".actionTools i[title='reassignTask']",function(){
    imeWeb.createChildPageHasId("task/ReassignTask","page-content-base","page-content-ReassignTask","ReassignTask");
    })


$(document).on('click',"#check_taskSearchBtn",function(){
    //获取参数
    var url = g_url_queryUsersByDocid ;
    var principalId = $("#task_id").val();
    var name = $("#task_username").val();
    var pboId = "BI:com.imecms.part.Part:18";
    //var pboId = $.cookie("task_pboId");
    pageTask.queryUsersByDocid(url,principalId,name,pboId);
})

/*获取重新指派任务人员*/
 pageTask.queryUsersByDocid = function(url,principalId,name,pboId){
     $.ajax({
         url: url,
         async: true,
         data: {
             'principalId': principalId,
             'name': name,
             'pboId': pboId,
             "_dc": new Date().getTime(),
             "start": "0",
             "limit": "25",
             "page": "1"
         },
         context: {
             refreshbutton: $('#check_taskSearchBtn'),
             refresharea: $('.refresh_area')
             //clickfunction:pageTask.tableInit
         },
         success: function (data, textstatus) {
             $("#task_searchList").dataTable({
                 searching:false, //去掉搜索框
                 bLengthChange:false,//去掉每页多少条框体
                 "language": {
                     "url": 'i18n/datatable_'+ $.cookie("appLanguage") +'.json'
                 },
                 destroy:true,
                 "pageLength":25,
                 "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
                 "order": [[ 0, "desc" ]],
                 data : data.records,
                 "columns": [
                     {data: "id",
                         "createdCell": function (nTd, sData, oData, iRow, iCol){
                             $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' >" +
                                 "<input type='checkbox' class='checkboxes' name='item' value="+ sData+"  /><span></span></label>");
                         }

                     },
                     {data: "name"},
                     {data: "principalId"},
                     {data: ""},
                     {data: ""}
                 ]
             });
         }

     })
}

/*获取工作流列表*/
pageTask.queryAssignments = function(){
    $.ajax({
        url: g_url_queryAssignments,
        async: true,
        data: {
            'processId':$.cookie("task_processId"),
            "_dc": new Date().getTime(),
            "start": "0",
            "limit": "25",
            "page": "1"
        },
        context: {
            refreshbutton: $('#refresh_taskAssignmentsList'),
            refresharea: $('.refresh_childarea'),
            clickfunction:pageTask.queryAssignments
        },
        success: function (data, textstatus) {
            //console.log(data);
            //$("#taskAssignmentsList").dataTable({
            //    searching:false, //去掉搜索框
            //    bLengthChange:false,//去掉每页多少条框体
            //    "language": {
            //        "url": 'i18n/datatable_'+ $.cookie("appLanguage") +'.json'
            //    },
            //    destroy:true,
            //    "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
            //    "order": [[ 0, "desc" ]],
            //    data : data,
            //    "columns": [
            //        {data: "name"},
            //        {data: "processCreator"},
            //        {data: "status"},
            //        {data: "assignUserName"},
            //        {data: "pdateRoles"},
            //        {data: "desc"},
            //        {data: "created"}
            //    ]
            //});
            var html = '';
            $.each(data,function(i,ele){
                html = html +'<tr><td>'+ele.name+'</td><td>'+ele.processCreator+'</td><td>'+ele.status+'</td><td>'+ele.assignUserName+'</td><td>'+ele.folder+'</td><td>'+ele.desc+'</td><td>'+ele.created+'</td></tr>'
            })
            //去重
            $("#taskAssignmentsList_tbody").append(html);
            var res = [];
            $("#taskAssignmentsList_tbody tr").each(function(){
                //不存在
                if(res.indexOf($(this).find("td:first").text())==-1){
                    res.push($(this).find("td:first").text());
                }else{
                    $(this).remove();
                }
            })
        }

    })
}


$(document).on('click','#task_approvalHistoryBtn',function(){
    pageTask.queryAssignments();
})

//任务框按钮
$(document).on('click','#taskTab_nameBtn',function(){
    var updateroles = '';
    if($(this).parents(".child").hasClass("child")){
        updateroles= $($(this).parents(".child")[1]).prev().attr("updateroles");
    }
    console.log(updateroles);
    if(updateroles==''||updateroles==undefined){
        $("#task_updateRolesHead").hide();
    }else{
        $("#task_updateRolesHead").show();
        var pboId = $($(this).parents(".child")[1]).prev().find("td:first input").val();
        //获取数据
        $.ajax({
            url: g_url_queryRoles,
            type: 'get',
            async: true,
            data: {
                "pboId": pboId,
                "roles": updateroles,
                "_dc": new Date().getTime(),
                "node:":"root"

            },
            success: function (data, textStatus, request) {
                $('#task_rolesTree').html(Handlebars.templates['task/childTab_1'](data.children));
                //var zNodes = [
                //    {	name:"P-公共存储库",icon:"https://gss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/4d414a4941e4b8a85849414e2c2c.jpg",
                //        children:[
                //            {	name:"00-PublishMap"},
                //            {	name:"01-DocMap"},
                //
                //        ]
                //    },
                //    {	name:"P-公共存储库",icon:"https://gss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/4d414a4941e4b8a85849414e2c2c.jpg",
                //        children:[
                //            {	name:"00-PublishMap"},
                //            {	name:"01-DocMap"},
                //
                //        ]
                //    }
                //];
                //var zTree = [];
                //var obj = {};
                //$.each(data.children,function(i,ele){
                //    obj.name = ele.roleName;
                //    alert(ele.children);
                //    console.log(ele.children);
                //    var children = ele.children;
                //    if(children!=""){
                //        var arr = [];
                //        $.each(children,function(i,ele){
                //            var obj1 = {};
                //            obj1.name = ele.roleName;
                //            arr.push(obj1);
                //        })
                //        obj.children = arr;
                //    }
                //
                //    zTree.push(obj);
                //})
                //console.log(zTree);

            }
        });
    }
})

/*转发记录*/
$(document).on('click','#task_forwardingRecordBtn',function(){
    var oid = $.cookie("task_pboId");
    var assignmentId  =$($(this).parents(".child")[1]).prev().attr("assignmentid");
    $("#taskTab_4 .portlet-body .row").html(Handlebars.templates['task/childTab_2']([{"oid":oid,"assignmentId":assignmentId}]));
})


$(document).on('click','#task_flowBtn',function(){
    //获取数据
    var processId = $.cookie("task_processId");
    $.ajax({
        url:g_url_queryProcessXml,
        type: 'GET',
        async: true,
        data: {
            "id": processId,
            "_dc": new Date().getTime()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('连接失败！');
            alert(XMLHttpRequest);
            alert(errorThrown);

        },
        success: function (data, textStatus, request) {
            var xml = data.xmlUrl;
            showWfGrahInfo(xml);
        }
    })
})
//显示流程图函数
var showWfGrahInfo = function(xmlUrl) {
    var win = this;
    if (!mxClient.isBrowserSupported())
    {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    }
    else
    {
        var container = document.getElementById('task_4Container');
        container.innerHTML = "";
        wf_model = new mxGraphModel();
        wf_graph = new mxGraph(container, wf_model);
        mxObjectCodec.allowEval = true;
        var config = "\\imeWeb\\workFlow\\examples\\editors\\config\\wfgraph-commons.xml";
        var node = mxUtils.load(config).getDocumentElement();
        if (node != null)
        {
            // Creates a decoder for the XML data
            // and uses it to configure the editor
            var dec = new mxCodec(node.ownerDocument);
            dec.decode(node, wf_graph);

            // Resets the counters, modified state and
            // command history
        }
        var style2 = new Object();
        style2[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style2[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style2[mxConstants.STYLE_IMAGE] = 'images/ellipse.jpg';
        style2[mxConstants.STYLE_IMAGE_WIDTH] = '48';
        style2[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
        style2[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = mxConstants.NONE;
        style2[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style2[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        wf_graph.getStylesheet().putCellStyle('doubleEllipse', style2);

        var style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_IMAGE] = 'images/rect.jpg';
        //style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
        //style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = mxConstants.NONE;
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        wf_graph.getStylesheet().putCellStyle('start-s', style);
        wf_graph.getStylesheet().putCellStyle('rounded', style);

        var style1 = new Object();
        style1[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style1[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style1[mxConstants.STYLE_IMAGE] = 'images/rect-selected.jpg';
        //style1[mxConstants.STYLE_IMAGE_WIDTH] = '48';
        // style1[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
        style1[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style1[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = mxConstants.NONE;

        style1[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        //wf_graph.getStylesheet().putCellStyle('start-s', style);
        wf_graph.getStylesheet().putCellStyle('selected', style1);

        var style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_IMAGE] = 'images/robot.jpg';
        style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
        style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = mxConstants.NONE;

        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        wf_graph.getStylesheet().putCellStyle('robot', style);

        var style1 = new Object();
        style1[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style1[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style1[mxConstants.STYLE_IMAGE] = 'images/exctued.jpg';
        //style1[mxConstants.STYLE_IMAGE_WIDTH] = '48';
        // style1[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
        style1[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style1[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = mxConstants.NONE;

        style1[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_CENTER;
        //wf_graph.getStylesheet().putCellStyle('start-s', style);
        wf_graph.getStylesheet().putCellStyle('exctued', style1);


        //mouse click
        wf_graph.addListener(mxEvent.CLICK, function(sender, evt) {
            var cell = evt.getProperty('cell');
            var enc = new mxCodec();
            var node = enc.encode(cell); //解析为DOM对象时自定义属性才可以识别
            //win.showWFNode(node);
        });

        wf_graph.getModel().beginUpdate();
        var req = mxUtils.load(xmlUrl).getXml();

        var root = req.documentElement;

        var dec = new mxCodec(root.ownerDocument);
        dec.decode(root, wf_graph.getModel());

        wf_graph.getModel().endUpdate();
        wf_graph.fit();
        //     this.wf_graph = wf_graph;
        wf_graph.setEnabled(false);
        //alert(this.hasShowWFGraph);
        this.hasShowWFGraph = true;
    }
}

//对流程图按钮进行调整
$(document).on('click','#task_zoomInBtn',function(){
    wf_graph.zoomIn();
})

$(document).on('click','#task_zoomOutBtn',function(){
    wf_graph.zoomOut();
})
$(document).on('click','#task_fitBtn',function(){
    wf_graph.fit();
})