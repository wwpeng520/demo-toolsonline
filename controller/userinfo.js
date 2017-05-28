const express = require('express');
const router = express.Router();
const useragent = require('useragent');
const ipcity = require('node-ipcity');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');

router.get('/getClientInfo',function(req, res, next) {
  let agent = useragent.parse(req.headers['user-agent']);
  let userip = requestIp.getClientIp(req); 
  if(userip.indexOf("::ffff:") === 0){
    userip = userip.slice(7);
    // console.log(userip);
  }
  let result = [];
  result.push(agent.os.toString(),agent.toAgent()); //Windows 10 0.0.0,Chrome 56.0.2924
  result.push(userip);

  ipcity.getIpCityInfo(userip).then((city) => {
    result.push(city);
    console.log(result);
    return res.json(result);
	});
});

router.post('/getGuest',function(req, res, next) {

  guest.addGuest(ip, item);//把用户的ip及访问功能类型存储进数据库
});

module.exports = router;