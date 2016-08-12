/**
 * [辅助线]
 * @version     [version]
 * @author      Chen jinSheng
 * @date        2016-03-11
 * @anotherdate 2016-03-11T16:22:53+0800
 * @param       {Object}) { var _grid [description]
 * @return      {[type]}  [description]
 */
var Grid = (function () {
    var _grid = {};

    // 引入规模
    var scale_subline = function (ret1){

         // ‘元’改成‘万元’
           var Ser_data1 = [];
           var baseData = ret1.series.data;
           for (var i = 0; i < baseData.length; i++) {
                Ser_data1.push(baseData[i]/10000);
           }

        var ucsmy_scale0 = echarts.init(document.getElementById('scale0'));
                            
                        ucsmy_scale0.setOption({
                                title : {
                                    show : true,
                                    text:'引入规模',
                                    left:3,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14
                                    },
                                    top:5
                                },
                                  grid: {
                                    x: 60,
                                    x2: 2,
                                    y: 60,
                                    y2: 40
                                },
                              
                                xAxis : [
                                    {
                                        show : false,
                                        type : 'category',
                                        data : [],
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
                                            show: false,
                                            textStyle:{
                                                color: '#a6f3ef'
                                            }
                                        }
                                        
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value',
                                        splitArea : {show : false},
                                        nameTextStyle : {color : '#666'},
                                        nameGap : 15,
                                        splitArea : {
                                            show : false
                                        },
                                        axisTick: false,
                                        splitLine : {
                                            show : false,
                                            lineStyle: {
                                                color: '#013835',
                                                width: 1
                                            }
                                        },
                                        axisLabel:{
                                            formatter: function (da) {
                                                if (da === 0) { da = da + ' (万)';}
                                                return da;
                                            },
                                            textStyle:{
                                                color: '#a6f3ef'
                                            }
                                        }
                                    }
                                ],
                                series : [
                                    {
                                        name:'总额',
                                        type:'bar',
                                        // 装填数据
                                        data:Ser_data1,
                                        barGap: '50%',
                                        barCategoryGap : '20%',
                                        barMaxWidth: 20
                                    }
                                ],
                                color : ['transparent']
                            });

    },
    // 销售规模
    scale_sell_subline = function (ret3){

        // ‘元’改成‘万元’
           var Ser_data3 = [];
           var baseData = ret3.series.data;
           for (var i = 0; i < baseData.length; i++) {
                Ser_data3.push(baseData[i]/10000);
           }

        var ucsmy_sellScale0 = echarts.init(document.getElementById('sell-scale0'));
                            
                        ucsmy_sellScale0.setOption({
                                title : {
                                    show : true,
                                    text:'销售规模',
                                    left:3,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14
                                    },
                                    top:5
                                },
                                  grid: {
                                    x: 60,
                                    x2: 2,
                                    y: 60,
                                    y2: 40
                                },
                                xAxis : [
                                    {
                                        show : false,
                                        type : 'category',
                                        data : [],
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
                                            show: false,
                                            textStyle:{
                                                color: '#a6f3ef'
                                            }
                                        }
                                        
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value',
                                        splitArea : {show : false},
                                        nameTextStyle : {color : '#666'},
                                        nameGap : 15,
                                        splitArea : {
                                            show : false
                                        },
                                        splitLine : {
                                            show : false,
                                            lineStyle: {
                                                color: '#013835',
                                                width: 1
                                            }
                                        },
                                        axisTick : false,
                                        axisLabel:{
                                            formatter: function (da) {
                                                if (da === 0) { da = da + ' (万)';}
                                                return da;
                                            },
                                            textStyle:{
                                                color: '#a6f3ef'
                                            }
                                        }
                                    }
                                ],
                                series : [
                                    {
                                        name:'总额',
                                        type:'bar',
                                        data:Ser_data3,
                                        barGap: '50%',
                                        barCategoryGap : '20%',
                                        barMaxWidth: 20
                                    }
                                ],
                                color : ['transparent']
                            });

    },
    // 利率（左）
    intRate_subline = function (ret2) {
        var ucsmy_int_rate = echarts.init(document.getElementById('int-rate0'));
                    ucsmy_int_rate.setOption({
                        title : {
                            show : true,
                            text:'利率',
                            left:3,
                            top:7,
                            textStyle: {
                                color: '#fff',
                                fontSize:14

                            }
                        },
                       grid: {
                            x: 45,
                            x2: 2,
                            y: 40,
                            y2: 40
                        },
                        boundaryGap : ['15%','20%'],
                        tooltip : {
                            trigger: 'axis',
                            formatter: '{b}<br>{a} : {c}%'
                        },
                        legend: {
                            show: false,
                            data: ['利率']
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : [],
                                show :false,
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
                                        var value = da + '%';
                                        return value;
                                    },
                                    textStyle:{
                                        color: '#a6f3ef'
                                    }
                                },
                                axisTick: false,
                                // min : 0,
                                // max : 40,
                                axisLine: {
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                splitLine : {
                                    show : false,
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
                        color : ['transparent']
                    });
    },
    // 利率（右）
    intRate2_subline = function (ret4) {
        var ucsmy_int_rate2 = echarts.init(document.getElementById('int-rate20'));
                    ucsmy_int_rate2.setOption({
                        title : {
                            show : true,
                            text:'利率',
                            left:3,
                            top:7,
                            textStyle: {
                                color: '#fff',
                                fontSize:14
                            }
                        },
                       grid: {
                            x: 50,
                            x2: 2,
                            y: 40,
                            y2: 40
                        },
                        boundaryGap : ['15%','20%'],
                        tooltip : {
                            trigger: 'axis',
                            formatter: '{b}<br>{a} : {c}%'
                        },
                        legend: {
                            show: false,
                            data: ['利率']
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : [],
                                show :false,
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
                                axisLine: {
                                    lineStyle: {
                                        color: 'transparent'
                                    }
                                },
                                splitLine : {
                                    show : false,
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
                        color : ['transparent']
                    });
    };

    // scale0
    _grid.scale0 = scale_subline;
    // ssell-scale0
    _grid.sell_scale0 = scale_sell_subline;
      // int-rate0
    _grid.int_rate0 = intRate_subline;
     // int-rate20
    _grid.int_rate20 = intRate2_subline;
    

    return _grid;
})();