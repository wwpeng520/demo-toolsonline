$(function () {
    var enterText,result;
    //鼠标移入文本框效果
    $("#enterArea").hover(function () {
        return $(this).select();
    });
    $("#outArea").hover(function () {
        return $(this).select();
    });
    // 转换结果
    $("#chinese2Utf8").click(function () {
        enterText = $("#enterArea").val();
        result = chinese2Ascii(enterText);
        $("#outArea").val(result);
    });
    $("#chinese2Unicode").click(function () {
        enterText = $("#enterArea").val();
        result = chinese2Unicode(enterText);
        $("#outArea").val(result);
    });
    $("#ascii2Unicode").click(function () {
        enterText = $("#enterArea").val();
        result = ascii2Unicode(enterText);
        $("#outArea").val(result);
    });
    $("#unicode2ascii").click(function () {
        enterText = $("#enterArea").val();
        result = unicode2Ascii(enterText);
        $("#outArea").val(result);
    });
    $("#unicode2Chinese").click(function () {
        enterText = $("#enterArea").val();
        result = unicode2Chinese(enterText);
        $("#outArea").val(result);
    });
    $("#urlEncode").click(function () {
        enterText = $("#enterArea").val();
        result = encodeURI(enterText);
        $("#outArea").val(result);
    });
    $("#urlDocode").click(function () {
        enterText = $("#enterArea").val();
        result = decodeURI(enterText);
        $("#outArea").val(result);
    });

});

//ASCII 转换 Unicode
function ascii2Unicode(content) {
    result = '';
    for (var i=0; i<content.length; i++)
        result+='&#' + content.charCodeAt(i) + ';';
    return result;
}
// Unicode 转换 ASCII
function unicode2Ascii(content) {
    var code = content.match(/&#(\d+);/g);
    result= '';
    for (var i=0; i<code.length; i++)
        result += String.fromCharCode(code[i].replace(/[&#;]/g, ''));
    return result;
}
// 中文转换&#XXXX (UTF-8)
function chinese2Ascii(str){
    var value='';
    for (var i = 0; i < str.length; i++) {
        value += '\&#x' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16))+';';
    }
    return value;
}
// 中文转unicode
function chinese2Unicode(str) {
    var value = '';
    for (var i = 0; i < str.length; i++) {
        value += '\\u' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
    }
    return value;
}
function left_zero_4(str) {
    if (str != null && str != '' && str != 'undefined') {
        if (str.length == 2) {
            return '00' + str;
        }
    }
    return str;
}
// Unicode转中文汉字
function unicode2Chinese(str){
    str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
        return (String.fromCharCode(parseInt((encodeURI($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
        return String.fromCharCode(parseInt(encodeURI($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi,function($0){
        return String.fromCharCode(parseInt(encodeURI($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
    });
    return str;
}
// function unicode2Chinese(str){
//     str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
//         return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
//     });
//     str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
//         return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
//     });
//     str = str.replace(/(&#)(\d{1,6});/gi,function($0){
//         return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
//     });
//     return str;
// }