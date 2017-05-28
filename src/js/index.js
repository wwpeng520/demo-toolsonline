// const $ = require('jquery');

$(function () {
    //解决li标签inline-block时的间隔
    $('.remove-text-nodes').contents().filter(function() {
        return this.nodeType === 3;
    }).remove();
    
    //useragent查询
    $.ajax({
        url: '/userinfo/getclient',
        type: 'get',
        dataType: 'json',
        success: function(data){
            // console.log(data);
            var display = "您的地址：" + data[3] +"，IP：" + data[2] + "；您的硬件信息：" + data[0] + "/" + data[1];
            $("#userinfo").text(display);

        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);  
        }
    });

});
