$(function(){
    $('body').html(Handlebars.templates['index/container']({}))
    var data=[]
    for(var i=0;i<40;i++){
        data.push({oid:i+1,'creator':'DBK0811',createtime:'机号',whatcity:'机型',fact:'产品系列',city:'产品用途',xifen:'细分用途',p:'功率'})
    }
    var tripmanage_content_table=$('#index_content_table').DataTable({
        data:data,
        sPaginationType: "extStyle",
        searching: false,
        lengthChange: false,
        ordering: false,
        columns: [
        {
            data:Pagecommon.datatables.rendercheckbox,
            width:'20px',
            orderable: false
        },
        {
            'data':'creator',
            render:function(data){
                return Pagecommon.datatables.renderlinks(data)
            }
        },
        {data:'createtime'},
        {data:'whatcity'},
        {data:'fact'},
        {data:'city'},
        {data:'xifen'},
        {data:'p'}
        ],
        "columnDefs": [
        { "title": "", "targets": 0,'visible':false},
        { "title": "订货号", "targets": 1 },
        { "title": "机号", "targets": 2 },
        { "title": "机型", "targets":3},
        { "title": "产品系列", "targets": 4},
        { "title": "产品用途", "targets": 5},
        { "title": "细分用途", "targets": 6},
        { "title": "功率", "targets": 7}
        ],
        initComplete:function(){
            //Pagecommon.selectrow('#index_content_table',tripmanage_content_table,'#none','#none','#none','#none','#none')
        }
    })
})














