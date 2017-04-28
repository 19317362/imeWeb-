/**
 * Created by likeke on 2017/3/20.
 */
var pageHomeDoc = pageHomeDoc || {};

pageHomeDoc.init = function () {
    imeWeb.initPageBox();
    pageCommon.init();
    $('.page-content-wrapper').prepend(Handlebars.templates['homeDoc/homeDocContainer']([1]));
    imeWeb.i18n.init();
    // pageHomeDoc.dataInit();
    pageHomeDoc.homeDocInit();
};


//桌面文档初始化
pageHomeDoc.homeDocInit = function () {
    console.log("pageHomeDoc.homeDocInit");
    var homeDoc_dataBox = $('#homeDoc_dataBox');//表格
    var homeDoc_softtype = $('#homeDoc_softtype');//文档类型
    var homeDoc_container = $("#homeDoc_container");//存储库
    var homeDoc_search = $('#homeDoc_search');//搜索按钮

    /*主表格数据*/
    var lang = $.cookie("appLanguage");
    var mianTableData = function () {
        $("#homeDoc").dataTable({
            "ajax": {
                "url": "/imeWeb/Services/homeDoc/queryHomeDocs",
                "dataSrc": function (data) {
                    data_nameEscape(data);
                    for (var i = 0, l = data.length; i < l; i++) {
                        data[i].itemNum = data[i].id;
                    }
                    return data;
                }
            },
            //搜索框功能关闭
            "searching": false,
            //选择分页的个数功能开启
            "bLengthChange": true,
            "order": [[1, "asc"]],
            //勾选框列和下拉框列禁止排序功能
            "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
            "language": {
                "url": 'i18n/dataTable_' + lang + '.json'
            },
            createdRow: function (row, data, dataIndex) {
                /*            console.log(row);
                 console.log(dataIndex);
                 console.log(data);*/
                $(row).attr({'masterOid': data.masterOid,"oid": data.oid});
                $($(row).children()[1]).addClass('homeDoc_willEditable homeDoc_seqTd');
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
                    "data": "seq"
                },
                {
                    "data": "name"
                },
                {
                    "data": "itemNum"
                },
                {
                    "data": "created"
                }
            ],
            "fnInitComplete": g_callback
        });
    };
    mianTableData();


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

    /*DOM操作*/
    function g_callback() {
        console.log('g_callback');
        var homeDoc_resetSeq = $('#homeDoc_resetSeq');//重置序号
        var homeDoc_checkBox = $('.homeDoc_checkBox');//多选框
        var homeDoc_deleteBtn = $('#homeDoc_deleteBtn');//删除按钮
        var homeDoc_allChecked = $('#homeDoc_allChecked');//全选按钮
        var modal_allchecked=$('#modal_allChecked');//模态框1全选按钮
        var homeDoc_bodyCh = $('.homeDoc_bodyCh');//tbody中多选框
        var homeDoc_save = $('#homeDoc_save');//保存按钮
        var homeDoc_addData = $('#homeDoc_addData');//添加按钮
        var allIdTd = $('.homeDoc_idTd');//所有显示id的td
        var homeDoc_softtype = $('#homeDoc_softtype');//模态框_文档结构显示列表dataBOX
        var homeDoc_keyword = $('#homeDoc_keyword');//模态框关键字输入框
        var homeDoc_content = $('#homeDoc_content');//模态框内容输入框
        var homeDoc_begincreated = $('#homeDoc_begincreated');//模态框开始日期
        var homeDoc_endcreated = $('#homeDoc_endcreated');//模态框结束日期
        var homeDoc_creator = $('#homeDoc_creator');//模态框创建人
        var homeDoc_checkoutUser = $('#homeDoc_checkoutUser');//模态框检出人
        var homeDoc_containerInp = $('#homeDoc_containerInp');//模态框存储库输入框
        var homeDoc_softtypeInp = $('#homeDoc_softtypeInp');//模态框文档类型输入框
        var modalBtn_searchUser = $('.modalBtn_searchUser');//查找用户的模态框控制按钮
        var homeDoc_confChecked = $('#homeDoc_confChecked');//模态框确认所选用户的按钮
        var modal1_closeBtn = $('#modal1_closeBtn');//第一个模态框关闭
        var homeDoc_searchRes = $('#homeDoc_searchRes');//第一层模态框数据插入处
        /*重置序号点击事件*/
        homeDoc_resetSeq.click(function (e) {
            var homeDoc_willEditable = $('.homeDoc_willEditable');//将要变为可编辑的格子
            homeDoc_willEditable.attr('contenteditable', 'true');
            homeDoc_willEditable[0].focus();
        });
        /*复选框点击事件*/
        homeDoc_bodyCh.click(function (e) {
            document.getElementById('homeDoc_allChecked').checked = checkAll(document.getElementsByClassName('homeDoc_bodyCh'), 'checked');
        });
        /*保存按钮点击事件*/
        homeDoc_save.click(function (e) {
                allIdTd = $('.homeDoc_idTd');
                var postData = [];
                for (var i = 0, l = allIdTd.length; i < l; i++) {
                    var parent = $(allIdTd[i]).parent();
                    var idTd = $(allIdTd[i]).html();
                    var masterOid = parent.attr('masterOid');
                    var oid = parent.attr('oid');
                    var created = $(parent.children('.homeDoc_createdTd')[0]).html();
                    var name = $(parent.children('.homeDoc_nameTd')[0]).html();
                    console.log(name);
                    name = tounicode(name);
                    var seq = $(parent.children('.homeDoc_seqTd')[0]).html();
                    console.log(seq);
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
                $.post('/imeWeb/Services/homeDoc/addHomeDocs', {
                    docString: postData
                }, function (data) {

                    console.log(data);
                    if (data.success) {
                        mianTableData();
                    }
                })
            }
        );
        /*“添加”按钮点击事件*/
        homeDoc_addData.click(function (e) {
            homeDoc_searchRes.html('');//表格数据清空
            /*文档类型模板数据插入*/
            $.get('/imeWeb/Services/permission/getsofttype?_dc=1490154325992&page=1&start=0&limit=25', function (data) {
                loadTemp(homeDoc_softtype, 'homeDoc/softtype_datashow', data, 'html');
            });
            /*存储库模板数据插入*/
            $.get('/imeWeb/Services/container/getContainerByDomainid?showAll=1&_dc=1490155891310&page=1&start=0&limit=25', function (data) {
                loadTemp(homeDoc_container, 'homeDoc/container_datashow', data, 'html');
            })
        });
        /*模态框“搜索”按钮点击事件*/
        homeDoc_search.click(function (e) {
            var modifySearch = false, istemplate = false, fieldlist = '', number = '';//不明飞行物
            var checkoutUser = $(homeDoc_checkoutUser).val();
            var type = $(homeDoc_softtypeInp).val();//
            var title = $(homeDoc_keyword).val();
            var content = $(homeDoc_content).val();
            var containerid = $(homeDoc_containerInp).val() || "null";//
            var Principal = $(homeDoc_creator).val();
            var begincreated = $(homeDoc_begincreated).val() || "null";
            var endcreated = $(homeDoc_endcreated).val() || "null";

            /*模态框1数据显示*/
            $('#modal1_dataShow').dataTable({
                "ajax": {
                    "url": "/imeWeb/Services/folder/searchFile",
                    "data": {
                        checkoutUser: checkoutUser, /*检出人*/
                        modifySearch: modifySearch,
                        type: "", /*文档类型*/
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
                    "dataSrc": function (data) {
                        // data_nameEscape(data);
                        var Jdata = {
                            "total": "202",
                            "records": [{
                                "softtype": "sDitaReference",
                                "state": "编辑",
                                "softtypeTitle": "参照文档",
                                "version": "A.1",
                                "id": "com.imecms.doc.XMLDocument:50727",
                                "fileSize": "0 B",
                                "author": "徐丹红",
                                "filestatus": "",
                                "level": "i",
                                "created": "2017-03-15 12:12:35",
                                "oid": "com.imecms.doc.XMLDocument:50727",
                                "isFavorite": false,
                                "name": "各部件介绍",
                                "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47671'><i class='fa fa-file-code-o ditamap'><\/i><\/a>",
                                "number": "DTR047671",
                                "publishHTML": "N/A",
                                "IBA_title": "各部件介绍",
                                "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47671'><i  class='fa fa-file-code-o ditamap'><\/i><\/a>",
                                "modified": "2017-03-15 12:12:35",
                                "masterOid": "com.imecms.doc.XMLDocumentMaster:47671",
                                "modifierId": "xudanhong",
                                "creatorName": "徐丹红",
                                "publishResult": "",
                                "docDesc": "",
                                "deadline": "",
                                "comments": "dita"
                            }, {
                                "softtype": "sDitaReference",
                                "state": "编辑",
                                "softtypeTitle": "参照文档",
                                "version": "A.1",
                                "id": "com.imecms.doc.XMLDocument:50728",
                                "fileSize": "0 B",
                                "author": "徐丹红",
                                "filestatus": "",
                                "level": "i",
                                "created": "2017-03-15 12:12:35",
                                "oid": "com.imecms.doc.XMLDocument:50728",
                                "isFavorite": false,
                                "name": "铭牌及型号",
                                "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47672'><i class='fa fa-file-code-o ditamap'><\/i><\/a>",
                                "number": "DTR047672",
                                "publishHTML": "N/A",
                                "IBA_title": "铭牌及型号",
                                "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47672'><i  class='fa fa-file-code-o ditamap'><\/i><\/a>",
                                "modified": "2017-03-15 12:12:35",
                                "masterOid": "com.imecms.doc.XMLDocumentMaster:47672",
                                "modifierId": "xudanhong",
                                "creatorName": "徐丹红",
                                "publishResult": "",
                                "docDesc": "",
                                "deadline": "",
                                "comments": "dita"
                            }, {
                                "softtype": "sDitaTopic",
                                "state": "编辑",
                                "softtypeTitle": "主题文档",
                                "version": "A.1",
                                "id": "com.imecms.doc.XMLDocument:50730",
                                "fileSize": "0 B",
                                "author": "徐丹红",
                                "filestatus": "",
                                "level": "i",
                                "created": "2017-03-15 12:12:35",
                                "oid": "com.imecms.doc.XMLDocument:50730",
                                "isFavorite": false,
                                "name": "产品概述 ",
                                "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47674'><i class='fa fa-file-code-o ditamap'><\/i><\/a>",
                                "number": "DTO047674",
                                "publishHTML": "N/A",
                                "IBA_title": "产品概述 ",
                                "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47674'><i  class='fa fa-file-code-o ditamap'><\/i><\/a>",
                                "modified": "2017-03-15 12:12:35",
                                "masterOid": "com.imecms.doc.XMLDocumentMaster:47674",
                                "modifierId": "xudanhong",
                                "creatorName": "徐丹红",
                                "publishResult": "",
                                "docDesc": "",
                                "deadline": "",
                                "comments": "dita"
                            }, {
                                "softtype": "TempPDF",
                                "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124041'><i class='fa fa-file-pdf-o pdf'><\/i><\/a>",
                                "state": "定稿",
                                "number": "G124041",
                                "softtypeTitle": "TempPDF",
                                "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124041'><i  class='fa fa-file-pdf-o pdf'><\/i><\/a>",
                                "version": "A.1",
                                "modified": "2017-03-14 17:39:41",
                                "fileSize": "0 B",
                                "id": "com.imecms.doc.FileDocument:125467",
                                "filestatus": "",
                                "author": "徐丹红",
                                "masterOid": "com.imecms.doc.FileDocumentMaster:124041",
                                "level": "i",
                                "creatorName": "徐丹红",
                                "modifierId": "xudanhong",
                                "created": "2017-03-14 17:39:41",
                                "oid": "com.imecms.doc.FileDocument:125467",
                                "docDesc": "",
                                "name": "test 0314",
                                "isFavorite": false,
                                "deadline": "",
                                "IBA_plugin": "HighTech",
                                "comments": "pdf"
                            }, {
                                "softtype": "TempPDF",
                                "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124040'><i class='fa fa-file-pdf-o pdf'><\/i><\/a>",
                                "state": "定稿",
                                "number": "G124040",
                                "softtypeTitle": "TempPDF",
                                "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124040'><i  class='fa fa-file-pdf-o pdf'><\/i><\/a>",
                                "version": "A.1",
                                "modified": "2017-03-14 17:38:10",
                                "fileSize": "0 B",
                                "id": "com.imecms.doc.FileDocument:125466",
                                "filestatus": "",
                                "author": "徐丹红",
                                "masterOid": "com.imecms.doc.FileDocumentMaster:124040",
                                "level": "i",
                                "creatorName": "徐丹红",
                                "modifierId": "xudanhong",
                                "created": "2017-03-14 17:38:10",
                                "oid": "com.imecms.doc.FileDocument:125466",
                                "docDesc": "",
                                "name": "test 0314",
                                "isFavorite": false,
                                "deadline": "",
                                "IBA_plugin": "HighTech",
                                "comments": "pdf"
                            }]
                        };
                        for (var i = 0, l = Jdata.records.length; i < l; i++) {
                            var item = Jdata.records[i];
                            item.ItemNum = item.number;
                        }
                        return Jdata.records;
                    }
                },
                //搜索框功能关闭
                "searching": false,
                //选择分页的个数功能开启
                "bLengthChange": true,
                "order": [[1, "asc"]],
                //勾选框列和下拉框列禁止排序功能
                "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
                "language": {
                    "url": 'i18n/dataTable_' + lang + '.json'
                },
                createdRow: function (row, data, dataIndex) {
                    /*                    console.log(row);
                     console.log(dataIndex);
                     console.log(data);*/
                    $(row).attr({'masterOid': data.masterOid,"oid": data.oid});
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
                            return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable modal1_checkBox modal1_bodyCh modal_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
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
                "fnInitComplete":searchDocInit
            });
            function searchDocInit() {
                $('.modal_bodyCh').click(function () {
                    document.getElementById('modal_allChecked').checked = checkAll(document.getElementsByClassName('modal_bodyCh'), 'checked');
                })
            }


            /*            $.get('/imeWeb/Services/folder/searchFile', {
             checkoutUser: checkoutUser, /!*检出人*!/
             modifySearch: modifySearch,
             type: "", /!*文档类型*!/
             title: title, /!*关键字*!/
             content: content, /!*内容*!/
             containerid: containerid, /!*存储库id*!/
             istemplate: istemplate,
             Principal: Principal, /!*创建人*!/
             begincreated: begincreated, /!*开始日期*!/
             endcreated: endcreated, /!*结束日期*!/
             fieldlist: fieldlist,
             number: number,
             _dc: new Date().getTime(),
             start: 0,
             limit: 25,
             page: 1
             }, function (data) {
             console.log(data);
             /!*模拟数据*!/
             var Jdata = {
             "total": "202",
             "records": [{
             "softtype": "sDitaReference",
             "state": "编辑",
             "softtypeTitle": "参照文档",
             "version": "A.1",
             "id": "com.imecms.doc.XMLDocument:50727",
             "fileSize": "0 B",
             "author": "徐丹红",
             "filestatus": "",
             "level": "i",
             "created": "2017-03-15 12:12:35",
             "oid": "com.imecms.doc.XMLDocument:50727",
             "isFavorite": false,
             "name": "各部件介绍",
             "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47671'><i class='fa fa-file-code-o ditamap'><\/i><\/a>",
             "number": "DTR047671",
             "publishHTML": "N/A",
             "IBA_title": "各部件介绍",
             "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47671'><i  class='fa fa-file-code-o ditamap'><\/i><\/a>",
             "modified": "2017-03-15 12:12:35",
             "masterOid": "com.imecms.doc.XMLDocumentMaster:47671",
             "modifierId": "xudanhong",
             "creatorName": "徐丹红",
             "publishResult": "",
             "docDesc": "",
             "deadline": "",
             "comments": "dita"
             }, {
             "softtype": "sDitaReference",
             "state": "编辑",
             "softtypeTitle": "参照文档",
             "version": "A.1",
             "id": "com.imecms.doc.XMLDocument:50728",
             "fileSize": "0 B",
             "author": "徐丹红",
             "filestatus": "",
             "level": "i",
             "created": "2017-03-15 12:12:35",
             "oid": "com.imecms.doc.XMLDocument:50728",
             "isFavorite": false,
             "name": "铭牌及型号",
             "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47672'><i class='fa fa-file-code-o ditamap'><\/i><\/a>",
             "number": "DTR047672",
             "publishHTML": "N/A",
             "IBA_title": "铭牌及型号",
             "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47672'><i  class='fa fa-file-code-o ditamap'><\/i><\/a>",
             "modified": "2017-03-15 12:12:35",
             "masterOid": "com.imecms.doc.XMLDocumentMaster:47672",
             "modifierId": "xudanhong",
             "creatorName": "徐丹红",
             "publishResult": "",
             "docDesc": "",
             "deadline": "",
             "comments": "dita"
             }, {
             "softtype": "sDitaTopic",
             "state": "编辑",
             "softtypeTitle": "主题文档",
             "version": "A.1",
             "id": "com.imecms.doc.XMLDocument:50730",
             "fileSize": "0 B",
             "author": "徐丹红",
             "filestatus": "",
             "level": "i",
             "created": "2017-03-15 12:12:35",
             "oid": "com.imecms.doc.XMLDocument:50730",
             "isFavorite": false,
             "name": "产品概述 ",
             "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47674'><i class='fa fa-file-code-o ditamap'><\/i><\/a>",
             "number": "DTO047674",
             "publishHTML": "N/A",
             "IBA_title": "产品概述 ",
             "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.XMLDocumentMaster:47674'><i  class='fa fa-file-code-o ditamap'><\/i><\/a>",
             "modified": "2017-03-15 12:12:35",
             "masterOid": "com.imecms.doc.XMLDocumentMaster:47674",
             "modifierId": "xudanhong",
             "creatorName": "徐丹红",
             "publishResult": "",
             "docDesc": "",
             "deadline": "",
             "comments": "dita"
             }, {
             "softtype": "TempPDF",
             "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124041'><i class='fa fa-file-pdf-o pdf'><\/i><\/a>",
             "state": "定稿",
             "number": "G124041",
             "softtypeTitle": "TempPDF",
             "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124041'><i  class='fa fa-file-pdf-o pdf'><\/i><\/a>",
             "version": "A.1",
             "modified": "2017-03-14 17:39:41",
             "fileSize": "0 B",
             "id": "com.imecms.doc.FileDocument:125467",
             "filestatus": "",
             "author": "徐丹红",
             "masterOid": "com.imecms.doc.FileDocumentMaster:124041",
             "level": "i",
             "creatorName": "徐丹红",
             "modifierId": "xudanhong",
             "created": "2017-03-14 17:39:41",
             "oid": "com.imecms.doc.FileDocument:125467",
             "docDesc": "",
             "name": "test 0314",
             "isFavorite": false,
             "deadline": "",
             "IBA_plugin": "HighTech",
             "comments": "pdf"
             }, {
             "softtype": "TempPDF",
             "icon": "<a title='下载' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124040'><i class='fa fa-file-pdf-o pdf'><\/i><\/a>",
             "state": "定稿",
             "number": "G124040",
             "softtypeTitle": "TempPDF",
             "fileico": "<a title='下载 0 B' target='view_window' href='/imeWeb/jsp/util/downloadFile.jsp?oid=com.imecms.doc.FileDocumentMaster:124040'><i  class='fa fa-file-pdf-o pdf'><\/i><\/a>",
             "version": "A.1",
             "modified": "2017-03-14 17:38:10",
             "fileSize": "0 B",
             "id": "com.imecms.doc.FileDocument:125466",
             "filestatus": "",
             "author": "徐丹红",
             "masterOid": "com.imecms.doc.FileDocumentMaster:124040",
             "level": "i",
             "creatorName": "徐丹红",
             "modifierId": "xudanhong",
             "created": "2017-03-14 17:38:10",
             "oid": "com.imecms.doc.FileDocument:125466",
             "docDesc": "",
             "name": "test 0314",
             "isFavorite": false,
             "deadline": "",
             "IBA_plugin": "HighTech",
             "comments": "pdf"
             }]
             };
             for (var i = 0, l = Jdata.records.length; i < l; i++) {
             var item = Jdata.records[i];
             item.ItemNum = item.number;
             }
             loadTemp(homeDoc_searchRes, 'homeDoc/searchRes_datashow', Jdata.records);
             })*/
        });

        /*删除按钮点击事件*/
        homeDoc_deleteBtn.mousedown(function (e) {
            homeDoc_bodyCh = $('.homeDoc_bodyCh');
            var e = window.event || e;
            e.stopPropagation();
            homeDoc_bodyCh.each(function (v, ele) {
                console.log(ele.checked);
                if (ele.checked) {
                    $(ele).parent().parent().parent().remove();
                }
            })
        });

        /*第一层模态框确认所选用户按钮*/
        homeDoc_confChecked.click(function (e) {
            var modal1_bodyCh = $('.modal1_bodyCh');
            var hasLength = homeDoc_dataBox.children().length;
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
                        ItemNum: number,
                        name: name,
                        created: created
                    });
                }
            }
            loadTemp($('#homeDoc_dataBox'), 'homeDoc/table_datashow', data);
            modal1_closeBtn.click();
            var homeDoc_willEditable = $('.homeDoc_willEditable');
            homeDoc_willEditable.attr('contenteditable', 'true');
            $(homeDoc_willEditable[hasLength]).focus();
        });
        /*查找用户模态框控制按钮点击事件*/
        modalBtn_searchUser.click(function (e) {
            var _t = $(this);
            var data = {searchType: _t.attr('searchType')};
            console.log(_t.attr('searchType'));
            loadTemp($('#choseUserModal'), 'globalModule/modal_searchUser', data, 'html');
            Modal_searchUserInit();
            imeWeb.i18n.init();
        });
        /*查找用户模态框初始化*/
        function Modal_searchUserInit() {
            var homeDoc_searchUser = $('#homeDoc_searchUser');//搜索按钮
            var modal_searchUser_conform = $('#modal_searchUser_conform');//确认按钮
            var homeDoc_principalId = $('#homeDoc_principalId');//id输入框
            var homeDoc_searchName = $("#homeDoc_searchName");//名称输入框
            homeDoc_searchUser.click(function (e) {
                var principalId = homeDoc_principalId.val();
                var name = homeDoc_searchName.val();
                var usersDataShow=$('#usersDataShow');
                usersDataShow.dataTable({
                    "ajax": {
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
                        "dataSrc": ''
                    },
                    //搜索框功能关闭
                    "searching": false,
                    //选择分页的个数功能开启
                    "bLengthChange": true,
                    "order": [[1, "asc"]],
                    //勾选框列和下拉框列禁止排序功能
                    "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
                    "language": {
                        "url": 'i18n/dataTable_' + lang + '.json'
                    },
                    createdRow: function (row, data, dataIndex) {
                        /*                    console.log(row);
                         console.log(dataIndex);
                         console.log(data);*/
                        $(row).attr({"oid": data.oid});
                        $($(row).children()[0]).children().children().attr('agentid',data.principalId);
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
                            "data": ""
                        },
                        {
                            "data": "typeName"
                        }
                    ]
                });
                /*$.get('/imeWeb/Services/principal/searchPrincipal', {
                    type: "Users",
                    principalId: principalId,
                    name: name,
                    pool: undefined,
                    _dc: new Date().getTime(),
                    page: 1,
                    start: 0,
                    limit: 25
                }, function (data) {
                    console.log(data);
                    loadTemp($('#modal_searchUsersBox'), 'globalModule/modal_searchUser_showdate', data, 'html');
                    imeWeb.i18n.init();
                })*/
            });
            /*模态框确认按钮初始化*/
            modal_searchUser_conform.click(function (e) {
                var _t = $(this);
                var modal_searchUser_bodyCh = document.getElementsByClassName('modal_searchUser_bodyCh');
                for (var i = 0, l = modal_searchUser_bodyCh.length; i < l; i++) {
                    var _itm = modal_searchUser_bodyCh[i];
                    if (_itm.checked) {
                        var agentId = $(_itm).attr("agentid");
                        console.log(_t.attr('modal_searchType'));
                        switch (_t.attr('modal_searchType')) {
                            case 'creator':
                                homeDoc_creator.val(agentId);
                                break;
                            case 'checkoutUser':
                                console.log(_t.attr('modal_searchType'));
                                console.log(homeDoc_checkoutUser);
                                homeDoc_checkoutUser.val(agentId);
                                break;
                        }
                        $('#modal_searchUser_close').click();
                        return;
                    }
                }
            })
        }

        /*全选*/
        homeDoc_allChecked.click(function (e) {
            console.log('allchecked');
            homeDoc_bodyCh = $('.homeDoc_bodyCh');//tbody中多选框
            var _t = this;
            var allchecked = _t.checked;
            allchecked = ischecked(allchecked);
            homeDoc_bodyCh.each(function (v, e) {
                e.checked = allchecked;
                console.log(e.checked);
            })
        });
        modal_allchecked.click(function (e) {
            console.log('allchecked');
            modal_bodyCh = $('.modal_bodyCh');//tbody中多选框
            var _t = this;
            var allchecked = _t.checked;
            allchecked = ischecked(allchecked);
            modal_bodyCh.each(function (v, e) {
                e.checked = allchecked;
                console.log(e.checked);
            })
        });
        /*是否选中*/
        function ischecked(cc) {
            return !!cc ? true : false;
        }

        /*是否有未被选中的项*/
        function checkAll(eles, attr) {
            for (var i = 0, l = eles.length; i < l; i++) {
                if (!eles[i][attr]) {
                    return false;
                }
            }
            return true;
        }
    }
};
