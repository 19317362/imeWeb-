var pageNav = pageNav || {};

pageNav.init = function(){
    imeWeb.initPageBox();
    pageCommon.init();
    $('.page-content-wrapper').prepend(Handlebars.templates['nav/navContainer']([1]));
    imeWeb.i18n.init();
    pageNav.AllHtmlInit();
    pageNav.AllDataInit();
    pageNav.redirectAfterSeconds(20)
}

/* nav页面各个区域容器html结构初始化 */
pageNav.AllHtmlInit = function(){
    this.helpHtmlInit(); /* help区域html结构初始化 */
    this.categoryHtmlInit(); /* category区域html结构初始化 */
    //this.taskHtmlInit(); /* task区域html结构初始化 */   /* 已经绑定数据跟随数据初始化 */
    this.newbuildHtmlInit(); /* newbuild区域html结构初始化 */
    this.managementHtmlInit(); /* management区域html结构初始化 */
}

pageNav.AllDataInit = function(){
    this.taskDataInit(); /* task区域data初始化 */
}

/* help区域html结构初始化 */
pageNav.helpHtmlInit = function(){
    var help=[
    {number:1,content:'ahha',content:'创建编辑结构化手册帮助'},
    {number:2,stateColor:'active',content:'校阅发布手册帮助'},
    {number:3,stateColor:'error',content:'变更翻译处理帮助'}
    ]
    $('div.row.help .step-background-thin').html(Handlebars.templates['nav/help'](help))
}

/* category区域html结构初始化 */
pageNav.categoryHtmlInit = function(){
   var category=[
   {subject:'任务',class:'task'},
   {subject:'新建',class:'newbuild'},
   {subject:'管理',class:'management'}
   ]
   $('div.category').html(Handlebars.templates['nav/category'](category))
}

/* task区域html结构初始化 */
pageNav.taskHtmlInit = function(){
   return task=[
   {title:'写作',icon:'write',stateColor:'success',message:0},
   {title:'审阅',icon:'batchreview',stateColor:'danger',message:0},
   {title:'变更',icon:'m-InformationChanges',stateColor:'success',message:0},
   {title:'翻译',icon:'fanyi',stateColor:'warning',message:0},
   ]
}

/* task区域data数据初始化 */
pageNav.taskDataInit = function(){
    var task=this.taskHtmlInit();
    var message=[0,0,0,0];
    function fail(){
      var task=pageNav.taskHtmlInit();
      $('div.task .portlet-body .row').html(Handlebars.templates['nav/task'](task))
    }
    $.ajax({
        url: g_url_queryMyTasks,
        data:{
            status: "open"
        },
        success:function(data,textstatus){
          if(data.success==false){
            return fail()
           }
            $.each(data.records,function(index,value){
             if(new RegExp("ChangeActivity").test(value.softtype)){
                 message[2]++;
             }
             else if(new RegExp("Trans").test(value.softtype)){
                message[3]++;
            }
            else if(new RegExp("Concept").test(value.softtype)){
                message[0]++;
            }
            else{
                message[1]++
            }
        })
            task.map(function(value,index){
                value.message=message[index];
            })
            $('div.task .portlet-body .row').html(Handlebars.templates['nav/task'](task))
        },
        error:function(){
          fail();
        }
    });
}

/* newbuild区域html结构初始化 */
pageNav.newbuildHtmlInit = function(){
   var newbuild=[
   {title:'普通文档',icon:'iconwendang'},
   {title:'变更文档',icon:'iconfontcodefork'},
   {title:'结构化文档',icon:'jiegou',colClass:'col-xs-12'},
   ]
   $('div.newbuild .portlet-body .row').html(Handlebars.templates['nav/newbuild'](newbuild))
}

/* management区域html结构初始化 */
pageNav.managementHtmlInit = function(){
    var management=[
    {title:'报表',icon:'baobiao'},
    {title:'发布',icon:'fabu'},
    {title:'管理工具',icon:'weibiaoti-1-03'},
    {title:'批量导入',icon:'piliangdaoru'}
    ]
   $('div.management .portlet-body .row').html(Handlebars.templates['nav/newbuild'](management))
}

/* seconds秒后跳转到主页 */
pageNav.redirectAfterSeconds= function(seconds){

  var body=$('.page-sidebar-closed-hide-logo')
  var ul=$('.page-sidebar-menu')
  // var a=$('.sidebar-toggler');
  // a.click()
   body.addClass('page-sidebar-closed');
   ul.addClass('page-sidebar-menu-closed')
   // ul.css('class','page-sidebar-menu page-sidebar-menu-closed')
    var timestart=seconds||3;
    var count=$("#navpage span.count")
    count.html(''+timestart)
    var t=setTimeout(function T(){
        timestart--;
        count.html(''+timestart)
        if(timestart==1){
            clearTimeout(t);
            window.location="home"
            return;
        }
        setTimeout(T,1000)
    },1000)
}




