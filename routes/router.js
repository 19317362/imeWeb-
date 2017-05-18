
var login=require('./login');//导航
var nav=require('./nav');//导航
var index=require('./index');//首页

var getloginUser=require('./pagecommon/getloginUser');//顶部登录
var topMenuTools=require('./pagecommon/topMenuTools');//
var systemTools=require('./pagecommon/systemTools');//管理工具
var containerGroup=require('./pagecommon/containerGroup');//存储库

var ditaBookShowInit=require('./ditaBookShowInit');//首页关注的文档
var taskEasyPieChartsInit=require('./taskEasyPieChartsInit');//任务列表
var myOriginate_ReceiveTaskInit=require('./myOriginate_ReceiveTaskInit');//发起任务，接收任务
var FavoriteItems=require('./FavoriteItems');//收藏列表
var i18n=require('./i18n');//资源文件
var stationPublishEvents=require('./stationPublishEvents');//站点事件
var CheckoutListInit=require('./CheckoutListInit');//最近检出
var VisitedItemsInit=require('./VisitedItemsInit');//最近f访问

var management=require('./managetools/management');//组管理
var deskdoc=require('./managetools/deskdoc');//桌面文档
var containerManagement=require('./managetools/containerManagement');//存储库管理
var workflowManagement=require('./managetools/workflowManagement');//工作流管理
var queueManagement=require('./managetools/queueManagement');//队列流管理
var reportChart=require('./managetools/reportChart');//报表管理

module.exports=function(app){
   app.use(login);
   app.use(nav);
   app.use(index);
   app.use(getloginUser);
   app.use( topMenuTools)
   app.use(systemTools)
   app.use(containerGroup)

   app.use(stationPublishEvents);
   app.use(i18n);
   app.use(ditaBookShowInit);
   app.use(taskEasyPieChartsInit);
   app.use(myOriginate_ReceiveTaskInit);
   app.use(FavoriteItems);
   app.use(CheckoutListInit);
   app.use(VisitedItemsInit);
   app.use(management);
   app.use(deskdoc);
   app.use(containerManagement);
   app.use(workflowManagement);
   app.use(queueManagement);
   app.use(reportChart);
}






