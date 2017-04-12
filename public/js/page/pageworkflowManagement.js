/**
 * Created by mashroom on 17/3/13.
 */
 var  pageWorkflowManagement =  pageWorkflowManagement  || {};

 pageWorkflowManagement.init = function(){
   try{
     imeWeb.initPageBox("workflowManagement/container",[1]);
     pageWorkflowManagement.contentInit()
     pageWorkflowManagement.ajaxevents()
     pageWorkflowManagement.dataInit()
 }catch(err){
    console.log(err);
}finally{
    imeWeb.i18n.init();
}
}

pageWorkflowManagement.dataInit = function(){

}

pageWorkflowManagement.contentInit = function(){
    $('#workflow_instance').html(Handlebars.templates['workflowManagement/tab_instance']([1]));
    $('#workflow_identify').html(Handlebars.templates['workflowManagement/tab_identify']([1]));
    pageWorkflowManagement.data_table_search();
    pageWorkflowManagement.data_table_identify()
    pageWorkflowManagement.datepicker();
    pageWorkflowManagement.createChildPageevents();
}

pageWorkflowManagement.ajaxevents = function(){
    pageWorkflowManagement.ajaxevents_1_tab_instance()
    pageWorkflowManagement.ajaxevents_2_start_process()
    pageWorkflowManagement.ajaxevents_3_search_object()
    pageWorkflowManagement.ajaxevents_4_search_someone()
    pageWorkflowManagement.control()

}

