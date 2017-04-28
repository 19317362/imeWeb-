/**
 * Created by likeke on 2017/3/20.
 */
var pageHomeDoc = pageHomeDoc || {};

pageHomeDoc.init = function () {
    try {
        imeWeb.initPageBox('homeDoc/homeDocContainer', [1]);
        pageHomeDoc.dataInit();
        pageHomeDoc.homeDocInit();
    } catch (err) {
        console.log(err);
    } finally {
        imeWeb.i18n.init();
    }
};
pageHomeDoc.dataInit = function () {

};
/*公用函数*/
/*click方法重写*/
$.fn.myClick = function (fn) {
    $(this).unbind('click').bind('click', fn);
};
$.fn.bindOne = function (eventName,fn) {
    $(this).unbind(eventName).bind(eventName, fn);
};
/*公用函数结束*/

// var pageBase2={
//     dataInit:function () {
//
//     }
// }

//桌面文档初始化
pageHomeDoc.homeDocInit = function () {
    var homeDoc_dataBox = $('#homeDoc_dataBox');//表格


    /*******************************************主表格数据初始化*****************************************************/
    var lang = $.cookie("appLanguage");
    var mianTableData = function (data) {
        data_nameEscape(data);
        for (var i = 0, l = data.length; i < l; i++) {
            data[i].itemNum = data[i].id;
        }
        $("#homeDoc").dataTable({
            data: data,
            "destroy": true,
            //搜索框功能关闭
            "searching": false,
            //选择分页的个数功能关闭
            "bLengthChange": false,
            "order": [[1, "asc"]],
            //勾选框列和下拉框列禁止排序功能
            "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
            "language": {
                "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
            },
            createdRow: function (row, data, dataIndex) {
                $(row).attr({'masterOid': data.masterOid, "oid": data.oid});
                $($(row).children()[1]).addClass('homeDoc_willEditable homeDoc_seqTd');
                $($(row).children()[1]).attr('tabIndex', '');
                $($(row).children()[2]).addClass('homeDoc_nameTd');
                $($(row).children()[3]).addClass('homeDoc_idTd');
                $($(row).children()[4]).addClass('homeDoc_createdTd');
            },
            "columns": [
                {
                    'data': function () {
                        return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
                    }
                },
                {
                    "data": "seq",
                    "defaultContent": ''
                },
                {
                    "data": "name",
                    "defaultContent": ''
                },
                {
                    "data": "itemNum",
                    "defaultContent": ''
                },
                {
                    "data": "created",
                    "defaultContent": ''
                }
            ],
            "fnInitComplete": g_callback
        });
    };
    /*主表格数据*/
    $.ajax({
        "url": "/imeWeb/Services/homeDoc/queryHomeDocs",
        "type": 'GET',
        "success": function (data) {
            mianTableData(data);
        }
    });

    /*******************************************DOM操作与数据插入*****************************************************/
    function g_callback() {
        imeWeb.i18n.init();
        var homeDoc_resetSeq = $('#homeDoc_resetSeq');//重置序号
        var homeDoc_checkBox = $('.homeDoc_checkBox');//多选框
        var homeDoc_deleteBtn = $('#homeDoc_deleteBtn');//删除按钮
        var homeDoc_bodyCh = $('.homeDoc_bodyCh');//tbody中多选框
        var homeDoc_save = $('#homeDoc_save');//保存按钮
        var homeDoc_addData = $('#homeDoc_addData');//添加按钮
        var allIdTd = $('.homeDoc_idTd');//所有显示id的td
        var homeDoc_allChecked = $('#homeDoc_allChecked');//全选按钮

        /*******************************事件绑定**********************************/
        /*重置序号点击事件*/
        var homeDoc_willEditable = $('.homeDoc_willEditable');//将要变为可编辑的格子
        homeDoc_resetSeq.myClick(function (e) {
            imeWeb.tools.globalAlert("#homeDoc_gAlert", "鼠标点击重置",'success');
            homeDoc_willEditable.attr('contenteditable', 'true');
        });
        /*可编辑单元格双击*/
        homeDoc_willEditable.dblclick(function (e) {
            $(this).attr('contenteditable', 'true');
            $(this).focus();
        });

        // H_allChecked($('#homeDoc_allChecked'),$('.homeDoc_bodyCh'));
        imeWeb.tools.H_allChecked($('#homeDoc_allChecked'),$('.homeDoc_bodyCh'));//全选功能
        /*x选中一行*/
        imeWeb.tools.checkedOneTr('#homeDoc');
        /*保存按钮点击事件*/
        homeDoc_save.myClick(function (e) {
                allIdTd = $('.homeDoc_idTd');
                var postData = [];
                for (var i = 0, l = allIdTd.length; i < l; i++) {
                    var parent = $(allIdTd[i]).parent();
                    var idTd = $(allIdTd[i]).html();
                    var masterOid = parent.attr('masterOid');
                    var oid = parent.attr('oid');
                    var created = $(parent.children('.homeDoc_createdTd')[0]).html();
                    var name = $(parent.children('.homeDoc_nameTd')[0]).html();
                    name = tounicode(name);
                    var seq = $(parent.children('.homeDoc_seqTd')[0]).html();
                    postData.push({
                        id: idTd,
                        masterOid: masterOid,
                        created: created,
                        oid: oid,
                        name: name,
                        seq: parseInt(seq)
                    });
                }
                postData = JSON.stringify(postData);
                $.ajax({
                    url:'/imeWeb/Services/homeDoc/addHomeDocs',
                    type:'POST',
                    async:false,
                    data:{
                        docString: postData
                    },
                    success:function (data) {
                        if (data.success) {
                            try {
                                $.ajax({
                                    "url": "/imeWeb/Services/homeDoc/queryHomeDocs",
                                    "type": 'GET',
                                    "async":false,
                                    "context": {
                                        refreshbutton: $('#homeDoc_save'),
                                        refresharea: $('#homeDoc_mainTable_loadding'),
                                        clickfunction: null
                                    },
                                    "success": function (data) {
                                        mianTableData(data);
                                        imeWeb.tools.globalAlert("#homeDoc_gAlert", "保存成功");
                                    }
                                });
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    }

                });
            }
        );
        /*“添加”按钮点击事件*/
        homeDoc_addData.myClick(function (e) {
            // imeWeb.deleteChildPage();
            /*添加模板*/
            imeWeb.createChildPage("homeDoc/child_addDoc", "page-content-base", "page-content-homeDoc");
            child_addDocInt();
        });
        /*删除按钮点击事件*/
        homeDoc_deleteBtn.mousedown(function (e) {
            if (checkAll(document.getElementsByClassName('homeDoc_bodyCh'), 'checked', "hasChecked")) {
                homeDoc_bodyCh = $('.homeDoc_bodyCh');
                var e = window.event || e;
                e.stopPropagation();
                homeDoc_bodyCh.each(function (v, ele) {
                    if (ele.checked) {
                        var mainTable = $("#homeDoc").DataTable();
                        mainTable.row($(ele).parent().parent().parent()).remove().draw();
                    }
                });
                imeWeb.tools.globalAlert('#homeDoc_gAlert','删除成功！','success');
            } else {
                imeWeb.tools.globalAlert("#homeDoc_gAlert", "请选择要删除的项!",'fail');
            }
        });
        /*第一层*/
        function child_addDocInt() {
            var modal_allchecked = $('#modal_allChecked');//模态框1全选按钮
            var homeDoc_softtype = $('#homeDoc_softtype');//模态框_文档结构显示列表dataBOX
            var homeDoc_keyword = $('#homeDoc_keyword');//模态框关键字输入框
            var homeDoc_content = $('#homeDoc_content');//模态框内容输入框
            var homeDoc_begincreated = $('#homeDoc_begincreated');//模态框开始日期
            var homeDoc_endcreated = $('#homeDoc_endcreated');//模态框结束日期
            var homeDoc_containerInp = $('#homeDoc_containerInp');//模态框存储库输入框
            var homeDoc_softtypeInp = $('#homeDoc_softtypeInp');//模态框文档类型输入框
            var homeDoc_confChecked = $('#homeDoc_confChecked');//模态框确认所选用户的按钮
            var homeDoc_searchRes = $('#homeDoc_searchRes');//第一层模态框数据插入处
            var homeDoc_softtype = $('#homeDoc_softtype');//文档类型
            var homeDoc_container = $("#homeDoc_container");//存储库
            var homeDoc_search = $('#homeDoc_search');//搜索按钮
            var homeDoc_drapDown_container = $('#homeDoc_drapDown_container');//村存储库下拉框
            var homeDoc_drapDown_softtype = $('#homeDoc_drapDown_softtype');
            homeDoc_searchRes.html('');//表格数据清空

            /*日期插件*/
            $('.date-picker').datepicker({
                format: 'yyyy-mm-dd',
                orientation: 'bottom'
            });

            /*文档类型模板数据插入*/
            homeDoc_drapDown_softtype.myClick(function (e) {
                $.get('/imeWeb/Services/permission/getsofttype?_dc=1490154325992&page=1&start=0&limit=25', function (data) {
                    loadTemp(homeDoc_softtype, 'homeDoc/softtype_datashow', data, 'html');
                    $('#homeDoc_softtype').bindOne('click',function () {
                        $('#homeDoc_softtypeInp').attr('u_type',$(this).attr('value'));
                    },'li')
                });
            });

            /*存储库模板数据插入*/
            homeDoc_drapDown_container.myClick(function (e) {
                $.get('/imeWeb/Services/container/getContainerByDomainid?showAll=1&_dc=1490155891310&page=1&start=0&limit=25', function (data) {
                    loadTemp(homeDoc_container, 'homeDoc/container_datashow', data, 'html');
                    $('#homeDoc_container').bindOne('click',function () {
                        $('#homeDoc_containerInp').attr('containerid',$(this).attr('containerid'));
                    },'li')
                });
            });



            /*第一层模态框确认所选用户按钮*/
            homeDoc_confChecked.myClick(function (e) {
                var modal1_bodyCh = $('.modal1_bodyCh');
                // var hasLength = homeDoc_dataBox.children().length;
                var data = [];
                for (var i = 0, l = modal1_bodyCh.length; i < l; i++) {
                    var item = $('.modal1_bodyCh')[i];
                    if (item.checked) {
                        var tr = $(item).parent().parent().parent();
                        var masterOid = tr.attr('masterOid');
                        var oid = tr.attr('oid');
                        var number = $(tr.children('.modal1_ItemNumTd')).html();
                        var name = $(tr.children('.modal1_nameTd')).html();
                        var created = $(tr.children('.modal1_createdTd')).html();
                        data.push({
                            masterOid: masterOid,
                            oid: oid,
                            itemNum: number,
                            name: name,
                            created: created
                        });
                    }
                }
                console.log(data);
                var mainTable = $("#homeDoc").DataTable();
                mainTable.rows.add(data).draw(false);
                var homeDoc_willEditable = $('.homeDoc_willEditable');
                homeDoc_willEditable.attr('contenteditable', 'true');
                imeWeb.deleteChildPage();
                imeWeb.tools.H_allChecked($('#homeDoc_allChecked'),$('.homeDoc_bodyCh'));//全选功能
            });
            /*模态框“搜索”按钮点击事件*/
            homeDoc_search.myClick(function (e) {
                console.log("search");
                var modifySearch = false, istemplate = false, fieldlist = '', number = '';//不明飞行物
                var checkoutUser = $("#homeDoc_checkoutUser").val();
                var type = ($(homeDoc_softtypeInp).val().replace(/\s+/g,'')!=''?$(homeDoc_softtypeInp).attr('u_type'):'');//
                var title = $(homeDoc_keyword).val();
                var content = $(homeDoc_content).val();
                var containerid = ($(homeDoc_containerInp).val().replace(/\s+/g,'')!=''? $(homeDoc_containerInp).attr('containerid') : "null");//
                var Principal = $("#homeDoc_creator").val();
                var begincreated = ($(homeDoc_begincreated).val()!=''?$(homeDoc_begincreated).val()+' 00:00:00' : "null");
                var endcreated = ($(homeDoc_endcreated).val()!=''?$(homeDoc_endcreated).val()+' 00:00:00' : "null");

                /*获取*/
                $.ajax({
                    url: "/imeWeb/Services/folder/searchFile",
                    type: 'GET',
                    "data": {
                        checkoutUser: checkoutUser, /*检出人*/
                        modifySearch: modifySearch,
                        type: type, /*文档类型*/
                        title: title, /*关键字*/
                        content: content, /*内容*/
                        containerid: containerid, /*存储库id*/
                        istemplate: istemplate,
                        Principal: Principal, /*创建人*/
                        begincreated: begincreated, /*开始日期*/
                        endcreated: endcreated, /*结束日期*/
                        fieldlist: fieldlist,
                        number: number,
                        _dc: new Date().getTime(),
                        start: 0,
                        limit: 25,
                        page: 1
                    },
                    context: {
                        refreshbutton: $('#homeDoc_search'),
                        refresharea: $('#homeDoc_searchRes_loadding'),
                        clickfunction: null
                    },
                    success: function (data) {
                        if(data.records){
                            modal1_datashowFn(data);
                        }
                    }
                })
                /*模态框1数据显示*/
                function modal1_datashowFn(data) {
                    //模拟数据(数据库为空)
                    for (var i = 0, l = data.records.length; i < l; i++) {
                        var item = data.records[i];
                        item.ItemNum = item.number;
                    }
                    $('#modal1_dataShow').dataTable({
                        data: data.records,
                        "destroy": true,
                        //搜索框功能关闭
                        "searching": false,
                        //选择分页的个数功能关闭
                        "bLengthChange": false,
                        "order": [[1, "asc"]],
                        //勾选框列和下拉框列禁止排序功能
                        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
                        "language": {
                            "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
                        },
                        createdRow: function (row, data, dataIndex) {
                            $(row).attr({'masterOid': data.masterOid, "oid": data.oid});
                            $($(row).children()[1]).addClass('modal1_ItemNumTd');
                            $($(row).children()[2]).addClass('modal1_nameTd');
                            $($(row).children()[3]).addClass('modal1_stateTd');
                            $($(row).children()[4]).addClass('modal1_createdTd');
                            $($(row).children()[4]).addClass('modal1_creatorNameTd');
                            $($(row).children()[4]).addClass('modal1_softtypeTitleTd');
                        },
                        "columns": [
                            {
                                'data': function () {
                                    return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox" class="group-checkable modal1_checkBox modal1_bodyCh modal_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
                                }
                            },
                            {
                                "data": "ItemNum"
                            },
                            {
                                "data": "name"
                            },
                            {
                                "data": "state"
                            },
                            {
                                "data": "created"
                            },
                            {
                                "data": "creatorName"
                            },
                            {
                                "data": "softtypeTitle"
                            }
                        ],
                        "fnInitComplete": searchDocInit
                    });
                }

                function searchDocInit() {
                    imeWeb.tools.H_allChecked($('#modal_allChecked'),$('.modal_bodyCh'));
                }
            });
            /*查找用户模态框控制按钮点击事件*/
            $('.modalBtn_searchUser').myClick(function (e) {
                var _t = $(this);
                // imeWeb.createChildPageHasId("homeDoc/child2_choseUser", "page-content-base2", "page-content-choseUser", _t.attr('searchType'));
                imeWeb.createChildPageHasId("siteManagement/child_addUser", "page-content-base2", "page-content-choseUser", _t.attr('searchType'));
                // var data = {searchType: _t.attr('searchType')};
                // loadTemp($('#choseUserModal'), 'globalModule/modal_searchUser', data, 'html');
                $(document).on('click', '#search_someone_search', search_someone_form);
                function search_someone_form() {
                    var type = 'Users';
                    var pool = undefined
                    var principalId = $('#search_someone_ID').val()
                    var name = $('#search_someone_name').val()
                    $.ajax({
                        url: "/imeWeb/Services/principal/searchPrincipal",
                        type: "GET",
                        context: {
                            refreshbutton: $('#search_someone_search'),
                            refresharea: $('#search_someone_refresharea')
                        },
                        data: {
                            type: type,
                            name: name,
                            principalId: principalId,
                            pool: pool,
                            start: 0,
                            limit: 25,
                            page: 1
                        },
                        success: function (data, status) {
                            pageHomeDoc.childPage_Init(data);
                            // pageWorkflowManagement.data_table_searchsomeone(data)
                        }
                    });

                    return false
                }

                // Modal_searchUserInit();
                imeWeb.i18n.init();
            });
            imeWeb.tools.H_allChecked($('#homeDoc_allChecked'),$('.homeDoc_bodyCh'));
        }

        /*查找用户模态框初始化*/
        function Modal_searchUserInit() {
            var homeDoc_searchUser = $('#homeDoc_searchUser');//搜索按钮
            var modal_searchUser_conform = $('#modal_searchUser_conform');//确认按钮
            var homeDoc_principalId = $('#homeDoc_principalId');//id输入框
            var homeDoc_searchName = $("#homeDoc_searchName");//名称输入框
            var homeDoc_creator = $('#homeDoc_creator');//模态框创建人
            var homeDoc_checkoutUser = $('#homeDoc_checkoutUser');//模态框检出人

            homeDoc_searchUser.myClick(function (e) {
                var principalId = homeDoc_principalId.val();
                var name = homeDoc_searchName.val();
                var usersDataShow = $('#usersDataShow');
                $.ajax({
                    "url": "/imeWeb/Services/principal/searchPrincipal",
                    "data": {
                        type: "Users",
                        principalId: principalId,
                        name: name,
                        pool: undefined,
                        _dc: new Date().getTime(),
                        page: 1,
                        start: 0,
                        limit: 25
                    },
                    context: {
                        refreshbutton: $('#homeDoc_searchUser'),
                        refresharea: $('#modal_searchUsersBox_loadding'),
                        clickfunction: null
                    },
                    success: function (data) {
                        usersDataShowFn(data);
                    }
                })
                function usersDataShowFn(data) {
                    usersDataShow.dataTable({
                        "destroy": true,
                        //搜索框功能关闭
                        "searching": false,
                        //选择分页的个数功能关闭
                        "bLengthChange": false,
                        "order": [[1, "asc"]],
                        //勾选框列和下拉框列禁止排序功能
                        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
                        "language": {
                            "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
                        },
                        data: data,
                        createdRow: function (row, data, dataIndex) {
                            $(row).attr({"oid": data.oid});
                            $($(row).children()[0]).children().children().attr('agentid', data.principalId);
                            $($(row).children()[1]).addClass('modal1_ItemNumTd');
                            $($(row).children()[2]).addClass('modal1_nameTd');
                            $($(row).children()[3]).addClass('modal1_stateTd');
                            $($(row).children()[4]).addClass('modal1_createdTd modal1_creatorNameTd modal1_softtypeTitleTd');
                        },
                        "columns": [
                            {
                                'data': function () {
                                    return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input name="modal_searchUser_radio"  type="radio"class="group-checkable homeDoc_checkBox modal_searchUser_bodyCh"data-set="#sample_1 .checkboxes"/> <span class="homeDoc_okIcon"></span> </label>'
                                }
                            },
                            {
                                "data": "principalId"
                            },
                            {
                                "data": "name"
                            },
                            {
                                "data": "",
                                "defaultContent": ''
                            },
                            {
                                "data": "typeName"
                            }
                        ]
                    });
                }

            });
            /*用户选择确认按钮初始化*/
            modal_searchUser_conform.myClick(function (e) {
                var _t = $(this);
                var modal_searchUser_bodyCh = document.getElementsByClassName('modal_searchUser_bodyCh');
                for (var i = 0, l = modal_searchUser_bodyCh.length; i < l; i++) {
                    var _itm = modal_searchUser_bodyCh[i];
                    if (_itm.checked) {
                        var agentId = $(_itm).attr("agentid");
                        switch (_t.attr('modal_searchType')) {
                            case 'creator':
                                homeDoc_creator.val(agentId);
                                break;
                            case 'checkoutUser':
                                homeDoc_checkoutUser.val(agentId);
                                break;
                        }
                    }
                }
                imeWeb.closeChildPage();
            })
        }
    }

    /*******************************************工具函数*****************************************************/
    /*是否有未被选中的项*/
    function checkAll(eles, attr, flag) {
        switch (flag) {
            case "allChecked":
                for (var i = 0, l = eles.length; i < l; i++) {
                    if (!eles[i][attr]||!$(eles[i]).prop(attr)) {
                        return false;
                    }
                }
                return true;//都选中了
            case "hasChecked":
                for (var ii = 0, ll = eles.length; ii < ll; ii++) {
                    if (eles[ii][attr]||$(eles[i]).prop(attr)) {
                        return true;
                    }
                }
                return false;//都选中了
        }

    }
    /*全选框功能结束*/

    /*根据数据加载表格模板*/
    function loadTemp(box, temp, data, method) {
        var met = method || 'append';
        data_nameEscape(data);
        box[met](Handlebars.templates[temp](data));
    }

    /*数据中name的编码处理*/
    function data_nameEscape(data) {
        for (var i = 0, l = data.length; i < l; i++) {
            if (data[i].name) {
                data[i].name = tohanzi(data[i].name);
            }
        }
    }

    /*中文转unicode*/
    function tounicode(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            res[i] = ( "00" + data.charCodeAt(i).toString(16) ).slice(-4);
        }
        return "\\u" + res.join("\\u");
    }

    /*unicode转中文*/
    function tohanzi(data) {
        str = data.replace(/\\/g, "%");
        return unescape(str);
    }

    /*全局弹出框*/
    function globalAlert(boxId, msg) {
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
pageHomeDoc.childPage_Init=function (data) {
    var table_searchsomeone = $('#search_someone').DataTable({
        data: data,
        columns: [
            {
                data: function () {
                    return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
                }
            },
            {data: 'type'},
            {data: 'principalId'},
            {data: 'name'},
            {
                data: function (source) {
                    return ''
                }
            },
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).addClass('radioBox');
        },
        "searching": false,
        'scrollY': 300,
        "destroy": true,
        "lengthChange": false,
        // info: false,
        "language": {
            "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
        },
        paging: false,
        scrollx: true,
        "columnDefs": [
            {"title": "", "targets": 0},
            {"title": "", "targets": 1},
            {"title": "Id", "targets": 2},
            {"title": "名称", "targets": 3},
            {"title": "描述", "targets": 4}
        ]

    });
    pageHomeDoc.confirmAndcancel(table_searchsomeone, '#search_someone_select', '#search_someone_cancel', '#search_someone_refresharea', '请选择对象', function (data) {
        console.log(data);
        // var pp=$('#siteMag_mainTable').DataTable();
        // pageSiteManagement.mainTableData.rows.add([{
        //     principalId: data.principalId,
        //     userName: data.name
        // }]).draw();
        switch ($('#search_someone_select').attr('modal_searchtype')){
            case 'creator':{
                $('#homeDoc_creator').val(data.principalId);
                break;
            }
            case 'checkoutUser':{
                $('#homeDoc_checkoutUser').val(data.principalId);
                break;
            }
        }
        // pageSiteManagement.globalInit(pageSiteManagement.mainTableData.data());
        // pageSiteManagement.bindEventInit();
        imeWeb.deleteChildPage()
    })
};
pageHomeDoc.confirmAndcancel= function (table, confirmbutton, cancelbutton, alertID, alertMsg, confirmcallback) {
    $(document).off('click', confirmbutton);
    $(document).off('click', cancelbutton);
    $(document).off('click', 'tr');
    //选中表格行
    $(document).on('click', '.radioBox', function () {
        try {
            $('tr').removeClass('selected').find("input[type='checkbox']").attr('checked', false)
            $(this).addClass('selected');
            var i = $(this).find("input[type='checkbox']")
            i[0].checked = true

        } catch (err) {
            return false

        }
    });
    //确认
    $(document).on('click', confirmbutton, function () {
        var data = table.row('.selected').data()
        if (data) {
            if (confirmcallback) confirmcallback(data)  //pageWorkflowManagement.searchsomeone_inputfrom.val(data.principalId)
            imeWeb.deleteChildPage()
        }
        else {
            imeWeb.Alert(alertID, alertMsg)
            //imeWeb.Alert('#search_someone_refresharea','请选择对象')
            return false
        }
    });
    //取消
    $(document).on('click', cancelbutton, function () {
        imeWeb.deleteChildPage()
    })
};
