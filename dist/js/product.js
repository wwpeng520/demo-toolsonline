$(function(){
    $("#info_list li").click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var index = $(this).index();
        $("#info_display > div").eq(index).removeClass('hide').siblings().addClass('hide');
    });
});