$(function(){

    $.ajax({
        url: '/userinfo/get',
        type: 'post',
        dataType: 'json',
        success: function(data){
            console.log(data);
            var display = "您的地址：" + data[3] +"，IP：" + data[2] + "；您的硬件信息：" + data[0] + "/" + data[1];
            console.log(display);
            $("#userinfo").text(display);

        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);  
        }
    });
})