//创建全局imeWeb变量防止命名冲突
var imeWeb = imeWeb || {};

//页面初始化方法
imeWeb.page = {
    index: pageNav.init,  //导航
    home: pageHome.init,  //主页
    myTask: pageMyTask.init,
    homeDoc: pageHomeDoc.init,
    docLog: pageDocumentLog.init,
    siteManagement: pageSiteManagement.init,
    pageDomainManagement: pageDomainManagement.init,
    translationLangManagement: pageTranslationLangManagement.init,
    repository: pageRepository.init,
    groupManagement: pageGroupManagement.init,
    containerManagement: pageContainerManagement.init,
    workflowManagement: pageWorkflowManagement.init,
    queueManagement: pageQueueManagement.init ,
    reportChart: pageReportChart.init,
    siteInfo: pageSiteInfo.init,
    userManagement: pageUserManagement.init,
    systemInfo: pageSystemInfo.init,
    receiveUrgentTask: pageTask.init

};
//路由与页面初始化方法绑定
imeWeb.router = new Router({
    '/imeWeb/index.html': 'index', //导航
    '/imeWeb/home': 'home',  //主页
    '/imeWeb/myTask': 'myTask',
    '/imeWeb/homeDoc': 'homeDoc',
    '/imeWeb/logRecord': 'docLog',
    '/imeWeb/siteManagement': 'siteManagement',
    '/imeWeb/domainManagement': 'pageDomainManagement',
    '/imeWeb/translationLangManagement': 'translationLangManagement',
    '/imeWeb/repository': 'repository',
    '/imeWeb/groupManagement': 'groupManagement',
    '/imeWeb/containerManagement': 'containerManagement',
    '/imeWeb/workflowManagement': 'workflowManagement',
    '/imeWeb/queueManagement': 'queueManagement',
    '/imeWeb/reportchart': 'reportChart',
    '/imeWeb/siteInfo': 'siteInfo',
    '/imeWeb/userManagement': 'userManagement',
    '/imeWeb/systemInfo': 'systemInfo',
    '/imeWeb/receiveUrgentTask': 'receiveUrgentTask'
}, {
    scope: imeWeb.page
});

//映射局部模板
//例：Handlebars.partials['common/commonFooter'] = Handlebars.templates['common/commonFooter']
Handlebars.partials['common/protletTitleTools'] = Handlebars.templates['common/protletTitleTools'];
Handlebars.partials['editor/tabNav'] = Handlebars.templates['editor/tabNav'];
Handlebars.partials['editor/tabContent'] = Handlebars.templates['editor/tabContent'];

//Datatable错误处理方法
$.fn.dataTable.ext.errMode = "none";

