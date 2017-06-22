const express = require('express');
const router = express.Router();
const guest = require('../model/guest-info');
const useragent = require('useragent');
const ipcity = require('node-ipcity');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const fs = require("fs");
const nodejieba = require("nodejieba");
const cn_stopword = fs.readFileSync('./dist/others/stopwords_cn.txt').toString().split("\n");
const en_stopword = fs.readFileSync('./dist/others/stopwords_en.txt').toString().split("\n");
const stopwords = cn_stopword + en_stopword;

//获取数据库分词记录数据
let history = guest.getHistory().then((value) => {
    let result = [];
    for(let i = 0; i < value.length; i++){
        let obj = {};
        let regexp = /\.\d+$/;
        let ip = value[i].ip;
        ip = ip.replace(regexp,'.*'); //把用户的IP最后一位小数点后的数字替换为"*"
        obj.ip = ip;
        let localTime  = value[i].createdAt.getTime();//1970年1月1日后到此当时时间之间的毫秒数
        let localOffset = value[i].createdAt.getTimezoneOffset() * 60000;//返回本地时间(服务器时间)与用UTC表示当前日期的时间差
        let utc = localTime + localOffset;//将本地时间与本地时区偏移值相加得到当前国际标准时间（UTC）
        let targetTime = utc + (3600000*8);//得到国际标准时间（UTC）后，再获得东八区的国际标准时间（UTC）小时偏移值，把它转换成毫秒，再加上国际标准时间（UTC）
        let nd = new Date(targetTime);//通过初始化一个新的Data()对象，并调用此对象的toLocalString()方法
        // obj.createdAt =nd.toLocaleDateString() + ' ' + nd.toLocaleTimeString();//时间格式不是常规样式
        obj.createdAt =nd.getFullYear() + '-' + nd.getMonth() + '-' + nd.getDate() + ' ' + nd.getHours() + ':' + nd.getMinutes() + ':' + nd.getSeconds();
        obj.wordsInput = value[i].wordsInput;
        result.push(obj);
    }
    return result;
})

//访问中文分词页面
router.get('/', function(req, res, next) {
  res.render('cutwords');
});

//访问分词用户记录页面(通过cutwords.html页面“查询记录”链接跳转至cutwords/history路径)
router.get('/history', function(req, res, next) {
    guest.getHistory().then((value) => {
        let results = [];
        for(let i = 0; i < value.length; i++){
            let obj = {};
            let regexp = /\.\d+$/;
            let ip = value[i].ip;
            ip = ip.replace(regexp,'.*'); //把用户的IP最后一位小数点后的数字替换为"*"
            obj.ip = ip;
            let localTime  = value[i].createdAt.getTime();//1970年1月1日后到此当时时间之间的毫秒数
            let localOffset = value[i].createdAt.getTimezoneOffset() * 60000;//返回本地时间(服务器时间)与用UTC表示当前日期的时间差
            let utc = localTime + localOffset;//将本地时间与本地时区偏移值相加得到当前国际标准时间（UTC）
            let targetTime = utc + (3600000*8);//得到国际标准时间（UTC）后，再获得东八区的国际标准时间（UTC）小时偏移值，把它转换成毫秒，再加上国际标准时间（UTC）
            let nd = new Date(targetTime);//通过初始化一个新的Data()对象，并调用此对象的toLocalString()方法
            // obj.createdAt =nd.toLocaleDateString() + ' ' + nd.toLocaleTimeString();//时间格式不是常规样式
            obj.createdAt =nd.getFullYear() + '-' + nd.getMonth() + '-' + nd.getDate() + ' ' + nd.getHours() + ':' + nd.getMinutes() + ':' + nd.getSeconds();
            obj.wordsInput = value[i].wordsInput;
            results.push(obj);
        }
        console.log(results);
        let table, tr, td1, td2, td3;
        table = '<tr><th>访问者IP</th><th>访问时间</th><th>输入内容</th></tr>'
        for (let i = results.length-1; i >= 0; i--){
            td1 = '<td>' + results[i].ip + '</td>';
            td2 = '<td>' + results[i].createdAt + '</td>';
            td3 = '<td>' + results[i].wordsInput + '</td>';
            tr = '<tr>' + td1 + td2 + td3 + '</tr>';
            table += tr;
            // console.log(tr);
        }
        table = '<table>' + table + '</table>'
        res.render('cwhistory',{tab:table});
    })
});

//中文分词页面分词
router.post('/bigBang', function(req, res, next) {
    let words = req.body.text;
    //获取用户ip
    let ip = requestIp.getClientIp(req); 
    if(ip.indexOf("::ffff:") === 0){
        ip = ip.slice(7);
    }
    guest.addClientInfo(ip, words);//把用户的ip及记录存储进数据库
    
    let result = nodejieba.cut(words,true);//分词结果(true不能去掉，否则英文会以单个字母分词)
    //对类似what's形式的单词优化方案
    for(let index = 0; index < result.length; index++){
        if(result[index] === "'" && result[index - 1] != " " && result[index + 1] != " "){	//数组中当前项是“'”，且前一项及后一项都不为空格（即“'”不是用做引用）
            result.splice(index - 1, 3, result[index - 1] + result[index] + result[index + 1]);	//删除前一项，当前项及后一项
        }
    }
    result = result.filter(function(n){return n !=" "});//把数组中空格删除
    console.log(result);
    return res.json(result);
});

//中文分词页面高频词汇
router.post('/highFreqWords', function(req, res, next) {
    let words = req.body.text;
    let result = nodejieba.cut(words,true);        //分词结果,数组
    result = result.filter(function(n){
        if(stopwords.indexOf(n)===-1){
            console.log(n)
            return true
        }else{
            return false
        }
    });
    let countObj = {}
    for(let word of result){
        if(word in countObj){
            countObj[word] += 1
        }else{
            countObj[word] = 1
        }
    }
    console.log("countObj",countObj)
    let sortable = [];
    for (let key in countObj) {
    sortable.push([key, countObj[key]]);
    }
    sortable.sort(function(a, b) {
    return b[1] - a[1];
    });
    console.log("sortable",sortable)
    return res.json(sortable);
});

module.exports = router;