//创建全局imeWeb变量防止命名冲突
var imeWeb = imeWeb || {};

//页面初始化方法
imeWeb.page = {
    nav:pageNav.init,
    home: pageHome.init,
    myTask: pageMyTask.init ,
	 homeDoc:pageHomeDoc.init,
    container: function(){
        alert('container');
    },
    groupManagement: pageGroupManagement.init ,
    siteInfo: pageSiteInfo.init ,
    SearchGroup: pageSearchGroup.init,
    SearchMember: pageSearchMember.init
}
//路由与页面初始化方法绑定
imeWeb.router = new Router({
    '/index.html': 'home',
    '/home': 'home',
    '/imeWeb/myTask': 'myTask',
	'/imeWeb/homeDoc':'homeDoc',
    '/imeWeb/container': 'container' ,
    '/imeWeb/groupManagement': 'groupManagement',
    '/imeWeb/siteInfo': 'siteInfo',
    '/imeWeb/SearchGroup' : 'SearchGroup',
    '/imeWeb/SearchMember' : 'SearchMember'

}, {
	scope: imeWeb.page
});

//设置全局性的Ajax配置选项
// $.ajaxSetup({
//     type: "get",
//     async: true,
//     dataType: 'json',
//     error: function(XMLHttpRequest,textStatus, errorMsg){
//         alert("请求出错啦 "+ textStatus);
//     }
// })


//针对所有的ajax设置，设置加载时动画，每个ajax加载可能需要两个显示动画，一个是本身的刷新按钮，另一个是对应的加载内容区域
//全局ajax加载设置，需要区分每一个ajax发起对象，依靠ajax的context上下文设置，在具体ajax请求里，如果有加载动画，需要绑定context参数
//context.refreshbutton对应执行刷新的按钮对象，context.refresharea对应执行内容加载的对象
(function(){
    var message='<div class="loading-message "><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>';
    var css={border:'none',backgroundColor:'transparent'};
    var overcss= { backgroundColor: '#000',opacity: 0.0,cursor: 'wait'};
    $(document).ajaxSend(function(e,xhr,setting) {
      if(setting.context){
        var context=setting.context;
        var button=context.refreshbutton[0];
        var area=context.refresharea;
        var l = Ladda.create(button);
        l.start();
        area.block({
           message:message,
           css:css,
           overlayCSS: overcss
       })
        context.l=l
        if(setting.context.clickfunction){
             if(button.hasevents) return; //解决性能
             $(button).click(function(){
                button.hasevents=true;
                setting.context.clickfunction()
            })
         }
     }
 }).ajaxSuccess(function(e,xhr,setting){

     if(setting.context){
        var context=setting.context;
        var button=context.refreshbutton[0];
        var area=context.refresharea;
        setTimeout(function(){
            context.l.stop()
            area.unblock()
        },4000)
    }
});
})()




//检查浏览器版本
imeWeb.getBrowserVersion = function(){
    var browser = {};
    var userAgent = navigator.userAgent.toLowerCase();
    var s;
    (s = userAgent.match(/msie ([\d.]+)/))? browser.ie = s[1]: (s = userAgent.match(/firefox\/([\d.]+)/))? browser.firefox = s[1]: (s = userAgent.match(/chrome\/([\d.]+)/))? browser.chrome = s[1]: (s = userAgent.match(/opera.([\d.]+)/))? browser.opera = s[1]: (s = userAgent.match(/version\/([\d.]+).*safari/))? browser.safari = s[1]:0;
    var version = "";
    if (browser.ie) {
        version = 'msie ' + browser.ie;
    } else if (browser.firefox) {
        version = 'firefox ' + browser.firefox;
    } else if (browser.chrome) {
        version = 'chrome ' + browser.chrome;
    } else if (browser.opera) {
        version = 'opera ' + browser.opera;
    } else if (browser.safari) {
        version = 'safari ' + browser.safari;
    } else {
        if(userAgent.indexOf('rv:11.0')>0){
            version = 'msie 11';
        }else{
            version = '['+userAgent+']';
        }
    }
    return version;
}

//改变URL地址
imeWeb.changeRoute = function(url){
    imeWeb.router.route(url,{trigger:true});
}

//获取当前站点和语言
imeWeb.getBrowserInfo =  function(){
    $.get(g_url_getBrowserInfo, {}, function (data, textStatus){
    	var domain = data.domain;
 		var language = data.language;
    });
}

//切换语言
imeWeb.changeLanguage = function(lang){
	$.get(g_url_changeLang, {"lang":lang}, function (data, textStatus){
 		if(data.success){

 		}
    });
}

//延迟加载js
imeWeb.loadJs = function(){
	$("#handlebar_template").load("js/template.js",{}, function(){

    });
}

