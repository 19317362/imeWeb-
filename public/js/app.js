//创建全局imeWeb变量防止命名冲突
var imeWeb = imeWeb || {};

//页面初始化方法
imeWeb.page = {
    index:pageNav.init,  //导航
    home: pageHome.init,  //主页
    myTask: pageMyTask.init ,
	homeDoc:pageHomeDoc.init,
    docLog:pageDocumentLog.init,
    siteManagement:pageSiteManagement.init,
    translationLangManagement:pageTranslationLangManagement.init,
    repository: pageRepository.init ,
    groupManagement: pageGroupManagement.init ,
    containerManagement: pagecontainerManagement.init ,
    workflowManagement: pageWorkflowManagement.init ,
    queueManagement: pageQueueManagement.init ,
    //reportChart:pageReportchart.init,
    siteInfo: pageSiteInfo.init,
    userManagement: pageUserManagement.init,
    systemInfo: pageSystemInfo.init
};
//路由与页面初始化方法绑定
imeWeb.router = new Router({
    '/imeWeb/index.html':'index', //导航
    '/imeWeb/home': 'home',  //主页
    '/imeWeb/myTask': 'myTask',
	'/imeWeb/homeDoc':'homeDoc',
    '/imeWeb/logRecord':'docLog',
    '/imeWeb/siteManagement':'siteManagement',
    '/imeWeb/translationLangManagement':'translationLangManagement',
    '/imeWeb/repository': 'repository' ,
    '/imeWeb/groupManagement': 'groupManagement',
    '/imeWeb/containerManagement': 'containerManagement',
    '/imeWeb/workflowManagement': 'workflowManagement',
     '/imeWeb/queueManagement': 'queueManagement',
   // '/imeWeb/reportchart': 'reportChart',
    '/imeWeb/siteInfo': 'siteInfo',
    '/imeWeb/userManagement': 'userManagement',
    '/imeWeb/systemInfo' : 'systemInfo'
}, {
	scope: imeWeb.page
});

//映射局部模板
//例：Handlebars.partials['common/commonFooter'] = Handlebars.templates['common/commonFooter']
Handlebars.partials['common/protletTitleTools'] = Handlebars.templates['common/protletTitleTools'];
Handlebars.partials['editor/tabNav'] = Handlebars.templates['editor/tabNav'];
Handlebars.partials['editor/tabContent'] = Handlebars.templates['editor/tabContent'];


//设置全局性的Ajax配置选项
$.ajaxSetup({
    dataType: "json",
    complete: function(XMLHttpRequest,textStatus){
        if(XMLHttpRequest.getResponseHeader('_timeout') === "true"){
            $.confirm({
                icon: 'fa fa-warning',
                title: '警告',
                content: '会话超时',
                autoClose: 'ok|6000',
                buttons: {
                    ok: {
                        text: '确认',
                        btnClass: 'btn-blue',
                        keys: ['enter'],
                        action: function(){
                            window.location.href="login.html";
                        }
                    }
                }
            });
        }
    }
});


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
        },0)
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
};

//改变URL地址
imeWeb.changeRoute = function(url){
    imeWeb.router.route(url,{trigger:true});
    $('html, body').scrollTop(0);
};

//跳转页面前确认
window.onbeforeunload = function () {
    return '';
}

//切换语言
imeWeb.changeLanguage = function(lang){
    var changeLanguage;
    var changeLanguageSuccess;
    $.ajax({
        url: g_url_changeLang,
        type: 'get',
        async: false,
        data: {
            "lang":lang
        },
        success:function(data,textStatus,request){
            if(data.success){
                changeLanguage = lang;
                changeLanguageSuccess = data.success;
                $.cookie("appLanguage", lang, { expires: 7 });
                imeWeb.i18n.init();
                pageCommon.systemToolsInit();
            }
        }
    });
    return {
        "changeLanguage": lang,
        "success": changeLanguageSuccess
    };
};

//延迟加载js
imeWeb.loadJs = function(){
	$("#handlebar_template").load("js/template.js",{}, function(){

    });
};

