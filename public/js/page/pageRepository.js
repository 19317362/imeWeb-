var pageRepository = pageRepository || {};

pageRepository.init = function(docInfo){
    try{
        imeWeb.initPageBox('repository/repositoryContainer',[1]);
        pageRepository.dataInit(docInfo);
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }
}

pageRepository.dataInit = function(docInfo){
    pageRepository.routesInit(docInfo.routes,docInfo.folderIds);
    pageRepository.tableInit(docInfo.folderId);
}

pageRepository.routesInit = function(routes,folderIds){
    for(var i = routes.length-1; i >= 0; i--){
        if( i == routes.length-1){
            $('.page-repository .page-breadcrumb.breadcrumb').append('<li><span class="active">'+ routes[i] +'</span><i class="fa fa-circle"></i></li>');
        }else if( i == 0){
            $('.page-repository .page-breadcrumb.breadcrumb').append('<li><span class="active">'+ routes[i] +'</span></li>');
        }else{
            $('.page-repository .page-breadcrumb.breadcrumb').append('<li><a folderid="'+ folderIds[i] +'">'+ routes[i] +'</a><i class="fa fa-circle"></i></li>');
        }
    }
}

pageRepository.tableInit = function(folderId){
    imeWeb.i18n.init();
    var repositoryTable = $('#repository').dataTable({
        "ajax": {
            "url": g_url_selectFileInIme,
            "type": "get",
            "async": true,
            "data": {
                "folderid": folderId,
                "view": "ALL",
                "_dc": new Date().getTime(),
            },
            "dataSrc": "records"
        },
        "autoWidth": false,
        "serverSide": true,
        "processing": true,
        "sPaginationType": "imeStyle",
        "language": {
            "url": 'i18n/datatable_'+ $.cookie("appLanguage") +'.json'
        },
        "columns": [
            {
                "data": "oid",
                "createdCell": function (nTd, sData, oData, iRow, iCol){
                    $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' ><input type='checkbox' class='checkboxes' name='item' value="+ sData+" /><span></span></label>");
                }

            },
            {"data": "filestatus"},
            {"data": "number"},
            {"data": "name"},
            {"data": "fileico"},
            {"data": "state"},
            {"data": "version"},
            {"data": "publishResult"},
            {"data": "modifierId"},
            {"data": "softtypeTitle"},
            {
                "data": "modified",
                "createdCell": function (nTd, sData, oData, iRow, iCol){
                    $(nTd).html('<div class="modifiedBox" style="position:relative;"> <div class="actionTools" load="0"></div> <div class="floatTools toolShow" load="0" ><i class="fa fa-list toolsMore" title="more" ></i></div> <div class="modifiedDate">'+sData+'</div></div>');
                }

            },
            {"data": "" },
            {"data": "" }
        ],
        responsive: {
            responsive: true,
            details: {
                renderer: function (api, rowIdx, columns) {
                    var trNode = $('#repository tbody > tr[role="row"]').eq(rowIdx);
                    var oid = trNode.find('> td:first input').attr("value");
                    var docInfo = imeWeb.queryDocInfo(oid);
                    var childrenTabData = [];
                    childrenTabData[0] = {"title":"<font key='i18n.name'></font>","data":'<a href="jsp/util/downloadFile.jsp?oid='+docInfo.oid+'" target="_blank">'+docInfo.name+'</a>'};
                    childrenTabData[1] = {"title":"<font key='i18n.version'></font>","data":docInfo.version};
                    childrenTabData[2] = {"title":"<font key='i18n.softtype'></font>","data":docInfo.softtype};
                    childrenTabData[3] = {"title":"<font key='i18n.created'></font>","data":docInfo.created};
                    childrenTabData[4] = {"title":"<font key='i18n.number'></font>","data":docInfo.number};
                    childrenTabData[5] = {"title":"<font key='i18n.checkoutStatus'></font>","data":docInfo.checkoutStatus};
                    childrenTabData[6] = {"title":"<font key='i18n.container'></font>","data":docInfo.containerName};
                    childrenTabData[7] = {"title":"<font key='i18n.lifecycleTemplate'></font>","data":docInfo.lcName};
                    childrenTabData[8] = {"title":"<font key='i18n.context'></font>","data":docInfo.folderName};
                    childrenTabData[9] = {"title":"<font key='i18n.creator'></font>","data":docInfo.creatorName};
                    childrenTabData[10] = {"title":"<font key='i18n.lifeCycle'></font>","data":docInfo.lifecycles};

                    var actionToolsHtml = '';                   
                    actionToolsHtml = '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
                    if(trNode.find(".actionTools").attr("load") == "0" ){
                        trNode.find(".actionTools").attr("load","1");
                        //显示加载动画
                        trNode.find(".actionTools").html('<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
                        imeWeb.getActionsByOid(trNode,oid);
                    }
                    
                    var tab = Handlebars.templates['repository/childTableTab']([{actionToolsData:[{"actionToolsHtml":actionToolsHtml}],data:childrenTabData,pages:docInfo.pages}]);
                    return tab ?
                            $(tab).append() :
                            false;
                }
            }
        },
        buttons: [],
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0,1,4,7,11,12]}],
        "order": [
            [10, 'desc']
        ],
        "pageLength": 25,
        "dom": "<'row' <'col-md-12'B>><'row'r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        "fnDrawCallback": function(){
            imeWeb.i18n.init();
        },
        "fnInitComplete": function(){
            $('#repository td[tabindex="0"]').click(function(){
                $(this).parent().siblings(".parent").children('td[tabindex="0"]').click();
                // $("html,body").animate({scrollTop:$(this).offset().top - 100},0);
                imeWeb.i18n.init();
            });
        }
    });
}
/* 文件路径导航栏点击事件 */
$(document).on("click",".page-repository .page-breadcrumb a",function(){
    var folderId = $(this).attr("folderid");
    $('.page-sidebar-menu .subcontainer-item[folderid="'+ folderId +'"]').click();
});
/* 表格每一行双击打开详细子表格 */
$(document).on("dblclick","#repository tbody tr",function(){
    $(this).find('td:first').click();
});
/* 每次打开子表格都加载一次语言*/
$(document).on("click","#repository td[tabindex='0']",function(){
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
$(document).on("mouseover mouseout","#repository tbody tr",function(event){
    var trNode = $(this);
    if(event.type == "mouseover"){
        if($(this).find(".floatTools").attr("load") == "0" ){
            $(this).find(".floatTools").attr("load","1");
            imeWeb.getFloatMenuByOid(trNode,trNode.find("td:first input").attr("value"));
        }
    }
});

/* 对工具栏按钮动态执行相应方法 */
$(document).on("click",".actionTools > i,.floatTools > i",function(){
    var node = $(this);   
    var oid = node.parent().attr("oid");
    if( node.attr("type") == "jsFunction" ){
        eval(node.attr("url") + '(\"' + oid + '\")');
    }
    
});


$(document).on("click","#repository tbody tr .toolsMore",function(){
    var node = $(this).parents(".modifiedBox"); 
    var trNode =  $(this).parents('#repository tbody tr');
    
    //把其余行的工具栏关闭
    var otherTrNode = $('#repository tbody tr').not(trNode);
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


$(document).on("click","#repository tbody tr .toolsLess",function(){
    var node = $(this).parents(".modifiedBox");    
    node.find(".actionTools").toggleClass("toolShow");
    node.find(".floatTools").toggleClass("toolShow");
});
