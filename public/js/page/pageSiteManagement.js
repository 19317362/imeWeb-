/**
 * Created by likeke on 2017/4/13.
 */
var pageSiteManagement = pageSiteManagement || {};

pageSiteManagement.init = function () {
    try {
        imeWeb.initPageBox('siteManagement/siteManagement', [1]);
        pageSiteManagement.dataInit();
        pageSiteManagement.bindEventInit();
        pageSiteManagement.globalInit();
    } catch (err) {
        console.log(err);
    } finally {
        imeWeb.i18n.init();
    }
};
pageSiteManagement.dataInit = function () {
    $.ajax({
        url: '/imeWeb/Services/permission/showAllManager',
        type: 'GET',
        data: {
            _dc: new Date().getTime(),
            page: 1,
            start: 0,
            limit: 25
        },
        success: function (data) {
            // console.log(data);
            pageSiteManagement.globalInit(data);
        }
    })
};
pageSiteManagement.bindEventInit = function () {

};
pageSiteManagement.globalInit = function (data) {
    var siteMag_mainTable = $('#siteMag_mainTable');
    siteMag_mainTable.dataTable({
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

        },
        "columns": [
            {
                "data": function () {
                    return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox" class="group-checkable siteMag_checkBox"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
                }
            },
            {
                "data": "principalId",
                "defaultContent": ''
            },
            {
                "data": "userName",
                "defaultContent": ''
            }
        ],
        "fnInitComplete": pageSiteManagement.afterLoadData()
    });
    imeWeb.tools.H_allChecked($('#siteMag_allChecked'), $('.siteMag_checkBox'));//启用全选反选功能
    imeWeb.tools.deleteCheckedRow($('#siteMag_deleteBtn'), $('#siteMag_mainTable'), $('.siteMag_checkBox'));//启用删除功能
    //启用添加功能
    imeWeb.tools.addRow($('#siteMag_addData'), $('#siteMag_mainTable'), [''], function (e, d) {
        pageSiteManagement.globalInit();
        // console.log(d);
    });

};
pageSiteManagement.afterLoadData = function () {
    // console.log($('.siteMag_checkBox').length);
    // console.log('开启全选')
};