var pageHome = pageHome || {};

pageHome.init = function(){
    try{
        imeWeb.initPageBox('home/homeContainer',[1]);
        pageHome.dataInit();
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }
}

pageHome.dataInit = function(){
    pageHome.domainInfo();
    pageHome.taskEasyPieChartsInit();
    pageHome.FavoriteItemsInit();
    pageHome.CheckoutListInit();
    pageHome.VisitedItemsInit();
    pageHome.ditaBookShowInit();
    pageHome.stationPublishEvents();
    pageHome.myOriginateTaskInit();
    pageHome.myReceiveTaskInit();
    pageHome.docInfo();
    $('.easy-pie-chart-reload').click();
}


/* 我的收藏 */
pageHome.FavoriteItemsInit = function(){
      $.ajax({
        url:g_url_getFavoriteItems,
        context:{
           refreshbutton:$('.blockui_myfavotite'),
           refresharea:$('.blockui_myfavotite').parents('.portlet-title').next('.portlet-body'),
           clickfunction:pageHome.FavoriteItemsInit
        },
       success:function(data,textstatus){
        var data1=[],
        data2=[];
        $.each(data, function(index, value, array) {
            if(new RegExp("XMLDocument").test(value.oid)){
                data1.push(value);
            }
            else{
                data2.push(value);
            }
        })
        var html1=Handlebars.templates['home/favoriteItems'](data1);
        $("#favorite_structDoc .mt-comments").html(html1);
        var html2= Handlebars.templates['home/favoriteItems'](data2);
        $("#favorite_otherObj .mt-comments").html(html2);

    }});
}

/* 足迹->最近检出 */
pageHome.CheckoutListInit = function(){
    $.ajax({
        url:g_url_getCheckoutList,
        context:{
           refreshbutton:$('.blockui_footprint'),
           refresharea:$('.blockui_footprint').parents('.portlet-title').next('.portlet-body'),
           clickfunction:pageHome.CheckoutListInit
        },
    success:function(data,textstatus){
        $.each(data,function(index,value){
            var visitedDay = "";
            if(value.days == "0"){
                visitedDay = "Just now";
            }else{
                visitedDay = value.days + " days";
            }
            value.visitedDay=visitedDay
        });
        $("#CheckoutList .feeds").html(Handlebars.templates['home/checkoutlist_VisitedItems'](data));
    }});
}
/* 足迹->最近浏览 */
pageHome.VisitedItemsInit = function(){
    $.ajax({
        url:g_url_getVisitedItems,
        context:{
           refreshbutton:$('.blockui_footprint'),
           refresharea:$('.blockui_footprint').parents('.portlet-title').next('.portlet-body'),
           clickfunction:pageHome.VisitedItemsInit
        },
    success:function(data,textstatus){
          $.each(data,function(index,value){
            var visitedDay = "";
            if(value.days == "0"){
                visitedDay = "Just now";
            }else{
                visitedDay = value.days + " days";
            }
            value.visitedDay=visitedDay
        });

        $("#recentVisted .feeds").html(Handlebars.templates['home/checkoutlist_VisitedItems'](data));
    }});
}

/* 首页关注文档 */
pageHome.ditaBookShowInit = function(){
    $.ajax({
        url: g_url_getMonitorInfos,
        data:{},
        context:{
           refreshbutton:$('.blockui_documentDynamic'),
           refresharea:$('.blockui_documentDynamic').parents('.portlet-title').next('.portlet-body'),
           clickfunction:function(){
            pageHome.ditaBookShowInit();
            pageHome.docInfo()
           }
        },
        success:function(data,textstatus){
            if(data.docs.length > 0){
                $.each(data.docs,function(index,value){
                    var finishedRatio;
                    if(value.childCountNumber != "0"){
                        finishedRatio = Math.floor(Math.round( value.childFinishedCountNumber / value.childCountNumber * 100));
                    }else{
                        finishedRatio = 0;
                    }
                    value.finishedRatio = finishedRatio;
                });
                $('#ditaBookShow').html(Handlebars.templates['home/ditaBookShow'](data.docs)); 
                $('.ditaBookShowItem:first').click();
            }
        }
    });
}

