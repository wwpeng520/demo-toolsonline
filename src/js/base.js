$(function(){

    $("ul.nav > li").hover(function(){
        $(this).find('ul').stop().slideDown(800).parent().addClass('on');
    },function(){
        $(this).find('ul').stop().slideUp(500).parent().removeClass('on');
    });

});