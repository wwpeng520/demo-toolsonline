$(function () {

    //进制选择点击事件
    $("input[name=hex]").click(function () {
        var hexNum = ($(this).val());
        $("#numEnterArea span").text("请输入"+hexNum+"进制数值：");
    });

    //点击转换按钮事件
    $("#conver").click(function () {
        var num = $("#numIn").val(); //用户输入的值
        var hexChecked=$('input:radio[name="hex"]:checked').val();
        switch(hexChecked)
        {
            case "2":
                $("#outTo2").val(num);
                $("#outTo8").val(parseInt(num,2).toString(8));
                $("#outTo10").val(parseInt(num,2));
                $("#outTo16").val(parseInt(num,2).toString(16));
                break;
            case "8":
                $("#outTo2").val(parseInt(num,8).toString(2));
                $("#outTo8").val(num);
                $("#outTo10").val(parseInt(num,8));
                $("#outTo16").val(parseInt(num,8).toString(16));
                break;
            case "10":
                $("#outTo2").val(parseInt(num).toString(2));
                $("#outTo8").val(parseInt(num).toString(8));
                $("#outTo10").val(num);
                $("#outTo16").val(parseInt(num).toString(16));
                break;
            case "16":
                $("#outTo2").val(parseInt(num,16).toString(2));
                $("#outTo8").val(parseInt(num,16).toString(8));
                $("#outTo10").val(parseInt(num,16));
                $("#outTo16").val(num);
        }
    });

    // 点击Copy按钮事件调用Clipboard.js库方法（bootstrap中也有相同".btn"class名称）
    // var btn = $('#btn');
    var clipboard = new Clipboard('.btn');
    //点击“Copy”显示动画效果
    // $("#numConver button").click(function () {
    //     $(this).next("span").show().animate({
    //         opacity:"toggle"
    //     },1000);
    // });

    //输入框焦点事件
    $("input").focusin(function () {
        $(this).addClass("input-focusin");
    }).focusout(function () {
        $(this).removeClass("input-focusin");
    });

});