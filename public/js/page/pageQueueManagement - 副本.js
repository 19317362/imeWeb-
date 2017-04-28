/**
 * Created by mashroom on 17/3/13.
 */
 $.fn.dataTable.ext.errMode = function(s,h,m){}
 var  pageQueueManagement =  pageQueueManagement || {};
 pageQueueManagement.init = function(){
   try{
     imeWeb.initPageBox("queueManagement/container",[1]);
     pageQueueManagement.contentInit()
     pageQueueManagement.ajaxevents_queue_inbox_nav()
 }catch(err){
    console.log(err);
}finally{
    imeWeb.i18n.init();
}
}

pageQueueManagement.dataInit = function(){

}


pageQueueManagement.ajaxevents=function(){
    //pageQueueManagement.ajaxevents_queue_inbox_nav()
    pageQueueManagement.ajaxevents_queue_inbox_content_table()

}

pageQueueManagement.ajaxevents_queue_inbox_nav=function(){
   $.ajax({
    url:'/imeWeb/Services/queue/queues?',
    type: "GET",
    data: {
        start:0,
        limit:25,
        page:1
    },
    success:function(data){
        $('#queue_inbox_nav').html(Handlebars.templates['queueManagement/inbox_nav'](data));
    }
})
   $(document).off('click','#queue_inbox_nav li')
   $(document).on('click','#queue_inbox_nav li',function(){
    $("#queue_inbox_nav li").removeClass('active')
    $(this).addClass('active')
    pageQueueManagement.searchform(false)
    return false;
})

}

pageQueueManagement.ajaxevents_queue_inbox_content_table=function(){
    $(document).on('click','#queue_inbox_search',function(){
        pageQueueManagement.searchform(true)
        return false;
    })

}

pageQueueManagement.searchform = function(isNeedArgvs){
    var data;
    var timefrom;
    var timeto;
    var status;
    var isNeedArgvs=isNeedArgvs
    var activevalue=$('#queue_inbox_nav li.active').data('value')
    if(!activevalue){
        imeWeb.tools.globalAlert('#inbox_content_refresharea','请选择队列','fail','preppend')
        return false
    }

    if(!isNeedArgvs){
        data={
            id:activevalue,
            start:0,
            limit:25,
            page:1
        }
    }else{
       timefrom=$('#queue_inbox_timefrom').val();
       timeto=$('#queue_inbox_timeto').val();
       status=$('#queue_inbox_status').val();
       data={
        id:activevalue,
        status:status,
        beginDate:timefrom,
        endDate:timeto,
        start:0,
        limit:25,
        page:1
    }

}

$.ajax({
    url:'/imeWeb/Services/queue/queue/items',
    type: "GET",
    data:data,
    success:function(data){
        pageQueueManagement.inbox_content_datatable(data.records)
    }
})

return false;
}


pageQueueManagement.contentInit = function(){
    $('#queue_inbox_content').html(Handlebars.templates['queueManagement/inbox_content_form']([1]));
    $('#queue_inbox_content').append(Handlebars.templates['queueManagement/inbox_content_table']([1]));
    pageQueueManagement.inbox_content_datatable()
    pageQueueManagement.datepicker();
}


pageQueueManagement.inbox_content_datatable=function(data){
    var table_search=$('#inbox_content_datatable').DataTable({
      "language": {
        "infoEmpty": "No entries to show",
        "emptyTable": "No data available in table"
    },

    data:data,
    columns: [
    { data: 'qid'},
    {data:'name'},
    {data:'execClassName'},
    {data:'method'},
    {data:''},
    {data:'status'},
    {data:'objectId'},
    {data:'objectName'},
    {data:'objectNumber'},
    {data:'created'},
    {data:'creatorId'}
    ],
   "searching": false,
    "destroy": true,
    "lengthChange": true,
    info:false,
    //paging:false,
    "bLengthChange": false,
    "pageLength": 10,
   // scrollx:true,
   // 'scrollY': 500,
    "destroy": true,
    "columnDefs": [
    { "title": "ID", "targets": 0 },
    { "title": "名称", "targets": 1 },
    { "title": "执行类名", "targets": 2},
    { "title": "方法", "targets":3 },
    { "title": "开始时间", "targets": 4 },
    { "title": "状态", "targets": 5},
    { "title": "对象ID", "targets": 6 },
    { "title": "对象名称", "targets": 7 },
    { "title": "对象编号", "targets": 8},
    { "title": "创建时间", "targets": 9 },
    { "title": "创建人", "targets": 10 },
    ]
})


}


pageQueueManagement.datepicker=function(){
    $('.date-picker').datepicker({
        format: 'yyyy-mm-dd',
        orientation:'bottom'
    });
}

setTimeout(function(){
   //pageQueueManagement.createChildPageevents();
   pageQueueManagement.ajaxevents()
   //pageQueueManagement.control()
},0)



