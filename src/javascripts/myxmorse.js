$(function () {
    var enterText,result;
    //鼠标移入文本框效果
    $("#textArea").hover(function () {
        return $(this).select();
    });
    $("#xmorseArea").hover(function () {
        return $(this).select();
    });

    $("#xmorseEncode").click(function () {
        enterText = $("#textArea").val();
        result = xmorse.encode(enterText);
        $("#xmorseArea").val(result);
    });
    $("#xmorseDocode").click(function () {
        enterText = $("#xmorseArea").val();
        result = xmorse.decode(enterText);
        $("#textArea").val(result);
    });

});
