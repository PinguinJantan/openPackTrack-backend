var jwt = require('jsonwebtoken')
let models = require('../models')
let crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length){
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function hashPassword(password, salt){
  let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest('hex');
  return value;
};

function saltHashPassword(userpassword) {
  let salt = genRandomString(16); /** Gives us salt of length 16 */
  let hash = hashPassword(userpassword, salt);
  return {
    hash: hash,
    salt: salt
  }
}

module.exports = {
  register: function(req, res, next) {
    passwordData = saltHashPassword(req.body.password)
    var result = {
      success : false,
      status : "ERROR",
      user : null
    }

    // models.User.findOrCreate(
    //   {
    //     where: {
    //       $or: [
    //         {username: req.body.username},
    //         {email: req.body.email}
    //     ]}
    //     ,
    //     defaults: {
    //       name: req.body.name,
    //       email: req.body.email,
    //       username: req.body.username,
    //       identityNumber: req.body.identityNumber,
    //       password: passwordData.hash,
    //       salt: passwordData.salt
    //     }
    //   }
    // ).spread((user, isCreated) => {
    //   console.log(isCreated);
    //   if (isCreated) {
    //     result.success = true
    //     result.status = "OK"
    //     result.user = user
    //     res.json(result)
    //   }
    //   else {
    //     result.message = "already exist"
    //     res.json(result)
    //   }
    // }).catch(err => {
    //   res.json("error cuk" + err)
    // })

    models.User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      identityNumber: req.body.identityNumber,
      password: passwordData.hash,
      salt: passwordData.salt
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
      where: {
        username: req.body.username
      },
    }).then(user => {
      console.log(user);
      if(!user){
        res.json({success: false, message: 'Authentication failed. User not found.'})
      }else if (user) {
        let reqPasswordData = hashPassword(req.body.password, user.salt);
        if(user.password != reqPasswordData){
          res.json({success: false, message: 'Authentication failed. Wrong password.', user: user})
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
      console.log('Error when trying to login : ', err);
      res.json({
        success: false,
        message: err
      })
    })
  }
}