/* 发起的任务 */
pageHome.myOriginateTaskInit = function(){
    $.ajax({
        url: g_url_getOriginateAssignment,
        data:{},
        context:{
           refreshbutton:$('.blockui_TaskInit'),
           refresharea:$('.blockui_TaskInit').parents('.portlet-title').next('.portlet-body'),
           clickfunction:pageHome.myOriginateTaskInit
        },
        success:function(data,textstatus){
            var tab_originate_task =$('#tab_actions_originate_task .mt-actions');

            tab_originate_task.html(Handlebars.templates['home/myOriginateTask'](data.myOriginateTask));
        }
    });
}
/* 接收的任务 */
pageHome.myReceiveTaskInit = function(){
    $.ajax({
        url: g_url_queryMyTasks,
        data:{
            status: "open"
        },
        context:{
           refreshbutton:$('.blockui_TaskInit'),
           refresharea:$('.blockui_TaskInit').parents('.portlet-title').next('.portlet-body'),
           clickfunction:pageHome.myReceiveTaskInit
        },
        success:function(data,textstatus){
            $.each(data.records,function(index,value){
                value.createDate = value.created.split(" ")[0];
                value.createTime = value.created.split(" ")[1];
                value.existrejection=(Math.random())>0.5 ? true: false;
            });
            var tab_receive_task=$('#tab_actions_receive_task .mt-actions');
            tab_receive_task.html(Handlebars.templates['home/myReceiveTask'](data.records.reverse()));
        }
    });
}
/* 站点发布事件 */
pageHome.stationPublishEvents = function (){
    var timeline=$('#tab_1_1 .timeline')
    function compare(a,b){
        var date_a=new Date(Date.parse(a.actionDate.replace(/-/g, "/"))).getTime()
        var date_b=new Date(Date.parse(b.actionDate.replace(/-/g, "/"))).getTime()
        return date_b-date_a;
    }

    $.ajax({
        url:g_url_listSysLogRecord,
        data:{
            actionType: "PUBLISH"
        },
         context:{
           refreshbutton:$('.blockui_stationevents'),
           refresharea:$('.blockui_stationevents').parents('.portlet-title').next('.portlet-body'),
           clickfunction:pageHome.stationPublishEvents
        },
        success:function(data,textstatus){
            data.sort(compare)
            timeline.html(Handlebars.templates['home/publishEventTimeLineContent'](data))
        }
    })

}

$(document).on("click",".ditaBookShowItem",function(){
	$(".ditaBookShowItem").removeClass("selected");
	$(this).addClass("selected");
	var name = $(this). find(".progress-bar-font").text();
    var oid = $(this).attr("id");
    pageHome.docInfo(name,oid);
});

