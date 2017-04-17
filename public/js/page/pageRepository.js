var pageRepository = pageRepository || {};

pageRepository.init = function(docInfo){
    try{
        imeWeb.initPageBox('repository/repositoryContainer',[1]);
        pageRepository.dataInit(docInfo);
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }
}

pageRepository.dataInit = function(docInfo){
    pageRepository.routesInit(docInfo.routes,docInfo.folderIds);
    pageRepository.tableInit(docInfo.folderId);
}

pageRepository.routesInit = function(routes,folderIds){
    for(var i = routes.length-1; i >= 0; i--){
        if( i == routes.length-1){
            $('.page-repository .page-breadcrumb.breadcrumb').append('<li><span class="active">'+ routes[i] +'</span><i class="fa fa-circle"></i></li>');
        }else if( i == 0){
            $('.page-repository .page-breadcrumb.breadcrumb').append('<li><span class="active">'+ routes[i] +'</span></li>');
        }else{
            $('.page-repository .page-breadcrumb.breadcrumb').append('<li><a folderid="'+ folderIds[i] +'">'+ routes[i] +'</a><i class="fa fa-circle"></i></li>');
        }
    }
}

pageRepository.tableInit = function(folderId){
    var repositoryTable = $('#repository').dataTable({
        'ajax': {
            'url': g_url_selectFileInIme,
            'type': 'get',
            'async': true,
            'data': {
                "folderid": folderId,
                "_dc": new Date().getTime(),
                "start": "0",
                "limit": "25",
                "page": "1"
            },
            'dataSrc': 'records'
        },
        "language": {
            "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
        },
        buttons: [],
        responsive: {
            responsive: true,
            details: {
                renderer: function (api, rowIdx, columns) {
                    var tab = Handlebars.templates['repository/childTableTab']([{rowIndex:rowIdx,data:columns}]);
                    return tab ?
                            $(tab).append() :
                            false;
                }
            }
        },
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0,1,4,7,11,12]}],
        "order": [
            [10, 'desc']
        ],
        "pageLength": 20,
        "dom": "<'row' <'col-md-12'B>><'row'r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        "columns": [
            {
                "data": "oid",
                "createdCell": function (nTd, sData, oData, iRow, iCol){
                    $(nTd).html("<label class='mt-checkbox mt-checkbox-single mt-checkbox-outline' ><input type='checkbox' class='checkboxes' name='item' value="+ sData+" /><span></span></label>");
                }

            },
            {"data": "filestatus"},
            {"data": "number"},
            {"data": "name"},
            {"data": "fileico"},
            {"data": "state"},
            {"data": "version"},
            {"data": "publishResult"},
            {"data": "modifierId"},
            {"data": "softtypeTitle"},
            {"data": "modified"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"},
            {"data": "version"}
        ],
        "drawCallback": function(){
            imeWeb.i18n.init();
        },
    });
}

$(document).on("click",".page-repository .page-breadcrumb a",function(){
    var folderId = $(this).attr("folderid");
    $('.page-sidebar-menu .subcontainer-item[folderid="'+ folderId +'"]').click();
});

$(document).on("dblclick","#repository tbody tr",function(){
    var oid = $(this).find("td:first input").attr("value");
    var docName = $(this).children("td").eq(3).text();
    pageEditor.init(docName,oid);
});
