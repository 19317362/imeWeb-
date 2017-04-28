/**
 * Created by mashroom on 17/3/13.
 */
var  pageReportChart=  pageReportChart|| {};
var  unAgglOpts = [];
var  configOpt  = [];
var  dataJson = [];
pageReportChart.init = function(){
   try{
    imeWeb.initPageBox();
    pageCommon.init();
    $('.page-content-wrapper').html(Handlebars.templates['reportChart/container']([1]));
    pageReportChart.bindevents();
	//加载报表类型
	loadChartType();
	//加载
	loadChartDslist();
	$('.multiple').multiselect();
}catch(err){
    console.log(err);
}finally{
    imeWeb.i18n.init();
}

}

pageReportChart.dataInit = function(){

}
var loadChartType = function(){

	var url = "/imeWeb/Services/report/listReportType";
	$.ajax({
		type:'GET',
		url:url,
		dataType : "json",
		async :false,
		success : function(data,textStatus) {
			if(data.success){
				var opt = "";
				$.each(data.record,function(i,o){
					opt = opt +"<option value="+o.name+">"+o.title+"</option>";
				})
				$("#chartType").empty();
				$("#chartType").append("<option>---请选择---</option>");
				$("#chartType").append(opt);
				//$('#main_select').selectpicker('render');
				//$('#main_select').selectpicker('refresh');
			}else{
				console.log(data.msg);
			}
		}
	})
}

var loadChartDslist = function(){
	var url = "/imeWeb/Services/report/listDataSources"
	$.ajax({
		type:'GET',
		url:url,
		dataType : "json",
		async :false,
		success : function(data,textStatus) {
			if(data.success){
				var opt = "";
				$.each(data.data,function(i,o){
					opt = opt +"<option value="+o.name+">"+o.title+"</option>";
				})
				$("#chartDs").empty();
				$("#chartDs").append("<option>---请选择---</option>");
				$("#chartDs").append(opt);
			}else{
				console.log(data.msg);
			}
		}
	})
}


$(document).on("change","#chartDs",function() {
	var dsName = $("#chartDs option:selected").val();
	if(dsName==""){
		return;
	}
    loadReportConfig(dsName);
})

var loadReportConfig = function(dsName){

	var url = "/imeWeb/Services/report/listReportConfig"+"?dsName="+dsName;
	$.ajax({
		type:'GET',
		url:url,
		dataType : "json",
		async :false,
		success : function(data,textStatus) {
			if(data.success){
			    configOpt = data.columns;
				unAgglOpts = [];
				var labelOpt = "";
				var seriesValOpt = "";
				for(var i = 0 ;i<configOpt.length;i++){
					//可聚合否？
					var config = configOpt[i];
					if(config.aggregatable){
						seriesValOpt = seriesValOpt +"<option value="+config.name+">"+config.title+"</option>";
					}else{
						labelOpt = labelOpt+"<option value="+config.name+">"+config.title+"</option>";
						unAgglOpts.push(config);
					}
			    }
				//轴标签加载数据
				$("#axisLabel").empty();
				$("#axisLabel").append("<option>---请选择---</option>");
				$("#axisLabel").append(labelOpt);
				//系列值加载数据
				$("#seriesValue").empty();
				$("#seriesValue").append("<option>---请选择---</option>");
				$("#seriesValue").append(seriesValOpt);
			}else{
				console.log(data.msg);
			}
		}
	})
}

$(document).on("change","#axisLabel",function(){

	var axisLabel_val = $("#axisLabel option:selected").val();
	var seriesNameOpt = "";
	for(var j=0;j<unAgglOpts.length;j++){
		var config = unAgglOpts[j];
		if(axisLabel_val!=config.name){
			seriesNameOpt = seriesNameOpt + "<option value="+config.name+">"+config.title+"</option>";
		}
	}
	$("#seriesName").empty();
	$("#seriesName").append("<option>---请选择---</option>");
	$("#seriesName").append(seriesNameOpt);

})

pageReportChart.dataInit = function(){
    //console.log('dataInit')
}

pageStart_process={
    dataInit:function(){}
}

pageReportChart.bindevents=function(){


    //启动流程按钮 ---------->工作流子页面
    // $(document).on('click','#start_process', function() {
    //     imeWeb.createChildPage('workflowManagement/start_process','page-content-base','page-content-start_process');
    // })
    // $(document).on('click','button.search_object', function() {
    //     imeWeb.createChildPage('workflowManagement/search_object','page-content-start_process','page-content-search_object');
    //     pageReportChart.datepicker();
    //     pageReportChart.data_search_object();
    // });
    $(document).on('click','#reportchart_container_next', function() {
        console.log('nextStep');
        imeWeb.createChildPage('reportChart/containernext','page-content-base','page-content-containernext');
		var coloOpt = "";
		for(var i = 0;i<configOpt.length;i++){
			var config = configOpt[i];
			coloOpt = coloOpt + "<option value="+config.name+">"+config.title+"</option>";
		}
		$("#columnType").empty();
		$("#columnType").append("<option>---请选择---</option>");
		$("#columnType").append(coloOpt);
    });
	
	$(document).on("click","#addLimitCol",function() {
		addLimitCol();
	})
	$(document).on("click","#confirmLimitCol",function(){
		confirmLimitCol();
	})
}

