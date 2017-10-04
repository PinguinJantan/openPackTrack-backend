var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


var index = require('./routes/index');
var users = require('./routes/users');
var items = require('./routes/item');
var auth = require('./routes/auth');
var config = require('./config/config');
var cors = require('cors')

require('dotenv').config()

var app = express();
var router = express.Router()

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('superSecret',config.secret)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log('pada NODE_ENV : ', process.env.NODE_ENV);

//use cors
app.use(cors())


//verify token
router.use(function(req, res, next){

  var head = req.headers.authorization.split(' ')
  var token = null

  if(head.length == 2){
    var scheme = head[0]
    if(/^Bearer$/i.test(scheme)){
      token = head[1]
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if(err){
          res.json({
            success: false,
            message: 'Failed to authenticate token.'
          })
        }else {
          req.decoded = decoded;
          next();
        }
      })}
  }else {
    return res.status(403).send({
       success: false,
       message: 'No token provided.'
   })
  }
})

app.use('/api',router);
app.use('/', index);
app.use('/api/users', users);
app.use('/api/item', items);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
