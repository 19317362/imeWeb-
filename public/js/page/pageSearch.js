/**
 * Created by mashroom on 17/3/22.
 */
var pageSearchGroup =  pageSearchGroup  || {};

pageSearchGroup.init = function(){
    //imeWeb.initPageBox();
    //pageCommon.init();
    $("body").prepend(Handlebars.templates['systemTools/pageSearchGroup']([1]));
    imeWeb.i18n.init();
}

var pageSearchMember = pageSearchMember  || {};

pageSearchMember.init = function(){
    //imeWeb.initPageBox();
    //pageCommon.init();
    $("body").prepend(Handlebars.templates['systemTools/pageSearchMember']([1]));
    imeWeb.i18n.init();
}