//页面框架初始化
imeWeb.initPageBox = function(name,data){
    if(imeWeb.checkUser().success === true){
        //获取语言
        $.cookie("appLanguage", imeWeb.getBrowserInfo().language , { expires: 7 });
        //获取登录用户的信息并存入cookie
        var loginUserInfo = imeWeb.getLoginUser();
        $.cookie("userInfo_id", loginUserInfo.id ,{ expires: 1 });
        $.cookie("userInfo_image", loginUserInfo.image ,{ expires: 1 });
        $.cookie("userInfo_name", loginUserInfo.name ,{ expires: 1 });
        $.cookie("userInfo_usertype", loginUserInfo.usertype ,{ expires: 1 });
        //获取当前会话的站点和定制化功能文件
        var sessionDomainAndJsFile = imeWeb.getSessionDomainAndJsFiles();
        if(sessionDomainAndJsFile.success === 'true'){
            $.cookie("domainInfo_domaincssfile", sessionDomainAndJsFile.domaincssfile ,{ expires: 1 });
            $.cookie("domainInfo_domainjsfile", sessionDomainAndJsFile.domainjsfile ,{ expires: 1 });
            $.cookie("domainInfo_domainid", sessionDomainAndJsFile.domainid ,{ expires: 1 });
            $.cookie("domainInfo_domainkey", sessionDomainAndJsFile.domainkey ,{ expires: 1 });
            $.cookie("domainInfo_domainname", sessionDomainAndJsFile.domainname ,{ expires: 1 });
        }
        //获取cookie里的站点并设置
        imeWeb.setSessionDomain($.cookie('domainInfo_domainid'));

        if($(".page-content-wrapper").length <= 0){
            $('body').prepend(Handlebars.templates['common/commonFooter']([1]));
            $('body').prepend(Handlebars.templates['common/commonHeader']([1]));
            $('.page-sidebar-wrapper').prepend(Handlebars.templates['common/commonSidebar']([1]));
            pageCommon.init();
            $('.page-sidebar-menu').data("auto-scroll","false");
        }else{
            $(".page-content-wrapper .page-content").not(".page-editor").remove();
            $('.page-editor').toggle(false);
        }
        if(typeof name !== "undefined" && typeof data !== "undefined"){
            $('.page-content-wrapper').prepend(Handlebars.templates[name](data));
        }else{
            console.log("页面加载模板传递参数有误");
        }
    }
};

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
};

/* 检查用户是否存在,以防止从缓存读取页面信息 */
imeWeb.checkUser = function(){
    var success;
    var principalId;
    $.ajax({
        url: g_url_check_user,
        type: 'get',
        async: false,
        data:{
            '_dc': new Date().getTime()
        },
        success:function(data,textStatus){
            success = data.success;
            principalId = data.principalId;
        }
    });
    return {'success':success,'principalId':principalId};
};

/* 检查当前用户所在站点,以防止cookie与后台记录不一致 */
imeWeb.checkDomain = function(){
    var success;
    var principalId;
    $.ajax({
        url: g_url_check_domain,
        type: 'get',
        async: false,
        data:{
            '_dc': new Date().getTime()
        },
        success:function(data,textStatus){
            success = data.success;
            principalId = data.principalId;
        }
    });
    return {
        'success':success,
        'principalId':principalId
    };
};

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
};

/* 获取登陆用户信息 */
imeWeb.getLoginUser = function(){
    var name;
    var id;
    var userType;
    var image;
    $.ajax({
        url: g_url_getLoginUser,
        type: 'get',
        async: false,
        success:function(data,textStatus){
            name = data.name;
            id = data.id;
            userType = data.usertype;
            image = data.image;
        }
    });
    return {
        'name':name,
        'id':id,
        'userType':userType,
        'image':image
    };
};

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
};

/* 获取用户所有的站点 */
imeWeb.getDomainByUser = function(){
    var domainList = [];
    $.ajax({
        url: g_url_getDomainByUser,
        type: 'get',
        async: false,
        data:{
            '_dc': new Date().getTime()
        },
        success:function(data,textStatus){
            if(data.length > 0){
                $.each(data,function(index,item){
                    var domainName = item.domainname;
                    var domainKey = item.domainkey;
                    var domainOid = item.oid;
                    domainList[index] = {
                        'domainName': domainName,
                        'domainKey': domainKey,
                        'domainOid': domainOid
                    }
                });
            }
        }
    });
    return domainList;
};

