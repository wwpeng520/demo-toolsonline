$(function () {

    //导航条下拉菜单
    $(".dropdown").mouseenter(
        function () {
            $(this).addClass("open");
        }
    ).mouseleave(function () {
        $(this).removeClass("open");
    });

    var text;
    $("#escape").click(function () {
        text = $("#htmlArea").val();
        $("#htmlEscapeArea").val(htmlEncode(text));
    });
    $("#unescape").click(function () {
        text = $("#htmlArea").val();
        $("#htmlEscapeArea").val(htmlDecode(text));
    });

    function htmlEncode(str)
    {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/©/g,"&copy;");
        s = s.replace(/®/,"&reg;");
        s = s.replace(/™/,"&trade;");
        //遇回车和空格时保持原样输出
        return s;
    }

    function htmlDecode(str)
    {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/&copy;/g,"©");
        s = s.replace(/&reg;/,"®");
        s = s.replace(/&trade;/,"™");
        return s;
    }

    //鼠标移入文本框效果
    $("#htmlArea").hover(function () {
        return $(this).select();
    });
    $("#htmlEscapeArea").hover(function () {
        return $(this).select();
    });

});