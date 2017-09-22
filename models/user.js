'use strict';

let crypto = require('crypto')
//     algorithm = 'aes-256-ctr',
//     password = 'd6F3Efeq';
//
// module.exports = function encrypt(text) {
//   var cipher = crypto.createCipher(algorithm, password)
//   var crypted = cipher.update(text, 'utf8', 'hex')
//   crypted += cipher.final('hex');
//   return crypted;
// }
//
// function decrypt(text) {
//   var decipher = crypto.createDecipher(algorithm, password)
//   var dec = decipher.update(text, 'hex', 'utf8')
//   dec += decipher.final('utf8');
//   return dec;
// }
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    identityNumber: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