/* 选择需要设置的站点 */
imeWeb.selectSetSessionDomain = function(){
	var data = imeWeb.getDomainByUser();
	var contentData = Handlebars.templates["common/topMenuSwitchDomain"]([{"domainData":data}]);
	$.confirm({
	    icon: 'fa fa-cubes',
	    title: '站点',
	    content: contentData,
	    buttons: {
	        ok: {
	            text: '确认',
	            btnClass: 'btn-blue',
	            keys: ['enter'],
	            action: function(){
	                imeWeb.setSessionDomain($("input[name='domain']:checked").val());
	                window.location.reload();
	            }
	        },
	        close: {
	            text: '取消',
	            keys: ['esc'],
	            action: function(){

	            }
	        }
	    }
	});
};

/* 设置会话站点 */
imeWeb.setSessionDomain = function(_domainid){
    var domainCount;
    var domainId;
    var domainKey;
    var domainName;
    var success;
    $.ajax({
        url: g_url_setSessionDomain,
        type: 'get',
        async: false,
        data: {
            'domainid': _domainid
        },
        success:function(data,textStatus){
            domainCount = data.domaincount;
            domainId = data.domainid;
            domainKey = data.domainkey;
            domainName = data.domainname;
            success = data.success;
        }
    });
    return {
        'domainCount': domainCount,
        'domainId': domainId,
        'domainKey': domainKey,
        'domainName': domainName,
        'success': success
    };
};

/* 字符串首字母大写 */
imeWeb.firstLetterToUpperCase = function(sourceData){
	var sourceDataLength = sourceData.length;
	var firstLetter = '';
	var lastLetter = '';
	if(sourceDataLength > 0){
		firstLetter = sourceData.substring(0,1);
		lastLetter = sourceData.substring(1,sourceDataLength);
		return (firstLetter.toUpperCase()+lastLetter);
	}else{
		return '';
	}
};

/* 当前页面下创建子页面 */
imeWeb.createChildPage = function(templateName,parentName,pageName){
    $('.'+parentName).addClass('hidden');
    $('.page-content-wrapper').append(Handlebars.templates[templateName]([{"parentName":parentName,"pageName":pageName,"protletTitleTools":[{"child-page-close":"true"}]}]));
    $('html, body').scrollTop(0);
    imeWeb.i18n.init();
};
/* 当前页面下创建子页面带有参数id */
imeWeb.createChildPageHasId = function(templateName,parentName,pageName,id){
    $('.'+parentName).addClass('hidden');
    $('.page-content-wrapper').append(Handlebars.templates[templateName]([{"parentName":parentName,"pageName":pageName,"protletTitleTools":[{"child-page-close":"true"}],"id":id}]));
    $('html, body').scrollTop(0);
    imeWeb.i18n.init();
};
/* 当前页面下删除子页面 */
imeWeb.deleteChildPage = function(){
	var thisPage = $('.page-content:visible');
	var parentPage = null;
	var parentPageName = "";
	$.each(thisPage.attr('class').split(' '),function(index,value){
		if(value.indexOf('parent-') === 0){
			parentPageName = value.split('parent-')[1].split('-')[2];
			parentPage = $('.'+value.split('parent-')[1]);
		}
	});
	if(parentPage === null){
		return false;
	}else{
		thisPage.remove();
    	parentPage.removeClass('hidden');
        parentPage.css('display','');
    	$('html, body').scrollTop(0);
    	if(parentPageName === 'base'){
    		eval('page'+(imeWeb.firstLetterToUpperCase(window.location.pathname.split('/')[2]))).dataInit();
    	}else{
    		eval('page'+(imeWeb.firstLetterToUpperCase(parentPageName))).dataInit();
    	}
	}
};
/* 关闭子页面 */
$(document).on('click','.child-page-close', function() {
    imeWeb.deleteChildPage();
});

