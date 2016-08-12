/**
* [ 功能：获取数据，渲染 ]
* @version     [version]
* @author      Chen jinSheng
* @date        2016-01-29
* @anotherdate 2016-01-29T15:19:31+0800
* @return      {[type]}   APP
*/

/* 获取数据渲染 */
var _DA = (function (Ch){

        //  ==== URL ====
        var URL_scale = 'mockDemo/scale.json';
        var URL_int_rate = 'mockDemo/int_rate.json';
        var URL_timeline = 'mockDemo/time_line.json';
        var URL_profit_rate = 'mockDemo/pro_rate.json';//中间
        var URL_asset_health = 'mockDemo/asset_health.json';//中间
        var URL_asset_size = 'mockDemo/asset_size.json';//中间
        var URL_sell_scale = 'mockDemo/sell_scale.json';
        var URL_int_rate2 = 'mockDemo/int_rate.json';
        var URL_timeline2 = 'mockDemo/time_line.json';
        // 接收初始化的图表
        var ucsmy_scale = Ch.ucsmy_scale;
        var ucsmy_int_rate = Ch.ucsmy_int_rate;
        var ucsmy_timeLine = Ch.ucsmy_timeLine;
        var ucsmy_profit_rate = Ch.ucsmy_profit_rate;//中间
        var ucsmy_asset_health = Ch.ucsmy_asset_health;//中间
        var ucsmy_asset_size = Ch.ucsmy_asset_size;//中间
        var ucsmy_sell_Scale = Ch.ucsmy_sell_Scale;
        var ucsmy_int_rate2 = Ch.ucsmy_int_rate2;
        var ucsmy_timeLine2 = Ch.ucsmy_timeLine2;

        var APP ={
            //毛利率锁
            pro_Lock : true,
            init : function (){
                var _ts = this;
                _ts.getData();
            },
            // 加载数据、渲染   
            getData : function (){
                var _ts = this;
                $.ajax(function () {
                    
                });
                // 异步加载数据
                $.when( 
                        $.ajax(URL_scale),
                        $.ajax(URL_int_rate),
                        $.ajax(URL_sell_scale),
                        $.ajax(URL_int_rate2),
                        $.ajax(URL_timeline),
                        $.ajax(URL_timeline2),
                        $.ajax(URL_profit_rate),
                        $.ajax(URL_asset_size)
                  )
                  .done(function (ret1,ret2,ret3,ret4,ret5,ret6,ret7,ret9){
                        // 请求成功，渲染
                        _ts._scale(ret1);
                        _ts._intrate(ret2);
                        _ts._sell_Scale(ret3);
                        _ts._intrate2(ret4);
                        _ts._time_Line(ret5);
                        _ts._time_Line2(ret6);
                        _ts._profit_rate(ret7);
                        _ts._asset_size(ret9);
                  })
                  .done(function (){
                        _ts.getTab();
                  })
                  .done(function (ret1,ret2,ret3,ret4,ret5,ret6,ret7){
                        _ts.isShow(ret1,ret2,ret3,ret4,ret5,ret6,ret7);
                  })
                  .fail(function (){
                        alert('网络错误！请重新刷新网页！');
                  });
            },
            // 显示隐藏按钮
            isShow : function (ret1,ret2,ret3,ret4,ret5,ret6,ret7) {

                    var _ts = this,
                        _btn = $('#hs-lock'),
                        index = 0,
                        y = ['显示','隐藏'];

                    // var builWidth = function (parent) {
                    //     for (var i = 0,len = parent.find('.cur li').length; i< len; i++) {
                    //         (function (i){
                    //             var c = parent.find('.cur li').eq(i).width();
                    //             parent.find('.cc li').eq(i).css({width : c});
                    //         })(i);
                    //     }
                    // };
                    // builWidth($('#outer1'));
                    // builWidth($('#outer2'));
                    // builWidth($('#outer3'));
                    // builWidth($('#outer4'));

                    _btn.click(function () {
                        // var c_ele = $('.label .cc');
                        // var b_ele = $('.label .bb');
                        // console.info(index);
                        // //隐藏
                        // if (index === 0) { 
                        //     $(this).text(y[0]);
                        //     b_ele.removeClass('cur')
                        //     c_ele.addClass('cur');
                            
                        //     index = 1;
                        // }
                        // //显示
                        // else {
                        //     $(this).text(y[1]);
                        //     c_ele.removeClass('cur');
                        //     b_ele.addClass('cur');
                        //     index = 0;
                        // }
                      
                       //隐藏
                        if (index === 0) { 
                            $(this).text(y[0]);
                            $('.label').hide();
             
                            _ts.pro_Lock = false;
                            //引入规模
                            ucsmy_scale.setOption({
                                xAxis: {
                                    axisLabel:{show: true},
                                    data : ret1[0].chg
                                }
                            });
                            //销售规模
                            ucsmy_sell_Scale.setOption({
                                xAxis: {
                                    axisLabel:{show: true},
                                    data : ret3[0].chg
                                }
                            });
                            //利率
                            ucsmy_int_rate.setOption({
                                xAxis: {
                                    axisLabel:{show: true},
                                    data : ret2[0].chg
                                }
                            });
                            ucsmy_int_rate2.setOption({
                                xAxis: {
                                    axisLabel:{show: true},
                                    data : ret4[0].chg
                                }
                            });
                            //平均期限
                            ucsmy_timeLine.setOption({
                                yAxis: {
                                    data : ret5[0].chg
                                }
                            });
                            ucsmy_timeLine2.setOption({
                                yAxis: {
                                    data : ret6[0].chg
                                }
                            });
                            // 毛利率
                             ucsmy_profit_rate.setOption({
                                xAxis: {
                                    data : []
                                },
                                series: [
                                    {
                                        data: []
                                    },
                                    {
                                        data: []
                                    }
                                ]
                            });

                            index = 1;
                        }
                        //显示
                        else {
                            $(this).text(y[1]);
                            $('.label').show();
                            
                            _ts.pro_Lock = true;
                            //引入规模
                            ucsmy_scale.setOption({
                                xAxis: {
                                    axisLabel:{show: false},
                                    data : ret1[0].chg
                                }
                            });
                            //销售规模
                            ucsmy_sell_Scale.setOption({
                                xAxis: {
                                    axisLabel:{show: false},
                                    data : ret3[0].chg
                                }
                            });
                            //利率
                            ucsmy_int_rate.setOption({
                                xAxis: {
                                    axisLabel:{show: false},
                                    data : ret2[0].chg
                                }
                            });
                            ucsmy_int_rate2.setOption({
                                xAxis: {
                                    axisLabel:{show: false},
                                    data : ret4[0].chg
                                }
                            });
                            //平均期限
                            ucsmy_timeLine.setOption({
                                yAxis: {
                                    data : ret5[0].data
                                }
                            });
                            ucsmy_timeLine2.setOption({
                                yAxis: {
                                    data : ret6[0].data
                                }
                            });
                            //毛利率
                            ucsmy_profit_rate.setOption({
                                xAxis: {
                                    data : ret7[0].data
                                },
                                series: [
                                    {
                                        data: ret7[0].series[0].data
                                    },
                                    {
                                        data: ret7[0].series[1].data
                                    }
                                ]
                            });

                            index = 0;
                        }
                       
                    });

            },
            // DOM事件 : 资产健康值 | 毛利率
            getTab : function (){

                    var _ts = this,
                        index = 1,
                        _tabHead = $('#tab-head'),
                        _tab = _tabHead.find('span'),
                        _tabcn = $('.tabCn');

                    if ( _tabHead.length < 1 ) {return false;}

                    _tab.click(function (e){
                        e.preventDefault();
                        index = _tab.index(e.currentTarget);
                        _tab.removeClass('cur').eq(index).addClass('cur');
                        _tabcn.removeClass('cur').eq(index).addClass('cur');
                        if (index === 0) {
                             //资产健康值
                             $.when($.ajax(URL_asset_health),{})
                              .done(function (ret8){
                                    _ts._asset_health(ret8);
                              })
                              .fail(function (){alert('网络错误！请重新刷新网页！')});
                        }else if (index === 1 && _ts.pro_Lock === true ) {
                              //毛利率
                             $.when($.ajax(URL_profit_rate),{})
                              .done(function (ret7){
                                    _ts._profit_rate(ret7);
                              })
                              .fail(function (){alert('网络错误！请重新刷新网页！')});
                        }
                    });
            },
            // 引入规模 #scale
            _scale : function (ret1){
                    $('#tle span').text(ret1[0].total);
                    ucsmy_scale.setOption({
                        xAxis: {
                            data : ret1[0].data
                        },
                        series: [
                            {
                                name: ret1[0].series.name,
                                data: ret1[0].series.data
                            }
                        ]
                    });

                    var len = ret1[0].data.length;
                    // console.info(ret1[0].data.length);
                    // $('#label li').width((14.54545)+'%');

            },
             // 利率 #int-rate
            _intrate : function (ret2){
                    ucsmy_int_rate.setOption({
                        xAxis: {
                            data : ret2[0].data
                        },
                        series: [
                            {
                                name: ret2[0].series.name,
                                data: ret2[0].series.data
                            }
                        ]
                    });
            },
              // 平均期限 #timeline
            _time_Line : function (ret5) {
                    ucsmy_timeLine.setOption({
                        xAxis: {
                            data : ret5[0].data
                        },
                        yAxis: {
                            data : ret5[0].data
                        },
                        series: [
                            {
                                name: ret5[0].series.name,
                                data: ret5[0].series.data
                            }
                        ]
                    });
            },
            // 销售规模 #sell-scale
            _sell_Scale : function (ret3){
                    $('#tle2 span').text(ret3[0].total);
                    ucsmy_sell_Scale.setOption({
                        xAxis: {
                            data : ret3[0].data
                        },
                        series: [
                            {
                                name: ret3[0].series.name,
                                data: ret3[0].series.data
                            }
                        ]
                    });
            },
             // 利率 #int-rate
            _intrate2 : function (ret4){
                    ucsmy_int_rate2.setOption({
                        xAxis: {
                            data : ret4[0].data
                        },
                        series: [
                            {
                                name: ret4[0].series.name,
                                data: ret4[0].series.data
                            }
                        ]
                    });
            },
              // 平均期限 #timeline2
            _time_Line2 : function (ret6){
                    ucsmy_timeLine2.setOption({
                        xAxis: {
                            data : ret6[0].data
                        },
                        yAxis: {
                            data : ret6[0].data
                        },
                        series: [
                            {
                                name: ret6[0].series.name,
                                data: ret6[0].series.data
                            }
                        ]
                    });
            },
              // 平均期限 #profit-rate
            _profit_rate : function (ret7){
                    ucsmy_profit_rate.setOption({
                        xAxis: {
                            data : ret7[0].data
                        },
                        series: [
                            {
                                name: ret7[0].series[0].name,
                                data: ret7[0].series[0].data
                            },
                            {
                                name: ret7[0].series[1].name,
                                data: ret7[0].series[1].data
                            }
                        ]
                    });
            },
              // 平均期限 #Asset-health
            _asset_health : function (ret8){
                    ucsmy_asset_health.setOption({
                        xAxis: {
                            data : ret8[0].data
                        },
                        series: [
                            {
                                name: ret8[0].series[0].name,
                                data: ret8[0].series[0].data
                            },
                            {
                                name: ret8[0].series[1].name,
                                data: ret8[0].series[1].data
                            }
                        ]
                    });
            },
            // 资产规模 #asset-size
            _asset_size : function (ret9){
                    ucsmy_asset_size.setOption({
                        yAxis: {
                            data : ret9[0].yAxis[0].data
                        },
                        series: [
                            {
                                stack : ret9[0].series[0].stack,
                                data: ret9[0].series[0].data
                            },
                            {
                                stack : ret9[0].series[1].stack,
                                data: ret9[0].series[1].data
                            },
                            {
                                stack : ret9[0].series[2].stack,
                                data: ret9[0].series[2].data
                            },
                            {
                                stack : ret9[0].series[3].stack,
                                data: ret9[0].series[3].data
                            },
                            {
                                stack : ret9[0].series[4].stack,
                                data: ret9[0].series[4].data
                            },
                            {
                                stack : ret9[0].series[5].stack,
                                data: ret9[0].series[5].data
                            }
                        ]
                    });
            }
        }   
        return APP;
})(Ch);


/********** 入口 **********/
$(function (){
    _DA.init();
});