//设置全局性的Ajax配置选项
$.ajaxSetup({
    async: false,
    dataType: "json",
    complete: function (XMLHttpRequest, textStatus) {
        if (XMLHttpRequest.getResponseHeader('_timeout') === "true") {
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
                        action: function () {
                            window.location.href = "login.html";
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
(function () {
    var message = '<div class="loading-message "><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>';
    var css = {border: 'none', backgroundColor: 'transparent'};
    var overcss = {backgroundColor: '#000', opacity: 0.0, cursor: 'wait'};
    $(document).ajaxSend(function (e, xhr, setting) {
        if (setting.context) {
            var context = setting.context;
            var button = context.refreshbutton[0];
            var area = context.refresharea;
            var l = Ladda.create(button);
            l.start();
            area.block({
                message: message,
                css: css,
                overlayCSS: overcss
            })
            context.l = l
            if (setting.context.clickfunction) {
                if (button.hasevents) return; //解决性能
                $(button).click(function () {
                    button.hasevents = true;
                    setting.context.clickfunction()
                })
            }
        }
    }).ajaxSuccess(function (e, xhr, setting) {
        if (setting.context) {
            var context = setting.context;
            var button = context.refreshbutton[0];
            var area = context.refresharea;
            setTimeout(function () {
                context.l.stop()
                area.unblock()
            }, 2000)
        }
    });
})()

//设置通告信息全局配置
toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//检查浏览器版本
imeWeb.getBrowserVersion = function () {
    var browser = {};
    var userAgent = navigator.userAgent.toLowerCase();
    var s;
    (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
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
        if (userAgent.indexOf('rv:11.0') > 0) {
            version = 'msie 11';
        } else {
            version = '[' + userAgent + ']';
        }
    }
    return version;
};

//改变URL地址
imeWeb.changeRoute = function (url) {
    imeWeb.router.route(url, {trigger: true});
    $('html, body').scrollTop(0);
};

//跳转页面前确认
window.onbeforeunload = function () {
    return '';
}

//切换语言
imeWeb.changeLanguage = function (lang) {
    var changeLanguage;
    var changeLanguageSuccess;
    $.ajax({
        url: g_url_changeLang,
        type: 'get',
        async: false,
        data: {
            "lang": lang
        },
        success: function (data, textStatus, request) {
            if (data.success) {
                changeLanguage = lang;
                changeLanguageSuccess = data.success;
                $.cookie("appLanguage", lang, {expires: 7});
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
imeWeb.loadJs = function () {
    $("#handlebar_template").load("js/template.js", {}, function () {

    });
};

//页面框架初始化
imeWeb.initPageBox = function (name, data) {
    if (imeWeb.checkUser().success === true) {
        if (typeof $.cookie("domainInfo_domainid") !== "undefined") {
            //获取cookie里的站点并设置
            imeWeb.setSessionDomain($.cookie('domainInfo_domainid'));
        }
        //获取语言
        $.cookie("appLanguage", imeWeb.getBrowserInfo().language, {expires: 7});
        //获取登录用户的信息并存入cookie
        var loginUserInfo = imeWeb.getLoginUser();
        $.cookie("userInfo_id", loginUserInfo.id, {expires: 1});
        $.cookie("userInfo_image", loginUserInfo.image, {expires: 1});
        $.cookie("userInfo_name", loginUserInfo.name, {expires: 1});
        $.cookie("userInfo_usertype", loginUserInfo.usertype, {expires: 1});
        //获取当前会话的站点和定制化功能文件
        var sessionDomainAndJsFile = imeWeb.getSessionDomainAndJsFiles();
        if (sessionDomainAndJsFile.success === 'true') {
            $.cookie("domainInfo_domaincssfile", sessionDomainAndJsFile.domaincssfile, {expires: 1});
            $.cookie("domainInfo_domainjsfile", sessionDomainAndJsFile.domainjsfile, {expires: 1});
            $.cookie("domainInfo_domainid", sessionDomainAndJsFile.domainid, {expires: 1});
            $.cookie("domainInfo_domainkey", sessionDomainAndJsFile.domainkey, {expires: 1});
            $.cookie("domainInfo_domainname", sessionDomainAndJsFile.domainname, {expires: 1});
        }

        if ($(".page-content-wrapper").length <= 0) {
            $('body').prepend(Handlebars.templates['common/commonFooter']([1]));
            $('body').prepend(Handlebars.templates['common/commonHeader']([1]));
            $('.page-sidebar-wrapper').prepend(Handlebars.templates['common/commonSidebar']([1]));
            pageCommon.init();
            $('.page-sidebar-menu').data("auto-scroll", "false");
        } else {
            $(".page-content-wrapper .page-content").not(".page-editor").remove();
            $('.page-editor').toggle(false);
        }
        if (typeof name !== "undefined" && typeof data !== "undefined") {
            $('.page-content-wrapper').prepend(Handlebars.templates[name](data));
        } else {
            console.log("页面加载模板传递参数有误");
        }
        //打开被关闭的侧边栏
        if ($.cookie('sidebar_closed') === "1") {
            $(".sidebar-toggler").click();
        }
    }
};

/* 登出 */
imeWeb.logout = function () {
    $.ajax({
        type: "get",
        async: false,
        url: g_url_logout,
        success: function (data, textStatus) {
            if (data.success) {
                window.location.href = "login.html";
            }
        }
    });
};

/* 检查用户是否存在,以防止从缓存读取页面信息 */
imeWeb.checkUser = function () {
    var success;
    var principalId;
    $.ajax({
        url: g_url_check_user,
        type: 'get',
        async: false,
        data: {
            '_dc': new Date().getTime()
        },
        success: function (data, textStatus) {
            success = data.success;
            principalId = data.principalId;
        }
    });
    return {'success': success, 'principalId': principalId};
};

/* 检查当前用户所在站点,以防止cookie与后台记录不一致 */
imeWeb.checkDomain = function () {
    var success;
    var principalId;
    $.ajax({
        url: g_url_check_domain,
        type: 'get',
        async: false,
        data: {
            '_dc': new Date().getTime()
        },
        success: function (data, textStatus) {
            success = data.success;
            principalId = data.principalId;
        }
    });
    return {
        'success': success,
        'principalId': principalId
    };
};

/* 获取当前会话的语言和站点 */
imeWeb.getBrowserInfo = function () {
    var language;
    var domain;
    var success;
    var msg;
    $.ajax({
        url: g_url_getBrowserInfo,
        type: 'get',
        async: false,
        success: function (data, textStatus) {
            language = data.language;
            domain = data.domain;
            success = data.success;
            msg = data.msg;
        }
    });
    return {
        'language': language,
        'domain': domain,
        'success': success,
        'msg': msg
    };
};

/* 获取登陆用户信息 */
imeWeb.getLoginUser = function () {
    var name;
    var id;
    var userType;
    var image;
    $.ajax({
        url: g_url_getLoginUser,
        type: 'get',
        async: false,
        success: function (data, textStatus) {
            name = data.name;
            id = data.id;
            userType = data.usertype;
            image = data.image;
        }
    });
    return {
        'name': name,
        'id': id,
        'userType': userType,
        'image': image
    };
};

/* 获取登陆用户的管理权限 */
imeWeb.isAdministrator = function () {
    var info = {};
    $.ajax({
        url: g_url_isAdministrator,
        type: 'get',
        dataType: "json",
        async: false,
        data: {
            '_dc': new Date().getTime()
        },
        success: function (data, textStatus) {
            info = data;
        }
    });
    return info;
};

/* 获取会话站点和定制化功能文件 */
imeWeb.getSessionDomainAndJsFiles = function () {
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
        data: {
            'type': 'imejs',
            'domainOid': ''
        },
        success: function (data, textStatus) {
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
imeWeb.getDomainByUser = function () {
    var domainList = [];
    $.ajax({
        url: g_url_getDomainByUser,
        type: 'get',
        async: false,
        data: {
            '_dc': new Date().getTime()
        },
        success: function (data, textStatus) {
            if (data.length > 0) {
                $.each(data, function (index, item) {
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
imeWeb.selectSetSessionDomain = function () {
    var data = imeWeb.getDomainByUser();
    var contentData = Handlebars.templates["common/topMenuSwitchDomain"]([{"domainData": data}]);
    $.confirm({
        icon: 'fa fa-cubes',
        title: '站点',
        content: contentData,
        buttons: {
            ok: {
                text: '确认',
                btnClass: 'btn-blue',
                keys: ['enter'],
                action: function () {
                    var selectDomainId = $("input[name='domain']:checked").val()
                    imeWeb.setSessionDomain(selectDomainId);
                    $.cookie('domainInfo_domainid', selectDomainId);
                    window.location.reload();
                }
            },
            close: {
                text: '取消',
                keys: ['esc'],
                action: function () {

                }
            }
        }
    });
};

/* 设置会话站点 */
imeWeb.setSessionDomain = function (_domainid) {
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
        success: function (data, textStatus) {
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

/* 通过oid获取文件所有信息 */
imeWeb.queryDocInfo = function (oid) {
    var docInfo = {};
    $.ajax({
        url: g_url_queryDocInfo,
        type: 'get',
        async: false,
        data: {
            "oid": oid,
            "_dc": new Date().getTime(),
        },
        success: function (data, textStatus) {
            docInfo = data;

        }
    });
    return docInfo;
};

/* 通过oid检出文档 */
imeWeb.checkOut = function (oid) {
    var checkOutInfo = {};
    $.ajax({
        url: g_url_checkOut,
        type: 'get',
        async: false,
        data: {
            "oid": oid,
            "_dc": new Date().getTime(),
        },
        success: function (data, textStatus) {
            checkOutInfo = data;
        }
    });
    return checkOutInfo;
}

/* 删除我的收藏 */
imeWeb.deleteFavoriteItem = function (oid) {
    $.ajax({
        "url": g_url_deleteFavoriteItem,
        "type": "get",
        "async": true,
        "data": {
            "oid": oid,
            "_dc": new Date().getTime(),
        },
        "success": function (data, textstatus) {
            if (data.success === "true") {
                $('.favorite-item[oid="' + data.oid + '"]').remove();
            }
        }
    });
}

/* 获取对应文档的浮动菜单 */
imeWeb.getFloatMenuByOid = function (node, oid) {
    $.ajax({
        "url": g_url_getFloatMenuConfig,
        "type": "get",
        "async": true,
        "data": {
            "oid": oid,
            "_dc": new Date().getTime(),
        },
        "success": function (data, textstatus) {
            if (data.success == true) {
                var html = "";
                $.each(data.array, function (index, element) {
                    html += '<i class="' + element.image + '" titleKey="i18n.' + element.title + '" url="' + element.url + '" type="' + element.type + '"></i>'
                });
                node.find(".floatTools").prepend(html).attr("load", "1");
            } else {
                node.find(".floatTools").prepend(html).attr("load", "0");
            }
            node.find(".floatTools").attr("oid",oid);
            imeWeb.i18n.init();
        }
    });
}

/* 获取对应文档的Actions */
imeWeb.getActionsByOid = function (node, oid) {
    $.ajax({
        "url": g_url_getActions,
        "type": "get",
        "async": true,
        "data": {
            "oid": oid,
            "_dc": new Date().getTime(),
        },
        "success": function(data,textstatus){
            if(data.success == false){
                node.find(".floatTools").addClass("toolShow");
                node.find(".actionTools").removeClass("toolShow");
                node.find(".actionTools").attr("load","0");
            }else{
                var html = "";
                $.each(data.actions,function(index,element){
                    if(element.status == "hidden")return true;
                    var isEnabled = (element.status == "enable")? '':'disabled';
                    html += '<i class="'+ element.image +' '+ isEnabled +'" titleKey="i18n.'+ element.title +'" url="'+ element.url +'" type="'+ element.type +'"></i>'
                });
                //动态加载子表格工具栏
                if(node.hasClass('parent')){
                    if(node.next().hasClass('child')){
                        node.next().find('.actionTools').html(html).attr("oid",oid);
                    }
                }
                //加载表格上的浮动工具栏
                html += '<i class="fa fa-chevron-right toolsLess" title="less"></i>';
                node.find(".actionTools").html(html).attr("load","0").attr("oid",oid);
                imeWeb.i18n.init();
            }
        }
    });
}

/* 打开编辑器 */
pageEditor.openEditor = function (oid) {
    pageEditor.init(oid);
}

/* 检出文档并打开编辑器 */
pageEditor.checkoutAndOpenEditor = function (oid) {
    var checkOutInfo = imeWeb.checkOut(oid);
    if (checkOutInfo.success == "true") {
        pageEditor.openEditor(oid);
    } else {
        toastr["error"]("检出失败,不能编辑", "收藏文档编辑");
    }
}


/* 字符串首字母大写 */
imeWeb.firstLetterToUpperCase = function (sourceData) {
    var sourceDataLength = sourceData.length;
    var firstLetter = '';
    var lastLetter = '';
    if (sourceDataLength > 0) {
        firstLetter = sourceData.substring(0, 1);
        lastLetter = sourceData.substring(1, sourceDataLength);
        return (firstLetter.toUpperCase() + lastLetter);
    } else {
        return '';
    }
};

/* 当前页面下创建子页面 */
imeWeb.createChildPage = function (templateName, parentName, pageName) {
    $('.' + parentName).addClass('hidden');
    $('.page-content-wrapper').append(Handlebars.templates[templateName]([{
        "parentName": parentName,
        "pageName": pageName,
        "protletTitleTools": [{"child-page-close": "true"}]
    }]));
    $('html, body').scrollTop(0);
    imeWeb.i18n.init();
};
/* 当前页面下创建子页面带有参数id */
imeWeb.createChildPageHasId = function (templateName, parentName, pageName, id) {
    $('.' + parentName).addClass('hidden');
    $('.page-content-wrapper').append(Handlebars.templates[templateName]([{
        "parentName": parentName,
        "pageName": pageName,
        "protletTitleTools": [{"child-page-close": "true"}],
        "id": id
    }]));
    $('html, body').scrollTop(0);
    imeWeb.i18n.init();
};
/* 当前页面下删除子页面 */
imeWeb.deleteChildPage = function () {
    var thisPage = $('.page-content:visible');
    var parentPage = null;
    var parentPageName = "";
    $.each(thisPage.attr('class').split(' '), function (index, value) {
        if (value.indexOf('parent-') === 0) {
            parentPageName = value.split('parent-')[1].split('-')[2];
            parentPage = $('.' + value.split('parent-')[1]);
        }
    });
    if (parentPage === null) {
        return false;
    } else {
        thisPage.remove();
        parentPage.removeClass('hidden');
        parentPage.css('display', '');
        $('html, body').scrollTop(0);
        if (parentPageName === 'base') {
            eval('page' + (imeWeb.firstLetterToUpperCase(window.location.pathname.split('/')[2]))).dataInit();
        } else {
            eval('page' + (imeWeb.firstLetterToUpperCase(parentPageName))).dataInit();
        }
    }
};
/* 关闭子页面 */
$(document).on('click', '.child-page-close', function () {
    imeWeb.deleteChildPage();
});

/* 关闭页面不初始化 */
imeWeb.closeChildPage = function () {
    var thisPage = $('.page-content:visible');
    var parentPage = null;
    var parentPageName = "";
    $.each(thisPage.attr('class').split(' '), function (index, value) {
        if (value.indexOf('parent-') === 0) {
            parentPageName = value.split('parent-')[1].split('-')[2];
            parentPage = $('.' + value.split('parent-')[1]);
        }
    });
    if (parentPage === null) {
        return false;
    } else {
        thisPage.remove();
        parentPage.removeClass('hidden');
        parentPage.css('display', '');
        $('html, body').scrollTop(0);
    }
};

/* 判断对象是否相等 */
imeWeb.isObjectValueEqual = function (a, b) {
    if (typeof a == 'object' && typeof b == 'object') {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length !== bProps.length) {
            return false;
        } else {
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if (typeof a[propName] == 'object' && typeof b[propName] == 'object') {
                    imeWeb.isObjectValueEqual(a[propName], b[propName]);
                } else {
                    if (a[propName] !== b[propName]) {
                        return false;
                    }
                }
            }
            return true;
        }
    } else {
        return a === b;
    }
}

/* 数组去重 */
imeWeb.distinct = function (array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
            if (imeWeb.isObjectValueEqual(array[i], array[j])) {
                j = ++i;
            }
        r.push(array[i]);
    }
    return r;
};
/*单次绑定事件*/
$.fn.bindOne = function (eventName, fn, childEle) {
    if (!childEle) {
        $(this).unbind(eventName).on(eventName, fn);
    } else {
        console.log('hasChildEle');
        $(this).unbind(eventName).on(eventName, childEle, fn);
    }
};

