/**
* [description 功能：获取数据，渲染数据列表 ]
* @version     [version]
* @author      Chen jinSheng
* @date        2016-01-29
* @anotherdate 2016-01-29T15:19:31+0800
* @return      {[type]}   APP
*/

/* 获取数据渲染 */
var _DA = (function (Ch,Grid){

        /*  ==== URL ==== */
        var URL_scale = 'mockDemo/scale.json';  //引入规模（左）
        var URL_int_rate = 'mockDemo/int_rate.json';  //利率
        var URL_timeline = 'mockDemo/time_line.json';  //平均期限
        var URL_profit_rate = 'mockDemo/pro_rate.json';  //毛利率
        var URL_asset_health = 'mockDemo/asset_health.json';  //资产健康值（中）
        var URL_asset_size = 'mockDemo/asset_size.json';  //资产规模
        var URL_sell_scale = 'mockDemo/sell_scale.json';  //销售规模
        var URL_int_rate2 = 'mockDemo/int_rate.json';  //利率
        var URL_timeline2 = 'mockDemo/time_line.json';  //平均期限（右）

        // var URL_scale = 'http://reportcenterapi.ucsmy.com/api/bi/in_scale';  //引入规模（左）
        // var URL_int_rate = 'http://reportcenterapi.ucsmy.com/api/bi/in_rate';  //利率
        // var URL_timeline = 'http://reportcenterapi.ucsmy.com/api/bi/in_duration';  //平均期限
        // var URL_profit_rate = 'http://reportcenterapi.ucsmy.com/api/bi/grossProfitRate';  //毛利率
        // var URL_asset_health = 'http://reportcenterapi.ucsmy.com/api/bi/health';  //资产健康值（中）
        // var URL_asset_size = 'http://reportcenterapi.ucsmy.com/api/bi/scale';  //资产规模
        // var URL_sell_scale = 'http://reportcenterapi.ucsmy.com/api/bi/in_scale';  //销售规模
        // var URL_int_rate2 = 'http://reportcenterapi.ucsmy.com/api/bi/in_rate';  //利率
        // var URL_timeline2 = 'http://reportcenterapi.ucsmy.com/api/bi/in_duration';  //平均期限（右）
        
        /*  接收初始化的图表  */
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
                            else {
                                console.warn && console.warn('失败，返回的code !== 1');
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
                _ts.Request( { _url: URL_asset_health,_type:'POST',_data: {type:o}  }, function (ret) { _ts._asset_health(ret); });
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
                    _ts.clearIntor();
                    if ( $(this).hasClass("cur") ) {  return false; }
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
                    // console.info(!ret5);
                    _btn.click(function () {
                        // 清除滚动条的定时器
                        _ts.clearIntor();
                        //隐藏
                        if (index === 0) { 
                            $(this).text(y[0]);
                            $('.label').hide();
                            // $('.label').addClass('hien');
                            _ts.pro_Lock = false;
                            index = 1;
                        }
                        //显示
                        else {
                            $(this).text(y[1]);
                            $('.label').show();
                            // $('.label').removerClass('hien');
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
                        // 清除滚动条的定时器
                        _ts.clearIntor();

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
            // 清除滚动条的定时器
            clearIntor : function () {
                    var _ts = this;
                    clearInterval(_ts.leTime4);
                    clearInterval(_ts.leTime3);
                    clearInterval(_ts.leTime2);
                    clearInterval(_ts.leTime1);
            },
            // 引入规模 #scale
            _scale : function (ret1,is_show_button){

                    /********* @引入总额 *********/
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
                            // format = num.toString().indexOf('.') === -1 ? ohm+'亿'+tenth+'万'+yuan+ '元' : ohm+'亿'+tenth+'万'+yuan+'.'+dms+'元';
                            format = ohm+'亿'+tenth+'万'+yuan+ '元';
                        }
                        return format;
                    }
                    total = numFormat(totalNum);
                    $('#tle span').text(total);



                    /********* @渲染X轴的银行名 *********/
                    var _ts = APP;
                    var len = ret1.xdata.length;
                    var arr = [];
                    if (_ts.pro_Lock) { 
                        var _html = '';

                        for (var i = 0; i < len; i++) {
                            arr.push(ret1.xdata[i].name);
                            // $('#outer1 .bb em').eq(i).text(arr[i]);
                            _html += '<li><em>'+arr[i]+'</em><span class="icon '+'fla'+ret1.xdata[i].state+'"></span></li>'

                            
                        }
                        // 渲染银行名
                        $('#outer1 .bb').html(_html);

                        // 获取宽度，设置宽度
                        var liW = $('#outer1 .label li').outerWidth();
                        var _w = liW * len;

                        $('#outer1 .label').width(_w);
                        $('#outer1').height($('.b1').height());
                        $('#scale').width(_w);
                        
                        // 向echart装填数据
                        Ch.ucsmy_scale(ret1,false);
                        // 辅助线
                        Grid.scale0(ret1);


                    }
                    else {
                        // 隐藏银行名
                        Ch.ucsmy_scale(ret1,true);
                    }



                    /********* @滚动条事件 *********/
                    var tim = 2000;
                    var el = '.b1';
                    var liW = window.liWidth;
                    var le = $(el).scrollLeft();

                    // 今日，本周，本月，今年，点击事件
                    // if (!is_show_button) {$(el+".auto-scll").animate({ scrollLeft : 0 });}
                    
                    var goScroll = function (arg) {
                        clearInterval(_ts.leTime1);
                        _ts.leTime1 = setInterval(function () {
                            var cahe = $(arg+".auto-scll").scrollLeft();//缓存scrollLeft值
                            //设置scrollLeft值
                            $(arg+".auto-scll").animate({ scrollLeft : le += liW },1000,function () {
                            // 到右侧尽头,重新回到左侧
                                if ( $(arg+".auto-scll").scrollLeft() === cahe ) {  le = liW * -1; }
                            });
                        },tim);
                    };   

                    goScroll(el);
                    // PC端用户鼠标事件（电视屏无法操作）
                    $(el).hover(function(){
                        clearInterval(_ts.leTime1);
                        $(this).removeClass('auto-scll');
                    },function () {
                        le = $(el).scrollLeft();
                        $(this).addClass('auto-scll');
                         goScroll(el);
                    });
            },
             // 利率 #int-rate
            _intrate : function (ret2){
                    var _ts = APP;
                    var len = ret2.xdata.length;
                    var arr = [];
                    if (_ts.pro_Lock) { 
                        var _html = '';
                        for (var i = 0; i < len; i++) {
                            arr.push(ret2.xdata[i].name);
                            // $('#outer2 .bb em').eq(i).text(arr[i]);
                            _html += '<li><em>'+arr[i]+'</em><span class="icon '+'fla'+ret2.xdata[i].state+'"></span></li>'

                            
                        }
                        // 渲染银行名
                        $('#outer2 .bb').html(_html);

                        // 获取宽度，设置宽度
                        var liW = $('#outer2 .label li').outerWidth();
                        var _w = liW * len;

                        $('#outer2 .label').width(_w);
                         $('#outer2').height($('.b2').height());
                        $('#int-rate').width(_w);
                        // 向echart装填数据
                        Ch.ucsmy_int_rate(ret2,false);
                        Grid.int_rate0(ret2);
                    }
                    else {
                        // 隐藏银行名
                        Ch.ucsmy_int_rate(ret2,true);
                        
                    }

                     /********* @滚动条事件 *********/
                    var tim = 5000;
                    var el = '.b2';
                    var liW = window.liWidth;
                    var le = $(el).scrollLeft();
                    var goScroll = function (arg) {
                        clearInterval(_ts.leTime2);
                        _ts.leTime2 = setInterval(function () {
                            var cahe = $(arg+".auto-scll").scrollLeft();//缓存scrollLeft值
                            //设置scrollLeft值
                            $(arg+".auto-scll").animate({ scrollLeft : le += liW },1000,function () {
                            // 到右侧尽头,重新回到左侧
                                if ( $(arg+".auto-scll").scrollLeft() === cahe ) {  le = liW * -1; }
                            });
                        },tim);
                    };  

                    goScroll(el);
                    // PC端用户鼠标事件（电视屏无法操作）
                    $(el).hover(function(){
                        clearInterval(_ts.leTime2);
                        $(this).removeClass('auto-scll');
                    },function () {
                        le = $(el).scrollLeft();
                        $(this).addClass('auto-scll');
                        goScroll(el);
                    });
            },
              // 平均期限 #timeline
            _time_Line : function (ret5) {
                    var _ts = APP;
                    var ret5 = ret5;
                    // var Length = ret5.ydata.length;
                    // var less = Length - leng ;
                    var leng = 5;// 默认显示前N个银行数据
                    var mapYdata = ret5.ydata;//银行名
                    var mapChg = ret5.chg;//银行匿名
                    // var mapSeriseData = ret5.series.data;//银行对应数据(本地)
                    var mapSeriseData = ret5.series[0].data;//银行对应数据（测试地址）

                    var setData = function (is_Hide){
                        var index = 0;
                        var data = is_Hide ? mapYdata : mapChg;
                        // console.info('data',data)
                        ucsmy_timeLine.setOption({
                            yAxis: {
                                data : (function (ydata){
                                    // var res = [];
                                    // var len = ydata.length > leng ? leng : ydata.length;
                                    // var i = index;
                                    // while (len--) {
                                    //     // var sp = ydata[i++]
                                    //     i++;
                                    //     var name = ydata[i];
                                    //     if (ydata[i] !== 'undefined') {
                                    //         var pp = name.length;
                                    //         if ( pp > 5 ) {
                                    //             var a = ydata[i].substr(0,5);
                                    //             var b = ydata[i].substr(5,name.length)
                                    //             name = a + '\n' + b;
                                    //         }
                                    //     }
                                    //     res.push(name);
                                    // }
                                    // return res;
                                    var res = [];
                                    var len = ydata.length > leng ? leng : ydata.length;
                                    var i = index;
                                    while (len--) {
                                        res.push(ydata[i++]);
                                    }
                                    return res;

                                })(data)
                            },
                            series: [
                                {
                                    name: ret5.series.name,
                                    data: (function (xdata){
                                        var res = [];
                                        var len = xdata.length > leng ? leng : xdata.length;
                                        var i = index;
                                        while (len--) {
                                            res.push(xdata[i++]);
                                        }
                                        return res;
                                    })(mapSeriseData)
                                }
                            ]
                        });

                        // 交换数据
                        var fYData = mapYdata.shift();
                        var fCData = mapChg.shift();
                        var fSData = mapSeriseData.shift();
                        mapYdata.push(fYData);
                        mapChg.push(fCData);
                        mapSeriseData.push(fSData);


                    };
                    if (_ts.pro_Lock) {
                        setData(true);
                        clearInterval(_ts.Intervaltor);
                        _ts.Intervaltor = setInterval(function () {
                            setData(true);
                        },2500); 

                    }
                    else {
                        clearInterval(_ts.Intervaltor);
                        setData(false);    
                        _ts.Intervaltor = setInterval(function () {
                            setData(false);
                        },2500); 

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
                        var _html = '';
                        for (var i = 0; i < len; i++) {
                            arr.push(ret3.xdata[i].name);
                            // console.info(len);
                            $('#outer3 .bb em').eq(i).text(arr[i]);
                            _html += '<li><em>'+arr[i]+'</em><span class="icon '+'fla'+ret3.xdata[i].state+'"></span></li>'

                        }
                        // 渲染银行名
                        $('#outer3 .bb').html(_html);
                        // 获取宽度，设置宽度
                        var liW = $('#outer3 .label li').outerWidth();
                        var _w = liW * len;

                        $('#outer3 .label').width(_w);
                         $('#outer3').height($('.b3').height());
                        $('#sell-scale').width(_w);
                        // 向echart装填数据
                        Ch.ucsmy_sell_Scale(ret3,false);
                        // 辅助线
                        Grid.sell_scale0(ret3);
                    }
                    else {
                        // 隐藏银行名
                        Ch.ucsmy_sell_Scale(ret3,true);
                       
                    }


                    /********* @滚动条事件 *********/
                    var tim = 5000;
                    var el = '.b3';
                    var liW = window.liWidth;
                    var le = $(el).scrollLeft();
                    var goScroll = function (arg) {
                        clearInterval(_ts.leTime3);
                        _ts.leTime3 = setInterval(function () {
                            var cahe = $(arg+".auto-scll").scrollLeft();//缓存scrollLeft值
                            //设置scrollLeft值
                            $(arg+".auto-scll").animate({ scrollLeft : le += liW },1000,function () {
                                // 到右侧尽头,重新回到左侧
                                if ( $(arg+".auto-scll").scrollLeft() === cahe ) {  le = liW * -1; }
                            });
                            
                        },tim);
                    };  

                    goScroll(el);
                    // PC端用户鼠标事件（电视屏无法操作）
                    $(el).hover(function(){
                        clearInterval(_ts.leTime3);
                        $(this).removeClass('auto-scll');
                    },function () {
                        le = $(el).scrollLeft();
                        $(this).addClass('auto-scll');
                        goScroll(el);
                    });
            },
             // 利率 #int-rate2
            _intrate2 : function (ret4){
                    var _ts = APP;
                    var len = ret4.xdata.length;
                    var arr = [];
                    if (_ts.pro_Lock) { 
                        var _html = '';

                        for (var i = 0; i < len; i++) {
                            arr.push(ret4.xdata[i].name);
                            // $('#outer4 .bb em').eq(i).text(arr[i]);
                            _html += '<li><em>'+arr[i]+'</em><span class="icon '+'fla'+ret4.xdata[i].state+'"></span></li>'

                            
                        }
                        // 渲染银行名
                        $('#outer4 .bb').html(_html);
                        // 获取宽度，设置宽度
                        var liW = $('#outer4 .label li').outerWidth();
                        var _w = liW * len;

                        $('#outer4 .label').width(_w);
                        $('#outer4').height($('.b4').height());
                        $('#int-rate2').width(_w);
                        // 向echart装填数据
                        Ch.ucsmy_int_rate2(ret4,false);
                        Grid.int_rate20(ret4);

                    }
                    else {
                        // 隐藏银行名
                        Ch.ucsmy_int_rate2(ret4,true);
                    }

                     /********* @滚动条事件 *********/
                    var tim = 5000;
                    var el = '.b4';
                    var liW = window.liWidth;
                    var le = $(el).scrollLeft();
                    var goScroll = function (arg) {
                        clearInterval(_ts.leTime4);
                        _ts.leTime4 = setInterval(function () {
                            var cahe = $(arg+".auto-scll").scrollLeft();//缓存scrollLeft值
                            //设置scrollLeft值
                            $(arg+".auto-scll").animate({ scrollLeft : le += liW },1000,function () {
                                // 到右侧尽头,重新回到左侧
                                if ( $(arg+".auto-scll").scrollLeft() === cahe ) {  le = liW * -1; }
                            });
                            
                        },tim);
                    };  

                    goScroll(el);
                    // PC端用户鼠标事件（电视屏无法操作）
                    $(el).hover(function(){
                        clearInterval(_ts.leTime4);
                        $(this).removeClass('auto-scll');
                    },function () {
                        le = $(el).scrollLeft();
                        $(this).addClass('auto-scll');
                        goScroll(el);
                    });
            },
              // 平均期限 #timeline2
            _time_Line2 : function (ret6){
                    var _ts = APP;
                    var ret6 = ret6;
                    // var Length = ret6.ydata.length;
                    // var less = Length - leng ;
                    var leng = 5;// 默认显示前N个银行数据
                    var mapYdata = ret6.ydata;//银行名
                    var mapChg = ret6.chg;//银行匿名
                    // var mapSeriseData = ret6.series.data;//银行对应数据(本地)
                    var mapSeriseData = ret6.series[0].data;//银行对应数据（测试地址）


                    var setData = function (is_Hide){
                        var index = 0;
                        var data = is_Hide ? mapYdata : mapChg;
                        // console.info('data',data)
                        ucsmy_timeLine2.setOption({
                            yAxis: {
                                data : (function (ydata){
                                    var res = [];
                                    var len = ydata.length > leng ? leng : ydata.length;
                                    var i = index;
                                    while (len--) {
                                        res.push(ydata[i++]);
                                    }
                                    return res;
                                })(data)
                            },
                            series: [
                                {
                                    name: ret6.series.name,
                                    data: (function (xdata){
                                        var res = [];
                                        var len = xdata.length > leng ? leng : xdata.length;
                                        var i = index;
                                        while (len--) {
                                            res.push(xdata[i++]);
                                        }
                                        return res;
                                    })(mapSeriseData)
                                }
                            ]
                        });

                        // 交换数据
                        var fYData = mapYdata.shift();
                        var fCData = mapChg.shift();
                        var fSData = mapSeriseData.shift();
                        mapYdata.push(fYData);
                        mapChg.push(fCData);
                        mapSeriseData.push(fSData);


                    };
                    if (_ts.pro_Lock) {
                        setData(true);
                        clearInterval(_ts.Intervaltor2);
                        _ts.Intervaltor2 = setInterval(function () {
                            setData(true);
                        },2500); 

                    }
                    else {
                        clearInterval(_ts.Intervaltor2);
                        setData(false);    
                        _ts.Intervaltor2 = setInterval(function () {
                            setData(false);
                        },2500); 

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
                // console.info("jjjjj")
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
                var lData = [];
                var rData = [];
                var lrData = [];

                for (var i = 0,len = ret9.series[0].data.length; i < len; i++) {
                    var leftData = ret9.series[2].data[i] + ret9.series[5].data[i]
                    var rightData = ret9.series[3].data[i] + ret9.series[4].data[i]
                    lrData.push( Math.abs(leftData));
                    lrData.push( Math.abs(rightData));
                };

                    // 防止100%超出容器
                    _Max = Math.max.apply(null,lrData) > 100 ? Math.max.apply(null,lrData) : 100 ;
                    _Min = _Max * -1;

                    ucsmy_asset_size.setOption({
                        yAxis: {
                            data : ret9.yAxis[0].ydata
                        },
                        xAxis : [{
                            min: _Min,
                            max: _Max,
                        }],
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
})(Ch,Grid);


/********** 入口 **********/
$(function (){
    _DA.init();
});