/*-----------------------------------页面测试控制-------------------------------------------------------------*/
pageWorkflowManagement.control=function(){
    $('#tab_instance_startprocess').trigger('click');
    $('#start_process_search').trigger('click');
    $('#search_object_searchPrincipal').trigger('click')
}
/*-----------------------------------页面测试控制-------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------ajaxevents_4_search_someone页面-------------------------------------------------------------*/
pageWorkflowManagement.ajaxevents_4_search_someone=function(){
    $(document).on('click','#search_someone_search',search_someone_form)
    function search_someone_form(){
        var type='Users';
        var pool=undefined
        var principalId=$('#search_someone_ID').val()
        var name=$('#search_someone_name').val()
        $.ajax({
            url: "/imeWeb/Services/principal/searchPrincipal",
            type: "GET",
            context:{
               refreshbutton:$('#search_someone_search'),
               refresharea:$('#search_someone_refresharea')
           },
           data: {
               type:type,
               name:name,
               principalId:principalId,
               pool:pool,
               start:0,
               limit:25,
               page:1
           },
           success: function (data, status) {
            pageWorkflowManagement.data_table_searchsomeone(data)
        }
    });

        return false
    }

}
/*-----------------------------------页面测试控制-------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------ajaxevents_3_search_object页面-------------------------------------------------------------*/
pageWorkflowManagement.ajaxevents_3_search_object=function(){
    $(document).on('click','#search_object_search',search_object_form)
    function search_object_form(){
        var title=$('#search_object_title').val()
        var content=$('#search_object_content').val()
        var begincreated=$('#search_object_begincreated').val().replace(/\//g,'-')
        var endcreated=$('#search_object_endcreated').val().replace(/\//g,'-')
        var Principal=$('#search_object_Principal').val()
        var containerid=$('#search_object_container').val()?$('#search_object_container').data('value'):null
        var type=$('#search_object_sort').val()?$('#search_object_sort').data('value'):null
        var checkoutUser=$('#search_object_checkoutUser').val()
        $.ajax({
            url: "/imeWeb/Services/folder/searchFile",
            type: "GET",
            context:{
             refreshbutton:$('#search_object_search'),
             refresharea:$('#search_object_refresharea')
         },
         data: {
             checkoutUser:checkoutUser,   //检出人
             modifySearch:false,
             type:type,     //类型
             title:title,             //关键字
             content:content ,       //内容
             containerid:containerid,           //存储库
             istemplate:false,
             Principal:Principal,            //创建人
             begincreated:begincreated,
             endcreated:endcreated,
             fieldlist:null,
             number:null,
             start:0,
             limit:25,
             page:1
         },
         success: function (data, status) {
             pageWorkflowManagement.data_search_object(data.records)
         }
     });

        return false
    }

}
/*-----------------------------------ajaxevents_3_search_object页面-------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------ajaxevents_2_start_process页面-------------------------------------------------------------*/
pageWorkflowManagement.ajaxevents_2_start_process=function(){
    $(document).on('click','#start_process_search',start_process_form)
    function start_process_form(){
        /*-----------取得ajaxevents_3_serach_object页面的存储库-------*/
        var containerlist=$('#search_object_containerlist')
        $.ajax({
            url: "/imeWeb/Services/container/getContainerByDomainid",
            type: "GET",
            data: {
               showAll:1,
               query:null,
               page:1,
               start:0,
               limit:25
           },
           success: function (data, status) {
             containerlist.html(Handlebars.templates['workflowManagement/options'](data));
         }
     });
        /*-----------取得ajaxevents_3_serach_object页面的类型-------*/
        var sortlist=$('#search_object_sortlist')
        $.ajax({
            url: "/imeWeb/Services/permission/getsofttype",
            type: "GET",
            data: {
               query:null,
               page:1,
               start:0,
               limit:25
           },
           success: function (data, status) {
             sortlist.html(Handlebars.templates['workflowManagement/options'](data));
         }
     });
        return false
    }
}

/*-----------------------------------ajaxevents_2_start_process页面-----------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------ajaxevents_1_tab_instance页面-------------------------------------------------------------*/
pageWorkflowManagement.ajaxevents_1_tab_instance=function(){

    var form=$('#tab_instance_form');
    var  name=$('#tab_instance_name');
    var  namelist=$('#tab_instance_namelist');
    var  id=$('#tab_instance_ID')
    var  status=$('#tab_instance_status');
    var  timefrom=$('#tab_instance_timefrom');
    var timeto=$('#tab_instance_timeto');
    var  submit=$('#tab_instance_search') //搜索按钮

    var  startprocess=$('#tab_instance_startprocess') //启动流程按钮

    tab_instance_name()  //初始加载select列表

    form.submit(function(event) { //搜索表单提交事件
        tab_instance_form()
        return false
    });

    $(document).on('click','#tab_instance_startprocess',function(){  //点击启动流程ajax发送数据并跳向下一个页面
       var namelist=$('#start_process_namelist')
       var successcallback=function(data,status){
        namelist.html(Handlebars.templates['workflowManagement/options'](data));
    }
    tab_instance_name(successcallback)
})

    /*--------------------------------表单提交------------------------*/
    function tab_instance_form(){
        var createdS=timefrom.val();
        var createdE=timeto.val();
        var statusval=status.val();
        switch(statusval){
            case "全部":
            statusval=null;
            break;
            case "任务开始":
            statusval='open';
            break;
            case "任务完成":
            statusval='close';
            break;
            case "取消":
            statusval='cancel';
            break;
        }

        createdS=createdS.replace(/\//g,'-');
        createdE=createdE.replace(/\//g,'-')
        $.ajax({
            url: "/imeWeb/Services/workflow/queryProcess",
            type: "GET",
            data: {
               processId:id.val(),
               pboClass:'',
               createdS:createdS,
               createdE:createdE,
               status:statusval,
               wfName:name.val(),
               page:1,
               start:0,
               limit:25
           },
           success: function (data, status) {
             pageWorkflowManagement.data_table_search(data)
         }
     });
    }

    /*--------------------------------select列表查询------------------*/
    function tab_instance_name(successcallback){
        $.ajax({
            url: "/imeWeb/Services/workflow/getwfDefine",
            type: "GET",
            data: {
                query:'',
                page:1,
                start:0,
                limit:25
            },
            success: function(data,status){
                if(successcallback){
                    successcallback(data,status)
                }
                else{
                    namelist.html(Handlebars.templates['workflowManagement/options'](data));
                }
            }
        });
    }



}
/*-----------------------------------ajaxevents_1_tab_instance页面-------------------------------------------------------------*/



pageStart_process={
    dataInit:function(){}
}
pageSearch_object={
    dataInit:function(){}
}

/*-------------------------------------创建子页面事件----------------------------------------------------------*/
pageWorkflowManagement.createChildPageevents=function(){
    //下拉列表注册事件
    $(document).on('click','.my_select li',function(){
        var val=$(this).text().replace(/\s+/g,'')
        var datavalue=$(this).data('value')
        var myinput=$(this).parent().parent().prev('input')
        if(datavalue){
            myinput.data('value',datavalue.replace(/\s+/g,''))
        }
        myinput.val(val)
    })
    //启动流程按钮 ---------->工作流子页面
    $(document).on('click','#tab_instance_startprocess', function() {
        imeWeb.createChildPage('workflowManagement/start_process','page-content-base','page-content-start_process');
    })
    //工作流子页面 ---------->对象查询
    $(document).on('click','#start_process_search', function() {
        imeWeb.createChildPage('workflowManagement/search_object','page-content-start_process','page-content-search_object');
        pageWorkflowManagement.datepicker();
        pageWorkflowManagement.data_search_object();
    });
    //对象查询 ---------->搜索成员》创建人
    $(document).on('click','#search_object_searchPrincipal', function() {
        imeWeb.createChildPage('workflowManagement/search_someone','page-content-search_object','page-content-search_Principal');
        pageWorkflowManagement.searchsomeone_inputfrom=$('#search_object_Principal')
        pageWorkflowManagement.data_table_searchsomeone()
    });

     //对象查询 ---------->搜索成员》检出人
     $(document).on('click','#search_object_searchcheckoutUser', function() {
         imeWeb.createChildPage('workflowManagement/search_someone','page-content-search_object','page-content-search_checkoutUser');
        pageWorkflowManagement.searchsomeone_inputfrom=$('#search_object_checkoutUser')
        pageWorkflowManagement.data_table_searchsomeone()
    });

 }
/*-------------------------------------创建子页面事件----------------------------------------------------------*/

 pageWorkflowManagement.datepicker=function(){
    $('.date-picker').datepicker({
        format: 'yyyy/mm/dd',
        orientation:'bottom'
    });
}


pageWorkflowManagement.data_table_searchsomeone=function(data){
    var table_searchsomeone=$('#search_someone').DataTable({
       data:data,
       columns: [
       {data: function () {
        return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
    }},
    { data: 'type' },
    {data:'principalId'},
    {data:'name'},
    {data:function(source){
        return ''
    }},
    ],
    "searching": false,
    'scrollY': 500,
    "destroy": true,
    "lengthChange": true,
    info:false,
    paging:false,
    scrollx:true,
    "columnDefs": [
    { "title": "", "targets": 0 },
    { "title": "", "targets":1},
    { "title": "Id", "targets": 2 },
    { "title": "名称", "targets": 3 },
    { "title": "描述", "targets": 4 }
    ]

})
     pageWorkflowManagement_confirmAndcancel(table_searchsomeone,'#search_someone_select','#search_someone_cancel')
}


pageWorkflowManagement.data_table_search=function(data){
    var table_search=$('#table_search').DataTable({
       data:data,
       columns: [
       {data: function () {
        return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
    }},
    { data: 'id' },
    {data:'name'},
    {data:'wfDefName'},
    {data:'pboId'},
    {data:'creatorId'},
    {data:'created'},
    {data:'status'}

    ],
    "searching": false,
    'scrollY': 500,
    "destroy": true,
    "lengthChange": true,
    info:false,
    paging:false,
    scrollx:true,
    "columnDefs": [
    { "title": "", "targets": 0 },
    { "title": "Id", "targets": 1 },
    { "title": "名称", "targets": 2 },
    { "title": "流程定义", "targets":3 },
    { "title": "对象ID", "targets": 4 },
    { "title": "创建人", "targets": 5 },
    { "title": "创建时间", "targets": 6 },
    { "title": "状态", "targets": 7}
    ]

})
}


pageWorkflowManagement.data_search_object=function(data){
    var table_search=$('#search_object').DataTable({
       data:data,
       columns: [
       {data: function () {
        return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
    }},
    { data: 'number'},
    {data:function(source){
        if(!source.name){
            return ''
        }
        return source.name
    }},
    {data:'state'},
    {data:'created'},
    {data:'creatorName'},
    {data:'softtypeTitle'}
    ],
    "searching": false,
    "destroy": true,
    "lengthChange": true,
    info:false,
    //paging:false,
     "bLengthChange": false,
     "pageLength": 10,
    scrollx:true,
    'scrollY': 500,
    "destroy": true,
    "columnDefs": [
    { "title": "", "targets": 0 },
    { "title": "编号", "targets": 1 },
    { "title": "名称", "targets": 2 },
    { "title": "状态", "targets":3 },
    { "title": "创建时间", "targets": 4 },
    { "title": "创建人", "targets": 5 },
    { "title": "类型", "targets": 6 }
    ]
})
}

pageWorkflowManagement.data_table_identify=function(){
    var table_search=$('#table_identify').DataTable({
        "searching": false,
        "destroy": true,
        "lengthChange": true,
        info:false,
        paging:false,
        scrollx:true,
        "columnDefs": [
        { "title": "Id", "targets": 1 },
        { "title": "名称", "targets": 2 },
        { "title": "流程定义", "targets":3 },
        { "title": "对象ID", "targets": 4 },
        { "title": "创建人", "targets": 5 },
        { "title": "创建时间", "targets": 6 },
        { "title": "状态", "targets": 7}
        ]

    })
}


    //辅助函数-----------------------------------》》选中表格行,然后确认或者取消

    function  pageWorkflowManagement_confirmAndcancel(table,confirmbutton,cancelbutton){
         $(document).off('click',confirmbutton)
         $(document).off('click',cancelbutton)
         $(document).off('click','tr')
 //选中表格行
         $(document).on( 'click', 'tr', function () {
            try{
              $('tr').removeClass('selected').find("input[type='checkbox']").attr('checked',false)
              $(this).addClass('selected');
              var i=$(this).find("input[type='checkbox']")
              i[0].checked=true

          }catch(err){
            return false

          }
      });
          //确认
         $(document).on('click',confirmbutton,function(){
             var data=table.row('.selected').data()
            if(data){
               pageWorkflowManagement.searchsomeone_inputfrom.val(data.principalId)
               imeWeb.deleteChildPage()
            }
            // else{
            //     return false
            // }
        })
         //取消
          $(document).on('click',cancelbutton,function(){
             imeWeb.deleteChildPage()
          })
        }


//为search_someone特别定制的指向，来自于哪一个input
pageWorkflowManagement.searchsomeone_inputfrom=null

