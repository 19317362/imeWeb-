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
    /*主标哥*/
    pageTranslationLangManagement.mainTableData = transLM_mianTable.DataTable({
        data: data,
        "destroy": true,
        //搜索框功能关闭
        "searching": false,
        //选择分页的个数功能关闭
        "bLengthChange": false,
        "language": {
            "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
        },
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
        ],
        "fnInitComplete":pageTranslationLangManagement.bindEventInit.bindAfterDataLoad
    });
    // pageTranslationLangManagement.bindEventInit.bindAfterDataLoad();
};

pageTranslationLangManagement.dataInit = function () {
    $('#transLM_save').attr('sendType','source');
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
            // pageTranslationLangManagement.globalInit();
        }
    })
};
pageTranslationLangManagement.globalInit = function () {

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
        $('#transLM_save').attr('sendtype','target');
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
pageTranslationLangManagement.transLangListInit=function (data) {

}

pageTranslationLangManagement.bindEventInit.bindAfterDataLoad = function () {
    imeWeb.i18n.init();
    /*添加功能开启*/
    imeWeb.tools.addRow($('#transLM_addData'), pageTranslationLangManagement.mainTableData, [{
        lang: '',
        desc: '',
        number: ''
    }], function (e, d) {
        imeWeb.tools.globalAlert('#transLm_gAlert','请填写要添加的语言信息！','success');
        /*删除功能开启*/
        // window.setTimeout(function () {
        imeWeb.tools.deleteCheckedRow('#transLM_deleteBtn', pageTranslationLangManagement.mainTableData, $('.transLM_checkBox'),'#transLm_gAlert');
        // },0);
        imeWeb.tools.H_allChecked($('#transLM_allChecked'), $('.transLM_checkBox'));//全选功能开启
        // pageTranslationLangManagement.globalInit();
        // console.log(d);
    });
    /*删除功能开启*/
    // window.setTimeout(function () {
    imeWeb.tools.deleteCheckedRow('#transLM_deleteBtn', pageTranslationLangManagement.mainTableData, $('.transLM_checkBox'),'#transLm_gAlert');
    // },0);
    imeWeb.tools.H_allChecked($('#transLM_allChecked'), $('.transLM_checkBox'));//全选功能开启
    /*选中一行效果开启*/
    imeWeb.tools.checkedOneTr('#transLM_mianTable');

    var transLM_willEditableTd = $('.transLM_willEditableTd');
    var transLM_save = $('#transLM_save');
    /*双击*/
    $('#homeDoc_dataBox').bindOne('dblclick', function (e) {
        var e=e||window.event;
        e.stopPropagation();
        $(this).prop('contenteditable', true);
        $(this).focus();
    },'.transLM_willEditableTd');
    /*保存*/
    transLM_save.bindOne('click', function () {
        var Udata = imeWeb.tools.getAllTableData($('#transLM_mianTable'),['lang','desc','number'],{id:"ime.model.translationLang-"+(~~(Math.random()*11))})
        // var Udata=[{"kindLang":"source","desc":"ceshi","langId":"7b449453-b66c-4020-85be-32dbe0ed84e8","number":"CHN","lang":"lkkceshi","id":"ime.model.translationLang-1"},{"kindLang":"source","desc":"Chinese","langId":"9dfcfb81-857f-4430-bb49-5bbb12362a40","number":"CHN","lang":"en-US","id":"ime.model.translationLang-2"}]
        $.ajax({
            url: "/imeWeb/Services/translate/updateTranslateInfos",
            type: "POST",
            data: {
                recoreds: JSON.stringify(Udata),
                type:$(this).attr('sendType')
            },
            context: {
                refreshbutton: $('#transLM_save'),
                refresharea: $('#transLM_mainTable_loadding'),
                clickfunction: null
            },
            success: function (data) {
                console.log(data);
                if(data.success){
                    imeWeb.tools.globalAlert('#transLm_gAlert','保存成功','success');
                }else {
                    imeWeb.tools.globalAlert('#transLm_gAlert','保存失败','fail');
                    return;
                }
                pageTranslationLangManagement.mainTableDataInit(Udata);
            }
        })
    })
};