/* 关闭页面不初始化 */
imeWeb.closeChildPage = function(){
    var thisPage = $('.page-content:visible');
    var parentPage = null;
    var parentPageName = "";
    $.each(thisPage.attr('class').split(' '),function(index,value){
        if(value.indexOf('parent-') === 0){
            parentPageName = value.split('parent-')[1].split('-')[2];
            parentPage = $('.'+value.split('parent-')[1]);
        }
    });
    if(parentPage === null){
        return false;
    }else{
        thisPage.remove();
        parentPage.removeClass('hidden');
        parentPage.css('display','');
        $('html, body').scrollTop(0);
    }
};

/* 判断对象是否相等 */
imeWeb.isObjectValueEqual = function (a, b) {
    if(typeof a == 'object' && typeof b == 'object'){
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if(aProps.length !== bProps.length) {
            return false;
        }else{
            for(var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if(typeof a[propName] == 'object' && typeof b[propName] == 'object'){
                    imeWeb.isObjectValueEqual(a[propName],b[propName]);
                }else{
                    if (a[propName] !== b[propName]) {
                        return false;
                    }
                }
            }
            return true;
        }
    }else{
        return a === b;
    }
}

/* 数组去重 */
imeWeb.distinct = function(array){
    var r = [];
    for(var i = 0, l = array.length; i < l; i++) {
        for(var j = i + 1; j < l; j++)
            if (imeWeb.isObjectValueEqual(array[i],array[j])){
                j = ++i;
            }
            r.push(array[i]);
        }
    return r;
};
/*单次绑定事件*/
$.fn.bindOne = function (eventName,fn) {
    $(this).unbind(eventName).bind(eventName, fn);
};
/********************************************工具函数*********************************************************/
imeWeb.tools = {

    /*全选功能*/
    H_allChecked: function (allCheckBtn, childCheckBtn) {
        if(!allCheckBtn||!childCheckBtn){
            console.warn("imeWeb.tools.H_allChecked参数错误！");
            return;
        }
        /*子复选框点击事件*/
        childCheckBtn.bindOne('click',function (e) {
            allCheckBtn.prop('checked', imeWeb.tools.checkAll(childCheckBtn, 'checked', "allChecked"));
        });
        /*全选框点击事件*/
        allCheckBtn.bindOne('click',function (e) {
            allcheckedFn(childCheckBtn, $(this));
        });
        /*全选*/
        function allcheckedFn(children, thisEle) {
            bodyCh = children;//tbody中多选框
            var _t = thisEle;
            var allchecked = _t.checked || _t.prop('checked');
            allchecked = ischecked(allchecked);
            bodyCh.each(function (v, e) {
                e.checked = allchecked;
            })
        }

        /*是否选中*/
        function ischecked(cc) {
            return !!cc ? true : false;
        }
    },
    /*删除被选中的行*/
    deleteCheckedRow:function (deleteBtn,dataTableBox,allCheckedBtn,alterBox) {
        $(deleteBtn).bindOne('click',function (e) {
            if(!dataTableBox||!allCheckedBtn){
                console.warn("imeWeb.tools.deleteCheckedRow参数错误");
                return;
            }
            if (imeWeb.tools.checkAll(allCheckedBtn, 'checked', "hasChecked")) {
                allCheckedBtn.each(function (v, ele) {
                    if (ele.checked || $(ele).prop('checked')) {
                        console.log(11);
                        var mainTable = dataTableBox.DataTable();
                        mainTable.row($(ele).parent().parent().parent()).remove().draw();
                        // console.log(mainTable.data());
                    }
                })
            } else {
                if(alterBox){
                    imeWeb.tools.globalAlert(alterBox, "请选择要删除的项");
                }
            }
        });
    },

    /*检查是否有未被选中的项(没有属性attr)*/
    checkAll: function (eles, attr, flag) {
        switch (flag) {
            case "allChecked":
                for (var i = 0, l = eles.length; i < l; i++) {
                    if (!eles[i][attr] || !$(eles[i]).prop(attr)) {
                        return false;
                    }
                }
                return true;//都选中了
            case "hasChecked":
                for (var ii = 0, ll = eles.length; ii < ll; ii++) {
                    if (eles[ii][attr] || $(eles[i]).prop(attr)) {
                        return true;//有被选中的
                    }
                }
                return false;
        }

    },
    /*添加一行*/
    addRow:function (addBtn,dataTableBox,data,callback) {
        $(addBtn).bindOne('click',function () {
            var mianTableData = dataTableBox.DataTable();
            mianTableData.rows.add(data).draw();
            if(callback){
                callback(dataTableBox,data);
            }
        });
    },
    /*全局弹出框*/
    globalAlert: function (boxId, msg) {
    App.alert({
        container: boxId,
        place: 'append',
        type: 'danger',
        message: msg,
        close: true,
        reset: true,
        focus: true,
        closeInSeconds: 2,
        icon: 'fa fa-close'
    });
}

};



