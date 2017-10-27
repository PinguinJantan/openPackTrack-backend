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
  // mendaftarkan pengguna baru
  register: function(req, res, next) {
    passwordData = saltHashPassword(req.body.password)
    var result = {
      success : false,
      status : "ERROR",
      user:{
        id: null,
        username: null,
        name: null,
        identityNumber: null,
        email: null,
        password : null,
        updatedAt: null,
        createdAt : null,
        warehouseId: null
      }
    }
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
      result.user.id = user.id
      result.user.username = user.username
      result.user.name = user.name
      result.user.identityNumber = user.identityNumber
      result.user.email = user.email
      result.user.password = user.password
      result.user.updatedAt = user.updatedAt
      result.user.createdAt = user.createdAt
      result.user.warehouseId = user.warehouseId
      res.json(result)
    }).catch(err => {
      console.log('Error when trying to register : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },

  // masuk ke sistem sebagai suatu user
  login: function(req,res,next){
    var result = {
      success: false,
      status: "ERROR",
      message: "",
      user: {
        name: null,
        username: null,
        token: null
      }
    }
    models.User.findOne({
      where: {
        username: req.body.username
      },
    }).then(user => {
      console.log(user);
      if(!user){
        result.success = false
        result.status = "ERROR"
        result.message = 'Authentication failed. User not found.'
        res.json(result)
      }else if (user) {
        let reqPasswordData = hashPassword(req.body.password, user.salt);
        if(user.password != reqPasswordData){
          result.success = false
          result.status = "ERROR"
          result.message = 'Authentication failed. Wrong password.'
          res.json(result)
        }else {
          var secret = req.app.get('superSecret')
          var token = jwt.sign({username: user.username }, secret, { expiresIn: '1d'});
          console.log(token);
          result.success = true
          result.status = "OK"
          result.message = 'Login success boskuh'
          result.user.name = user.name
          result.user.username = user.username
          result.user.token = token
          res.json(result)
        }
      }
    }).catch(err => {
      console.log('Error when trying to login : ', err);
      result.success = false
      result.status = "ERROR"
      result.message = err
      res.json(result)
    })
  }
}
