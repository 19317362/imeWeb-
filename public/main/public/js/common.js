
var Pagecommon={
    sidebar:{},
    datatables:{
        setconfig:function(){},
        rendercheckbox:function(){},
        renderlinks:function(){},
        selectrow:function(){},
        editrow:function(){}
    },
    plugins:{
        start_rating:function(){}
    },
    init:function(){
        this.datatables.setconfig()
    },
    delay:function(){}
}

Pagecommon.plugins.start_rating=function(){
    $(".star_rating").rating({
        'size':'lg',
        showCaption:true,
        starCaptions:{
            0.5: '',
            1: '',
            1.5: '',
            2: '',
            2.5: '',
            3: '',
            3.5: '',
            4: '',
            4.5: '',
            5: ''
        }});
}
Pagecommon.sidebar.navitems=function(){
    var navitems=$('#sidebar li.nav-item')
    $(document).on('click',navitems,function(){

    })
}

Pagecommon.datatables.rendercheckbox=function(){
    return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"> <span></span> </label>'
}

Pagecommon.datatables.renderlinks=function(data){
  return '<a>'+data+'</a>'
}

Pagecommon.datatables.setconfig=function(){
 $.fn.dataTable.ext.errMode=function(){}
 $.extend( $.fn.dataTable.defaults, {
    searching: true,
    ordering: true,
    "pageLength": 10,
    "stripeClasses": ['','even']
} );
}


Pagecommon.editrow=function(selector,table,row, data, dataIndex){
 if(data.oid) return;
 $(row).on( 'click','td',function (e) {
    $(this).attr('contenteditable',true)
});
 $(row).find('td').click()
}

Pagecommon.selectrow=function(selector,table,confirmbutton,cancelbutton,alertID,alertMsg,confirmcallback,multiple){
    var multiple=multiple||false
    $(document).off('click',confirmbutton)
    $(document).off('click',cancelbutton)
    $(selector).off('click','tr')
 //选中表格行
 function selectone(that){
   $(selector+' tr').removeClass('selected').find("input[type='checkbox']").attr('checked',false)
   that.addClass('selected');
   var i=that.find("input[type='checkbox']")
   i[0].checked=true
}

$(selector).on( 'click', 'tr', function (e) {
    var that=$(this)
    try{
      if(!multiple){
        selectone(that)
    } else{
        if(e.ctrlKey){
            that.toggleClass('selected');
            var i=that.find("input[type='checkbox']")
            i[0].checked=! i[0].checked
            return false;
        }
        else{
            selectone(that)
        }
    }
}catch(err){
    //return false
}
});
          //确认
          $(document).on('click',confirmbutton,function confirm(){
            var data=null;
            var data=table.rows('.selected').data();
            if(data[0]){
                if(!multiple){
                    data=data[0]
                }
               if(confirmcallback) confirmcallback(data)  //pageWorkflowManagement.searchsomeone_inputfrom.val(data.principalId)
                   //imeWeb.deleteChildPage()
           }
           else{
            //imeWeb.tools.globalAlert(alertID,alertMsg,'fail','preppend')
            return false
        }
    })
         //取消
         $(document).on('click',cancelbutton,function(){
             //imeWeb.deleteChildPage()
         })
     }

     Pagecommon.init()