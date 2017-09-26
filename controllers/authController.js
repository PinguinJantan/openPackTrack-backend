var jwt = require('jsonwebtoken')
let models = require('../models')


module.exports = {
  register: function(req, res, next) {
    var result = {
      success : false,
      status : "ERROR",
      user : null
    }
    models.User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      identityNumber: req.body.identityNumber,
      password: req.body.password
    }).then(user => {
      result.success = true
      result.status = "OK"
      result.user = user
      res.json(result)
    }).catch(err => {
      console.log('Error when trying to register : ', err);
      res.json(result)
    })
  },
  login: function(req,res,next){
    models.User.findOne({
      username: req.body.username
    }).then(user => {
      if(!user){
        res.json({success: false, message: 'Authentication failed. User not found.'})
      }else if (user) {
        if(user.password != req.body.password){
          res.json({success: false, message: 'Authentication failed. Wrong password.'})
        }else {
          var secret = req.app.get('superSecret')
          var token = jwt.sign({ expiresInMinutes: 1440 },secret);
          console.log(token);
          res.json({
            success: true,
            message: 'Login success boskuh',
            token : token
          })
        }
      }
    }).catch(err => {
      console.log('Error when trying to register : ', err);
    })
  }
}
