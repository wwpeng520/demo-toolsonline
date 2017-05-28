const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const base = require('./controller');
const cutwords = require('./controller/cutwords');
const userinfo = require('./controller/userinfo');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
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

app.use(base);
app.use('/cutwords', cutwords);
app.use('/userinfo', userinfo);

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
