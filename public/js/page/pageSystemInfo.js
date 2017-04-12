/**
 * Created by mashroom on 17/4/1.
 */
var  pageSystemInfo =   pageSystemInfo  || {};
pageSystemInfo.init = function(){
    try{

        pageSystemInfo.dataInit();
    }catch(err){
        console.log(err);
    }finally{
        imeWeb.i18n.init();
    }


}

/*页面重写*/
pageSystemInfo.dataInit = function(){
    pageSystemInfo.contentInit();
}

/*表单内容初始化*/
pageSystemInfo.contentInit =  function(){
    $.fn.dataTable.ext.errMode = function(s,h,m){};

    imeWeb.initPageBox("systemTools/pageSystemInfo",[1]);
    //获取系统信息
    pageSystemInfo.getSystemInfo();

}

/*获取系统信息函数*/
pageSystemInfo.getSystemInfo = function(){
     var  url = "/imeWeb/Services/sys/licInfo";
        $.getJSON(url,{},function(data){
        imeWeb.initPageBox("systemTools/pageSystemInfo",[data.license]);
        //获取在线用户
        check_systemInfoList();
    })
}

/*获取在线用户列表*/
var check_systemInfoList =  function(){
    var url = "/imeWeb/Services/sys/listActUser";
    $.ajax({
        url:url,
        async:true,
        context:{
            refreshbutton:$('#refresh_systemInfoList'),
            refresharea:$('.refresh_area'),
            clickfunction:check_systemInfoList
        },
        success:function(data,textstatus){
                var result = data.users;
                $("#systemInfoList").dataTable({
                    searching:false, //去掉搜索框
                    bLengthChange:false,//去掉每页多少条框体
                    "language": {
                        "info": "显示 _START_ 到 _END_ 条,总共 _TOTAL_ 条", // 表格左下角显示的文字
                    },
                    destroy:true,
                    //"aoColumnDefs": [ { "bSortable": false, "aTargets": [0] }],
                    //"order": [[ 0, "principalId" ]],
                    data :result,
                    "columns": [
                        {data: "principalId"},
                        {data: "name"},
                        {data: "email"},
                        {data: "status"},
                        {data: "created"},
                        {data: "modified"}

                    ]
                });

        }
    });
}

/*刷新*/

//$(document).on('click','#refresh_systemInfoList',function(){
//
//})