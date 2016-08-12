/**
 * Created by Administrator on 2016/2/16.
 * author duhuiling
 */
$(function () {

    /*$('.switch').click(function(){
     //console.log($(this).hasClass('on'))
     if($(this).hasClass('on')){
     if($(this).hasClass('prev')){
     $(this).parent().find('.scroll').animate({left: '0'});
     }else{
     $(this).parent().find('.scroll').animate({left: '-100%'});
     }
     }
     $(this).removeClass('on');
     $(this).siblings('.switch').addClass('on');
     })*/

})

/*统计块 轮播*/
/*(function ($) {
    var defaults =
    var methods = {
        init: function (options) {
            return this.each(function () {
                $(window).bind('resize.tooltip', methods.reposition);
            });
        },
        destroy: function () {
            return this.each(function () {
                $(window).unbind('.jScroll');
            })
        },
        start: function () {

        },
        stop: function () {

        }
    };

    $.fn.jScroll = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };
})(jQuery);*/
var myInterval = [];
var jScroll = function (args) {
    var args_len = arguments.length;
    var ele = arguments[0], mTime = arguments[1], idx = arguments[2];
    var methods = {
        init: function () {
            var _self = this;
            var _w = -$(ele).width();
            var ele_child = $(ele).find("ul:first");
            clearInterval(myInterval[idx]);
            myInterval[idx] = setInterval(function () {
                _self.setTime(_w, ele_child);
            }, mTime)
        },
        setTime: function (wd, echild) {
            $(echild).animate({
                left: wd + "px"
            }, 800, function () {
                var $li_first = $(echild).find("li:first");
                var id_echild = $(echild).attr("id");
                var obj = $li_first.get(0);
                $li_first.remove();
                document.getElementById(id_echild).appendChild(obj);
                $(echild).css({
                    left: "0"
                });
            });
        }
    }

    if (args_len === 2) {

    } else {
        methods.init();
    }
}

/*var myInterval=[];
 function jScroll(ele,time,i){
 var _w = - $(ele).width();
 var ele_child = $(ele).find("ul:first");
 clearInterval(myInterval[i]);
 myInterval[i]=setInterval(function () {
 setTime(_w,ele_child);
 },time)
 }
 function setTime(wd,echild){
 $(echild).animate({
 left: wd + "px"
 }, 800, function () {
 var $li_first = $(echild).find("li:first");
 var id_echild = $(echild).attr("id");
 var obj = $li_first.get(0);
 $li_first.remove();
 document.getElementById(id_echild).appendChild(obj);
 $(echild).css({
 left: "0"
 });
 });
 }*/