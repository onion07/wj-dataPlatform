/**
 * Created by Administrator on 2016/1/25.
 */
$(function(){

    $("#clock").MyDigitClock({
        fontFamily:"Arial",
        fontColor: "#a6f3ef"
    });

})
var numFormat = function(num){

    if(num != 0 || num != undefined){
        var num = parseInt(num);
        var ohm = parseInt(num / Math.pow(10,8)),
        tenth = parseInt((num % Math.pow(10,8)) / Math.pow(10,4)),
        yuan = (num % Math.pow(10,8)) % Math.pow(10,4),
        format = '';
        if(ohm <= 0 && tenth <= 0){
            format = yuan+'元';
        }else if(ohm <= 0 && tenth > 0){
            format = tenth+'万'+yuan+'元';
        }else{
            format = ohm+'亿'+tenth+'万'+yuan+'元';
        }
        return format;
    }else{
        return '0元';
    }

};
//没有“元”
var numFormat_ny = function(num){

    if(num != 0 || num != undefined){
        var num = parseInt(num);
        var ohm = parseInt(num / Math.pow(10,8)),
        tenth = parseInt((num % Math.pow(10,8)) / Math.pow(10,4)),
        yuan = (num % Math.pow(10,8)) % Math.pow(10,4),
        format = '';
        if(ohm <= 0 && tenth <= 0){
            format = yuan+'元';
        }else if(ohm <= 0 && tenth > 0){
            format = tenth+'万'+yuan+'元';
        }else{
            format = ohm+'亿'+tenth+'万';
        }
        return format;
    }else{
        return '0元';
    }

}
