var pageCommon = pageCommon || {};

pageCommon.init = function(){
	pageCommon.topMenuToolsInit();
	pageCommon.topMenuDropDownUserInit();
	pageCommon.systemToolsInit();
	pageCommon. containerGroupInit();
}

/* 顶部工具栏加载 */
pageCommon.topMenuToolsInit = function(){
    $.get(g_url_getToolButtonList,{},function (data, textStatus){
        $(".top-menu-tool-group .top-menu-tool").remove();
        $(".top-menu-tool-group").append(Handlebars.templates['common/topMenuTool'](data));
    });
}

/* 顶部用户名加载 */
pageCommon.topMenuDropDownUserInit = function(){
    $.get(g_url_getLoginUser,{},function(data,textstatus){
        $(".username").html(data.name);
        $(".username-img").attr("src","img/user-img/"+data.id+".jpg");
    });
}

/* 系统工具栏加载 */
pageCommon.systemToolsInit = function(){
    $.get(g_url_listSystemTool,{},function(data,textstatus){
        $(".system-tool").remove();
        $(".system-tools-group").after(Handlebars.templates['common/sidebarMenuSystemTool'](data.children));
    });
}

/* 侧边栏存储库列表加载 */
pageCommon. containerGroupInit = function(){
     $.get(g_url_getContainerByDomainAndUser,{},function(data){
        $(".container-item").remove();
        $(".container-group").after(Handlebars.templates['common/sidebarMenuContainer'](data));
    });
}


/* 侧边栏存储库单个存储库树列表加载 */
pageCommon.container_onclick = function(e){
    var me = $(e);
    var param = {
        "containerOid":me.attr('id'),
    };
    if(me.attr('options_loaded') == 0){
        $.get(g_url_selectFileTree,param,function(data,textstatus){
            var inner='';
            var submenu=me.children(".sub-menu");
            inner+=pageCommon.loop(data.children[0].children);
            submenu.html(inner);
            var uls=me.children('ul.sub-menu-container');
            var lis=uls.find("li");
            lis.click(function(e){
                $(this).children('a').find('span.arrow').toggleClass('open');
                var ul=$(this).children('ul');
                ul.toggleClass('show');
                return false;
            });
        });
        me.attr('options_loaded',1);
    }
}

/* 单个存储库树列表递归显示 */
pageCommon.loop = function(array){
    var inner='';
    for(var i=0;i<array.length;i++){
         var temp='<li class="nav-item  subcontainer-item"><a href class="nav-link"><span class="title" >'+array[i].filename+'</span>'
        if(array[i].children&&array[i].children.length){
            temp+='<span class="arrow"></span></a>'
            var ul='<ul class="sub-menu" style="display:none">'+pageCommon.loop(array[i].children)+'</ul>'
            temp+=ul;
        }else{
            temp+='</a>'
        }
        inner=inner+temp+'</li>'
    }
    return inner;

}

/* 侧边栏我的任务统计显示 */
pageCommon.sidebarMenuTask = function(){
    $.get(g_url_queryMyTasksNumber,{}, function (data, textStatus){
        $(".page-sidebar-receive-task .exigence-task .badge").html(data.receiveTask.jjwork);
        $(".page-sidebar-receive-task .pending-task .badge").html(data.receiveTask.allwork);
        $(".page-sidebar-receive-task .finished-task .badge").html(data.receiveTask.finishTaskNumber);
        $(".page-sidebar-originate-task .exigence-task .badge").html(data.originateTask.originateExigence);
        $(".page-sidebar-originate-task .pending-task .badge").html(data.originateTask.originatePending);
        $(".page-sidebar-originate-task .finished-task .badge").html(data.originateTask.originateFinish);           
    });
}
