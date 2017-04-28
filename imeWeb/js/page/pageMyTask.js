var pageMyTask = pageMyTask || {};

pageMyTask.init = function(){
	imeWeb.initPageBox();
    pageCommon.init();
	$('.page-content-wrapper').prepend(Handlebars.templates['myTask/myTaskContainer']([1]));
    imeWeb.i18n.init();
    pageMyTask.myTaskTableInit();
}

//我的任务表格初始化
pageMyTask.myTaskTableInit = function(){
    var lang = $.cookie("appLanguage");
	$("#myTask").dataTable( {
        "ajax": {
        	"url" : "tableData.json", 
            "dataSrc":  function ( json ) {
                            for ( var i=0, ien=json.records.length ; i<ien ; i++ ) {
                                json.data[i] = json.records[i];
                            }
                            return json;
                        }
        },
		//搜索框功能关闭
		"searching": false,
        //选择分页的个数功能关闭
        "bLengthChange":false,  
        "order": [[ 1, "asc" ]] ,  
        //勾选框列和下拉框列禁止排序功能
        "aoColumnDefs": [ { "bSortable": false, "aTargets": [0,9] }]  ,
        "language": {
            "url": 'i18n/dataTable_'+lang+'.json'
        },
        "columns": [
            {
                "data": "assignUserId",
                "createdCell": function (nTd, sData, oData, iRow, iCol){
                    $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline'><input type='checkbox' class='checkboxes' value='1' /><span></span></label>");
                }

            },
            { 
                "data": "actions",
            },
            { 
                "data": "name"
            },
            { 
                "data": "theme"
            },
            { 
                "data": "pboModified" 
            },
            { 
                "data": "softtypeTitle" 
            },
            { 
                "data": "assignTime" 
            },
            { 
                "data": "dealline" 
            },
            {
                "data": "pboStateTitle",
            },
            { 
                "data": "pboStateTitle",
                "createdCell": function(nTd, sData, oData, iRow, iCol){
                    $(nTd).html("<div class='btn-group'><button class='btn btn-xs green dropdown-toggle' type='button' data-toggle='dropdown' aria-expanded='false'> Actions<i class='fa fa-angle-down'></i></button></div>");
                }
            },
        ]
    } );
}