var addLimitCol = function (){
	var table = $('#limit_list').DataTable();
	var columnType = $("#columnType option:selected").val();
	var columnOperate = $("#columnOperate option:selected").val();
	var columnValue = $("#columnValue").val();
	var map = {};
	map["colType"] = columnType;
	map["colOperate"] = columnOperate ;
	map["colValue"] = columnValue ;
	dataJson.push(map);
	$('#limit_list').DataTable({
		data: dataJson,
		paging: false,
		searching:false, //去掉搜索框
		bLengthChange:false,//去掉每页多少条框体
		"language": {
			"info": "显示 _START_ 到 _END_ 条,总共 _TOTAL_ 条", // 表格左下角显示的文字
		},
		destroy:true,
        //使用对象数组，一定要配置columns，告诉 DataTables 每列对应的属性
        //data 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
        columns: [
            { data: 'colType' },
            { data: 'colOperate' },
            { data: 'colValue' }
        ]
    });
}

var confirmLimitCol = function (){
	//遍历dataTable所有数据
	var table = $('#limit_list').DataTable();
	var record = table.rows().data();
//	alert( 'The table has '+data.length+' records' );
	var item = "";
	for(var i = 0;i<record.length;i++){
		item = item +";"+record[i].colType + record[i].colOperate + record[i].colValue+"";
	}
	alert(item);
	
}
pageReportChart.datepicker=function(){
    $('.date-picker').datepicker({
        format: 'yyyy/mm/dd',
        orientation:'bottom'
    });
}

//对象查询
pageReportChart.data_table_search=function(){
    var table_search=$('#table_search').DataTable({
        "searching": false,
        "lengthChange": true,
        info:false,
        paging:false,
        scrollx:true,
        "columnDefs": [
        { "title": "Id", "targets": 1 },
        { "title": "编号", "targets": 2 },
        { "title": "名称", "targets":3 },
        { "title": "状态", "targets": 4 },
        { "title": "创建时间", "targets": 5 },
        { "title": "创建人", "targets": 6 },
        { "title": "类型", "targets": 7}
        ]

    })
}

pageReportChart.data_search_object=function(){
    var table_search=$('#search_object').DataTable({
        "searching": false,
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

pageReportChart.data_table_identify=function(){
    var table_search=$('#table_identify').DataTable({
        "searching": false,
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


// var data=[{"containerid":"com.imecms.container.Container:7","containerisAvailable":"启用","containername":"D-文档","containerdesc":"文档，一般文档存储对象"},{"containerid":"com.imecms.container.Container:123","containerisAvailable":"启用","containername":"P-公共存储库","containerdesc":"公开给外部注册人员使用的存储库"},{"containerid":"com.imecms.container.Container:126","containerisAvailable":"启用","containername":"P-内部存储库","containerdesc":"用于确认问题，测试问题的内部专用存储库"},{"containerid":"com.imecms.container.Container:124","containerisAvailable":"启用","containername":"P-样例存储库","containerdesc":"dita数据的使用样本库，可以用做初次使用的参考"},{"containerid":"com.imecms.container.Container:125","containerisAvailable":"启用","containername":"R-重用库","containerdesc":"重用库，用来存储共用对象"}]

// var table=$('#containerManagement_table').DataTable( {
//     // ajax: {
//     //     url:g_url_getContainerByDomain,
//     //     dataSrc:""
//     // },
//     data:data,
//     //dataSrc:"",

//     "searching": false,
//     "lengthChange": true,
//     info:false,
//     paging:false,
//     scrollx:true,
//     //scrollY: 100,
//     "columnDefs": [
//      {
//         "title": '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>',
//         "orderable": false,
//         "targets": 0
//          },
//     { "title": "名称", "targets": 1 },
//     { "title": "说明", "targets":2 },
//     { "title": "状态", "targets": 3 }

//   ],
//     columns: [
//     {
//         'data': function () {
//             return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"> <input type="checkbox"class="group-checkable homeDoc_checkBox homeDoc_bodyCh"data-set="#sample_1 .checkboxes"/> <span></span> </label>'
//         }
//     },
//     { data: 'containername' },
//     { data: 'containerdesc' },
//     { data: 'containerisAvailable' }
//     ]


// } );







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




// pagecontainerManagement.datatableHtml=function(){
//     $('div.containerManagement_table').html(Handlebars.templates['containerManagement/datatable_manage']([1]));
//     $('div.containerManagement_table').append(Handlebars.templates['containerManagement/stackmodel_newbuild']([1]));
//     // $('div.containerManagement_table').append(Handlebars.templates['containerManagement/stackmodel_adduser']([1]));
//     // $('div.portlet.light.bordered').append(Handlebars.templates['containerManagement/tabs']([1]));
//     // $('#tab_1_1').append(Handlebars.templates['containerManagement/tabs1_1_1']([1]));
//     // $('#tab_1_2').append(Handlebars.templates['containerManagement/tabs1_1_2']([1]));
// }