//页面框架初始化
imeWeb.initPageBox = function(){
    //imeWeb.checkUser().success ===
    if( true){
        //获取语言
        // $.cookie("appLanguage", imeWeb.getBrowserInfo().language , { expires: 7 });
        // //获取登录用户的信息并存入cookie
        // var loginUserInfo = imeWeb.getLoginUser();
        // $.cookie("userInfo_id", loginUserInfo.id ,{ expires: 1 });
        // $.cookie("userInfo_image", loginUserInfo.image ,{ expires: 1 });
        // $.cookie("userInfo_name", loginUserInfo.name ,{ expires: 1 });
        // $.cookie("userInfo_usertype", loginUserInfo.usertype ,{ expires: 1 });
        // //获取当前会话的站点和定制化功能文件
        // var sessionDomainAndJsFile = imeWeb.getSessionDomainAndJsFiles();
        // if(sessionDomainAndJsFile.success === 'true'){
        //     $.cookie("domainInfo_domaincssfile", sessionDomainAndJsFile.domaincssfile ,{ expires: 1 });
        //     $.cookie("domainInfo_domainjsfile", sessionDomainAndJsFile.domainjsfile ,{ expires: 1 });
        //     $.cookie("domainInfo_domainid", sessionDomainAndJsFile.domainid ,{ expires: 1 });
        //     $.cookie("domainInfo_domainkey", sessionDomainAndJsFile.domainkey ,{ expires: 1 });
        //     $.cookie("domainInfo_domainname", sessionDomainAndJsFile.domainname ,{ expires: 1 });
        // }
        // //获取cookie里的站点并设置
        // imeWeb.setSessionDomain($.cookie('domainInfo_domainid'));

        if($(".page-content-wrapper").length <= 0){
            $('body').prepend(Handlebars.templates['common/commonFooter']([1]));
            $('body').prepend(Handlebars.templates['common/commonHeader']([1]));
            $('.page-sidebar-wrapper').prepend(Handlebars.templates['common/commonSidebar']([1]));
        }else{
            $('.page-content-wrapper').html("");
        }
    }
}

/* 登出 */
imeWeb.logout = function(){
    $.ajax({
        type: "get",
        async: false,
        url: g_url_logout,
        success:function(data,textStatus){
            if(data.success){
                window.location.href="login.html";
            }
        }
    });
}

/* 检查用户是否存在,以防止从缓存读取页面信息 */
imeWeb.checkUser = function(){
    var success;
    var principalId;
    $.ajax({
        url: g_url_check_user,
        type: 'get',
        async: false,
        success:function(data,textStatus){
            success = data.success;
            principalId = data.principalId;
        }
    });
    return {'success':success,'principalId':principalId};
}

/* 检查当前用户所在站点,以防止cookie与后台记录不一致 */
imeWeb.checkDomain = function(){
    var success;
    var principalId;
    $.ajax({
        url: g_url_check_domain,
        type: 'get',
        async: false,
        success:function(data,textStatus){
            success = data.success;
            principalId = data.principalId;
        }
    });
    return {
        'success':success,
        'principalId':principalId
    };
}

/* 获取当前会话的语言和站点 */
imeWeb.getBrowserInfo = function(){
    var language;
    var domain;
    var success;
    var msg;
    $.ajax({
        url: g_url_getBrowserInfo,
        type: 'get',
        async: false,
        success:function(data,textStatus){
            language = data.language;
            domain = data.domain;
            success = data.success;
            msg = data.msg;
        }
    });
    return {
        'language':language,
        'domain':domain,
        'success':success,
        'msg':msg
    };
}

/* 获取登陆用户信息 */
imeWeb.getLoginUser = function(){
    var name;
    var id;
    var usertype;
    var image;
    $.ajax({
        url: g_url_getLoginUser,
        type: 'get',
        async: false,
        success:function(data,textStatus){
            name = data.name;
            id = data.id;
            usertype = data.usertype;
            image = data.image;
        }
    });
    return {
        'name':name,
        'id':id,
        'usertype':usertype,
        'image':image
    };
}

/* 获取会话站点和定制化功能文件 */
imeWeb.getSessionDomainAndJsFiles = function(){
    var domaincssfile;
    var domainjsfile;
    var domainid;
    var domainkey;
    var domainname;
    var success;
    $.ajax({
        url: g_url_getSessionDomainAndJsFiles,
        type: 'get',
        async: false,
        data:{
            'type': 'imejs',
            'domainOid': ''
        },
        success:function(data,textStatus){
            domaincssfile = data.domaincssfile;
            domainjsfile = data.domainjsfile;
            domainid = data.domainid;
            domainkey = data.domainkey;
            domainname = data.domainname;
            success = data.success;
        }
    });
    return {
        'domaincssfile': domaincssfile,
        'domainjsfile': domainjsfile,
        'domainid': domainid,
        'domainkey': domainkey,
        'domainname': domainname,
        'success': success,
    };
}

/* 设置会话站点 */
imeWeb.setSessionDomain = function(_domainid){
    var domaincount;
    var domainid;
    var domainkey;
    var domainname;
    var success;
    $.ajax({
        url: g_url_setSessionDomain,
        type: 'get',
        async: false,
        data: {
            'domainid': _domainid
        },
        success:function(data,textStatus){
            domaincount = data.domaincount;
            domainid = data.domainid;
            domainkey = data.domainkey;
            domainname = data.domainname;
            success = data.success;
        }
    });
    return {
        'domaincount': domaincount,
        'domainid': domainid,
        'domainkey': domainkey,
        'domainname': domainname,
        'success': success
    };
}