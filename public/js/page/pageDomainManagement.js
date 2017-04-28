/**
 * Created by likeke on 2017/4/17.
 */
var pageDomainManagement = pageDomainManagement || {};

pageDomainManagement.init = function () {
    try {
        imeWeb.initPageBox('domainManagement/siteMag', [1]);
        pageDomainManagement.dataInit();
        // pageDomainManagement.globalInit();
        // pageDomainManagement.bindEventInit();

    } catch (err) {
        console.log(err);
    } finally {
        imeWeb.i18n.init();
    }
};

pageDomainManagement.dataInit = function () {
    $.ajax({
        url: '/imeWeb/Services/domain/getAllDomain',
        type: 'GET',
        data: {
            _dc: new Date().getTime(),
            page: 1,
            start: 0,
            limit: 25
        },
        success: function (data) {
            console.log(data);
            pageDomainManagement.globalInit(data);
        }
    })

};
var pageBase1={
    dataInit:function () {

    }
}

pageDomainManagement.globalInit = function (data) {
    pageDomainManagement.mainTableData = $('#siteMag_mainTable').DataTable({
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
        createdRow: function (row, data, dataIndex) {
            var tdIsNotCheckbox = $(row).children('td:gt(0)');
            // console.log(tdIsNotCheckbox);
            tdIsNotCheckbox.addClass('transLM_willEditableTd');
            $(row).addClass('siteMag_oneTr');
            $(row).attr('addWindowdomainid', data.oid);
            $(row).attr('isDirty', false);
        },
        "columns": [
            {
                "data": 'domainkey',
                "defaultContent": ''
            },
            {
                "data": "domainname",
                "defaultContent": ''
            },
            {
                "data": "domaindesc",
                "defaultContent": ''
            },
            {
                "data": "domaintype",
                "defaultContent": ''
            },
            {
                "data": "domainIsAvailable",
                "defaultContent": ''
            }
        ],
        "fnInitComplete":pageDomainManagement.bindEventInit
});
    /*启用添加功能*/
    // imeWeb.tools.addRow($('#siteMag_addData'), pageDomainManagement.mainTableData, [{
    //     domainkey: '双击可编辑',
    //     domainname: '',
    //     domaindesc: '',
    //     domaintype: '',
    //     domainIsAvailable: ''
    // }], function (e, d) {
    //     $('#siteMag_mainTable').children('tbody').children('tr:eq(0)').attr('isAdd', true);
    //     $('#siteMag_mainTable').children('tbody').children('tr:eq(0)').attr('contenteditable', true);
    //     imeWeb.tools.globalAlert('#siteMag_gAlert', '请填写要添加的站点信息！', 'success');
    //     pageDomainManagement.bindEventInit();
    // });
    /*添加站点*/
    $('#siteMag_addData').bindOne('click',function () {
        imeWeb.createChildPage("domainManagement/addSite", "page-content-base", "page-content-addSite");
        /*确定按钮i*/
        $('#addSite_confirmBtn').bindOne('click',function () {
            var id=$('#addSite_containerid').val(),
                name=$('#addSite_containername').val(),
                type=$('#addSite_containertype').val(),
                desc=$('#addSite_containerdesc').val(),
                domain_state=$('.add_containerStatus:checked').val();
            /*查重*/
            $.ajax({
                url:'/imeWeb/Services/domain/domainDataIsRepeat',
                type:'GET',
                data:{
                    key:id,
                    name:name,
                    _dc:new Date().getTime()
                },
                success:function (data) {
                    if(data.success){
                        //添加数据
                        addDataToDB();
                        imeWeb.deleteChildPage();
                    }else {
                        imeWeb.tools.globalAlert('#addSite_alert','改站点已存在','fail');
                    }
                },
                error:function (data) {
                    imeWeb.tools.globalAlert('#addSite_alert','服务端错误！','fail');
                }
            });


            /*添加站点到数据库*/
            function addDataToDB() {
                $.ajax({
                    url:'/imeWeb/Services/domain/addDomain',
                    type:'POST',
                    data:{
                        adddomainkey:id,
                        adddomainname:name,
                        adddomaintype:type,
                        adddomaindesc:desc,
                        addWindowdomainid:'',
                        "addWindowSubmittype-inputEl":'add',
                        domain_state:domain_state
                    },
                    success:function (Udata) {
                        console.log(Udata);
                        if(Udata.success){
                            /*刷新表格数据*/
                            $.ajax({
                                url: '/imeWeb/Services/domain/getAllDomain',
                                type: 'GET',
                                data: {
                                    _dc: new Date().getTime(),
                                    page: 1,
                                    start: 0,
                                    limit: 25
                                },
                                success: function (data) {
                                    console.log(data);
                                    pageDomainManagement.globalInit(data);
                                }
                            });
                            imeWeb.tools.globalAlert('#siteMag_gAlert','站点添加成功','success');
                        }
                    }
                })
            }
        })
    });


};
pageDomainManagement.bindEventInit = function () {
    imeWeb.i18n.init();
    var transLM_willEditableTd = $('.transLM_willEditableTd');
    var siteMag_saveData = $('#siteMag_saveData');
    var siteMag_editBtn=$('#siteMag_editBtn');
    var siteMag_disableBtn=$('#siteMag_disableBtn');
    /*双击*/
    transLM_willEditableTd.bindOne('dblclick', function (e) {
        if (pageDomainManagement.dirtyTr != null && $(this).parent().attr('isdirty') != 'true') {
            imeWeb.tools.globalAlert('#siteMag_gAlert', '每次只能修改一条数据', 'fail');
            return;
        }
        var e = e || window.event;
        e.stopPropagation();
        $(this).prop('contenteditable', true);
        $(this).focus();
    });
    /*tr的点击事件*/
    // $('.siteMag_oneTr').on('click', function () {
    //     var _t = $(this);
    //     // console.log(1110);
    //     // $('#siteMag_powerItems').css('display','block');
    //     _t.siblings().removeClass('selected');
    //     _t.addClass('selected');
    //     _t.children('td:eq(1)').removeClass('sorting_1');
    // });
    /*启用浮动按钮*/
    imeWeb.tools.floatBox('#siteMag_mainTable','管理该站点',function (table,div,currentTr) {
        /*查看站点详细信息*/
        $(div).bindOne('click',function (e) {
            imeWeb.createChildPage("domainManagement/siteDetails", "page-content-base", "page-content-siteManag");
            pageDomainManagement.childPage_init(currentTr);
            $(this).hide();
        })
    },{
        cursor:'pointer',
        "max-width":'13rem',
        'overflow':'hidden',
        'text-overflow':'ellipsis',
        'white-space':'nowrap',
        "border":'none'
    });
    /*启用选中一行效果*/
    imeWeb.tools.checkedOneTr('#siteMag_mainTable');
    /*数据变脏*/
    $('.transLM_willEditableTd').on('input', function () {
        console.log(pageDomainManagement.dirtyTr);
        if (pageDomainManagement.dirtyTr != null && $(this).parent().attr('isdirty') != 'true') {
            imeWeb.tools.globalAlert('#siteMag_gAlert', '每次只能添加或修改一条数据', 'fail');
            return;
        }
        // console.log('tdChange');
        $(this).parent().attr('isDirty', true);
        pageDomainManagement.dirtyTr = $(this).parent();
    });
    /*保存修改*/
    siteMag_saveData.bindOne('click', function () {
        var dirtyTr = pageDomainManagement.dirtyTr;
        if (dirtyTr == null) {
            imeWeb.tools.globalAlert('#siteMag_gAlert', '没有修改任何数据', 'fail');
            return;
        }
        /*查重*/
        $.ajax({
            url:'/imeWeb/Services/domain/domainDataIsRepeat',
            type:'GET',
            data:{
                key:$(dirtyTr).children('td:eq(0)').text(),
                name:$(dirtyTr).children('td:eq(1)').text(),
                _dc:new Date().getTime()
            },
            success:function (data) {
                if(data.success){
                    //添加数据
                    editDataToDB();
                }else {
                    imeWeb.tools.globalAlert('#siteMag_gAlert','您所输入的id或名称已存在','fail');
                }
            },
            error:function (err) {
                imeWeb.tools.globalAlert('#siteMag_gAlert','服务端错误'+err,'fail');
            }
        });
        function editDataToDB() {
            $.ajax({
                url: (dirtyTr.attr('isAdd') == 'true' ? '/imeWeb/Services/domain/addDomain' : '/imeWeb/Services/domain/updateDomain'),
                type: 'POST',
                data: {
                    adddomainkey: $(dirtyTr).children('td:eq(0)').text(),
                    adddomainname: $(dirtyTr).children('td:eq(1)').text(),
                    adddomaintype: $(dirtyTr).children('td:eq(3)').text(),
                    adddomaindesc: $(dirtyTr).children('td:eq(2)').text(),
                    addWindowdomainid: $(dirtyTr).attr('addWindowdomainid'),
                    "addWindowSubmittype-inputEl": 'update',
                    domain_state: ($(dirtyTr).children('td:eq(4)').text() == '启用' ? 1 : 0)
                },
                success: function (data) {
                    console.log(data);
                    if(data.success){
                        imeWeb.tools.globalAlert('#siteMag_gAlert','保存成功！','success');
                    }else{
                        imeWeb.tools.globalAlert('#siteMag_gAlert','保存失败！','fail');
                    }
                }
            })
        }
    });
    /*编辑站点*/
    siteMag_editBtn.bindOne('click',function () {
        imeWeb.tools.globalAlert('#siteMag_gAlert','双击单元格可编辑！');
    });
    /*禁用站点*/
    siteMag_disableBtn.bindOne('click',function () {
        var theTr=$('#siteMag_dataBox').children('tr.selected');
        console.log(theTr.length);
        if(theTr.length==0){
            imeWeb.tools.globalAlert('#siteMag_gAlert','请先选中一行！','fail');
            return;
        }
        $.ajax({
            url:'/imeWeb/Services/domain/removeDomianById',
            type:'GET',
            data:{
                domainid:theTr.attr('addwindowdomainid'),
                _dc:new Date().getTime()
            },
            success:function (data) {
                console.log(data);
                if(data.success){
                    imeWeb.tools.globalAlert('#siteMag_gAlert','禁用成功！','success');
                    theTr.children('td:eq(4)').text('禁用');
                }else{
                    imeWeb.tools.globalAlert('#siteMag_gAlert','禁用失败！','fail');
                }
            },
            error:function (err) {
                imeWeb.tools.globalAlert('#siteMag_gAlert','服务端错误！'+err,'fail');
            }
        })
    })
};
pageDomainManagement.childPage_init=function (currentTr) {
    var addwindowdomainid=$(currentTr).attr('addwindowdomainid');
    var siteDetail_addData=$('#siteDetail_addData');
    $('#container_memberList').attr('addwindowdomainid',addwindowdomainid);
    // console.log(currentTr);
    $.ajax({
        url:'/imeWeb/Services/principal/getUserByDomian',
        type:'GET',
        data:{
            domainid:$(currentTr).attr('addwindowdomainid'),
            _dc:new Date().getTime(),
            page:1,
            start:0,
            limit:25
        },
        success:function (data) {
            console.log(data);
            pageDomainManagement.childDataTable_userInfo=$('#container_memberList').DataTable({
                data:data,
                createdRow: function (row, data, dataIndex) {
                    $(row).attr('userid',data.oid);
                    $(row).attr('addwindowdomainid',addwindowdomainid);
                },
                "searching": false,
                'scrollY': 300,
                "destroy": true,
                "lengthChange": false,
                "order": [[1, "asc"]],
                //勾选框列和下拉框列禁止排序功能
                "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
                info: false,
                "language": {
                    "url": 'i18n/dataTable_'+ $.cookie("appLanguage") +'.json'
                },
                paging: false,
                scrollx: true,
                "columnDefs": [
                    {"title":'',"targets":0},
                    {"title": "ID", "targets": 1},
                    {"title": "名称", "targets": 2}
                ],
                "columns":[
                    {
                        "data":function () {
                            return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="radio" name="sitaManage_radio" class="group-checkable siteMange_chackBox"/> <span></span> </label>'
                        },
                        "defaultContent": ''
                    },
                    {
                        "data": "userPid",
                        "defaultContent": ''
                    },
                    {
                        "data": "username",
                        "defaultContent": ''
                    }
                ]
            });
            /*删除出功能*/
            imeWeb.tools.deleteCheckedRow($('#siteDetail_delete'),pageDomainManagement.childDataTable_userInfo,$('.siteMange_chackBox'),$('#siteManage_gAlert'),function (ele) {
                var res=true;
                $.ajax({
                    url:'/imeWeb/Services/domain/removeDomainUser',
                    type:'GET',
                    async:false,
                    data:{
                        domainid:$(ele).attr('addwindowdomainid'),
                        userid:$(ele).attr('userid'),
                        _dc:new Date().getTime()
                    },
                    success:function (data) {
                        if(!data.success){
                            res=false;
                        }
                    }
                });
                return res;
            });//启用删除功能
        }
    });
    /*添加用户*/
    siteDetail_addData.bindOne('click', function (e) {
        console.log('addbtnbind');
        /*添加模板*/
        imeWeb.createChildPage("domainManagement/child_addUser", "page-content-base1", "page-content-siteMange1");
        // pageSiteManagement.childPage_Init();
        /*搜索按钮*/
        $(document).on('click', '#search_someone_search', search_someone_form);
        function search_someone_form() {
            var type = 'Users';
            var pool = undefined;
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
                    pageDomainManagement.childPageSearchUser_Init(data);
                    // pageWorkflowManagement.data_table_searchsomeone(data)
                }
            });

            return false
        }

    });
    /*下一步*/
    $(document).on('click',"#siteManage_nextBtn",function(){
        console.log(1111);
        $('#tab1').removeClass('active');
        $('#tab2').addClass('active');
        $('#nav_tab1').removeClass('active');
        $('#nav_tab2').addClass('active');
        //载入存储库数据
        var url = '/imeWeb/Services/container/getContainerByDomain';
        $.ajax({
            url:url,
            type:'GET',
            data:{
                domainid:$('#container_memberList').attr('addwindowdomainid'),
                _dc:new Date().getTime(),
                page:1,
                start:0,
                limit:25
            },
            success:function (data) {
                pageDomainManagement.childPageContainerInfo_Init(data);
            }
        });
    })
};
/*存储库信息展示*/
pageDomainManagement.childPageContainerInfo_Init=function (data) {
    var siteManage_addContainer=$('#siteManage_addContainer');
    pageDomainManagement.childDataTable_containerInfo=$('#container_rightList').DataTable({
        searching:false, //去掉搜索框
        bLengthChange:false,//去掉每页多少条框体
        "language": {
            "info": "显示 _START_ 到 _END_ 条,总共 _TOTAL_ 条", // 表格左下角显示的文字
            "paginate": {
                "previous": "上一页",
                "next": "下一页"
            }
        },
        "aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
        "order": [[ 0, "desc" ]],
        destroy:true,
        data : data,
        createdRow: function (row, data, dataIndex) {
            $(row).attr('isChecked',false);
        },
        "columns": [
            {data: "containerid","defaultContent": ''},
            {data: "containername","defaultContent": ''},
            {data: "containerdesc","defaultContent": ''},
            {data: "containerisAvailable","defaultContent": ''}
        ]
    });
    /*添加存储库*/
    siteManage_addContainer.bindOne('click',function () {
        // imeWeb.createChildPage('domainManagement/addOreditContainer','')
        // imeWeb.createChildPage("domainManagement/addOreditContainer", "page-content-base1", "page-content-siteManag2");
        imeWeb.createChildPageHasId("domainManagement/addOreditContainer", "page-content-base1", "page-content-siteManag2",{id:'t_addContainer'});
        /*添加存储库确定按钮*/
        $('#t_addContainer').bindOne('click',function () {
            $.ajax({
                url:'/imeWeb/Services/container/addContainer',
                type:'POST',
                data:{
                    containername:$('#containername').val(),
                    containerdesc:$('#containerdesc').val(),
                    addWindowdomainid:$('#container_memberList').attr('addwindowdomainid'),
                    addWindowcontainerid:'',
                    container_status:$('.siteMag_containerStatus:checked').val()
                },
                success:function (data) {
                    console.log(data);
                    if (data.success){
                        imeWeb.tools.globalAlert($('#siteManage_gAlert'),'添加存储库成功','success');
                        pageDomainManagement.childDataTable_containerInfo.rows.add([{
                            containerid: data.oid,
                            containername: $('#containername').val(),
                            containerdesc:$('#containerdesc').val(),
                            containerisAvailable:($('.siteMag_containerStatus:checked').val()=='1'? '启用':'禁用')
                        }]).draw();
                        imeWeb.deleteChildPage();
                    }else {
                        imeWeb.tools.globalAlert($('#siteManage_gAlert'),'添加存储库失败','fail');
                    }
                },
                error:function (err) {
                    imeWeb.tools.globalAlert('#siteManage_gAlert','服务端错误'+err,'fail');
                }
            })
        })
    });
    $('tr[ischecked]').bindOne('click',function () {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        $(this).children('td:eq(0)').removeClass('sorting_1');
        pageDomainManagement.childContainerInfoHasCheckedTr=$(this);
    });
    /*禁用存储库*/
    $('#siteManage_deleteContainer').bindOne('click',function () {
        if(!pageDomainManagement.childContainerInfoHasCheckedTr){
            imeWeb.tools.globalAlert('#editContainer_alert','请先选择一个存储库','fail');
            return;
        }
        $.ajax({
            url:'/imeWeb/Services/container/removeDomainContainer',
            type:'GET',
            data:{
                domainid:$('#container_memberList').attr('addwindowdomainid'),
                containerid:pageDomainManagement.childContainerInfoHasCheckedTr.children('td:first').text(),
                _dc:new Date().getTime()
            },
            success:function (data) {
                console.log(data);
                if(data.success){
                    pageDomainManagement.childContainerInfoHasCheckedTr.children('td:last').text('禁用');
                    imeWeb.tools.globalAlert('#')
                }
            }
        })
    })
    /*编辑存储库*/
    $('#siteManage_editContainer').bindOne('click',function () {
        if(!pageDomainManagement.childContainerInfoHasCheckedTr){
            imeWeb.tools.globalAlert('#editContainer_alert','请先选择一个存储库','fail');
            return;
        }
        $.ajax({
            url:'/imeWeb/Services/container/getContainerByOid',
            type:'GET',
            data:{
                containerid:pageDomainManagement.childContainerInfoHasCheckedTr.children('td:first').text(),
                _dc:new Date().getTime()
            },
            success:function (data) {
                data.id='t_editContainer';
                // data=[data];
                console.log(data);
                imeWeb.createChildPageHasId("domainManagement/addOreditContainer", "page-content-base1", "page-content-siteManag2",data);
                /*编辑存储库确认按牛*/
                $('#t_editContainer').bindOne('click',function () {
                    $.ajax({
                        url:'/imeWeb/Services/container/updateContainer',
                        type:'POST',
                        data:{
                            containername:$('#containername').val(),
                            containerdesc:$('#containerdesc').val(),
                            addWindowdomainid:$('#container_memberList').attr('addwindowdomainid'),
                            addWindowcontainerid:pageDomainManagement.childContainerInfoHasCheckedTr.children('td:first').text(),
                            container_status:$('.siteMag_containerStatus:checked').val()
                        },
                        success:function (data) {
                            console.log(data);
                            //更新行
                            $.ajax({
                                url:'/imeWeb/Services/container/getContainerByDomain',
                                type:'GET',
                                data:{
                                    domainid:$('#container_memberList').attr('addwindowdomainid'),
                                    _dc:new Date().getTime(),
                                    page:1,
                                    start:0,
                                    limit:25
                                },
                                success:function (data) {
                                    pageDomainManagement.childPageContainerInfo_Init(data);
                                }
                            });
                            imeWeb.deleteChildPage();
                        }
                    })
                })
            }
        })
    })
};


