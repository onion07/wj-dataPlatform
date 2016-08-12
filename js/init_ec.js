/**
* [description 功能：初始化数据表格基本结构，未渲染数据 ]
* @version     [version]
* @author      Chen jinSheng
* @date        2016-01-29
* @anotherdate 2016-01-29T15:19:31+0800
* @return      {[type]}   Ch
*/
var Ch =  (function (){
        var _ch = window._ch || {};

        // 初始化 引入规模 #scale
        var ec_Scale = function (ret1,is_show){

           // 银行名字换成为‘A,B...’
           Chg = ret1.chg;
           if (!is_show) { Chg = []; }
           
           // ‘元’改成‘万元’
           var Ser_data1 = [];
           var baseData = ret1.series.data;
           for (var i = 0; i < baseData.length; i++) {
                Ser_data1.push(baseData[i]/10000);
           }

            var ucsmy_scale = echarts.init(document.getElementById('scale'));
                ucsmy_scale.setOption({
                    title : {
                        show : true,
                        text:'',
                        left:3,    
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip : {
                        trigger: 'axis',
                        position: function(p){
                            return [p[0]-20,p[1]-50];
                        },
                        formatter: '{c} 万'
                    },
                      grid: {
                        x: 7,
                        x2: 0,
                        y: 60,
                        y2: 40
                    },
                    legend: {
                        show: false,
                        data: ['总额']                            
                    },
                    xAxis : [
                        {
                            type : 'category',
                            // 渲染数据
                            data : Chg,
                            show : is_show,
                            boundaryGap : ['15%','20%'],
                            splitLine : {
                                show : false,
                                lineStyle: {
                                    // color: '#013835',
                                    color : 'transparent',
                                    width: 1
                                }
                            },
                            axisLabel:{
                                show: true,
                                textStyle:{
                                    color: '#a6f3ef'
                                }
                            }
                            
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitArea : {show : true},
                            nameTextStyle : {color : '#666'},
                            nameGap : 15,
                            splitArea : {
                                show : false
                            },
                            splitLine : {
                                lineStyle: {
                                    color: '#013835',
                                    width: 1
                                }
                            },
                            axisLabel:{
                                show: false,
                                textStyle:{
                                    color: '#a6f3ef'
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            // 渲染数据
                            name:ret1.series.name,
                            type:'bar',
                            // 渲染数据
                            data:Ser_data1,
                            // data:ret1.series.data,
                            barGap: '50%',
                            barCategoryGap : '20%',
                            barMaxWidth: 20
                        }
                    ],
                    color : ['#04b0a6']
                });
        },
        // 初始化 利率 #int-rate
        ec_intRate = function (ret2,is_show){
                // 银行名字换成为‘A,B...’
                Chg = ret2.chg;
                if (!is_show) { Chg = []; }
                var ucsmy_int_rate = echarts.init(document.getElementById('int-rate'));
                    ucsmy_int_rate.setOption({
                        title : {
                            show : false,
                            left: 3, 
                            top: 7,
                            text:'利率',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                       grid: {
                            x: 5,
                            x2: 0,
                            y: 40,
                            y2: 40
                        },
                        boundaryGap : ['15%','20%'],
                        tooltip : {
                            trigger: 'axis',
                            position: function(p){
                                return [p[0]-10,p[1]-50];
                            },
                            formatter: function (da){
                                var da = da;
                                var _len = da.length;
                                var str = '';
                                var detail ;
                                for (var i = 0;i < _len;i++) {
                                    // str += '<span style="color:rgba(255,255,255,0.6)">'+da[i].seriesName+':</span>';
                                    str += da[i].value + '%';

                                }
                                detail  = str;
                                return detail;
                            },
                            // formatter: '<span style="z-index:1000;">{b}<br>{a} : {c}%00</span>'
                        },
                        legend: {
                            show: false,
                            data: ['利率']
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : Chg,
                                show : is_show,                                
                                axisLabel:{
                                    show: true,
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                },
                                splitLine : {
                                    show : false,
                                    lineStyle: {
                                        // color: '#013835',
                                        color : 'transparent',
                                        width: 1
                                    }
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: function (da){
                                        var value = da * 100 + '%';
                                        return value;
                                    },
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                },
                                axisTick: false,
                                // min : 0,
                                // max : 40,
                                splitLine : {
                                    lineStyle: {
                                        color: '#013835',
                                        width: 1
                                    }
                                }
                            }
                        ],
                        series : [
                            {
                                name:ret2.series.name,
                                type:'bar',
                                data:ret2.series.data,
                                barGap: '20%',
                                barMaxWidth: 20
                            }
                        ],
                        color : ['#fad36a']
                    });

                // return ucsmy_int_rate;
        },
        // 初始化 销售规模 #sell-scale
        ec_sellScale = function (ret3,is_show){
                // 银行名字换成为‘A,B...’
                Chg = ret3.chg;
                if (!is_show) { Chg = []; }
                // ‘元’改成‘万元’
                var Ser_data3 = [];
                var baseData = ret3.series.data;
                for (var i = 0; i < baseData.length; i++) {
                    Ser_data3.push(baseData[i]/10000);
                }

                var ucsmy_sellScale = echarts.init(document.getElementById('sell-scale'));
                    ucsmy_sellScale.setOption({
                        title : {
                            show : false,
                            text:'销售规模',
                            left:3, 
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        tooltip : {
                            trigger: 'axis',
                            position: function(p){
                                return [p[0]-20,p[1]-50];
                            },
                            formatter: '{c} 万'
                            // formatter: function (da) {
                            //     console.info(da)
                            // }
                        },
                        legend: {
                            show: false,
                            data: ['总额']
                        },
                        grid: {
                            x: 7,
                            x2: 0,
                            y: 60,
                            y2: 40
                        },
                        boundaryGap : ['15%','20%'],
                        xAxis : [
                            {
                                type : 'category',
                                data : Chg,
                                show : is_show,
                                splitLine : {
                                    show : false,
                                    lineStyle: {
                                        // color: '#013835',
                                        color : 'transparent',
                                        width: 1
                                    }
                                },
                                axisLabel:{
                                    // show: true,
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                splitArea : {show : true},
                                nameTextStyle : {color : '#666'},
                                nameGap : 15,
                                splitArea : {
                                    show : false
                                },
                                splitLine : {
                                    lineStyle: {
                                        color: '#013835',
                                        width: 1
                                    }
                                },
                                axisLabel:{
                                    show: false,
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                }
                            }
                        ],
                        series : [
                            {
                                name:ret3.series.name,
                                type:'bar',
                                data:Ser_data3,
                                barGap: '50%',
                                barCategoryGap : '20%',
                                barMaxWidth: 20
                            }
                        ],
                        color : ['#04b0a6']
                    });

                // return ucsmy_sellScale;
        },
        // 初始化 利率 #int-rate2
        ec_intRate2 = function (ret4,is_show){
                // 银行名字换成为‘A,B...’
                Chg = ret4.chg;
                if (!is_show) { Chg = []; }
                var ucsmy_int_rate2 = echarts.init(document.getElementById('int-rate2'));
                   ucsmy_int_rate2.setOption({
                        title : {
                            show : false,
                            text:'利率',
                            left:3,
                            top:7, 
                            textStyle: {
                                color: '#fff'
                            }
                        },
                       grid: {
                            x: 5,
                            x2: 0,
                            y: 40,
                            y2: 40
                        },
                        boundaryGap : ['15%','20%'],
                        tooltip : {
                            trigger: 'axis',
                            position: function(p){
                                return [p[0]-20,p[1]-50];
                            },
                            formatter: '{c}%'
                        },
                        legend: {
                            show: false,
                            data: ['利率']
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : Chg,
                                show : is_show,                                
                                axisLabel:{
                                    show: true,
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                },
                                splitLine : {
                                    show : false,
                                    lineStyle: {
                                        // color: '#013835',
                                        color : 'transparent',
                                        width: 1
                                    }
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: '{value}%',
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                },
                                axisTick: false,
                                // min : 0,
                                // max : 40,
                                splitLine : {
                                    lineStyle: {
                                        color: '#013835',
                                        width: 1
                                    }
                                }
                            }
                        ],
                        series : [
                            {
                                name:ret4.series.name,
                                type:'bar',
                                data:ret4.series.data,
                                barGap: '20%',
                                barMaxWidth: 20
                            }
                        ],
                        color : ['#fad36a']
                    });

                // return ucsmy_int_rate2;
        },
        // 初始化 平均期限 #timeline
        ec_timeLine = function (){
                var ucsmy_timeline = echarts.init(document.getElementById('timeline'));
                    ucsmy_timeline.setOption({
                        color: ['#04b0a6'],
                        tooltip : {
                            trigger: 'axis',
                            formatter: '{b} : {c} 天'
                        },
                        title : {
                            show : true,
                            text:'平均期限',
                            left:3,
                            top:7,
                            textStyle: {
                                color: '#fff',
                                fontSize:14
                            }
                        },
                        grid: {
                            x: 75,
                            y: 30,
                            x2: 25,
                            y2: 35,
                            borderColor: '#013633'
                        },
                        xAxis: [
                            {
                                type: 'value',
                                splitNumber: 6,
                                axisLine: {
                                    lineStyle: {
                                        color: '#04b0a6',
                                        width: 0
                                    }
                                },
                                axisLabel: {
                                    formatter: function (da) {
                                        if (da === 0) { da = da + '（天）'}
                                        return da;
                                    },
                                    textStyle: {
                                        color: '#a6f3ef'
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#013633'
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                splitLine: {
                                    lineStyle: {
                                        color: '#013633'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#04b0a6',
                                        width: 0
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#a6f3ef',
                                        // baseline: 'bottom',
                                        fontSize: 12
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                data: []
                            }
                        ],
                        series: [
                            {
                                type: 'bar',
                                barMaxWidth:20,
                                // barCategoryGap: '30%',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: []
                            }
                        ]
                    });
                return ucsmy_timeline;
        },
        // 初始化 平均期限 #timeline2
        ec_timeLine2 = function (){
                var ucsmy_timeline2 = echarts.init(document.getElementById('timeline2'));
                     ucsmy_timeline2.setOption({
                        color: ['#04b0a6'],
                        tooltip : {
                            trigger: 'axis',
                            formatter: '{b} : {c} 天'
                        },
                        title : {
                            show : true,
                            text:'平均期限',
                            left:3,
                            top: 7,
                            textStyle: {
                                color: '#fff',
                                fontSize:14
                            }
                        },
                        grid: {
                            x: 75,
                            y: 30,
                            x2: 25,
                            y2: 35,
                            borderColor: '#013633'
                        },
                        xAxis: [
                            {
                                type: 'value',
                                splitNumber: 6,
                                axisLine: {
                                    lineStyle: {
                                        color: '#04b0a6',
                                        width: 0
                                    }
                                },
                                axisLabel: {
                                    formatter: function (da) {
                                        if (da === 0) { da = da + '（天）'}
                                        return da;
                                    },
                                    textStyle: {
                                        color: '#a6f3ef'
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: '#013633'
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                splitLine: {
                                    lineStyle: {
                                        color: '#013633'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#04b0a6',
                                        width: 0
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#a6f3ef',
                                        fontSize: 12
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                data: []
                            }
                        ],
                        series: [
                            {
                                type: 'bar',
                                barMaxWidth:20,
                                // barCategoryGap: '50%',
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true
                                        }
                                    }
                                },
                                data: []
                            }
                        ]
                    });
                return ucsmy_timeline2;
        },
        // 初始化 资产健康值 #Asset-health
        ec_asset_health = function (){
                var ucsmy_asset_health = echarts.init(document.getElementById('Asset-health'));
                    ucsmy_asset_health.setOption({
                        color: ['#04b0a6','#fad36a'],
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            showDelay: 0,
                            hideDelay: 1500,                            
                            formatter: function (da){
                                var da = da;
                                var _len = da.length;
                                var str = '';
                                var name = da[0].name+'<br>';
                                var detail ;
                                for (var i = 0;i < _len;i++) {
                                        str += da[i].seriesName +' : ';
                                        // str += Math.abs(da[i].value) +'<br>';
                                        str += da[i].value +'<br>';
                                }
                                detail  = name + str;
                                return detail;
                            }
                             
                            // formatter: '<span style="color:rgba(255,255,255,0.6)">{b0}<br/>{a0}：</span>{c0}<br/><span style="color:rgba(255,255,255,0.6)">{a1}：</span>{c1} 万元'
                        },
                        legend: {
                            show: false
                            // right: 20,
                            // top: 10,
                            // textStyle: {
                            //     color: '#04b0a6',
                            //     fontWeight: 'bold'
                            // },
                            // data: ['上周','本周']
                        },
                        grid: {
                            x: '13%',
                            y: '30%',
                            x2: '5%',
                            y2:'25%',
                            borderColor: 'transparent'
                        },
                        xAxis: [
                            {
                                type: 'category',
                                splitLine: {
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel:{
                                    textStyle:{
                                        color: '#a6f3ef'
                                    },
                                    margin: 20
                                },
                                data: []
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: false,
                                axisLine: {
                                    show:false,
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                min: -2,
                                max: 2,
                                // axisTickL: {show: false},
                                axisLabel:{
                                    formatter: function (da) {
                                        // return Math.abs(da);
                                        return da;
                                    },
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                },
                                splitNumber: 4,
                                splitArea : {
                                    show : true,
                                    areaStyle : {
                                        color : ['#024440','#006660','#03847d','#024440']
                                        // color: 'transparent'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'transparent'
                                        // color: '#013633'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '数值',
                                type: 'line',
                                symbol: 'emptyCircle',
                                symbolSize: 4,
                                itemStyle: {
                                    normal :{
                                        textStyle: {
                                            color: '#04b0a6'
                                        }
                                    }

                                },
                                data: []
                            }
                        ]
                    });
                return ucsmy_asset_health;
        },
         // 初始化 毛利率 #profit-rate
         ec_profit_rate = function (){
                var ucsmy_profit_rate = echarts.init(document.getElementById('profit-rate'));
                    ucsmy_profit_rate.setOption({
                        color: ['#04b0a6','#fad36a'],
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            showDelay: 0,
                            hideDelay: 1500,                            
                            formatter: function (da){
                                var da = da;
                                var _len = da.length;
                                var str = '';
                                var name = da[0].name+'<br>';
                                var detail ;
                                for (var i = 0;i < _len;i++) {
                                        str += da[i].seriesName +' : ';
                                        // str += Math.abs(da[i].value) +'<br>';
                                        str += da[i].value +'<br>';
                                }
                                detail  = name + str;
                                return detail;
                            }
                             
                            // formatter: '<span style="color:rgba(255,255,255,0.6)">{b0}<br/>{a0}：</span>{c0}<br/><span style="color:rgba(255,255,255,0.6)">{a1}：</span>{c1} 万元'
                        },
                        legend: {
                            show: false
                            // right: 20,
                            // top: 10,
                            // textStyle: {
                            //     color: '#04b0a6',
                            //     fontWeight: 'bold'
                            // },
                            // data: ['上周','本周']
                        },
                        grid: {
                            x: '13%',
                            y: '30%',
                            x2: '5%',
                            y2:'25%',
                            borderColor: 'transparent'
                        },
                        xAxis: [
                            {
                                type: 'category',
                                splitLine: {
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel:{
                                    textStyle:{
                                        color: '#a6f3ef'
                                    },
                                    margin: 20
                                },
                                data: []
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: false,
                                axisLine: {
                                    show:false,
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                min: -2,
                                max: 2,
                                // axisTickL: {show: false},
                                axisLabel:{
                                    formatter: function (da) {
                                        // return Math.abs(da);
                                        
                                        return da + '%';
                                    },
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                },
                                splitNumber: 4,
                                splitArea : {
                                    show : true,
                                    areaStyle : {
                                        color : ['#024440','#006660','#03847d','#024440']
                                        // color: 'transparent'
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'transparent'
                                        // color: '#013633'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '数值',
                                type: 'line',
                                symbol: 'emptyCircle',
                                symbolSize: 4,
                                itemStyle: {
                                    normal :{
                                        textStyle: {
                                            color: '#04b0a6'
                                        }
                                    }

                                },
                                data: []
                            }
                        ]
                    });
                return ucsmy_profit_rate;
        },
        // ec_profit_rate = function (){
        //         var ucsmy_profit_rate = echarts.init(document.getElementById('profit-rate'));
        //             ucsmy_profit_rate.setOption({
        //                 color: ['#04b0a6','#fad36a'],
        //                 tooltip: {
        //                     show: true,
        //                     trigger: 'axis',
        //                     showDelay: 0,
        //                     hideDelay: 1500,
        //                     //backgroundColor: '#d62d3d',
        //                     formatter: '<span style="color:rgba(255,255,255,0.6)">{b0}<br/>{a0}：</span>{c0}%<br/><span style="color:rgba(255,255,255,0.6)">{a1}：</span>{c1}%'
        //                 },
        //                 legend: {
        //                     show: false,
        //                     right: 20,
        //                     top: 10,
        //                     textStyle: {
        //                         color: '#04b0a6',
        //                         fontWeight: 'bold'
        //                     },
        //                     data: ['上周','本周']
        //                 },
        //                 grid: {
        //                     x: '10%',
        //                     y: '29%',
        //                     x2: '6%',
        //                     y2:'25%',
        //                     borderColor: 'transparent'
        //                 },
        //                 xAxis: [
        //                     {
        //                         type: 'category',
        //                         splitLine: {
        //                             lineStyle: {
        //                                 color: 'transparent'
        //                             }
        //                         },
        //                         axisLine: {
        //                             lineStyle: {
        //                                 color: 'transparent'
        //                             }
        //                         },
        //                         axisTick: {
        //                             show: false
        //                         },
        //                         axisLabel:{
        //                             textStyle:{
        //                                 color: '#a6f3ef'
        //                             },
        //                             margin: 20
        //                         },
        //                         data: []
        //                     }
        //                 ],
        //                 yAxis: [
        //                     {
        //                         type: 'value',
        //                         axisLine: {
        //                             lineStyle: {
        //                                 color: 'transparent'
        //                             }
        //                         },
        //                         axisLabel:{
        //                             formatter: '{value}%',
        //                             textStyle:{
        //                                 color: '#a6f3ef'
        //                             }
        //                         },
        //                         splitNumber: 4,
        //                         splitLine: {
        //                             lineStyle: {
        //                                 color: '#013633'
        //                             }
        //                         }
        //                     }
        //                 ],
        //                 series: [
        //                     {
        //                         name: '本周',
        //                         type: 'line',
        //                         symbol: 'circle',
        //                         symbolSize: 4,
        //                         itemStyle: {
        //                             normal :{
        //                                 textStyle: {
        //                                     color: '#04b0a6'
        //                                 }
        //                             }

        //                         },
        //                         data: []
        //                     },
        //                     {
        //                         name: '上周',
        //                         type: 'line',
        //                         symbol: 'circle',
        //                         symbolSize: 4,
        //                         data: []
        //                     }
        //                 ]
        //             });
        //         return ucsmy_profit_rate;
        // },
        // 初始化 资产规模 #asset-size
        ec_asset_size = function (param1,param2){
                var ucsmy_asset_size = echarts.init(document.getElementById('asset-size'));
                    ucsmy_asset_size.setOption({
                        title:{
                            show: false,
                            text:'资产规模（万元）',
                            top:10,
                            left:20,
                            textStyle: {
                                color: '#fff',
                                fontWeight: 'normal',
                                fontSize: 14
                            }
                        },
                        legend: {
                            show: false,
                            data:['引入平均率','存量','新增引入额','新增销售额', '连续销售额','输出平均率'],
                            top:10,
                            // right:30,
                            textStyle: {
                                color: '#a6f3ef'
                            }
                        },
                        tooltip : {
                            trigger: 'axis',
                            show: true,
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            showDelay: 0,    
                            formatter: function (da){
                                var da = da;
                                var _len = da.length;
                                var str = '';
                                var mon = '[ '+da[0].name+' ]<br>';
                                var detail ;

                                for (var i = 0;i < _len-2 ;i++) { // ‘ -2 ’ 不输出‘左侧总和’，‘右侧总和’ 
                                    // str += da[i].name +'\n';
                                        // str += da[i].seriesName +' : ';
                                        str += '<span style="color:rgba(255,255,255,0.6)">'+da[i].seriesName+':</span>';
                                        
                                    if ( da[i].seriesName  === param1 || da[i].seriesName  === param2 ) {
                                        str += Math.abs(da[i].value) +'%<br>';
                                    }
                                    else {
                                        str += numFormat(Math.abs(da[i].value)) +'<br>';
                                    }
                                    // console.warn(Math.abs(da[i].value))
                                }
                                detail  = mon+str;
                                return detail;
                            }
                            
                        },
                        color: ['#c43531','#7f0602','#fde5a5','#027d76','#0ab4ab','#ecc14f','transparent','transparent'],
                        grid: {
                            left: '4%',
                            right: '10%',
                            top: '13%',
                            bottom: '1%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'value',
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        width : 1,
                                        //分割线
                                        color : ['#012422','#012422','#012422','#fff','#012422','#012422','#012422']
                                    }
                                },
                                axisTick : {show: false},
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#04b0a6',
                                        width: 0
                                    }
                                },
                                min:-100,
                                max:100,
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        color: '#a6f3ef'
                                    },
                                    formatter: function(value){
                                        return Math.abs(value); 
                                    }
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                axisTick : {show: false},
                                splitLine: {
                                    lineStyle: {
                                        color: '#013633'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#04b0a6',
                                        width: 0
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#a6f3ef'
                                    }
                                },
                                data : []
                            }
                        ],
                        series : [
                            {
                                name:'输出平均率',
                                type:'bar',
                                stack: '',
                                itemStyle:{
                                    normal: {
                                        label: {
                                            textStyle : {
                                                color:'#fff'
                                            },
                                            show: true,
                                            position: 'right',
                                            formatter: function(p){

                                                return p.value + '%'; 
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            },
                             {
                                name:'引入平均率',
                                type:'bar',
                                stack: '',
                                itemStyle:{
                                    normal: {
                                        label: {
                                            textStyle : {
                                                color:'#fff'
                                            },
                                            show: true,
                                            position: 'left',
                                            formatter: function(p){
                                                return Math.abs(p.value) + '%'; 
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            },
                            {
                                name:'存量',
                                type:'bar',
                                stack: '',
                                itemStyle:{
                                    normal: {
                                        label: {
                                            textStyle : {
                                                color:'transparent'
                                            },
                                            show: true,
                                            position: 'inside',
                                            formatter: function(p){
                                                var num = numFormat_ny(Math.abs(p.value));
                                                return num;
                                                // return Math.abs(p.value);
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            },
                            {
                                name:'新增销售额',
                                type:'bar',
                                stack: '',
                                itemStyle : {
                                    normal: {
                                        label : {
                                            textStyle : {
                                                color:'transparent'
                                            },
                                            show: true,
                                            position: 'inside',
                                            formatter: function(p){
                                                var num = numFormat_ny(Math.abs(p.value));
                                                return num;
                                                // return Math.abs(p.value);
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            },
                            {
                                name:'连续销售额',
                                type:'bar',
                                stack: '',
                                itemStyle: {
                                    normal: {
                                        label : {
                                            textStyle : {
                                                color:'transparent'
                                            },
                                            show: true,
                                            position: 'inside',
                                            formatter: function(p){
                                                var num = numFormat_ny(Math.abs(p.value));
                                                return num;
                                                // return Math.abs(p.value);
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            },
                            {
                                name:'新增引入额',
                                type:'bar',
                                stack: '',
                                itemStyle:{
                                    normal: {
                                        label: {
                                            textStyle : {
                                                color:'transparent'
                                            },
                                            show: true,
                                            position: 'inside',
                                            formatter: function(p){
                                                var num = numFormat_ny(Math.abs(p.value));
                                                return num;
                                                // return Math.abs(p.value);
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            },
                            {
                                name:'左侧总和',
                                type:'bar',
                                stack: '',
                                itemStyle:{
                                    normal: {
                                        label: {
                                            textStyle : {
                                                color:'#fff'
                                            },
                                            show: true,
                                            position: 'insideRight',
                                            formatter: function(p){
                                                var num = numFormat_ny(Math.abs(p.value));
                                                return num;
                                                // return Math.abs(p.value);
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            },
                            {
                                name:'右侧总和',
                                type:'bar',
                                stack: '',
                                itemStyle:{
                                    normal: {
                                        label: {
                                            textStyle : {
                                                color:'#fff'
                                            },
                                            show: true,
                                            position: 'insideLeft',
                                            formatter: function(p){
                                                var num = numFormat_ny(Math.abs(p.value));
                                                return num;
                                                // return Math.abs(p.value);
                                            }
                                        }
                                    }
                                },
                                barGap: '25%',
                                barMaxWidth: 20,
                                data:[]
                            }
                            
                        ]

                           
                    });
                return ucsmy_asset_size;
        };

        // 装填并返回
        _ch.ucsmy_scale = ec_Scale;//引入规模（左）
        _ch.ucsmy_int_rate = ec_intRate;//利率（左）
        _ch.ucsmy_timeLine = ec_timeLine();//平均期限（左）

        _ch.ucsmy_asset_size = ec_asset_size('输出平均率','引入平均率');//资产规模（中）; **** 传入 需要转化成 ‘%’ 的数据名（tooltip） ****
        // _ch.ucsmy_profit_rate = ec_profit_rate();//毛利率（中）
        _ch.ucsmy_profit_rate = ec_profit_rate();//毛利率（中）
        _ch.ucsmy_asset_health = ec_asset_health();//资产健康值（中）

        _ch.ucsmy_sell_Scale = ec_sellScale;//销售规模（右）
        _ch.ucsmy_int_rate2 = ec_intRate2;//利率(右)
        _ch.ucsmy_timeLine2 = ec_timeLine2();//平均期限（右）

        return _ch ;

})();        