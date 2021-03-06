var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var index = require('./routes/index');
var goods = require('./routes/goods');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json()); // 用express解析json文件
app.use(express.urlencoded({ extended: false })); // 解析url编码的数据
app.use(cookieParser()); // 解析请求的cookie
app.use(express.static(path.join(__dirname, 'public')));


app.all('*', function(req, res, next) {
  // CORS配置
  res.header("Access-Control-Allow-Origin", "*"); // 允许所有的来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  // 允许这些请求头
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); // 允许这些方法
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 登录拦截
app.use(function (req, res, next) {
  if (req.cookies.userId) {
    next();
  } else {
    console.log('url:' + req.originalUrl);
    if (req.originalUrl == '/users/login' || req.originalUrl == 'users/logout' || req.originalUrl.indexOf('/goods/list') > -1) {
      next();
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      });
    }
  }
});

app.use('/', index);
app.use('/goods', goods);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