pageHome.docInfo = function (name,oid){
	if(typeof name !== "undefined" || typeof oid !== "undefined"){
		$('.docInfo-name').text('['+name+']');
		function getrandom(){
	        var array=[];
	        for(var i=0;i<7;i++){
	             var rand=Math.round(Math.random()*9+1);
	            array.push(rand);
	        }
	        return  array;
	    }
	    $("#sparkline_WIP").sparkline(getrandom(), {
	        type: 'bar',
	        width: '100',
	        barWidth: 10,
	        height: '55',
	        barColor: '#5c9bd1',
	        negBarColor: '#e02222'
	    });
	    $("#sparkline_PENDING").sparkline(getrandom(), {
	        type: 'bar',
	        width: '100',
	        barWidth: 10,
	        height: '55',
	        barColor: '#35aa47',
	        negBarColor: '#e02222'
	    });
	    $("#sparkline_ISSUED").sparkline(getrandom(), {
	        type: 'bar',
	        width: '100',
	        barWidth: 10,
	        height: '55',
	        barColor: '#ffb848',
	        negBarColor: '#e02222'
	    });
	}else{
	    $("#sparkline_WIP").sparkline([0,0,0,0,0,0,0], {
	        type: 'bar',
	        width: '100',
	        barWidth: 10,
	        height: '55',
	        barColor: '#5c9bd1',
	        negBarColor: '#e02222'
	    });
	    $("#sparkline_PENDING").sparkline([0,0,0,0,0,0,0], {
	        type: 'bar',
	        width: '100',
	        barWidth: 10,
	        height: '55',
	        barColor: '#35aa47',
	        negBarColor: '#e02222'
	    });
	    $("#sparkline_ISSUED").sparkline([0,0,0,0,0,0,0], {
	        type: 'bar',
	        width: '100',
	        barWidth: 10,
	        height: '55',
	        barColor: '#ffb848',
	        negBarColor: '#e02222'
	    });
	}
    
}
/* 任务统计*/
pageHome.taskEasyPieChartsInit = function(){
    if (!jQuery().easyPieChart) {
        return;
    }

    $('.easy-pie-chart .number.overdueTask').easyPieChart({
        animate: 1000,
        size: 75,
        lineWidth: 3,
        barColor: App.getBrandColor('yellow')
    });

    $('.easy-pie-chart .number.activeTask').easyPieChart({
        animate: 1000,
        size: 75,
        lineWidth: 3,
        barColor: App.getBrandColor('green')
    });

    $('.easy-pie-chart .number.emergencyTask').easyPieChart({
        animate: 1000,
        size: 75,
        lineWidth: 3,
        barColor: App.getBrandColor('red')
    });

    $('.easy-pie-chart-reload').click(function () {
        var baseTaskNumber;
        var emergencyTaskNumber;
        var activeTaskNumber;
        var overdueTaskNumber;
        $.ajax({
            url:g_url_queryMyTasksNumber,context:{
                refreshbutton:$('.easy-pie-chart-reload'),
                refresharea:$('.easy-pie-chart-reload').parents('.portlet-title').next('.portlet-body'),
                clickfunction:pageHome.taskEasyPieChartsInit

            }}
            ).done(function(data){

            baseTaskNumber =  parseInt(data.receiveTask.allwork);
            emergencyTaskNumber = parseInt(data.receiveTask.jjwork);
            activeTaskNumber = parseInt(data.receiveTask.cjwork);
            overdueTaskNumber = parseInt(data.receiveTask.deadwork);

            $('.easy-pie-chart .number.emergencyTask').each(function() {
                var newValue = Math.floor(Math.round(emergencyTaskNumber / baseTaskNumber * 100));
                $(this).data('easyPieChart').update(0);
                $(this).data('easyPieChart').update('+'+newValue);
                $('span', this).text("+"+newValue);
            });

            $('.easy-pie-chart .number.activeTask').each(function() {
                var newValue = Math.floor(Math.round(activeTaskNumber / baseTaskNumber * 100));
                $(this).data('easyPieChart').update(0);
                $(this).data('easyPieChart').update(newValue);
                $('span', this).text("+"+newValue);
            });

            $('.easy-pie-chart .number.overdueTask').each(function() {
                var newValue = Math.floor(Math.round(overdueTaskNumber / baseTaskNumber * 100));
                $(this).data('easyPieChart').update(0);
                $(this).data('easyPieChart').update(newValue);
                $('span', this).text("+"+newValue);
            });

            //侧边栏任务数量填写
            $('.page-sidebar-receive-task .exigence-task .badge').text(data.receiveTask.jjwork);
            $('.page-sidebar-receive-task .pending-task .badge').text(parseInt(data.receiveTask.jjwork) + parseInt(data.receiveTask.cjwork) + parseInt(data.receiveTask.qtwork) + parseInt(data.receiveTask.deadwork));
            $('.page-sidebar-receive-task .finished-task .badge').text(data.receiveTask.finishTaskNumber);

            $('.page-sidebar-originate-task .exigence-task .badge').text(data.originateTask.originateExigence);
            $('.page-sidebar-originate-task .pending-task .badge').text(data.originateTask.originatePending);
            $('.page-sidebar-originate-task .finished-task .badge').text(data.originateTask.originateFinish);

        });
    });
}

pageHome.domainInfo = function(){
    var domainNameNode = $("#domain_info font");
    var domainSmallNode = $("#domain_info small");

    domainNameNode.text($.cookie("domainInfo_domainname"));
    domainSmallNode.text("站点描述");
}

//我的收藏 -> 编辑
$(document).on("click","#favorite_structDoc .favorite-edit",function(){
    var docNode = $(this).parents(".favorite-item");
    var oid = docNode.attr("oid");

    pageEditor.checkoutAndOpenEditor(oid);
});

//我的收藏 -> 查看
$(document).on("click","#favorite_structDoc .favorite-show",function(){
    var docNode = $(this).parents(".favorite-item");
    var oid = docNode.attr("oid");
    
    pageEditor.openEditor(oid);
});

//我的收藏 -> 取消
$(document).on("click","#favorite_structDoc .favorite-cancel",function(){
    var docNode = $(this).parents(".favorite-item");
    var oid = docNode.attr("oid");

    imeWeb.deleteFavoriteItem(oid);
});