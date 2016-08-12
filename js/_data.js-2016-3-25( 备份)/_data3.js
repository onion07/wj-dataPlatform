/**
* [description 功能：获取数据，渲染数据列表 ]
* @version     [version]
* @author      Chen jinSheng
* @date        2016-01-29
* @anotherdate 2016-01-29T15:19:31+0800
* @return      {[type]}   APP
*/

/* 获取数据渲染 */
var _DA = (function (Ch){

        //  ==== URL ====
        var URL_scale = 'mockDemo/scale.json';  //引入规模（左）
        var URL_int_rate = 'mockDemo/int_rate.json';  //利率
        var URL_timeline = 'mockDemo/time_line.json';  //平均期限
        var URL_profit_rate = 'mockDemo/pro_rate.json';  //毛利率
        var URL_asset_health = 'mockDemo/asset_health.json';  //资产健康值（中）
        var URL_asset_size = 'mockDemo/asset_size.json';  //资产规模
        var URL_sell_scale = 'mockDemo/sell_scale.json';  //销售规模
        var URL_int_rate2 = 'mockDemo/int_rate.json';  //利率
        var URL_timeline2 = 'mockDemo/time_line.json';  //平均期限（右）
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

        var APP = {

            //显示隐藏锁
            pro_Lock : true,

            /*
             * 异步请求函数
             * Request参数：callback（必须），url(必须)，type（可选），dataType（可选），data（可选）
             */
            Request : function (arg,callback) {  
                   if (typeof arg === 'undefined' || typeof callback === 'undefined') { return;}
                   arg._type = typeof arg._type === 'undefined' ? 'GET' : arg._type; // 默认 请求方式为 'GET'
                   arg._dataType = typeof arg._dataType === 'undefined' ? 'json' : arg._dataType; // 默认数据类型为'json' 
                   arg._data = typeof arg._data === 'undefined' ? '' : arg._data; // 默认 data 为空
                   $.ajax({
                        url: arg._url,
                        type: arg._type,
                        dataType: arg._dataType,
                        data: arg._data,
                        success: function (ret) {
                            if (typeof ret !== "undefined") {
                                callback(ret);
                            }
                        },
                        error: function () {
                            console.warn && console.warn('网络错误！！');
                        }
                    });
            },
            // 初始化入口
            init : function (){
                var _ts = this;
                _ts.getData();
            },
            // 加载数据、渲染   
            getData : function (o){
                var _ts = this;
                var ret1,ret2,ret3,ret4,ret5,ret6,ret7,ret9 ;
                // 默认为空  今日('tday')
                var o = _ts.o = typeof o === 'undefined' ? '' : o;
                // console.info(o);
                // 引入规模
                _ts.Request( { _url: URL_scale,_data: {type:o} }, function (ret) { _ts._scale(ret); ret1 = ret});
                // 利率
                // _ts.Request( { _url: URL_int_rate,_data: {type:o} }, function (ret) { _ts._intrate(ret); ret2 = ret});
                // 销售规模
                // _ts.Request( { _url: URL_sell_scale,_data: {type:o} }, function (ret) { _ts._sell_Scale(ret); ret3 = ret});
                // 利率(右)
                // _ts.Request( { _url: URL_int_rate2,_data: {type:o} }, function (ret) { _ts._intrate2(ret); ret4 = ret});
                // 平均期限
                // _ts.Request( { _url: URL_timeline,_data: {type:o} }, function (ret) { _ts._time_Line(ret); ret5 = ret});
                // 平均期限(右)
                // _ts.Request( { _url: URL_timeline2,_data: {type:o} }, function (ret) { _ts._time_Line2(ret); ret6 = ret});
                // 毛利率
                // _ts.Request( { _url: URL_profit_rate,_data: {type:o} }, function (ret) { _ts._profit_rate(ret); ret7 = ret});
                // 健康值
                // _ts.Request( { _url: URL_profit_rate,_data: {type:o} }, function (ret) { _ts._profit_rate(ret); });
                // 资产规模
                // _ts.Request( { _url: URL_asset_size,_data: {type:o} }, function (ret) { _ts._asset_size(ret);});

                // 有参数，不是‘初始化’，返回
                if (o) { return false;}
                // DOM 事件
                setTimeout(function () {
                    _ts.handle(ret1,ret2,ret3,ret4,ret5,ret6,ret7);
                },500);
                
            },
            // DOM 事件
            handle : function (ret1,ret2,ret3,ret4,ret5,ret6,ret7) {
                var _ts = this;
                // 健康值和毛率切换
                 _ts.getTab();
                 //左下角 ‘显示’，‘隐藏’
                 _ts.isShow(ret1,ret2,ret3,ret4,ret5,ret6,ret7);
                 // ‘今日、本周、本月、今年 ’切换
                 _ts.reLoad();
            },
            // 根据新的URL 重新渲染
            reLoad : function () {
                var _ts = this;
                var $tarLi= $('.date-selector li');
                var index = 0;
                var _arg ; // 发送到服务器
                $tarLi.click(function () {
                    index = $(this).index();
                    $tarLi.removeClass('cur').eq(index).addClass('cur');
                    _arg = $(this).attr('data-type');
                    // 重新加载数据
                    _ts.getData(_arg);
                });
            },
            // 左下角：显示隐藏事件
            isShow : function (ret1,ret2,ret3,ret4,ret5,ret6,ret7) {
                    var _ts = this,
                        _btn = $('#hs-lock'),
                        index = 0,
                        y = ['显示','隐藏'];
                    if (!ret1 || !ret2 || !ret3 || !ret4 || !ret5 || !ret6 || !ret7) {  console.warn('部分请求失败！'); return false;}
                    _btn.click(function () {
                        //隐藏
                        if (index === 0) { 
                            $(this).text(y[0]);
                            $('.label').hide();
                            _ts.pro_Lock = false;
                            index = 1;
                        }
                        //显示
                        else {
                            $(this).text(y[1]);
                            $('.label').show();
                            _ts.pro_Lock = true;
                            index = 0;
                        }
                        // 重新渲染
                        _ts._scale(ret1);
                        _ts._intrate(ret2);
                        _ts._sell_Scale(ret3);
                        _ts._intrate2(ret4);
                        _ts._time_Line(ret5);
                        _ts._time_Line2(ret6);
                        _ts._profit_rate(ret7);
                    });
                     // $('.footer').on('click','#hs-lock',function () {
                     //    console.info($(this));
                     // });

            },
            // 切换事件 : 资产健康值 | 毛利率
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
                            _ts.Request( { _url: URL_asset_health }, function (ret) { _ts._asset_health(ret); });
                        }else if (index === 1 && _ts.pro_Lock === true ) {
                              //毛利率
                            _ts.Request( { _url: URL_profit_rate }, function (ret) { _ts._profit_rate(ret); });
                        }
                    });
            },
            // 引入规模 #scale
            _scale : function (ret1){
                    $('#tle span').text(ret1.total);
                    var _ts = APP;
                    console.info(ret1);
                    if (_ts.pro_Lock) { 
                        ucsmy_scale.setOption({
                            xAxis: {
                                data : ret1.data
                            },
                            series: [
                                {
                                    name: ret1.series.name,
                                    data: ret1.series.data
                                }
                            ]
                        });
                    }
                    else {
                          ucsmy_scale.setOption({
                            xAxis: {
                                data : ret1.chg
                            },
                            series: [
                                {
                                    name: ret1.series.name,
                                    data: ret1.series.data
                                }
                            ]
                        });
                    }

            },
             // 利率 #int-rate
            _intrate : function (ret2){
                    var _ts = APP;
                    
                    if (_ts.pro_Lock) { 
                        ucsmy_int_rate.setOption({
                            xAxis: {
                                data : ret2.data
                            },
                            series: [
                                {
                                    name: ret2.series.name,
                                    data: ret2.series.data
                                }
                            ]
                        });
                    }
                    else {
                          ucsmy_int_rate.setOption({
                            xAxis: {
                                data : ret2.chg
                            },
                            series: [
                                {
                                    name: ret2.series.name,
                                    data: ret2.series.data
                                }
                            ]
                        });
                    }
            },
              // 平均期限 #timeline
            _time_Line : function (ret5) {
                    var _ts = APP;
                    
                    if (_ts.pro_Lock) { 
                        ucsmy_timeLine.setOption({
                            xAxis: {
                                data : ret5.data
                            },
                            yAxis: {
                                data : ret5.data
                            },
                            series: [
                                {
                                    name: ret5.series.name,
                                    data: ret5.series.data
                                }
                            ]
                        });
                    }
                    else {
                        ucsmy_timeLine.setOption({
                            xAxis: {
                                data : ret5.data
                            },
                            yAxis: {
                                data : ret5.chg
                            },
                            series: [
                                {
                                    name: ret5.series.name,
                                    data: ret5.series.data
                                }
                            ]
                        });
                    }
            },
            // 销售规模 #sell-scale
            _sell_Scale : function (ret3){
                    var _ts = APP;

                    $('#tle2 span').text(ret3.total);
                    
                    if (_ts.pro_Lock) { 
                        ucsmy_sell_Scale.setOption({
                            xAxis: {
                                data : ret3.data
                            },
                            series: [
                                {
                                    name: ret3.series.name,
                                    data: ret3.series.data
                                }
                            ]
                        });
                    }
                    else {
                        ucsmy_sell_Scale.setOption({
                            xAxis: {
                                data : ret3.chg
                            },
                            series: [
                                {
                                    name: ret3.series.name,
                                    data: ret3.series.data
                                }
                            ]
                        });
                    }
            },
             // 利率 #int-rate
            _intrate2 : function (ret4){
                    var _ts = APP;
                    
                    if (_ts.pro_Lock) { 
                        ucsmy_int_rate2.setOption({
                            xAxis: {
                                data : ret4.data
                            },
                            series: [
                                {
                                    name: ret4.series.name,
                                    data: ret4.series.data
                                }
                            ]
                        });
                    }
                    else {
                        ucsmy_int_rate2.setOption({
                            xAxis: {
                                data : ret4.chg
                            },
                            series: [
                                {
                                    name: ret4.series.name,
                                    data: ret4.series.data
                                }
                            ]
                        });
                    }
            },
              // 平均期限 #timeline2
            _time_Line2 : function (ret6){
                    var _ts = APP;
                    
                    if (_ts.pro_Lock) { 
                        ucsmy_timeLine2.setOption({
                            xAxis: {
                                data : ret6.data
                            },
                            yAxis: {
                                data : ret6.data
                            },
                            series: [
                                {
                                    name: ret6.series.name,
                                    data: ret6.series.data
                                }
                            ]
                        });
                    }
                    else {
                        ucsmy_timeLine2.setOption({
                            xAxis: {
                                data : ret6.data
                            },
                            yAxis: {
                                data : ret6.chg
                            },
                            series: [
                                {
                                    name: ret6.series.name,
                                    data: ret6.series.data
                                }
                            ]
                        });
                    }
            },
              // 毛利率 #profit-rate
            _profit_rate : function (ret7){
                    var _ts = APP;
                    
                    if (_ts.pro_Lock) { 
                        ucsmy_profit_rate.setOption({
                            xAxis: {
                                data : ret7.data
                            },
                            series: [
                                {
                                    name: ret7.series[0].name,
                                    data: ret7.series[0].data
                                },
                                {
                                    name: ret7.series[1].name,
                                    data: ret7.series[1].data
                                }
                            ]
                        });
                    }
                    else {
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
                    }

            },
              // 健康值 #Asset-health
            _asset_health : function (ret8){

                    ucsmy_asset_health.setOption({
                        xAxis: {
                            data : ret8.data
                        },
                        series: [
                            {
                                name: ret8.series[0].name,
                                data: ret8.series[0].data
                            }
                        ]
                    });
            },
            // 资产规模 #asset-size
            _asset_size : function (ret9){
                    ucsmy_asset_size.setOption({
                        yAxis: {
                            data : ret9.yAxis[0].data
                        },
                        series: [
                            {
                                stack : ret9.series[0].stack,
                                data: ret9.series[0].data
                            },
                            {
                                stack : ret9.series[1].stack,
                                data: ret9.series[1].data
                            },
                            {
                                stack : ret9.series[2].stack,
                                data: ret9.series[2].data
                            },
                            {
                                stack : ret9.series[3].stack,
                                data: ret9.series[3].data
                            },
                            {
                                stack : ret9.series[4].stack,
                                data: ret9.series[4].data
                            },
                            {
                                stack : ret9.series[5].stack,
                                data: ret9.series[5].data
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