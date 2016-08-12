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
        var URL_scale = 'http://treportcenterapi.ucsmy.com/api/bi/in_scale';  //引入规模（左）
        var URL_int_rate = 'http://treportcenterapi.ucsmy.com/api/bi/in_rate';  //利率
        var URL_timeline = 'http://treportcenterapi.ucsmy.com/api/bi/in_duration';  //平均期限
        var URL_profit_rate = 'http://treportcenterapi.ucsmy.com/api/bi/grossProfitRate';  //毛利率
        var URL_asset_health = 'http://treportcenterapi.ucsmy.com/api/bi/health';  //资产健康值（中）
        var URL_asset_size = 'http://treportcenterapi.ucsmy.com/api/bi/scale';  //资产规模
        var URL_sell_scale = 'http://treportcenterapi.ucsmy.com/api/bi/in_scale';  //销售规模
        var URL_int_rate2 = 'http://treportcenterapi.ucsmy.com/api/bi/in_rate';  //利率
        var URL_timeline2 = 'http://treportcenterapi.ucsmy.com/api/bi/in_duration';  //平均期限（右）
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
                   if (typeof arg === 'undefined' || typeof callback === 'undefined') { return false;}
                   arg._type = typeof arg._type === 'undefined' ? 'GET' : arg._type; // 默认 请求方式为 'GET'
                   arg._dataType = typeof arg._dataType === 'undefined' ? 'json' : arg._dataType; // 默认数据类型为'json' 
                   arg._data = typeof arg._data === 'undefined' ? '' : arg._data; // 默认 data 为空
                   $.ajax({
                        url: arg._url,
                        type: arg._type,
                        dataType: arg._dataType,
                        data: arg._data,
                        success: function (ret) {
                            if (typeof ret !== "undefined" && ret.code === 1) {
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
                // console.info($(window).height());
            },
            // 加载数据、渲染   
            getData : function (o){
                var _ts = this;
                var ret1,ret2,ret3,ret4,ret5,ret6,ret7,ret9 ;
                // 默认为空  今日('tday')
                var o = _ts.o = typeof o === 'undefined' ? 'day' : o;
                // console.info(o);
                // 引入规模
                _ts.Request( { _url: URL_scale,_type:'POST',_data: {type:o,inoutflag : "in"} }, function (ret) { _ts._scale(ret); ret1 = ret});
                // 利率
                _ts.Request( { _url: URL_int_rate,_type:'POST',_data: {type:o,inoutflag : "in"} }, function (ret) { _ts._intrate(ret); ret2 = ret});
                // 销售规模
                _ts.Request( { _url: URL_sell_scale,_type:'POST',_data: {type:o,inoutflag : "out"} }, function (ret) { _ts._sell_Scale(ret); ret3 = ret});
                // 利率(右)
                _ts.Request( { _url: URL_int_rate2,_type:'POST',_data: {type:o,inoutflag : "out"} }, function (ret) { _ts._intrate2(ret); ret4 = ret});
                // 平均期限
                _ts.Request( { _url: URL_timeline,_type:'POST',_data: {type:o,inoutflag : "in"} }, function (ret) { _ts._time_Line(ret); ret5 = ret});
                // 平均期限(右)
                _ts.Request( { _url: URL_timeline2,_type:'POST',_data: {type:o,inoutflag : "out"} }, function (ret) { _ts._time_Line2(ret); ret6 = ret});
                // 毛利率
                _ts.Request( { _url: URL_profit_rate,_type:'POST',_data: {type:o} }, function (ret) { _ts._profit_rate(ret); ret7 = ret});
                // 健康值
                // _ts.Request( { _url: URL_profit_rate,_data: {type:o} }, function (ret) { _ts._profit_rate(ret); });
                // 资产规模
                _ts.Request( { _url: URL_asset_size,_type:'POST',_data: {type:o} }, function (ret) { _ts._asset_size(ret);});

                // 判断不是‘初始化’，返回
                if (o !== 'day') { return false;}
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
                 _ts.changeView();
                 // _ts.reLoad();
            },
            // 根据新的URL 重新渲染
            changeView : function () {
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

            },
            // 切换事件 : 资产健康值 | 毛利率
            getTab : function (){

                    var _ts = this,
                        o = 'day',
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
                        o = _ts.o;
                        if (index === 0) {
                             //资产健康值
                            _ts.Request( { _url: URL_asset_health,_type:'POST',_data: {type:o}  }, function (ret) { _ts._asset_health(ret); });
                        }else if (index === 1 && _ts.pro_Lock === true ) {
                              //毛利率
                            _ts.Request( { _url: URL_profit_rate,_type:'POST',_data: {type:o}  }, function (ret) { _ts._profit_rate(ret); });
                        }
                    });
            },
            // 引入规模 #scale
            _scale : function (ret1){
                    var totalNum = ret1.total;
                    var total = '';
                    var numFormat = function(num){
                        var ohm = parseInt(num / Math.pow(10,8)),
                            tenth = parseInt((num % Math.pow(10,8)) / Math.pow(10,4)),
                            yuan = parseInt( (num % Math.pow(10,8)) % Math.pow(10,4) ,10),
                            format = '';
                        var dms = num.toString().indexOf('.') === -1 ? '' : num.toString().split('.')[1];

                        if(ohm <= 0 && tenth <= 0){
                            format = yuan+'元';
                        }else if(ohm <= 0 && tenth > 0){
                            format = tenth+'万'+yuan+'元';
                        }else{
                            format = num.toString().indexOf('.') === -1 ? ohm+'亿'+tenth+'万'+yuan+ '元' : ohm+'亿'+tenth+'万'+yuan+'.'+dms+'元';
                        }
                        return format;
                    }
                    total = numFormat(totalNum);
                    // console.warn(total,totalNum);
                    $('#tle span').text(total);
                    var _ts = APP;
                    var len = ret1.xdata.length;
                    var arr = [];
                    if (_ts.pro_Lock) { 
                        for (var i = 0; i < len; i++) {
                            arr.push(ret1.xdata[i].name);
                            $('#outer1 .bb em').eq(i).text(arr[i]);
                            $('#outer1 .bb .icon').eq(i).addClass('fla'+ret1.xdata[i].state);
                            
                        }
                        ucsmy_scale.setOption({
                            xAxis: {
                                show : false,
                                // data : ret1.xdata
                                data : ret1.arr
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
                                show : true,
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
                    var len = ret2.xdata.length;
                    var arr = [];
                    if (_ts.pro_Lock) { 
                        for (var i = 0; i < len; i++) {
                            arr.push(ret2.xdata[i].name);
                            $('#outer2 .bb em').eq(i).text(arr[i]);
                            $('#outer2 .bb .icon').eq(i).addClass('fla'+ret2.xdata[i].state);
                            
                        }
                        ucsmy_int_rate.setOption({
                            xAxis: {
                                show : false,
                                data : arr
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
                                show: true,
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
                           
                            yAxis: {
                                data : ret5.ydata
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
                    var len = ret3.xdata.length;
                    var arr = [];
                    var totalNum = ret3.total;
                    var total = '';
                    var numFormat = function(num){
                        var decimals = num.toString().split('.')[1];
                        var ohm = parseInt(num / Math.pow(10,8)),
                            tenth = parseInt((num % Math.pow(10,8)) / Math.pow(10,4)),
                            yuan = parseInt( (num % Math.pow(10,8)) % Math.pow(10,4) ,10),
                            format = '';
                        var dms = num.toString().indexOf('.') === -1 ? '' : num.toString().split('.')[1];

                        if(ohm <= 0 && tenth <= 0){
                            format = yuan+'元';
                        }else if(ohm <= 0 && tenth > 0){
                            format = tenth+'万'+yuan+'元';
                        }else{
                            format = num.toString().indexOf('.') === -1 ? ohm+'亿'+tenth+'万'+yuan+ '元' : ohm+'亿'+tenth+'万'+yuan+'.'+dms+'元';
                        }
                        return format;
                    }
                    total = numFormat(totalNum);
                    // console.warn(total,totalNum);
                    $('#tle2 span').text(total);
                    
                    if (_ts.pro_Lock) { 
                        for (var i = 0; i < len; i++) {
                            arr.push(ret3.xdata[i].name);
                            $('#outer3 .bb em').eq(i).text(arr[i]);
                            $('#outer3 .bb .icon').eq(i).addClass('fla'+ret3.xdata[i].state);
                            
                        }
                        ucsmy_sell_Scale.setOption({
                            xAxis: {
                                show : false,
                                data : arr
                                // data : ret3.xdata
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
                                show : true,
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
                    var len = ret4.xdata.length;
                    var arr = [];
                    if (_ts.pro_Lock) { 
                        for (var i = 0; i < len; i++) {
                            arr.push(ret4.xdata[i].name);
                            $('#outer4 .bb em').eq(i).text(arr[i]);
                            $('#outer4 .bb .icon').eq(i).addClass('fla'+ret4.xdata[i].state);
                            
                        }
                        ucsmy_int_rate2.setOption({
                            xAxis: {
                                show : false,
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
                                show : true,
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
                            yAxis: {
                                data : ret6.ydata
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
                                data : ret7.xdata
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
                            data : ret8.xdata
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
                            data : ret9.yAxis[0].ydata
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