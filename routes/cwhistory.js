const express = require('express');
const router = express.Router();
const useragent = require('useragent');
const ipcity = require('node-ipcity');
const requestIp = require('request-ip');
const guest = require('./cutwordsDB/guest-info');

router.get('/', function(req, res, next) {
  res.render('cwhistory');
});

router.get('/guest', function(req, res, next) {
  guest.getHistory().then((value) => {
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
    return res.json(result);
  })
  
});

module.exports = router;