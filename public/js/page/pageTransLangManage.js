/**
 * Created by likeke on 2017/4/12.
 */
var pageTranslationLangManagement = pageTranslationLangManagement || {};

pageTranslationLangManagement.init = function () {
    try {
        imeWeb.initPageBox('TranslationLangManagement/transLangMag', [1]);
        pageTranslationLangManagement.dataInit();
        pageTranslationLangManagement.bindEventInit();
        pageTranslationLangManagement.globalInit();
    } catch (err) {
        console.log(err);
    } finally {
        imeWeb.i18n.init();
    }
};
pageTranslationLangManagement.mainTableDataInit = function (data) {
    $('#transLM_allChecked').removeAttr('checked');
    var transLM_mianTable = $('#transLM_mianTable');
    transLM_mianTable.dataTable({
        data: data,
        "destroy": true,
        //搜索框功能关闭
        "searching": false,
        //选择分页的个数功能关闭
        "bLengthChange": false,
        "order": [[1, "asc"]],
        //勾选框列和下拉框列禁止排序功能
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
        createdRow: function (row, data, dataIndex) {
            var tdIsNotCheckbox = $(row).children('td:gt(0)');
            console.log(tdIsNotCheckbox);
            tdIsNotCheckbox.addClass('transLM_willEditableTd');
        },

        "columns": [
            {
                "data": function () {
                    return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox" class="group-checkable transLM_checkBox"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
                }
            },
            {
                "data": "lang",
                "defaultContent": ''
            },
            {
                "data": "desc",
                "defaultContent": ''
            },
            {
                "data": "number",
                "defaultContent": ''
            }
        ]
    })
};

pageTranslationLangManagement.dataInit = function () {
    $.ajax({
        url: '/imeWeb/Services/translate/loadTranslationLangs',
        type: 'GET',
        data: {
            type: "source",
            _dc: new Date().getTime(),
            page: 1,
            start: 0,
            limit: 25
        },
        success: function (data) {
            pageTranslationLangManagement.mainTableDataInit(data.langs);
            pageTranslationLangManagement.globalInit();
        }
    })
};
pageTranslationLangManagement.globalInit = function () {
    pageTranslationLangManagement.bindEventInit.bindAfterDataLoad();
    imeWeb.tools.H_allChecked($('#transLM_allChecked'), $('.transLM_checkBox'));//全选功能开启
};
pageTranslationLangManagement.bindEventInit = function () {
    var transLM_createLangList = $('#transLM_createLangList');
    var transLM_transLangList = $('#transLM_transLangList');
    var transLM_addData = $('#transLM_addData');
    var transLM_deleteBtn = $('#transLM_deleteBtn');
    /*创作*/
    transLM_createLangList.bindOne('click', function () {
        pageTranslationLangManagement.dataInit();
    });
    /*翻译*/
    transLM_transLangList.bindOne('click', function () {
        $.ajax({
            url: '/imeWeb/Services/translate/loadTranslationLangs?type=target&_dc=1491986917385&page=1&start=0&limit=25',
            type: 'GET',
            data: {
                type: "target",
                _dc: new Date().getTime(),
                page: 1,
                start: 0,
                limit: 25
            },
            success: function (data) {
                pageTranslationLangManagement.mainTableDataInit(data.langs);
                pageTranslationLangManagement.globalInit();
            }
        })
    });
};

pageTranslationLangManagement.bindEventInit.bindAfterDataLoad = function () {
    /*添加功能*/
    imeWeb.tools.addRow(transLM_addData, $('#transLM_mianTable'), [''], function (e, d) {
        pageTranslationLangManagement.globalInit();
        // console.log(d);
    });
    /*删除功能*/
    imeWeb.tools.deleteCheckedRow($('#transLM_deleteBtn'), $("#transLM_mianTable"), $('.transLM_checkBox'));
    var transLM_willEditableTd = $('.transLM_willEditableTd');
    var transLM_save = $('#transLM_save');
    /*双击*/
    transLM_willEditableTd.bindOne('dblclick', function () {
        $(this).prop('contenteditable', true);
        $(this).focus();
    })
    /*保存*/
    transLM_save.bindOne('click', function () {
        var mianTableData = $('#transLM_mianTable').DataTable();
        // mianTableData.state.save();
        mianTableData.draw();
        console.log(mianTableData.data());

        // $.ajax({
        //     url:"/imeWeb/Services/translate/updateTranslateInfos",
        //     type:"POST",
        //     data:{
        //         recoreds:mianTableData.data(),
        //         type:mianTableData.data()[0].kindLang
        //     },
        //     success:function (data) {
        //         console.log(data);
        //     }
        // })
    })
};
