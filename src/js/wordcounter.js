$(function () {
    var textenter;
    var reg;
    var temp;
    var totalWordNum = 0; //英文单词总数
        //鼠标移入文本框效果
    $("#wordsTxtAra").hover(function () {
        return $(this).select();
    });
    //监测鼠标和键盘行为
    $("#wordsTxtAra").mouseup(change).keyup(change);

    //点击按钮输出单词频率统计结果
    $("#countWordsBtn").click(function () {
        textenter =  $("#wordsTxtAra").val();
        wordFreqOut(textenter);
    });

});


//文本框事件
function  change() {
    textenter =  $("#wordsTxtAra").val();
    $("#numZh").text(zhCount(textenter));
    $("#numZhChars").text(zhCharsCount(textenter));
    $("#numWord").text(wordCount(textenter));
    $("#numEnChars").text(enCharsCount(textenter));
}
//英文单词频率统计输出到页面函数
function wordFreqOut(str) {
    var len = $('#wordFreqTable tbody').children().length; //需要加上tbody，默认在table内部会加上tbody
    var tr,td1,td2;
    var result;
    var trNodes = document.getElementsByTagName("tr");
    result = freqNum(str);
    // console.log(result);
    if(len === 1){  // 表格中已经添加了一个表头
        for (var i in result){
            $("#wordFreqTable").show(); //只有输入框中有英文单词存在时统计表格才会显示
            tr = document.createElement("tr");
            td1 = document.createElement("td");
            td2 = document.createElement("td");
            td1.innerHTML = result[i][0];
            td2.innerHTML = result[i][1];
            tr.appendChild(td1);
            tr.appendChild(td2);
            $("#wordFreqTable").append(tr);
        }
    } else {
        //如果表格已经存在，那么把表格除了第一个tr外的tr开始全部删除
        $("#wordFreqTable tr:not(:eq(0))").remove();
        for (var j in result){
            tr = document.createElement("tr");
            td1 = document.createElement("td");
            td2 = document.createElement("td");
            td1.innerHTML = result[j][0];
            td2.innerHTML = result[j][1];
            tr.appendChild(td1);
            tr.appendChild(td2);
            $("#wordFreqTable").append(tr);
        }
    }
}
//中文字数统计函数
function zhCount(str) {
    reg = /[^\u4e00-\u9fa5]/g;
    temp = str.replace(reg,"");
    return temp.length;
}
//中文标点统计(。 ；  ， ： “ ”（ ） 、 ？ 《 》 〈〉 ! — —— …)
function  zhCharsCount(str) {
    reg = /[^\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\u3008\u3009\uff01\u2013\u2014\u2026]/g;
    temp = str.replace(reg,"");
    return temp.length;
}
//英文标点统计
function enCharsCount(str) {
    reg = /[^\u0020-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007e]/g;
    temp = str.replace(reg,"");
    return temp.length;
}
//所有英文单词输出函数（数组）
function getWordsByWordBoundaries(str) {
    reg = /[^\u0027\u0061-\u007a\u0041-\u005a]/g;
    temp = str.replace(reg," ")      //把除a-zA-Z和'之外的字符全部替换成空
        .replace(/\s+/g," ")        //把一个或多个空格替换成一个空格
        .toLowerCase()              //全部转换成小写
        .split(" ");                //以空格为标记把字符串分割存进数组
    temp = temp.filter(function(n){return n});     //把数组中的空元素删除
    return temp;
}
//英文单词总数统计
function wordCount(str) {
    return getWordsByWordBoundaries(str).length;
}
//单词频率从高到低排序
function sortFreqNnm(obj){
    let sortable = [];
    for (let key in obj) {
        sortable.push([key, obj[key]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    // console.log(sortable);
    return  sortable;
}
//英文单词频率统计
function freqNum(str) {
    var obj = {};   //记录所有字符出现次数
    var arr = getWordsByWordBoundaries(str);
    for (var i = 0; i < arr.length; i++){
        var char = arr[i];
        if (obj[char]){
            obj[char]++;
        } else {
            obj[char] = 1;
        }
    }
    return sortFreqNnm(obj);
}
 