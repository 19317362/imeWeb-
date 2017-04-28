/**
 * Created by likeke on 2017/4/13.
 */
var pageSiteManagement = pageSiteManagement || {};

pageSiteManagement.init = function () {
    try {
        imeWeb.initPageBox('siteManagement/siteManagement', [1]);
        pageSiteManagement.dataInit();
        pageSiteManagement.globalInit();
        pageSiteManagement.bindEventInit();
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
/*初始加载时dom事件*/
pageSiteManagement.bindEventInit = function () {
    var siteMag_addData = $('#siteMag_addData');
    var siteMag_deleteBtn=$('#siteMag_deleteBtn');
    siteMag_addData.bindOne('click', function (e) {
        /*添加模板*/
        imeWeb.createChildPage("siteManagement/child_addUser", "page-content-base", "page-content-siteMag");
        // pageSiteManagement.childPage_Init();
        /*搜索按钮*/
        $(document).on('click', '#search_someone_search', search_someone_form);
        console.log($('.siteMag_oneTr'));
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
                    pageSiteManagement.childPage_Init(data);
                    // pageWorkflowManagement.data_table_searchsomeone(data)
                }
            });

            return false
        }

    });
    /*删除用户*/
    siteMag_deleteBtn.bindOne('click',function (e) {
        // $.ajax({
        //     url:'',
        //     type:'POST',
        //     data:{
        //         user:pageSiteManagement.currentUser
        //     },
        //     success:function (data) {
        //
        //     }
        // })
    });
    /*tr的点击事件*/
    imeWeb.tools.checkedOneTr('#siteMag_mainTable',function (t) {
        $('#siteMag_powerItems').css('display','block');
        var principalId = $(t.children()[1]).text();
        $.ajax({
            url: "/imeWeb/Services/permission/getManagerTool",
            type: 'GET',
            data: {
                principalId: principalId,
                _dc: new Date().getTime()
            },
            success: function (data) {
                pageSiteManagement.currentUser=$(t.children('td')[1]).text();
                for (var i = 0, l = data.length; i < l; i++) {
                    var checkBox=$('.jurisdiction_checkBox[name='+data[i].name+']');
                    if (data[i].check == true) {
                        checkBox[0].checked=true;
                        // checkBox.attr('checked', true);
                    } else {
                        checkBox[0].checked=false;
                        // checkBox.attr('checked', false);
                    }
                }
            }
        })
    });

    /*权限修改后确认按钮点击*/
    $('#siteMag_confirmBtn').bindOne('click',function () {
        var permission='';
        var checkBox=$('.jurisdiction_checkBox');
        for(var i=0,l=checkBox.length;i<l;i++){
            if(checkBox[i].checked){
                permission+=$(checkBox[i]).attr('name')+";";
            }
        }
        var data={
            user:pageSiteManagement.currentUser,
            permission:permission
        };
        data=JSON.stringify(data);
        data={
            data:data
        };
        $.ajax({
            url:'/imeWeb/Services/permission/addSystemUser',
            type:'POST',
            data:data,
            success:function (data) {
                console.log(data);
                if(data.success){
                    imeWeb.tools.globalAlert('#siteMag_gAlert','保存成功!','success');
                }else {
                    imeWeb.tools.globalAlert('#siteMag_gAlert','保存失败!','fail');
                }
            },
            error:function (err) {
                imeWeb.tools.globalAlert('#siteMag_gAlert','服务端错误!'+err,'fail');
            }
        })
    })
};

/*子页面append完成*/
pageSiteManagement.childPage_Init = function (data) {

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
        "lengthChange": true,
        "language": {
            "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
        },
        // info: false,
        paging: false,
        scrollx: true

    });
    pageSiteManagement.confirmAndcancel(table_searchsomeone, '#search_someone_select', '#search_someone_cancel', '#search_someone_refresharea', '请选择对象', function (data) {
        // console.log(data);
        console.log(imeWeb.tools.checkRepeat(pageSiteManagement.mainTableData,'principalId',data.principalId));
        if(imeWeb.tools.checkRepeat(pageSiteManagement.mainTableData,'principalId',data.principalId)){
            imeWeb.tools.globalAlert('#siteMag_gAlert','该用户已经是管理员，不能重复添加！','fail');
            return;
        }
        // var pp=$('#siteMag_mainTable').DataTable();
        pageSiteManagement.mainTableData.rows.add([{
            principalId: data.principalId,
            userName: data.name
        }]).draw();
        pageSiteManagement.globalInit(pageSiteManagement.mainTableData.data());
        // pageSiteManagement.bindEventInit();
        imeWeb.closeChildPage();
        imeWeb.tools.globalAlert('#siteMag_gAlert','添加成功，请为该成员分配权限!','success');
    })
};
/*数据加载完成*/
pageSiteManagement.globalInit = function (data) {
    var siteMag_mainTable = $('#siteMag_mainTable');
    pageSiteManagement.currentUser='';
    pageSiteManagement.mainTableData = siteMag_mainTable.DataTable({
        data: data,
        "destroy": true,
        //搜索框功能关闭
        "searching": false,
        //选择分页的个数功能关闭
        "bLengthChange": false,
        // "language": {
        //     "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
        // },
        "order": [[1, "asc"]],
        //勾选框列和下拉框列禁止排序功能
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
        createdRow: function (row, data, dataIndex) {
            var tdIsNotCheckbox = $(row).children('td:gt(0)');
            // console.log(tdIsNotCheckbox);
            tdIsNotCheckbox.addClass('transLM_willEditableTd');
            $(row).addClass('siteMag_oneTr');
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
    imeWeb.tools.deleteCheckedRow($('#siteMag_deleteBtn'), pageSiteManagement.mainTableData, $('.siteMag_checkBox'),'#siteMag_gAlert');//启用删除功能

    pageSiteManagement.bindEventInit();

};
pageSiteManagement.afterLoadData = function () {

    // console.log($('.siteMag_checkBox').length);
    // console.log('开启全选')
};
/*确认添加*/
pageSiteManagement.confirmAndcancel = function (table, confirmbutton, cancelbutton, alertID, alertMsg, confirmcallback) {
    $(document).off('click', confirmbutton);
    $(document).off('click', cancelbutton);
    $(document).off('click', 'tr');
    //选中表格行
    $(document).on('click', '.radioBox', function () {
        try {
            $('.radioBox').removeClass('selected').find("input[type='checkbox']").attr('checked', false)
            $(this).addClass('selected');
            var i = $(this).find("input[type='checkbox']");
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
