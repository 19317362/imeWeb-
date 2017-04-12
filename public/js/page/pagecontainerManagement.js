/**
 * Created by mashroom on 17/3/13.
 */
var  pagecontainerManagement =  pagecontainerManagement  || {};

pagecontainerManagement.init = function(){
    imeWeb.initPageBox();
    pageCommon.init();
    $('.page-content-wrapper').html(Handlebars.templates['containerManagement/container']([1]));
    imeWeb.i18n.init();
    pagecontainerManagement.datatableHtml();
    pagecontainerManagement.datatableData()

}

// setTimeout(function(){
//     App.alert({
//     container:'#me11',
//     place: 'append',
//     type: 'success',
//     message: 'Test alert',
//     close: true,
//     reset: false,
//     focus: true,
//     closeInSeconds: '2000',
//     icon: 'fa fa-check'
// })

// },2000)




pagecontainerManagement.datatableHtml=function(){
    $('div.containerManagement_table').html(Handlebars.templates['containerManagement/datatable_manage']([1]));
    $('div.containerManagement_table').append(Handlebars.templates['containerManagement/stackmodel_newbuild']([1]));
    $('div.containerManagement_table').append(Handlebars.templates['containerManagement/stackmodel_adduser']([1]));
    $('div.portlet.light.bordered').append(Handlebars.templates['containerManagement/tabs']([1]));
    $('#tab_1_1').append(Handlebars.templates['containerManagement/tabs1_1_1']([1]));
    $('#tab_1_2').append(Handlebars.templates['containerManagement/tabs1_1_2']([1]));
}



pagecontainerManagement.datatableData=function(){

       var stackmodel_adduser=$('#tablestackmodel_adduser').DataTable({
        "searching": false,
        "lengthChange": true,
        info:false,
        paging:false,
        scrollx:true,
        //scrollY:100,
        "columnDefs": [
        { "title": "Id", "targets": 1 },
        { "title": "OId", "targets": 2 },
        { "title": "名称", "targets": 3},
        { "title": "描述", "targets": 4 }
        ]

    })



    var table_1_2=$('#tab_1_2_containerManagement_table').DataTable({
        "searching": false,
        "lengthChange": true,
        info:false,
        paging:false,
        scrollx:true,
        "columnDefs": [
        { "title": "Id", "targets": 1 },
        { "title": "名称", "targets": 2 },
        { "title": "类型", "targets":3 },
        { "title": "类型", "targets": 4 },
        { "title": "状态", "targets": 5 },
        { "title": "查看", "targets": 6 },
        { "title": "编辑", "targets": 7},
        {"title": "添加", "targets": 8 },
        {"title": "下载", "targets": 9 },
        {"title": "打印", "targets": 10 },
        {"title": "删除", "targets":11},
        {"title": "管理", "targets": 12},
        {"title": "全部", "targets": 13 },
        {"title": "创建人", "targets": 14},
        {"title": "创建时间", "targets": 15},
        {"title": "修改人", "targets": 16},
        {"title": "修改时间", "targets": 17}
        ]

    })

    var table_1_1=$('#tab_1_1_containerManagement_table').DataTable({
        "searching": false,
        "lengthChange": true,
        info:false,
        paging:false,
        scrollx:true,
        "columnDefs": [
        { "title": "Id", "targets": 1 },
        { "title": "名称", "targets": 2 }
        ]

    })

var data=[{"containerid":"com.imecms.container.Container:7","containerisAvailable":"启用","containername":"D-文档","containerdesc":"文档，一般文档存储对象"},{"containerid":"com.imecms.container.Container:123","containerisAvailable":"启用","containername":"P-公共存储库","containerdesc":"公开给外部注册人员使用的存储库"},{"containerid":"com.imecms.container.Container:126","containerisAvailable":"启用","containername":"P-内部存储库","containerdesc":"用于确认问题，测试问题的内部专用存储库"},{"containerid":"com.imecms.container.Container:124","containerisAvailable":"启用","containername":"P-样例存储库","containerdesc":"dita数据的使用样本库，可以用做初次使用的参考"},{"containerid":"com.imecms.container.Container:125","containerisAvailable":"启用","containername":"R-重用库","containerdesc":"重用库，用来存储共用对象"}]

var table=$('#containerManagement_table').DataTable( {
    // ajax: {
    //     url:g_url_getContainerByDomain,
    //     dataSrc:""
    // },
    data:data,
    //dataSrc:"",

    "searching": false,
    "lengthChange": true,
    info:false,
    paging:false,
    scrollx:true,
    //scrollY: 100,
    "columnDefs": [
     {
        "title": '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>',
        "orderable": false,
        "targets": 0
         },
    { "title": "名称", "targets": 1 },
    { "title": "说明", "targets":2 },
    { "title": "状态", "targets": 3 }

  ],
    columns: [
    {
        'data': function () {
            return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
        }
    },
    { data: 'containername' },
    { data: 'containerdesc' },
    { data: 'containerisAvailable' }
    ]


} );

table.buttons().container()
    .appendTo( $('.btn-group-devided') );
}



