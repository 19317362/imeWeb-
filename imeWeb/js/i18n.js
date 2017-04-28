imeWeb.i18n = imeWeb.i18n || {};

//加载资源文件
imeWeb.i18n.load = function(lang){
    var i18n_name = "i18n"
    jQuery.i18n.properties({   //加载浏览器选择语言对应的资源文件
        name: i18n_name,       // 需爱加载的资源文件名称
        path: './i18n/',       //资源文件路径
        mode: 'map',           //用Map的方式使用资源文件中的key值
        language: lang,        //语言类型zh或者en
        callback: function () {
            var arr = $("font[key^='" + i18n_name + "']");
            for (var i = 0; i < arr.length; i++) {
                var node = arr[i];
                var nodeID = node.getAttribute("key");
                var i18nKey = nodeID.split(".")[1];
                var i18nValue = $.i18n.prop(i18nKey);
                $(node).text(i18nValue);
            }
        }
    });
    $.cookie("appLanguage", lang, { expires: 7 });
}

//初始化i18n
imeWeb.i18n.init = function(){
    var localLanguage;
    var cookieLanguage = $.cookie("appLanguage");
    if(cookieLanguage){
        localLanguage = cookieLanguage;
    }else{
        if(navigator.language == "zh-CN"){
            localLanguage = "zh";
        }else{
            localLanguage = "en";
        }
    }
    imeWeb.i18n.load(localLanguage);
}

//切换i18n语言
imeWeb.i18n.changeLanguage = function(){
    var lang = $.cookie("appLanguage");
    if(lang == 'zh'){
        imeWeb.i18n.load("en");
        $.cookie("appLanguage", "en");
    }else{
        imeWeb.i18n.load("zh");
        $.cookie("appLanguage", "zh");
    }
}