/*子页面append完成*/
pageDomainManagement.childPageSearchUser_Init = function (data) {

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
        // "order": [[1, "asc"]],
        //勾选框列和下拉框列禁止排序功能
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
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
    /*确定按钮*/
    pageDomainManagement.confirmAndcancel(table_searchsomeone, '#search_someone_select', '#search_someone_cancel', '#search_someone_refresharea', '请选择对象', function (data) {
        console.log(data);
        $.ajax({
            url:'/imeWeb/Services/domain/setDomainUser',
            type:'POST',
            data:{
                domainid:$('#container_memberList').attr('addwindowdomainid'),
                oids:data.oid
            },
            success:function (Udata) {
                if (Udata.success){
                    imeWeb.tools.globalAlert($('#siteManage_gAlert'),'添加成员成功','success');
                    pageDomainManagement.childDataTable_userInfo.rows.add([{
                        userPid: data.principalId,
                        username: data.name
                    }]).draw();
                }else {
                    imeWeb.tools.globalAlert($('#siteManage_gAlert'),'添加成员失败','fail');
                }
            }
        });
    });
};
pageDomainManagement.confirmAndcancel = function (table, confirmbutton, cancelbutton, alertID, alertMsg, confirmcallback) {
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
        var data = table.row('.selected').data();
        if (data) {
            if (confirmcallback) confirmcallback(data); //pageWorkflowManagement.searchsomeone_inputfrom.val(data.principalId)
            imeWeb.deleteChildPage()
        }
        else {
            imeWeb.tools.globalAlert(alertID, alertMsg,'fail');
            //imeWeb.Alert('#search_someone_refresharea','请选择对象')
            return false
        }
    });
    $(document).on('click', cancelbutton, function () {
        imeWeb.deleteChildPage()
    })
};

pageDomainManagement.dirtyTr = null;
pageDomainManagement.addTr = null;
pageDomainManagement.childContainerInfoHasCheckedTr=null;