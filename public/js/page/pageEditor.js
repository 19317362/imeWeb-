var pageEditor = pageEditor || {};

pageEditor.init = function(docName,oId,type,containerId,folderId){
    try{
    	var tabId = new Date().getTime();
    	if( $('.page-editor').length <= 0 ){
    		$('.page-content').toggle(false);
    		switch(arguments.length)
			{
			case 0:
				$('.page-content-wrapper').append(Handlebars.templates["editor/editorContainer"]([{"pageName":"page-editor","editorNavData":[{"tabNavName":tabId,"tabNavStatus":"active","tabName":"New*"}],"editorContentData":[{"tabContentName":tabId,"tabContentStatus":"active","tabContentIframeId":tabId,"tabContentIframeSrc":"editor.html?folderId=1352&containerId=com.imecms.container.Container:120&type=plugin&timeId="+tabId}]}])); 
				break;
			case 2:
				if(docName === ''){
					docName = 'undefined';
				}
				$('.page-content-wrapper').append(Handlebars.templates["editor/editorContainer"]([{"pageName":"page-editor","editorNavData":[{"tabNavName":tabId,"tabNavStatus":"active","tabName":docName}],"editorContentData":[{"tabContentName":tabId,"tabContentStatus":"active","tabContentIframeId":tabId,"tabContentIframeSrc":"editor.html?oid="+ oId + "&type=plugin&timeId="+tabId}]}])); 			
				break;
			case 3:

				break;
			case 4:

				break;
			case 5:

				break;
			default:
				
			}
    	}else{
    		$('.page-content').toggle(false);
    		$('.page-editor').toggle(true);
    		switch(arguments.length)
			{
			case 0:
				$('.page-editor .portlet-title .doc-edit-tab > ul').append(Handlebars.templates["editor/tabNav"]([{"tabNavName":tabId,"tabNavStatus":"","tabName":"New*"}]));
				$('.page-editor .portlet-body .tabbable-tabdrop > .tab-content').append(Handlebars.templates["editor/tabContent"]([{"tabContentName":tabId,"tabContentStatus":"","tabContentIframeId":tabId,"tabContentIframeSrc":"editor.html?folderId=1352&containerId=com.imecms.container.Container:120&type=plugin&timeId="+tabId}]));
				$('.page-editor .portlet-title .doc-edit-tab a[href="#tab_content_'+ tabId+'"]').click();
				break;
			case 2:
				if(docName === ''){
					docName = 'undefined';
				}
				$('.page-editor .portlet-title .doc-edit-tab > ul').append(Handlebars.templates["editor/tabNav"]([{"tabNavName":tabId,"tabNavStatus":"","tabName":docName}]));
				$('.page-editor .portlet-body .tabbable-tabdrop > .tab-content').append(Handlebars.templates["editor/tabContent"]([{"tabContentName":tabId,"tabContentStatus":"","tabContentIframeId":tabId,"tabContentIframeSrc":"editor.html?oid="+oId+"&type=plugin&timeId="+tabId}]));
				$('.page-editor .portlet-title .doc-edit-tab a[href="#tab_content_'+ tabId+'"]').click();
				break;
			case 3:

				break;
			case 4:

				break;
			case 5:

				break;
			default:
				
			}
    	}
    	$('.page-editor .nav-pills').tabdrop('layout');
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }
}

pageEditor.colseTab = function(id){
	if( $('.page-editor .portlet-title .doc-edit-tab > ul li').not('.tabdrop').length <= 1){
		$('.page-editor').remove();
		$('.page-content').last().css("display","");
		$("body").css({"overflow":""});
	}else{
		$('#tab_nav_'+id+','+'#tab_content_'+id).remove();
		$('.page-editor .portlet-title .doc-edit-tab .nav li').last().children('a').click();
	}
}

/* 编辑器窗口最小化 */
$(document).on("click",".page-editor .editor-window-tools .editor-minimize",function(){
	if($(".editor-maximize").is(":hidden")){
		$(".page-editor .editor-window-tools .editor-restore").click();
	}
	$(".page-editor").toggle(false);
	$(".page-content").not(".page-editor").last().toggle(true);
});
/* 编辑器窗口最大化 */
$(document).on("click",".page-editor .editor-window-tools .editor-maximize",function(){
	$('.page-editor').toggleClass('window-max');
	$("body").css({"overflow":"hidden"});
	$('.editor-maximize,.editor-restore').toggle();
});
/* 编辑器窗口向下还原 */
$(document).on("click",".page-editor .editor-window-tools .editor-restore",function(){
	$(".page-editor").toggleClass("window-max");
	$("body").css({"overflow":""});
	$(".editor-maximize,.editor-restore").toggle();
});
/* topMenu toolbutton 新建文档的按钮绑定 */
$(document).on("click",'[title="xmlEditor2"]',function(){
	pageEditor.init();
});

