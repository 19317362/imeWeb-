/**
 * Created by mashroom on 17/3/21.
 */
var  pageSiteInfo =  pageSiteInfo  || {};

pageSiteInfo.init = function(){
    imeWeb.initPageBox();
    pageCommon.init();
    pageSiteInfo.content();
    imeWeb.i18n.init();

}


//注册一个helper
Handlebars.registerHelper("siteType",function(value){
    if(value == 1){
        return "启用";
    }else{
        return "不启用";
    }
})
/*定义内容方法*/
 pageSiteInfo.content  =function(){
     //获取session域
     $.getJSON(g_url_getSessionDomain,{},function(data){
         var  domainid = data.domainid;
         console.log(domainid);
         //查询站点信息
         if(domainid!=""){
             $.getJSON(g_url_getDomainByOid,{domainid:domainid},function(data){
                 console.log([data]);
                 //$('.page-content').html(myTemplate([data]));
                 $('.page-content-wrapper').prepend(Handlebars.templates['systemTools/pageSiteInfo']([data]));
             })
         }else{
             alert('获取站点失败');
         }

     })
 }

