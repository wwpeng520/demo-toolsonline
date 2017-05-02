const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const index = require('./routes/index');
const users = require('./routes/users');
const wordcounter = require('./routes/wordcounter');
const cutwords = require('./routes/cutwords');
const cwhistory = require('./routes/cwhistory');
const beautify = require('./routes/beautify');
const chinese2code = require('./routes/chinese2code');
const encrypt = require('./routes/encrypt');
const file_hash = require('./routes/file-hash');
const hexconvert = require('./routes/hexconvert');
const html_escape = require('./routes/html-escape');
const xmorse = require('./routes/xmorse');
const weather = require('./routes/weather');
const userinfo = require('./routes/userinfo');
const ip_inquire = require('./routes/ip-inquire');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html' , ejs.__express); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //改为true，for parsing application/x-www-form-urlencoded
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); //设置静态文件路径，__dirname代表当前文件app.js所在的目录
app.use(express.static(path.join(__dirname, 'dist'))); 

app.use('/', index);
app.use('/users', users);
app.use('/wordcounter', wordcounter);
app.use('/cutwords', cutwords);
app.use('/cutwords/history', cwhistory);
app.use('/beautify', beautify);
app.use('/chinese2code', chinese2code);
app.use('/encrypt', encrypt);
app.use('/file-hash', file_hash);
app.use('/hexconvert', hexconvert);
app.use('/html-escape', html_escape);
app.use('/xmorse', xmorse);
app.use('/weather', weather);
app.use('/userinfo', userinfo);
app.use('/ip-inquire', ip_inquire);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