imeWeb.tools = {

    /*全选功能*/
    H_allChecked: function (allCheckBtn, childCheckBtn) {
        if (!allCheckBtn || !childCheckBtn) {
            console.warn("imeWeb.tools.H_allChecked参数错误！");
            return;
        }
        /*子复选框点击事件*/
        $(childCheckBtn).parent().parent().parent().bindOne('click', function (e) {
            var checkedBox = $($(this).children('td')[0]).children().find('input')[0];
            checkedBox.checked = !checkedBox.checked;
            $(allCheckBtn).prop('checked', imeWeb.tools.checkAll(childCheckBtn, 'checked', "allChecked"));
        });
        /*全选框点击事件*/
        allCheckBtn.bindOne('click', function (e) {
            allcheckedFn(childCheckBtn, $(this));
        });
        /*全选*/
        function allcheckedFn(children, thisEle) {
            bodyCh = children;//tbody中多选框
            var _t = thisEle;
            var allchecked = _t.checked || _t.prop('checked');
            allchecked = ischecked(allchecked);
            bodyCh.each(function (v, e) {
                e.checked = allchecked;
            })
        }

        /*是否选中*/
        function ischecked(cc) {
            return !!cc ? true : false;
        }
    },
    /*删除被选中的行*/
    deleteCheckedRow: function (deleteBtn, dataTable, allCheckedBtn, alterBox, beforeDelete) {
        $(deleteBtn).bindOne('click', function (e) {
            var res = true;
            if (!dataTable || !allCheckedBtn) {
                console.warn("imeWeb.tools.deleteCheckedRow参数错误");
                return;
            }
            if (imeWeb.tools.checkAll(allCheckedBtn, 'checked', "hasChecked")) {
                allCheckedBtn.each(function (v, ele) {
                    if (ele.checked || $(ele).prop('checked')) {
                        if (beforeDelete) {
                            res = beforeDelete($(ele).parent().parent().parent());
                        }
                        if (res) {
                            dataTable.row($(ele).parent().parent().parent()).remove().draw();
                            imeWeb.tools.globalAlert(alterBox, "删除成功！", 'success');
                        } else {
                            imeWeb.tools.globalAlert(alterBox, "删除失败！", 'success');
                        }
                    }
                });
            } else {
                if (alterBox) {
                    imeWeb.tools.globalAlert(alterBox, "请选择要删除的项", 'fail');
                }
            }
        });
    },

    /*检查是否有未被选中的项(没有属性attr)*/
    checkAll: function (eles, attr, flag) {
        switch (flag) {
            case "allChecked":
                for (var i = 0, l = eles.length; i < l; i++) {
                    if (!eles[i][attr] || !$(eles[i]).prop(attr)) {
                        return false;
                    }
                }
                return true;//都选中了
            case "hasChecked":
                console.log(eles.parent().find(':checked'));
                if (eles.parent().find(':checked').length != 0) {
                    return true;
                }
                // for (var ii = 0, ll = eles.length; ii < ll; ii++) {
                //     if (eles[ii][attr] || $(eles[ii]).prop(attr)) {
                //         return true;//有被选中的
                //     }
                // }
                return false;
        }

    },
    /*添加一行*/
    addRow: function (addBtn, dataTable, data, callback) {
        $(addBtn).bindOne('click', function () {
            dataTable.rows.add(data).draw();
            if (callback) {
                callback(dataTable, data);
            }
        });
    },
    /*全局弹出框*/
    globalAlert: function (boxId, msg, type,preppend_append) {
        var type = type || 'success';
        var preppend_append=preppend_append||'append'
        switch (type) {
            case 'success': {
                App.alert({
                    container: boxId,
                    place: preppend_append,
                    type: 'success',
                    message: msg,
                    close: true,
                    reset: true,
                    focus: true,
                    closeInSeconds: 2,
                    icon: 'fa fa-check'
                });
                break;
            }
            case 'fail': {
                App.alert({
                    container: boxId,
                    place: preppend_append,
                    type: 'danger',
                    message: msg,
                    close: true,
                    reset: true,
                    focus: true,
                    closeInSeconds: 2,
                    icon: 'fa fa-close'
                });
                break;
            }
        }
    },
    /*获取表格所有数据*/
    getAllTableData: function (tableEle, keys, others) {
        var res = [];
        var trs = tableEle.children("tbody").children();
        for (var i = 0, l = trs.length; i < l; i++) {
            var tds = $(trs[i]).children('td:gt(0)');
            var item = {};
            for (var keysi = 0, keysl = keys.length; keysi < keysl; keysi++) {
                item[keys[keysi]] = $(tds[keysi]).text();
            }
            if (others) {
                for (k in others) {
                    item[k] = others[k];
                }
            }
            res.push(item);
        }
        return res;
    },
    /*浮动按钮*/
    /*
     * table:# + 表格id
     * content:浮动按钮内的内容，文字、html或DOM元素
     * callback:有三个参数,table、按钮本身、当前的tr
     * otherCss:自定义样式，穿个对象
     * */
    floatBox: function (table, content, callback, otherCss) {
        var div = document.createElement('div');
        var allTr = $(table).children('tbody').children('tr');
        var currentTr = null;
        $(div).css({
            height: "auto",
            'text-align':'center',
            'padding':"7px 0.5rem",
            border: "1px solid #ccc",
            position: "absolute",
            "z-index": 999,
            "background-color": "#fff"
        });
        if (otherCss) {
            $(div).css(otherCss);
        }
        $(div).html(content);
        $(div).attr('id', 'floatBtn');
        $(table).children('tbody').append(div);
        $(div).hide();
        // allTr.stop(true);
        // allTr.removeEvent('mouseout');
        $(table).children('tbody').bindOne('mouseover', function (e) {
            /*bug解决*/
            if ($(table).children('tbody').children('#floatBtn')[0] == undefined) {
                $(table).children('tbody').append(div);
            }
            $(div).show();
            var position = $(this).children(':last').position();
            $(div).css({
                left: position.left + 56 + 'px',
                top: position.top + 'px'
            });
            currentTr = $(this);
            if (Object.prototype.toString.call(callback) == '[object Function]') {
                callback(table, $(div), currentTr);
            }
        }, 'tr');
        // $(table).bindOne('mouseout',function (e) {
        //     var ev=e||window.event;
        //     console.log(ev.currentTarget)
        //     $(div).hide();
        // });

        return false;
    },
    /*选中一行*/
    checkedOneTr:function (table,callback) {
        $(table).children('tbody').on('click','tr', function () {
            var _t = $(this);
            _t.siblings().removeClass('selected');
            _t.addClass('selected');
            _t.children('td').removeClass('sorting_1');
            if (Object.prototype.toString.call(callback) == '[object Function]') {
                callback(_t);
            }
        });
    }
};


//弹出警告框同意设置
// imeWeb.Alert = function(boxId,msg,prepend_append,type,icon){
//     var msg=msg||'请选择对象'
//     var prepend_append=prepend_append||'preppend'
//     var type=type||'danger'
//     var icon=icon||'fa fa-close'
//      App.alert({
//         container: boxId,
//         place: prepend_append,
//         type: type,
//         message:msg,
//         reset: true,
//         focus: true,
//         icon: icon
//     });

// }