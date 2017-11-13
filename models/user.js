'use strict';

let crypto = require('crypto')


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    identityNumber: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  User.associate = function (models) {
    User.belongsTo(models.Warehouse,{foreignKey: 'warehouseId'})
  }
  return User;
};
