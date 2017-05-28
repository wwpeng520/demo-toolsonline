$(function(){

    $("ul.nav > li").hover(function(){
        $(this).addClass("on");
    },function(){
        $(this).removeClass("on");
    });

    //useragent记录
    // $.ajax({
    //     url: '/userinfo/getGuest',
    //     type: 'post',
    //     dataType: 'json',
    //     success: function(data){
    //         // console.log(data);
            

    //     },
    //     error: function(jqXHR, textStatus, errorThrown){
    //         console.log('error ' + textStatus + " " + errorThrown);  
    //     }
    // });


});