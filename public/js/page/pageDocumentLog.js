/**
 * Created by likeke on 2017/4/12.
 */
var pageDocumentLog = pageDocumentLog || {};

pageDocumentLog.init = function () {
    try {
        imeWeb.initPageBox('documentLog/documentLog', [1]);
        pageDocumentLog.dataInit();
        pageDocumentLog.globalInit();
        pageDocumentLog.bindEventInit();
    } catch (err) {
        console.log(err);
    } finally {
        imeWeb.i18n.init();
    }
};
pageDocumentLog.dataInit = function () {

};
pageDocumentLog.globalInit = function () {
    /*日期插件*/
    $('.date-picker').datepicker({
        format: 'yyyy/mm/dd',
        orientation: 'bottom'
    });
};
pageDocumentLog.bindEventInit = function () {
    var docLog_drapDown_softtype = $('#docLog_drapDown_softtype');
    var docLog_search = $('#docLog_search');
    var docLog_userIdInput = $('#docLog_userIdInput');
    var docLog_softtypeInput = $('#docLog_softtypeInput');
    var docLog_actiontypeInput = $('#docLog_actiontypeInput');
    var docLog_docNumInput = $('#docLog_docNumInput');
    var docLog_docNameInput = $('#docLog_docNameInput');
    var docLog_begincreated = $('#docLog_begincreated');
    var docLog_endcreated = $('#docLog_endcreated');
    var docLog_dataShow = $('#docLog_dataShow');


    /*l类型选择下拉框*/
    docLog_drapDown_softtype.bindOne('click', function (e) {
        $.ajax({
            url: '/imeWeb/Services/permission/getsofttype',
            type: 'GET',
            data: {
                _dc: new Date().getTime(),
                query: '',
                page: 1,
                start: 0,
                limit: 25
            },
            success: function (data) {
                $('#docLog_softtype_showDate').html(Handlebars.templates['documentLog/type_dataShow'](data));
                bindEvent_type_dataShowLi();
            }
        })
    });
    function bindEvent_type_dataShowLi() {
        var docLog_softtype_showDate = $('#docLog_softtype_showDate');
        var docLog_actiontype_dataShow=$('#docLog_actiontype_dataShow');
        docLog_softtype_showDate.children('li').bindOne('click', function (e) {
            var c_value=$(this).attr('c_value');
            docLog_softtypeInput.attr('chosetype',c_value);
        });
        docLog_actiontype_dataShow.children('li').bindOne('click',function (e) {
            var c_value=$(this).attr('c_value');
            docLog_actiontypeInput.attr('chosetype',c_value);
        })
    }
    bindEvent_type_dataShowLi();

    /*搜索按钮*/
    docLog_search.bindOne('click', function (e) {
        var docLog_begincreatedV=docLog_begincreated.val()?docLog_begincreated.val().replace(/\//g,'-')+" 00:00:00":false;
        var docLog_endcreatedV=docLog_endcreated.val()?docLog_endcreated.val().replace(/\//g,'-')+" 00:00:00":false;
        $.ajax({
            url: '/imeWeb/Services/sysLog/listSysLogRecord',
            type: 'GET',
            data: {
                userId: docLog_userIdInput.val(),
                actionType: docLog_actiontypeInput.attr('chosetype')|| 'null',
                softtype: docLog_softtypeInput.attr('chosetype')|| 'null',
                docNumber: docLog_docNumInput.val(),
                docName: docLog_docNameInput.val(),
                beginDate: docLog_begincreatedV || "null",
                endDate: docLog_endcreatedV || "null",
                _dc: new Date().getTime(),
                page: 1,
                start: 0,
                limit: 25
            },
            "context": {
                refreshbutton: $('#docLog_search'),
                refresharea: $('#docLog_searchRes_loadding'),
                clickfunction: null
            },
            success: function (data) {
                // console.log(data);
                docLog_dataShow.dataTable({
                    data: data,
                    "destroy": true,
                    //搜索框功能关闭
                    "searching": false,
                    //选择分页的个数功能关闭
                    "bLengthChange": false,
                    "order": [[1, "asc"]],
                    "columns": [
                        {
                            "data": "actionDate",
                            "defaultContent": ''
                        },
                        {
                            "data": "docNumber",
                            "defaultContent": ''
                        },
                        {
                            "data": "docName",
                            "defaultContent": ''
                        },
                        {
                            "data": '',
                            "defaultContent": ''
                        },
                        {
                            "data": "actionType",
                            "defaultContent": ''
                        },
                        {
                            "data": "actionerId",
                            "defaultContent": ''
                        },
                        {
                            "data": "domainKey",
                            "defaultContent": ''
                        },
                        {
                            "data": "ip",
                            "defaultContent": ''
                        }
                    ]
                });
            }
        })
    })
};