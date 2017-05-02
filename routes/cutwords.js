const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");
const nodejieba = require("nodejieba");
const cn_stopword = fs.readFileSync('./dist/others/stopwords_cn.txt').toString().split("\n");
const en_stopword = fs.readFileSync('./dist/others/stopwords_en.txt').toString().split("\n");
const stopwords = cn_stopword + en_stopword;
const useragent = require('useragent');
const ipcity = require('node-ipcity');
const requestIp = require('request-ip');
const guest = require('./cutwordsDB/guest-info');

router.get('/', function(req, res, next) {
  res.render('cutwords');
});


router.post('/bigBang', function(req, res, next) {
    let words = req.body.text;
    //获取用户ip
    let ip = requestIp.getClientIp(req); 
    if(ip.indexOf("::ffff:") === 0){
        ip = ip.slice(7);
    }
    guest.addGuest(ip, words);//把用户的ip及记录存储进数据库
    
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