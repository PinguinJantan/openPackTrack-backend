var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var nodeAcl = require('acl');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var item = require('./routes/item');
var output = require('./routes/output');
var category = require('./routes/category')
var retur = require('./routes/retur')
var auth = require('./routes/auth');
var deliveryOrder = require('./routes/deliveryorder');
var inner = require('./routes/inner');
var warehouse = require('./routes/warehouse');
var carton = require('./routes/carton');
var innerGrade = require('./routes/innergrade');
var innerSource = require('./routes/innersource');
var config = require('./config/config');
var cors = require('cors')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, { useMongoClient: true }, err=>{
  var acl = new nodeAcl(new nodeAcl.mongodbBackend(mongoose.connection.db, ''));
  app.set('acl', acl)
  app.set('mongo', mongoose.connection.db)
  // sementara tak taruh sini seeder acl-nya :D (mnirfan)
  acl.allow('admin', 'item', ['GET', 'POST', 'DELETE'])
  acl.allow('admin', 'category', ['GET', 'POST', 'DELETE'])
  acl.allow('admin', 'user', ['GET', 'POST', 'DELETE'])
  acl.allow('basic', 'item', ['GET'])
  acl.addUserRoles('1', 'admin') // irfan
  acl.addUserRoles('21', 'basic') //arnaz
})

var app = express();
var router = express.Router()

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('superSecret',config.secret)


// acl.whatResources('lolaa', (err, res)=>{
//   console.log("debuggg");
//   console.log(res);
//   console.log(err);
// })

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

  var head = req.headers.authorization ? req.headers.authorization.split(' ') : ''
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
app.use('/api/user', users);
app.use('/api/item', item);
app.use('/api/category', category);
app.use('/api/inner', inner);
app.use('/api/innergrade', innerGrade);
app.use('/api/innersource', innerSource);
app.use('/api/warehouse', warehouse);
app.use('/api/carton', carton);
app.use('/api/retur', retur);
app.use('/api/output', output);
app.use('/api/deliveryorder', deliveryOrder);
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
