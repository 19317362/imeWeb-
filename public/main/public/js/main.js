
$('body').html(Handlebars.templates['main/container']({}))
var myChart = echarts.init(document.getElementById('echart'));


myChart.title = '嵌套环形图';

option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}"
    },

    legend: {
        orient: 'vertical',
        x: 'left',
        data:[
        '关联数据、自动发布、内容重用、文档管理',
        '2D、3D、模型','正确性、XML、S1000D、DITA',
        '翻译管理、回传、任务包',
        '状态、工作流、CMII标准',
        '多渠道、自动发布、实用性',
        '实时、交互、产品'

         ]
    },
    // visualMap: {
    //     show: false,
    //     min: 80,
    //     max: 600,
    //     inRange: {
    //         colorLightness: [0, 1]
    //     }},
    series: [
        {
            name:'技术资料解决方案',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '35%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
        {value:100, name:'内容管理'},
        {value:99, name:'技术插图'},
        {value:100, name:'在线批注'},
        {value:99,name:'翻译管理'},
         {value:99,name:'变更管理'},
         {value:99,name:'imePublisher'},
        {value:99,name:'imeTIMS'},
            ],
             itemStyle: {
                normal: {
                    color: '#e7505a',
                    //color:'rgba(0,0,0,.6)',
                    shadowBlur: 30,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
            }
        },
        {
            name:'技术资料解决方案',
            type:'pie',
            radius: ['40%', '55%'],


            data:[
                {value:100, name:'关联数据、自动发布、内容重用、文档管理'},
                // {value:25, name:'自动发布'},
                // {value:25, name:'内容重用'},
                // {value:25, name:'文档管理'},
                {value:99, name:'2D、3D、模型'},
                // {value:33, name:'3D'},
                // {value:33, name:'模型'},
                // {value:25, name:'正确性'},
                {value:100, name:'正确性、XML、S1000D、DITA'},
                // {value:25, name:'S1000D'},
                // {value:25, name:'DITA'},
                {value:99, name:'翻译管理、回传、任务包'},
                // {value:33, name:'翻译回传'},
                // {value:33, name:'翻译任务包'},
                // {value:33, name:'状态'},
                // {value:33, name:'工作流'},
                {value:99, name:'状态、工作流、CMII标准'},
                {value:99, name:'多渠道、自动发布、实用性'},
                // {value:33, name:'自动发布'},
                // {value:33, name:'适用性'},
                {value:99, name:'实时、交互、产品'}
            ],
            label: {
    normal: {
        textStyle: {
            color: '#a0a9b4'
            //fontsize:30
        }
    }
},
             itemStyle: {
                normal: {
                    //color: '#004e97',
                    //color:['red','green','green','green','green','green','green','green','green','green'],
                    //shadowBlur: 70,
                    //shadowColor: 'rgba(0, 0, 0, 0.4)'
                }
            }
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);




