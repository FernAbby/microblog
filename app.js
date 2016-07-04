var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoStore = require('connect-mongodb');
var session = require('express-session');
var flash = require('connect-flash');
//var connectRedis = require('connect-redis');
// var sessionStore = session.Memory({reapInterval: 300*1000})

// var setting = ('./settings');
var route = require('./routes/route');
//var index = require('./routes/index');
//var users = require('./routes/users');
//var books = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
//app.use(connectRedis());
// app.use(express.session({
//   secret: settings.cookieSecret, 
//   store: new mongoStore({
//     db: settings.db
//   })
// }));
app.use(session({
  secret: 'wenzhen',
  cookie: {maxAge: 300*1000},
  resave: true,
  saveUninitialized: true
}));

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.user = req.session.user;
  var error = req.flash('error');
  var success = req.flash('success');
  res.locals.error = error.length ? error : null;
  res.locals.success = success.length ? success : null;
  next();
});

//设置路由文件
//app.use(route)(app);
// app.use('/', index);
// // app.use('/reg', reg);
// app.use('/users', users);
// app.use('/books', books);
route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8089,"127.0.0.1");
console.log('http://localhost:8089/');
module.exports = app;
